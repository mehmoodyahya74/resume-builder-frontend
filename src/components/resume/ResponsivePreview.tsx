import React, { useEffect, useRef, useState } from 'react';

interface ResponsivePreviewProps {
  children: React.ReactNode;
}

export function ResponsivePreview({ children }: ResponsivePreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current) return;

      const containerWidth = containerRef.current.offsetWidth;
      const A4_WIDTH = 794; // px (standard resume width)

      const newScale =
        containerWidth < A4_WIDTH
          ? containerWidth / A4_WIDTH
          : 1;

      setScale(newScale);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-full overflow-x-hidden flex justify-center"
    >
      <div
        style={{
          width: '794px',
          transform: `scale(${scale})`,
          transformOrigin: 'top center',
        }}
      >
        {children}
      </div>
    </div>
  );
}
