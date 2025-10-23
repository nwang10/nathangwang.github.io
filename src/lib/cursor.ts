export class CursorSpeedTracker {
  private lastX: number = 0;
  private lastY: number = 0;
  private lastTime: number = Date.now();
  private speed: number = 0;
  private rafId: number | null = null;

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

    if (dt === 0) return;

    const dx = e.clientX - this.lastX;
    const dy = e.clientY - this.lastY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // Calculate speed (pixels per millisecond, then normalized)
    const rawSpeed = distance / dt;

    // Normalize speed to 0-1 range (cap at 2 pixels/ms for very fast movements)
    this.speed = Math.min(rawSpeed / 2, 1);

    this.lastX = e.clientX;
    this.lastY = e.clientY;
    this.lastTime = now;
  }

  private updateCSSVariable(): void {
    // Gradually decrease speed when not moving
    this.speed *= 0.95;

    // Set CSS variable for use in styles
    document.documentElement.style.setProperty('--cursor-speed', this.speed.toString());

    this.rafId = requestAnimationFrame(this.updateCSSVariable);
  }

  getSpeed(): number {
    return this.speed;
  }
}

export const cursorTracker = new CursorSpeedTracker();
