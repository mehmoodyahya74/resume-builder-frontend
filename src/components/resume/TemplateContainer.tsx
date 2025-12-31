import React from 'react';
import { TemplateData } from '@/lib/types';
import { Template2 } from '@/components/templates/Template2/Template2';
import { Template3 } from '@/components/templates/Template3/Template3'; 
import { Template4 } from '@/components/templates/Template4/Template4';
import { Template5 } from '@/components/templates/Template5/Template5';
import { Template7 } from '@/components/templates/Template7/Template7';
import { Template8 } from '@/components/templates/Template8/Template8';

interface TemplateContainerProps {
  data: TemplateData;
  templateId?: string;
}

export function TemplateContainer({ data, templateId = 'template2' }: TemplateContainerProps) {
  switch (templateId) {
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
}