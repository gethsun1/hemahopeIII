// components/CreateCampaignForm.js
import React, { useState } from 'react';

const CreateCampaignForm = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [targetItems, setTargetItems] = useState('');
  

  const handleSubmit = (e) => {
    e.preventDefault();
    // Call the prop function with form data
    onSubmit(name, description, targetItems);
  };


  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Campaign Name" />
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description"></textarea>
      <input type="text" value={targetItems} onChange={(e) => setTargetItems(e.target.value)} placeholder="Target Items" />
      <button type="submit">Create Campaign</button>
    </form>
  );
};

export default CreateCampaignForm;
