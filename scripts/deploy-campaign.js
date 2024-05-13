const { ethers } = require("hardhat");

async function main() {
  const Campaign = await ethers.getContractFactory("Campaign");
  // Update the parameters with campaign duration and manager's address
  const campaign = await Campaign.deploy(
    "My TES CampaignII", // Name of the campaign
    "Description of my Test campaignII", // Description of the campaign
    "Target items for the Test campaignII", // Target items for the campaign
    "0x3535448e2aaa9efb9f575f292c904d383eda9352", // Address of the campaign manager
    30 // Duration of the campaign in days (example: 30 days)
  );

  await campaign.deployed();

  console.log("Campaign deployed to:", campaign.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
