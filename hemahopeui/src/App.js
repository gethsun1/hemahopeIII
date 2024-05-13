import React, { useEffect, useState } from 'react';
import Web3 from 'web3'; // Import Web3 for interacting with Ethereum
import { ethers } from 'ethers'; // Import ethers.js for Ethereum smart contract interactions
import logo from './logo.svg'; // Import logo image
import './App.css'; // Import styles
import CreateCampaignForm from './components/CreateCampaignForm/CreateCampaignForm'; // Import CreateCampaignForm component
import CampaignList from './components/CampaignList/CampaignList'; // Import CampaignList component
import HemaHopeABI from './HemaHope.json'; // Import ABI (Application Binary Interface) for HemaHope smart contract
import CampaignABI from './Campaign.json';

function App() {
  const [accounts, setAccounts] = useState([]); // State to store Ethereum accounts
  const [campaigns, setCampaigns] = useState([]); // State to store campaigns
  const [contract, setContract] = useState(null); // State to store smart contract instance

  useEffect(() => {
    const loadWeb3 = async () => {
      if (window.ethereum) { // Check if MetaMask is installed
        window.web3 = new Web3(window.ethereum); // Initialize Web3
        await window.ethereum.enable(); // Enable Ethereum provider (MetaMask)
        const provider = new ethers.providers.Web3Provider(window.ethereum); // Create Web3 provider
        const signer = provider.getSigner(); // Get signer for transactions
        const contract = new ethers.Contract( // Initialize smart contract instance
          '0xEb44fC3A00539e35bbe2C87A173D6Af69ab18dc0', // Contract address
          HemaHopeABI.abi, // Contract ABI
          signer // Signer for transactions
        );
        setContract(contract); // Set contract state
        const accs = await window.web3.eth.getAccounts(); // Get Ethereum accounts
        setAccounts(accs); // Set accounts state
      } else {
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
      }
    };
    
    loadWeb3(); // Call loadWeb3 function
  }, []); // Empty dependency array to run once on component mount

  // Handle form submission to create a new campaign
 
  const handleSubmit = async () => {
    try {
        if (contract) { // Check if contract is initialized
            // Call createPhysicalItemCampaign function of the contract with parameters
            await contract.createPhysicalItemCampaign("Campaign Name", "Campaign Description", "Target Items");
            console.log('Campaign created successfully');

            // Fetch all campaigns using the getAllCampaigns function
            const fetchedCampaignAddresses = await contract.getAllCampaigns();

            const provider = new ethers.providers.Web3Provider(window.ethereum); // Create Web3 provider
            const signer = provider.getSigner(); // Get signer for transactions

            // Now you can fetch details of each campaign based on the addresses in fetchedCampaignAddresses array
            // Example code to fetch details of each campaign:
            const fetchedCampaigns = [];
            for (let i = 0; i < fetchedCampaignAddresses.length; i++) {
                const campaignAddress = fetchedCampaignAddresses[i];
                const campaign = await new ethers.Contract(
                    campaignAddress,
                    CampaignABI.abi, // Assuming you have Campaign ABI imported
                    signer // Pass the signer or provider
                );
                // Call necessary functions of the campaign contract to get details
                const campaignDetails = await campaign.getCampaignDetails(); //function to get campaign details
                fetchedCampaigns.push(campaignDetails);
            }

              setCampaigns(fetchedCampaigns); // Update campaigns state with fetched campaigns
          } else {
              console.error('Contract not initialized');
          }
      } catch (error) {
          console.error('Error Fetching campaigns!:', error);
      }
  };


  

  // Handle connecting wallet
  const handleConnectWallet = async () => {
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const accs = await window.web3.eth.getAccounts();
      setAccounts(accs);
    } catch (error) {
      console.error('Check Wallet Pop-up & Allow Web3 Account Access');
    }
  };

  // Render the UI components
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Wallet Address: {accounts.length > 0 ? accounts[0] : 'Not connected'} {/* Display wallet address */}
        </p>
        <button onClick={handleConnectWallet}>Connect Wallet</button> {/* Button to connect wallet */}
      </header>

      <main className="App-main">
        <div className="CreateCampaignFormContainer">
          <CreateCampaignForm onSubmit={handleSubmit} /> {/* Pass handleSubmit function as a prop */}

        </div>
        <div className="CampaignListContainer">
          <CampaignList campaigns={campaigns} /> {/* Render CampaignList component */}
        </div>
      </main>

      <footer className="App-footer">
        {/* Add footer content here */}
      </footer>
    </div>
  );
}

export default App;
