// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";
import "./Errors.sol";

contract Pixelmania is Ownable, ReentrancyGuard, Pausable {
    address public constant G_TOKEN = 0x62B8B11039FcfE5aB0C56E502b1C372A3d2a9c7A;
    address public constant CFA_FORWARDER = 0xcfA132E353cB4E398080B9700609bb008eceB125;
    uint256 public constant CANVAS_SIZE = 512;
    uint256 public constant PLACEMENT_FEE = 1e17; // 0.1 G$
    int96 public constant MIN_ARMOR_FLOW_RATE = 11_574_074_074_074_074;

    uint256 private constant FEE_PRIZE_BPS = 8000;
    uint256 private constant FEE_TREASURY_BPS = 1000;
    uint256 private constant FEE_DEV_BPS = 1000;
    uint256 private constant BPS_DENOMINATOR = 10_000;
    address private constant ERC1820_REGISTRY = 0x1820a4B7618BdE71Dce8cdc73aAB6C95905faD24;

    mapping(uint256 => address) public pixelOwner;
    mapping(uint256 => uint8) public pixelColor;
    address public treasury;
    address public devWallet;
    address public prizePool;
    address public cfa;

    event PixelPlaced(address indexed user, uint256 indexed position, uint8 color, bool armored);
    event TreasuryUpdated(address indexed previous, address indexed current);
    event DevWalletUpdated(address indexed previous, address indexed current);
    event PrizePoolUpdated(address indexed previous, address indexed current);
    event CfaUpdated(address indexed previous, address indexed current);

    constructor(address _treasury, address _devWallet, address _prizePool, address _cfa) Ownable(msg.sender) {
        if (_treasury == address(0) || _devWallet == address(0) || _prizePool == address(0) || _cfa == address(0)) revert Errors.InvalidAddress();
        treasury = _treasury;
        devWallet = _devWallet;
        prizePool = _prizePool;
        cfa = _cfa;
        _registerERC777Recipient();
    }

    function _registerERC777Recipient() internal {
        (bool success, ) = ERC1820_REGISTRY.call(
            abi.encodeWithSignature(
                "setInterfaceImplementer(address,bytes32,address)",
                address(this),
                keccak256("ERC777TokensRecipient"),
                address(this)
            )
        );
        require(success, "ERC1820 registration failed");
    }

    function canImplementInterfaceForAddress(bytes32 interfaceHash, address) external pure returns (bytes32) {
        if (interfaceHash == keccak256("ERC777TokensRecipient")) return keccak256(abi.encodePacked("ERC1820_ACCEPT_MAGIC"));
        return bytes32(0);
    }

    function setTreasury(address _treasury) external onlyOwner {
        if (_treasury == address(0)) revert Errors.InvalidAddress();
        address prev = treasury;
        treasury = _treasury;
        emit TreasuryUpdated(prev, _treasury);
    }

    function setDevWallet(address _devWallet) external onlyOwner {
        if (_devWallet == address(0)) revert Errors.InvalidAddress();
        address prev = devWallet;
        devWallet = _devWallet;
        emit DevWalletUpdated(prev, _devWallet);
    }

    function setPrizePool(address _prizePool) external onlyOwner {
        if (_prizePool == address(0)) revert Errors.InvalidAddress();
        address prev = prizePool;
        prizePool = _prizePool;
        emit PrizePoolUpdated(prev, _prizePool);
    }

    function setCfa(address _cfa) external onlyOwner {
        if (_cfa == address(0)) revert Errors.InvalidAddress();
        address prev = cfa;
        cfa = _cfa;
        emit CfaUpdated(prev, _cfa);
    }

    function pause() external onlyOwner { _pause(); }
    function unpause() external onlyOwner { _unpause(); }

    function tokensReceived(
        address,
        address from,
        address to,
        uint256 amount,
        bytes calldata userData,
        bytes calldata
    ) external whenNotPaused nonReentrant {
        if (msg.sender != G_TOKEN) revert Errors.OnlyGToken();
        if (to != address(this)) return;
        if (amount < PLACEMENT_FEE) revert Errors.InsufficientPayment();
        if (userData.length != 5) revert Errors.InvalidUserDataLength();

        (uint16 x, uint16 y, uint8 color) = _decodeUserData(userData);
        if (x >= CANVAS_SIZE || y >= CANVAS_SIZE) revert Errors.CoordinatesOutOfBounds();

        uint256 position = uint256(x) + uint256(y) * CANVAS_SIZE;
        address currentOwner = pixelOwner[position];
        if (currentOwner != address(0) && isPixelArmored(x, y)) revert Errors.PixelArmored();

        pixelOwner[position] = from;
        pixelColor[position] = color;
        _distributeFees(amount);
        bool armored = _hasActiveStream(from);
        emit PixelPlaced(from, position, color, armored);
    }

    function _decodeUserData(bytes calldata userData) internal pure returns (uint16 x, uint16 y, uint8 color) {
        x = uint16(uint8(userData[0])) << 8 | uint16(uint8(userData[1]));
        y = uint16(uint8(userData[2])) << 8 | uint16(uint8(userData[3]));
        color = uint8(userData[4]);
    }

    function _distributeFees(uint256 amount) internal {
        uint256 toPrize = (amount * FEE_PRIZE_BPS) / BPS_DENOMINATOR;
        uint256 toTreasury = (amount * FEE_TREASURY_BPS) / BPS_DENOMINATOR;
        uint256 toDev = (amount * FEE_DEV_BPS) / BPS_DENOMINATOR;
        if (toPrize > 0) _safeTransfer(G_TOKEN, prizePool, toPrize);
        if (toTreasury > 0) _safeTransfer(G_TOKEN, treasury, toTreasury);
        if (toDev > 0) _safeTransfer(G_TOKEN, devWallet, toDev);
    }

    function _safeTransfer(address token, address to, uint256 amount) internal {
        (bool ok, ) = token.call(abi.encodeWithSignature("transfer(address,uint256)", to, amount));
        if (!ok) revert Errors.TransferFailed();
    }

    function _hasActiveStream(address from) internal view returns (bool) {
        (, int96 flowRate, , ) = ICfaV1(cfa).getFlow(G_TOKEN, from, address(this));
        return flowRate >= MIN_ARMOR_FLOW_RATE;
    }

    function isPixelArmored(uint256 x, uint256 y) public view returns (bool) {
        if (x >= CANVAS_SIZE || y >= CANVAS_SIZE) return false;
        uint256 position = x + y * CANVAS_SIZE;
        address owner_ = pixelOwner[position];
        if (owner_ == address(0)) return false;
        return _hasActiveStream(owner_);
    }

    function positionOf(uint256 x, uint256 y) external pure returns (uint256) {
        if (x >= CANVAS_SIZE || y >= CANVAS_SIZE) revert Errors.CoordinatesOutOfBounds();
        return x + y * CANVAS_SIZE;
    }

    uint256 private constant CANVAS_PIXEL_COUNT = CANVAS_SIZE * CANVAS_SIZE;

    function getPixels(uint256 startIndex, uint256 count) external view returns (
        uint256[] memory positions,
        address[] memory owners,
        uint8[] memory colors
    ) {
        if (startIndex >= CANVAS_PIXEL_COUNT || startIndex + count > CANVAS_PIXEL_COUNT) revert Errors.InvalidBatchRange();
        positions = new uint256[](count);
        owners = new address[](count);
        colors = new uint8[](count);
        for (uint256 i; i < count; ) {
            uint256 pos = startIndex + i;
            positions[i] = pos;
            owners[i] = pixelOwner[pos];
            colors[i] = pixelColor[pos];
            unchecked { ++i; }
        }
    }

    function getConfig() external view returns (
        uint256 canvasSize,
        uint256 placementFee,
        address gToken,
        address canvasAddress,
        bool isPaused
    ) {
        return (CANVAS_SIZE, PLACEMENT_FEE, G_TOKEN, address(this), paused());
    }
}

interface ICfaV1 {
    function getFlow(address superToken, address sender, address receiver)
        external view returns (uint256 lastUpdated, int96 flowRate, uint256 deposit, uint256 owedDeposit);
}
