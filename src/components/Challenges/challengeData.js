import ship from './gameChallenge/images/ship.png';
import ship2 from './gameChallenge/images/ship2.png';
import ship3 from './gameChallenge/images/ship3.png';

// Curated + game challenge definitions. Each challenge gets:
//   /challenges/<slug>          curated, fixed route
//   /challenges/<slug>/done     completion page
//   /challengeGame<N>/:random   multiplayer game version (see App.js)
// Validation is includes-based: every snippet in `required` must appear in
// the submitted editor value.

export const SOROBAN_HELLO_WORLD = {
  slug: 'soroban-hello-world',
  gamePath: 'challengeGame2',
  title: 'Soroban Hello World Challenge',
  metaTitle: 'Soroban Hello World Challenge — EduNode',
  metaDescription:
    'Write, configure, and test your first Soroban smart contract in Rust: Cargo.toml setup, a hello contract returning Vec<Symbol>, and a unit test.',
  passGrade: 2,
  hero: ship,
  stepImages: [ship, ship2, ship3],
  steps: [
    {
      label: 'Challenge Description:',
      content: ` The Intergalactic Space Agency has decided to experiment with Rust-based smart contracts using the Soroban SDK. Your task is to create a basic "Hello World" contract that takes a Symbol as input and returns a Vec<Symbol> as output.\n
      The challenge involves three components:\n
      1. Cargo.toml: The configuration file for the Rust package.\n
      2. lib.rs: The main library file where the contract is defined.\n
      3. test.rs: A testing file to ensure that the contract works as expected.\n
      To create your Soroban contract these are the requirements:\n
      1. Create New Project\n
      **\`cargo new --lib [project-name]\`**\n
      2. Open the Cargo.toml: package name, version, and edition = "2021".\n
      3. Configure the Library Type: **[lib]** crate-type = ["cdylib"]\n
      4. Import soroban-sdk "0.9.2" under [dependencies] and [dev_dependencies] with the testutils feature.\n
      5. Configure the [profile.release] profile (opt-level "z", lto, panic "abort", etc.)\n
      6. Configure the [profile.release-with-logs] profile inheriting release with debug-assertions = true\n
      Question: write the complete Cargo.toml file.`,
      required: [
        '[package]',
        'name = "project-name"',
        'version = "0.1.0"',
        'edition = "2021"',
        '[lib]',
        'crate-type = ["cdylib"]',
        '[features]',
        'testutils = ["soroban-sdk/testutils"]',
        '[dependencies]',
        'soroban-sdk = "0.9.2"',
        '[dev_dependencies]',
        'soroban-sdk = { version = "0.9.2", features = ["testutils"] }',
        '[profile.release]',
        'opt-level = "z"',
        'overflow-checks = true',
        'debug = 0',
        'strip = "symbols"',
        'debug-assertions = false',
        'panic = "abort"',
        'codegen-units = 1',
        'lto = true',
        '[profile.release-with-logs]',
        'inherits = "release"',
        'debug-assertions = true',
      ],
      answer: `
[package]
name = "project-name"
version = "0.1.0"
edition = "2021"

[lib]
crate-type = ["cdylib"]

[features]
testutils = ["soroban-sdk/testutils"]

[dependencies]
soroban-sdk = "0.9.2"

[dev_dependencies]
soroban-sdk = { version = "0.9.2", features = ["testutils"] }

[profile.release]
opt-level = "z"
overflow-checks = true
debug = 0
strip = "symbols"
debug-assertions = false
panic = "abort"
codegen-units = 1
lto = true

[profile.release-with-logs]
inherits = "release"
debug-assertions = true
`,
    },
    {
      label: 'Write a Contract:',
      content: `Write a Contract:\n
      - Writing a Soroban contract means writing Rust code in the project's lib.rs file.\n
      - All contracts should begin with **\`#![no_std]\`** to ensure the Rust standard library is not included in the build.\n
      - Import the SDK macros: **\`use soroban_sdk::{contract, contractimpl, symbol_short, vec, Env, Symbol, Vec};\`**\n
      - Annotate an empty **\`pub struct Contract\`** with **\`#[contract]\`**.\n
      - In an **\`#[contractimpl]\`** block, implement **\`pub fn hello(env: Env, to: Symbol) -> Vec<Symbol>\`** returning **\`vec![&env, symbol_short!("Hello"), to]\`**.\n
      - End with **\`#[cfg(test)] mod test;\`** so the test module compiles only in tests.\n
      Question: write the complete lib.rs file.`,
      required: [
        '#![no_std]',
        'use soroban_sdk::{contract, contractimpl, symbol_short, vec, Env, Symbol, Vec};',
        '#[contract]',
        'pub struct Contract;',
        '#[contractimpl]',
        'impl Contract {',
        'pub fn hello(env: Env, to: Symbol) -> Vec<Symbol> {',
        'vec![&env, symbol_short!("Hello"), to]',
        '#[cfg(test)]',
        'mod test;',
      ],
      answer: `
#![no_std]
use soroban_sdk::{contract, contractimpl, symbol_short, vec, Env, Symbol, Vec};

#[contract]
pub struct Contract;

#[contractimpl]
impl Contract {
    pub fn hello(env: Env, to: Symbol) -> Vec<Symbol> {
        vec![&env, symbol_short!("Hello"), to]
    }
}
#[cfg(test)]
mod test;
`,
    },
    {
      label: 'Testing:',
      content: `Testing:\n
      - Soroban contracts are tested with the standard Rust test toolchain in test.rs.\n
      - Import the generated client: **\`use crate::{Contract, ContractClient};\`**\n
      - Create a default env, register the contract with **\`env.register_contract(None, Contract)\`**, and build a **\`ContractClient\`**.\n
      - Call **\`client.hello(&symbol_short!("Dev"))\`** and assert it equals **\`vec![&env, symbol_short!("Hello"), symbol_short!("Dev")]\`**.\n
      Question: write the complete test.rs file.`,
      required: [
        'use crate::{Contract, ContractClient};',
        'use soroban_sdk::{vec, Env, Symbol, symbol_short};',
        '#[test]',
        'fn test() {',
        'let env = Env::default();',
        'let contract_id = env.register_contract(None, Contract);',
        'let client = ContractClient::new(&env, &contract_id);',
        'let words = client.hello(&symbol_short!("Dev"));',
        'assert_eq!(',
        'vec![&env, symbol_short!("Hello"), symbol_short!("Dev"),]',
      ],
      answer: `
use crate::{Contract, ContractClient};
use soroban_sdk::{vec, Env, Symbol, symbol_short};

#[test]
fn test() {
    let env = Env::default();
    let contract_id = env.register_contract(None, Contract);
    let client = ContractClient::new(&env, &contract_id);

    let words = client.hello(&symbol_short!("Dev"));
    assert_eq!(
        words,
        vec![&env, symbol_short!("Hello"), symbol_short!("Dev"),]
    );
}
`,
    },
  ],
};

