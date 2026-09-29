import React from 'react';
import CuratedChallenge from '../../CuratedChallenge';
import PageMeta from '../../../PageMeta';
import { NFT_CONTRACT } from '../../challengeData';

export default function NftContractChallenge() {
  return (
    <>
      <PageMeta
        title="NFT Smart Contract Challenge — EduNode"
        description="Write a Soroban NFT contract in Rust: token metadata storage, an authorized mint function, and ownership transfer — then test it."
        path="/challenges/nft-smart-contract"
      />
      <CuratedChallenge config={NFT_CONTRACT} />
    </>
  );
}
