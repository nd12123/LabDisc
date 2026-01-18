import React, { useMemo, useState, useEffect } from "react";
import "./BarDisplay.css";

/**
 * BarDisplay - Horizontal color bar with solid fill color and sliding needle indicator
 * Shows solid color fill based on value within range
 * Displays sensor info (name, value, unit) in black text
 * Includes a sliding black needle to indicate current value position
 * Supports live sensor polling when sensorId is provided
 */
function BarDisplay({
  low = 0,
  high = 100,
  value = 50,
  color = "#00ff00",
  steps = 10,
  label = "",
  unit = "",
  position = "center",
  sensorId = null,
}) {
  // Live polling: update value from sensor if sensorId provided
  const [liveValue, setLiveValue] = useState(value);

  useEffect(() => {
    if (!sensorId) {
      setLiveValue(value !== null ? value : 0);
      return;
    }

    // Fetch initial value immediately
    if (typeof window.getSensorValue === "function") {
      const initialValue = window.getSensorValue(sensorId);
      setLiveValue(Number(initialValue) || 0);
    }

    // Poll sensor value every 100ms for smooth updates
    const pollInterval = setInterval(() => {
      if (typeof window.getSensorValue === "function") {
        const newValue = window.getSensorValue(sensorId);
        setLiveValue(Number(newValue) || 0);
      }
    }, 100);

    return () => clearInterval(pollInterval);
  }, [sensorId]);

  // Calculate needle position (0-100%)
  const needlePosition = Math.max(
    0,
    Math.min(100, ((liveValue - low) / (high - low)) * 100)
  );

  const segments = useMemo(() => {
    const segmentArray = [];

    for (let i = 0; i < steps; i++) {
      // Show solid color fill across entire bar
      // Needle position will overlay to show current metric value
      segmentArray.push({
        id: i,
        color: color,
        width: 100 / steps,
      });
    }

    return segmentArray;
  }, [steps, color]);

  const positionClass = `bar-display--${position}`;

  return (
    <div className={`bar-display ${positionClass}`}>
      <div className="bar-header">
        {label && <div className="bar-sensor-name">{label}</div>}
        {unit && <div className="bar-unit">{unit}</div>}
      </div>

      <div className="bar-range-info">
        <span className="bar-range-label">
          Range: {low} → {high}
        </span>
      </div>

      <div className="bar-container">
        <div className="bar-track-wrapper">
          <div className="bar-track">
            {segments.map((segment) => (
              <div
                key={segment.id}
                className="bar-segment"
                style={{
                  width: `${segment.width}%`,
                  backgroundColor: segment.color,
                }}
              />
            ))}
          </div>
          {/* Sliding black needle indicator */}
          <div
            className="bar-needle"
            style={{
              left: `${needlePosition}%`,
            }}
          />
        </div>
      </div>

      <div className="bar-value-display">
        <span className="bar-value-label">Value:</span>
        <span className="bar-value-number">
          {typeof liveValue === "number" ? liveValue.toFixed(1) : liveValue}
        </span>
      </div>
    </div>
  );
}

export default BarDisplay;
