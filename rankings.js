const express = require('express');
const router = express.Router();
const supabase = require('../supabase');

// Define a function to calculate the overall score for a country
function calculateScore(country, weights) {
  let totalScore = 0;
  
  for (const key in weights) {
    const value = parseFloat(country[key]);
    const weight = parseFloat(weights[key]) || 0; // Ensure weight is a number and default to 0 if undefined
    
    if (!isNaN(value) && !isNaN(weight)) {
      totalScore += value * weight;
    } else {
      console.log(`Invalid value or weight for ${key}: value=${country[key]}, weight=${weights[key]}`);
    }
  }
  
  return totalScore;
}

// Handle POST request to submit rankings and get top 5 countries
router.post('/rankings', async (req, res) => {
  try {
    // Extract weights from the request body
    const {
      processingTime,
      stepsToCompleteApplication,
      documentChecklist,
      governmentFees,
      pathToCitizenship,
      tradeAgreement,
      grantSourcingApps
    } = req.body;

    // Create the weights object from request body and divide each weight by 10
    const weights = {
      processingtime_rank: (parseFloat(processingTime) || 0) / 10,
      stepstocompleteapplication_rank: (parseFloat(stepsToCompleteApplication) || 0) / 10,
      documentchecklist_rank: (parseFloat(documentChecklist) || 0) / 10,
      governmentfees_rank: (parseFloat(governmentFees) || 0) / 10,
      pathtocitizenship_rank: (parseFloat(pathToCitizenship) || 0) / 10,
      tradeagreements_rank: (parseFloat(tradeAgreement) || 0) / 10,
      grantsources_rank: (parseFloat(grantSourcingApps) || 0) / 10
    };

    console.log('Weights:', weights);

    // Fetch all countries from 'countryranks'
    const { data: countries, error } = await supabase
      .from('countryranks')
      .select('*');

    if (error) {
      console.log('Error fetching countries:', error.message);
      throw error;
    }

    // Calculate score for each country
    const rankedCountries = countries.map(country => ({
      ...country,
      score: calculateScore(country, weights)
    }));

    // Sort countries based on their scores
    rankedCountries.sort((a, b) => b.score - a.score);

    // Extract only the TOP 5 country names and scores from the response data
    const topCountries = rankedCountries.slice(0, 5).map(country => ({
      country: country.country,
      score: country.score
    }));

    console.log('Top countries:', topCountries); // Print topCountries to the console

    res.status(200).json({ topCountries });

  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Failed to fetch top countries' });
  }
});


module.exports = router;
