import React, { useRef, useEffect, useState } from 'react';

interface ResponsivePreviewProps {
  children: React.ReactNode;
  scale?: number;
}

export function ResponsivePreview({ children, scale = 1 }: ResponsivePreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [dynamicScale, setDynamicScale] = useState(scale);

  useEffect(() => {
    function handleResize() {
      if (!containerRef.current || !contentRef.current) return;

      const container = containerRef.current;
      const content = contentRef.current;
      
      const containerWidth = container.clientWidth - 40; // Less padding
      const containerHeight = container.clientHeight - 40;
      
      // Get the actual content dimensions
      content.style.transform = 'scale(1)'; // Reset to get actual size
      const contentWidth = content.scrollWidth;
      const contentHeight = content.scrollHeight;
      content.style.transform = `scale(${dynamicScale})`; // Restore
      
      console.log('Container:', containerWidth, containerHeight);
      console.log('Content:', contentWidth, contentHeight);
      
      // Calculate scale to fit both width and height
      const widthRatio = containerWidth / contentWidth;
      const heightRatio = containerHeight / contentHeight;
      
      // Use the SMALLER ratio to fit everything
      const fitRatio = Math.min(widthRatio, heightRatio);
      
      // Apply user's zoom level
      const finalScale = fitRatio * 0.95 * scale; // 95% for margin
      
      // Limit between 0.3 and 1.2
      const clampedScale = Math.max(0.3, Math.min(finalScale, 1.2));
      
      setDynamicScale(clampedScale);
    }

    // Initial calculation
    setTimeout(handleResize, 100);
    
    // Listen for resize
    window.addEventListener('resize', handleResize);
    
    // Use ResizeObserver for container changes
    const resizeObserver = new ResizeObserver(() => {
      setTimeout(handleResize, 50);
    });
    
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }
    
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
        alignItems: 'flex-start', // Align to top
        padding: '20px',
        overflow: 'hidden', // Important: hide scrollbars
        backgroundColor: '#f5f5f5',
      }}
    >
      <div
        ref={contentRef}
        style={{
          transform: `scale(${dynamicScale})`,
          transformOrigin: 'top center',
          width: '210mm',
          minHeight: '297mm',
          backgroundColor: 'white',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        }}
      >
        {children}
      </div>
    </div>
  );
}
