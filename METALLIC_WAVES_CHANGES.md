# MetallicWaves Component - Chrome Effects Documentation

This document details the chrome and enhanced visual effects that were removed from the MetallicWaves component. You can add these back incrementally as needed.

## Overview of Changes

The enhanced version added:
1. Chrome effects on alternating lines (50% chrome, 50% oil rainbow)
2. Complex gradients with multiple color stops
3. Shadow blur effects for depth
4. Thicker line widths
5. Dynamic shimmer and glint effects

## Detailed Changes

### 1. Line Counter System

**Add before the horizontal wave loop (line 69):**
```typescript
// Draw oil slick waves with rainbow interference and liquid chrome
let lineCounter = 0;
```

### 2. Horizontal Chrome Lines

**Replace the simple horizontal line drawing (lines 70-76) with:**
```typescript
// Every 2nd line is liquid chrome (more chrome!)
const isChromeLine = lineCounter % 2 === 0;
lineCounter++;

if (isChromeLine) {
  // Intense liquid chrome effect - ultra-sharp reflective gradients
  const chromePhase = Math.sin(timeRef.current * 2 + y * 0.02);
  const chromeIntensity = 0.5 + Math.abs(Math.sin(timeRef.current * 3 + y * 0.01)) * 0.5;
  const shimmerPhase = Math.sin(timeRef.current * 8 + y * 0.05); // Fast shimmer
  
  // Create chrome gradient along the line with multiple reflection points
  const gradient = ctx.createLinearGradient(0, y, canvas.width, y);
  
  // Hyper-metallic chrome with extreme contrast
  if (chromePhase > 0) {
    // Bright mirror reflection phase - like polished chrome
    gradient.addColorStop(0, `rgba(255, 255, 255, ${0.95 * chromeIntensity})`);
    gradient.addColorStop(0.1, `rgba(245, 250, 255, ${0.9 * chromeIntensity})`);
    gradient.addColorStop(0.15, `rgba(0, 0, 5, 0.95)`); // Sharp black line
    gradient.addColorStop(0.3, `rgba(255, 255, 255, ${chromeIntensity})`);
    gradient.addColorStop(0.35, `rgba(220, 225, 235, ${0.8 * chromeIntensity})`);
    gradient.addColorStop(0.4, `rgba(10, 10, 15, 0.9)`); // Deep black
    gradient.addColorStop(0.5, `rgba(255, 255, 255, ${0.95 * chromeIntensity})`);
    gradient.addColorStop(0.55, `rgba(0, 0, 0, 0.98)`); // Ultra black
    gradient.addColorStop(0.65, `rgba(250, 252, 255, ${chromeIntensity})`);
    gradient.addColorStop(0.75, `rgba(180, 185, 195, ${0.7 * chromeIntensity})`);
    gradient.addColorStop(0.85, `rgba(255, 255, 255, ${0.9 * chromeIntensity})`);
    gradient.addColorStop(0.9, `rgba(5, 5, 10, 0.9)`);
    gradient.addColorStop(1, `rgba(255, 255, 255, ${0.8 * chromeIntensity})`);
  } else {
    // Dark chrome phase with bright highlights
    gradient.addColorStop(0, `rgba(0, 0, 0, 0.98)`); // Pure black
    gradient.addColorStop(0.1, `rgba(5, 5, 10, 0.95)`);
    gradient.addColorStop(0.2, `rgba(255, 255, 255, ${chromeIntensity})`); // Bright spike
    gradient.addColorStop(0.25, `rgba(0, 0, 0, 0.98)`);
    gradient.addColorStop(0.4, `rgba(15, 15, 20, 0.9)`);
    gradient.addColorStop(0.5, `rgba(255, 255, 255, ${0.9 * chromeIntensity})`); // Central highlight
    gradient.addColorStop(0.55, `rgba(0, 0, 0, 0.99)`);
    gradient.addColorStop(0.7, `rgba(240, 245, 255, ${0.8 * chromeIntensity})`);
    gradient.addColorStop(0.75, `rgba(0, 0, 5, 0.95)`);
    gradient.addColorStop(0.9, `rgba(255, 255, 255, ${0.7 * chromeIntensity})`);
    gradient.addColorStop(1, `rgba(0, 0, 0, 0.98)`);
  }
  
  ctx.strokeStyle = gradient;
  ctx.lineWidth = 4; // Thicker for more presence
  
  // Intense glow/shadow effect for chrome
  ctx.shadowBlur = 15 + shimmerPhase * 5;
  ctx.shadowColor = chromePhase > 0 
    ? `rgba(255, 255, 255, ${0.8 + shimmerPhase * 0.2})` 
    : `rgba(0, 0, 0, 0.95)`;
} else {
  // Oil slick rainbow lines (keep existing code)
  const lineHue = (hueShift * 2 + y * 0.5 + Math.sin(timeRef.current + y * 0.01) * 60) % 360;
  const lineSat = 80 + Math.sin(y * 0.02 + timeRef.current * 2) * 20;
  const lineLightness = 50 + Math.cos(y * 0.01 + timeRef.current) * 25;
  ctx.strokeStyle = `hsla(${lineHue}, ${lineSat}%, ${lineLightness}%, ${0.5 + shimmer * 0.3})`;
  ctx.lineWidth = 2;
  ctx.shadowBlur = 0;
}
```

### 3. Vertical Chrome Lines

**Add before the vertical line loop (line 93):**
```typescript
// Vertical oil film lines for mesh/interference with intense chrome
let vertLineCounter = 0;
```

