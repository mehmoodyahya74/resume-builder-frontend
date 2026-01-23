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

      const containerWidth = containerRef.current.offsetWidth;
      const content = containerRef.current.firstElementChild as HTMLElement;
      if (!content) return;

      const contentWidth = content.offsetWidth;

      // scale down if content is wider than container
      if (contentWidth > containerWidth) {
        setDynamicScale(containerWidth / contentWidth);
      } else {
        setDynamicScale(scale);
      }
    }

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [scale]);

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '100%',
        overflowX: 'auto',
        overflowY: 'auto',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: '10px',
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
