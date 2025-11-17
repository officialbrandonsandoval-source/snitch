import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export type CredScoreBadgeProps = {
  score: number;
  level?: 'low' | 'medium' | 'high';
};

const getColor = (level: CredScoreBadgeProps['level']) => {
  switch (level) {
    case 'high':
      return '#2ecc71';
    case 'medium':
      return '#f1c40f';
    default:
      return '#e74c3c';
  }
};

export default function CredScoreBadge({ score, level = 'medium' }: CredScoreBadgeProps) {
  return (
    <View style={[styles.container, { borderColor: getColor(level) }]}>
      <Text style={styles.label}>CredScore</Text>
      <Text style={[styles.score, { color: getColor(level) }]}>{score}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 12,
    alignItems: 'center'
  },
  label: {
    fontSize: 12,
    letterSpacing: 1,
    color: '#7f8c8d'
  },
  score: {
    fontSize: 28,
    fontWeight: '700'
  }
});
