// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;


contract DiceGameETH {

    address public owner;
    bool gameIsActive;

    struct Player {
        address wallet;
        uint result;
        bool isWinner;
    }

    Player[] players;
    mapping (address => bool) public isActive;
    mapping (address => bool) public madeMove;


    constructor() {
        owner = msg.sender;
    }

    /*  ***** Modifiers ***** */
    modifier onlyOwner() {
        require(owner == msg.sender, "Only owner can do this!");
        _;
    }
    
    /*  ***** Functions ***** */
    function AddPlayer(address _addr) onlyOwner external {
        require(isActive[_addr] == false, "Player already exists...");
            isActive[_addr] = true;
            Player memory _player = Player(_addr, 0, false);
            players.push(_player);
    }

    function getPlayer(address _addr) external view returns (Player memory){
        require(isActive[_addr], "Player doesn't exists");
        Player memory _p;
        for (uint i=0; i < players.length; i++) {
            if (players[i].wallet == _addr) {
                _p =  players[i];
            }
        }
        return _p;
    }

    function ThrowDice(uint8 _result) external payable {
        require(isActive[msg.sender], "Player doesn't exists");
        require(madeMove[msg.sender] == false, "You already have made a move!");
        require((_result <= 24) && (_result > 0), "Dice resul is incorrect (0 < result <= 24)");
        require(msg.value >= 1000000 gwei, "At least 0.001 Ether");

            for (uint i=0; i < players.length; i++) {
            if (players[i].wallet == msg.sender) {
                players[i].result = _result;
                madeMove[msg.sender] = true;
            }
        }
    }

    function EndGame() onlyOwner external {
        uint[] memory _results = new uint[](players.length);
        for (uint i=0; i < players.length; i++) {
            if (isActive[players[i].wallet]) {
                _results[i] = players[i].result;
            }
            else {
                _results[i] = 0;
            }
        }
        uint max_result = this.getLargest(_results);
        uint number_of_winners = 0;


        for (uint i=0; i < players.length; i++) {
            if ((isActive[players[i].wallet]) && (players[i].result == max_result)) {
                players[i].isWinner = true;
                number_of_winners++;
            }
        }
        
        uint win_amount = address(this).balance / number_of_winners;
        for (uint i=0; i < players.length; i++) {
            if ((isActive[players[i].wallet]) && (players[i].isWinner == true)) {
                address payable _to = payable(players[i].wallet);
                _to.transfer(win_amount);
            }
        }

        for (uint i=0; i < players.length; i++) {
            if (isActive[players[i].wallet]) {
                players[i].isWinner = false;
                isActive[players[i].wallet] = false;
                madeMove[players[i].wallet] = false;
            }
        }
    }

    function getLargest(uint[] memory results) public pure returns(uint){
        uint max_result = 0;
        for(uint i=0; i<results.length; i++){
            if(max_result<results[i]){
                max_result = results[i];
                }
            }
       return max_result;
   }
}