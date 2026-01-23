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
      const containerWidth = container.clientWidth - 20; // Less padding
      const containerHeight = container.clientHeight - 20;
      
      // A4 dimensions in pixels (210mm x 297mm)
      const a4Width = 794;  // 210mm * 3.78px/mm
      const a4Height = 1123; // 297mm * 3.78px/mm
      
      // Calculate scale to fit both width and height
      const widthRatio = containerWidth / a4Width;
      const heightRatio = containerHeight / a4Height;
      
      // Use the smaller ratio to fit entire page
      const fitRatio = Math.min(widthRatio, heightRatio);
      
      // Apply additional scale from props if needed
      const finalScale = fitRatio * scale;
      
      setDynamicScale(Math.min(finalScale, 1)); // Don't scale beyond original size
    }

    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [scale]);

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '10px',
        overflow: 'hidden', // Changed to hidden to prevent scrolling
        backgroundColor: '#f5f5f5',
      }}
    >
      <div
        style={{
          transform: `scale(${dynamicScale})`,
          transformOrigin: 'top center',
          width: '210mm',
          minHeight: '297mm',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          backgroundColor: 'white',
        }}
      >
        {children}
      </div>
    </div>
  );
}
