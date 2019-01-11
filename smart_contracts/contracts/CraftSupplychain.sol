pragma solidity ^0.5.0;

import "../node_modules/openzeppelin-solidity/contracts/token/ERC721/ERC721.sol";


contract CraftSupplychain is ERC721 {

  // States a Craft can be in, changes as it proceeds through the supplychain
  enum States {
    productionStarted,
    productionFinished,
    packaged,
    batched,
    forSale,
    sold,
    pickedUp,
    shipped,
    received,
    purchased
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
    uint256 price; // default = 0
    bool forSale; // default = false
    address owner; // msg.sender
    States state;
  }

  // Aggregated crafts of same kind into batches
  struct Batch {
    uint256 id;
    address producer_id;
    string batch_loc;
    string batch_time;
    mapping(uint256 => address) crafts;
    uint256 craft_count;
    uint256 price;
    bool forSale;
  }

  // Holds a mapping of all crafts on the DLT
  mapping(uint256 => Craft) craftRegistry;

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
      false, 0, 0, false,
      msg.sender,
      States.productionStarted);
    craftRegistry[_craftId] = newCraft;
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

  function buyCraftMaterial() public {

  }
  
  function produceCraft() public {

  }

  function packageCraft() public {
			
  }

  function createBatchs() public {
			
  }

  function sellBatch() public {

  }

  function buyBatch() public {
			
  }

  function putBatchForSale() public {
			
  }

  function shipBatch() public {

  }

  function receiveBatch() public {

  }

  function pickUpBatch() public {

  }

  function shipCraft() public {

  }

  function purchaseCraft() public {

  }

  function receiveCraft() public {

  }

}