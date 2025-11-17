export type EvidencePayload = {
  audioSamples: Float32Array;
  location?: { latitude: number; longitude: number };
  timestamp: string;
};

const generateReference = () => `case-${Date.now()}-${Math.round(Math.random() * 1e6)}`;

export async function uploadToCops(payload: EvidencePayload) {
  console.log('Uploading payload to the authorities', payload.timestamp);
  await new Promise((resolve) => setTimeout(resolve, 250));
  return { id: generateReference(), status: 'queued' } as const;
}
