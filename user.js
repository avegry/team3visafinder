const express = require('express');
const router = express.Router();
const supabase = require('../supabase');

// Route for getting user information
router.post('/user', async (req, res) => {
    const { username } = req.query; // Use req.query to access query parameters
    
    // Log the received username
    console.log('Received username:', username);

    try {
        // Query the users table to find a user with the provided username
        const { data, error } = await supabase
            .from('users')
            .select('*')
            .eq('username', username);

        if (error) {
            console.error('Error querying user:', error);
            return res.status(500).json({ message: 'An error occurred while fetching user information' });
        }

        // Check if any user with the provided username exists
        if (data && data.length > 0) { // Check if data is not empty
            // Log the user information
            console.log('User information:', data);

            // User found, return user information
            return res.status(200).json({ message: 'User information retrieved successfully', user: data });
        } else {
            // User not found
            return res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error('Error fetching user information:', error);
        return res.status(500).json({ message: 'An error occurred while fetching user information' });
    }
});

module.exports = router;
