// Snitch Law Enforcement Review Portal Screen
// Framework: React / Next.js
// Styling: Tailwind CSS
// Animation: framer-motion
// Dark mode default, professional, minimal

import { useState } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
const ICONS = {
  ShieldCheckIcon: '🛡️',
  MagnifyingGlassIcon: '🔍',
};

const EVIDENCE = [
  {
    id: "REP-20251117-001",
    thumb: "https://placehold.co/48x48?text=VID",
    date: "2025-11-17",
    severity: "High",
    status: "Open"
  },
  {
    id: "REP-20251117-002",
    thumb: "https://placehold.co/48x48?text=IMG",
    date: "2025-11-17",
    severity: "Medium",
    status: "Review"
  },
  {
    id: "REP-20251116-003",
    thumb: "https://placehold.co/48x48?text=VID",
    date: "2025-11-16",
    severity: "Low",
    status: "Closed"
  },
];

function Header({ officer }: { officer: string }) {
  return (
    <View style={{ width: '100%', paddingHorizontal: 24, paddingVertical: 16, borderBottomWidth: 1, borderColor: '#27272a', backgroundColor: '#101014', flexDirection: 'row', alignItems: 'center', gap: 16 }}>
      <Text style={{ fontSize: 32, color: '#60a5fa' }}>{ICONS.ShieldCheckIcon}</Text>
      <View>
        <Text style={{ fontWeight: 'bold', fontSize: 20, color: '#fff' }}>Law Enforcement Portal</Text>
        <Text style={{ fontSize: 12, color: '#a1a1aa' }}>Officer: {officer} — NYPD</Text>
      </View>
    </View>
  );
}
// ...existing code...

function SearchBar({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <View style={{ width: '100%', maxWidth: 400, marginTop: 24, marginBottom: 16, flexDirection: 'row', alignItems: 'center', gap: 8 }}>
      <Text style={{ fontSize: 20, color: '#a1a1aa' }}>{ICONS.MagnifyingGlassIcon}</Text>
      <Text style={{ flex: 1, backgroundColor: '#18181b', borderWidth: 1, borderColor: '#27272a', borderRadius: 8, padding: 12, color: '#fff' }} onPress={() => {}}>{value || 'Search by Report ID or Date...'}</Text>
    </View>
  );
}
}

function EvidenceTable({ data, onSelect }: { data: typeof EVIDENCE; onSelect: (id: string) => void }) {
  return (
    <ScrollView style={{ width: '100%', maxWidth: 400, alignSelf: 'center' }}>
      {data.map((item, idx) => (
        <TouchableOpacity key={item.id} style={{ flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderColor: '#27272a', paddingVertical: 12 }} onPress={() => onSelect(item.id)}>
          <Image source={{ uri: item.thumb }} style={{ width: 48, height: 48, borderRadius: 8, marginRight: 12 }} />
          <View style={{ flex: 1 }}>
            <Text style={{ color: '#60a5fa', fontFamily: 'monospace', fontSize: 16 }}>{item.id}</Text>
            <Text style={{ color: '#fff', fontSize: 14 }}>{item.date}</Text>
            <Text style={{ color: item.severity === 'High' ? '#ef4444' : item.severity === 'Medium' ? '#f59e42' : '#a1a1aa', fontSize: 12 }}>{item.severity}</Text>
            <Text style={{ color: item.status === 'Open' ? '#3b82f6' : item.status === 'Review' ? '#f59e42' : '#a1a1aa', fontSize: 12 }}>{item.status}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}
}

function DetailsDrawer({ reportId }: { reportId: string | null }) {
  if (!reportId) return null;
  return (
    <View style={{ position: 'absolute', top: 0, right: 0, height: '100%', width: '100%', maxWidth: 400, backgroundColor: '#18181b', borderLeftWidth: 1, borderColor: '#27272a', shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 8, zIndex: 40, padding: 32 }}>
      <Text style={{ fontWeight: 'bold', fontSize: 20, color: '#60a5fa', marginBottom: 16 }}>Report Details</Text>
      <Text style={{ color: '#d1d5db', fontSize: 16 }}>Report ID: {reportId || '—'}</Text>
      <Text style={{ marginTop: 16, color: '#a1a1aa' }}>[ Details drawer placeholder ]</Text>
    </View>
  );
}
}

// Main page component
export default function LawEnforcementPortalPage() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<string | null>(null);
  const officer = "J. Smith";

  // Filter evidence by search
  const filtered = EVIDENCE.filter(
    e =>
      e.id.toLowerCase().includes(search.toLowerCase()) ||
      e.date.includes(search)
  );

  return (
    <div className="min-h-screen bg-[#0f0f0f] dark:bg-[#0f0f0f] text-white flex flex-col">
      {/* Header */}
      <Header officer={officer} />

      {/* Main Content */}
      <main className="flex-1 flex flex-row">
        {/* Left: Table & Search */}
        <div className="flex-1 flex flex-col px-4 py-8">
          <SearchBar value={search} onChange={setSearch} />
          <EvidenceTable data={filtered} onSelect={setSelected} />
        </div>
        {/* Right: Details Drawer */}
        <DetailsDrawer reportId={selected} />
      </main>
    </div>
  );
}
