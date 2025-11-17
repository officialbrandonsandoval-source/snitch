export default class RollingBuffer {
  private buffer: Float32Array;
  private writeIndex = 0;
  private filled = false;

  constructor(private capacity: number) {
    this.buffer = new Float32Array(capacity);
  }

  push(sample: number) {
    this.buffer[this.writeIndex] = sample;
    this.writeIndex = (this.writeIndex + 1) % this.capacity;
    if (this.writeIndex === 0) {
      this.filled = true;
    }
  }

  snapshot() {
    if (!this.filled) {
      return this.buffer.slice(0, this.writeIndex);
    }

    const head = this.buffer.slice(this.writeIndex);
    const tail = this.buffer.slice(0, this.writeIndex);
    const combined = new Float32Array(this.capacity);
    combined.set(head, 0);
    combined.set(tail, head.length);
    return combined;
  }

  clear() {
    this.buffer.fill(0);
    this.writeIndex = 0;
    this.filled = false;
  }
}
