pragma solidity 0.4.25;

contract inbox{
    string public msg;

    constructor(string memory newMsg) public
    {
        msg=newMsg;
    }
   
    function setData(string memory newMsg) public
    {
        msg=newMsg;
    }
}