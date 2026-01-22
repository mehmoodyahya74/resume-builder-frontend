import React from 'react';
import { ResumeData } from '@/lib/types';
// REMOVED: MultiPageTemplate import
import { SinglePageTemplate } from './SinglePageTemplate'; // Assuming you have this component
// OR if you don't have SinglePageTemplate, we'll modify the template selection logic

interface ResumePreviewProps {
  data: ResumeData;
  scale?: number;
  templateId?: string;
}

export const ResumePreview = React.forwardRef<HTMLDivElement, ResumePreviewProps>(({ data, scale = 1, templateId = 'template1' }, ref) => {
  // Always use only the first page data for single-page preview
  const singlePageData = {
    ...data,
    pages: data.pages.length > 0 ? [data.pages[0]] : data.pages
  };

  return (
    <div 
      ref={ref}
      className="w-full overflow-hidden bg-white"
      style={{ 
        width: '210mm', 
        minHeight: '297mm', // Fixed to single page height
        margin: '0 auto',
        transform: `scale(${scale})`,
        transformOrigin: 'top center'
      }}
    >
      {/* If you have a SinglePageTemplate component */}
      {/* <SinglePageTemplate data={singlePageData} templateId={templateId} /> */}
      
      {/* OR if you want to modify the existing MultiPageTemplate to work as single page */}
      {/* We need to check what MultiPageTemplate does and adapt it */}
    </div>
  );
});

ResumePreview.displayName = 'ResumePreview';
