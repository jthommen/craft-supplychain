pragma solidity >=0.5.0;

import "../roles/CraftsmanRole.sol";
import "../roles/AggregatorRole.sol";
import "../roles/RetailerRole.sol";
import "../roles/ConsumerRole.sol";
import "./Craft.sol";
import "./Batch.sol";
import "../craftcore/Ownable.sol";

contract Supplychain is Ownable, CraftsmanRole, AggregatorRole, RetailerRole, ConsumerRole {

  using Craft for Craft.Data;
  using Craft for Craft.State;
  using Craft for Craft.Registry;
  using Batch for Batch.Data;
  using Batch for Batch.State;
  using Batch for Batch.Registry;

  // contract owner
  address private contractOwner;

  // Define a public mapping 'items' that maps the UPC to an Item.
  Craft.Registry craftRegistry; 
  Batch.Registry batchRegistry;

  // Define a public mapping 'itemsHistory' that maps the UPC to an array of TxHash, 
  // that track its journey through the supply chain -- to be sent from DApp.
  mapping (uint => string[]) craftHistory;
  mapping (uint => string[]) batchHistory;

  // Data structures for information access
  mapping(uint => uint) craftsForSaleMap;
  mapping(uint => uint) batchesForSaleMap;

  
  // Craft Modifiers
  // Modifier that checks craft ownership
  modifier craftOwnerOf(uint _upc) {
    require(craftRegistry.Data[_upc].owner == msg.sender, "Must be the craft owner.");
    _;
  }

  // Modifier that checks craft producer authenticity
  modifier checkCraftProducer(uint _upc) {
    require(craftRegistry.Data[_upc].producer_id == msg.sender, "Must be the craft producer.");
    _;
  }

  modifier checkUnbatched(uint _upc) {
    require(craftRegistry.Data[_upc].batched = false, "Craft must be unbatched.");
    _;
  }

  // Batch Modifiers
  // Modifier that checks batch producer authenticity
  modifier checkBatchProducer(uint _batch_no) {
    require(batchRegistry.Data[_batch_no].producer_id == msg.sender, "Must be the batch producer.");
    _;
  }

  // Modifier that checks batch location
  modifier checkBatchLocation(uint _batch_no) {
    require(batchRegistry.Data[_batch_no].destination == msg.sender, "Must be at batch owner location.");
    _;
  }

  // Modifier that checks batch ownership
  modifier batchOwnerOf(uint _batch_no) {
    require(batchRegistry.Data[_batch_no].owner == msg.sender, "Must be the batch owner.");
    _;
  }

  // Craft State Modifiers
  // Modifier that checks if an craft.state of a upc is productionStarted (0)
  modifier productionStarted(uint _upc) {
    require(craftRegistry.Data[_upc].state == Craft.State.productionStarted, "Craft must have started production.");
    _;
  }

  // Modifier that checks if an craft.state of a upc is productionFinished (1)
  modifier productionFinished(uint _upc) {
    require(craftRegistry.Data[_upc].state == Craft.State.productionFinished, "Craft must have finished production.");
    _;
  }

  // Modifier that checks if an craft.state of a upc is packaged (2)
  modifier packaged(uint _upc) {
    require(craftRegistry.Data[_upc].state == Craft.State.packaged, "Craft must be packaged.");
    _;
  }

  // Modifier that checks if an craft.state of a upc is batched (3)
  modifier batched(uint _upc) {
    require(craftRegistry.Data[_upc].state == Craft.State.batched, "Craft must be batched.");
    _;
  }

  // Modifier that checks if an craft.state of a upc is forSale (4)
  modifier craftForSale(uint _upc) {
    require(craftRegistry.Data[_upc].state == Craft.State.forSale, "Craft must be put up for sale.");
    _;
  }

  // Modifier that checks if an craft.state of a upc is sold (5)
  modifier craftSold(uint _upc) {
    require(craftRegistry.Data[_upc].state == Craft.State.sold, "Craft must be sold.");
    _;
  }

  // Modifier that checks if an craft.state of a upc is shipped (7)
  modifier craftShipped(uint _upc) {
    require(craftRegistry.Data[_upc].state == Craft.State.shipped, "Craft must be shipped.");
    _;
  }


  // Batch State Modifiers
  // Modifier that checks if an batch.state of a batch_no is forSale (4)
  modifier batchForSale(uint _batch_no) {
    require(batchRegistry.Data[_batch_no].state == Batch.State.forSale, "Batch must be up for sale.");
    _;
  }

  // Modifier that checks if an batch.state of a batch_no is pickedUp (6)
  modifier pickedUp(uint _batch_no) {
    require(batchRegistry.Data[_batch_no].state == Batch.State.pickedUp, "Batch must be picked up.");
    _;
  }

  // Modifier that checks if an batch.state of a batch_no is shipped (7)
  modifier batchShipped(uint _batch_no) {
    require(batchRegistry.Data[_batch_no].state == Batch.State.shipped, "Batch must be shipped.");
    _;
  }

  // In the constructor set 'owner' to the address that instantiated the contract
  constructor() public payable {
    contractOwner = msg.sender;
  }

  // Define a function 'kill' if required
  function kill() public {
    if (msg.sender == contractOwner) {
      selfdestruct(msg.sender);
    }
  }
  
  // Starts the production process by buying raw material
  function buyCraftMaterial(
    string memory _name,
    string memory _description,
    string memory _producer,
    string memory _prod_lat,
    string memory _prod_lng,
    uint _prod_time
    ) public onlyCraftsman() {
      craftRegistry.startNewCraft(_name, _description, _producer, _prod_lat, _prod_lng, _prod_time);
  }

  function getHash(
    string memory _name,
    string memory _description,
    string memory _producer,
    uint _prod_time
  ) public pure returns(uint) {
    bytes32 _bytes32Hash = keccak256(abi.encodePacked(_name, _description, _producer, _prod_time));
    return uint(_bytes32Hash);
  }

  // Retrieves the craft information
  function getCraftInfo(uint _upc) public view returns(
    string memory name,
    string memory description, 
    string memory producer,
    address producer_id,
    string memory prod_lat,
    string memory prod_lng,
    uint prod_time) {
    return craftRegistry.getInfo(_upc);
  }
  
  function getCraftOwner(uint _upc) public view returns(address owner) {
    return craftRegistry.getOwner(_upc);
  }

  // Gets the craft state
  function getCraftState(uint _upc) public view returns(Craft.State) {
    return craftRegistry.getState(_upc);
  }

  function produceCraft(uint _upc) public onlyCraftsman() checkCraftProducer(_upc) productionStarted(_upc){
    craftRegistry.stateProductionFinished(_upc);
  }

  function packageCraft(uint _upc) public onlyCraftsman() checkCraftProducer(_upc) productionFinished(_upc){
    craftRegistry.statePackaged(_upc);
  }

  function createBatch(
    string memory _name,
    string memory _description,
    string memory _producer,
    string memory _batch_lat,
    string memory _batch_lng,
    uint _batch_time
  ) public onlyCraftsman(){
    batchRegistry.makeNewBatch(_name, _description, _producer, _batch_lat, _batch_lng, _batch_time);
  }

  // Retrieves the batch information
  function getBatchInfo(uint _batch_no) public view returns(
    string memory name,
    string memory description, 
    string memory producer,
    address producer_id,
    string memory batch_lat,
    string memory batch_lng,
    uint batch_time) {
    return batchRegistry.getInfo(_batch_no);
  }

  // Gets the batch state
  function getBatchState(uint _batch_no) public view returns(Batch.State) {
    return batchRegistry.getState(_batch_no);
  }

  // Gets the batch owner
  function getBatchOwner(uint _batch_no) public view returns(address) {
    return batchRegistry.getOwner(_batch_no);
  }

  function addCraftsToBatch(uint _batch_no, uint[] memory _crafts) public onlyCraftsman() checkBatchProducer(_batch_no) {
    Batch.Data storage batch = batchRegistry.Data[_batch_no];
    uint i;
    for(i = 0; i<_crafts.length; i++) {
      Craft.Data storage craft = craftRegistry.Data[_crafts[i]];
      require(craft.producer_id == msg.sender, "Can only add crafts made by batch producer to batch.");
      batch.crafts.push(_crafts[i]);
      craft.batch = _batch_no;
      craft.state = Craft.State.batched;
    }
    batch.craft_count += i;
  }
 
  function putBatchForSale(uint _batch_no, uint _price) public batchOwnerOf(_batch_no) {
    batchesForSaleMap[_batch_no] = _price;
    Batch.Data storage batch = batchRegistry.Data[_batch_no];
    batch.state = Batch.State.forSale;
  }

  function getBatchPrice(uint _batch_no) public view returns(uint price) {
    return batchesForSaleMap[_batch_no];
  }

  function buyBatch(uint _batch_no) public payable batchForSale(_batch_no){
    uint batchCost = batchesForSaleMap[_batch_no];
    require(msg.value >= batchCost, "Not enough money available to buy the batch.");
    
    // Remove batch from sales map
    batchesForSaleMap[_batch_no] = 0;

    // Transfer seller the money
    Batch.Data storage batch = batchRegistry.Data[_batch_no];
    address payable oldOwner = batch.owner;
    oldOwner.transfer(batchCost);

    // Update ownership
    batch.owner = msg.sender;
    batch.state = Batch.State.sold;

    // return over pay
    if(msg.value > batchCost) { 
      msg.sender.transfer(msg.value - batchCost);
    }
  }

  function pickUpBatch(uint _batch_no) public onlyAggregator() batchOwnerOf(_batch_no) {
    batchRegistry.statePickedUp(_batch_no);
  }

  function shipBatch(uint _batch_no, address _dest) public {
    batchRegistry.stateShipped(_batch_no, _dest);
  }

  function receiveBatch(uint _batch_no) public onlyRetailer() batchShipped(_batch_no){
    batchRegistry.stateReceived(_batch_no);
  }
  
  
  function unBatch(uint _batch_no) public onlyRetailer() batchOwnerOf(_batch_no) checkBatchLocation(_batch_no) {
    Batch.Data memory batch = batchRegistry.Data[_batch_no];
    for(uint i=0; i<batch.crafts.length; i++) {
      Craft.Data storage craft = craftRegistry.Data[batch.crafts[i]];
      craft.batched = false;
      craft.owner = msg.sender;
    }
  }
  
  function putCraftForSale(uint _upc, uint _price) public onlyRetailer() craftOwnerOf(_upc) checkUnbatched(_upc) {
    craftsForSaleMap[_upc] = _price;
    Craft.Data storage craft = craftRegistry.Data[_upc];
    craft.state = Craft.State.forSale;
  }

  function buyCraft(uint _upc) public payable onlyConsumer() craftForSale(_upc) {
    uint craftCost = craftsForSaleMap[_upc];
    require(msg.value >= craftCost, "Not enough money available to buy the craft.");

    craftsForSaleMap[_upc] = 0;
    Craft.Data storage craft = craftRegistry.Data[_upc];
    address payable oldOwner = craft.owner;
    oldOwner.transfer(craftCost);

    craft.owner = msg.sender;
    craft.state = Craft.State.sold;

    // return over pay
    if(msg.value > craftCost) { 
      msg.sender.transfer(msg.value - craftCost);
    }

  }

  function shipCraft(uint _upc) public onlyRetailer() craftSold(_upc) {
    craftRegistry.stateShipped(_upc);
  }

  function receiveCraft(uint _upc) public onlyConsumer() craftShipped(_upc){
    craftRegistry.stateReceived(_upc);
  }

}
