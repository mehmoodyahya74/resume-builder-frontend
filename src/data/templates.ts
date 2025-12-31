export interface Template {
  id: string;
  name: string;
  description: string;
  category: 'free' | 'pro'; 
  previewColor: string;
  premium: boolean;
}

export const templates: Template[] = [
  {
    id: 'template2',
    name: 'Template 1: Simple Professional',
    description: 'Professional corporate design with sidebar layout',
    category: 'free',
    previewColor: '#1E40AF',
    premium: false
  },
  {
    id: 'template3',                  
    name: 'Template 2: Modern Minimalist',
    description: 'Clean two-column design with sidebar and modern typography',
    category: 'free',
    previewColor: '#1e293b',
    premium: false
  },
  {
    id: 'template4',
    name: 'Template 3: Creative Bold',
    description: 'Modern creative design with bold colors and dynamic layout',
    category: 'free',
    previewColor: '#f59e0b',
    premium: false
  },
  {
    id: 'template5',
    name: 'Template 4: Corporate Blue',
    description: 'Professional corporate design with sidebar and skills rating',
    category: 'free',
    previewColor: '#0f172a',
    premium: false
  },
  {
    id: 'template7',
    name: 'Template 5: Classic ATS',
    description: 'ATS-friendly simple layout with clean typography',
    category: 'free',
    previewColor: '#000000',
    premium: false
  },
  {
    id: 'template8',
    name: 'Template 6: Tech / Developer',
    description: 'Dark theme developer resume with code-like styling',
    category: 'free',
    previewColor: '#7aa2f7',
    premium: false,
  }
];