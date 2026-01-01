// Snitch Identity Verification (KYC) Screen
// Framework: React / Next.js
// Styling: Tailwind CSS
// Animation: framer-motion
// Dark mode default, serious aesthetic

import { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
const ICONS = {
  DocumentArrowUpIcon: '🆔',
  CameraIcon: '📷',
  ShieldCheckIcon: '🛡️',
};

const STEPS = ["Personal Info", "ID Upload", "Face Match", "Confirm"];

function Header() {
  return (
    <header className="w-full px-6 py-4 border-b border-neutral-800 bg-[#101014] dark:bg-[#101014] flex items-center">
      <h1 className="text-lg font-bold text-blue-400 tracking-tight">Verify Your Identity</h1>
    </header>
  );
// ...existing code...

function Stepper({ step }: { step: number }) {
  return (
    <div className="flex items-center justify-between mb-8">
      {STEPS.map((label, idx) => (
        <div key={label} className="flex flex-col items-center flex-1">
          <span className={`text-xs font-semibold ${idx === step ? "text-blue-400" : "text-neutral-500"}`}>{label}</span>
          <div className={`w-3 h-3 rounded-full mt-1 ${idx <= step ? "bg-blue-400" : "bg-neutral-700"}`}></div>
        </div>
      ))}
    </div>
  );
}

function PersonalInfoForm() {
  return (
    <form className="space-y-4 mb-6">
      <div>
        <label className="block text-xs text-neutral-400 mb-1">Full Name</label>
        <input className="w-full bg-[#111] dark:bg-[#111] border border-neutral-800 rounded p-3 text-white" placeholder="Enter your name" />
      </div>
      <div>
        <label className="block text-xs text-neutral-400 mb-1">Date of Birth</label>
        <input type="date" className="w-full bg-[#111] dark:bg-[#111] border border-neutral-800 rounded p-3 text-white" />
      </div>
      <div>
        <label className="block text-xs text-neutral-400 mb-1">SSN</label>
        <input type="password" className="w-full bg-[#111] dark:bg-[#111] border border-neutral-800 rounded p-3 text-white" placeholder="XXX-XX-XXXX" maxLength={11} />
      </div>
    </form>
  );
}

function IDUploadBlock() {
  return (
    <View style={{ marginBottom: 24, backgroundColor: '#18181b', borderRadius: 16, borderWidth: 1, borderColor: '#27272a', padding: 24, alignItems: 'center' }}>
      <Text style={{ fontSize: 40, color: '#60a5fa', marginBottom: 8 }}>{ICONS.DocumentArrowUpIcon}</Text>
      <Text style={{ color: '#a1a1aa', marginBottom: 8 }}>Upload a government-issued ID</Text>
      <TouchableOpacity style={{ paddingHorizontal: 24, paddingVertical: 8, borderRadius: 8, backgroundColor: '#3b82f6' }}>
        <Text style={{ color: '#fff', fontWeight: 'bold' }}>Upload Document</Text>
      </TouchableOpacity>
    </View>
  );
}

function FaceMatchBlock() {
  return (
    <View style={{ marginBottom: 24, backgroundColor: '#18181b', borderRadius: 16, borderWidth: 1, borderColor: '#27272a', padding: 24, alignItems: 'center' }}>
      <Text style={{ fontSize: 40, color: '#60a5fa', marginBottom: 8 }}>{ICONS.CameraIcon}</Text>
      <Text style={{ color: '#a1a1aa', marginBottom: 8 }}>Facial scan required for verification</Text>
      <TouchableOpacity style={{ paddingHorizontal: 24, paddingVertical: 8, borderRadius: 8, backgroundColor: '#3b82f6' }}>
        <Text style={{ color: '#fff', fontWeight: 'bold' }}>Start Face Scan</Text>
      </TouchableOpacity>
    </View>
  );
}

function ConfirmBlock() {
  return (
    <View style={{ marginBottom: 24, backgroundColor: '#18181b', borderRadius: 16, borderWidth: 1, borderColor: '#27272a', padding: 24, alignItems: 'center' }}>
      <Text style={{ fontSize: 40, color: '#60a5fa', marginBottom: 8 }}>{ICONS.ShieldCheckIcon}</Text>
      <Text style={{ color: '#a1a1aa', marginBottom: 8 }}>All steps complete. Ready to submit for verification.</Text>
    </View>
  );
}

function LegalDisclaimer() {
  return (
    <div className="mb-8 bg-[#18181b] dark:bg-[#18181b] rounded-xl border border-neutral-800 p-4 text-xs text-neutral-400">
      Your information is encrypted and securely stored for law enforcement payout compliance. We do not share your data with third parties except as required by law.
    </div>
  );
}

function ContinueButton({ onClick }: { onClick: () => void }) {
  return (
    <View style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', backgroundColor: '#101014', borderTopWidth: 1, borderColor: '#27272a', padding: 24, alignItems: 'center' }}>
      <TouchableOpacity style={{ width: '100%', maxWidth: 400, paddingVertical: 16, borderRadius: 16, backgroundColor: '#3b82f6', alignItems: 'center' }} onPress={onClick}>
        <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 18 }}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
}

// Main page component
export default function IdentityVerificationPage() {
  const [step, setStep] = useState(0);

  return (
    <div className="min-h-screen bg-[#0f0f0f] dark:bg-[#0f0f0f] text-white flex flex-col pb-24">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center px-4 py-8">
        <div className="w-full max-w-xl mx-auto">
          {/* Stepper */}
          <Stepper step={step} />

          {/* Step Content */}
          {step === 0 && <PersonalInfoForm />}
          {step === 1 && <IDUploadBlock />}
          {step === 2 && <FaceMatchBlock />}
          {step === 3 && <ConfirmBlock />}

          {/* Legal Disclaimer */}
          <LegalDisclaimer />
        </div>
      </main>

      {/* Sticky Continue Button */}
      <ContinueButton onClick={() => setStep(Math.min(step + 1, 3))} />
    </div>
  );
}
