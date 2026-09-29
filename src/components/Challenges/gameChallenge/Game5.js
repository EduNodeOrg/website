import React from 'react';
import GameChallenge from '../GameChallenge';
import { NFT_CONTRACT } from '../challengeData';

export default function Game5() {
  return <GameChallenge config={NFT_CONTRACT} />;
}
