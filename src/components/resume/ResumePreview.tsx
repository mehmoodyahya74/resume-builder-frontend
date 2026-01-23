import React from 'react';
import { ResumeData, TemplateData } from '@/lib/types';

// Import your actual templates
import { Template2 } from '@/components/templates/Template2/template2';
import { Template3 } from '@/components/templates/Template3/template3';
import { Template4 } from '@/components/templates/Template4/template4';
import { Template5 } from '@/components/templates/Template5/template5';
import { Template7 } from '@/components/templates/Template7/template7';
import { Template8 } from '@/components/templates/Template8/template8';

interface ResumePreviewProps {
  data: ResumeData;
  scale?: number;
  templateId?: string;
}

export const ResumePreview = React.forwardRef<HTMLDivElement, ResumePreviewProps>(({ data, scale = 1, templateId = 'template2' }, ref) => {
  
  // Convert ResumeData (multi-page) to TemplateData (single page)
  const getTemplateData = (): TemplateData => {
    // Get the first page or use defaults
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

  // Render the correct template based on templateId
  const renderTemplate = () => {
    switch(templateId) {
      case 'template2':
        return <Template2 data={templateData} />;
      case 'template3':
        return <Template3 data={templateData} />;
      case 'template4':
        return <Template4 data={templateData} />;
      case 'template5':
        return <Template5 data={templateData} />;
      case 'template7':
        return <Template7 data={templateData} />;
      case 'template8':
        return <Template8 data={templateData} />;
      default:
        return <Template2 data={templateData} />;
    }
  };

  // Change the return statement in ResumePreview.tsx
return (
  <div 
    ref={ref}
    className="bg-white"
    style={{ 
      width: `${310 * scale}mm`,  // Scale width directly
      minHeight: `${297 * scale}mm`, // Scale height directly
      margin: '0 auto',
      transform: 'none', // Remove transform: scale()
      transformOrigin: 'top center',
      flexShrink: 0
    }}
  >
    {renderTemplate()}
  </div>
);
});

ResumePreview.displayName = 'ResumePreview';
