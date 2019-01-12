// Migrating the appropriate contracts

// var CraftsmanRole = artifacts.require("./roles/CraftsmanRole.sol");
// var AggregatorRole = artifacts.require("./roles/AggregatorRole.sol");
// var RetailerRole = artifacts.require("./roles/RetailerRole.sol");
// var ConsumerRole = artifacts.require("./roles/ConsumerRole.sol");
var SupplyChain = artifacts.require("./craftbase/CraftSupplychain.sol");

module.exports = function(deployer) {
  // deployer.deploy(CraftsmanRole);
  // deployer.deploy(AggregatorRole);
  // deployer.deploy(RetailerRole);
  // deployer.deploy(ConsumerRole);
  deployer.deploy(SupplyChain);
};