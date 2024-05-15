const express = require('express');
const router = express.Router();
const supabase = require('../supabase');

// Route for fetching country details from the 'visaoptions' table
router.post('/visaoptions', async (req, res) => {
    const countryName = req.body.country;

    try {
        // Fetch country details from 'visaoptions' table based on the country name
        const { data, error } = await supabase
            .from('visaoptions')
            .select('*')
            .eq('country', countryName);

        if (error) {
            console.log('Error fetching country details:', error.message);
            throw error;
        }

        // Log the fetched data
        console.log('Fetched data:', data);

        // Send the fetched data back to the client
        res.status(200).json(data);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Failed to fetch country details' });
    }
});

module.exports = router;
