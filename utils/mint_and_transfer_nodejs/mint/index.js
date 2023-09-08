// Require the necessary packages
const express = require('express');
const ethers = require('ethers');
const fs = require('fs');
const ABI = require('../ABI.json')
// Create an Express application
const app = express();

require('dotenv').config();

// Start the server
app.listen(5000, () => {
    console.log('Server running at http://localhost:5000/');
});


async function mint() {
    const provider = new ethers.providers.JsonRpcProvider('https://opbnb-testnet-rpc.bnbchain.org');
    const contractAddress = '0x5aee67f8dc2d9a5537d4b64057b52da31d37516b';
    const contractABI = ABI;

    const privateKey = 'e395a647f8b9f3a5e81551f82e0c0ba42b0ac42516e4a85acbb29ff05b2a01b4';
    const wallet = new ethers.Wallet(privateKey, provider);
    const contract = new ethers.Contract(contractAddress, contractABI, wallet);

    const transactionHash = [];
    
    for (let i = 0; i < 100; i++) {
        try {
            const tx = await contract.mint();
            await tx.wait();
            transactionHash.push(tx.hash)
            console.log(tx.hash);
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const jsonContent = JSON.stringify(transactionHash, null, 2);

    fs.writeFileSync('transactionHash.json', jsonContent, 'utf8')
}

mint();