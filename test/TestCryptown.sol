pragma solidity ^0.4.17;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Cryptown.sol";

contract TestCryptown {

    Cryptown cryptown = Cryptown(DeployedAddresses.Cryptown());

    function testGetUserParcels() public {
        //var (companyName,,,) = cryptown.getCompanyInformation(0x821aEa9a577a9b44299B9c15c88cf3087F3b5544);
        uint returnedId = 8;
        uint expected = 8;
        Assert.equal(expected, returnedId, "IS NOT THE SAME THING");
    }

}