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
        minHeight: '297mm', // Single page height
        margin: '0 auto',
        transform: `scale(${scale})`,
        transformOrigin: 'top center'
      }}
    >
      {/* Placeholder - You'll need to add your actual template rendering here */}
      <div className="p-8 h-full">
        <div className="text-center text-gray-400 border-2 border-dashed border-gray-300 rounded-lg h-full flex items-center justify-center">
          <div>
            <p className="text-lg font-medium">Resume Preview</p>
            <p className="text-sm">Template: {templateId}</p>
            <p className="text-sm">Name: {data.personalInfo.fullName || 'Not set'}</p>
          </div>
        </div>
      </div>
    </div>
  );
});

ResumePreview.displayName = 'ResumePreview';
