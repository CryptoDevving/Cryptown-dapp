/*const CRYPTOWN_CONTRACT_ABI = [
	{
		"constant": false,
		"inputs": [
			{
				"name": "_newOwner",
				"type": "address"
			}
		],
		"name": "changeOwner",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_name",
				"type": "string"
			},
			{
				"name": "_url",
				"type": "string"
			},
			{
				"name": "_logoUrl",
				"type": "string"
			},
			{
				"name": "_schedule",
				"type": "string"
			}
		],
		"name": "modifyCompanyInformation",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_parcelId",
				"type": "uint32"
			}
		],
		"name": "purchaseParcel",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_name",
				"type": "string"
			},
			{
				"name": "_url",
				"type": "string"
			},
			{
				"name": "_logoUrl",
				"type": "string"
			},
			{
				"name": "_schedule",
				"type": "string"
			}
		],
		"name": "registerCompanyInformation",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_parcelId",
				"type": "uint32"
			},
			{
				"name": "_customerAddress",
				"type": "address"
			}
		],
		"name": "sellParcel",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "amigo",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_companyId",
				"type": "address"
			}
		],
		"name": "getCompanyInformation",
		"outputs": [
			{
				"name": "",
				"type": "string"
			},
			{
				"name": "",
				"type": "string"
			},
			{
				"name": "",
				"type": "string"
			},
			{
				"name": "",
				"type": "string"
			},
			{
				"name": "",
				"type": "uint32[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
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
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_companyId",
				"type": "address"
			}
		],
		"name": "pollas",
		"outputs": [
			{
				"name": "",
				"type": "bytes32"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_companyId",
				"type": "address"
			}
		],
		"name": "repollas",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "theBestFunctionEver",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "pure",
		"type": "function"
	}
];*/

//const CRYPTOWN_CONTRACT_ADDRESS = "0x773ed4532896d8b87eb0bd670c58827ee2fea448";

const MY_ADDRESS = "0x821aEa9a577a9b44299B9c15c88cf3087F3b5544";

var App = {

    contracts: {},

    initApp: function(){
        if(!Web3Manager)
            throw "Web3Manager failed to initialize";
        
        App.importContracts();

        App.printAccountAddreses();
        App.updateNodeStatus();
        App.printCities();
    },


    importContracts: function(){
        // ABI INTERFACE
        var myContract = Web3Manager.web3.eth.contract(CRYPTOWN_CONTRACT_ABI);
        App.contracts.Cryptown = myContract.at(CRYPTOWN_CONTRACT_ADDRESS);
    },


    getMyCompanyInfo: function(callback) {
		CryptownContractInterface.getCompany(MY_ADDRESS,
		function(err, res){
			if(err) return console.error(err.message);
			
			var companyName = res[0];
			var companySchedule = res[3];

			if(companyName!==''){
				var companyInfoBlock = document.getElementById('current-company-name');
				var textToPrint = companyName + " opened at " + companySchedule;
				companyInfoBlock.innerHTML = textToPrint;
			}
			console.log("RESULTADO: " + res);
		}); 
	},

	execBestFuncEver: function(){
		CryptownContractInterface.execBestFuncEver(
			function(err, res){
				if(err) return console.error(err);
				console.log("RESULTADO DE LA MEJOR FUNCION: " + res);
			});
	},
	

	setMyCompanyInfo: function(args,callback) {
		CryptownContractInterface.registerCompany(args,
			function(err, res){
				if(err) return console.error(err);
				console.log("SE HA REGISTRADO CORRECTAMENTE LOS DATOS DE LA EMPRESA");
			});
	},


    updateNodeStatus: function(){
        App.printBlockHeight();
        App.printNodePeers();
    },

    printAccountAddreses: function(){
        Web3Manager.getUserAddreses(
            function(err, accounts){
                if(err) return console.error(err);

                let accountsBlock = document.getElementById('user-accounts');
                for(var i=0; i<accounts.length; i++){
                    var userAddress = accounts[i];

                    Web3Manager.getAdressBalance(userAddress, function(err, balance){
                        let textToPrint = userAddress + " ----> " + Web3Manager.toEther(balance) + " ETH";
                        appendTextChildToParentBlock(accountsBlock, textToPrint);
                    });

                }
            });
    },

    printBlockHeight: function(){
        Web3Manager.getBlockHeight(
            function(err, height){
                if(err) return console.error(err);
                let blockHeightBlock = document.getElementById('block-height');
                blockHeightBlock.textContent = height;
            }
        );
    },

    printNodePeers: function(){
        Web3Manager.getNodePeers(
            function(err, peers){
                if(err) return console.error(err);
                let nodePeersBlock = document.getElementById('node-peers');
                nodePeersBlock.textContent = peers;
            }
        );
    },


    printCities: function(){
        let citiesBlock = document.getElementById('city');
        let cityCodes = Object.keys(CITY_CODES);
        for(var i=0; i<cityCodes.length; i++){
            let cityCode = cityCodes[i];
            let cityName = CITY_CODES[cityCode];
            let optionBlock = createOptionBlock(cityCode, cityName);
            citiesBlock.appendChild(optionBlock);
        }
    }

};


function appendTextChildToParentBlock(parentBlock, text){
    var pElem = document.createElement('p');
    pElem.appendChild(document.createTextNode(text));
    parentBlock.appendChild(pElem);
}

function createOptionBlock(value, text){
    let optionBlock = document.createElement('option');
    optionBlock.value = value;
    optionBlock.text = text;
    return optionBlock;
}


// Send funds operation management
function sendFunds(){
    let recipientAddress = document.getElementById('recipient-address').value;
    let recipientAmmount = document.getElementById('recipient-ammount').value;
    console.log("Send " + recipientAmmount + " to " + recipientAddress);
    Web3Manager.sendFunds(recipientAddress, recipientAmmount, 
        function(err, transactionHash){
            if(err) return console.log(err);
            console.log("Tx thrown to Blockchain. Tx_ID = " + transactionHash);
    });
}


// Register a company on blockchain
function registerCompany(){
    let companyName = document.getElementById('company-name').value;
    let companyWebsite = document.getElementById('company-url').value;;
    let companyImgUrl = document.getElementById('company-logo-url').value;;
    let companySchedule = document.getElementById('company-schedule').value;;
	console.log("Company="+companyName + " ;  Website="+ companyWebsite + " ; Logo=" + companyImgUrl + " ; schedule=" + companySchedule); 
	let args = [companyName, companyWebsite, companyImgUrl, companySchedule];
	App.setMyCompanyInfo(args);
}


// Update block height every 5 seconds
setInterval( function(){
    //console.log('Obtaining block height');
    App.updateNodeStatus();
}, 5000 );
