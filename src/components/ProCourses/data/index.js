import web3Fundamentals from './web3Fundamentals';
import smartContractDev from './smartContractDev';
import defiProtocolEngineering from './defiProtocolEngineering';
import nftMarketplace from './nftMarketplace';
import securityAuditing from './securityAuditing';
import crossChain from './crossChain';

const courses = {
  112: web3Fundamentals,
  113: smartContractDev,
  114: defiProtocolEngineering,
  115: nftMarketplace,
  116: securityAuditing,
  117: crossChain,
};

export const getCourse = (id) => courses[String(id)] || null;

export const allCourses = Object.values(courses);

export default courses;
