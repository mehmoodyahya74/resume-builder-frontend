import React, { useRef, useEffect, useState } from 'react';

interface ResponsivePreviewProps {
  children: React.ReactNode;
  scale?: number;
}

export function ResponsivePreview({ children, scale = 1 }: ResponsivePreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dynamicScale, setDynamicScale] = useState(scale);

  useEffect(() => {
    function handleResize() {
      if (!containerRef.current) return;

      const container = containerRef.current;
      const containerWidth = container.clientWidth;
      const containerHeight = container.clientHeight;
      
      // A4 dimensions in pixels (210mm x 297mm)
      const a4Width = 794;  // 210mm * 3.78px/mm
      const a4Height = 1123; // 297mm * 3.78px/mm
      
      // Calculate scale to fit both width and height
      const widthRatio = containerWidth / a4Width;
      const heightRatio = containerHeight / a4Height;
      
      // Use the smaller ratio to fit entire page
      const fitRatio = Math.min(widthRatio, heightRatio);
      
      // Apply user's zoom level
      const finalScale = fitRatio * scale;
      
      setDynamicScale(Math.max(0.3, Math.min(finalScale, 1))); // Limit scale between 0.3 and 1
    }

    handleResize();
    
    // Use ResizeObserver for better performance
    const resizeObserver = new ResizeObserver(() => {
      setTimeout(handleResize, 50); // Small delay to ensure accurate measurements
    });
    
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      resizeObserver.disconnect();
    };
  }, [scale]);

  return (
    <div
      ref={containerRef}
      className="responsive-preview-container"
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: '0',
        overflow: 'hidden',
        backgroundColor: '#f5f5f5',
        position: 'relative',
      }}
    >
      <div
        style={{
          transform: `scale(${dynamicScale})`,
          transformOrigin: 'top center',
          width: '210mm',
          minHeight: '297mm',
          backgroundColor: 'white',
          margin: '0',
          boxSizing: 'border-box',
          position: 'relative',
          top: '0',
          left: '0',
        }}
      >
        {children}
      </div>
    </div>
  );
}
