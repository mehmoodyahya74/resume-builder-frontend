import React, { useEffect, useRef, useState } from 'react';

interface ResponsivePreviewProps {
  children: React.ReactNode;
  scale?: number; // From zoom buttons (0.4 to 1)
}

export function ResponsivePreview({ children, scale = 1 }: ResponsivePreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [adjustedScale, setAdjustedScale] = useState(scale);

  useEffect(() => {
    const updateScale = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        
        // Always ensure it fits the screen
        const maxFitScale = (containerWidth - 32) / 794; // 794px = 210mm
        
        // Combine: fit to screen AND apply zoom
        const finalScale = Math.min(maxFitScale, scale);
        
        // Keep it within bounds
        setAdjustedScale(Math.max(0.4, Math.min(1, finalScale)));
      }
    };

    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, [scale]);

  return (
    <div 
      ref={containerRef} 
      className="w-full h-full flex justify-center items-start overflow-auto p-4"
    >
      <div 
        style={{
          transform: `scale(${adjustedScale})`,
          transformOrigin: 'top center',
        }}
      >
        {children}
      </div>
    </div>
  );
}
