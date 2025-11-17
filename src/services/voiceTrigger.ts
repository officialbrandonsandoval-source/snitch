export type VoiceTriggerOptions = {
  sensitivity?: number;
  onTrigger: () => void;
};

let isListening = false;
let timeoutHandle: ReturnType<typeof setTimeout> | null = null;

export function startVoiceTrigger({ sensitivity = 0.7, onTrigger }: VoiceTriggerOptions) {
  if (isListening) {
    return;
  }

  isListening = true;
  console.log(`Voice trigger armed (sensitivity=${sensitivity})`);

  timeoutHandle = setTimeout(() => {
    if (!isListening) return;
    onTrigger();
  }, 5000);
}

export function stopVoiceTrigger() {
  isListening = false;
  if (timeoutHandle) {
    clearTimeout(timeoutHandle);
    timeoutHandle = null;
  }
}
