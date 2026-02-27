// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "forge-std/Test.sol";
import "../Pixelmania.sol";
import "../PrizePool.sol";
import "../PixelmaniaUserData.sol";
import "../Errors.sol";
import "./MockCfa.sol";

contract PixelmaniaTest is Test {
    Pixelmania public pixelmania;
    PrizePool public prizePool;
    MockCfa public mockCfa;

    address owner = address(1);
    address treasury = address(2);
    address devWallet = address(3);
    address user = address(4);

    function setUp() public {
        vm.prank(owner);
        mockCfa = new MockCfa();
        vm.prank(owner);
        prizePool = new PrizePool(0x62B8B11039FcfE5aB0C56E502b1C372A3d2a9c7A, address(0));
        vm.prank(owner);
        pixelmania = new Pixelmania(treasury, devWallet, address(prizePool), address(mockCfa));
        vm.prank(owner);
        prizePool.setCanvas(address(pixelmania));
    }

    function test_OwnerSet() public view {
        assertEq(pixelmania.owner(), owner);
    }

    function test_Constants() public view {
        assertEq(pixelmania.G_TOKEN(), 0x62B8B11039FcfE5aB0C56E502b1C372A3d2a9c7A);
        assertEq(pixelmania.CANVAS_SIZE(), 512);
        assertEq(pixelmania.PLACEMENT_FEE(), 1e17); // 0.1 G$
    }

    function test_PositionOf() public view {
        assertEq(pixelmania.positionOf(0, 0), 0);
        assertEq(pixelmania.positionOf(100, 200), 100 + 200 * 512);
        assertEq(pixelmania.positionOf(511, 511), 511 + 511 * 512);
    }

    function test_RevertWhen_PositionOutOfBounds() public {
        vm.expectRevert(Errors.CoordinatesOutOfBounds.selector);
        pixelmania.positionOf(512, 0);
        vm.expectRevert(Errors.CoordinatesOutOfBounds.selector);
        pixelmania.positionOf(0, 512);
    }

    function test_IsPixelArmored_EmptyPixel() public view {
        assertFalse(pixelmania.isPixelArmored(0, 0));
    }

    function test_IsPixelArmored_OutOfBounds() public view {
        assertFalse(pixelmania.isPixelArmored(512, 0));
        assertFalse(pixelmania.isPixelArmored(0, 512));
    }

    function test_SetTreasury() public {
        address newTreasury = address(0x10);
        vm.prank(owner);
        pixelmania.setTreasury(newTreasury);
        assertEq(pixelmania.treasury(), newTreasury);
    }

    function test_SetDevWallet() public {
        address newDev = address(0x11);
        vm.prank(owner);
        pixelmania.setDevWallet(newDev);
        assertEq(pixelmania.devWallet(), newDev);
    }

    function test_SetPrizePool() public {
        address newPool = address(0x20);
        vm.prank(owner);
        pixelmania.setPrizePool(newPool);
        assertEq(pixelmania.prizePool(), newPool);
    }

    function test_SetCfa() public {
        address newCfa = address(0x12);
        vm.prank(owner);
        pixelmania.setCfa(newCfa);
        assertEq(pixelmania.cfa(), newCfa);
    }

    function test_RevertWhen_NonOwnerSetTreasury() public {
        vm.prank(user);
        vm.expectRevert();
        pixelmania.setTreasury(address(0x10));
    }

    function test_PauseUnpause() public {
        vm.prank(owner);
        pixelmania.pause();
        assertTrue(pixelmania.paused());
        vm.prank(owner);
        pixelmania.unpause();
        assertFalse(pixelmania.paused());
    }

    function test_UserDataEncodeDecode() public pure {
        uint16 x = 100;
        uint16 y = 200;
        uint8 color = 42;
        bytes memory data = PixelmaniaUserData.encode(x, y, color);
        assertEq(data.length, 5);
        assertEq(uint8(data[0]), x >> 8);
        assertEq(uint8(data[1]), x & 0xFF);
        assertEq(uint8(data[2]), y >> 8);
        assertEq(uint8(data[3]), y & 0xFF);
        assertEq(uint8(data[4]), color);
    }
}
