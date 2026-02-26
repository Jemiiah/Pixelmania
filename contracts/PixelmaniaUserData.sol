// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

library PixelmaniaUserData {
    function encode(uint16 x, uint16 y, uint8 color) internal pure returns (bytes memory data) {
        data = new bytes(5);
        data[0] = bytes1(uint8(x >> 8));
        data[1] = bytes1(uint8(x & 0xFF));
        data[2] = bytes1(uint8(y >> 8));
        data[3] = bytes1(uint8(y & 0xFF));
        data[4] = bytes1(color);
    }
}
