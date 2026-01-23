import React, { useRef } from 'react';
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

  return (
    <div 
      ref={containerRef}
      className="h-full w-full flex items-center justify-center bg-gray-100 p-2"
    >
      <div
        ref={ref}
        className="bg-white shadow-2xl"
        style={{
          width: '794px',  // Fixed A4 width
          height: '1123px', // Fixed A4 height
          transform: 'scale(0.38)', // Adjust this ONE number
          transformOrigin: 'center center',
          border: '1px solid #e5e7eb',
        }}
      >
        {renderTemplate()}
      </div>
    </div>
  );
});

MobileResumePreview.displayName = 'MobileResumePreview';
