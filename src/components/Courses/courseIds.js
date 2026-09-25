// Mongo IDs of the 11 API-backed courses (101-111), keyed by course number.
export const COURSE_IDS = {
  1: '644bcdd1e1fec0f4f55a7447',
  2: '644bcdeee1fec0f4f55a7449',
  3: '644bce0be1fec0f4f55a744b',
  4: '644bce24e1fec0f4f55a744d',
  5: '644bce41e1fec0f4f55a744f',
  6: '6464e2968aca412ed2d81bef',
  7: '6464e2b48aca412ed2d81bf1',
  8: '6464e2d58aca412ed2d81bf3',
  9: '646b83386cea9a0294e65253',
  10: '647603a1c8c864e8a6195e00',
  11: '6841abca38a24bd982c9d70a'
};

// Base course routes/titles (courses 101-111), as listed in public/llms.txt.
export const BASE_COURSE_INFO = [
  { id: '101', title: 'Basic Concepts', route: '/courses/101' },
  { id: '102', title: 'Operations', route: '/courses/102' },
  { id: '103', title: 'Anchors', route: '/courses/103' },
  { id: '104', title: 'SEPs', route: '/courses/104' },
  { id: '105', title: 'Hyperledger', route: '/courses/105' },
  { id: '106', title: 'Soroban', route: '/courses/106' },
  { id: '107', title: 'Ethereum Basics', route: '/courses/107' },
  { id: '108', title: 'Oracles Basics', route: '/courses/108' },
  { id: '109', title: 'System Engineering', route: '/courses/109' },
  { id: '110', title: 'Blockchain y Web3', route: '/courses/110' },
  { id: '111', title: 'Mujeres en Web3', route: '/courses/111' },
];

export default COURSE_IDS;
