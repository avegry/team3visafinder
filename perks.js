const express = require('express');
const router = express.Router();
const supabase = require('../supabase');

router.post('/perks', async (req, res) => {
    const { country } = req.body;

    try {
        // Query 'governmentperks' table based on the country name
        const { data: perks, error } = await supabase
            .from('governmentperks')
            .select('perkdescription')
            .eq('country', country);

        // Log the fetched data
        console.log('Fetched government perks:', perks);

        if (error) {
            console.error('Error fetching government perks:', error.message);
            throw error;
        }

        res.status(200).json({ perks });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Failed to fetch government perks' });
    }
});

module.exports = router;