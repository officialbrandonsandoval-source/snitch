// Snitch Notifications Screen
// Framework: React / Next.js
// Styling: Tailwind CSS
// Animation: framer-motion
// Dark mode default, clean, readable

import { useState } from "react";
// If using Expo/React Native, replace heroicons/framer-motion with react-native-vector-icons and react-native-reanimated for production.
// import { Icon } from 'react-native-vector-icons';
// import Animated from 'react-native-reanimated';

const ICONS = {
  CheckCircleIcon: '✅',
  MagnifyingGlassIcon: '🔍',
  ChatBubbleLeftRightIcon: '💬',
  ExclamationTriangleIcon: '⚠️',
};
const NOTIFICATIONS = [
  {
    id: 1,
    type: "reward",
    icon: 'CheckCircleIcon',
    title: "Reward Approved",
    desc: "$100 reward approved for incident INC-20251117-001.",
    time: "2m ago",
    read: false
  },
  {
    id: 2,
    type: "review",
    icon: 'MagnifyingGlassIcon',
    title: "Submission Under Review",
    desc: "Your report INC-20251117-001 is being reviewed.",
    time: "10m ago",
    read: true
  },
  {
    id: 3,
    type: "message",
    icon: 'ChatBubbleLeftRightIcon',
    title: "New Message from Officer",
    desc: "Officer Smith: Please provide additional details.",
    time: "1h ago",
    read: false
  },
  {
    id: 4,
    type: "warning",
    icon: 'ExclamationTriangleIcon',
    title: "System Warning",
    desc: "Your account is missing identity verification.",
    time: "2h ago",
    read: true
  },
];

function Header() {
  return (
    <header className="w-full px-6 py-4 border-b border-neutral-800 bg-[#101014] dark:bg-[#101014] flex items-center">
      <h1 className="text-lg font-bold text-blue-400 tracking-tight">Notifications</h1>
    </header>
  );
// ...existing code...

interface NotificationItemProps {
  item: typeof NOTIFICATIONS[0];
  onRead: (id: number) => void;
}
import { View, Text, TouchableOpacity } from "react-native";
function NotificationItem({ item, onRead }: NotificationItemProps) {
  return (
    <TouchableOpacity
      style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 16, paddingVertical: 24, borderBottomWidth: 1, borderColor: '#27272a', backgroundColor: item.read ? '#18181b' : '#1e40af22' }}
      onPress={() => onRead(item.id)}
    >
      <Text style={{ fontSize: 32, color: item.type === 'warning' ? '#f59e42' : '#60a5fa' }}>{ICONS[item.icon]}</Text>
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 16, color: item.read ? '#a1a1aa' : '#fff' }}>{item.title}</Text>
          <Text style={{ fontSize: 12, color: '#a1a1aa' }}>{item.time}</Text>
        </View>
        <Text style={{ fontSize: 14, color: '#d1d5db', marginTop: 4 }}>{item.desc}</Text>
      </View>
      {!item.read && <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: '#3b82f6', marginTop: 8 }} />}
    </TouchableOpacity>
  );
}

// Main page component
export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(NOTIFICATIONS);

  const handleRead = (id: number) => {
    setNotifications(n => n.map(item => item.id === id ? { ...item, read: true } : item));
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] dark:bg-[#0f0f0f] text-white flex flex-col">
      {/* Header */}
      <Header />

      {/* Feed */}
      <main className="flex-1 flex flex-col items-center px-4 py-8">
        <div className="w-full max-w-xl mx-auto divide-y divide-neutral-800">
          {notifications.map(item => (
            <NotificationItem key={item.id} item={item} onRead={handleRead} />
          ))}
        </div>
      </main>
    </div>
  );
}
