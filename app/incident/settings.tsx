import React, { useState, useEffect } from "react";
import axios from "axios";
import { View, Text, TouchableOpacity } from "react-native";
import { useCameraPermissions } from "expo-camera";
import { useForegroundPermissions as useLocationPermissions } from "expo-location";
import { Platform } from "react-native";
import * as Audio from "expo-av";
const ICONS = {
  UserCircleIcon: '👤',
  CameraIcon: '📷',
  MicrophoneIcon: '🎤',
  MapPinIcon: '📍',
  BellIcon: '🔔',
};

function Header() {
  return (
    <View style={{ width: '100%', paddingHorizontal: 24, paddingVertical: 16, borderBottomWidth: 1, borderColor: '#27272a', backgroundColor: '#101014', flexDirection: 'row', alignItems: 'center' }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#60a5fa' }}>Settings</Text>
    </View>
  );
}

interface ProfileCardProps {
  name: string;
  status: string;
}
function ProfileCard({ name, status }: ProfileCardProps) {
  return (
    <View style={{ marginBottom: 32, flexDirection: 'row', alignItems: 'center', gap: 16, backgroundColor: '#18181b', borderRadius: 16, borderWidth: 1, borderColor: '#27272a', padding: 24 }}>
      <Text style={{ fontSize: 48, color: '#60a5fa' }}>{ICONS.UserCircleIcon}</Text>
      <View>
        <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#fff' }}>{name}</Text>
        <Text style={{ fontSize: 12, color: '#a1a1aa' }}>{status}</Text>
      </View>
    </View>
  );
}

interface PermissionToggleProps {
  label: string;
  icon: keyof typeof ICONS;
  enabled: boolean;
  onToggle: () => void;
}
function PermissionToggle({ label, icon, enabled, onToggle }: PermissionToggleProps) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
        <Text style={{ fontSize: 24, color: '#60a5fa' }}>{ICONS[icon]}</Text>
        <Text style={{ fontSize: 14, color: '#fff' }}>{label}</Text>
      </View>
      <TouchableOpacity
        style={{ width: 48, height: 24, borderRadius: 12, borderWidth: 1, borderColor: enabled ? '#3b82f6' : '#27272a', backgroundColor: enabled ? '#3b82f6' : '#18181b', justifyContent: 'center' }}
        onPress={onToggle}
        accessibilityLabel={`Toggle ${label}`}
      >
        <View style={{ width: 20, height: 20, borderRadius: 10, backgroundColor: '#fff', marginLeft: enabled ? 24 : 4, shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 2 }} />
      </TouchableOpacity>
    </View>
  );
}

interface NotificationPreferencesProps {
  enabled: boolean;
  onToggle: () => void;
}
function NotificationPreferences({ enabled, onToggle }: NotificationPreferencesProps) {
  return (
    <View style={{ marginBottom: 32, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
        <Text style={{ fontSize: 24, color: '#60a5fa' }}>{ICONS.BellIcon}</Text>
        <Text style={{ fontSize: 14, color: '#fff' }}>Notifications</Text>
      </View>
      <TouchableOpacity
        style={{ width: 48, height: 24, borderRadius: 12, borderWidth: 1, borderColor: enabled ? '#3b82f6' : '#27272a', backgroundColor: enabled ? '#3b82f6' : '#18181b', justifyContent: 'center' }}
        onPress={onToggle}
        accessibilityLabel="Toggle Notifications"
      >
        <View style={{ width: 20, height: 20, borderRadius: 10, backgroundColor: '#fff', marginLeft: enabled ? 24 : 4, shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 2 }} />
      </TouchableOpacity>
    </View>
  );
}

function PolicyLinks() {
  return (
    <View style={{ marginTop: 32 }}>
      <Text style={{ color: '#60a5fa', fontSize: 12, marginBottom: 4 }}>Privacy Policy</Text>
      <Text style={{ color: '#60a5fa', fontSize: 12 }}>Terms of Service</Text>
    </View>
  );
}

export default function SettingsPage() {
  const [camera, setCamera] = useState(true);
  const [mic, setMic] = useState(true);
  const [location, setLocation] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({ name: '', status: '' });

  // Fetch settings from backend
  useEffect(() => {
    setLoading(true);
    axios.get("/api/v1/users/me")
      .then(res => {
        const s = res.data.settings;
        setCamera(s.camera_enabled);
        setMic(s.mic_enabled);
        setLocation(s.location_enabled);
        setNotifications(s.notifications_enabled);
        setProfile({
          name: res.data.name || 'Unknown User',
          status: res.data.status || 'Unverified',
        });
      })
      .finally(() => setLoading(false));
  }, []);

  // Update settings in backend
  const updateSettings = async (newSettings: any) => {
    setLoading(true);
    await axios.put("/api/v1/users/me/settings", {
      camera_enabled: newSettings.camera,
      mic_enabled: newSettings.mic,
      location_enabled: newSettings.location,
      notifications_enabled: newSettings.notifications
    });
    setLoading(false);
  };

  // Device permission logic (Expo hooks)
  const [cameraPerm, requestCameraPerm] = useCameraPermissions();
  const [locationPerm, requestLocationPerm] = useLocationPermissions();

  const requestCameraPermission = async () => {
    const perm = await requestCameraPerm();
    setCamera(perm?.status === "granted");
    updateSettings({ camera: perm?.status === "granted", mic, location, notifications });
  };
  // Microphone permission: Expo AV
  const requestMicPermission = async () => {
    let granted = false;
    if (Platform.OS === "web" && navigator?.mediaDevices?.getUserMedia) {
      try {
        await navigator.mediaDevices.getUserMedia({ audio: true });
        granted = true;
      } catch (e) {
        granted = false;
      }
    } else {
      const { status } = await Audio.requestPermissionsAsync();
      granted = status === "granted";
    }
    setMic(granted);
    updateSettings({ camera, mic: granted, location, notifications });
  };
  const requestLocationPermission = async () => {
    const perm = await requestLocationPerm();
    setLocation(perm?.status === "granted");
    updateSettings({ camera, mic, location: perm?.status === "granted", notifications });
  };

  return (
    <View style={{ minHeight: '100%', backgroundColor: '#0f0f0f', flex: 1, paddingBottom: 32 }}>
      {/* Header */}
      <Header />

      {/* Main Content */}
      <View style={{ flex: 1, alignItems: 'center', paddingHorizontal: 16, paddingVertical: 32 }}>
        <View style={{ width: '100%', maxWidth: 400, alignSelf: 'center' }}>
          {/* Profile Card */}
          <ProfileCard name={profile.name} status={profile.status} />

          {/* Permissions Toggles */}
          <View style={{ marginBottom: 32 }}>
            <PermissionToggle label="Camera" icon="CameraIcon" enabled={camera} onToggle={requestCameraPermission} />
            <PermissionToggle label="Microphone" icon="MicrophoneIcon" enabled={mic} onToggle={requestMicPermission} />
            <PermissionToggle label="Location" icon="MapPinIcon" enabled={location} onToggle={requestLocationPermission} />
          </View>

          {/* Notification Preferences */}
          <NotificationPreferences enabled={notifications} onToggle={() => {
            setNotifications(n => !n);
            updateSettings({ camera, mic, location, notifications: !notifications });
          }} />

          {/* Policy Links */}
          <PolicyLinks />
        </View>
      </View>
    </View>
  );
}
