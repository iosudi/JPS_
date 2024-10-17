import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';

@Component({
  selector: 'app-search-circular-slider',
  templateUrl: './search-circular-slider.component.html',
  styleUrls: ['./search-circular-slider.component.scss'],
})
export class SearchCircularSliderComponent {
  @ViewChild('slider', { static: true }) slider: ElementRef | undefined;

  selectedMonth = 1; // Default month
  radius = 90; // Circle radius
  dashArray = 2 * Math.PI * this.radius; // Full circle length
  minAngle = 15; // Minimum angle (25°)
  maxAngle = 360; // Maximum angle (360°)

  // Angle range for each month
  monthAngles = [
    { month: 1, start: 0, end: 30 },
    { month: 2, start: 30, end: 60 },
    { month: 3, start: 60, end: 90 },
    { month: 4, start: 90, end: 120 },
    { month: 5, start: 120, end: 150 },
    { month: 6, start: 150, end: 180 },
    { month: 7, start: 180, end: 210 },
    { month: 8, start: 210, end: 240 },
    { month: 9, start: 240, end: 270 },
    { month: 10, start: 270, end: 300 },
    { month: 11, start: 300, end: 330 },
    { month: 12, start: 330, end: 360 },
  ];

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
  private previousMonth = this.selectedMonth;
  private previousAngle = this.minAngle; // Initialize angle to 25°
  private angleThreshold = 30; // Degrees per step

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
    this.snapToClosestMonth();
    // Adjust to middle of the current month's range
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

    // Determine selected month based on angle range
    this.selectedMonth =
      this.monthAngles.find(
        (angleRange) =>
          clampedAngle >= angleRange.start && clampedAngle <= angleRange.end
      )?.month || 1;

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

  snapToClosestMonth(): void {
    const monthRange = this.monthAngles.find(
      (angleRange) =>
        this.previousAngle >= angleRange.start &&
        this.previousAngle <= angleRange.end
    );

    if (monthRange) {
      const middleAngle = (monthRange.start + monthRange.end) / 2;
      this.selectedMonth = monthRange.month;

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
      // Default to 1 month if no valid range is found
      this.selectedMonth = 1;
      this.pointerStyle = {
        ...this.pointerStyle,
        transform: `translateY(-50%) rotate(${this.minAngle + 93}deg)`,
      };
      this.dashOffset = this.dashArray - (this.minAngle / 360) * this.dashArray;
    }
  }
}
