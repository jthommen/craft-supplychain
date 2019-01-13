pragma solidity >=0.5.0;

// Import the library 'Roles'
import "./Roles.sol";

// Define a contract 'AggregatorRole' to manage this role - add, remove, check
contract AggregatorRole {
  using Roles for Roles.Role;

  // Define 2 events, one for Adding, and other for Removing
  event AggregatorsAdded(address indexed account);
  event AggregatorsRemoved(address indexed account);

  // Define a struct 'Aggregators' by inheriting from 'Roles' library, struct Role
  Roles.Role private Aggregators;

  // In the constructor make the address that deploys this contract the 1st Aggregator
  constructor() public {
    _addAggregator(msg.sender);
  }

  // Define a modifier that checks to see if msg.sender has the appropriate role
  modifier onlyAggregator() {
    require(isAggregator(msg.sender), "This function can only be performed by aggregator.");
    _;
  }

  // Define a function 'isAggregator' to check this role
  function isAggregator(address account) public view returns (bool) {
    return Aggregators.has(account);
  }

  // Define a function 'addAggregator' that adds this role
  function addAggregator(address account) public {
    _addAggregator(account);
  }

  // Define a function 'renounceAggregator' to renounce this role
  function renounceAggregator() public onlyAggregator {
    _removeAggregator(msg.sender);
  }

  // Define an internal function '_addAggregator' to add this role, called by 'addAggregator'
  function _addAggregator(address account) internal {
    Aggregators.add(account);
    emit AggregatorsAdded(account);
  }

  // Define an internal function '_removeAggregator' to remove this role, called by 'removeAggregator'
  function _removeAggregator(address account) internal {
    Aggregators.remove(account);
    emit AggregatorsRemoved(account);
  }
}