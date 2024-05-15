const express = require('express');
const router = express.Router();

// Example route to fetch data from Supabase
router.get('/data', async (req, res) => {
  try {
    console.log('Fetching data from Supabase...');
    const { data, error } = await supabase.from('countries').select('name');
    console.log('Data fetched:', data); // Log the fetched data
    console.log('Error:', error); // Log any error
    if (error) {
      console.error('Error fetching data from Supabase:', error.message); // Log the error message
      throw error;
    }
    res.json(data);
  } catch (error) {
    console.error('Internal server error:', error.message); // Log the internal server error
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});

module.exports = router;