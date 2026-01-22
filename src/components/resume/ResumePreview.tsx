import React from 'react';
import { ResumeData } from '@/lib/types';
// DELETE THIS: import { MultiPageTemplate } from './MultiPageTemplate';

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
        minHeight: '297mm', // Fixed single page height
        margin: '0 auto',
        transform: `scale(${scale})`,
        transformOrigin: 'top center'
      }}
    >
      {/* DELETE THIS: <MultiPageTemplate data={data} templateId={templateId} /> */}
      {/* ADD YOUR ACTUAL TEMPLATE COMPONENT HERE */}
    </div>
  );
});

ResumePreview.displayName = 'ResumePreview';