export const STELLAR_TOKEN = {
  slug: 'stellar-token',
  gamePath: 'challengeGame3',
  title: 'Stellar Token Challenge',
  metaTitle: 'Create a Stellar Token (SEP-41) Challenge — EduNode',
  metaDescription:
    'Build a Soroban token contract: define balance storage with contracttype keys, implement mint with require_auth, and read balances — the SEP-41 pattern.',
  passGrade: 2,
  hero: ship2,
  stepImages: [ship2, ship, ship3],
  steps: [
    {
      label: 'Challenge Description:',
      content: ` The Intergalactic Space Agency needs its own token to pay crews across the galaxy. You will build the core of a Soroban token contract following the SEP-41 pattern.\n
      Soroban tokens store per-address balances in contract storage keyed by a **\`DataKey\`** enum annotated **\`#[contracttype]\`**.\n
      Requirements:\n
      1. Start the file with **\`#![no_std]\`** and import **\`soroban_sdk::{contract, contractimpl, contracttype, Address, Env}\`**.\n
      2. Declare **\`#[contract] pub struct Token;\`**\n
      3. Declare **\`#[contracttype] pub enum DataKey { Balance(Address) }\`**\n
      Question: write the contract skeleton (imports, struct, and DataKey enum).`,
      required: [
        '#![no_std]',
        'use soroban_sdk::{contract, contractimpl, contracttype, Address, Env};',
        '#[contract]',
        'pub struct Token;',
        '#[contracttype]',
        'pub enum DataKey {',
        'Balance(Address)',
      ],
      answer: `
#![no_std]
use soroban_sdk::{contract, contractimpl, contracttype, Address, Env};

#[contract]
pub struct Token;

#[contracttype]
pub enum DataKey {
    Balance(Address),
}
`,
    },
    {
      label: 'Mint function:',
      content: `Mint function:\n
      - Implement **\`pub fn mint(env: Env, to: Address, amount: i128)\`** inside an **\`#[contractimpl] impl Token\`** block.\n
      - The receiver must authorize the mint: **\`to.require_auth();\`**\n
      - Read the current balance with **\`env.storage().persistent().get(&DataKey::Balance(to.clone())).unwrap_or(0)\`**\n
      - Persist the new balance with **\`env.storage().persistent().set(&DataKey::Balance(to), &(balance + amount));\`**\n
      Question: write the #[contractimpl] block with the mint function.`,
      required: [
        '#[contractimpl]',
        'impl Token {',
        'pub fn mint(env: Env, to: Address, amount: i128) {',
        'to.require_auth();',
        'env.storage().persistent().get(&DataKey::Balance(to.clone())).unwrap_or(0)',
        'env.storage().persistent().set(&DataKey::Balance(to), &(balance + amount));',
      ],
      answer: `
#[contractimpl]
impl Token {
    pub fn mint(env: Env, to: Address, amount: i128) {
        to.require_auth();
        let balance: i128 = env
            .storage()
            .persistent()
            .get(&DataKey::Balance(to.clone()))
            .unwrap_or(0);
        env.storage()
            .persistent()
            .set(&DataKey::Balance(to), &(balance + amount));
    }
}
`,
    },
    {
      label: 'Balance + test:',
      content: `Balance + test:\n
      - Add a read-only getter: **\`pub fn balance(env: Env, id: Address) -> i128\`** that returns the stored balance or 0.\n
      - Then write a **\`#[test]\`** that mints 100 tokens and asserts the balance.\n
      - In tests, use **\`env.mock_all_auths();\`** so require_auth passes, register the contract with **\`env.register_contract(None, Token)\`**, and call it through **\`TokenClient\`**.\n
      Question: write the balance function plus the test module.`,
      required: [
        'pub fn balance(env: Env, id: Address) -> i128 {',
        'env.storage().persistent().get(&DataKey::Balance(id)).unwrap_or(0)',
        '#[test]',
        'env.mock_all_auths();',
        'let contract_id = env.register_contract(None, Token);',
        'TokenClient::new(&env, &contract_id)',
        'client.mint(&to, &100);',
        'assert_eq!(client.balance(&to), 100);',
      ],
      answer: `
pub fn balance(env: Env, id: Address) -> i128 {
    env.storage().persistent().get(&DataKey::Balance(id)).unwrap_or(0)
}

#[cfg(test)]
mod test {
    use super::*;
    use soroban_sdk::{testutils::Address as _, Address, Env};

    #[test]
    fn test_mint() {
        let env = Env::default();
        env.mock_all_auths();
        let contract_id = env.register_contract(None, Token);
        let client = TokenClient::new(&env, &contract_id);
        let to = Address::generate(&env);

        client.mint(&to, &100);
        assert_eq!(client.balance(&to), 100);
    }
}
`,
    },
  ],
};

