const {Web3} = require('web3');
const express = require('express');
const contractABI = require('./contractAbi.json');
const app = express();
const port = 3000; 

const web3 = new Web3(new Web3.providers.HttpProvider('https://bsc-dataseed.binance.org/'));

const contractAddress = '0x4691f60c894d3f16047824004420542e4674e621';
const contract = new web3.eth.Contract(contractABI, contractAddress);

// Define your router
const router = express.Router();

app.use(express.json());

router.get('/api/totalSupply', async (req, res) => {
   try {
    const totalSupply = await contract.methods.totalSupply().call();
    const decimal = await contract.methods.decimals().call();
    const result = totalSupply/BigInt(10)**BigInt(decimal);
    res.json({success: true, totalSupply: JSON.stringify(result.toString())});
   }
   catch(err){
        res.status(500).json({success: false, message: err.toString()})
   }
});

app.use(router);

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
