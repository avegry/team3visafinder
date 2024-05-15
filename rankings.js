const express = require('express');
const router = express.Router();
const supabase = require('../supabase');

// Define weights for each parameter from database
const weights = {
  processingtime_rank: 0.2,
  stepstocompleteapplication_rank: 0.2,
  documentchecklist_rank: 0.2,
  governmentfees_rank: 0.2,
  pathtocitizenship_rank: 0.2,
  tradeagreements_rank: 0.2,
  grantsources_rank: 0.2,
};

// Define a function to calculate the overall score for a country
function calculateScore(country) {
  let totalScore = 0;
  for (const key in weights) {
    // Parse the value as an integer before performing arithmetic
    const value = parseInt(country[key]);
    if (!isNaN(value)) {
      totalScore += value * weights[key];
    } else {
      console.log(`Invalid value for ${key}: ${country[key]}`);
    }
  }
  return totalScore;
}

// Handle POST request to submit rankings and get top 5 countries
router.post('/rankings', async (req, res) => {
  // Extract rankings data from the request body
  const {
    processingTime,
    stepsToCompleteApplication,
    documentChecklist,
    governmentFees,
    pathToCitizenship,
    tradeAgreement,
    grantSourcingApps
  } = req.body;

  try {
    // Fetch all countries from 'countryranks'
    const { data: countries, error } = await supabase
      .from('countryranks')
      .select('*');

    if (error) {
      console.log('Error fetching countries:', error.message);
      throw error;
    }

// Define tolerance variables for filtering
const min_tolerance = 2;

// Filter countries based on provided criteria with tolerance
const filteredCountries = countries.filter(country => {
  return (
    country.processingtime_rank >= processingTime - min_tolerance &&
    country.stepstocompleteapplication_rank >= stepsToCompleteApplication - min_tolerance &&
    country.documentchecklist_rank >= documentChecklist - min_tolerance &&
    country.governmentfees_rank >= governmentFees - min_tolerance &&
    country.pathtocitizenship_rank >= pathToCitizenship - min_tolerance &&
    country.tradeagreements_rank >= tradeAgreement - min_tolerance &&
    country.grantsources_rank >= grantSourcingApps - min_tolerance
  );
});

    // Calculate score for each country
    const rankedCountries = filteredCountries.map(country => ({
      ...country,
      score: calculateScore(country)
    }));

    // Sort countries based on their scores
    rankedCountries.sort((a, b) => b.score - a.score);

    // Extract only the TOP 5 country names and scores from the response data
    const topCountries = rankedCountries.slice(0, 5).map(country => ({
      country: country.country,
      score: country.score
    }));

    console.log('Top countries:', topCountries); // Print topCountries to the console

    if (topCountries.length === 0) {
      res.status(404).json({ message: 'No countries with given ranks, please try again' });
    } else {
      res.status(200).json({ topCountries });
    }

  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Failed to fetch top countries' });
  }
});


module.exports = router;