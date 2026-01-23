import React, { useRef, useEffect, useState, useCallback } from 'react';

interface ResponsivePreviewProps {
  children: React.ReactNode;
  scale?: number;
  mode?: 'desktop' | 'mobile' | 'tablet' | 'auto';
  enableTouch?: boolean;
}

const DEVICE_SIZES = {
  desktop: { width: '1024px', height: '768px' },
  mobile: { width: '375px', height: '667px' }, // iPhone SE
  tablet: { width: '768px', height: '1024px' }, // iPad
  auto: { width: '100%', height: 'auto' }
};

export function ResponsivePreview({ 
  children, 
  scale = 1, 
  mode = 'auto',
  enableTouch = false 
}: ResponsivePreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [dynamicScale, setDynamicScale] = useState(scale);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const updateScale = useCallback(() => {
    if (!containerRef.current || !contentRef.current) return;

    const containerWidth = containerRef.current.offsetWidth;
    const contentWidth = contentRef.current.offsetWidth;

    if (contentWidth > containerWidth) {
      setDynamicScale(containerWidth / contentWidth);
    } else {
      setDynamicScale(scale);
    }
  }, [scale]);

  useEffect(() => {
    updateScale();
    window.addEventListener('resize', updateScale);

    return () => window.removeEventListener('resize', updateScale);
  }, [updateScale]);

  // Handle touch events for mobile interaction
  useEffect(() => {
    if (!enableTouch || !contentRef.current) return;

    const content = contentRef.current;
    let initialDistance = 0;
    let currentScale = dynamicScale;

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 2) {
        initialDistance = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 2) {
        e.preventDefault();
        const currentDistance = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
        
        if (initialDistance > 0) {
          const newScale = currentScale * (currentDistance / initialDistance);
          setDynamicScale(Math.min(Math.max(newScale, 0.5), 2)); // Limit scale between 0.5x and 2x
        }
      }
    };

    content.addEventListener('touchstart', handleTouchStart, { passive: false });
    content.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      content.removeEventListener('touchstart', handleTouchStart);
      content.removeEventListener('touchmove', handleTouchMove);
    };
  }, [enableTouch, dynamicScale]);

  const device = DEVICE_SIZES[mode];
  const isFixedSize = mode !== 'auto';

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '100%',
        overflow: isMobile && enableTouch ? 'auto' : 'hidden',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: isMobile ? '8px' : '10px',
        backgroundColor: '#f5f5f5',
        borderRadius: '8px',
        position: 'relative',
        touchAction: enableTouch ? 'none' : 'auto'
      }}
    >
      {/* Mobile device frame */}
      {mode === 'mobile' && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 'calc(100% + 40px)',
          height: '40px',
          backgroundColor: '#333',
          borderRadius: '20px 20px 0 0',
          zIndex: 1
        }} />
      )}
      
      <div
        ref={contentRef}
        style={{
          transform: `scale(${dynamicScale})`,
          transformOrigin: 'top center',
          width: isFixedSize ? device.width : '100%',
          height: isFixedSize ? device.height : 'auto',
          minHeight: isFixedSize ? device.height : 'auto',
          backgroundColor: 'white',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          transition: enableTouch ? 'none' : 'transform 0.2s ease-out',
          overflow: 'auto',
          pointerEvents: enableTouch ? 'auto' : 'none',
          ...(mode === 'mobile' && {
            borderRadius: '24px',
            border: '12px solid #333'
          })
        }}
      >
        {children}
      </div>
    </div>
  );
}
