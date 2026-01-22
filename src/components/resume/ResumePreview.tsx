import React from 'react';
import { ResumeData } from '@/lib/types';

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
  
  // Render the correct template based on templateId
  const renderTemplate = () => {
    switch(templateId) {
      case 'template2':
        return <Template2 data={data} />;
      case 'template3':
        return <Template3 data={data} />;
      case 'template4':
        return <Template4 data={data} />;
      case 'template5':
        return <Template5 data={data} />;
      case 'template7':
        return <Template7 data={data} />;
      case 'template8':
        return <Template8 data={data} />;
      default:
        return <Template2 data={data} />;
    }
  };

  return (
    <div 
      ref={ref}
      className="w-full overflow-hidden bg-white"
      style={{ 
        width: '210mm', 
        minHeight: '297mm', // Single page height
        margin: '0 auto',
        transform: `scale(${scale})`,
        transformOrigin: 'top center'
      }}
    >
      {renderTemplate()}
    </div>
  );
});

ResumePreview.displayName = 'ResumePreview';
