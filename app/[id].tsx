import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

const SingleDetail = () => {
  const { id } = useLocalSearchParams();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://dummyjson.com/users/${id}`)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setData(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4F46E5" />
        </View>
      ) : (
        data && (
          <View style={styles.card}>
            <View style={styles.detailsContainer}>
              <Text style={styles.name}>{data.firstName} {data.lastName}</Text>
              <Text style={styles.username}>@{data.username}</Text>
              <Text style={styles.email}>{data.email}</Text>
              <Text style={styles.phone}>Phone: {data.phone}</Text>
              <Text style={styles.website}>City: {data.country}</Text>
            </View>
          </View>
        )
      )}
    </SafeAreaView>
  );
};

export default SingleDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 20,
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    flexDirection: 'row',
    padding: 20,
    marginBottom: 20,
  },
  detailsContainer: {
    flex: 2,
    paddingLeft: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2D3748',
    marginBottom: 10,
  },
  username: {
    fontSize: 18,
    color: '#4A5568',
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    color: '#4A5568',
    marginBottom: 5,
  },
  phone: {
    fontSize: 16,
    color: '#4A5568',
    marginBottom: 5,
  },
  website: {
    fontSize: 16,
    color: '#4A5568',
    marginBottom: 15,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
