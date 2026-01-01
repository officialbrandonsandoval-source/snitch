// Snitch Submission Review Screen
// Framework: React / Next.js
// Styling: Tailwind CSS
// Animation: framer-motion
// Dark mode default, clean, modern, serious


import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";

const ICONS = {
  PlayIcon: '▶️',
  PhotoIcon: '🖼️',
  MapPinIcon: '📍',
};

function Header() {
  return (
    <View style={{ width: '100%', paddingHorizontal: 24, paddingVertical: 16, borderBottomWidth: 1, borderColor: '#27272a', backgroundColor: '#101014', flexDirection: 'row', alignItems: 'center' }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#60a5fa' }}>Review Submission</Text>
    </View>
  );
}

function EvidencePreviewList({ items }: { items: { type: string; thumb: string; }[] }) {
  return (
    <View style={{ marginBottom: 24 }}>
      <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#60a5fa', marginBottom: 8 }}>Evidence</Text>
      <View style={{ flexDirection: 'row', gap: 16, paddingBottom: 8 }}>
        {items.map((item, idx) => (
          <View key={idx} style={{ width: 96, height: 96, borderRadius: 16, backgroundColor: '#18181b', borderWidth: 1, borderColor: '#27272a', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
            <Text style={{ fontSize: 32, color: '#60a5fa' }}>{item.type === 'video' ? ICONS.PlayIcon : ICONS.PhotoIcon}</Text>
            {/* <Image source={{ uri: item.thumb }} style={{ position: 'absolute', top: 0, left: 0, width: 96, height: 96, borderRadius: 16, opacity: 0.4 }} /> */}
          </View>
        ))}
      </View>
    </View>
  );
}

function IncidentDetailsSummary({ details }: { details: { title: string; desc: string; type: string; } }) {
  return (
    <View style={{ marginBottom: 24, backgroundColor: '#18181b', borderRadius: 16, borderWidth: 1, borderColor: '#27272a', padding: 16 }}>
      <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#60a5fa', marginBottom: 8 }}>Incident Details</Text>
      <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16, marginBottom: 4 }}>{details.title}</Text>
      <Text style={{ fontSize: 12, color: '#a1a1aa', marginBottom: 4 }}>Type: {details.type}</Text>
      <Text style={{ fontSize: 14, color: '#d1d5db' }}>{details.desc}</Text>
    </View>
  );
}

function LocationSummary({ location }: { location: { gps: string; address: string; } }) {
  return (
    <View style={{ marginBottom: 24, backgroundColor: '#18181b', borderRadius: 16, borderWidth: 1, borderColor: '#27272a', padding: 16, flexDirection: 'row', alignItems: 'center', gap: 12 }}>
      <Text style={{ fontSize: 24, color: '#60a5fa' }}>{ICONS.MapPinIcon}</Text>
      <View>
        <Text style={{ fontSize: 12, color: '#a1a1aa' }}>GPS: {location.gps}</Text>
        <Text style={{ fontSize: 14, color: '#fff' }}>{location.address}</Text>
      </View>
    </View>
  );
}

function LegalDisclaimer() {
  return (
    <View style={{ marginBottom: 24, backgroundColor: '#18181b', borderRadius: 16, borderWidth: 1, borderColor: '#27272a', padding: 16 }}>
      <Text style={{ fontSize: 12, color: '#a1a1aa' }}>
        By submitting, you confirm all evidence is accurate and you consent to share this information with law enforcement. False reporting is a criminal offense.
      </Text>
    </View>
  );
}

function SubmitButton() {
  return (
    <View style={{ width: '100%', alignItems: 'center', marginBottom: 16 }}>
      <TouchableOpacity style={{ width: '100%', maxWidth: 400, paddingVertical: 16, borderRadius: 16, backgroundColor: '#3b82f6', alignItems: 'center' }}>
        <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 18 }}>Submit to Authorities</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function SubmissionReviewPage() {
  const evidence = [
    { type: "video", thumb: "https://placehold.co/96x96?text=VID" },
    { type: "image", thumb: "https://placehold.co/96x96?text=IMG" },
  ];
  const details = {
    title: "Assault at 5th & Main",
    desc: "Physical altercation witnessed outside the store. Video and photo evidence attached.",
    type: "Assault"
  };
  const location = {
    gps: "40.7128° N, 74.0060° W",
    address: "5th Ave & Main St, New York, NY"
  };

  return (
    <View style={{ minHeight: '100%', backgroundColor: '#0f0f0f', flex: 1, paddingBottom: 32 }}>
      {/* Header */}
      <Header />

      {/* Main Content */}
      <View style={{ flex: 1, alignItems: 'center', paddingHorizontal: 16, paddingVertical: 32 }}>
        <View style={{ width: '100%', maxWidth: 400, alignSelf: 'center' }}>
          {/* Evidence Preview List */}
          <EvidencePreviewList items={evidence} />

          {/* Incident Details Summary */}
          <IncidentDetailsSummary details={details} />

          {/* Location Data Summary */}
          <LocationSummary location={location} />

          {/* Legal Disclaimer Block */}
          <LegalDisclaimer />

          {/* Submit Button */}
          <SubmitButton />
        </View>
      </View>
    </View>
  );
}
