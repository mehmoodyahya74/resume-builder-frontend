import React, { useEffect, useRef, useState } from 'react';

interface ResponsivePreviewProps {
  children: React.ReactNode;
  scale?: number;
}

export function ResponsivePreview({ children, scale = 1 }: ResponsivePreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [adjustedScale, setAdjustedScale] = useState(scale);

  useEffect(() => {
    const updateScale = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        
        if (width < 768) {
          const newScale = Math.min(1, (width - 32) / 794);
          setAdjustedScale(Math.max(0.6, newScale));
        } else {
          setAdjustedScale(scale);
        }
      }
    };

    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, [scale]);

  return (
    <div ref={containerRef} className="w-full h-full flex justify-center items-start overflow-auto">
      <div 
        className="bg-white"
        style={{
          width: '210mm',
          minHeight: '297mm',
          transform: `scale(${adjustedScale})`,
          transformOrigin: 'top center',
        }}
      >
        {children}
      </div>
    </div>
  );
}