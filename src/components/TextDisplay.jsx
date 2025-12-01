import React, { useRef, useEffect, useState } from 'react';
import './TextDisplay.css';

/**
 * TextDisplay - Shows user-defined text with custom colors and responsive font sizing
 * Auto-scales text to fit the slot while maintaining readability
 * Uses binary search algorithm to find optimal font size with debouncing to reduce jitter
 */
function TextDisplay({ text, color = '#000000', bgColor = '#ffffff', position = 'center' }) {
  const positionClass = `text-display--${position}`;
  const contentRef = useRef(null);
  const containerRef = useRef(null);
  const [fontSize, setFontSize] = useState(24);
  const resizeTimeoutRef = useRef(null);

  // Auto-fit font size to fill available space with debouncing
  useEffect(() => {
    const adjustFontSize = () => {
      if (!contentRef.current || !containerRef.current) return;

      const container = containerRef.current;
      const content = contentRef.current;
      const padding = 40; // Total padding (20px top + 20px bottom, or similar for width)
      const maxWidth = container.clientWidth - padding;
      const maxHeight = container.clientHeight - padding;

      let minSize = 12;
      let maxSize = 120;
      let optimalSize = 24;

      // Binary search for optimal font size
      let iterations = 0;
      while (minSize <= maxSize && iterations < 20) {
        const testSize = Math.floor((minSize + maxSize) / 2);
        content.style.fontSize = `${testSize}px`;

        // Force layout recalculation
        content.offsetHeight;

        const fits = content.scrollWidth <= maxWidth && content.scrollHeight <= maxHeight;

        if (fits) {
          optimalSize = testSize;
          minSize = testSize + 1;
        } else {
          maxSize = testSize - 1;
        }

        iterations++;
      }

      // Round to whole pixels to prevent jitter
      optimalSize = Math.round(optimalSize);
      setFontSize(optimalSize);
      content.style.fontSize = `${optimalSize}px`;
    };

    // Debounce resize events to reduce jitter (200ms delay)
    const debouncedResize = () => {
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
      resizeTimeoutRef.current = setTimeout(adjustFontSize, 200);
    };

    // Initial adjustment immediately
    adjustFontSize();

    // Re-adjust on window resize with debounce
    const resizeObserver = new ResizeObserver(debouncedResize);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
    };
  }, [text]); // Recalculate when text changes

  return (
    <div
      ref={containerRef}
      className={`text-display ${positionClass}`}
      style={{
        backgroundColor: bgColor,
        color: color
      }}
    >
      <div ref={contentRef} className="text-content">
        {text || 'Text'}
      </div>
    </div>
  );
}

export default TextDisplay;
