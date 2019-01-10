pragma solidity ^0.5.0;

import "./Actors.sol";

contract Craft {
    address id; // auto
    string name; // arg
    string description; // arg
    string producer; // arg
    address producer_id; // msg.sender
    string prod_loc; // arg
    uint256 prod_time; // auto?
    bool packaged; // default = false
    address batch; // default = 0
    uint256 price; // default = 0
    bool forSale; // default = false
    address owner; // msg.sender
    Craftsman craftsman;

    event created(uint256 timestamp);

    constructor(
        string memory _name, 
        string memory _description, 
        string memory _producer,
        string memory _prod_loc
        ) public {
        id = address(this);
        producer_id = msg.sender;
        prod_time = block.timestamp;
        packaged = false;
        //batch = 0;
        price = 0;
        forSale = false;
        owner = msg.sender;

        name = _name;
        description = _description;
        producer = _producer;
        prod_loc = _prod_loc;
        craftsman = Craftsman(msg.sender);
        require(craftsman.verify(), "No craftsman, not allowed to create crafts.");
    }
}

contract Batch {
    address id;
    address producer_id;
    string batch_loc;
    string batch_time;
    mapping(uint256 => address) crafts;
    uint256 craft_count;
    uint256 price;
    bool forSale;
}