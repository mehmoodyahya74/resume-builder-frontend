import React, { useRef, useEffect, useState } from 'react';

interface ResponsivePreviewProps {
  children: React.ReactNode;
  scale?: number;
}

export function ResponsivePreview({ children, scale = 1 }: ResponsivePreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    function updateSize() {
      if (!containerRef.current) return;
      
      const container = containerRef.current;
      const parent = container.parentElement;
      
      if (!parent) return;
      
      // Get parent's actual available space
      const parentWidth = parent.clientWidth;
      const parentHeight = parent.clientHeight;
      
      console.log('Parent size:', parentWidth, parentHeight);
      
      setContainerSize({
        width: parentWidth,
        height: parentHeight
      });
    }

    updateSize();
    
    const resizeObserver = new ResizeObserver(() => {
      setTimeout(updateSize, 50);
    });
    
    if (containerRef.current?.parentElement) {
      resizeObserver.observe(containerRef.current.parentElement);
    }
    
    window.addEventListener('resize', updateSize);
    
    return () => {
      window.removeEventListener('resize', updateSize);
      resizeObserver.disconnect();
    };
  }, []);

  // Calculate scale based on container size
  const calculateScale = () => {
    const a4Width = 794; // 210mm in pixels
    const a4Height = 1123; // 297mm in pixels
    
    if (containerSize.width === 0 || containerSize.height === 0) return scale * 0.7;
    
    const widthRatio = (containerSize.width - 40) / a4Width;
    const heightRatio = (containerSize.height - 40) / a4Height;
    
    const fitRatio = Math.min(widthRatio, heightRatio) * 0.9;
    const finalScale = Math.max(0.3, Math.min(fitRatio * scale, 1.2));
    
    return finalScale;
  };

  const finalScale = calculateScale();

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        backgroundColor: '#f5f5f5',
      }}
    >
      <div
        style={{
          transform: `scale(${finalScale})`,
          transformOrigin: 'center center',
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
