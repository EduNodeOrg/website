import React from 'react';
import CuratedChallenge from '../../CuratedChallenge';
import PageMeta from '../../../PageMeta';
import { STELLAR_TOKEN } from '../../challengeData';

export default function StellarTokenChallenge() {
  return (
    <>
      <PageMeta
        title="Create a Stellar Token (SEP-41) Challenge — EduNode"
        description="Build a Soroban token contract: define balance storage with contracttype keys, implement mint with require_auth, and read balances — the SEP-41 pattern."
        path="/challenges/stellar-token"
      />
      <CuratedChallenge config={STELLAR_TOKEN} />
    </>
  );
}
