// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract RegionNFT is ERC721, Ownable {
    uint256 private _nextTokenId;
    string private _baseTokenURI;
    mapping(uint256 => uint256) public roundByTokenId;

    event Minted(address indexed to, uint256 indexed tokenId, uint256 roundId);

    constructor(string memory baseURI_) ERC721("Pixelmania Region", "PXLREG") Ownable(msg.sender) {
        _baseTokenURI = baseURI_;
    }

    function setBaseURI(string calldata baseURI_) external onlyOwner {
        _baseTokenURI = baseURI_;
    }

    function mint(address to, uint256 roundId) external onlyOwner returns (uint256 tokenId) {
        tokenId = _nextTokenId++;
        roundByTokenId[tokenId] = roundId;
        _safeMint(to, tokenId);
        emit Minted(to, tokenId, roundId);
        return tokenId;
    }

    function _baseURI() internal view override returns (string memory) {
        return _baseTokenURI;
    }
}
