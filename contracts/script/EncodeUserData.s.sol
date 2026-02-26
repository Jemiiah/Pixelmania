// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "forge-std/Script.sol";
import "../Pixelmania.sol";
import "../PixelmaniaUserData.sol";

contract EncodeUserData is Script {
    function run(uint16 x, uint16 y, uint8 color) external pure returns (bytes memory userData) {
        userData = PixelmaniaUserData.encode(x, y, color);
        console.log("userData (hex):");
        console.logBytes(userData);
        console.log("Use this with IERC777(G_TOKEN).send(Pixelmania, 1e18, userData)");
    }
}
