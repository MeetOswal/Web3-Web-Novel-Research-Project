// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract novelFactory {
    address[] public novelCollection;
    address public admin;

    constructor() {
        admin = msg.sender;
    }

    function createNovel(string memory novelName) public {
        Novel newNovel = new Novel(novelName, msg.sender);
        novelCollection.push(address(newNovel));
    }

    function getNovels(uint256 index) public view returns (address) {
        return novelCollection[index];
    }

    function totalNovels() public view returns (uint256) {
        return novelCollection.length;
    }
}

contract Novel {
    string public novelName;
    address payable writer;
    uint256 internal freeChapters = 0;
    uint256 internal subscriptionFee = 0;
    mapping(address => uint256) internal subscription;
    uint256 internal chapterCount = 0;
    mapping(uint256 => string) internal chapters;
    uint256 internal date;

    constructor(string memory _novelName, address _writer) {
        novelName = _novelName;
        writer = payable(_writer);
    }

    function uploadNewChapter(string memory CID) public returns (uint256) {
        require(msg.sender == writer);

        chapters[chapterCount] = CID;
        chapterCount = chapterCount + 1;
        return chapterCount - 1;
    }

    function setFreeChapter(uint256 count) public returns (bool) {
        require(msg.sender == writer);
        freeChapters = count;
        return true;
    }

    function setFee(uint256 fee) public returns (bool) {
        require(msg.sender == writer);
        subscriptionFee = fee;
        return true;
    }

    function subscribe(uint256 time) public payable returns (bool) {
        date = block.timestamp;
        if (subscription[msg.sender] < block.timestamp) {
            require(msg.value == subscriptionFee * time);
            writer.transfer(msg.value);
            date = date + (time * 30 * 24 * 60 * 60);
            subscription[msg.sender] = date;
        } else {
            require(msg.value == subscriptionFee * time);
            writer.transfer(msg.value);
            date = subscription[msg.sender];
            date = date + (time * 30 * 24 * 60 * 60);
            subscription[msg.sender] = date;
        }
        return true;
    }

    function getChapter(uint256 index) public view returns (string memory) {
        if (msg.sender == writer) {
            return chapters[index];
        }
        require(index <= chapterCount); //
        require(subscription[msg.sender] > block.timestamp);
        return chapters[index];
    }
}
