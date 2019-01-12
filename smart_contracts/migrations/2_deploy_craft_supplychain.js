// Migrating the appropriate contracts

var CraftsmanRole = artifacts.require("CraftsmanRole");
var AggregatorRole = artifacts.require("AggregatorRole");
var RetailerRole = artifacts.require("RetailerRole");
var ConsumerRole = artifacts.require("ConsumerRole");
var SupplyChain = artifacts.require("CraftSupplychain");


module.exports = function(deployer) {
  deployer.deploy(CraftsmanRole);
  deployer.deploy(AggregatorRole);
  deployer.deploy(RetailerRole);
  deployer.deploy(ConsumerRole);
  deployer.deploy(SupplyChain);
};