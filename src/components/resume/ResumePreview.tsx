import React from 'react';
import { ResumeData } from '@/lib/types';

interface ResumePreviewProps {
  data: ResumeData;
  scale?: number;
  templateId?: string;
}

export const ResumePreview = React.forwardRef<HTMLDivElement, ResumePreviewProps>(({ data, scale = 1, templateId = 'template1' }, ref) => {
  return (
    <div 
      ref={ref}
      className="w-full overflow-hidden bg-white"
      style={{ 
        width: '210mm', 
        minHeight: `${data.pages.length * 297}mm`,
        margin: '0 auto',
        transform: `scale(${scale})`,
        transformOrigin: 'top center'
      }}
    >
      <MultiPageTemplate data={data} templateId={templateId} />
    </div>
  );
});

ResumePreview.displayName = 'ResumePreview';
