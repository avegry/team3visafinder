const express = require('express');
const router = express.Router();
const supabase = require('../supabase');

// POST endpoint to handle user registration
router.post('/register', async (req, res) => {
  try {
    // Extract user data from the request body
    const {
      username,
      password,
      email,
      date_of_birth,
      current_country_of_citizenship,
      country_of_residency,
      criminal_record,
      valid_passport,
      initial_investment_amount,
      proof_of_funds_available,
      health_insurance_established,
      language_proficiency
    } = req.body;

    console.log('Received registration request with data:', req.body);

    // Check if the username already exists
    const { data: existingUsers, error: userError } = await supabase
      .from('users')
      .select('username')
      .eq('username', username);

    if (userError) {
      console.error('Error checking existing user:', userError);
      return res.status(500).json({ error: 'Failed to register user. Please try again.' });
    }

    if (existingUsers.length > 0) {
      // Username already exists
      console.log('Username already exists:', username);
      return res.status(409).json({ error: 'Username already exists. Please choose a different username.' });
    }

    // Insert user data into the database
    const { data: insertedUserData, error: insertionError } = await supabase
      .from('users')
      .insert({
        username,
        password,
        email,
        date_of_birth,
        current_country_of_citizenship,
        country_of_residency,
        criminal_record,
        valid_passport,
        initial_investment_amount,
        proof_of_funds_available,
        health_insurance_established,
        language_proficiency
      });

    if (insertionError) {
      console.error('Error registering user:', insertionError);
      return res.status(500).json({ error: 'Failed to register user. Please try again.' });
    }

    // Send a success response
    res.status(201).json({ message: 'User registered successfully', username });

  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Failed to register user. Please try again.' });
  }
});

module.exports = router;
