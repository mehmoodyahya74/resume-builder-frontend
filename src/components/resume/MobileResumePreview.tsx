import React, { useEffect, useRef, useState } from 'react';
import { ResumeData, TemplateData } from '@/lib/types';
import { Template2 } from '@/components/templates/Template2/template2';
import { Template3 } from '@/components/templates/Template3/template3';
import { Template4 } from '@/components/templates/Template4/template4';
import { Template5 } from '@/components/templates/Template5/template5';
import { Template7 } from '@/components/templates/Template7/template7';
import { Template8 } from '@/components/templates/Template8/template8';

interface MobileResumePreviewProps {
  data: ResumeData;
  templateId?: string;
}

export const MobileResumePreview = React.forwardRef<HTMLDivElement, MobileResumePreviewProps>(({ 
  data, 
  templateId = 'template2' 
}, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.45);

  // Convert ResumeData to TemplateData (SAME AS ORIGINAL)
  const getTemplateData = (): TemplateData => {
    const page = data.pages && data.pages.length > 0 ? data.pages[0] : {
      summary: '',
      experience: [],
      education: [],
      skills: [],
      customSections: [],
    };
    
    return {
      personalInfo: data.personalInfo || {
        fullName: '',
        title: '',
        email: '',
        phone: '',
        location: '',
        website: '',
        imageUrl: undefined
      },
      summary: page.summary || '',
      experience: page.experience || [],
      education: page.education || [],
      skills: page.skills || [],
      customSections: page.customSections || [],
    };
  };

  const templateData = getTemplateData();

  // Render template (SAME AS ORIGINAL)
  const renderTemplate = () => {
    switch(templateId) {
      case 'template2': return <Template2 data={templateData} />;
      case 'template3': return <Template3 data={templateData} />;
      case 'template4': return <Template4 data={templateData} />;
      case 'template5': return <Template5 data={templateData} />;
      case 'template7': return <Template7 data={templateData} />;
      case 'template8': return <Template8 data={templateData} />;
      default: return <Template2 data={templateData} />;
    }
  };

  // Auto-fit to screen
  useEffect(() => {
    const updateScale = () => {
      if (!containerRef.current) return;
      
      const containerWidth = containerRef.current.offsetWidth - 40; // Account for padding
      const containerHeight = containerRef.current.offsetHeight - 40;
      
      const a4Width = 794; // A4 width in pixels
      const a4Height = 1123; // A4 height in pixels
      
      // Calculate scale based on width AND height
      const widthScale = (containerWidth * 0.95) / a4Width;
      const heightScale = (containerHeight * 0.95) / a4Height;
      
      // Use the smaller scale to ensure it fits both dimensions
      const newScale = Math.min(widthScale, heightScale);
      
      // Limit scale between 0.3 and 0.7
      setScale(Math.min(0.7, Math.max(0.3, newScale)));
    };

    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  return (
    <div 
      ref={containerRef}
      className="h-full w-full flex items-center justify-center bg-gray-100 p-4"
    >
      <div
        ref={ref}
        className="bg-white shadow-2xl rounded-sm overflow-hidden"
        style={{
          width: '794px',
          height: '1123px',
          transform: `scale(${scale})`,
          transformOrigin: 'center center',
          transition: 'transform 0.2s ease-out',
        }}
      >
        {renderTemplate()}
      </div>
    </div>
  );
});

MobileResumePreview.displayName = 'MobileResumePreview';
