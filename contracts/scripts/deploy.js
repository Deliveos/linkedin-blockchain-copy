const hre = require("hardhat");

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
  const contract = await hre.ethers.deployContract("LnkInNFT");
  await contract.waitForDeployment();
  console.log("Contract Address:", contract.target);
  await sleep(30 * 1000);
  await hre.run("verify:verify", {
    address: contract.target
  });
}


main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });