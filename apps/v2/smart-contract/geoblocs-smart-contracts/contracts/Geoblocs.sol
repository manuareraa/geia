// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@thirdweb-dev/contracts/base/ERC1155Base.sol";

contract Geoblocs is ERC1155Base {
    constructor(
        address _defaultAdmin,
        string memory _name,
        string memory _symbol,
        address _royaltyRecipient,
        uint128 _royaltyBps
    )
        ERC1155Base(
            _defaultAdmin,
            _name,
            _symbol,
            _royaltyRecipient,
            _royaltyBps
        )
    {}

    function batchTransferSingleToken(
        address from,
        address[] memory to,
        uint256 id,
        uint256[] memory amounts,
        bytes memory data
    ) public onlyOwner {
        require(
            to.length == amounts.length,
            "ERC1155: to and amounts length mismatch"
        );

        for (uint256 i = 0; i < to.length; ++i) {
            safeTransferFrom(from, to[i], id, amounts[i], data);
        }
    }
}
