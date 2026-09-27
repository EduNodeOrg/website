import React, { useRef, useState, useEffect } from 'react';
import Helmet from 'react-helmet';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { rust } from '@codemirror/lang-rust';
import { python } from '@codemirror/lang-python';
import { keymap } from '@codemirror/view';
import NavBar from '../NavBar';
import Footer from '../Footer/Footer';

const STORAGE_KEY = 'edunode-playground-code';

const LANGUAGES = [
  { value: 'javascript', label: 'JavaScript', runnable: true },
  { value: 'rust', label: 'Rust (Soroban)', runnable: true },
  { value: 'python', label: 'Python', runnable: true },
  { value: 'solidity', label: 'Solidity', runnable: true },
];

const DEFAULT_CODE = {
  javascript: '// Try it: log a (pretend) blockchain\nconst block = { index: 1, hash: "0xabc", prev: "0x0" };\nconsole.log("mined:", block);\n',
  rust: '// Soroban smart contracts are written in Rust\nfn main() {\n    println!("Hello, Stellar!");\n}\n',
  python: '# Python playground\nprint("Hello, Web3!")\n',
  solidity: '// SPDX-License-Identifier: MIT\npragma solidity ^0.8.0;\n\ncontract Hello {}\n',
};

// Solidity isn't a first-class CodeMirror language — JavaScript's
// C-family highlighting is the closest reasonable approximation.
const LANGUAGE_EXTENSIONS = {
  javascript: javascript(),
  rust: rust(),
  python: python(),
  solidity: javascript(),
};

const loadSavedCode = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch {
    return {};
  }
};

// Pyodide (~10MB wasm runtime) is loaded as a plain script from the CDN on
// the first Python run — the npm package imports Node builtins webpack 5
// won't polyfill. A failed load resets the promise so the next click retries.
const PYODIDE_CDN = 'https://cdn.jsdelivr.net/pyodide/v0.29.5/full/';
let pyodidePromise = null;
const getPyodide = () => {
  if (!pyodidePromise) {
    pyodidePromise = new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = `${PYODIDE_CDN}pyodide.js`;
      script.onload = () => resolve(window.loadPyodide({ indexURL: PYODIDE_CDN }));
      script.onerror = () => reject(new Error('Failed to load the Python runtime'));
      document.body.appendChild(script);
    });
    pyodidePromise.catch(() => { pyodidePromise = null; });
  }
  return pyodidePromise;
};

// Solidity compiles in a Web Worker: soljson's inlined wasm is ~9MB and
// Chrome refuses synchronous wasm compilation over 8MB on the main thread.
// The worker (public/solc-worker.js) importScripts the official soljson
// build and replies with the standard-JSON output string.
let solcWorker = null;
const getSolcWorker = () => {
  if (!solcWorker) solcWorker = new Worker('/solc-worker.js');
  return solcWorker;
};

const formatArg = (arg) => {
  if (typeof arg === 'string') return arg;
  if (arg instanceof Error) return `${arg.name}: ${arg.message}`;
  try {
    return JSON.stringify(arg, null, 2);
  } catch {
    return String(arg);
  }
};

