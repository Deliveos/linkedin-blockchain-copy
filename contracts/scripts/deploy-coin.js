const {ethers} = require("hardhat")


async function main(){
  const contract = await ethers.getContractFactory("BlochchainFinalExamCoin");
  console.log("Deploying contract...");
  const delpoyResult = await contract.deploy();
  console.log("Deployed contract to " + delpoyResult.target)
}

main()
  .then(()=>process.exit(0))
  .catch((error) => {
  console.error(error);
  process.exit(1)
  })