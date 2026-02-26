// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "forge-std/Script.sol";
import "../Pixelmania.sol";
import "../PrizePool.sol";
import "../PixelmaniaVoting.sol";
import "../RegionNFT.sol";

contract Deploy is Script {
    address constant G_TOKEN = 0x62B8B11039FcfE5aB0C56E502b1C372A3d2a9c7A;

    function run() external {
        address treasury = vm.envAddress("TREASURY");
        address devWallet = vm.envAddress("DEV_WALLET");
        address cfa = vm.envAddress("CFA_ADDRESS");
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");

        vm.startBroadcast(deployerPrivateKey);

        PrizePool prizePool = new PrizePool(G_TOKEN, address(0));
        console.log("PrizePool at:", address(prizePool));

        Pixelmania pixelmania = new Pixelmania(treasury, devWallet, address(prizePool), cfa);
        console.log("Pixelmania at:", address(pixelmania));

        prizePool.setCanvas(address(pixelmania));

        PixelmaniaVoting voting = new PixelmaniaVoting();
        console.log("PixelmaniaVoting at:", address(voting));

        RegionNFT regionNFT = new RegionNFT("https://api.pixelmania.example/metadata/");
        console.log("RegionNFT at:", address(regionNFT));

        vm.stopBroadcast();
    }
}
