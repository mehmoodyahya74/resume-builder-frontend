import React, { useEffect, useRef, useState } from 'react';

interface ResponsivePreviewProps {
  children: React.ReactNode;
  baseWidth?: number; // width of CV in px (A4 ≈ 794)
}

export function ResponsivePreview({
  children,
  baseWidth = 794,
}: ResponsivePreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const updateScale = () => {
      if (!containerRef.current) return;

      const containerWidth = containerRef.current.clientWidth;

      // Fit CV fully into screen
      const newScale = containerWidth < baseWidth
        ? containerWidth / baseWidth
        : 1;

      setScale(newScale);
    };

    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, [baseWidth]);

  return (
    <div
      ref={containerRef}
      className="w-full h-full flex justify-center items-start overflow-hidden p-2"
    >
      <div
        style={{
          width: baseWidth,
          transform: `scale(${scale})`,
          transformOrigin: 'top center',
        }}
      >
        {children}
      </div>
    </div>
  );
}