const CodeEditor = () => {
  const [language, setLanguage] = useState('javascript');
  const [theme, setTheme] = useState('dark');
  const [output, setOutput] = useState([]);
  const [running, setRunning] = useState(false);
  const [code, setCode] = useState(() => {
    const saved = loadSavedCode();
    return saved.javascript ?? DEFAULT_CODE.javascript;
  });
  // Edited code per language — survives language switches and reloads.
  const buffersRef = useRef(loadSavedCode());
  const runRef = useRef(() => {});

  const runnable = LANGUAGES.find((l) => l.value === language)?.runnable;

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(buffersRef.current));
  });

  const handleLanguageChange = (event) => {
    const next = event.target.value;
    buffersRef.current[language] = code;
    setLanguage(next);
    setCode(buffersRef.current[next] ?? DEFAULT_CODE[next]);
    setOutput([]);
  };

  const handleChange = (value) => {
    buffersRef.current[language] = value;
    setCode(value);
  };

  const resetCode = () => {
    buffersRef.current[language] = DEFAULT_CODE[language];
    setCode(DEFAULT_CODE[language]);
  };

  // JavaScript runs locally in the browser; console output is captured below.
  const runJavaScript = () => {
    const logs = [];
    const capture = (level) => (...args) =>
      logs.push(`${level === 'log' ? '' : `[${level}] `}${args.map(formatArg).join(' ')}`);
    const fakeConsole = {
      log: capture('log'),
      info: capture('info'),
      warn: capture('warn'),
      error: capture('error'),
    };
    try {
      // eslint-disable-next-line no-new-func
      new Function('console', code)(fakeConsole);
      if (logs.length === 0) logs.push('(finished — nothing logged)');
    } catch (err) {
      logs.push(`Error: ${err.stack || err.message}`);
    }
    setOutput(logs);
  };

  // Rust compiles and runs remotely via the official play.rust-lang.org API
  // (CORS-enabled). Only std + the playground's preinstalled crates are
  // available, so real Soroban contracts may not compile — basic Rust works.
  const runRust = async () => {
    setOutput(['Compiling on play.rust-lang.org…']);
    try {
      const res = await fetch('https://play.rust-lang.org/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          channel: 'stable',
          mode: 'debug',
          edition: '2021',
          crateType: 'bin',
          tests: false,
          code,
        }),
        signal: AbortSignal.timeout(60000),
      });
      if (!res.ok) throw new Error(`Rust Playground responded ${res.status}`);
      const { success, exitDetail, stdout, stderr } = await res.json();
      // Cargo's "Compiling/Finished/Running" progress lines go to stderr on
      // every run; filter them so real diagnostics stand out.
      const boilerplate = /^\s*(Compiling|Finished|Running|Updating|Locking|Adding|Removing|Downloading|Downloaded)\b/;
      const stderrLines = stderr
        ? stderr.replace(/\n$/, '').split('\n').filter((l) => !boilerplate.test(l))
        : [];
      const logs = [
        ...(stdout ? stdout.replace(/\n$/, '').split('\n') : []),
        ...stderrLines.map((l) => `[stderr] ${l}`),
      ];
      if (exitDetail) logs.push(`(${success ? 'finished' : 'failed'} — ${exitDetail})`);
      setOutput(logs.length ? logs : ['(finished — nothing logged)']);
    } catch (err) {
      setOutput([`Error: ${err.name === 'TimeoutError' ? 'request timed out' : err.message}`]);
    }
  };

  // Python runs fully in-browser via Pyodide (CPython on WebAssembly).
  const runPython = async () => {
    setOutput(['Loading Python runtime…']);
    const logs = [];
    try {
      const pyodide = await getPyodide();
      setOutput(['Running…']);
      pyodide.setStdout({ batched: (l) => logs.push(l) });
      pyodide.setStderr({ batched: (l) => logs.push(`[stderr] ${l}`) });
      await pyodide.runPythonAsync(code);
      if (logs.length === 0) logs.push('(finished — nothing logged)');
      setOutput(logs);
    } catch (err) {
      setOutput([...logs, `Error: ${err.message}`]);
    }
  };

  // Solidity "Run" compiles via solc in a Web Worker — bytecode is not
  // executed; output shows diagnostics and a per-contract summary.
  const runSolidity = async () => {
    setOutput(['Loading Solidity compiler…']);
    try {
      const result = await new Promise((resolve, reject) => {
        const worker = getSolcWorker();
        worker.onmessage = (e) =>
          e.data.error ? reject(new Error(e.data.error)) : resolve(e.data);
        worker.onerror = (e) => reject(new Error(e.message || 'Solidity compiler failed'));
        worker.postMessage(
          JSON.stringify({
            language: 'Solidity',
            sources: { 'contract.sol': { content: code } },
            settings: { outputSelection: { '*': { '*': ['abi', 'evm.bytecode'] } } },
          }),
        );
      });
      const { errors, contracts } = JSON.parse(result.output);
      const logs = (errors || []).map(
        (e) => `[${e.severity}] ${e.formattedMessage || e.message}`,
      );
      Object.values(contracts || {}).forEach((fileContracts) =>
        Object.entries(fileContracts).forEach(([name, c]) => {
          const bytes = (c.evm?.bytecode?.object?.length || 0) / 2;
          logs.push(`Compiled ${name}: ${c.abi?.length || 0} ABI entries, ${bytes}-byte bytecode`);
        }),
      );
      const failed = (errors || []).some((e) => e.severity === 'error');
      logs.push(
        failed
          ? '(failed — compilation errors)'
          : `(finished — compiled with solc ${result.version})`,
      );
      setOutput(logs);
    } catch (err) {
      setOutput([`Error: ${err.message}`]);
    }
  };

  const runCode = () => {
    if (!runnable || running) return;
    if (language === 'javascript') {
      runJavaScript();
    } else {
      setRunning(true);
      const run = { rust: runRust, python: runPython, solidity: runSolidity }[language];
      run().finally(() => setRunning(false));
    }
  };
  runRef.current = runCode;

  const extensions = [
    LANGUAGE_EXTENSIONS[language],
    keymap.of([
      {
        key: 'Mod-Enter',
        run: () => {
          runRef.current();
          return true;
        },
      },
    ]),
  ];

  return (
    <>
      <Helmet>
        <title>Code Playground | EduNode</title>
        <link rel="canonical" href="https://edunode.org/codeeditor" />
        <meta name="description" content="Practice code in the browser with the EduNode code playground — run JavaScript, Python, and Rust in your browser, and compile Solidity smart contracts." />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Code Playground | EduNode" />
        <meta property="og:description" content="Write and run JavaScript, Python, or Rust in the browser, and compile Solidity smart contracts." />
        <meta property="og:url" content="https://edunode.org/codeeditor" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Code Playground | EduNode" />
        <meta name="twitter:description" content="Write and run JavaScript, Python, or Rust in the browser, and compile Solidity smart contracts." />
      </Helmet>
      <NavBar />
      <div className="container py-3">
        <h1>Code Playground</h1>
        <p>
          Draft and practice code. JavaScript and Python run in your browser; Rust compiles and
          runs via play.rust-lang.org; Solidity compiles with solc.
        </p>
        <div className="d-flex align-items-center gap-2 mb-2 flex-wrap">
          <select
            className="form-select w-auto"
            value={language}
            onChange={handleLanguageChange}
            disabled={running}
          >
            {LANGUAGES.map((l) => (
              <option key={l.value} value={l.value}>{l.label}</option>
            ))}
          </select>
          <button type="button" className="btn btn-primary" onClick={runCode} disabled={!runnable || running}>
            {running ? 'Running…' : 'Run'}
          </button>
          <button type="button" className="btn btn-outline-secondary" onClick={resetCode}>
            Reset
          </button>
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            {theme === 'dark' ? 'Light theme' : 'Dark theme'}
          </button>
          {language === 'rust' && (
            <a
              className="btn btn-outline-secondary"
              href={`https://play.rust-lang.org/?edition=2021&code=${encodeURIComponent(code)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Open in Rust Playground
            </a>
          )}
          <small className="text-muted ms-auto">Tip: Ctrl/Cmd + Enter runs your code</small>
        </div>
        <CodeMirror
          value={code}
          height="55vh"
          theme={theme}
          extensions={extensions}
          onChange={handleChange}
          basicSetup={{ lineNumbers: true, foldGutter: true, autocompletion: true }}
        />
        <h5 className="mt-3">Output</h5>
        <pre
          className="border rounded p-3"
          style={{
            minHeight: '4rem',
            background: theme === 'dark' ? '#1e1e1e' : '#f8f9fa',
            color: theme === 'dark' ? '#d4d4d4' : 'inherit',
          }}
        >
          {output.length ? output.join('\n') : 'Run your code to see output here.'}
        </pre>
      </div>
      <Footer />
    </>
  );
};

export default CodeEditor;
