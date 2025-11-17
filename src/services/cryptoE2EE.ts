export async function encryptPayload(payload: ArrayBuffer, sharedSecret: string) {
  // Placeholder symmetric "encryption"; swap with a real implementation.
  const secretBytes = new TextEncoder().encode(sharedSecret);
  const payloadBytes = new Uint8Array(payload);
  const result = payloadBytes.map((byte, idx) => byte ^ secretBytes[idx % secretBytes.length]);
  return result.buffer;
}

export async function decryptPayload(payload: ArrayBuffer, sharedSecret: string) {
  return encryptPayload(payload, sharedSecret);
}
