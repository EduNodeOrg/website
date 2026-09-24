import React, { useRef, useState } from 'react';
import Helmet from 'react-helmet';
import Editor from '@monaco-editor/react';
import NavBar from '../NavBar';
import Footer from '../Footer/Footer';

const LANGUAGES = [
  { value: 'javascript', label: 'JavaScript', runnable: true },
  { value: 'rust', label: 'Rust (Soroban)', runnable: false },
  { value: 'python', label: 'Python', runnable: false },
  { value: 'solidity', label: 'Solidity', runnable: false },
];

const DEFAULT_CODE = {
  javascript: '// Try it: log a (pretend) blockchain\nconst block = { index: 1, hash: "0xabc", prev: "0x0" };\nconsole.log("mined:", block);\n',
  rust: '// Soroban smart contracts are written in Rust\nfn main() {\n    println!("Hello, Stellar!");\n}\n',
  python: '# Python playground\nprint("Hello, Web3!")\n',
  solidity: '// SPDX-License-Identifier: MIT\npragma solidity ^0.8.0;\n\ncontract Hello {}\n',
};

const CodeEditor = () => {
  const [language, setLanguage] = useState('javascript');
  const [output, setOutput] = useState([]);
  const editorRef = useRef(null);

  const runnable = LANGUAGES.find((l) => l.value === language)?.runnable;

  const handleEditorMount = (editor) => {
    editorRef.current = editor;
  };

  const handleLanguageChange = (event) => {
    const next = event.target.value;
    setLanguage(next);
    if (editorRef.current) editorRef.current.setValue(DEFAULT_CODE[next]);
    setOutput([]);
  };

  // JavaScript runs locally in the browser; console.log output is captured below.
  const runCode = () => {
    const code = editorRef.current ? editorRef.current.getValue() : '';
    const logs = [];
    const fakeConsole = { log: (...args) => logs.push(args.map(String).join(' ')) };
    try {
      new Function('console', code)(fakeConsole);
      if (logs.length === 0) logs.push('(finished — nothing logged)');
    } catch (err) {
      logs.push(`Error: ${err.message}`);
    }
    setOutput(logs);
  };

  return (
    <>
      <Helmet>
        <title>Code Editor | EduNode</title>
        <meta name="description" content="Practice code in the browser with the EduNode code playground — JavaScript runs instantly, Rust and Solidity for drafting smart contracts." />
      </Helmet>
      <NavBar />
      <div className="container py-3">
        <h1>Code Playground</h1>
        <p>Draft and practice code. JavaScript runs in your browser; Rust and Solidity are for drafting smart contracts.</p>
        <div className="d-flex align-items-center gap-2 mb-2">
          <select className="form-select w-auto" value={language} onChange={handleLanguageChange}>
            {LANGUAGES.map((l) => (
              <option key={l.value} value={l.value}>{l.label}</option>
            ))}
          </select>
          <button type="button" className="btn btn-primary" onClick={runCode} disabled={!runnable}>
            Run
          </button>
          {!runnable && <small className="text-muted">In-browser execution supports JavaScript only</small>}
        </div>
        <Editor
          height="55vh"
          language={language}
          defaultValue={DEFAULT_CODE[language]}
          onMount={handleEditorMount}
          options={{ minimap: { enabled: false }, fontSize: 14 }}
        />
        <h5 className="mt-3">Output</h5>
        <pre className="bg-light border rounded p-3" style={{ minHeight: '4rem' }}>
          {output.length ? output.join('\n') : 'Run your code to see output here.'}
        </pre>
      </div>
      <Footer />
    </>
  );
};

export default CodeEditor;