export const RUST_OWNERSHIP = {
  slug: 'rust-ownership',
  gamePath: 'challengeGame4',
  title: 'Rust Ownership Challenge',
  metaTitle: 'Rust Ownership Challenge — EduNode',
  metaDescription:
    'Master Rust ownership, moves, borrowing, and mutable references — the core concepts you need before writing Soroban smart contracts.',
  passGrade: 3,
  hero: ship3,
  stepImages: [ship3, ship, ship2],
  steps: [
    {
      label: 'Challenge Description:',
      content: ` Before the Space Agency lets you write smart contracts, you must master Rust's ownership rules — the feature that makes Rust memory-safe without a garbage collector.\n
      The three rules:\n
      1. Each value in Rust has an owner.\n
      2. There can only be one owner at a time.\n
      3. When the owner goes out of scope, the value is dropped.\n
      For heap data like **\`String\`**, assignment MOVES ownership: after **\`let s2 = s1;\`** the variable **\`s1\`** is no longer valid.\n
      Question: write code that creates a **\`String\`** from "hello", then creates a second owner **\`s2\`** WITHOUT moving s1 — clone it — and print both.`,
      required: [
        'let s1 = String::from("hello");',
        'let s2 = s1.clone();',
        'println!',
      ],
      answer: `
fn main() {
    let s1 = String::from("hello");
    let s2 = s1.clone();
    println!("{} {}", s1, s2);
}
`,
    },
    {
      label: 'Immutable borrow:',
      content: `Immutable borrow:\n
      - Passing a String to a function moves it. To lend it instead, pass a reference: **\`&String\`**.\n
      - Implement **\`fn calculate_length(s: &String) -> usize\`** returning **\`s.len()\`**.\n
      - In main, create a String and call **\`calculate_length(&s1)\`** — s1 stays valid after the call because it was only borrowed.\n
      Question: write the function and the call.`,
      required: [
        'fn calculate_length(s: &String) -> usize {',
        's.len()',
        'let s1 = String::from("hello");',
        'calculate_length(&s1)',
      ],
      answer: `
fn calculate_length(s: &String) -> usize {
    s.len()
}

fn main() {
    let s1 = String::from("hello");
    let len = calculate_length(&s1);
    println!("length: {}", len);
}
`,
    },
    {
      label: 'Mutable borrow:',
      content: `Mutable borrow:\n
      - To let a function modify a value you lend it a mutable reference: **\`&mut String\`**.\n
      - Implement **\`fn change(s: &mut String)\`** that calls **\`s.push_str(", world")\`**.\n
      - In main, declare **\`let mut s = String::from("hello");\`** and call **\`change(&mut s);\`**.\n
      - Remember: only ONE mutable reference may exist in a scope at a time.\n
      Question: write the function and the call.`,
      required: [
        'fn change(s: &mut String) {',
        's.push_str(", world")',
        'let mut s = String::from("hello");',
        'change(&mut s);',
      ],
      answer: `
fn change(s: &mut String) {
    s.push_str(", world");
}

fn main() {
    let mut s = String::from("hello");
    change(&mut s);
    println!("{}", s);
}
`,
    },
    {
      label: 'Ownership in a loop:',
      content: `Ownership in a loop:\n
      - Iterating a **\`Vec<String>\`** with **\`for s in vec\`** moves each element; the vector cannot be used afterwards.\n
      - Iterate by reference instead: **\`for s in &vec\`** borrows each element.\n
      - Write a function **\`fn print_all(names: &Vec<String>)\`** that iterates **\`for name in names\`** (names is already a reference) and prints each with **\`println!("{}", name);\`**.\n
      Question: write the function and call it from main with **\`&names\`**.`,
      required: [
        'fn print_all(names: &Vec<String>) {',
        'for name in names {',
        'println!("{}", name);',
        'print_all(&names);',
      ],
      answer: `
fn print_all(names: &Vec<String>) {
    for name in names {
        println!("{}", name);
    }
}

fn main() {
    let names = vec![
        String::from("rocket"),
        String::from("station"),
    ];
    print_all(&names);
    println!("still usable: {}", names.len());
}
`,
    },
  ],
};

