/** 
 * Interface that calls web3 driver to exchange data with Ethereum from web
*/
var web3Provider = undefined;

function setProvider(provider){
    if (!provider)
        throw "Provider must be specified";
    web3Provider = provider;
}

function checkProvider(){
    if(!web3Provider)
        throw "Provider must be specified";
}


/**
 * Purchase operations
 */
function buyNotAssignedParcel(parcelId, address){
    
}
function createOfferForParcel(){}
function cancelOfferPorParcel(){}
function confirmSellOfferForParcel(){}
function getOffersForAddress(){}


/**
 * Information operations
 */
function getParcels(){}
function getParcelsForAddress(){}
function getParcelData(){}

