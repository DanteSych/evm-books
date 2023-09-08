// Require the necessary packages
const express = require('express');
const ethers = require('ethers');
const ABI = require('../ABI.json')
// Create an Express application
const app = express();

require('dotenv').config();

// Start the server
app.listen(5000, () => {
    console.log('Server running at http://localhost:5000/');
});

// The basic principle is that when you want to integrate your 
// contract into your website or your code, there are three main things below

const RPC = 'https://opbnb-testnet-rpc.bnbchain.org'; // Every blockchain has its own RPC, look on chainlist.org
const contractAddress = '0x5aee67f8dc2d9a5537d4b64057b52da31d37516b'; // fill in with the contract address you created
const contractABI = ABI; // The result of copying the ABI when you deploy your contract, you can copy it back to the respective blockchain explorer.

async function mint() {
    const provider = new ethers.providers.JsonRpcProvider(RPC);

    // the private key here is applied only when you use your wallet directly in Node.js
    // If you use a website, this function will be replaced with the "connect wallet" function available to execute the smart contract.
    const privateKey = 'e395a647f8b9f3a5e81551f82e0c0ba42b0ac42516e4a85acbb29ff05b2a01b4';
    const wallet = new ethers.Wallet(privateKey, provider);
    const contract = new ethers.Contract(contractAddress, contractABI, wallet);

    try {
        const tx = await contract.mint(); // This is the contract execution function, for example, here is the execution of the "mint" function. You can replace it with other functions available in your smart contract.
        await tx.wait(); // The function "wait" is a function to ensure that the execution of the smart contract is running.
        console.log(tx.hash); // "tx.hash" is the hash resulting from the execution of a function from the smart contract. You can check it on your blockchain explorer to verify whether the function is working or not.
    } catch (error) {
        console.error('Error:', error);
    }
}

mint();