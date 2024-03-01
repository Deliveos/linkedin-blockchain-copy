const { ethers } = require("hardhat")


async function main(){
  const contract = await ethers.getContractFactory("BlockchainFinalExamNFT");
  console.log("Deploying contract...");
  const deployResult = await contract.deploy();
  console.log("Deployed contract to " + deployResult.target)
}

main()
.then(()=>process.exit(0))
.catch((error) => {
  console.error(error);
  process.exit(1)
})