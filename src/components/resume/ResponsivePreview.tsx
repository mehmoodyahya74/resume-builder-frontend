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
      const containerWidth = container.clientWidth - 40; // Account for padding
      const containerHeight = container.clientHeight - 40;
      
      // A4 dimensions in pixels (210mm x 297mm)
      const a4Width = 794;  // 210mm * 3.78px/mm
      const a4Height = 1123; // 297mm * 3.78px/mm
      
      // Calculate scale to fit both width and height
      const widthRatio = containerWidth / a4Width;
      const heightRatio = containerHeight / a4Height;
      
      // Use the smaller ratio to fit entire page
      const fitRatio = Math.min(widthRatio, heightRatio);
      
      // Apply additional scale from props
      const finalScale = Math.min(fitRatio * 0.95, scale); // 95% to ensure fit
      
      setDynamicScale(Math.max(0.3, finalScale)); // Limit minimum scale
    }

    handleResize();
    
    // Use ResizeObserver for better performance
    const resizeObserver = new ResizeObserver(() => {
      setTimeout(handleResize, 50);
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
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: '20px',
        overflow: 'hidden',
        backgroundColor: '#f5f5f5',
      }}
    >
      <div
        style={{
          transform: `scale(${dynamicScale})`,
          transformOrigin: 'top center',
        }}
      >
        {children}
      </div>
    </div>
  );
}
