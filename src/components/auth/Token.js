const crypto = require("crypto")

const VerifyToken = (len) => {

    return crypto.randomBytes(Math.ceil(len/2))
    .toString("hex")
    .slice(0,len);
    
};

console.log(VerifyToken(12))