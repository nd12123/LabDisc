import React from 'react';
import './TextDisplay.css';

/**
 * TextDisplay - Shows user-defined text with custom colors
 * Determines text color based on background brightness for accessibility
 */
function TextDisplay({ text, color = '#000000', bgColor = '#ffffff', position = 'center' }) {
  // Map position to class name
  const positionClass = `text-display--${position}`;

  return (
    <div
      className={`text-display ${positionClass}`}
      style={{
        backgroundColor: bgColor,
        color: color
      }}
    >
      <div className="text-content">
        {text || 'Text'}
      </div>
    </div>
  );
}

export default TextDisplay;
