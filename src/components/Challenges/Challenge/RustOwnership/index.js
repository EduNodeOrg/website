import React from 'react';
import CuratedChallenge from '../../CuratedChallenge';
import PageMeta from '../../../PageMeta';
import { RUST_OWNERSHIP } from '../../challengeData';

export default function RustOwnershipChallenge() {
  return (
    <>
      <PageMeta
        title="Rust Ownership Challenge — EduNode"
        description="Master Rust ownership, moves, borrowing, and mutable references — the core concepts you need before writing Soroban smart contracts."
        path="/challenges/rust-ownership"
      />
      <CuratedChallenge config={RUST_OWNERSHIP} />
    </>
  );
}
