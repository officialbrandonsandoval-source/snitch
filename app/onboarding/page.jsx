"use client";
import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";

export default function Onboarding() {
  const [step, setStep] = useState(1);

  return (
    <MainLayout>
      <div className="max-w-xl mx-auto bg-[#181818] p-10 rounded-xl border border-neutral-800">
        <h2 className="text-2xl font-bold mb-6">Onboarding — Step {step}/3</h2>

        {step === 1 && (
          <div>
            <p className="text-neutral-400 mb-6">Let’s get your dealership details.</p>
            <input className="bg-[#111] p-3 rounded w-full mb-4" placeholder="Dealership Name" />
            <button className="bg-blue-500 px-6 py-3 rounded" onClick={() => setStep(2)}>Next →</button>
          </div>
        )}

        {step === 2 && (
          <div>
            <p className="text-neutral-400 mb-6">Where should we send your leads?</p>
            <input className="bg-[#111] p-3 rounded w-full mb-4" placeholder="Email" />
            <button className="bg-blue-500 px-6 py-3 rounded" onClick={() => setStep(3)}>Next →</button>
          </div>
        )}

        {step === 3 && (
          <div>
            <p className="text-neutral-400 mb-6">You’re ready to launch Flood The Market.</p>
            <button className="bg-green-500 px-6 py-3 rounded w-full">Finish Setup 🚀</button>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
