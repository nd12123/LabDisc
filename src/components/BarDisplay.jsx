import React, { useMemo, useState, useEffect } from 'react';
import './BarDisplay.css';

/**
 * BarDisplay - Horizontal color bar with gradient interpolation
 * Shows color progression from color1 to color2 based on value within range
 * Supports live sensor polling when sensorId is provided
 */
function BarDisplay({ low = 0, high = 100, value = 50, color1 = '#00ff00', color2 = '#ff0000', steps = 10, label = '', unit = '', position = 'center', sensorId = null }) {
  // Live polling: update value from sensor if sensorId provided
  const [liveValue, setLiveValue] = useState(value);

  useEffect(() => {
    if (!sensorId) {
      setLiveValue(value !== null ? value : 0);
      return;
    }

    // Fetch initial value immediately
    if (typeof window.getSensorValue === 'function') {
      const initialValue = window.getSensorValue(sensorId);
      setLiveValue(Number(initialValue) || 0);
    }

    // Poll sensor value every 100ms for smooth updates
    const pollInterval = setInterval(() => {
      if (typeof window.getSensorValue === 'function') {
        const newValue = window.getSensorValue(sensorId);
        setLiveValue(Number(newValue) || 0);
      }
    }, 100);

    return () => clearInterval(pollInterval);
  }, [sensorId]);

  const segments = useMemo(() => {
    const segmentArray = [];

    // Calculate ratio (0-1) based on liveValue within range
    const ratio = Math.max(0, Math.min(1, (liveValue - low) / (high - low)));
    const activeStep = Math.floor(ratio * steps);

    // Parse hex colors to RGB
    const hexToRgb = (hex) => {
      const m = hex.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
      return m ? [parseInt(m[1], 16), parseInt(m[2], 16), parseInt(m[3], 16)] : [0, 0, 0];
    };

    // Interpolate between colors
    const interpolateColor = (c1, c2, t) => {
      return [
        Math.round(c1[0] + (c2[0] - c1[0]) * t),
        Math.round(c1[1] + (c2[1] - c1[1]) * t),
        Math.round(c1[2] + (c2[2] - c1[2]) * t)
      ];
    };

    const rgb1 = hexToRgb(color1);
    const rgb2 = hexToRgb(color2);

    for (let i = 0; i < steps; i++) {
      let fillColor;

      if (i > activeStep) {
        fillColor = '#EEEEEE'; // Inactive segment
      } else {
        const t = steps > 1 ? i / (steps - 1) : 0;
        const rgb = interpolateColor(rgb1, rgb2, t);
        fillColor = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
      }

      segmentArray.push({
        id: i,
        color: fillColor,
        width: (100 / steps)
      });
    }

    return segmentArray;
  }, [low, high, liveValue, color1, color2, steps]);

  const positionClass = `bar-display--${position}`;

  return (
    <div className={`bar-display ${positionClass}`}>
      <div className="bar-title">
        {label && <span className="bar-sensor-name">{label}</span>}
        {unit && <span className="bar-unit">{unit}</span>}
      </div>
      <div className="bar-label">Range: {low} → {high}</div>
      <div className="bar-container">
        <div className="bar-track">
          {segments.map(segment => (
            <div
              key={segment.id}
              className="bar-segment"
              style={{
                width: `${segment.width}%`,
                backgroundColor: segment.color
              }}
            />
          ))}
        </div>
      </div>
      <div className="bar-value">Value: {typeof liveValue === 'number' ? liveValue.toFixed(1) : liveValue}</div>
    </div>
  );
}

export default BarDisplay;
