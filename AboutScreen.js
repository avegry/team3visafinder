import React from 'react';
import { View, Text, StyleSheet, Linking } from 'react-native';

const About = () => {
  const handlePhoneCall = () => {
    Linking.openURL('tel:+18557718472');
  };

  const handleEmail = () => {
    Linking.openURL('mailto:info@multinationals.co');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>About Us: MultiNationals, Inc.</Text>
      <Text style={styles.description}>
        The goal of this app is to create a user-friendly mobile application that assists individuals, particularly self-employed individuals, digital nomads, and retirees seeking a second career, in finding the most suitable business visa options worldwide. This app will provide users with comprehensive information on various visa criteria, such as cost of application, government incentives, funding opportunities, etc.
      </Text>

      <Text style={styles.team}>Team:</Text>
      <Text style={styles.member}>Principal Lawyer: Angela Scarlett</Text>
      <Text style={styles.member}>Angela Scarlett is the Principal Lawyer at MultiNationals. She graduated from the prestigious Queen's University Faculty of Law.</Text>
      <Text style={styles.member}>Ms. Scarlett has worked at the Superior Court of Justice and on behalf of top-tier Law firms and multimillion-dollar corporations. Her specialties include Immigration Law, Policy Drafting, Litigation and Business Development.</Text>
      <Text style={styles.member}>Angela Scarlett has been interviewed by the leading national news program in Canada about Start-up and Entrepreneur Immigration opportunities and future developments in Canadian immigration policy.</Text>

      <Text style={styles.projectTitle}>Contact Us</Text>
      <Text style={styles.contact} onPress={handlePhoneCall}>+1 (855) 771-8472</Text>
      <Text style={styles.contact}>Canada · USA · Portugal</Text>
      <Text style={styles.contact}>Mon - Fri: 9:00 am - 5:00 pm</Text>
      <Text style={styles.contact}>Sat - Sun: Closed</Text>
      <Text style={styles.contact} onPress={handleEmail}>info@multinationals.co</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    marginTop: 10,
    color: '#1b2c56',
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
  projectTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    marginTop: 10,
    color: '#1b2c56',
  },
  contact: {
    fontSize: 16,
    marginBottom: 5,
    textAlign: 'center',
  },
  team: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
    textAlign: 'center',
    color: '#1b2c56',
  },
  member: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
});

export default About;
