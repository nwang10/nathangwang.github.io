export class CursorSpeedTracker {
  private lastX: number = 0;
  private lastY: number = 0;
  private lastTime: number = Date.now();
  private speed: number = 0;
  private smoothedSpeed: number = 0;
  private rafId: number | null = null;

  // Clamping thresholds
  private readonly MIN_SPEED = 0.05; // Ignore very slow movements
  private readonly MAX_SPEED = 1.5; // Cap at 1.5 pixels/ms
  private readonly SPEED_SMOOTHING = 0.15; // Lower = smoother transitions

  constructor() {
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.updateCSSVariable = this.updateCSSVariable.bind(this);
  }

  start(): void {
    window.addEventListener('mousemove', this.handleMouseMove);
    this.rafId = requestAnimationFrame(this.updateCSSVariable);
  }

  stop(): void {
    window.removeEventListener('mousemove', this.handleMouseMove);
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
    }
  }

  private handleMouseMove(e: MouseEvent): void {
    const now = Date.now();
    const dt = now - this.lastTime;

    // Only calculate if enough time has passed
    if (dt === 0 || dt > 100) {
      this.lastX = e.clientX;
      this.lastY = e.clientY;
      this.lastTime = now;
      return;
    }

    const dx = e.clientX - this.lastX;
    const dy = e.clientY - this.lastY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // Calculate raw speed (pixels per millisecond)
    const rawSpeed = distance / dt;

    // Apply clamping with better thresholds
    if (rawSpeed < this.MIN_SPEED) {
      this.speed = 0;
    } else {
      // Normalize to 0-1 range with clamped max
      this.speed = Math.min(rawSpeed / this.MAX_SPEED, 1);
    }

    this.lastX = e.clientX;
    this.lastY = e.clientY;
    this.lastTime = now;
  }

  private updateCSSVariable(): void {
    // Smooth the speed value to avoid jitter
    this.smoothedSpeed += (this.speed - this.smoothedSpeed) * this.SPEED_SMOOTHING;

    // Gradually decrease speed when not moving
    this.speed *= 0.92;

    // Clamp to prevent visual noise
    const clampedSpeed = Math.max(0, Math.min(1, this.smoothedSpeed));

    // Calculate accent intensity (1.0 to 1.25 based on cursor speed)
    // Subtle boost to avoid overwhelming the design
    const accentIntensity = 1 + (clampedSpeed * 0.25);

    // Set CSS variables for use in styles
    document.documentElement.style.setProperty('--cursor-speed', clampedSpeed.toFixed(3));
    document.documentElement.style.setProperty('--accent-intensity', accentIntensity.toFixed(3));

    this.rafId = requestAnimationFrame(this.updateCSSVariable);
  }

  getSpeed(): number {
    return this.smoothedSpeed;
  }
}

export const cursorTracker = new CursorSpeedTracker();