export const NFT_CONTRACT = {
  slug: 'nft-smart-contract',
  gamePath: 'challengeGame5',
  title: 'NFT Smart Contract Challenge',
  metaTitle: 'NFT Smart Contract Challenge — EduNode',
  metaDescription:
    'Write a Soroban NFT contract in Rust: token metadata storage, an authorized mint function, and ownership transfer — then test it.',
  passGrade: 3,
  hero: ship2,
  stepImages: [ship2, ship3, ship, ship2],
  steps: [
    {
      label: 'Challenge Description:',
      content: ` The Space Agency wants to issue NFT badges for completed missions. You will build the core of a Soroban non-fungible token contract.\n
      NFT ownership is tracked in contract storage keyed by token id.\n
      Requirements:\n
      1. **\`#![no_std]\`** and import **\`soroban_sdk::{contract, contractimpl, contracttype, symbol_short, Address, Env, Symbol}\`**.\n
      2. Declare **\`#[contract] pub struct Nft;\`**\n
      3. Declare a storage enum: **\`#[contracttype] pub enum DataKey { Owner(u64), Admin }\`**\n
      Question: write the contract skeleton.`,
      required: [
        '#![no_std]',
        'use soroban_sdk::{contract, contractimpl, contracttype, symbol_short, Address, Env, Symbol};',
        '#[contract]',
        'pub struct Nft;',
        '#[contracttype]',
        'pub enum DataKey {',
        'Owner(u64)',
        'Admin',
      ],
      answer: `
#![no_std]
use soroban_sdk::{contract, contractimpl, contracttype, symbol_short, Address, Env, Symbol};

#[contract]
pub struct Nft;

#[contracttype]
pub enum DataKey {
    Owner(u64),
    Admin,
}
`,
    },
    {
      label: 'Mint function:',
      content: `Mint function:\n
      - First store the admin on deploy: **\`env.storage().instance().set(&DataKey::Admin, &admin);\`** inside **\`pub fn initialize(env: Env, admin: Address)\`**.\n
      - Then implement **\`pub fn mint(env: Env, to: Address, token_id: u64)\`**:\n
        1. Load the admin and require their auth: **\`admin.require_auth();\`**\n
        2. Store the owner: **\`env.storage().persistent().set(&DataKey::Owner(token_id), &to);\`**\n
      Question: write the #[contractimpl] block with initialize and mint.`,
      required: [
        '#[contractimpl]',
        'impl Nft {',
        'pub fn initialize(env: Env, admin: Address) {',
        'env.storage().instance().set(&DataKey::Admin, &admin);',
        'pub fn mint(env: Env, to: Address, token_id: u64) {',
        'let admin: Address = env.storage().instance().get(&DataKey::Admin).unwrap();',
        'admin.require_auth();',
        'env.storage().persistent().set(&DataKey::Owner(token_id), &to);',
      ],
      answer: `
#[contractimpl]
impl Nft {
    pub fn initialize(env: Env, admin: Address) {
        env.storage().instance().set(&DataKey::Admin, &admin);
    }

    pub fn mint(env: Env, to: Address, token_id: u64) {
        let admin: Address = env.storage().instance().get(&DataKey::Admin).unwrap();
        admin.require_auth();
        env.storage().persistent().set(&DataKey::Owner(token_id), &to);
    }
}
`,
    },
    {
      label: 'owner_of + transfer:',
      content: `owner_of + transfer:\n
      - **\`pub fn owner_of(env: Env, token_id: u64) -> Address\`** reads **\`DataKey::Owner(token_id)\`** from persistent storage.\n
      - **\`pub fn transfer(env: Env, from: Address, to: Address, token_id: u64)\`**:\n
        1. **\`from.require_auth();\`** — only the current owner can transfer\n
        2. Assert **\`Self::owner_of(env.clone(), token_id) == from\`**\n
        3. Store the new owner.\n
      Question: write both functions.`,
      required: [
        'pub fn owner_of(env: Env, token_id: u64) -> Address {',
        'env.storage().persistent().get(&DataKey::Owner(token_id)).unwrap()',
        'pub fn transfer(env: Env, from: Address, to: Address, token_id: u64) {',
        'from.require_auth();',
        'Self::owner_of(env.clone(), token_id) == from',
        'env.storage().persistent().set(&DataKey::Owner(token_id), &to);',
      ],
      answer: `
pub fn owner_of(env: Env, token_id: u64) -> Address {
    env.storage().persistent().get(&DataKey::Owner(token_id)).unwrap()
}

pub fn transfer(env: Env, from: Address, to: Address, token_id: u64) {
    from.require_auth();
    assert!(Self::owner_of(env.clone(), token_id) == from);
    env.storage().persistent().set(&DataKey::Owner(token_id), &to);
}
`,
    },
    {
      label: 'Test the flow:',
      content: `Test the flow:\n
      - Write a **\`#[test]\`** covering mint + transfer:\n
        1. **\`env.mock_all_auths();\`** so require_auth passes.\n
        2. Register the contract, build **\`NftClient::new(&env, &contract_id)\`**.\n
        3. **\`client.initialize(&admin);\`**, **\`client.mint(&alice, &1);\`**\n
        4. Assert **\`client.owner_of(&1) == alice\`**\n
        5. **\`client.transfer(&alice, &bob, &1);\`** then assert **\`client.owner_of(&1) == bob\`**\n
      Question: write the test module.`,
      required: [
        '#[test]',
        'env.mock_all_auths();',
        'let contract_id = env.register_contract(None, Nft);',
        'NftClient::new(&env, &contract_id)',
        'client.initialize(&admin);',
        'client.mint(&alice, &1);',
        'assert_eq!(client.owner_of(&1), alice);',
        'client.transfer(&alice, &bob, &1);',
        'assert_eq!(client.owner_of(&1), bob);',
      ],
      answer: `
#[cfg(test)]
mod test {
    use super::*;
    use soroban_sdk::{testutils::Address as _, Address, Env};

    #[test]
    fn test_mint_and_transfer() {
        let env = Env::default();
        env.mock_all_auths();
        let contract_id = env.register_contract(None, Nft);
        let client = NftClient::new(&env, &contract_id);

        let admin = Address::generate(&env);
        let alice = Address::generate(&env);
        let bob = Address::generate(&env);

        client.initialize(&admin);
        client.mint(&alice, &1);
        assert_eq!(client.owner_of(&1), alice);

        client.transfer(&alice, &bob, &1);
        assert_eq!(client.owner_of(&1), bob);
    }
}
`,
    },
  ],
};

export const ALL_CHALLENGES = [
  SOROBAN_HELLO_WORLD,
  STELLAR_TOKEN,
  RUST_OWNERSHIP,
  NFT_CONTRACT,
];
