const ethers = require('ethers');
const provider = ethers.getDefaultProvider('goerli');
const wallet = ethers.Wallet.createRandom();

console.log(`Address: ${wallet.address}`);
console.log(`Private Key: ${wallet.privateKey}`);

//PK: 0x0f3e721173ca0d7a9ab6edd45ba5e5ea44356dbbc1d3f7f9dbf33cf8d794f77a
// ADD: 0xe0A91cA9ed112ed0E4529EF2DF2a25e6a60EE610