pragma solidity ^0.4.17;

contract Notary {
    struct MyNotaryEntry {
        string fileName;
        string comments;
        uint256 timestamp;
        bool isSet;
        address setBy;
        bytes32 checkSum;
    }

    mapping(bytes32 => MyNotaryEntry) myMapping;

    function addEntry(
        bytes32 _checksum,
        string memory _fileName,
        string memory _comments
    ) public {
        require(!myMapping[_checksum].isSet);
        myMapping[_checksum].isSet = true;
        myMapping[_checksum].fileName = _fileName;
        myMapping[_checksum].comments = _comments;
        myMapping[_checksum].timestamp = now;
        myMapping[_checksum].setBy = msg.sender;

    }

    function entrySet(bytes32 _checksum)
        public
        view
        returns (
            string memory,
            uint256,
            string memory,
            address
        )
    {
        require(myMapping[_checksum].isSet);
        return (
            myMapping[_checksum].fileName,
            myMapping[_checksum].timestamp,
            myMapping[_checksum].comments,
            myMapping[_checksum].setBy
        );
    }
}
