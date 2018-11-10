/**
 * Web3 driver management - performs all operations related to Geth and Ethereum Node
 */

var Web3Manager = {

    web3: null,
    web3Provider: null,

    initWeb3: function(){
        if(typeof web3 !== 'undefined'){
            Web3Manager.web3Provider = new Web3.providers.HttpProvider( web3.providers.HttpProvider );
            Web3Manager.web3 = new Web3(web3.currentProvider);
        } else {
            // If no injected web3 instance is detected, fall back to Ganache
            Web3Manager.web3Provider = new Web3.providers.HttpProvider(HTTP_PROVIDER);
            Web3Manager.web3 = new Web3(Web3Manager.web3Provider);
        }
        console.log('Is metamask?', checkMetamask(Web3Manager.web3));
    },


    getUserAddreses: function(callback){
        return Web3Manager.web3.eth.getAccounts(callback);
    },

    getAdressBalance: function(address, callback){
        return Web3Manager.web3.eth.getBalance(address, callback);
    },

    getBlockHeight: function(callback){
        return Web3Manager.web3.eth.getBlockNumber(callback);
    },

    getNodePeers: function(callback){
        return Web3Manager.web3.net.getPeerCount(callback);
    },

    toEther: function(ammount){
        return Web3Manager.web3.fromWei(ammount, "ether");
    },

    sendFunds: function(address, ammount, callback){
        let txObject = {
            from: Web3Manager.web3.eth.defaultAccount,
            to: address,
            value: Web3Manager.web3.toWei(ammount, "ether")
        };
        return Web3Manager.web3.eth.sendTransaction(txObject, callback);
    },

    initManager: function(){
        this.initWeb3();
    }

    
};

// Check if metamask is the current provider
function checkMetamask(provider){
    if(!provider) return false;
    if(!provider.currentProvider) return false;
    return provider.currentProvider.isMetaMask;
}

// Initializes manager
Web3Manager.initManager();