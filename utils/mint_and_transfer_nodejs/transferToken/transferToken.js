// Require the necessary packages
const express = require('express');
const ethers = require('ethers');
const fs = require('fs');
const ABI = require('../ABI_Token.json')
const walletRecipient = require('../walletRecipient.json');
// Create an Express application
const app = express();

require('dotenv').config();

// Start the server
app.listen(5000, () => {
    console.log('Server running at http://localhost:5000/');
});


async function tfToken() {
    const provider = new ethers.providers.JsonRpcProvider('https://opbnb-testnet-rpc.bnbchain.org');
    const contractAddress = '0xa9aD1484D9Bfb27adbc2bf50A6E495777CC8cFf2';
    const contractABI = ABI;

    const privateKey = 'e395a647f8b9f3a5e81551f82e0c0ba42b0ac42516e4a85acbb29ff05b2a01b4';
    const wallet = new ethers.Wallet(privateKey, provider);
    const contract = new ethers.Contract(contractAddress, contractABI, wallet);

    const transactionHash = [];

    for (let i = 0; i < walletRecipient.length; i++) {
        try {
            let amountString = walletRecipient[i].amount;
            let senderWallet = walletRecipient[i].wallet;

            console.log('Proceed: ' + senderWallet);
            
            const tx = await contract.transfer(senderWallet, ethers.utils.parseEther(amountString.toString()));
            await tx.wait();
            transactionHash.push(tx.hash)

            console.log('Success: ' + senderWallet + ' with tx hash: ' + tx.hash);
        } catch (error) {
            console.error(error);
        }
    }

    const jsonContent = JSON.stringify(transactionHash, null, 2);

    fs.writeFileSync('transactionHash-tfToken.json', jsonContent, 'utf8')
}

tfToken();