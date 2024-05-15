const express = require('express');
const router = express.Router();
const supabase = require('../supabase');

// Route for user login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Query the users table to find a user with the provided username
        const { data, error } = await supabase
            .from('users')
            .select('username, password')
            .eq('username', username)
            .single();

        if (error) {
            console.error('Error querying user:', error);
            return res.status(500).json({ message: 'An error occurred while logging in' });
        }

        // Check if a user with the provided username exists and if the password matches
        if (data && data.password === password) {
            // User authenticated successfully
            return res.status(200).json({ message: 'Login successful', user: data });
        } else {
            // Invalid username or password
            return res.status(401).json({ message: 'Invalid username or password' });
        }
    } catch (error) {
        console.error('Error authenticating user:', error);
        return res.status(500).json({ message: 'An error occurred while logging in' });
    }
});

module.exports = router;
