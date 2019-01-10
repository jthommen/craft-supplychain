pragma solidity ^0.5.0;

import "./Objects.sol";

contract Actor {
    address id;
    uint256 balance;
}

contract Craftsman is Actor {
    mapping(uint256 => Craft) createdCrafts;
    mapping(uint256 => Batch) createdBatches;

    function buyCraftMaterial() public view returns(Craft craft) {

    }

    function produceCraft() public {

    }

    function packageCraft() public {
        
    }

    function createBatchs() public {
        
    }

    function sellBatch() public {

    }

    // Protects against accidental mix-ups, not deliberate impersonation
    // https://ethereum.stackexchange.com/questions/48423/check-if-msg-sender-is-a-specific-type-of-contract?rq=1
    function verify() public pure returns(bool isVerified)
    {
        return true;
    }
}

contract Intermediary is Actor {
    
    function buyBatch() public {
        
    }

    function putBatchForSale() public {
        
    }

    function shipBatch() public {

    }

    function receiveBatch() public {

    }
}

contract Aggregator is Intermediary {

    function pickUpBatch() public {

    }
}

contract Retailer is Intermediary {
    function putCraftForSale() public {

    }

    function shipCraft() public {

    }
}

contract Consumer is Actor {
    function purchaseCraft() public {

    }

    function receiveCraft() public {

    }
}