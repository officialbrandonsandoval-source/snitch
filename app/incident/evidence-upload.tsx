import React, { useState } from "react";
import { View, Text } from "react-native";

const TAGS = ["Speeding", "Assault", "Theft", "Vandalism", "Other"];

function Header() {
  return (
    <View style={{ width: '100%', paddingHorizontal: 24, paddingVertical: 16, borderBottomWidth: 1, borderColor: '#27272a', backgroundColor: '#101014', flexDirection: 'row', alignItems: 'center' }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#60a5fa' }}>Add Evidence</Text>
    </View>
  );
}

interface EvidenceItem {
  id: string;
  type: string;
  thumb: string;
}
interface EvidenceListProps {
  items: EvidenceItem[];
  onDelete: (id: string) => void;
}
function EvidenceList({ items, onDelete }: EvidenceListProps) {
  return (
    <View style={{ marginBottom: 24 }}>
      <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#60a5fa', marginBottom: 8 }}>Evidence Items</Text>
      <View style={{ flexDirection: 'row', gap: 16, paddingBottom: 8 }}>
        {items.map((item, idx) => (
          <View key={item.id} style={{ width: 96, height: 96, borderRadius: 12, backgroundColor: '#18181b', borderWidth: 1, borderColor: '#27272a', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
            {/* Replace img with Text for demo */}
            <Text style={{ fontSize: 32, color: '#60a5fa' }}>{item.type === 'Video' ? '🎥' : '🖼️'}</Text>
            <Text style={{ position: 'absolute', top: 4, right: 4, color: '#fff', fontSize: 12 }} onPress={() => onDelete(item.id)}>🗑️</Text>
          </View>
        ))}
        <View style={{ width: 96, height: 96, borderRadius: 12, borderWidth: 2, borderColor: '#27272a', justifyContent: 'center', alignItems: 'center', borderStyle: 'dashed' }}>
          <Text style={{ color: '#60a5fa', fontSize: 24 }}>＋</Text>
        </View>
      </View>
    </View>
  );
}

function IncidentDetailsForm() {
  return (
    <View style={{ marginBottom: 24 }}>
      <Text style={{ fontSize: 14, color: '#a1a1aa', marginBottom: 4 }}>Type</Text>
      <Text style={{ backgroundColor: '#111', color: '#fff', padding: 12, borderRadius: 8, marginBottom: 8 }}>Speeding</Text>
      <Text style={{ fontSize: 14, color: '#a1a1aa', marginBottom: 4 }}>Location</Text>
      <Text style={{ backgroundColor: '#111', color: '#fff', padding: 12, borderRadius: 8, marginBottom: 8 }}>Enter location</Text>
      <Text style={{ fontSize: 14, color: '#a1a1aa', marginBottom: 4 }}>Description</Text>
      <Text style={{ backgroundColor: '#111', color: '#fff', padding: 12, borderRadius: 8, minHeight: 60 }}>Describe the incident...</Text>
    </View>
  );
}

interface TagsSectionProps {
  selected: string[];
  onToggle: (tag: string) => void;
}
function TagsSection({ selected, onToggle }: TagsSectionProps) {
  return (
    <View style={{ marginBottom: 24 }}>
      <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#60a5fa', marginBottom: 8 }}>Tags</Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
        {TAGS.map((tag) => (
          <Text
            key={tag}
            style={{ paddingHorizontal: 16, paddingVertical: 8, borderRadius: 16, backgroundColor: selected.includes(tag) ? '#3b82f6' : '#18181b', color: selected.includes(tag) ? '#fff' : '#a1a1aa', marginRight: 8, marginBottom: 8 }}
            onPress={() => onToggle(tag)}
          >
            {tag}
          </Text>
        ))}
      </View>
    </View>
  );
}

function UploadProgress() {
  return (
    <View style={{ marginBottom: 24 }}>
      <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#60a5fa', marginBottom: 8 }}>Upload Progress</Text>
      <View style={{ width: '100%', height: 8, backgroundColor: '#27272a', borderRadius: 4, overflow: 'hidden', marginBottom: 4 }}>
        <View style={{ width: '60%', height: 8, backgroundColor: '#3b82f6' }} />
      </View>
      <Text style={{ fontSize: 12, color: '#a1a1aa' }}>Uploading evidence... 60%</Text>
    </View>
  );
}

function SubmitButton() {
  return (
    <View style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', backgroundColor: '#101014', borderTopWidth: 1, borderColor: '#27272a', padding: 24, alignItems: 'center' }}>
      <View style={{ width: '100%', maxWidth: 400, paddingVertical: 16, borderRadius: 16, backgroundColor: '#3b82f6', alignItems: 'center' }}>
        <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 18 }}>Submit Evidence</Text>
      </View>
    </View>
  );
}

export default function EvidenceUploadScreen() {
  const [evidence, setEvidence] = useState<EvidenceItem[]>([
    { id: "1", type: "Video", thumb: "https://placehold.co/96x96?text=VID" },
    { id: "2", type: "Photo", thumb: "https://placehold.co/96x96?text=IMG" },
  ]);
  const [tags, setTags] = useState(["Speeding"]);

  const handleDelete = (id: string) => setEvidence(evidence.filter((e) => e.id !== id));
  const handleToggleTag = (tag: string) =>
    setTags((t) =>
      t.includes(tag) ? t.filter((x) => x !== tag) : [...t, tag]
    );

  return (
    <View style={{ minHeight: '100%', backgroundColor: '#0f0f0f', flex: 1, paddingBottom: 96 }}>
      {/* Header */}
      <Header />

      {/* Main Content */}
      <View style={{ flex: 1, alignItems: 'center', paddingHorizontal: 16, paddingVertical: 32 }}>
        <View style={{ width: '100%', maxWidth: 400, alignSelf: 'center' }}>
          {/* Evidence List */}
          <EvidenceList items={evidence} onDelete={handleDelete} />

          {/* Incident Details Form */}
          <IncidentDetailsForm />

          {/* Tags Section */}
          <TagsSection selected={tags} onToggle={handleToggleTag} />

          {/* Upload Progress */}
          <UploadProgress />
        </View>
      </View>

      {/* Sticky Submit Button */}
      <SubmitButton />
    </View>
  );
}
