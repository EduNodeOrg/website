/*
 * Web Worker for compiling Solidity off the main thread.
 *
 * soljson ships its wasm inlined (~9MB) and Chrome refuses synchronous wasm
 * compilation over 8MB on the main thread; worker threads have no such cap.
 * The compiler is pulled via importScripts from the official Solidity
 * binaries — the pinned filename embeds the release commit hash, so the
 * payload is immutable.
 */
const SOLJSON_URL =
  'https://binaries.soliditylang.org/bin/soljson-v0.8.37+commit.f401782d.js';

// Minimal emscripten bindings for soljson's compile entry point — the solc
// npm wrapper pulls in Node-only deps that can't run in a browser.
const bindCompiler = (Module) => {
  const alloc = Module._solidity_alloc
    ? Module.cwrap('solidity_alloc', 'number', ['number'])
    : Module._malloc;
  const reset = Module._solidity_reset ? Module.cwrap('solidity_reset', null, []) : null;
  const compile = Module.cwrap('solidity_compile', 'string', ['string', 'number', 'number']);
  const copyFromCString = Module.UTF8ToString || Module.Pointer_stringify;
  const addFunction = Module.addFunction || Module.Runtime.addFunction;
  const removeFunction = Module.removeFunction || Module.Runtime.removeFunction;
  const copyToCString = (str, ptr) => {
    const len = Module.lengthBytesUTF8(str);
    const buf = alloc(len + 1);
    Module.stringToUTF8(str, buf, len + 1);
    Module.setValue(ptr, buf, '*');
  };
  // Callback signature 'viiiii': (context, kind, data, contents, error). The
  // playground can't resolve imports, so every request returns a readable error.
  const callback = (ctx, kind, data, contents, error) => {
    copyToCString(
      `import of '${copyFromCString(data)}' is not supported — inline the source`,
      error,
    );
  };
  return {
    version: Module.cwrap('solidity_version', 'string', []),
    compile: (inputJson) => {
      const cb = addFunction(callback, 'viiiii');
      try {
        return compile(inputJson, cb, 0);
      } finally {
        removeFunction(cb);
        if (reset) reset();
      }
    },
  };
};

let compilerPromise = null;
const loadCompiler = () => {
  if (!compilerPromise) {
    compilerPromise = new Promise((resolve, reject) => {
      self.Module = { onRuntimeInitialized: () => resolve(bindCompiler(self.Module)) };
      try {
        importScripts(SOLJSON_URL);
      } catch (err) {
        compilerPromise = null;
        reject(err);
      }
    });
  }
  return compilerPromise;
};

self.onmessage = async (event) => {
  try {
    const solc = await loadCompiler();
    self.postMessage({ output: solc.compile(event.data), version: solc.version() });
  } catch (err) {
    self.postMessage({ error: String((err && err.message) || err) });
  }
};
