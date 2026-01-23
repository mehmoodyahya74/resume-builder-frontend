import React, { useRef, useEffect, useState, useCallback } from 'react';

interface ResponsivePreviewProps {
  children: React.ReactNode;
  scale?: number;
  mobileScale?: number; // Separate scale for mobile previews
}

export function ResponsivePreview({ 
  children, 
  scale = 1,
  mobileScale = 0.8 // Default mobile preview scale
}: ResponsivePreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [dynamicScale, setDynamicScale] = useState(scale);
  const [isMobileViewport, setIsMobileViewport] = useState(false);

  // Detect if we're on a mobile device/viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobileViewport(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Calculate scale based on container vs content width
  const updateScale = useCallback(() => {
    if (!containerRef.current || !contentRef.current) return;

    const containerWidth = containerRef.current.offsetWidth;
    const content = contentRef.current;
    
    // Reset width to get natural width
    content.style.width = '375px'; // Standard mobile width
    content.style.height = '667px'; // Standard mobile height
    
    const contentWidth = content.offsetWidth;
    
    // Calculate scale to fit container
    let calculatedScale;
    if (contentWidth > containerWidth) {
      calculatedScale = containerWidth / contentWidth;
    } else {
      calculatedScale = isMobileViewport ? mobileScale : scale;
    }
    
    // Apply minimum scale
    const minScale = isMobileViewport ? 0.5 : 0.3;
    calculatedScale = Math.max(calculatedScale, minScale);
    
    setDynamicScale(calculatedScale);
  }, [scale, mobileScale, isMobileViewport]);

  useEffect(() => {
    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, [updateScale]);

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center', // Center vertically too
        padding: '20px',
        backgroundColor: '#f5f5f5',
      }}
    >
      {/* Mobile Frame Container */}
      <div
        style={{
          transform: `scale(${dynamicScale})`,
          transformOrigin: 'center center', // Scale from center
          width: '375px', // Fixed mobile width
          height: '667px', // Fixed mobile height
          backgroundColor: 'white',
          borderRadius: '24px',
          border: '12px solid #333',
          boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
          overflow: 'hidden',
          position: 'relative',
          transition: 'transform 0.3s ease-out'
        }}
      >
        {/* Mobile Status Bar */}
        <div style={{
          position: 'absolute',
          top: '0',
          left: '0',
          right: '0',
          height: '24px',
          backgroundColor: '#333',
          borderTopLeftRadius: '12px',
          borderTopRightRadius: '12px',
          zIndex: 10
        }}>
          <div style={{
            position: 'absolute',
            top: '8px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '40px',
            height: '4px',
            backgroundColor: '#666',
            borderRadius: '2px'
          }} />
        </div>
        
        {/* Content Area */}
        <div
          ref={contentRef}
          style={{
            width: '100%',
            height: '100%',
            paddingTop: '24px', // Make room for status bar
            overflow: 'auto',
            boxSizing: 'border-box'
          }}
        >
          {children}
        </div>
        
        {/* Home Indicator (for modern phones) */}
        <div style={{
          position: 'absolute',
          bottom: '8px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '120px',
          height: '4px',
          backgroundColor: '#333',
          borderRadius: '2px'
        }} />
      </div>
    </div>
  );
}
