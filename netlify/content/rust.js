// Paid lesson bodies for rust-web-wasm — served only via the gated function.
module.exports = [
  {
    "objectives": [
      "Model application state with structs and enums.",
      "Implement methods and associated functions in impl blocks.",
      "Use exhaustive match expressions instead of null checks."
    ],
    "sections": [
      {
        "title": "Structs and enums",
        "text": "Structs hold named fields \u2014 or tuple fields, or act as unit types \u2014 and are how you shape data in Rust. Enums are the other half: a type that is one of several variants, and unlike enums in most languages, each variant can carry its own data. Option<T> is just an enum with Some(T) and None; Result<T,E> with Ok(T) and Err(E). Modeling a domain this way makes illegal states unrepresentable."
      },
      {
        "title": "Methods and impl blocks",
        "text": "Behavior attaches to types through impl blocks: fn area(&self) computes from a borrowed self, associated functions like Wallet::new() act as constructors, and &mut self marks mutating methods. The self parameter is where ownership rules meet everyday code \u2014 choosing &self versus &mut self versus self decides who keeps the value afterward."
      },
      {
        "title": "Pattern matching",
        "text": "match is Rust\u2019s signature control flow: it destructures an enum and forces you to handle every variant \u2014 the compiler refuses to compile a non-exhaustive match. That exhaustiveness is the concrete feature that eliminates the \"forgot to handle the null case\" bug class that haunts Java, Go, and JavaScript. You can match literals, bind inner data, and add guards for extra conditions."
      }
    ],
    "exercise": {
      "title": "Model a transaction state machine",
      "instructions": [
        "Define an enum TxState with variants Pending, Confirmed(u64 /* block height */), Failed(String /* reason */).",
        "Add an impl TxState method describe(&self) -> String that matches on self and returns a human-readable status line for each variant.",
        "Try deleting one match arm and read the compiler error \u2014 observe that exhaustiveness is enforced, then restore it."
      ],
      "solution": "enum TxState { Pending, Confirmed(u64), Failed(String) } impl TxState { fn describe(&self) -> String { match self { TxState::Pending => \"waiting for inclusion\".to_string(), TxState::Confirmed(h) => format!(\"confirmed at block {}\", h), TxState::Failed(r) => format!(\"failed: {}\", r), } } } \u2014 the compiler rejects any match that omits a variant."
    },
    "quiz": {
      "question": "What makes Rust match safer than a typical switch statement?",
      "options": [
        "It runs faster than switch",
        "The compiler requires every variant to be handled",
        "It supports string matching"
      ],
      "answer": 1,
      "explanation": "match is exhaustive: omit a variant and the code does not compile \u2014 so the \"forgot a case\" bug class disappears at build time."
    }
  },
  {
    "objectives": [
      "Represent fallible operations with Result<T,E>.",
      "Propagate errors ergonomically with the ? operator.",
      "Decide when unwrap and expect are acceptable."
    ],
    "sections": [
      {
        "title": "Errors as values",
        "text": "Rust has no exceptions. Functions that can fail return Result<T, E> \u2014 Ok(value) on success, Err(error) on failure \u2014 and the caller must acknowledge the failure type in the signature. Similarly, Option<T> replaces null: a value that may be absent is Some or None, and you must unwrap it explicitly. Absence and failure are part of the type, not surprises at runtime."
      },
      {
        "title": "The ? operator",
        "text": "Writing match on every Result gets verbose fast, so Rust offers ?: parse(s)? evaluates to the Ok value or immediately returns the Err to your caller \u2014 propagation in one character. Underneath it is just syntax sugar for a match on Err, which is why ? only works in functions that return Result or Option."
      },
      {
        "title": "When to unwrap",
        "text": "unwrap() and expect() panic on Err/None \u2014 acceptable in tests, examples, and main functions, and a bug anywhere else. Library code should return meaningful error types (crates like thiserror make ergonomic derive-based error enums). The rule of thumb: if a caller could plausibly recover, give them a Result, not a panic."
      }
    ],
    "exercise": {
      "title": "Build a file parser with honest errors",
      "instructions": [
        "Write fn parse_amount(s: &str) -> Result<f64, String> that trims input, parses to f64, and returns Err with a message when parsing fails.",
        "Write fn total_file(path: &str) -> Result<f64, String> that reads a file and uses ? to propagate both IO errors and parse errors.",
        "In main, match on the result and print either the total or a friendly error \u2014 no unwrap anywhere."
      ],
      "solution": "fn total_file(path: &str) -> Result<f64, String> { let text = std::fs::read_to_string(path).map_err(|e| e.to_string())?; let mut sum = 0.0; for line in text.lines() { sum += line.trim().parse::<f64>().map_err(|_| format!(\"bad number: {}\", line))?; } Ok(sum) }"
    },
    "quiz": {
      "question": "When is it acceptable to call unwrap() in Rust?",
      "options": [
        "Never, under any circumstances",
        "In tests, prototypes, and examples \u2014 not library code",
        "Whenever the error message is unclear"
      ],
      "answer": 1,
      "explanation": "unwrap panics on failure \u2014 fine where a crash is acceptable (tests, quick scripts) but wrong for code whose callers might recover from an error."
    }
  },
  {
    "objectives": [
      "Define traits and implement them for custom types.",
      "Write generic functions with trait bounds.",
      "Organize code with modules and pub visibility."
    ],
    "sections": [
      {
        "title": "Traits",
        "text": "A trait is a named set of methods a type promises to provide \u2014 Rust\u2019s interface mechanism. Implementing Display gives your type to_string(); implementing Iterator plugs it into every for loop and adapter in the language. Traits can also carry default method bodies, associated types, and supertrait bounds, which is how the standard library composes behavior without inheritance."
      },
      {
        "title": "Generics and trait bounds",
        "text": "fn largest<T: PartialOrd>(list: &[T]) -> T works for any type that can be ordered. The compiler monomorphizes generics \u2014 it stamps out a concrete version per type used \u2014 so generic code runs exactly as fast as hand-written specialized code. That is the \"zero-cost abstraction\" promise: abstraction at the source level, none at runtime."
      },
      {
        "title": "Modules and visibility",
        "text": "Rust organizes code as a module tree inside a crate: items are private by default, pub exposes them, use brings paths into scope, and files map to modules via mod declarations. cargo new produces a lib.rs or main.rs at the root; growing projects split into sibling files. Learning pub vs pub(crate) vs private is how you control a codebase\u2019s real API surface."
      }
    ],
    "exercise": {
      "title": "Write a generic retry helper",
      "instructions": [
        "Define trait Retryable { fn is_retryable(&self) -> bool; } and implement it for two error types.",
        "Write fn retry<T, E: Retryable>(mut f: impl FnMut() -> Result<T, E>, attempts: usize) -> Result<T, E> that retries when the error is retryable.",
        "Unit-test it with a closure that fails twice with a retryable error then succeeds."
      ],
      "solution": "fn retry<T, E: Retryable>(mut f: impl FnMut() -> Result<T,E>, n: usize) -> Result<T,E> { let mut last = None; for _ in 0..n { match f() { Ok(v) => return Ok(v), Err(e) if e.is_retryable() => last = Some(e), Err(e) => return Err(e) } } Err(last.unwrap()) }"
    },
    "quiz": {
      "question": "What does monomorphization mean for generic code performance?",
      "options": [
        "Generics add runtime dispatch overhead",
        "The compiler generates a concrete function per type used \u2014 zero runtime cost",
        "Generics are boxed automatically"
      ],
      "answer": 1,
      "explanation": "Rust stamps out specialized copies of generic code for each concrete type \u2014 abstraction at compile time, nothing left over at runtime."
    }
  },
  {
    "objectives": [
      "Use cargo to create, build, test, and document projects.",
      "Manage dependencies from crates.io with semantic versioning.",
      "Run tests, clippy, and rustfmt as part of the workflow."
    ],
    "sections": [
      {
        "title": "Cargo as the whole workflow",
        "text": "One tool runs everything: cargo new scaffolds a package, cargo build and run compile and execute, cargo test runs unit, integration, and doc tests, cargo doc generates browsable HTML docs, and cargo publish ships to crates.io. rustup sits underneath managing toolchain versions and cross-compile targets \u2014 add wasm32-unknown-unknown and the same compiler targets browsers."
      },
      {
        "title": "Dependencies and the lockfile",
        "text": "Adding serde = \"1\" to Cargo.toml pulls the crate plus its transitive dependencies at versions satisfying the semver range; Cargo.lock records the exact resolved versions so builds are reproducible. crates.io is the registry \u2014 serde, tokio, anyhow, and clap are the ecosystem\u2019s backbone crates you will see everywhere."
      },
      {
        "title": "Quality tooling",
        "text": "cargo clippy is a deep linter that catches hundreds of non-idiomatic or suspicious patterns and is worth running on every commit; cargo fmt enforces the standard style so formatting debates end. Doc comments (///) become real documentation \u2014 and code blocks inside them are compiled and run as doc-tests, so examples cannot silently rot."
      }
    ],
    "exercise": {
      "title": "Build a small serde-powered CLI",
      "instructions": [
        "cargo new greeting-cli, add serde and serde_json to Cargo.toml.",
        "Define a #[derive(Serialize, Deserialize)] struct for a greeting record, then read a JSON file and deserialize it.",
        "Run cargo clippy and fix at least one lint it reports, then cargo fmt."
      ],
      "solution": "cargo new greeting-cli && cd greeting-cli && cargo add serde serde_json; define struct Greeting { name: String, lang: String } with derive(Serialize, Deserialize); let g: Greeting = serde_json::from_str(&text)?; then cargo clippy && cargo fmt."
    },
    "quiz": {
      "question": "What does Cargo.lock guarantee?",
      "options": [
        "Dependencies always update to the latest version",
        "Exact dependency versions are pinned so builds are reproducible",
        "The crate is published publicly"
      ],
      "answer": 1,
      "explanation": "The lockfile records the resolved versions of every dependency in the tree \u2014 teammates and CI build the identical crate graph."
    }
  },
  {
    "objectives": [
      "Compile Rust to the wasm32-unknown-unknown target.",
      "Explain what wasm-bindgen generates and why.",
      "Decide which workloads benefit from WASM."
    ],
    "sections": [
      {
        "title": "The wasm32 target",
        "text": "Adding rustup target add wasm32-unknown-unknown lets cargo compile your crate to a .wasm binary \u2014 a sandboxed, near-native bytecode the browser (or a blockchain VM) executes. WASM gives Rust a portable output format with deterministic performance and no garbage collector pauses, which is precisely why performance-sensitive web apps and smart-contract platforms picked it."
      },
      {
        "title": "wasm-bindgen and the boundary",
        "text": "wasm-bindgen generates the JavaScript glue between the two worlds: exported Rust functions become callable from JS, and complex types get marshaled across. Numbers and typed arrays cross cheaply; strings require a copy through WASM linear memory, and DOM access goes through JS entirely. The boundary is the expensive part \u2014 design APIs to exchange data in bulk, not chatty calls."
      },
      {
        "title": "Where WASM wins",
        "text": "The sweet spot is compute-heavy, allocation-light work: image/video processing, crypto, parsing, physics, data transforms \u2014 code where Rust\u2019s speed and predictability dominate. For DOM-heavy or glue-heavy apps plain JS is simpler. And the identical pipeline \u2014 Rust to a WASM blob executed in a sandboxed VM \u2014 is literally how Soroban smart contracts run on Stellar."
      }
    ],
    "exercise": {
      "title": "Compile a library to WASM",
      "instructions": [
        "rustup target add wasm32-unknown-unknown, then create a lib crate with #[wasm_bindgen] pub fn add(a:u32,b:u32)->u32.",
        "Build it for WASM and inspect the generated JS glue that loads and instantiates the module.",
        "Call the function from a minimal HTML page and log the result."
      ],
      "solution": "cargo add wasm-bindgen; pub use wasm_bindgen::prelude::*; #[wasm_bindgen] pub fn add(a:u32,b:u32)->u32 { a + b } ; build with wasm-pack or wasm-bindgen-cli, load the generated pkg/index.js module in the page, call await init() then add(2,3)."
    },
    "quiz": {
      "question": "What is the main performance trap when crossing the JS\u2194WASM boundary?",
      "options": [
        "WASM is slower than JS generally",
        "Chatty calls that copy strings or touch the DOM one item at a time",
        "WASM cannot do arithmetic"
      ],
      "answer": 1,
      "explanation": "Numbers and typed arrays cross cheap; strings and DOM access are the expensive crossings \u2014 batch data across the boundary."
    }
  },
  {
    "objectives": [
      "Serve and build a Rust WASM app with Trunk.",
      "Wire assets through Trunk\u2019s data- attribute pipeline.",
      "Produce a deployable static dist/ folder."
    ],
    "sections": [
      {
        "title": "What Trunk does",
        "text": "Trunk is a WASM web application bundler for Rust \u2014 the piece of tooling that turns \"I have a Rust crate\" into \"I have a website\". From a plain index.html it finds your crate, compiles it to WASM, generates the JS glue, and bundles JS snippets and assets like images, CSS, and SCSS \u2014 via an optional-config pattern driven by that source HTML file rather than a wall of YAML."
      },
      {
        "title": "The HTML-driven pipeline",
        "text": "You declare assets in index.html with data-trunk attributes \u2014 <link data-trunk rel=\"rust\"/> for the WASM app itself, plus rel=\"css\", rel=\"sass\", rel=\"copy-file\" for the rest. trunk serve runs a dev server with hot reload; trunk build --release produces an optimized dist/ of static files you can host on Netlify, GitHub Pages, or any static host \u2014 no server runtime needed."
      },
      {
        "title": "A real app skeleton",
        "text": "Frameworks like Yew or Leptos provide component-style UI on top of the same pipeline \u2014 props, events, and state in Rust types. The workflow mirrors every modern JS bundler, except the source language is Rust and the output is WASM. In the exercise you wire a small app end-to-end: crate, index.html with data-trunk links, trunk serve for dev, trunk build --release for ship."
      }
    ],
    "exercise": {
      "title": "Ship a counter app with Trunk",
      "instructions": [
        "cargo new counter --lib, add yew (or leptos), and write a component with a button that increments state.",
        "Create index.html with <link data-trunk rel=\"rust\" data-bin=\"counter\"/> and a <link data-trunk rel=\"css\" href=\"style.css\"/>.",
        "Run trunk serve to develop with hot reload, then trunk build --release and inspect dist/."
      ],
      "solution": "index.html: <!doctype html><html><head><link data-trunk rel=\"rust\" data-bin=\"counter\"/><link data-trunk rel=\"css\" href=\"style.css\"/></head><body></body></html>; trunk serve for dev, trunk build --release emits dist/ \u2014 deploy that folder to any static host."
    },
    "quiz": {
      "question": "What is unusual about Trunk\u2019s configuration model?",
      "options": [
        "It requires a large trunk.toml file",
        "The source HTML file itself declares the pipeline via data-trunk attributes",
        "It only works with webpack"
      ],
      "answer": 1,
      "explanation": "Trunk follows an optional-config pattern \u2014 the HTML entrypoint itself describes what to build and bundle."
    }
  },
  {
    "objectives": [
      "Explain why smart-contract platforms chose Rust.",
      "Read a minimal Soroban contract and recognize its Rust constructs.",
      "Map the web WASM pipeline onto the contract pipeline."
    ],
    "sections": [
      {
        "title": "Why contracts picked Rust",
        "text": "Smart contracts must be deterministic, fast, and sandboxed \u2014 the exact profile of Rust compiled to WASM. No garbage collector means predictable execution metering; ownership rules mean whole classes of memory bugs cannot reach mainnet; and WASM gives a portable, auditable binary format. That is why Stellar Soroban, Polkadot Substrate, NEAR, and Solana all center Rust."
      },
      {
        "title": "Soroban specifically",
        "text": "On Stellar, a contract is a Rust crate built against the soroban-sdk crate and compiled to WASM \u2014 the same toolchain from this class. A minimal contract is an impl block whose public functions become invocable entry points, with env passed in for ledger access. You will recognize every construct from earlier lessons: structs for storage types, Result for fallible calls, attributes like #[contract] for the SDK\u2019s macro magic."
      },
      {
        "title": "The transferable pipeline",
        "text": "The skills transfer directly: cargo test for contract unit tests, the wasm32 target for builds, honest error handling for transaction safety. The difference is the runtime \u2014 a browser instantiates your WASM for users; Stellar validators instantiate it for consensus. Learning Rust for the web is not a detour from Web3 development; it is the front door."
      }
    ],
    "exercise": {
      "title": "Read a Soroban hello-world",
      "instructions": [
        "Find a minimal Soroban contract example (soroban.stellar.org docs) and identify the struct, the impl block, and the entry-point function.",
        "Locate where Result or panic behavior would surface for a caller.",
        "Write down one way the ownership rules from lesson 2 show up in contract state handling."
      ],
      "solution": "A Soroban contract: #[contract] pub struct HelloContract; #[contractimpl] impl HelloContract { pub fn hello(env: Env, to: Symbol) -> Vec<Symbol> { vec![&env, symbol_short!(\"Hello\"), to] } } \u2014 the same structs, impl blocks, and types from this class, compiled to the same WASM target."
    },
    "quiz": {
      "question": "Why is Rust a good fit for smart contracts?",
      "options": [
        "It has a garbage collector for safety",
        "Deterministic, memory-safe code compiled to a sandboxed WASM VM",
        "It is the only language browsers run"
      ],
      "answer": 1,
      "explanation": "Contracts need deterministic, memory-safe execution with predictable metering \u2014 Rust\u2192WASM delivers all three."
    }
  },
  {
    "objectives": [
      "Integrate the full class workflow into a shippable app.",
      "Apply honest error handling and tests at the UI boundary.",
      "Deploy the built app to a static host."
    ],
    "sections": [
      {
        "title": "The capstone spec",
        "text": "Build a small interactive app \u2014 a unit converter, markdown previewer, or tiny game \u2014 that exercises the whole class: model state with structs and enums, expose fallible operations with Result, factor reusable behavior behind a trait, keep a cargo test suite green, and keep clippy quiet. The point is integration, not novelty \u2014 a boring app shipped correctly beats a clever one half-finished."
      },
      {
        "title": "The build pipeline",
        "text": "trunk build --release runs the production pipeline: optimized WASM, hashed asset names for cache-busting, and a self-contained dist/ directory. Deploy that folder to Netlify (the same platform hosting this course), GitHub Pages, or any CDN \u2014 a WASM app needs no backend, so shipping is drag-and-drop."
      },
      {
        "title": "Where this leads",
        "text": "With the same skills you can go three directions: deeper web work with Yew/Leptos components, systems work with Rust\u2019s full native target, or on-chain work where Soroban contracts are literally the same Rust\u2192WASM artifacts. The capstone is the on-ramp \u2014 from here the tooling stops being the hard part."
      }
    ],
    "exercise": {
      "title": "Ship your WASM app",
      "instructions": [
        "Implement the app in Rust with at least one enum modeling state and one function returning Result.",
        "Write cargo tests for the core logic (not the UI), then run clippy and fix the warnings.",
        "Build with trunk build --release and deploy dist/ to a static host \u2014 verify it works from the public URL."
      ],
      "solution": "trunk build --release \u2192 dist/; deploy via netlify deploy --dir=dist (or drag-and-drop in the Netlify UI). Verify by loading the deployed URL in a fresh browser \u2014 the .wasm loads, the glue initializes, the app runs without any server code."
    },
    "quiz": {
      "question": "What does the production Trunk build produce?",
      "options": [
        "A server binary you must host",
        "A self-contained dist/ of static files deployable to any CDN",
        "A Docker image"
      ],
      "answer": 1,
      "explanation": "WASM apps need no backend \u2014 the release build emits hashed static files you can serve from any static host."
    }
  }
];
