// Migrating the appropriate contracts

// Libraries
var Roles = artifacts.require('Roles');
var Craft = artifacts.require('Craft');
var Batch = artifacts.require('Batch');

// Contracts
var CraftsmanRole = artifacts.require("CraftsmanRole");
var AggregatorRole = artifacts.require("AggregatorRole");
var RetailerRole = artifacts.require("RetailerRole");
var ConsumerRole = artifacts.require("ConsumerRole");
var SupplyChain = artifacts.require("Supplychain");


module.exports = function(deployer) {
  deployer.deploy(Roles);
  deployer.link(Roles, [CraftsmanRole, AggregatorRole, RetailerRole, ConsumerRole]);
  deployer.deploy(CraftsmanRole);
  deployer.deploy(AggregatorRole);
  deployer.deploy(RetailerRole);
  deployer.deploy(ConsumerRole);
  deployer.deploy(Craft);
  deployer.deploy(Batch);
  deployer.link(Craft, SupplyChain);
  deployer.link(Batch, SupplyChain);
  deployer.deploy(SupplyChain);
};