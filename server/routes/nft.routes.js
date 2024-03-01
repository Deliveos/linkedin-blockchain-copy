const ethers = require("ethers");
const path = require('path');
const fs = require("fs");
const router = require('express').Router();

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
const privateKey = process.env.PRIVATE_KEY;
const wallet = new ethers.Wallet(privateKey, provider);
const abiPath = path.resolve("./contracts/BlockchainFinalExamNFT.sol/BlockchainFinalExamNFT.json");
const rawData = fs.readFileSync(abiPath);  
const contractAbi = JSON.parse(rawData).abi;
const contractAddress = process.env.NFT_CONTRACT_ADDRESS;

const contract = new ethers.Contract(contractAddress, contractAbi, wallet);

/**
 * @swagger
 * /nft/mint:
 *   post:
 *     tags:
 *       - NFT
 *     consumes:
 *       - application/json
 *     produces:
 *      - application/json
 *     parameters:
 *       - in: body
 *         name: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             address:
 *               type: string
 *     description: Use to create a new NFT token
 */
router.post('/mint', async (req, res) => {
    try{
        const tx = await contract.safeMint(req.body.address);
        await tx.wait(); 
        console.log("Transaction hash: "+ tx.hash);
        return res.json(tx);
    }catch(err){
        return res.send("Cannot mint nft: " + err);
    }
});
/**
 * @swagger
 * /nft/burn:
 *   post:
 *     tags:
 *       - NFT
 *     consumes:
 *       - application/json
 *     produces:
 *      - application/json
 *     parameters:
 *       - in: body
 *         name: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             tokenId:
 *               type: string
 *     description: Use to create a delete NFT token
 */
router.post('/burn', async (req, res) => {
    try{
        const tx = await contract.burn(req.body.tokenId);
        await tx.wait(); 
        console.log("Transaction hash: "+ tx.hash);
        return res.json(tx)
    }catch(err){
        return res.send("Cannot burn nft: " + err);
    }
});
/**
 * @swagger
 * /nft/balance/{address}:
 *   get:
 *     tags:
 *       - NFT
 *     consumes:
 *       - application/json
 *     produces:
 *      - application/json
 *     parameters:
 *       - in: path
 *         name: address
 *         required: true
 *         description: Wallet address
 *     description: Use to get balance of the NFT in wallet
 *     responses:
 *       '201':
 *         description: A successful response
 */
router.get('/balance/:address', async (req, res) => {
    const result = await contract.balanceOf(req.params.address);
    return res.json({ balance: result.toString() });
});
/**
 * @swagger
 * /nft/get-tokens/{address}:
 *   post:
 *     tags:
 *       - NFT
 *     consumes:
 *       - application/json
 *     produces:
 *      - application/json
 *     parameters:
 *       - in: path
 *         name: address
 *         required: true
 *         description: Wallet address
 *     description: Use to get tokens by Wallet Address
 */
router.get('/get-tokens/:address', async (req, res) => {
    const tokenId = await contract.tokenOfOwnerByIndex(req.params.address, 0);
    const tokenURI = await getTokenURI(tokenId);
    const nftURL = await createHttpNFTLink(tokenURI);
    return res.json({tokenId: tokenId.toString(), nftURL: nftURL.toString()});
});
/**
 * @swagger
 * /nft/test:
 *   get:
 *     tags:
 *       - NFT
 *     description: Test contract
 *     responses:
 *       '200':
 *         description: A successful response
 */
router.get('/test', async (req, res) => {
    const result = await contract.owner();
    res.json(result);
});

async function getTokenURI(tokenId){
    try{
        const result = await contract.tokenURI(tokenId);
        return result;
    } catch(err) {
        throw new Error(err);
    }
}

async function createHttpNFTLink(tokenURI){
    const ipfsPrefix = 'ipfs://';
    const httpsPrefix = 'https://ipfs.io/ipfs/';
    return httpsPrefix + tokenURI.slice(ipfsPrefix.length);
}

module.exports = router;