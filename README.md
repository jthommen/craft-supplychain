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
