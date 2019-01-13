if (typeof web3 !== 'undefined'){
    console.log('MetaMask is installed.');
 } 
 else{
    console.log('MetaMask is not installed');
}

web3.eth.getAccounts(function(err, accounts){
    if (err != null) {
       console.log(err)
    }
    else if (accounts.length === 0) {
       console.log('MetaMask is locked.');
    }
    else {
       console.log('MetaMask is unlocked.');
    }
 });

var account = web3.eth.accounts[0];
var accountInterval = setInterval(function() {
  if (web3.eth.accounts[0] !== account) {
    account = web3.eth.accounts[0];
    document.getElementById("user-address").value = account;
  }
}, 100);

var CraftSupplychain = web3.eth.contract(
    [
        {
          "constant": false,
          "inputs": [
            {
              "name": "account",
              "type": "address"
            }
          ],
          "name": "addConsumer",
          "outputs": [],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "function",
          "signature": "0x112940f9"
        },
        {
          "constant": true,
          "inputs": [
            {
              "name": "account",
              "type": "address"
            }
          ],
          "name": "isAggregator",
          "outputs": [
            {
              "name": "",
              "type": "bool"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function",
          "signature": "0x1e8f3c95"
        },
        {
          "constant": false,
          "inputs": [
            {
              "name": "account",
              "type": "address"
            }
          ],
          "name": "addCraftsman",
          "outputs": [],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "function",
          "signature": "0x4223c452"
        },
        {
          "constant": true,
          "inputs": [
            {
              "name": "account",
              "type": "address"
            }
          ],
          "name": "isRetailer",
          "outputs": [
            {
              "name": "",
              "type": "bool"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function",
          "signature": "0x5da09b88"
        },
        {
          "constant": false,
          "inputs": [],
          "name": "renounceConsumer",
          "outputs": [],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "function",
          "signature": "0x61e6982d"
        },
        {
          "constant": false,
          "inputs": [
            {
              "name": "account",
              "type": "address"
            }
          ],
          "name": "addAggregator",
          "outputs": [],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "function",
          "signature": "0x6520b009"
        },
        {
          "constant": false,
          "inputs": [],
          "name": "renounceOwnership",
          "outputs": [],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "function",
          "signature": "0x715018a6"
        },
        {
          "constant": true,
          "inputs": [
            {
              "name": "account",
              "type": "address"
            }
          ],
          "name": "isConsumer",
          "outputs": [
            {
              "name": "",
              "type": "bool"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function",
          "signature": "0x834ff739"
        },
        {
          "constant": false,
          "inputs": [],
          "name": "renounceCraftsman",
          "outputs": [],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "function",
          "signature": "0x882a218e"
        },
        {
          "constant": true,
          "inputs": [],
          "name": "owner",
          "outputs": [
            {
              "name": "",
              "type": "address"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function",
          "signature": "0x8da5cb5b"
        },
        {
          "constant": false,
          "inputs": [
            {
              "name": "account",
              "type": "address"
            }
          ],
          "name": "addRetailer",
          "outputs": [],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "function",
          "signature": "0x8ec4f505"
        },
        {
          "constant": true,
          "inputs": [],
          "name": "isOwner",
          "outputs": [
            {
              "name": "",
              "type": "bool"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function",
          "signature": "0x8f32d59b"
        },
        {
          "constant": false,
          "inputs": [],
          "name": "renounceAggregator",
          "outputs": [],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "function",
          "signature": "0xbd66ab9a"
        },
        {
          "constant": false,
          "inputs": [],
          "name": "renounceRetailer",
          "outputs": [],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "function",
          "signature": "0xdb0e6a2f"
        },
        {
          "constant": true,
          "inputs": [
            {
              "name": "account",
              "type": "address"
            }
          ],
          "name": "isCraftsman",
          "outputs": [
            {
              "name": "",
              "type": "bool"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function",
          "signature": "0xe5d780bc"
        },
        {
          "constant": false,
          "inputs": [
            {
              "name": "newOwner",
              "type": "address"
            }
          ],
          "name": "transferOwnership",
          "outputs": [],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "function",
          "signature": "0xf2fde38b"
        },
        {
          "inputs": [],
          "payable": true,
          "stateMutability": "payable",
          "type": "constructor",
          "signature": "constructor"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "name": "account",
              "type": "address"
            }
          ],
          "name": "ConsumersAdded",
          "type": "event",
          "signature": "0x91bdc71b50ae596eb17566927eb0bee6eb3cc87a6c9f18af720972f51684e2f3"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "name": "account",
              "type": "address"
            }
          ],
          "name": "ConsumersRemoved",
          "type": "event",
          "signature": "0x6e363c5f6721943532f660d82b71595faf4a08de39255533787d7325f7aab373"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "name": "account",
              "type": "address"
            }
          ],
          "name": "RetailersAdded",
          "type": "event",
          "signature": "0xb4a431a72317fbd80041e50353d7c8cf2ed61e8d95c337071110d0a091233943"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "name": "account",
              "type": "address"
            }
          ],
          "name": "RetailersRemoved",
          "type": "event",
          "signature": "0x09ea7b0e2bc842e9b03a1195e944185c455b326cb9c2cdc5fcfbeed40f37c07c"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "name": "account",
              "type": "address"
            }
          ],
          "name": "AggregatorsAdded",
          "type": "event",
          "signature": "0x44c246fc47cdf95aa418c8348fae0290ecfc1c1c100d6d1fb1ab4a414c26a987"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "name": "account",
              "type": "address"
            }
          ],
          "name": "AggregatorsRemoved",
          "type": "event",
          "signature": "0x473da516491cd4a8724d84c58260261e47f662293fee89f55cb38e5e8f525812"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "name": "account",
              "type": "address"
            }
          ],
          "name": "CraftsmanAdded",
          "type": "event",
          "signature": "0xc590b23a12fc35a98bdc00f5391d01a5a1e4f2d4516f6a41d6b1011e57312802"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "name": "account",
              "type": "address"
            }
          ],
          "name": "CraftsmanRemoved",
          "type": "event",
          "signature": "0x7c267429af8c96f25a0556463367fec4298cdc3857bc28af49b5d24b5db4e47f"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "name": "oldOwner",
              "type": "address"
            },
            {
              "indexed": true,
              "name": "newOwner",
              "type": "address"
            }
          ],
          "name": "TransferOwnership",
          "type": "event",
          "signature": "0x5c486528ec3e3f0ea91181cff8116f02bfa350e03b8b6f12e00765adbb5af85c"
        },
        {
          "constant": false,
          "inputs": [],
          "name": "kill",
          "outputs": [],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "function",
          "signature": "0x41c0e1b5"
        },
        {
          "constant": false,
          "inputs": [
            {
              "name": "_name",
              "type": "string"
            },
            {
              "name": "_description",
              "type": "string"
            },
            {
              "name": "_producer",
              "type": "string"
            },
            {
              "name": "_prod_lat",
              "type": "string"
            },
            {
              "name": "_prod_lng",
              "type": "string"
            },
            {
              "name": "_prod_time",
              "type": "uint256"
            }
          ],
          "name": "buyCraftMaterial",
          "outputs": [],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "function",
          "signature": "0xdfe5eaca"
        },
        {
          "constant": true,
          "inputs": [
            {
              "name": "_name",
              "type": "string"
            },
            {
              "name": "_description",
              "type": "string"
            },
            {
              "name": "_producer",
              "type": "string"
            },
            {
              "name": "_prod_time",
              "type": "uint256"
            }
          ],
          "name": "getHash",
          "outputs": [
            {
              "name": "",
              "type": "uint256"
            }
          ],
          "payable": false,
          "stateMutability": "pure",
          "type": "function",
          "signature": "0xdf34c69d"
        },
        {
          "constant": true,
          "inputs": [
            {
              "name": "_upc",
              "type": "uint256"
            }
          ],
          "name": "getCraftInfo",
          "outputs": [
            {
              "name": "name",
              "type": "string"
            },
            {
              "name": "description",
              "type": "string"
            },
            {
              "name": "producer",
              "type": "string"
            },
            {
              "name": "producer_id",
              "type": "address"
            },
            {
              "name": "prod_lat",
              "type": "string"
            },
            {
              "name": "prod_lng",
              "type": "string"
            },
            {
              "name": "prod_time",
              "type": "uint256"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function",
          "signature": "0x8560aebc"
        },
        {
          "constant": true,
          "inputs": [
            {
              "name": "_upc",
              "type": "uint256"
            }
          ],
          "name": "getCraftOwner",
          "outputs": [
            {
              "name": "owner",
              "type": "address"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function",
          "signature": "0xd4a6fe9e"
        },
        {
          "constant": true,
          "inputs": [
            {
              "name": "_upc",
              "type": "uint256"
            }
          ],
          "name": "getCraftState",
          "outputs": [
            {
              "name": "",
              "type": "uint8"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function",
          "signature": "0x13ec68dd"
        },
        {
          "constant": false,
          "inputs": [
            {
              "name": "_upc",
              "type": "uint256"
            }
          ],
          "name": "produceCraft",
          "outputs": [],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "function",
          "signature": "0xe3f0b478"
        },
        {
          "constant": false,
          "inputs": [
            {
              "name": "_upc",
              "type": "uint256"
            }
          ],
          "name": "packageCraft",
          "outputs": [],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "function",
          "signature": "0x14931c7e"
        },
        {
          "constant": false,
          "inputs": [
            {
              "name": "_name",
              "type": "string"
            },
            {
              "name": "_description",
              "type": "string"
            },
            {
              "name": "_producer",
              "type": "string"
            },
            {
              "name": "_batch_lat",
              "type": "string"
            },
            {
              "name": "_batch_lng",
              "type": "string"
            },
            {
              "name": "_batch_time",
              "type": "uint256"
            }
          ],
          "name": "createBatch",
          "outputs": [],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "function",
          "signature": "0xc9c9f36e"
        },
        {
          "constant": true,
          "inputs": [
            {
              "name": "_batch_no",
              "type": "uint256"
            }
          ],
          "name": "getBatchInfo",
          "outputs": [
            {
              "name": "name",
              "type": "string"
            },
            {
              "name": "description",
              "type": "string"
            },
            {
              "name": "producer",
              "type": "string"
            },
            {
              "name": "producer_id",
              "type": "address"
            },
            {
              "name": "batch_lat",
              "type": "string"
            },
            {
              "name": "batch_lng",
              "type": "string"
            },
            {
              "name": "batch_time",
              "type": "uint256"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function",
          "signature": "0x1a0058f5"
        },
        {
          "constant": true,
          "inputs": [
            {
              "name": "_batch_no",
              "type": "uint256"
            }
          ],
          "name": "getBatchState",
          "outputs": [
            {
              "name": "",
              "type": "uint8"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function",
          "signature": "0x03016bf9"
        },
        {
          "constant": true,
          "inputs": [
            {
              "name": "_batch_no",
              "type": "uint256"
            }
          ],
          "name": "getBatchOwner",
          "outputs": [
            {
              "name": "",
              "type": "address"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function",
          "signature": "0x1194ff50"
        },
        {
          "constant": false,
          "inputs": [
            {
              "name": "_batch_no",
              "type": "uint256"
            },
            {
              "name": "_crafts",
              "type": "uint256[]"
            }
          ],
          "name": "addCraftsToBatch",
          "outputs": [],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "function",
          "signature": "0x39140263"
        },
        {
          "constant": false,
          "inputs": [
            {
              "name": "_batch_no",
              "type": "uint256"
            },
            {
              "name": "_price",
              "type": "uint256"
            }
          ],
          "name": "putBatchForSale",
          "outputs": [],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "function",
          "signature": "0x99a7680d"
        },
        {
          "constant": true,
          "inputs": [
            {
              "name": "_batch_no",
              "type": "uint256"
            }
          ],
          "name": "getBatchPrice",
          "outputs": [
            {
              "name": "price",
              "type": "uint256"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function",
          "signature": "0x2bd92dd3"
        },
        {
          "constant": false,
          "inputs": [
            {
              "name": "_batch_no",
              "type": "uint256"
            }
          ],
          "name": "buyBatch",
          "outputs": [],
          "payable": true,
          "stateMutability": "payable",
          "type": "function",
          "signature": "0x746d1e57"
        },
        {
          "constant": false,
          "inputs": [
            {
              "name": "_batch_no",
              "type": "uint256"
            }
          ],
          "name": "pickUpBatch",
          "outputs": [],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "function",
          "signature": "0xad9e5b16"
        },
        {
          "constant": false,
          "inputs": [
            {
              "name": "_batch_no",
              "type": "uint256"
            },
            {
              "name": "_dest",
              "type": "address"
            }
          ],
          "name": "shipBatch",
          "outputs": [],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "function",
          "signature": "0xcdd1d3d3"
        },
        {
          "constant": false,
          "inputs": [
            {
              "name": "_batch_no",
              "type": "uint256"
            }
          ],
          "name": "receiveBatch",
          "outputs": [],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "function",
          "signature": "0xe9cee4b9"
        },
        {
          "constant": false,
          "inputs": [
            {
              "name": "_batch_no",
              "type": "uint256"
            }
          ],
          "name": "unBatch",
          "outputs": [],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "function",
          "signature": "0xc490d5f1"
        },
        {
          "constant": false,
          "inputs": [
            {
              "name": "_upc",
              "type": "uint256"
            },
            {
              "name": "_price",
              "type": "uint256"
            }
          ],
          "name": "putCraftForSale",
          "outputs": [],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "function",
          "signature": "0xd79de809"
        },
        {
          "constant": false,
          "inputs": [
            {
              "name": "_upc",
              "type": "uint256"
            }
          ],
          "name": "buyCraft",
          "outputs": [],
          "payable": true,
          "stateMutability": "payable",
          "type": "function",
          "signature": "0x86ae6d83"
        },
        {
          "constant": false,
          "inputs": [
            {
              "name": "_upc",
              "type": "uint256"
            }
          ],
          "name": "shipCraft",
          "outputs": [],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "function",
          "signature": "0xe0e2f96d"
        },
        {
          "constant": false,
          "inputs": [
            {
              "name": "_upc",
              "type": "uint256"
            }
          ],
          "name": "receiveCraft",
          "outputs": [],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "function",
          "signature": "0x4d1f4139"
        }
      ]
);

// Grab the contract at specified deployed address with the interface defined by the ABI
var craftSupplychain = CraftSupplychain.at('0xfe1631C6B03aE0E3B7f30C0d975F8CA8C2bbDdFa');

let roles = {};
let selected = '#007081';
let unselected = '#00BCD4';

function getRoleButtonClicked() {
    let container = document.getElementById('role-container');
    container.innerHTML = "Active Roles: ";

    craftSupplychain.isCraftsman(account, function(error, result) {
        if(!error) {
            console.log('Is craftsman: ', result);
            roles.isCraftsman = result;
            if(result){
                container.innerHTML +=  " Craftsman ";
                document.getElementById('toggle-craftsman').style.background = selected;
            }
        } else {
            console.log(error);
        }
    });
    craftSupplychain.isAggregator(account, function(error, result) {
        if(!error) {
            console.log('Is aggregator: ', result);
            roles.isAggregator = result;
            if(result) {
                container.innerHTML += " Aggregator ";
                document.getElementById('toggle-aggregator').style.background = selected;
            }    
        } else {
            console.log(error);
        }
    });
    craftSupplychain.isRetailer(account, function(error, result) {
        if(!error) {
            console.log('Is retailer: ', result);
            roles.isRetailer = result;
            if(result) {
                container.innerHTML += " Retailer ";
                document.getElementById('toggle-retailer').style.background = selected;
            }
        } else {
            console.log(error);
        }
    });
    craftSupplychain.isConsumer(account, function(error, result) {
        if(!error) {
            console.log('Is consumer: ', result);
            roles.isConsumer = result;
            if(result) {
                container.innerHTML += " Consumer ";
                document.getElementById('toggle-consumer').style.background = selected;
            }
        } else {
            console.log(error);
        }
    });

};

function toggleCraftsman() {
    let button = document.getElementById('toggle-craftsman');
    if(roles.isCraftsman) {
        craftSupplychain.renounceCraftsman(function(error, result) {
            if(!error) {
                let event = craftSupplychain.CraftsmanRemoved();
                event.watch(function(error, result) {
                    if(!error) {
                        console.log('Role revoked!');
                        roles.isCraftsman = false;
                        button.style.background = unselected;
                        getRoleButtonClicked();
                    } else {
                        console.log('Revoking role failed.');
                    }
                });
            } else {
                console.log(error);
            }
        });

    } else {
        craftSupplychain.addCraftsman(account, function(error, result) {
            if(!error) {
                let event = craftSupplychain.CraftsmanAdded();
                event.watch(function(error, result) {
                    if(!error) {
                        console.log('Role added!');
                        roles.isCraftsman = true;
                        button.style.background=selected;
                        getRoleButtonClicked();
                    } else {
                        console.log('Adding role failed.');
                    }
                });
            } else {
                console.log(error);
            }
        });
    }
}

function toggleAggregator() {
    let button = document.getElementById('toggle-aggregator');
    if(roles.isAggregator) {
        craftSupplychain.renounceAggregator(function(error, result) {
            if(!error) {
                let event = craftSupplychain.AggregatorsRemoved();
                event.watch(function(error, result) {
                    if(!error) {
                        console.log('Role revoked!');
                        roles.isAggregator = false;
                        button.style.background= unselected;
                        getRoleButtonClicked();
                    } else {
                        console.log('Revoking role failed.');
                    }
                });
            } else {
                console.log(error);
            }
        });

    } else {
        craftSupplychain.addAggregator(account, function(error, result) {
            if(!error) {
                let event = craftSupplychain.AggregatorsAdded();
                event.watch(function(error, result) {
                    if(!error) {
                        console.log('Role added!');
                        roles.isAggregator = true;
                        button.style.background=selected;
                        getRoleButtonClicked();
                    } else {
                        console.log('Adding role failed.');
                    }
                });
            } else {
                console.log(error);
            }
        });
    }
}

function toggleRetailer() {
    let button = document.getElementById('toggle-retailer');
    if(roles.isRetailer) {
        craftSupplychain.renounceRetailer(function(error, result) {
            if(!error) {
                let event = craftSupplychain.RetailersRemoved();
                event.watch(function(error, result) {
                    if(!error) {
                        console.log('Role revoked!');
                        roles.isRetailer = false;
                        button.style.background= unselected;
                        getRoleButtonClicked();
                    } else {
                        console.log('Revoking role failed.');
                    }
                });
            } else {
                console.log(error);
            }
        });

    } else {
        craftSupplychain.addRetailer(account, function(error, result) {
            if(!error) {
                let event = craftSupplychain.RetailersAdded();
                event.watch(function(error, result) {
                    if(!error) {
                        console.log('Role added!');
                        roles.isRetailer = true;
                        button.style.background=selected;
                        getRoleButtonClicked();
                    } else {
                        console.log('Adding role failed.');
                    }
                });
            } else {
                console.log(error);
            }
        });
    }
}

function toggleConsumer() {
    let button = document.getElementById('toggle-consumer');
    if(roles.isConsumer) {
        craftSupplychain.renounceConsumer(function(error, result) {
            if(!error) {
                let event = craftSupplychain.ConsumersRemoved();
                event.watch(function(error, result) {
                    if(!error) {
                        console.log('Role revoked!');
                        roles.isConsumer = false;
                        button.style.background= unselected;
                        getRoleButtonClicked();
                    } else {
                        console.log('Revoking role failed.');
                    }
                });
            } else {
                console.log(error);
            }
        });

    } else {
        craftSupplychain.addConsumer(account, function(error, result) {
            if(!error) {
                let event = craftSupplychain.ConsumersAdded();
                event.watch(function(error, result) {
                    if(!error) {
                        console.log('Role added!');
                        roles.isConsumer = true;
                        button.style.background=selected;
                        getRoleButtonClicked();
                    } else {
                        console.log('Adding role failed.');
                    }
                });
            } else {
                console.log(error);
            }
        });
    }
}

function startProductionClicked() {
    let name = document.getElementById('craft-name').value;
    let description = document.getElementById('craft-description').value;
    let producer = document.getElementById('craft-producer').value;
    let lat = document.getElementById('craft-lat').value;
    let lng = document.getElementById('craft-lng').value;
    let time = new Date().getTime();
    let container = document.getElementById('start-production-info');
    let hash;

    console.log(name, description, producer, lat, lng, time);

    craftSupplychain.getHash(name, description, producer, time, function(error, result){
        if(!error){
            hash = result.toString(10);
            console.log('Hash: ', hash);
        } else {
            console.log("Couldn't create hash: ", error);
        }
    });

    craftSupplychain.buyCraftMaterial(name, description, producer, lat, lng, time, function(error, result) {
        if(!error) {
            container.innerHTML = `New materials for ${name} bought, production started`;
            alert(`Take not of the UPC: ${hash}`);
            console.log('New craft production started!');
        } else {
            console.log('Error occured: ', error);
            container.innerHTML = "Wasn't able to allocate materials for craft.";
        }
    });
}

// Enable get craft Info
function craftInfoButtonClicked() {
    let upc = document.getElementById("upc").value;
    craftSupplychain.getCraftInfo(upc, function(error, result) {
        if(!error) {
            const lis = document.getElementById('info-container').getElementsByTagName('li');
            result[6] = new Date(result[6].toNumber(10)).toUTCString();
            for(let i = 0; i<lis.length; i++) {
                let element = lis[i];
                element.innerHTML += result[i];
            }
            console.log('Craft info retrieved: ', result);
        } else {
            console.log(error);
        }
    });

};

