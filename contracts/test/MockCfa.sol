// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract MockCfa {
    int96 public mockFlowRate;

    function setFlowRate(int96 _flowRate) external {
        mockFlowRate = _flowRate;
    }

    function getFlow(
        address,
        address,
        address
    ) external view returns (uint256 lastUpdated, int96 flowRate, uint256 deposit, uint256 owedDeposit) {
        return (block.timestamp, mockFlowRate, 0, 0);
    }
}
