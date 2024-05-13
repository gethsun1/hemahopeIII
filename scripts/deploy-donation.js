const { ethers } = require("hardhat");

async function main() {
  const Donation = await ethers.getContractFactory("Donation");
  const donation = await Donation.deploy(
    "0x3b0BD98C9778B6Adf6E726F29dd43dB3Aa33F1c0" // Address of the CharityPlatform contract
  );

  await donation.deployed();

  console.log("Donation deployed to:", donation.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
