import React, { useRef, useEffect, useState, useCallback } from 'react';

interface ResponsivePreviewProps {
  children: React.ReactNode;
  scale?: number;
  mobileWidth?: string; // New prop for mobile width
}

export function ResponsivePreview({ 
  children, 
  scale = 1,
  mobileWidth = '100%' // Default to full width on mobile
}: ResponsivePreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [dynamicScale, setDynamicScale] = useState(scale);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile and update width
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      
      // Apply mobile width directly
      if (mobile && contentRef.current) {
        contentRef.current.style.width = mobileWidth;
        contentRef.current.style.maxWidth = 'none';
        setDynamicScale(1); // No scaling on mobile
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, [mobileWidth]);

  // Original scaling logic for desktop
  const updateScale = useCallback(() => {
    if (isMobile) return; // Skip on mobile
    
    if (!containerRef.current || !contentRef.current) return;

    const containerWidth = containerRef.current.offsetWidth;
    const contentWidth = contentRef.current.offsetWidth;

    if (contentWidth > containerWidth) {
      setDynamicScale(containerWidth / contentWidth);
    } else {
      setDynamicScale(scale);
    }
  }, [scale, isMobile]);

  useEffect(() => {
    if (!isMobile) {
      updateScale();
      window.addEventListener('resize', updateScale);
    }

    return () => window.removeEventListener('resize', updateScale);
  }, [updateScale, isMobile]);

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '100%',
        overflow: 'auto', // Allow scrolling on mobile
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: isMobile ? '0' : '10px', // Remove padding on mobile
      }}
    >
      <div
        ref={contentRef}
        style={{
          transform: isMobile ? 'none' : `scale(${dynamicScale})`,
          transformOrigin: 'top center',
          width: isMobile ? mobileWidth : '210mm',
          height: isMobile ? 'auto' : `${297 * dynamicScale}mm`,
          minHeight: isMobile ? '100vh' : 'auto',
          transition: isMobile ? 'none' : 'transform 0.2s ease-out',
          // Reset mobile styles
          ...(isMobile && {
            maxWidth: 'none',
            margin: '0',
            padding: '16px',
            boxSizing: 'border-box'
          })
        }}
      >
        {children}
      </div>
    </div>
  );
}
