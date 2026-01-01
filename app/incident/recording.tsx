// Snitch Incident Recording Screen
// Framework: React / Next.js
// Styling: Tailwind CSS
// Animation: framer-motion
// Dark mode default, police-tech aesthetic

import { useState } from "react";
import { View, Text } from "react-native";
// If using Expo/React Native, replace heroicons/framer-motion with react-native-vector-icons and react-native-reanimated for production.
// import { Icon } from 'react-native-vector-icons';
// import Animated from 'react-native-reanimated';

// Top navigation bar
function TopNav() {
  return (
    <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1, borderColor: '#27272a', backgroundColor: '#101014' }}>
      <Text style={{ fontSize: 24, color: '#fff' }}>←</Text>
      <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#60a5fa' }}>Record Incident</Text>
      <Text style={{ fontSize: 24, color: '#fff' }}>⚙️</Text>
    </View>
  );
}

// Camera preview placeholder
function CameraPreview() {
  return (
    <View style={{ width: '100%', aspectRatio: 16/9, borderRadius: 16, backgroundColor: '#18181b', borderWidth: 1, borderColor: '#27272a', marginBottom: 24, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 48, color: '#71717a' }}>📷</Text>
      <Text style={{ marginLeft: 16, color: '#a1a1aa' }}>[ Camera Preview ]</Text>
    </View>
  );
}

// Recording controls
interface RecordingControlsProps {
  isRecording: boolean;
  onRecord: () => void;
  onSwitchCamera: () => void;
  onFlashlight: () => void;
}
function RecordingControls({ isRecording, onRecord, onSwitchCamera, onFlashlight }: RecordingControlsProps) {
  return (
    <div className="flex items-center justify-center gap-8 mb-6">
      <Text style={{ width: 64, height: 64, borderRadius: 32, backgroundColor: isRecording ? '#dc2626' : '#3b82f6', textAlign: 'center', textAlignVertical: 'center', color: '#fff', fontSize: 32 }} onPress={onRecord}>●</Text>
      <Text style={{ width: 48, height: 48, borderRadius: 24, backgroundColor: '#18181b', textAlign: 'center', textAlignVertical: 'center', color: '#fff', fontSize: 24 }} onPress={onSwitchCamera}>📷</Text>
      <Text style={{ width: 48, height: 48, borderRadius: 24, backgroundColor: '#18181b', textAlign: 'center', textAlignVertical: 'center', color: '#fff', fontSize: 24 }} onPress={onFlashlight}>⚡</Text>
    </div>
  );
}

// Status indicators
function StatusIndicators() {
  return (
    <div className="flex items-center justify-between px-2 py-2 mb-6 text-xs text-neutral-400">
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />
        <span>GPS Locked</span>
      </div>
      <span>{new Date().toLocaleTimeString()}</span>
      <span>Storage: 2.1 GB</span>
    </div>
  );
}

// Bottom safety disclaimer
function SafetyDisclaimer() {
  return (
    <footer className="w-full px-4 py-3 border-t border-neutral-800 bg-[#101014] dark:bg-[#101014] text-xs text-neutral-500 text-center">
      All recordings are encrypted and securely stored. Do not record in unsafe conditions.
    </footer>
  );
}

// Main page component
export default function IncidentRecordingPage() {
  const [isRecording, setIsRecording] = useState(false);

  return (
    <View style={{ minHeight: '100%', backgroundColor: '#0f0f0f', flex: 1 }}>
      {/* Top Navigation */}
      <TopNav />

      {/* Main Content */}
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 16, paddingVertical: 32 }}>
        <View style={{ width: '100%', maxWidth: 400 }}>
          {/* Camera Preview */}
          <CameraPreview />

          {/* Recording Controls */}
          <RecordingControls
            isRecording={isRecording}
            onRecord={() => setIsRecording((r) => !r)}
            onSwitchCamera={() => {}}
            onFlashlight={() => {}}
          />

          {/* Status Indicators */}
          <StatusIndicators />
        </View>
      </View>

      {/* Safety Disclaimer Bar */}
      <SafetyDisclaimer />
    </View>
  );
}
