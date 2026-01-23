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

  // Calculate scale to show COMPLETE A4 page
  useEffect(() => {
    const updateScale = () => {
      if (!containerRef.current) return;
      
      const container = containerRef.current;
      const containerWidth = container.offsetWidth - 40; // Account for padding
      const containerHeight = container.offsetHeight - 40;
      
      // A4 dimensions in pixels
      const a4Width = 794;  // 210mm at 96 DPI
      const a4Height = 1123; // 297mm at 96 DPI
      
      // Calculate scale to fit COMPLETE A4 page
      const widthScale = containerWidth / a4Width;
      const heightScale = containerHeight / a4Height;
      
      // Use the SMALLER scale to ensure entire page fits
      const newScale = Math.min(widthScale, heightScale);
      
      // Set scale (limit between 0.3 and 0.6 for readability)
      setScale(Math.min(0.6, Math.max(0.3, newScale * 0.95))); // 95% to add some margin
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
        className="bg-white shadow-2xl"
        style={{
          width: '794px',  // Fixed A4 width
          height: '1123px', // Fixed A4 height
          transform: `scale(${scale})`,
          transformOrigin: 'center center',
          transition: 'transform 0.2s ease-out',
          border: '1px solid #e5e7eb',
        }}
      >
        {renderTemplate()}
      </div>
    </div>
  );
});

MobileResumePreview.displayName = 'MobileResumePreview';
