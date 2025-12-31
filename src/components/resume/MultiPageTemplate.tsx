import React from 'react';
import { ResumeData, TemplateData } from '@/lib/types';
import { TemplateContainer } from '@/components/resume/TemplateContainer';

interface MultiPageTemplateProps {
  data: ResumeData;
  templateId: string;
}

export function MultiPageTemplate({ data, templateId }: MultiPageTemplateProps) {
  return (
    <div>
      {data.pages.map((page, pageIndex) => {
        const templateData: TemplateData = {
          personalInfo: pageIndex === 0 ? data.personalInfo : {
            ...data.personalInfo,
            title: '',
            imageUrl: undefined
          },
          summary: page.summary,
          education: page.education,
          experience: page.experience,
          skills: page.skills,
          customSections: page.customSections
        };

        if (pageIndex === 0) {
          return (
            <div key={page.id} style={{ pageBreakAfter: 'always', breakAfter: 'page' }}>
              <TemplateContainer
                data={templateData}
                templateId={templateId}
              />
            </div>
          );
        }

        return (
          <div key={page.id} style={{ pageBreakAfter: 'always', breakAfter: 'page', marginTop: '20mm' }}>
            <div style={{ marginBottom: '24px', paddingBottom: '12px', borderBottom: '1px solid #e5e7eb' }}>
              <div style={{ textAlign: 'center' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#111827', marginBottom: '4px' }}>
                  {data.personalInfo.fullName}
                </h3>
                <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                  {data.personalInfo.email} • {data.personalInfo.phone} • Page {pageIndex + 1}
                </div>
              </div>
            </div>

            <TemplateContainer
              data={templateData}
              templateId={templateId}
            />
          </div>
        );
      })}
    </div>
  );
}