const express = require('express');
const ethers = require('ethers');
const fs = require('fs');
const app = express();
const walletRecipient = require('../walletRecipient.json');

require('dotenv').config();

// Start the server
app.listen(5000, () => {
    console.log('Server running at http://localhost:5000/');
});


async function tf() {
    // JSON RPC depend on what chain do you use, this RPC is for BNB chain. You can search any different RPC from https://chainlist.org/
    const provider = new ethers.providers.JsonRpcProvider('https://opbnb-testnet-rpc.bnbchain.org');
    const privateKey = 'e395a647f8b9f3a5e81551f82e0c0ba42b0ac42516e4a85acbb29ff05b2a01b4';

    const wallet = new ethers.Wallet(privateKey, provider);
    const transactionHash = [];
    
    for (let i = 0; i < walletRecipient.length; i++) {
        let amountString = walletRecipient[i].amount
        console.log('Proceed: ' + walletRecipient[i].wallet);
        const tx = await wallet.sendTransaction({
            to: walletRecipient[i].wallet,
            value: ethers.utils.parseEther(amountString.toString())
        })
        await tx.wait();
        transactionHash.push(tx.hash)
        console.log('Success: ' + walletRecipient[i].wallet + ' with tx hash: ' + tx.hash);
    }

    const jsonContent = JSON.stringify(transactionHash, null, 2);

    fs.writeFileSync('transactionHash-tf.json', jsonContent, 'utf8')
}

tf();