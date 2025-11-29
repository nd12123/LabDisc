import React, { useState, useEffect } from 'react';
import './MeterDisplay.css';

/**
 * MeterDisplay - Shows numeric sensor value with label, unit, and styling
 * Supports live sensor polling when sensorId is provided
 * Based on reference design with large blue text and label
 */
function MeterDisplay({ label, value, unit, color = '#000080', bgColor = '#ffffff', position = 'center', sensorId = null }) {
  const [liveValue, setLiveValue] = useState(value);

  useEffect(() => {
    if (!sensorId) {
      setLiveValue(value);
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
  }, [sensorId, value]);

  // Determine text color based on background brightness
  const getContrastColor = (bgHex) => {
    const rgb = parseInt(bgHex.slice(1), 16);
    const r = (rgb >> 16) & 255;
    const g = (rgb >> 8) & 255;
    const b = rgb & 255;
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 155 ? '#000000' : '#ffffff';
  };

  const positionClass = `meter-display--${position}`;
  const textColor = getContrastColor(bgColor);

  return (
    <div
      className={`meter-display ${positionClass}`}
      style={{
        backgroundColor: bgColor,
        color: textColor
      }}
    >
      <div className="meter-label">{label || 'Value'}</div>
      <div className="meter-value-container">
        <span className="meter-value" style={{ color }}>
          {typeof liveValue === 'number' ? liveValue.toFixed(1) : liveValue}
        </span>
        <span className="meter-unit" style={{ color }}>
          {unit || ''}
        </span>
      </div>
    </div>
  );
}

export default MeterDisplay;