**Replace the simple vertical line drawing (lines 94-100) with:**
```typescript
// Every 2nd vertical line is chrome (50/50 split)
const isChromeLine = vertLineCounter % 2 === 0;
vertLineCounter++;

if (isChromeLine) {
  // Intense vertical chrome reflection
  const chromePhase = Math.cos(timeRef.current * 2.5 + x * 0.02);
  const chromeIntensity = 0.6 + Math.abs(Math.sin(timeRef.current * 2 + x * 0.015)) * 0.4;
  const glintPhase = Math.sin(timeRef.current * 10 + x * 0.1); // Rapid glinting
  
  // Ultra-metallic chrome gradient for vertical lines
  const gradient = ctx.createLinearGradient(x, 0, x, canvas.height);
  
  if (chromePhase > 0) {
    // Hyper-bright metallic sheen
    gradient.addColorStop(0, `rgba(255, 255, 255, ${chromeIntensity})`);
    gradient.addColorStop(0.05, `rgba(0, 0, 0, 0.95)`); // Sharp edge
    gradient.addColorStop(0.2, `rgba(255, 255, 255, ${0.95 * chromeIntensity})`);
    gradient.addColorStop(0.25, `rgba(200, 205, 220, ${0.7 * chromeIntensity})`);
    gradient.addColorStop(0.3, `rgba(0, 0, 5, 0.98)`); // Deep black stripe
    gradient.addColorStop(0.45, `rgba(255, 255, 255, ${chromeIntensity})`);
    gradient.addColorStop(0.5, `rgba(0, 0, 0, 0.99)`); // Center black
    gradient.addColorStop(0.55, `rgba(255, 255, 255, ${0.9 * chromeIntensity})`);
    gradient.addColorStop(0.7, `rgba(150, 155, 170, ${0.6 * chromeIntensity})`);
    gradient.addColorStop(0.75, `rgba(255, 255, 255, ${chromeIntensity})`);
    gradient.addColorStop(0.8, `rgba(0, 0, 0, 0.95)`);
    gradient.addColorStop(0.95, `rgba(255, 255, 255, ${0.8 * chromeIntensity})`);
    gradient.addColorStop(1, `rgba(0, 0, 0, 0.9)`);
  } else {
    // Dark chrome with mirror highlights
    gradient.addColorStop(0, `rgba(0, 0, 0, 0.99)`); // Pitch black
    gradient.addColorStop(0.15, `rgba(255, 255, 255, ${0.9 * chromeIntensity})`); // Sharp highlight
    gradient.addColorStop(0.2, `rgba(0, 0, 0, 0.98)`);
    gradient.addColorStop(0.35, `rgba(10, 10, 15, 0.9)`);
    gradient.addColorStop(0.4, `rgba(255, 255, 255, ${chromeIntensity})`); // Bright streak
    gradient.addColorStop(0.45, `rgba(0, 0, 0, 0.99)`);
    gradient.addColorStop(0.6, `rgba(220, 225, 240, ${0.8 * chromeIntensity})`);
    gradient.addColorStop(0.65, `rgba(0, 0, 5, 0.98)`);
    gradient.addColorStop(0.8, `rgba(255, 255, 255, ${0.7 * chromeIntensity})`);
    gradient.addColorStop(0.85, `rgba(0, 0, 0, 0.97)`);
    gradient.addColorStop(1, `rgba(255, 255, 255, ${0.5 * chromeIntensity})`);
  }
  
  ctx.strokeStyle = gradient;
  ctx.lineWidth = 3; // Thicker chrome lines
  ctx.shadowBlur = 12 + glintPhase * 8; // Dynamic shadow
  ctx.shadowColor = chromePhase > 0 
    ? `rgba(255, 255, 255, ${0.7 + glintPhase * 0.3})` 
    : `rgba(0, 0, 0, 0.9)`;
} else {
  // Regular oil rainbow lines (keep existing code)
  const lineHue = (hueShift * 3 + x * 0.5 + Math.cos(timeRef.current + x * 0.01) * 90) % 360;
  const lineSat = 90; // High saturation for oil
  const lineLightness = 60 + Math.sin(x * 0.01 + timeRef.current * 1.5) * 20;
  ctx.strokeStyle = `hsla(${lineHue}, ${lineSat}%, ${lineLightness}%, ${0.3 + shimmer * 0.2})`;
  ctx.lineWidth = 1.5;
  ctx.shadowBlur = 0;
}
```

## Incremental Addition Guide

### Level 1: Subtle Chrome (Minimal Change)
- Add chrome to every 4th line instead of every 2nd
- Reduce chrome intensity multiplier from 0.5-1.0 to 0.2-0.4
- Use fewer gradient stops (5-6 instead of 12+)

### Level 2: Moderate Chrome
- Chrome on every 3rd line
- Medium intensity (0.3-0.6)
- 8-10 gradient stops
- Smaller shadow blur (5-10px instead of 15-20px)

### Level 3: Full Chrome (As documented above)
- Chrome on every 2nd line
- Full intensity range
- All gradient stops
- Full shadow effects

## Key Variables to Adjust

1. **Chrome Frequency**: Change `lineCounter % 2` to `% 3` or `% 4` for less chrome
2. **Chrome Intensity**: Reduce the multipliers in `chromeIntensity` calculation
3. **Line Width**: Current chrome lines are 4px (horizontal) and 3px (vertical)
4. **Shadow Blur**: Reduce the base value and multiplier in `ctx.shadowBlur`
5. **Gradient Complexity**: Use fewer `addColorStop` calls for simpler gradients

## Performance Considerations

The chrome effects are computationally intensive due to:
- Complex gradients with many stops
- Shadow blur calculations
- Per-line gradient creation

For better performance, consider:
- Reducing chrome line frequency
- Caching gradients when possible
- Reducing shadow blur range
- Using simpler gradients with fewer stops