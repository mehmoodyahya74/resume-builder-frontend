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

  const contentWidthMM = 210;
  const contentHeightMM = 297;
  
  const contentWidthPx = contentWidthMM * 3.7795275591;
  const contentHeightPx = contentHeightMM * 3.7795275591;
  
  const scaledWidth = contentWidthPx * scale;
  const scaledHeight = contentHeightPx * scale;

  return (
    <div 
      style={{ 
        width: `${scaledWidth}px`,
        height: `${scaledHeight}px`,
        margin: '0 auto',
        overflow: 'visible'
      }}
    >
      <div 
        ref={ref}
        className="bg-white"
        style={{ 
          width: `${contentWidthMM}mm`, 
          minHeight: `${contentHeightMM}mm`,
          transform: `scale(${scale})`,
          transformOrigin: 'top left'
        }}
      >
        {renderTemplate()}
      </div>
    </div>
  );
});

ResumePreview.displayName = 'ResumePreview';
