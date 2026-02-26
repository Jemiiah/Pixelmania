// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

contract PixelmaniaVoting is Ownable {
    constructor() Ownable(msg.sender) {}

    uint256 public currentRound;
    mapping(uint256 => bytes32) public selectedRegionByRound;
    mapping(uint256 => uint256) public selectedPaletteByRound;

    event RoundCreated(uint256 indexed roundId);
    event RegionSelected(uint256 indexed roundId, bytes32 regionId);
    event PaletteSelected(uint256 indexed roundId, uint256 paletteId);

    function advanceRound() external onlyOwner {
        currentRound++;
        emit RoundCreated(currentRound);
    }

    function setSelectedRegion(bytes32 regionId) external onlyOwner {
        selectedRegionByRound[currentRound] = regionId;
        emit RegionSelected(currentRound, regionId);
    }

    function setSelectedPalette(uint256 paletteId) external onlyOwner {
        selectedPaletteByRound[currentRound] = paletteId;
        emit PaletteSelected(currentRound, paletteId);
    }
}
