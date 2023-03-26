const NovelFactory = artifacts.require("NovelFactory");

module.exports = function (deployer) {
  deployer.deploy(NovelFactory);
};

// 2_novel_migration.js
// ====================
// ⠴ Fetching solc version list from solc-bin. Attempt #1
//    Deploying 'novelFactory'
//    ------------------------
//    > transaction hash:    0xc8435772f74c3d85c67d60aa712b2742d7a9b17b55c6a4f3b255831dfd7fac7b
//    > Blocks: 0            Seconds: 0
//    > contract address:    0xC100edAe00004C5c191F4385b526CA3E58C5f8dA
//    > block number:        1
//    > block timestamp:     1679817731
//    > account:             0x19304b1690D71816791903aa8f1B066ebbc92944
//    > balance:             99.994508983
//    > gas used:            1626968 (0x18d358)
//    > gas price:           3.375 gwei
//    > value sent:          0 ETH
//    > total cost:          0.005491017 ETH

//    > Saving artifacts
//    -------------------------------------
//    > Total cost:         0.005491017 ETH

// Summary
// =======
// > Total deployments:   1
// > Final cost:          0.005491017 ETH