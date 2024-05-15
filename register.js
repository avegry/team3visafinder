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

    // Insert user data into the database
    const { data, error } = await supabase
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

    if (error) {
      console.error('Error registering user:', error);
      return res.status(500).json({ error: 'Failed to register user' });
    }

    // Send a success response
    res.status(201).json({ message: 'User registered successfully', userID: data.UserID });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Failed to register user' });
  }
});

module.exports = router;
