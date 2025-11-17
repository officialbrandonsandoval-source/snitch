import React from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';

const MOCK_HISTORY = [
  { id: '1', label: 'Noise complaint', timestamp: '2024-04-01T12:00:00Z' },
  { id: '2', label: 'Suspicious package', timestamp: '2024-04-02T09:41:00Z' },
  { id: '3', label: 'Jaywalking ring', timestamp: '2024-04-04T22:13:00Z' }
];

export default function HistoryScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={MOCK_HISTORY}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.label}>{item.label}</Text>
            <Text style={styles.timestamp}>{new Date(item.timestamp).toLocaleString()}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#020617',
    padding: 16
  },
  card: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#1e293b'
  },
  label: {
    color: '#e2e8f0',
    fontSize: 18,
    fontWeight: '600'
  },
  timestamp: {
    color: '#94a3b8',
    marginTop: 4
  },
  separator: {
    height: 12
  }
});
