import React from "react";
import { View, Text } from "react-native";

const ICONS = {
  CameraIcon: '📷',
  ArrowUpTrayIcon: '⬆️',
  PaperAirplaneIcon: '🛩️',
  MagnifyingGlassIcon: '🔍',
  FolderOpenIcon: '📂',
  CheckCircleIcon: '✅',
  CurrencyDollarIcon: '💵',
  PlusIcon: '＋',
};

const TIMELINE: Array<{
  label: string;
  icon: keyof typeof ICONS;
  time: string;
  desc: string;
}> = [
  {
    label: "Evidence Recorded",
    icon: 'CameraIcon',
    time: "2025-11-17 09:12",
    desc: "Video evidence captured at scene."
  },
  {
    label: "Evidence Uploaded",
    icon: 'ArrowUpTrayIcon',
    time: "2025-11-17 09:14",
    desc: "Video uploaded to secure server."
  },
  {
    label: "Submission Sent",
    icon: 'PaperAirplaneIcon',
    time: "2025-11-17 09:15",
    desc: "Incident report submitted to authorities."
  },
  {
    label: "Review Started",
    icon: 'MagnifyingGlassIcon',
    time: "2025-11-17 09:20",
    desc: "Case review initiated by investigator."
  },
  {
    label: "Case Opened",
    icon: 'FolderOpenIcon',
    time: "2025-11-17 09:22",
    desc: "Case officially opened."
  },
  {
    label: "Reward Qualified",
    icon: 'CheckCircleIcon',
    time: "2025-11-17 09:30",
    desc: "Incident qualified for reward."
  },
  {
    label: "Reward Paid",
    icon: 'CurrencyDollarIcon',
    time: "2025-11-17 10:00",
    desc: "Reward payment issued."
  },
];

function TimelineItem({ label, icon, time, desc }: { label: string; icon: keyof typeof ICONS; time: string; desc: string }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 16, paddingVertical: 24, borderBottomWidth: 1, borderColor: '#27272a' }}>
      <Text
        style={{ fontSize: 32, color: '#60a5fa', marginTop: 4 }}
        accessibilityLabel={`${label} icon`}
      >{ICONS[icon]}</Text>
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#fff' }}>{label}</Text>
          <Text style={{ fontSize: 12, color: '#a1a1aa' }}>{time}</Text>
        </View>
        <Text style={{ fontSize: 14, color: '#d1d5db', marginTop: 4 }}>{desc}</Text>
      </View>
    </View>
  );
}

function AddEvidenceButton() {
  return (
    <View style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', backgroundColor: '#101014', borderTopWidth: 1, borderColor: '#27272a', padding: 24, alignItems: 'center' }}>
      <View
        style={{ width: '100%', maxWidth: 400, paddingVertical: 16, borderRadius: 16, backgroundColor: '#3b82f6', alignItems: 'center', flexDirection: 'row', justifyContent: 'center', gap: 8 }}
        accessible
        accessibilityRole="button"
        accessibilityLabel="Add more evidence"
      >
        <Text style={{ fontSize: 20, color: '#fff' }}>{ICONS.PlusIcon}</Text>
        <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 18 }}>Add More Evidence</Text>
      </View>
    </View>
  );
}

function TopNav({ incidentId }: { incidentId: string }) {
  return (
    <View style={{ width: '100%', paddingHorizontal: 24, paddingVertical: 16, borderBottomWidth: 1, borderColor: '#27272a', backgroundColor: '#101014', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#60a5fa' }}>Incident Timeline</Text>
      <Text style={{ fontSize: 12, color: '#a1a1aa' }}>ID: {incidentId}</Text>
    </View>
  );
}

// Snitch Incident Timeline Screen
// Framework: React / Next.js
// Styling: Tailwind CSS
// Animation: framer-motion
// Dark mode default, highly readable

export default function IncidentTimelinePage() {
  const incidentId = "INC-20251117-001";
  const isEmpty = TIMELINE.length === 0;

  return (
    <View style={{ minHeight: '100%', backgroundColor: '#0f0f0f', flex: 1, paddingBottom: 96 }}>
      {/* Top Navigation */}
      <TopNav incidentId={incidentId} />

      {/* Timeline Feed */}
      <View style={{ flex: 1, alignItems: 'center', paddingHorizontal: 16, paddingVertical: 32 }}>
        <View style={{ width: '100%', maxWidth: 400, alignSelf: 'center' }}>
          {isEmpty ? (
            <Text style={{ color: '#a1a1aa', fontSize: 16, textAlign: 'center', marginTop: 32 }}>No timeline events yet.</Text>
          ) : (
            TIMELINE.map((item, idx) => (
              <TimelineItem key={idx} {...item} />
            ))
          )}
        </View>
      </View>

      {/* Sticky Add Evidence Button */}
      <AddEvidenceButton />
    </View>
  );
}
