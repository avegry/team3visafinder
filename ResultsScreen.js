import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const ResultsScreen = ({ route }) => {
  // Extract topCountries from the route parameters
  const { topCountries } = route.params;

  // Render item function for FlatList
  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item.country}</Text>
      <Text style={styles.score}>Score: {item.score}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {topCountries.length === 0 ? (
        <Text style={styles.message}>No countries with criteria found. Please change and try again.</Text>
      ) : (
        <FlatList
          data={topCountries}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
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
    padding: 20,
  },
  message: {
    fontSize: 18,
    textAlign: 'center',
  },
  item: {
    marginBottom: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  score: {
    fontSize: 16,
  },
});

export default ResultsScreen;