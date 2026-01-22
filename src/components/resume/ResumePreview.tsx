import React from 'react';
import { ResumeData } from '@/lib/types';
import { MultiPageTemplate } from './MultiPageTemplate';

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
        minHeight: '297mm', // CHANGED: Fixed single page height
        margin: '0 auto',
        transform: `scale(${scale})`,
        transformOrigin: 'top center'
      }}
    >
      {/* The MultiPageTemplate component might need to be modified too 
          to only render the first page, but I'm ONLY changing this file */}
      <MultiPageTemplate data={data} templateId={templateId} />
    </div>
  );
});

ResumePreview.displayName = 'ResumePreview';
