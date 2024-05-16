import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import axios from 'axios';
import { ipAddress } from './IpAddress';

const ResultsScreen = ({ route }) => {
  const { topCountries } = route.params;
  const [countryDetails, setCountryDetails] = useState([]);

  useEffect(() => {
    // Fetch data for each country in topCountries
    fetchCountryDetails();
  }, []);

  const fetchCountryDetails = async () => {
    try {
      const promises = topCountries.map(async country => {
        const response = await axios.post(`http://${ipAddress}:3000/visaoptions`, { country: country.country });
        const perksResponse = await axios.post(`http://${ipAddress}:3000/perks`, { country: country.country });
        return {
          ...country,
          details: response.data, // Data is from 'visaoptions' in Supabase
          perks: perksResponse.data // Data is from 'governmentperks' in Supabase
        };
      });

      const countryDetails = await Promise.all(promises);
      setCountryDetails(countryDetails);
      console.log('Fetched country details:', countryDetails);

    } catch (error) {
      console.log('this one')
      console.error('Error fetching country details:', error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item.country}</Text>
      {/* Conditional rendering to check if item.details exists */}
      {item.details && item.details.map((detail, index) => (
        <View key={index} style={styles.detailContainer}>
          <Text style={styles.lineSpacing}>
            <Text style={styles.underline}>Processing Time:</Text> {detail.processingtime}
          </Text>
          <Text style={styles.lineSpacing}>
            <Text style={styles.underline}>Government Fees:</Text> {detail.governmentfees}
          </Text>
          <Text style={styles.lineSpacing}>
            <Text style={styles.underline}>Path to Citizenship:</Text> {detail.pathtocitizenship}
          </Text>
          <Text style={styles.lineSpacing}>
            <Text style={styles.underline}>Steps to Complete Application:</Text> {detail.stepstocompleteapplication}
          </Text>
          <Text style={styles.lineSpacing}>
            <Text style={styles.underline}>Document Checklist:</Text> {detail.documentchecklist}
          </Text>
          <Text style={styles.lineSpacing}>
            <Text style={styles.underline}>Grant Sourcing Name:</Text> {detail.sourcename}
          </Text>
          <Text style={styles.lineSpacing}>
            <Text style={styles.underline}>Grant Sourcing URL:</Text>
            {' '} {/* Add a space before the URL */}
            <Text style={styles.link} onPress={() => handleOpenURL(detail.sourceurl)}>
              {detail.sourceurl}
            </Text>
          </Text>
          <Text style={styles.lineSpacing}>
            <Text style={styles.underline}>Trade Agreements:</Text> {detail.tradeagreements}
          </Text>
          {/* Check if item.perks is not an empty array */}
          {item.perks && item.perks.perks && item.perks.perks.length > 0 && (
            <Text style={styles.lineSpacing}>
              <Text style={styles.underline}>Government Perks:</Text>{' '}
              {item.perks.perks.map((perk, perkIndex) => (
                <Text key={perkIndex}>{perk.perkdescription} </Text>
              ))}
            </Text>
          )}
        </View>
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      {topCountries.length === 0 ? (
        <Text style={styles.message}>No countries with your criteria found. Please change and try again.</Text>
      ) : (
        <FlatList
          style={styles.list}
          data={countryDetails}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{ paddingRight: 10 }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingRight: 20,
    paddingLeft: 20,
  },
  list: {
    width: '100%',
  },
  message: {
    fontSize: 18,
    textAlign: 'center',
  },
  item: {
    marginBottom: 25,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
    color: '#1b2c56',
    marginTop: 20,
  },
  underline: {
    textDecorationLine: 'underline',
    color: '#1b2c56',
    fontWeight: 'bold',
  },
  lineSpacing: {
    marginBottom: 10, // Add spacing between each line
  },
  detailContainer: {
    marginBottom: -10, // Add spacing between each detail group
  },
  link: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
});

export default ResultsScreen;
