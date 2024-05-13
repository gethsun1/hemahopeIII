const { ethers } = require("hardhat");

async function main() {
  const HemaHope = await ethers.getContractFactory("HemaHope");
  const hemahope = await HemaHope.deploy();

  await hemahope.deployed();

  console.log("HemaHope deployed to:", hemahope.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
