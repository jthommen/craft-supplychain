if (typeof web3 != 'undefined') {
    web3 = new Web3(web3.currentProvider) // what Metamask injected 
  } else {
    // Instantiate and set Ganache as your provider
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  }
  console.log(web3.currentProvider);

  // The default (top) wallet account from a list of test accounts 
  web3.eth.defaultAccount = web3.eth.accounts[0];

  // The interface definition for your smart contract (the ABI) 
  var CraftSupplychain = web3.eth.contract(
    [
        {
          "constant": true,
          "inputs": [
            {
              "name": "interfaceId",
              "type": "bytes4"
            }
          ],
          "name": "supportsInterface",
          "outputs": [
            {
              "name": "",
              "type": "bool"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function",
          "signature": "0x01ffc9a7"
        },
        {
          "constant": true,
          "inputs": [
            {
              "name": "tokenId",
              "type": "uint256"
            }
          ],
          "name": "getApproved",
          "outputs": [
            {
              "name": "",
              "type": "address"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function",
          "signature": "0x081812fc"
        },
        {
          "constant": false,
          "inputs": [
            {
              "name": "to",
              "type": "address"
            },
            {
              "name": "tokenId",
              "type": "uint256"
            }
          ],
          "name": "approve",
          "outputs": [],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "function",
          "signature": "0x095ea7b3"
        },
        {
          "constant": false,
          "inputs": [
            {
              "name": "from",
              "type": "address"
            },
            {
              "name": "to",
              "type": "address"
            },
            {
              "name": "tokenId",
              "type": "uint256"
            }
          ],
          "name": "transferFrom",
          "outputs": [],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "function",
          "signature": "0x23b872dd"
        },
        {
          "constant": false,
          "inputs": [
            {
              "name": "from",
              "type": "address"
            },
            {
              "name": "to",
              "type": "address"
            },
            {
              "name": "tokenId",
              "type": "uint256"
            }
          ],
          "name": "safeTransferFrom",
          "outputs": [],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "function",
          "signature": "0x42842e0e"
        },
        {
          "constant": true,
          "inputs": [
            {
              "name": "tokenId",
              "type": "uint256"
            }
          ],
          "name": "ownerOf",
          "outputs": [
            {
              "name": "",
              "type": "address"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function",
          "signature": "0x6352211e"
        },
        {
          "constant": true,
          "inputs": [
            {
              "name": "owner",
              "type": "address"
            }
          ],
          "name": "balanceOf",
          "outputs": [
            {
              "name": "",
              "type": "uint256"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function",
          "signature": "0x70a08231"
        },
        {
          "constant": false,
          "inputs": [
            {
              "name": "to",
              "type": "address"
            },
            {
              "name": "approved",
              "type": "bool"
            }
          ],
          "name": "setApprovalForAll",
          "outputs": [],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "function",
          "signature": "0xa22cb465"
        },
        {
          "constant": false,
          "inputs": [
            {
              "name": "from",
              "type": "address"
            },
            {
              "name": "to",
              "type": "address"
            },
            {
              "name": "tokenId",
              "type": "uint256"
            },
            {
              "name": "_data",
              "type": "bytes"
            }
          ],
          "name": "safeTransferFrom",
          "outputs": [],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "function",
          "signature": "0xb88d4fde"
        },
        {
          "constant": true,
          "inputs": [
            {
              "name": "owner",
              "type": "address"
            },
            {
              "name": "operator",
              "type": "address"
            }
          ],
          "name": "isApprovedForAll",
          "outputs": [
            {
              "name": "",
              "type": "bool"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function",
          "signature": "0xe985e9c5"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "name": "from",
              "type": "address"
            },
            {
              "indexed": true,
              "name": "to",
              "type": "address"
            },
            {
              "indexed": true,
              "name": "tokenId",
              "type": "uint256"
            }
          ],
          "name": "Transfer",
          "type": "event",
          "signature": "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "name": "owner",
              "type": "address"
            },
            {
              "indexed": true,
              "name": "approved",
              "type": "address"
            },
            {
              "indexed": true,
              "name": "tokenId",
              "type": "uint256"
            }
          ],
          "name": "Approval",
          "type": "event",
          "signature": "0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "name": "owner",
              "type": "address"
            },
            {
              "indexed": true,
              "name": "operator",
              "type": "address"
            },
            {
              "indexed": false,
              "name": "approved",
              "type": "bool"
            }
          ],
          "name": "ApprovalForAll",
          "type": "event",
          "signature": "0x17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31"
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
              "name": "_prod_loc",
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
          "signature": "0xecc83859"
        },
        {
          "constant": true,
          "inputs": [
            {
              "name": "_craftId",
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
              "name": "prod_loc",
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
              "name": "_craftId",
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
              "name": "_prod_loc",
              "type": "string"
            },
            {
              "name": "_prod_time",
              "type": "uint256"
            }
          ],
          "name": "createIdHash",
          "outputs": [
            {
              "name": "",
              "type": "uint256"
            }
          ],
          "payable": false,
          "stateMutability": "pure",
          "type": "function",
          "signature": "0x65f1cae3"
        },
        {
          "constant": false,
          "inputs": [
            {
              "name": "_craftId",
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
              "name": "_craftId",
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
              "name": "_batch_loc",
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
          "signature": "0x36ce367a"
        },
        {
          "constant": true,
          "inputs": [
            {
              "name": "batchId",
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
              "name": "batch_loc",
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
              "name": "_batchId",
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
          "constant": false,
          "inputs": [
            {
              "name": "_batchId",
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
              "name": "_batchId",
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
              "name": "_batchId",
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
              "name": "_batchId",
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
              "name": "_batchId",
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
              "name": "_batchId",
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
              "name": "_batchId",
              "type": "uint256"
            }
          ],
          "name": "receiveBatch",
          "outputs": [],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "function",
          "signature": "0xe9cee4b9"
        }
      ]
  );
  // Grab the contract at specified deployed address with the interface defined by the ABI
  var starNotary = StarNotary.at('0xCe4947188eABE6f5a97C5B0fB19152F781362A23');

  // Enable claim button being clicked
  function claimButtonClicked() {
    web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error)
        return
      }
      var account = accounts[0]
      let name = document.getElementById('star-name').value;
      let story = document.getElementById('star-story').value;
      let ra = document.getElementById('star-ra').value;
      let dec = document.getElementById('star-dec').value;
      let mag = document.getElementById('star-mag').value;

      starNotary.createStar(name, story, ra, dec, mag, function(error, result) {
        if (!error) {
          var starCreatedEvent = starNotary.Transfer();
          starCreatedEvent.watch(function(error, result) {
            if (!error) {
              alert('You just created a new star!');
            } else {
              console.log('watching for star claimed event is failing');
            }
          });
        } else {
          console.log(error);
        }
      });

    });
  }

  // Document starId
  let starId;

  // Get star id
  function idButtonClicked() {
    let ra = document.getElementById('star-id-ra').value;
    let dec = document.getElementById('star-id-dec').value;
    let mag = document.getElementById('star-id-mag').value;

    starNotary.createMappingKeyHash(ra, dec, mag, function (error, result) {
      if (!error) {
        starId = result;
        let hexResult = web3.toHex(result);

        document.getElementById('star-id').value = hexResult;
        document.getElementById('star-hash').innerText = hexResult;

      } else {
        console.log(error);
      }

    });
  }

  // Get star info 
  function getButtonClicked() {
    let starId = document.getElementById('star-id').value;
    let bigStarId = web3.toBigNumber(starId);

    starNotary.getStar(starId, function (error, result) {
      if (!error) {
        const container = document.getElementById('star-info');
        result.forEach(item => {
          let element = document.createElement('li');
          element.innerText = item;
          container.appendChild(element);
        });
        console.log('Star retrieved: ', result);
      } else {
        console.log(error);
      }
    });
  }