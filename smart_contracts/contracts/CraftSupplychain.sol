pragma solidity ^0.5.0;

import "../node_modules/openzeppelin-solidity/contracts/token/ERC721/ERC721.sol";

contract CraftSupplychain is ERC721 {

  // States a Craft can be in, changes as it proceeds through the supplychain
  enum States {
    productionStarted, // 0
    productionFinished, // 1
    packaged, // 2
    batched, // 3
    forSale, // 4
    sold, // 5
    pickedUp, // 6
    shipped, // 7
    received // 8
  }

  // Basic object of the craft supply chain
  struct Craft {
    uint256 id; // auto
    string name; // arg
    string description; // arg
    string producer; // arg
    address producer_id; // msg.sender
    string prod_loc; // arg
    uint256 prod_time; // via JS in front_end
    bool packaged; // default = false
    uint256 batch; // default = 0
    States state;
  }

  // Aggregated crafts of same kind into batches
  struct Batch {
    uint256 id;
    string name;
    string description;
    string producer;
    address producer_id;
    string batch_loc;
    uint256 batch_time;
    uint256[] crafts;
    uint256 craft_count;
    States state;
    address destination;
  }

  // Data structures for information access
  mapping(uint256 => Craft) craftRegistry; 
  mapping(uint256 => Batch) batchRegistry;
  mapping(uint256 => uint256) batchesForSaleMap;
  mapping(address => uint256[]) craftsByCraftsman;
  mapping(address => uint256[]) batchesByCraftsman;
  mapping(address => uint256[]) batchesByIntermediary;

  // Starts the production process by buying raw material
  function buyCraftMaterial(
    string memory _name,
    string memory _description,
    string memory _producer,
    string memory _prod_loc,
    uint256 _prod_time
    ) public {
    uint256 _craftId = createIdHash(_name, _description, _producer, _prod_loc, _prod_time);
    Craft memory newCraft = Craft(
      _craftId,
      _name,
      _description,
      _producer,
      msg.sender,
      _prod_loc,
      _prod_time,
      false, 0,
      States.productionStarted);
    craftRegistry[_craftId] = newCraft;
    craftsByCraftsman[msg.sender].push(_craftId);
    _mint(msg.sender, _craftId);
  }

  // Retrieves the craft information
  function getCraftInfo(uint256 _craftId) public view returns(
    string memory name,
    string memory description, 
    string memory producer,
    address producer_id,
    string memory prod_loc,
    uint256 prod_time) {
    Craft memory craft = craftRegistry[_craftId];
    name = craft.name;
    description = craft.description;
    producer = craft.producer;
    producer_id = craft.producer_id;
    prod_loc = craft.prod_loc;
    prod_time = craft.prod_time;
    return (name, description, producer, producer_id, prod_loc, prod_time);
  }

  // Gets the craft state
  function getCraftState(uint256 _craftId) public view returns(States) {
    Craft memory craft = craftRegistry[_craftId];
    return craft.state;
  }

  // Creates a unique hash out of craft informations
  function createIdHash(
    string memory _name,
    string memory _description,
    string memory _producer,
    string memory _prod_loc,
    uint256 _prod_time
    ) public pure returns(uint256) {
    bytes32 _bytes32Hash = keccak256(abi.encodePacked(_name, _description, _producer,  _prod_loc, _prod_time));
    return uint256(_bytes32Hash);
  }

  
  function produceCraft(uint256 _craftId) public {
    Craft storage craft = craftRegistry[_craftId];
    require(craft.producer_id == msg.sender, "Only the producer can finish the production process.");
    require(craft.state == States.productionStarted, "Only started crafts can be finished.");
    craft.state = States.productionFinished;
  }

  function packageCraft(uint256 _craftId) public {
    Craft storage craft = craftRegistry[_craftId];
    require(craft.producer_id == msg.sender, "Only the producer can package the craft.");
    require(craft.state == States.productionFinished, "Only finished crafts can be packed.");
    craft.state = States.packaged;
  }

  function createBatch(
    string memory _name,
    string memory _description,
    string memory _producer,
    string memory _batch_loc,
    uint256 _batch_time
  ) public {
    uint256 _batchId = createIdHash(_name, _description, _producer, _batch_loc, _batch_time);
    Batch memory newBatch = Batch(
      _batchId,
      _name,
      _description,
      _producer,
      msg.sender,
      _batch_loc,
      _batch_time,
      new uint256[](0), 0,
      States.batched,
      msg.sender
    );
    batchRegistry[_batchId] = newBatch;
    batchesByCraftsman[msg.sender].push(_batchId);
    _mint(msg.sender, _batchId);
  }

  // Retrieves the batch information
  function getBatchInfo(uint256 batchId) public view returns(
    string memory name,
    string memory description, 
    string memory producer,
    address producer_id,
    string memory batch_loc,
    uint256 batch_time) {
    Batch memory batch = batchRegistry[batchId];
    name = batch.name;
    description = batch.description;
    producer = batch.producer;
    producer_id = batch.producer_id;
    batch_loc = batch.batch_loc;
    batch_time = batch.batch_time;
    return (name, description, producer, producer_id, batch_loc, batch_time);
  }

  // Gets the batch state
  function getBatchState(uint256 _batchId) public view returns(States) {
    Batch memory batch = batchRegistry[_batchId];
    return batch.state;
  }

  function addCraftsToBatch(uint256 _batchId, uint256[] memory _crafts) public {
    Batch storage batch = batchRegistry[_batchId];
    require(batch.producer_id == msg.sender, "Only the batch producer can add crafts to a batch.");
    uint i;
    for(i = 0; i<_crafts.length; i++) {
      Craft memory craft = craftRegistry[_crafts[i]];
      require(craft.producer_id == msg.sender, "Can only add crafts made by batch producer to batch.");
    }
    for(i = 0; i<_crafts.length; i++) {
      batch.crafts.push(_crafts[i]);
      Craft storage craft = craftRegistry[_crafts[i]];
      craft.batch = _batchId;
      craft.state = States.batched;
    }
    batch.craft_count += i;

  }
 
  function putBatchForSale(uint256 _batchId, uint256 _price) public {
    require(this.ownerOf(_batchId) == msg.sender, "Only owner can put batch up for sale.");
    batchesForSaleMap[_batchId] = _price;
    Batch storage batch = batchRegistry[_batchId];
    batch.state = States.forSale;
  }

  function getBatchPrice(uint256 _batchId) public view returns(uint256 price) {
    return batchesForSaleMap[_batchId];
  }

  function buyBatch(uint256 _batchId) public payable {
    require(batchesForSaleMap[_batchId] > 0, "Batch must be up for sale.");
    
    uint256 batchCost = batchesForSaleMap[_batchId];
    address batchOwner = this.ownerOf(_batchId);
    require(msg.value >= batchCost, "Not enough money available to buy the batch.");

    _transferFrom(batchOwner, msg.sender, _batchId);
    batchesForSaleMap[_batchId] = 0;
    Batch storage batch = batchRegistry[_batchId];
    batch.state = States.sold;
    batchesByIntermediary[msg.sender].push(_batchId);

    // return over pay
    if(msg.value > batchCost) { 
      msg.sender.transfer(msg.value - batchCost);
    }
  }

  function pickUpBatch(uint256 _batchId) public {
    require(this.ownerOf(_batchId) == msg.sender, "Only the owner can pick up batch from producer.");
    Batch storage batch = batchRegistry[_batchId];
    batch.state = States.pickedUp;
  }


  function shipBatch(uint256 _batchId, address _dest) public {
    Batch storage batch = batchRegistry[_batchId];
    require(this.ownerOf(_batchId) == _dest, "Can only send batch to it's owner.");
    batch.destination = _dest;
    batch.state = States.shipped;
  }

  function receiveBatch(uint256 _batchId) public {
    Batch storage batch = batchRegistry[_batchId];
    require(batch.state == States.shipped, "Can only received shipped batches.");
    require(batch.destination == msg.sender, "Only the batch recipient can receive a batch.");
    batch.state = States.received;
  }

}
