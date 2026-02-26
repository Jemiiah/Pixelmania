// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "./Errors.sol";

contract PrizePool is Ownable, ReentrancyGuard {
    address public immutable token;
    address public canvas;
    uint256 public currentRound;

    event CanvasUpdated(address indexed previous, address indexed current);
    event RoundAdvanced(uint256 indexed previousRound, uint256 indexed newRound);
    event RewardsDistributed(uint256 indexed roundId, address[] winners, uint256[] amounts);

    modifier onlyCanvas() {
        if (msg.sender != canvas) revert Errors.OnlyCanvas();
        _;
    }

    constructor(address _token, address _canvas) Ownable(msg.sender) {
        if (_token == address(0)) revert Errors.InvalidAddress();
        token = _token;
        canvas = _canvas;
    }

    function setCanvas(address _canvas) external onlyOwner {
        if (_canvas == address(0)) revert Errors.InvalidAddress();
        address prev = canvas;
        canvas = _canvas;
        emit CanvasUpdated(prev, _canvas);
    }

    function advanceRound() external onlyOwner {
        uint256 prev = currentRound;
        currentRound++;
        emit RoundAdvanced(prev, currentRound);
    }

    function distributeRewards(address[] calldata winners, uint256[] calldata amounts) external onlyOwner nonReentrant {
        if (winners.length != amounts.length) revert Errors.ArrayLengthMismatch();
        for (uint256 i; i < winners.length; ) {
            if (amounts[i] > 0) _safeTransfer(token, winners[i], amounts[i]);
            unchecked { ++i; }
        }
        emit RewardsDistributed(currentRound, winners, amounts);
    }

    function _safeTransfer(address _token, address to, uint256 amount) internal {
        (bool ok, ) = _token.call(abi.encodeWithSignature("transfer(address,uint256)", to, amount));
        if (!ok) revert Errors.TransferFailed();
    }
}
