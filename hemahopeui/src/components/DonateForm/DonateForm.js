import React, { useState } from 'react';

const DonateForm = ({ donateFunction }) => {
    const [itemDescription, setItemDescription] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [ipfsHash, setIpfsHash] = useState('');

    const handleDonationSubmit = async (e) => {
        e.preventDefault();
        try {
            // Call the donateFunction from props passing the form data
            await donateFunction({
                itemDescription,
                quantity: parseInt(quantity),
                ipfsHash
            });
            // Reset form fields after successful donation
            setItemDescription('');
            setQuantity(1);
            setIpfsHash('');
        } catch (error) {
            console.error('Error submitting donation:', error);
        }
    };

    return (
        <form onSubmit={handleDonationSubmit}>
            <label>
                Item Description:
                <input
                    type="text"
                    value={itemDescription}
                    onChange={(e) => setItemDescription(e.target.value)}
                    required
                />
            </label>
            <label>
                Quantity:
                <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    min={1}
                    required
                />
            </label>
            <label>
                IPFS Hash (Upload Image):
                <input
                    type="text"
                    value={ipfsHash}
                    onChange={(e) => setIpfsHash(e.target.value)}
                    required
                />
            </label>
            <button type="submit">Submit Donation</button>
        </form>
    );
};

export default DonateForm;
