# Craft Supplychain
Repo for the final project of the Udacity Blockchain Developer Nanodegree: Blockchain Supply Chain Solution.

---

## Part A - Planning
**Choosen Supply Chain**: Craftsmen all over the world, producing handicrafts.

**Problem**: *Craftsmen* often people have amazing crafting skills in different regions of the world, but don't have a
big market to sell their goods except for some tourists that visit locally.
*Buyers* are scattered all over the world,
but buying online without verifying the authenticity makes it a gamble. Often once a good is received, the difference
between handcrafted object and machine produced counterfeit is hard to tell. 
Without personal interaction trust is a major issue.

**Solution**: Putting the crafts on the blockchain.

**Actors**
- *Craftsmen*: Buys raw materials needed for his crafts, creates the crafts, packages them and aggregates them in batches.
- *Aggregator*: Deals with the different craftsmen, does quality control, buys crafts in batches and picks up the batches at the craftsmen. Then ships the batches to the interested retailer.
- *(Online) Retailer*: Buys batches of crafts from aggregators, sells & ships individual crafts to the consumer.
- *Consumer*: Buys different crafts at the retailer.

**Diagrams**
- *Activity*: Shows the different steps a craft goes through from being raw materials until it ends up at the consumer.
- *Sequence*: The different sequences and how the actors are involved in the different steps as the crafts proceed through the supply chain.
- *States*: The different states an actor and crafts can be in when proceeding through the supply chain.
- *Classes (Data Model)*: The different data models needed to correctly depict the supply chain involving 4 actors, crafts and aggregated batches.

--- 
## Part B - Implementation
**Technologies Used:**

* Node 10.15.0
* NPM 6.4.1
* ganache-cli 6.2.5
* Truffle 5.0.1
* http-server 0.11.1


### Functionality

- *Actors*: As described in Part A: Craftsmen, Aggregators, Retailers, Consumer
- *Data Structures*: Crafts & Batches. Crafts are produced by craftsmen and then put together into batches for easier wholesale handling. Batches are a collection of crafts. The craftsmen create crafts and put them into batches. Then the aggregators buy the batches, pick them up and sell them to the retailers. The retailers unbatch the crafts and sell the individual crafts to the consumers.
- *States*: Different states for the craft and batch data structure.
  - Craft: productionStarted, productionFinished, packaged, batched, unbatched, forSale, sold, shipped, received
  - Batch: batched, forSale, sold, pickedUp, shipped, received, unbatched
- *Unit Tests*: Total of 30 unit tests for all stages of the supply chain, involving crafts & batches.
- *Libraries*: Wrote my own libraries individually for the craft and the batch data type & associated actions.

### Implemented Actions on the blockchain

The implemented actions are either general without access restrictions, depend on a specific state the craft or batch is in or are tied to ownership.

- Get craft/batch identifier: Can retrieve craft or batch information by supplying the upc (for crafts) or the batch_no (for batches)
- Get owner: Can retrieve the owner of a specific craft or batch by supplying the upc or batch_no
- Get state: Can retrieve the state of a specific craft or batch by supplying the upc or batch_no
- Put craft/batch for sale: Can add craft or batch to the forSale list and make it purchasable
- Get price: Can retrieve the price of a specific craft or batch that was put up for sale by supplying the upc or batch_no
- Craftsmen specific:
  - Start production process by buying craft material
  - Finish production process by creating the craft
  - Packaging the craft
  - Creating a batch
  - Adding crafts to a batch
  - Putting the batch up for sale
- Aggregator specific:
  - Buy a batch that was put up for sale
  - Pick up batch at the craftsman
  - Put batch up for sale
  - Ship batch to new owner (retailer)
- Retailer
  - Buy a batch that was put up for sale
  - Receive shipped batch
  - Unbatch batch to retrieve the individual crafts
  - Put individual crafts up for sale
  - Ship craft to new owner (consumer)
- Consumer
  - Buy craft put up for sale
  - Receive shipped craft
  
### Implemented Actions on the frontend

The front-end is a demonstration of how to interact with the implemented functions on the blockchain and (for now) has limited functions. The user can:
- Check roles: Check which roles are associated with his address by clicking the 'Get Roles' button. Roles are listed below and the respective roles the address has are highlighted.
- Add/remove roles: The user can toggle (add or remove) roles associated with his address by clicking the respective buttons (Craftsman, Aggregator, Retailer, Consumer). After the transaction went through, the new role he has or have been removed are reflected in the information presented
- Check craft authenticity: By supplying a valid UPC, the user can retrieve the craft information from the blockchain: Name, description, producer, producer address, production location latitude & longitude and production time and date.
- Start the production processes: If the user has the craftsman role, he can supply the necessary information and start production process of a new craft! After successful chain entry, the UPC is returned with which the user can retrieve the craft information in the check craft authenticity field.

### How to test

1. Clone repo
2. Make sure you have node, npm, ganache-cli, truffle and http-server installed globally
3. Change directory into smart_contracts folder `cd smart_contracts`, install npm modules `npm i`
4. Start ganache with `ganache-cli -l 8000000`
5. Run truffle tests in separate window with `truffle test` all tests should pass
6. Change directory into frontend folder 
7. Start up local http server in frontend directory with `http-server`
8. Visit local URL supplied by http-server (default: http://127.0.0.1:8080)
9. Unlock metamask and start using the Dapp!

