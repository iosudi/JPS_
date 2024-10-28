import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';

@Component({
  selector: 'app-day-search-circular-slider',
  templateUrl: './day-search-circular-slider.component.html',
  styleUrls: ['./day-search-circular-slider.component.scss'],
})
export class DaySearchCircularSliderComponent {
  @ViewChild('slider', { static: true }) slider: ElementRef | undefined;

  selectedDay = 1; // Default day
  radius = 90; // Circle radius
  dashArray = 2 * Math.PI * this.radius; // Full circle length
  minAngle = 12; // Minimum angle (12°)
  maxAngle = 360; // Maximum angle (360°)

  // Angle range for each day
  dayAngles = Array.from({ length: 30 }, (_, i) => ({
    day: i + 1,
    start: i * 12,
    end: (i + 1) * 12,
  }));

  // Initialize dash offset
  dashOffset = this.dashArray - (this.minAngle / 360) * this.dashArray;

  // Initialize pointer style
  pointerStyle = {
    position: 'absolute',
    width: '50%',
    height: '50px',
    top: '50%',
    left: '0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    transformOrigin: 'right center',
    transform: `translateY(-50%) rotate(${this.minAngle + 93}deg)`,
  }; // Pointer position

  private isDragging = false;
  private previousDay = this.selectedDay;
  private previousAngle = this.minAngle; // Initialize angle to 12°
  private angleThreshold = 12; // Degrees per step

  @HostListener('document:mousemove', ['$event'])
  @HostListener('document:touchmove', ['$event'])
  onMouseMove(event: MouseEvent | TouchEvent) {
    if (this.isDragging) {
      this.updateSlider(this.getEventPosition(event));
    }
  }

  @HostListener('document:mouseup')
  @HostListener('document:touchend')
  stopDragging() {
    this.isDragging = false;
    this.snapToClosestDay();
  }

  // Start dragging
  startDragging(event: MouseEvent | TouchEvent) {
    this.isDragging = true;
    this.updateSlider(this.getEventPosition(event));
  }

  updateSlider(position: { x: number; y: number }) {
    if (!this.slider) return;

    const rect = this.slider.nativeElement.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const x = position.x - centerX;
    const y = position.y - centerY;

    const angle = Math.atan2(y, x) * (180 / Math.PI) + 90; // Convert to degrees
    const normalizedAngle = (angle + 360) % 360; // Normalize to [0, 360]

    // Ensure the angle respects min and max constraints
    const clampedAngle = Math.max(
      this.minAngle,
      Math.min(this.maxAngle, normalizedAngle)
    );

    // Update pointer rotation and apply the additional CSS
    this.pointerStyle = {
      ...this.pointerStyle,
      transform: `translateY(-50%) rotate(${clampedAngle + 93}deg)`,
    };

    // Update circle progress
    const progress = (clampedAngle / 360) * this.dashArray;
    this.dashOffset = this.dashArray - progress;

    // Determine selected day based on angle range
    this.selectedDay =
      this.dayAngles.find(
        (angleRange) =>
          clampedAngle >= angleRange.start && clampedAngle < angleRange.end
      )?.day || 1;

    // Update previous angle to the current clamped angle
    this.previousAngle = clampedAngle;
  }

  private getEventPosition(event: MouseEvent | TouchEvent): {
    x: number;
    y: number;
  } {
    if (event instanceof MouseEvent) {
      return { x: event.clientX, y: event.clientY };
    } else {
      const touch = event.touches[0];
      return { x: touch.clientX, y: touch.clientY };
    }
  }

  snapToClosestDay(): void {
    const dayRange = this.dayAngles.find(
      (angleRange) =>
        this.previousAngle >= angleRange.start &&
        this.previousAngle < angleRange.end
    );

    if (dayRange) {
      const middleAngle = (dayRange.start + dayRange.end) / 2;
      this.selectedDay = dayRange.day;

      // Update pointer rotation and apply the additional CSS
      this.pointerStyle = {
        ...this.pointerStyle,
        transform: `translateY(-50%) rotate(${middleAngle + 93}deg)`,
      };

      // Update circle progress
      const progress = (middleAngle / 360) * this.dashArray;
      this.dashOffset = this.dashArray - progress;

      // Update previous angle to the current middle angle
      this.previousAngle = middleAngle;
    } else {
      // Default to 1 day if no valid range is found
      this.selectedDay = 1;
      this.pointerStyle = {
        ...this.pointerStyle,
        transform: `translateY(-50%) rotate(${this.minAngle + 93}deg)`,
      };
      this.dashOffset = this.dashArray - (this.minAngle / 360) * this.dashArray;
    }
  }
}
