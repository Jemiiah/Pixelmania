// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "forge-std/Test.sol";
import "../PrizePool.sol";

contract PrizePoolTest is Test {
    PrizePool public prizePool;
    address canvas = address(0x100);
    address token = 0x62B8B11039FcfE5aB0C56E502b1C372A3d2a9c7A;

    address owner = address(1);
    address winner = address(2);

    function setUp() public {
        vm.prank(owner);
        prizePool = new PrizePool(token, canvas);
    }

    function test_CanvasSet() public view {
        assertEq(prizePool.canvas(), canvas);
        assertEq(prizePool.token(), token);
    }

    function test_AdvanceRound() public {
        assertEq(prizePool.currentRound(), 0);
        vm.prank(owner);
        prizePool.advanceRound();
        assertEq(prizePool.currentRound(), 1);
    }

    function test_SetCanvas() public {
        address newCanvas = address(0x200);
        vm.prank(owner);
        prizePool.setCanvas(newCanvas);
        assertEq(prizePool.canvas(), newCanvas);
    }

    function test_RevertWhen_NonOwnerAdvanceRound() public {
        vm.prank(winner);
        vm.expectRevert();
        prizePool.advanceRound();
    }
}
