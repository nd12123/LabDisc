import React, { useState, useEffect, useRef } from 'react';
import MeterDisplay from './MeterDisplay';
import TextDisplay from './TextDisplay';
import BarDisplay from './BarDisplay';
import './RightOutputPanel.css';

/**
 * RightOutputPanel - Main output container with 3 equal-height display slots
 * Each slot can contain: MeterDisplay, TextDisplay, or BarDisplay
 */
function RightOutputPanel() {
  const [slots, setSlots] = useState([null, null, null]);
  const renderCountRef = useRef(0);

  /**
   * Handle updates from runtime display functions
   * Updates a specific slot with new display data
   */
  useEffect(() => {
    window.updateDisplaySlot = (slotIndex, displayData) => {
      setSlots(prevSlots => {
        const newSlots = [...prevSlots];
        newSlots[slotIndex] = displayData;
        return newSlots;
      });
      renderCountRef.current += 1;
    };

    window.clearOutputPanel = () => {
      setSlots([null, null, null]);
    };

    return () => {
      delete window.updateDisplaySlot;
      delete window.clearOutputPanel;
    };
  }, []);

  const renderSlotContent = (displayData, slotIndex) => {
    if (!displayData) return null;

    switch (displayData.type) {
      case 'meter':
        return (
          <MeterDisplay
            key={`meter-${slotIndex}`}
            label={displayData.label}
            value={displayData.value}
            unit={displayData.unit}
            color={displayData.color}
            bgColor={displayData.bgColor}
            position={displayData.position}
            sensorId={displayData.sensorId}
          />
        );
      case 'text':
        return (
          <TextDisplay
            key={`text-${slotIndex}`}
            text={displayData.text}
            color={displayData.color}
            bgColor={displayData.bgColor}
            position={displayData.position}
          />
        );
      case 'bar':
        return (
          <BarDisplay
            key={`bar-${slotIndex}`}
            low={displayData.low}
            high={displayData.high}
            value={displayData.value}
            color={displayData.color}
            steps={displayData.steps}
            label={displayData.label}
            unit={displayData.unit}
            position={displayData.position}
            sensorId={displayData.sensorId}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="right-output-panel">
      <div className="output-slot slot-0">
        {renderSlotContent(slots[0], 0)}
      </div>
      <div className="output-slot slot-1">
        {renderSlotContent(slots[1], 1)}
      </div>
      <div className="output-slot slot-2">
        {renderSlotContent(slots[2], 2)}
      </div>
    </div>
  );
}

export default RightOutputPanel;
