const CraftSupplychain = artifacts.require('Supplychain');

contract('Supplychain', accounts => {

    // Error catching from solidity
    let catchRevert = require('./exceptions.js').catchRevert;
    let defaultAccount = accounts[0];
    
    // Global setup
    let craftsman1 = accounts[1];
    let craftsman2 = accounts[2];
    let aggregator = accounts[2];
    let retailer = accounts[3];
    let consumer = accounts[4];
    let time1 = 1547203344300;
    let time2 = 1547203344400;
    let batchTime = 1547217700436;
    let craftHash1 = '46757543844082306353081225499869141453631652546996012760947200050485532950115';
    let craftHash2 = '36580957012417366262508478063966664319855081564002569778309017434131730997965';
    let batchHash = '81257438182653602719049810730241408647975968798184685282804374355538191972097';
    
    beforeEach(async function() {
        // Instantiate a new, fresh contract instance for every test
        this.contract = await CraftSupplychain.new({from: defaultAccount});

        // Set roles for actors
        await this.contract.addCraftsman(craftsman1);
        await this.contract.addCraftsman(craftsman2);
        await this.contract.addAggregator(aggregator);
        await this.contract.addRetailer(retailer);
        await this.contract.addConsumer(consumer);
        
        // Set up some basic crafts for all tests
        await this.contract.buyCraftMaterial('Scarf', 'Beautiful Pashmina Scarf', 'Nadash', '28.135699', '85.638029', time1, {from: craftsman1});
        await this.contract.buyCraftMaterial('Wooden Box', 'Beautiful Wooden Box', 'Nadash', '28.135699', '85.638029', time2, {from: craftsman1});  
        // gas used: 262624 (11.01.2019: $0.072)
        
    });
    
    // Craftsmen
    describe('Craftsman: Can produce a craft', function() {
        
        let craftInfo;

        
        describe('can start production', function(){

            beforeEach(async function() {
                craftInfo = await this.contract.getCraftInfo(craftHash1);
            });

            it('gets the right hash value', async function() {
                let testHash1 = await this.contract.getHash('Scarf', 'Beautiful Pashmina Scarf', 'Nadash', time1);
                let testHash2 = await this.contract.getHash('Wooden Box', 'Beautiful Wooden Box', 'Nadash', time2);
                //console.log('testHash1: ', testHash1.toString());
                //console.log('testHash2: ', testHash2.toString());
                assert.equal(craftHash1, testHash1.toString());
                assert.equal(craftHash2, testHash2.toString());
            });
    
            // instantiation of new craft works, by getting raw material for craft
            it('can get raw materials & start production', async function() {
                let name = craftInfo.name;
                let description = craftInfo.description;
                let producer = craftInfo.producer;
                let producer_id = craftInfo.producer_id;
                let prod_lat = craftInfo.prod_lat;
                let prod_lng = craftInfo.prod_lng;
                let prod_time = craftInfo.prod_time;

                assert.equal(name, 'Scarf');
                assert.equal(description, 'Beautiful Pashmina Scarf');
                assert.equal(producer, 'Nadash');
                assert.equal(producer_id, craftsman1);
                assert.equal(prod_lat, '28.135699');
                assert.equal(prod_lng, '85.638029');
                assert.equal(prod_time.toString(), time1.toString());

            });

            it('can start production process', async function() {
                // can assign craft state to productionStarted
                let state = await this.contract.getCraftState(craftHash1);
                assert.equal(state, 0);
            });
        });

        describe('can finish production', function(){

            beforeEach(async function() {
            });
            
            it('can assign productionFinished state', async function() {
                // can call produceCraft function
                let updateTx = await this.contract.produceCraft(craftHash1, {from: craftsman1});
                // gas used: 30174 (11.01.2019: $0.008)
                
                // can assign craft state finishedProduction
                let craftState = await this.contract.getCraftState(craftHash1);
                assert.equal(craftState, 1);
            });

            it('can not finish craft if not the producer', async function(){
                await catchRevert(this.contract.produceCraft(craftHash1, {from: craftsman2}));
            });

        });


        describe('can package craft', function() {

            it('can not package unfinished craft', async function(){
                await catchRevert(this.contract.packageCraft(craftHash1, {from: craftsman2}));
            });

            beforeEach(async function() {
                await this.contract.produceCraft(craftHash1, {from: craftsman1});
                await this.contract.packageCraft(craftHash1, {from: craftsman1});
                // gas used: 30174 (11.01.2019: $0.008)
            });

            it('can package a craft', async function() {
                // can call packageCraft function
                // can assign craft state packaged
                let craftState = await this.contract.getCraftState(craftHash1);
                assert.equal(craftState, 2);
            });

            it('can not package craft if not the producer', async function(){
                await catchRevert(this.contract.packageCraft(craftHash1, {from: craftsman2}));
            });

        });
        
        describe('can create batches', function() {
    
            beforeEach(async function() {
                await this.contract.createBatch('Scarfs', '10 Pashminas', 'Nadash', '28.135699', '85.638029', batchTime, {from: craftsman1});
                //console.log(createTx.receipt); // gas used: 220962 (11.01.2019: $0.06)
            });
        
            let batchInfo;

            describe('can retrieve & update batches', function(){

                beforeEach(async function() {
                    batchInfo = await this.contract.getBatchInfo(batchHash);
                });

                it('gets the right hash value', async function() {
                    let testHash = await this.contract.getHash('Scarfs', '10 Pashminas', 'Nadash', batchTime);
                    console.log('testHash1: ', testHash.toString());
                    assert.equal(batchHash, testHash.toString());
                });

                it('can retrieve correct batch state', async function() {
                    let batchState = await this.contract.getBatchState(batchHash);
                    assert.equal(batchState, 0);
                });
        
                // instantiation of new craft works, by getting raw material for craft
                it('can get batch info', async function() {
                    let name = batchInfo.name;
                    let description = batchInfo.description;
                    let producer = batchInfo.producer;
                    let producer_id = batchInfo.producer_id;
                    let batch_lat = batchInfo.batch_lat;
                    let batch_lng = batchInfo.batch_lng;
                    let batch_time = batchInfo.batch_time;
    
                    assert.equal(name, 'Scarfs');
                    assert.equal(description, '10 Pashminas');
                    assert.equal(producer, 'Nadash');
                    assert.equal(producer_id, craftsman1);
                    assert.equal(batch_lat, '28.135699');
                    assert.equal(batch_lng, '85.638029');
                    assert.equal(batch_time.toString(), batchTime.toString());
                });
    
            });
    
            it('can add crafts to batch', async function() {
                // can assign crafts to a specific batch
                // crafts in batch get batched attribute set to true
                // batch array & craft batched id are updated properly
                let craftsToAdd = [craftHash1, craftHash2];
                await this.contract.addCraftsToBatch(batchHash, craftsToAdd, {from:craftsman1});
                // gas used: 169088 (11.01.2019: $0.046)
            });
    
            it('can put batch up for sale', async function() {
                // can add batch to for sale map
                // set price for batch
                let batchPrice = web3.utils.toWei('1.0', 'ether');
                assert.equal(await this.contract.getBatchOwner(batchHash), craftsman1);
                await this.contract.putBatchForSale(batchHash, batchPrice, {from:craftsman1});
                assert.equal(await this.contract.getBatchPrice(batchHash), batchPrice);
                let batchState = await this.contract.getBatchState(batchHash);
                assert.equal(batchState, 1);
            });
    
        });
    });



    // Aggregator
    describe('Aggregator: Can handle batches', function() {
        let batchPrice = web3.utils.toWei('1.0', 'ether');


        beforeEach(async function() {

            // make batch
            await this.contract.createBatch('Scarfs', '10 Pashminas', 'Nadash', '28.135699', '85.638029', batchTime, {from: craftsman1});

            // add crafts to batch
            let craftsToAdd = [craftHash1, craftHash2];
            await this.contract.addCraftsToBatch(batchHash, craftsToAdd, {from:craftsman1});

            // put batch up for sale
            await this.contract.putBatchForSale(batchHash, batchPrice, {from:craftsman1});

        });
        
        describe('aggregator can buy batch', function() {
            
            beforeEach(async function(){
                await this.contract.buyBatch(batchHash, {from: aggregator, value: batchPrice, gasPrice: 0})
            });

            it('aggregator is owner after he bought the batch', async function() {
                // owner address is changed
                assert.equal(await this.contract.getBatchOwner(batchHash), aggregator);
            });
    
            it('batch is taken out of forSale map', async function(){
               assert.equal(await this.contract.getBatchPrice(batchHash), 0);
            });

            it('batch state is set to sold', async function(){
                let batchState = await this.contract.getBatchState(batchHash);
                assert.equal(batchState, 2);
             });
        });

        describe('aggregator balance is changed correctly', function() {

            it('overpaid amount is transferred back ', async function () { 
                let overpaidAmount = web3.utils.toWei('1.05', 'ether')
                const balanceBeforeTransaction = await web3.eth.getBalance(aggregator)
                await this.contract.buyBatch(batchHash, {from: aggregator, value: overpaidAmount, gasPrice: 0})
                const balanceAfterTransaction = await web3.eth.getBalance(aggregator)
                assert.equal(balanceBeforeTransaction-balanceAfterTransaction, batchPrice)
              });
        });

        describe('aggregator can pick up batches from craftsmen', function() {
            
            beforeEach(async function() {
                await this.contract.buyBatch(batchHash, {from: aggregator, value: batchPrice, gasPrice: 0})
                await this.contract.pickUpBatch(batchHash, {from: aggregator});
            });
            
            it('can pick up batches from craftsmen', async function() {
                assert.equal(await this.contract.getBatchOwner(batchHash), aggregator);
                let batchState = await this.contract.getBatchState(batchHash);
                assert.equal(batchState, 3);
            });

        });

        describe('aggregator can resale and ship picked-up batch', function() {

            beforeEach(async function(){
                await this.contract.buyBatch(batchHash, {from: aggregator, value: batchPrice, gasPrice: 0});
                await this.contract.pickUpBatch(batchHash, {from: aggregator});
                batchPrice = web3.utils.toWei('1.5', 'ether');
                await this.contract.putBatchForSale(batchHash, batchPrice, {from:aggregator});
            });

            it('can put batch up for sale', async function() {
                // can add batch to for sale map
                // set forSale attrb. of batch to true
                // set price for batch
                assert.equal(await this.contract.getBatchOwner(batchHash), aggregator);
                assert.equal(await this.contract.getBatchPrice(batchHash), batchPrice);
                let batchState = await this.contract.getBatchState(batchHash);
                assert.equal(batchState, 1);
            });

            describe('aggregator can ship batch', function() {

                beforeEach(async function() {
                    await this.contract.buyBatch(batchHash, {from: retailer, value: batchPrice, gasPrice: 0});
                });

                it('can ship sold batch to retailer', async function() {
                    // can set shipped state of batch to true
                    await this.contract.shipBatch(batchHash, retailer, {from: aggregator});
                    let batchState = await this.contract.getBatchState(batchHash);
                    assert.equal(batchState, 4);
                });

                it('can only ship batch to owner', async function() {
                    await catchRevert(this.contract.shipBatch(batchHash, craftsman2, {from: aggregator}));
                });
            });
    
        });

    });

    // Retailer
    describe('Retailer: Can buy batches & sell crafts', function() {

        let batchPrice = web3.utils.toWei('1.5', 'ether');

        beforeEach(async function() {

            // make batch
            await this.contract.createBatch('Scarfs', '10 Pashminas', 'Nadash', '28.135699', '85.638029', batchTime, {from: craftsman1});

            // add crafts to batch
            let craftsToAdd = [craftHash1, craftHash2];
            await this.contract.addCraftsToBatch(batchHash, craftsToAdd, {from:craftsman1});

            // put batch up for sale
            await this.contract.putBatchForSale(batchHash, batchPrice, {from:craftsman1});

            // buy batch
            await this.contract.buyBatch(batchHash, {from: retailer, value: batchPrice, gasPrice: 0});

        });

        it('retailer is owner after he bought the batch', async function() {
            // owner address is changed
            assert.equal(await this.contract.getBatchOwner(batchHash), retailer);
        });

        it('batch is taken out of forSale map', async function(){
           assert.equal(await this.contract.getBatchPrice(batchHash), 0);
        });

        it('batch state is set to sold', async function(){
            let batchState = await this.contract.getBatchState(batchHash);
            assert.equal(batchState, 2);
         });

        describe('can receive batch', function() {

            it('can receive batch shipped batch', async function() {
                await this.contract.shipBatch(batchHash, retailer, {from: aggregator});
                await this.contract.receiveBatch(batchHash, {from: retailer});
                let batchState = await this.contract.getBatchState(batchHash);
                assert.equal(batchState, 5);
            });

            it('can not receive not shipped batch', async function() {
                await catchRevert(this.contract.receiveBatch(batchHash, {from: retailer}));
            });

            it('only recipient can receive batch', async function() {
                await catchRevert(this.contract.receiveBatch(batchHash, {from: craftsman2}));
            });

        });

        describe('can sell crafts', function() {
            beforeEach(async function() {
                await this.contract.shipBatch(batchHash, retailer, {from: aggregator});
                await this.contract.receiveBatch(batchHash, {from: retailer});
            });

            it('can unbatch batches and obtain ownership', async function() {
                await this.contract.unBatch(batchHash, {from: retailer});
                let craftOwner1 = await this.contract.getCraftOwner(craftHash1);
                let craftOwner2 = await this.contract.getCraftOwner(craftHash2);
                assert.equal(craftOwner1, retailer);
                assert.equal(craftOwner2, retailer);
            });
        });


    });

    // Consumer

    describe('Consumer: Can look up information', function() {

        beforeEach(async function() {
            // make batch
            await this.contract.createBatch('Scarfs', '10 Pashminas', 'Nadash', '28.135699', '85.638029', batchTime, {from: craftsman1});

            // add crafts to batch
            let craftsToAdd = [craftHash1, craftHash2];
            await this.contract.addCraftsToBatch(batchHash, craftsToAdd, {from:craftsman1});
        });

        it('can check craft authenticity', async function() {
            let craftInfo = await this.contract.getCraftInfo(craftHash1, {from: consumer});

            let name = craftInfo.name;
            let description = craftInfo.description;
            let producer = craftInfo.producer;
            let producer_id = craftInfo.producer_id;
            let prod_lat = craftInfo.prod_lat;
            let prod_lng = craftInfo.prod_lng;
            let prod_time = craftInfo.prod_time;

            assert.equal(name, 'Scarf');
            assert.equal(description, 'Beautiful Pashmina Scarf');
            assert.equal(producer, 'Nadash');
            assert.equal(producer_id, craftsman1);
            assert.equal(prod_lat, '28.135699');
            assert.equal(prod_lng, '85.638029');
            assert.equal(prod_time.toString(), time1.toString());
        });

        it('can check batch history', async function(){
            let batchInfo = await this.contract.getBatchInfo(batchHash, {from: consumer});

            let name = batchInfo.name;
            let description = batchInfo.description;
            let producer = batchInfo.producer;
            let producer_id = batchInfo.producer_id;
            let batch_lat = batchInfo.batch_lat;
            let batch_lng = batchInfo.batch_lng;
            let batch_time = batchInfo.batch_time;

            assert.equal(name, 'Scarfs');
            assert.equal(description, '10 Pashminas');
            assert.equal(producer, 'Nadash');
            assert.equal(producer_id, craftsman1);
            assert.equal(batch_lat, '28.135699');
            assert.equal(batch_lng, '85.638029');
            assert.equal(batch_time.toString(), batchTime.toString());
        });

    });
    
});
