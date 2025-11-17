import React, { useCallback, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Alert } from 'react-native';
import TriggerButton from '@components/TriggerButton';
import CredScoreBadge from '@components/CredScoreBadge';
import useSnitchAuth from '@hooks/useSnitchAuth';
import { startVoiceTrigger, stopVoiceTrigger } from '@services/voiceTrigger';
import { encryptPayload } from '@services/cryptoE2EE';
import { uploadToCops } from '@services/uploadToCops';
import { fuseCoordinates } from '@utils/geoFuse';

export default function HomeScreen() {
  const { user } = useSnitchAuth();
  const [isListening, setIsListening] = useState(false);

  const handleTrigger = useCallback(async () => {
    const now = new Date().toISOString();
    const fakeAudio = new Float32Array(1024).fill(Math.random());
    const obfuscatedLocation = fuseCoordinates({ latitude: 37.7858, longitude: -122.4064 });
    const encrypted = await encryptPayload(fakeAudio.buffer, 'demo-secret');
    await uploadToCops({ audioSamples: new Float32Array(encrypted), location: obfuscatedLocation, timestamp: now });
    Alert.alert('Snitch dispatched', 'Authorities received the buffer.');
  }, []);

  const toggleListening = useCallback(() => {
    if (isListening) {
      stopVoiceTrigger();
      setIsListening(false);
      return;
    }

    startVoiceTrigger({ onTrigger: handleTrigger });
    setIsListening(true);
  }, [handleTrigger, isListening]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Hi {user?.codename ?? 'Agent'}, ready to snitch?</Text>
        <CredScoreBadge score={823} level="high" />
      </View>
      <View style={styles.body}>
        <TriggerButton onTrigger={handleTrigger} label="Tap to Snitch" />
        <TriggerButton
          onTrigger={toggleListening}
          label={isListening ? 'Listening…' : 'Enable Voice Trigger'}
          disabled={false}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
    padding: 24,
    gap: 24
  },
  header: {
    gap: 16
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#f8fafc'
  },
  body: {
    gap: 16
  }
});
