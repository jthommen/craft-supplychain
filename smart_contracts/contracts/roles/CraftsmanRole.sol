pragma solidity >=0.5.0;

// Import the library 'Roles'
import "./Roles.sol";

// Define a contract 'CraftsmanRole' to manage this role - add, remove, check
contract CraftsmanRole {
  using Roles for Roles.Role;

  // Defines production count (sku) for the individual craftsman
  uint sku;

  // Define 2 events, one for Adding, and other for Removing
  event CraftsmanAdded(address indexed account);
  event CraftsmanRemoved(address indexed account);

  // Define a struct 'Craftsmen' by inheriting from 'Roles' library, struct Role
  Roles.Role private craftsmen;

  // In the constructor make the address that deploys this contract the 1st Craftsman
  constructor() public {
    _addCraftsman(msg.sender);
  }

  // Define a modifier that checks to see if msg.sender has the appropriate role
  modifier onlyCraftsman() {
    require(isCraftsman(msg.sender), "This function can only be performed by craftsmen.");
    _;
  }

  // Define a function 'isCraftsman' to check this role
  function isCraftsman(address account) public view returns (bool) {
    return craftsmen.has(account);
  }

  // Define a function 'addCraftsman' that adds this role
  function addCraftsman(address account) public {
    _addCraftsman(account);
  }

  // Define a function 'renounceCraftsman' to renounce this role
  function renounceCraftsman() public onlyCraftsman {
    _removeCraftsman(msg.sender);
  }

  // Define an internal function '_addCraftsman' to add this role, called by 'addCraftsman'
  function _addCraftsman(address account) internal {
    craftsmen.add(account);
    emit CraftsmanAdded(account);
  }

  // Define an internal function '_removeCraftsman' to remove this role, called by 'removeCraftsman'
  function _removeCraftsman(address account) internal {
    craftsmen.remove(account);
    emit CraftsmanRemoved(account);
  }
}