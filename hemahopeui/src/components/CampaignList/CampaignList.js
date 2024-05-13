// components/CampaignList.js
import React from 'react';

const CampaignList = ({ campaigns, handleCampaignClick }) => {
  return (
    <div>
      {campaigns.map((campaign) => (
        <div key={campaign.id} onClick={() => handleCampaignClick(campaign.id)}>
          <h3>{campaign.name}</h3>
          <p>{campaign.description}</p>
          <p>Status: {campaign.isActive ? 'Active' : 'Closed'}</p>
          <p>Progress: {campaign.progress}%</p>
        </div>
      ))}
    </div>
  );
};

export default CampaignList;
