import React from 'react';
import CuratedChallenge from '../../CuratedChallenge';
import PageMeta from '../../../PageMeta';
import { SOROBAN_HELLO_WORLD } from '../../challengeData';

export default function SorobanHelloChallenge() {
  return (
    <>
      <PageMeta
        title="Soroban Hello World Challenge — EduNode"
        description="Write, configure, and test your first Soroban smart contract in Rust: Cargo.toml setup, a hello contract returning Vec<Symbol>, and a unit test."
        path="/challenges/soroban-hello-world"
      />
      <CuratedChallenge config={SOROBAN_HELLO_WORLD} />
    </>
  );
}
