/** 
 * Interface that calls web3 driver to exchange data with Ethereum from web
*/
const CRYPTOWN_CONTRACT_ABI = [
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
];

const CRYPTOWN_CONTRACT_ADDRESS = "0x471c92f915ae766c4964eedc300e5b8ff41e443c";


var CryptownContractInterface = {

    web3Manager: null,
    cryptownContract: null,

    init: function(webManager, abi, contractAddress){
        CryptownContractInterface.web3Manager = webManager;
        
        var contractInterface =
            CryptownContractInterface.web3Manager.web3.eth.contract(abi);
        CryptownContractInterface.cryptownContract = contractInterface.at(contractAddress);
    },

    setProvider: function(provider){
        if (!provider)
            throw "Provider must be specified";
        this.web3Provider = provider;
    },

    /**
     * Company operations
     */
    registerCompany: function(args, callback){
        if(!callback) throw "ContractOperationsInterface requires callback to perform operations";

        let companyName = args[0];
        let companyUrl = args[1];
        let companyLogo = args[2];
        let companySchedule = args[3];

        CryptownContractInterface.cryptownContract.registerCompanyInformation.call(
            companyName, companyUrl, companyLogo, companySchedule,
            function(err, res){
                callback(err, res);
            } );
    },
    modifyCompany: function(args, callback){

    },
    removeCompany: function(args, callback){

    },
    getCompany: function(args, callback){
        CryptownContractInterface.cryptownContract.getCompanyInformation.call(args,
            function(err, res){
                if(err) return console.error(err);
                console.log("Returned from getCompanyInformation: " + res);
                callback(err, res);
            });  
    },

    execBestFuncEver: function(callback){
        CryptownContractInterface.cryptownContract.theBestFunctionEver.call(
            function(err, res){
                callback(err, res);
            }
        )
    }
};

// Initialize app
CryptownContractInterface.init(Web3Manager, CRYPTOWN_CONTRACT_ABI, CRYPTOWN_CONTRACT_ADDRESS);