import React, { useState, useEffect, useRef } from 'react';
import './MeterDisplay.css';

/**
 * MeterDisplay - Shows numeric variable/sensor value with responsive sizing
 * Scales value text to fill available space while maintaining readable proportions
 * Supports live sensor polling when sensorId is provided
 * Formats variables with max 2 decimal places
 */
function MeterDisplay({ label, value, unit, color = '#000080', bgColor = '#ffffff', position = 'center', sensorId = null }) {
  const [liveValue, setLiveValue] = useState(value);
  const valueRef = useRef(null);
  const containerRef = useRef(null);
  const [valueFontSize, setValueFontSize] = useState(52);

  // Helper: Format value with max 2 decimal places, trim trailing zeros
  const formatValue = (val) => {
    const num = Number(val);
    if (isNaN(num)) return '0';
    const fixed = num.toFixed(2);
    // Trim trailing zeros and decimal point if not needed
    return parseFloat(fixed).toString();
  };

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

  // Auto-fit value font size
  useEffect(() => {
    const adjustValueFontSize = () => {
      if (!valueRef.current || !containerRef.current) return;

      const container = containerRef.current;
      const valueEl = valueRef.current;
      const maxWidth = container.clientWidth - 40;
      const maxHeight = container.clientHeight - 100; // Reserve space for label and unit

      let minSize = 18;
      let maxSize = 120;
      let optimalSize = 52;

      let iterations = 0;
      while (minSize <= maxSize && iterations < 15) {
        const testSize = Math.floor((minSize + maxSize) / 2);
        valueEl.style.fontSize = `${testSize}px`;

        valueEl.offsetHeight;

        const fits = valueEl.scrollWidth <= maxWidth && valueEl.scrollHeight <= maxHeight;

        if (fits) {
          optimalSize = testSize;
          minSize = testSize + 1;
        } else {
          maxSize = testSize - 1;
        }

        iterations++;
      }

      setValueFontSize(optimalSize);
      valueEl.style.fontSize = `${optimalSize}px`;
    };

    // Adjust on value change and container resize
    adjustValueFontSize();

    const resizeObserver = new ResizeObserver(adjustValueFontSize);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [liveValue]);

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
  const formattedValue = formatValue(liveValue);

  return (
    <div
      ref={containerRef}
      className={`meter-display ${positionClass}`}
      style={{
        backgroundColor: bgColor,
        color: textColor
      }}
    >
      <div className="meter-label">{label || 'Value'}</div>
      <div className="meter-value-container">
        <span ref={valueRef} className="meter-value" style={{ color }}>
          {formattedValue}
        </span>
        {unit && <span className="meter-unit" style={{ color }}>
          {unit}
        </span>}
      </div>
    </div>
  );
}

export default MeterDisplay;
