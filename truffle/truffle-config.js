// const HDWalletProvider = require('@truffle/hdwallet-provider')
// const dotenv = require("dotenv").config();

// const mnemonics = "want behind multiply desk tail buyer upon video one advice frequent doctor";

// module.exports = {
  
//   networks: {
//     development: {
//       provider: () => new HDWalletProvider(mnemonics, 'https://goerli.infura.io/v3/c4b28df52267449780256bb10c3a8055'),
//         network_id : 5,
//         gas : 5500000,
//         confirmations : 3,
//         timeoutBlocks : 200,
//         skipDryRun : true
//       },
    // development: {
    //     provider: () => new HDWalletProvider(mnemonics, 'https://sepolia.infura.io/v3/c4b28df52267449780256bb10c3a8055'),
    //     network_id : 11155111,
    //     gas : 5500000,
    //     confirmations : 3,
    //     timeoutBlocks : 200,
    //     skipDryRun : true
    //   }    
//   },
//   compilers: {
//     solc: {
//       version: "^0.8.0", 
//       optimizer: {
//         enabled: 'true',
//         runs: 200
//       }
//   },
//   }
// };

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*"
    }
    // live: { ... }
  },
  compilers: {
    solc: {
      version: "^0.8.0", 
      optimizer: {
        enabled: 'true',
        runs: 200
      }
  },
  }
};