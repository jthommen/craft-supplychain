pragma solidity ^0.5.0;

import "./Actors.sol";
import "./Objects.sol";
import "../node_modules/openzeppelin-solidity/contracts/token/ERC721/ERC721.sol";

contract CraftSupplychain is ERC721 {

    Craft[] crafts;

    function buyCraftMaterial(
        string memory _name, 
        string memory _description, 
        string memory _producer,
        string memory _prod_loc
        ) public {
        Craft newCraft = new Craft(_name, _description, _producer, _prod_loc);
        crafts.push(newCraft);
    }

}
