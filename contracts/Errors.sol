// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/// Shared custom errors for Pixelmania contracts.
library Errors {
    error InvalidAddress();
    error InvalidUserDataLength();
    error CoordinatesOutOfBounds();
    error InsufficientPayment();
    error OnlyGToken();
    error PixelArmored();
    error TransferFailed();
    error ArrayLengthMismatch();
    error OnlyCanvas();
    error InvalidBatchRange();
}
