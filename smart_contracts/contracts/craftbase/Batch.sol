pragma solidity >=0.5.0;

library Batch {

  // Member function only count for topmost struct
  struct Registry { mapping(uint => Batch.Data) Data; }

  struct Loc {
    string lat;
    string lng;
  }

  // Aggregated crafts of same kind into batches
  struct Data {
    uint batch_no;
    string name;
    string description;
    string producer;
    address producer_id;
    Loc loc;
    uint batch_time;
    uint[] crafts;
    uint craft_count;
    State state;
    address destination;
    uint batch_price;
    address payable owner; // Metamask-Ethereum address of the current owner as the product moves through 8 stages
    address aggregator_id; // Metamask-Ethereum address of the Aggregator
    address retailer_id; // Metamask-Ethereum address of the Retailer
  }

  // States a Craft can be in, changes as it proceeds through the supplychain
  enum State {
    batched, // 0
    forSale, // 1
    sold, // 2
    pickedUp, // 3
    shipped, // 4
    received, // 5
    unbatched // 6
  }

  // Define 8 events with the same 8 state values and accept 'upc' as input argument
  event Batched(uint upc);
  event ForSale(uint upc);
  event Sold(uint upc);
  event PickedUp(uint upc);
  event Shipped(uint upc);
  event Received(uint upc);
  event Unbatched(uint upc);

  // Creates a unique hash out of batch informations
  function _createIdHash(
    string memory _name,
    string memory _description,
    string memory _producer,
    uint _prod_time
    ) public pure returns(uint) {
    bytes32 _bytes32Hash = keccak256(abi.encodePacked(_name, _description, _producer, _prod_time));
    return uint(_bytes32Hash);
  }

  function makeNewBatch(
    Registry storage self,
    string memory _name,
    string memory _description,
    string memory _producer,
    string memory _batch_lat,
    string memory _batch_lng,
    uint _batch_time
  ) public {
    uint batch_no = _createIdHash(_name, _description, _producer, _batch_time);
    Batch.Data memory newBatch = Batch.Data(
      batch_no,
      _name,
      _description,
      _producer,
      msg.sender,
      Loc(_batch_lat, _batch_lng),
      _batch_time,
      new uint[](0), 0,
      Batch.State.batched,
      address(0),
      0,
      msg.sender,
      address(0),
      address(0)
    );
    self.Data[batch_no] = newBatch;
  }

  // Retrieves the batch information
  function getInfo(Registry storage self, uint batchId) public view returns(
    string memory name,
    string memory description, 
    string memory producer,
    address producer_id,
    string memory batch_lat,
    string memory batch_lng,
    uint batch_time) {
    Batch.Data memory batch = self.Data[batchId];
    name = batch.name;
    description = batch.description;
    producer = batch.producer;
    producer_id = batch.producer_id;
    batch_lat = batch.loc.lat;
    batch_lng = batch.loc.lng;
    batch_time = batch.batch_time;
    return (name, description, producer, producer_id, batch_lat, batch_lng, batch_time);
  }

  // Retrieves batch owner
  function getOwner(Registry storage self, uint _batch_no) public view returns(address) {
    Batch.Data memory batch = self.Data[_batch_no];
    return batch.owner;
  }

  // Gets the batch state
  function getState(Registry storage self, uint _batch_no) public view returns(Batch.State) {
    Batch.Data memory batch = self.Data[_batch_no];
    return batch.state;
  }

  //Set states
    function statePickedUp(Registry storage self, uint _batch_no) public {
    Batch.Data storage batch = self.Data[_batch_no];
    batch.state = Batch.State.pickedUp;
    emit PickedUp(_batch_no);
  }

  function stateForSale(Registry storage self, uint _batch_no) public {
    Batch.Data storage batch = self.Data[_batch_no];
    batch.state = Batch.State.forSale;
    emit ForSale(_batch_no);
  }

  function stateSold(Registry storage self, uint _batch_no) public {
    Batch.Data storage batch = self.Data[_batch_no];
    batch.state = Batch.State.sold;
    emit Sold(_batch_no);
  }


  function stateShipped(Registry storage self, uint _batch_no, address _dest) public {
    Batch.Data storage batch = self.Data[_batch_no];
    require(self.Data[_batch_no].owner == _dest, "Can only send batch to it's owner.");
    batch.destination = _dest;
    batch.state = Batch.State.shipped;
    emit Shipped(_batch_no);
  }

  function stateReceived(Registry storage self, uint _batch_no) public {
    Batch.Data storage batch = self.Data[_batch_no];
    require(batch.state == Batch.State.shipped, "Can only received shipped batches.");
    require(batch.destination == msg.sender, "Only the batch recipient can receive a batch.");
    batch.state = Batch.State.received;
    emit Received(_batch_no);
  }



}