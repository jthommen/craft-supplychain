const CraftSupplychain = artifacts.require('CraftSupplychain');

contract('CraftSupplychain', accounts => {

    // Error catching from solidity
    let catchRevert = require('./exceptions.js').catchRevert;
    let defaultAccount = accounts[0];

    // Instantiate a new, fresh contract instance for every test
    beforeEach(async function() {
        this.contract = await CraftSupplychain.new({from: defaultAccount});
    });

    // Craftsmen
    describe('can produce a craft', function() {

        it('can get raw materials', async function() {
            // instantiation of new craft works, by getting raw material for craft
        });

        it('can start production process', async function() {
            // can assign craft state inProduction
        });

        it('can create a craft out of raw materials', async function() {
            // can call createCraft function
            // can assign craft state finishedProduction
        });

        it('can package a craft', async function() {
            // can call packageCraft function
            // can assign craft state packaged
        });

        it('can combine a craft', async function() {
            // can call packageCraft function
            // can assign craft state packaged
        });
    });

    describe('can create batches', function() {

        it('can create a batch item', async function() {
            // can instantiate a new batch
            // batch has it's on number
            // batch has producer name
            // batch owner has producer address
            // batch has batch_time (creation time)
        });

        it('can add crafts to batch', async function() {
            // can assign crafts to a specific batch
            // crafts in batch get batched attribute set to true
            // batch map & craft batched id are updated properly
        });

        it('can put batch up for sale', async function() {
            // can add batch to for sale map
            // set forSale attrb. of batch to true
            // set price for batch
        });

    });


    // Aggregator
    describe('can handle batches', function() {

        it('can buy batch', async function() {
            // if balance is sufficient, can buy batch
            // batch is taken out of forSale map
            // batch attrb. forSale is set to false
            // owner address is changed
        });

        it('can pick up batches from craftsmen', async function() {
            // can set batch status to pickedUp
            // can set batch status to sold
        });

        it('can put batch up for sale', async function() {
            // can add batch to for sale map
            // set forSale attrb. of batch to true
            // set price for batch
        });

        it('can ship sold batch to retailer', async function() {
            // if batch is sold
            // can set shipped state of batch to true
        });

    });

    // Retailer
    describe('can buy batches', function() {

        it('can buy batch', async function() {
            // if balance is sufficient, can buy batch
            // batch is taken out of forSale map
            // batch attrb. forSale is set to false
            // owner address is changed
        });

        it('can receive batch', async function() {
            // can set shipped batch status to received
        });

    });

    describe('can sell crafts', function() {

        it('can put crafts up for sale', async function() {
            // can put crafts up for sale that where in batches
            // can set price
            // can add to craftForSale map
        });

        it('can ship sold craft to consumer', async function() {
            // if craft is sold
            // can set shipped state of craft to true
        });
    });

    // Consumer
    describe('can buy crafts', function() {

        it('can buy craft', async function() {
            // if balance is sufficient, can buy craft
            // craft is taken out of forSale map
            // craft attrb. forSale is set to false
            // owner address is changed
        });

        it('can receive batch', async function() {
            // can set shipped craft status to received
        });

    });
});