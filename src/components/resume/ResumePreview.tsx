import React from 'react';
import { ResumeData } from '@/lib/types';
// REMOVED: import { MultiPageTemplate } from './MultiPageTemplate'; // This doesn't exist

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
      {/* You need to add your actual template rendering here */}
      {/* Example: <Template1 data={data} /> or similar based on templateId */}
    </div>
  );
});

ResumePreview.displayName = 'ResumePreview';
