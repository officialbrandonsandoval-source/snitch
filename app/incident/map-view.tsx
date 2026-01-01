// Snitch Map View Screen
// Framework: React / Next.js
// Styling: Tailwind CSS
// Animation: framer-motion
// Dark mode default, mobile-first, responsive

import { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
const ICONS = {
  FunnelIcon: '🧲',
  MapPinIcon: '📍',
  ExclamationTriangleIcon: '⚠️',
};

function TopNav() {
  return (
    <View style={{ width: '100%', paddingHorizontal: 24, paddingVertical: 16, borderBottomWidth: 1, borderColor: '#27272a', backgroundColor: '#101014', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
      <Text style={{ fontWeight: 'bold', fontSize: 20, color: '#60a5fa' }}>Nearby Incidents</Text>
      <TouchableOpacity style={{ padding: 8, borderRadius: 8, backgroundColor: '#18181b' }}>
        <Text style={{ fontSize: 24, color: '#a1a1aa' }}>{ICONS.FunnelIcon}</Text>
      </TouchableOpacity>
    </View>
  );
}
// ...existing code...

function MapContainer() {
  return (
    <View style={{ flex: 1, backgroundColor: '#18181b', position: 'relative', width: '100%', height: '100%' }}>
      <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontSize: 96, color: '#1e3a8a', opacity: 0.2 }}>{ICONS.MapPinIcon}</Text>
        <Text style={{ position: 'absolute', bottom: 32, left: '50%', transform: [{ translateX: -0.5 }], color: '#a1a1aa' }}>[ Map Placeholder ]</Text>
      </View>
    </View>
  );
}
// ...existing code...

interface FilterPanelProps {
  severity: string;
  setSeverity: (s: string) => void;
  radius: number;
  setRadius: (r: number) => void;
}
function FilterPanel({ severity, setSeverity, radius, setRadius }: FilterPanelProps) {
  return (
    <View style={{ position: 'absolute', top: 24, left: '5%', right: '5%', backgroundColor: '#101014', borderWidth: 1, borderColor: '#27272a', borderRadius: 16, shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 8, padding: 24, flexDirection: 'column', gap: 16, zIndex: 20 }}>
      <View>
        <Text style={{ fontSize: 12, color: '#a1a1aa', marginBottom: 4 }}>Severity</Text>
        <Text style={{ backgroundColor: '#18181b', borderWidth: 1, borderColor: '#27272a', borderRadius: 8, padding: 8, color: '#fff' }}>{severity}</Text>
      </View>
      <View>
        <Text style={{ fontSize: 12, color: '#a1a1aa', marginBottom: 4 }}>Radius (mi)</Text>
        <Text style={{ backgroundColor: '#18181b', borderWidth: 1, borderColor: '#27272a', borderRadius: 8, padding: 8, color: '#fff' }}>{radius}</Text>
      </View>
    </View>
  );
}
}

interface Incident {
  id: string;
  type: string;
  time: string;
  location: string;
  title: string;
  desc: string;
  severity: string;
}
interface IncidentPreviewCardProps {
  incident: Incident;
}
function IncidentPreviewCard({ incident }: IncidentPreviewCardProps) {
  if (!incident) return null;
  return (
    <View style={{ position: 'absolute', bottom: 24, left: '5%', right: '5%', backgroundColor: '#101014', borderWidth: 1, borderColor: '#27272a', borderRadius: 16, shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 8, padding: 24, zIndex: 30 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 8 }}>
        <Text style={{ fontSize: 24, color: '#f59e42' }}>{ICONS.ExclamationTriangleIcon}</Text>
        <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#fff' }}>{incident.title}</Text>
        <Text style={{ fontSize: 12, color: '#a1a1aa' }}>{incident.time}</Text>
      </View>
      <Text style={{ fontSize: 14, color: '#d1d5db', marginBottom: 4 }}>{incident.desc}</Text>
      <Text style={{ fontSize: 12, color: '#60a5fa' }}>Severity: {incident.severity}</Text>
    </View>
  );
}
}

// Main page component
  const [severity, setSeverity] = useState("all");
  const [radius, setRadius] = useState(10);
  const [selectedIncident, setSelectedIncident] = useState<Incident>({
    id: "inc-001",
    type: "Assault",
    time: "09:22 AM",
    location: "5th & Main",
    title: "Assault Reported",
    desc: "Physical altercation at 5th & Main.",
    severity: "High"
  });

  return (
    <div className="min-h-screen bg-[#0f0f0f] dark:bg-[#0f0f0f] text-white flex flex-col relative">
      {/* Top Navigation */}
      <TopNav />

      {/* Map Container */}
      <div className="flex-1 relative">
        <MapContainer />
        {/* Floating Filter Panel */}
        <FilterPanel severity={severity} setSeverity={setSeverity} radius={radius} setRadius={setRadius} />
        {/* Floating Incident Preview Card */}
        <IncidentPreviewCard incident={selectedIncident} />
      </div>
    </div>
  );
}
