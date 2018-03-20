var App = {
    initApp: function(){
        if(!Web3Manager)
            throw "Web3Manager failed to initialize";
        App.printAccountAddreses();
        App.updateNodeStatus();
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
    }

};


function appendTextChildToParentBlock(parentBlock, text){
    var pElem = document.createElement('p');
    pElem.appendChild(document.createTextNode(text));
    parentBlock.appendChild(pElem);
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


// Update block height every 5 seconds
setInterval( function(){
    console.log('Obtaining block height');
    App.updateNodeStatus();
}, 5000 );
