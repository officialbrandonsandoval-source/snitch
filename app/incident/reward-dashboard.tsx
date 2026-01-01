// Snitch Reward Tier Dashboard Screen
// Framework: React / Next.js
// Styling: Tailwind CSS
// Animation: framer-motion
// Dark mode default, clean, modern

// If using Expo/React Native, replace heroicons/framer-motion with react-native-vector-icons and react-native-reanimated for production.
// import { Icon } from 'react-native-vector-icons';
// import Animated from 'react-native-reanimated';

const TIERS = ["Bronze", "Silver", "Gold", "Elite"];
const CURRENT_TIER = 2; // Gold
const PROGRESS = 75; // percent to next tier

import { View, Text, TouchableOpacity } from "react-native";
const ICONS = {
  CheckCircleIcon: '✅',
  ArrowRightIcon: '➡️',
  ClockIcon: '⏰',
  BanknotesIcon: '💵',
};

function TopNav() {
  return (
    <View style={{ width: '100%', paddingHorizontal: 24, paddingVertical: 16, borderBottomWidth: 1, borderColor: '#27272a', backgroundColor: '#101014', flexDirection: 'row', alignItems: 'center' }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#60a5fa' }}>Rewards</Text>
    </View>
  );
}

function EarningsCard() {
  return (
    <div className="mb-8 bg-[#18181b] dark:bg-[#18181b] rounded-xl border border-neutral-800 p-6 flex flex-col md:flex-row gap-6 justify-between items-center">
      <div>
        <div className="text-xs text-neutral-400 mb-1">Lifetime Earnings</div>
        <div className="text-2xl font-bold text-green-400">$2,350.00</div>
      </div>
      <div>
        <div className="text-xs text-neutral-400 mb-1">Pending</div>
        <div className="text-xl font-bold text-yellow-400">$120.00</div>
      </div>
      <div>
        <div className="text-xs text-neutral-400 mb-1">Paid</div>
        <div className="text-xl font-bold text-blue-400">$2,230.00</div>
      </div>
    </div>
  );
}

function TierProgressBar() {
  return (
    <View style={{ marginBottom: 32 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
        {TIERS.map((tier, idx) => (
          <View key={tier} style={{ alignItems: 'center' }}>
            <Text style={{ fontSize: 12, fontWeight: 'bold', color: idx <= CURRENT_TIER ? '#60a5fa' : '#a1a1aa' }}>{tier}</Text>
            <View style={{ width: 12, height: 12, borderRadius: 6, marginTop: 4, backgroundColor: idx <= CURRENT_TIER ? '#60a5fa' : '#27272a' }} />
          </View>
        ))}
      </View>
      <View style={{ width: '100%', height: 12, backgroundColor: '#27272a', borderRadius: 8, position: 'relative', overflow: 'hidden' }}>
        <View style={{ height: 12, backgroundColor: '#3b82f6', borderRadius: 8, width: `${PROGRESS}%` }} />
      </View>
      <Text style={{ fontSize: 12, color: '#a1a1aa', marginTop: 8, textAlign: 'right' }}>{PROGRESS}% to Elite</Text>
    </View>
  );
}

function RewardActions() {
  return (
    <View style={{ marginBottom: 32, flexDirection: 'row', gap: 16 }}>
      <TouchableOpacity style={{ flex: 1, paddingVertical: 12, borderRadius: 16, backgroundColor: '#18181b', borderWidth: 1, borderColor: '#27272a', alignItems: 'center', flexDirection: 'row', justifyContent: 'center', gap: 8 }}>
        <Text style={{ fontSize: 20, color: '#60a5fa' }}>{ICONS.ClockIcon}</Text>
        <Text style={{ color: '#60a5fa', fontWeight: 'bold' }}>View History</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{ flex: 1, paddingVertical: 12, borderRadius: 16, backgroundColor: '#3b82f6', borderWidth: 1, borderColor: '#3b82f6', alignItems: 'center', flexDirection: 'row', justifyContent: 'center', gap: 8 }}>
        <Text style={{ fontSize: 20, color: '#fff' }}>{ICONS.BanknotesIcon}</Text>
        <Text style={{ color: '#fff', fontWeight: 'bold' }}>Withdraw Funds</Text>
      </TouchableOpacity>
    </View>
  );
}

const EVENTS = [
  {
    label: "Reward Paid",
    icon: 'CheckCircleIcon',
    time: "2025-11-17 10:00",
    desc: "$100 paid for incident INC-20251117-001"
  },
  {
    label: "Reward Qualified",
    icon: 'ArrowRightIcon',
    time: "2025-11-17 09:30",
    desc: "Incident INC-20251117-001 qualified for reward"
  },
  {
    label: "Reward Paid",
    icon: 'CheckCircleIcon',
    time: "2025-10-22 14:12",
    desc: "$50 paid for incident INC-20251022-003"
  },
];

function EventsList() {
  return (
    <View style={{ marginBottom: 32 }}>
      <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#60a5fa', marginBottom: 8 }}>Recent Reward Events</Text>
      {EVENTS.map((event, idx) => (
        <View key={idx} style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 16, paddingVertical: 16, borderBottomWidth: 1, borderColor: '#27272a' }}>
          <Text style={{ fontSize: 24, color: '#60a5fa', marginTop: 4 }}>{ICONS[event.icon as keyof typeof ICONS]}</Text>
          <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#fff' }}>{event.label}</Text>
              <Text style={{ fontSize: 12, color: '#a1a1aa' }}>{event.time}</Text>
            </View>
            <Text style={{ fontSize: 14, color: '#d1d5db', marginTop: 4 }}>{event.desc}</Text>
          </View>
        </View>
      ))}
    </View>
  );
}

// Main page component
export default function RewardDashboardPage() {
  return (
    <View style={{ minHeight: '100%', backgroundColor: '#0f0f0f', flex: 1, paddingBottom: 32 }}>
      <TopNav />
      <View style={{ flex: 1, alignItems: 'center', paddingHorizontal: 16, paddingVertical: 32 }}>
        <View style={{ width: '100%', maxWidth: 400 }}>
          <EarningsCard />
          <TierProgressBar />
          <RewardActions />
          <EventsList />
        </View>
      </View>
    </View>
  );
}
