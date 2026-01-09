import React, { useState, useEffect } from 'react';
import { ResumeData } from '@/lib/types';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { 
  Plus, 
  Trash2, 
  AlertCircle, 
  ImageOff, 
  Info, 
  Sparkles, 
  Zap,
  Wand2,
  Brain,
  Loader2,
  ChevronDown,
  List,
  FileText
} from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { useToast } from '@/hooks/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PageManager } from './PageManager';
import { MonthYearPicker } from './MonthYearPicker';

interface ResumeFormProps {
  data: ResumeData;
  onChange: (data: ResumeData) => void;
  templateId?: string;
}

function SimpleCenteredModal({ 
  open, 
  onClose, 
  children,
  title,
}: {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string;
}) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/50" 
        onClick={onClose}
      />
      <div className="relative z-50 bg-white rounded-lg shadow-lg w-100 h-auto overflow-hidden">
        <div className="px-6 pt-6 pb-4 border-b">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Brain className="h-5 w-5 text-blue-600" />
                {title}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-800 text-2xl p-1"
            >
              ×
            </button>
          </div>
        </div>
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {children}
        </div>
      </div>
    </div>
  );
}

export function ResumeForm({ data, onChange, templateId = 'template2' }: ResumeFormProps) {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiDialogOpen, setAiDialogOpen] = useState<boolean | { open: boolean; experienceIndex?: number }>(false);
  const [activeAISection, setActiveAISection] = useState<'summary' | 'experience' | 'skills'>('summary');
  const [aiExperienceYears, setAiExperienceYears] = useState('3+ years');
  const [aiKeyStrengths, setAiKeyStrengths] = useState('');
  const [aiResponsibilities, setAiResponsibilities] = useState('');
  const [aiIndustry, setAiIndustry] = useState('Technology');
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [paragraphMode, setParagraphMode] = useState<'bullets' | 'paragraph'>('bullets');
  const [emailTouched, setEmailTouched] = useState(false);
  
  const templatesWithImages = ['template2', 'template3', 'template4', 'template5'];
  const supportsImage = templatesWithImages.includes(templateId);
  const noImageTemplates = ['template7','template8'];

  const currentPage = data.pages[currentPageIndex];

  const checkProfessionalTitle = (): boolean => {
    if (!data.personalInfo.title?.trim()) {
      toast({
        title: "Professional Title Required",
        description: "Please add your professional title in Personal Information section first.",
        variant: "destructive",
      });
      return false;
    }
    return true;
  };

  const generateWithAI = async (type: 'summary' | 'experience' | 'skills', context: any, experienceIndex?: number) => {
    if (!checkProfessionalTitle()) {
      return;
    }
    
    setIsGenerating(true);
    try {
      const response = await fetch('https://resume-ai-vercel-6whupkh0f-yahya-mehmoods-projects-d3e77816.vercel.app/api/generate-resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type,
          jobTitle: data.personalInfo.title,
          context
        }),
        credentials: 'include'
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'AI generation failed');
      }

      const result = await response.json();
      
      if (type === 'summary' && result.content[0]) {
        const newPages = [...data.pages];
        newPages[currentPageIndex] = {
          ...currentPage,
          summary: result.content[0]
        };
        onChange({ ...data, pages: newPages });
        toast({
          title: "AI Summary Generated",
          description: "Professional summary added to your resume",
        });
      }
      
      if (type === 'experience' && result.content.length > 0) {
        if (experienceIndex !== undefined) {
          // Update existing experience description only
          const newPages = [...data.pages];
          const newExperiences = [...currentPage.experience];
          newExperiences[experienceIndex] = {
            ...newExperiences[experienceIndex],
            description: result.content.join('\n')
          };
          newPages[currentPageIndex] = {
            ...currentPage,
            experience: newExperiences
          };
          onChange({ ...data, pages: newPages });
          toast({
            title: "Description Generated",
            description: "AI has generated description for this experience",
          });
        } else {
          // Create new experience (for first experience generation)
          const newExperience = {
            id: uuidv4(),
            company: 'Current Company',
            position: data.personalInfo.title,
            startDate: 'Present',
            endDate: 'Present',
            description: result.content.join('\n')
          };
          const newPages = [...data.pages];
          newPages[currentPageIndex] = {
            ...currentPage,
            experience: [...currentPage.experience, newExperience]
          };
          onChange({ ...data, pages: newPages });
          toast({
            title: "AI Experience Generated",
            description: `${result.content.length} bullet points added`,
          });
        }
      }
      
      if (type === 'skills' && result.content.length > 0) {
        const newPages = [...data.pages];
        newPages[currentPageIndex] = {
          ...currentPage,
          skills: result.content
        };
        onChange({ ...data, pages: newPages });
        toast({
          title: "AI Skills Generated",
          description: `${result.content.length} skills suggested`,
        });
      }
      
      setAiDialogOpen(false);
      
    } catch (error: any) {
      toast({
        title: "AI Generation Failed",
        description: error.message || "Please try again",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const enhanceWithAI = async (type: 'summary' | 'experience', originalContent: string) => {
    if (!checkProfessionalTitle()) {
      return;
    }
    
    setIsGenerating(true);
    try {
      const response = await fetch('https://resume-ai-vercel-6whupkh0f-yahya-mehmoods-projects-d3e77816.vercel.app/api/enhance-resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type,
          jobTitle: data.personalInfo.title,
          originalContent
        }),
        credentials: 'include'
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'AI enhancement failed');
      }

      const result = await response.json();
      
      if (type === 'summary' && result.content[0]) {
        const newPages = [...data.pages];
        newPages[currentPageIndex] = {
          ...currentPage,
          summary: result.content[0]
        };
        onChange({ ...data, pages: newPages });
        toast({
          title: "Summary Enhanced",
          description: "AI has improved your professional summary",
        });
      }
      
      if (type === 'experience' && currentPage.experience.length > 0) {
        const updatedExperiences = [...currentPage.experience];
        const lastExpIndex = updatedExperiences.length - 1;
        updatedExperiences[lastExpIndex] = {
          ...updatedExperiences[lastExpIndex],
          description: result.content.join('\n')
        };
        const newPages = [...data.pages];
        newPages[currentPageIndex] = {
          ...currentPage,
          experience: updatedExperiences
        };
        onChange({ ...data, pages: newPages });
        toast({
          title: "Experience Enhanced",
          description: "AI has improved your bullet points",
        });
      }
      
    } catch (error: any) {
      toast({
        title: "AI Enhancement Failed",
        description: error.message || "Please try again",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const quickGenerateSummary = () => {
    if (!checkProfessionalTitle()) {
      return;
    }
    
    setIsGenerating(true);
    generateWithAI('summary', {
      years: '3+ years',
      strengths: currentPage.skills.join(', ')
    });
  };

  const quickGenerateExperience = () => {
    if (!checkProfessionalTitle()) {
      return;
    }
    
    setIsGenerating(true);
    generateWithAI('experience', {
      responsibilities: 'Describe your responsibilities here'
    });
  };

  const quickGenerateSkills = () => {
    if (!checkProfessionalTitle()) {
      return;
    }
    
    setIsGenerating(true);
    generateWithAI('skills', {
      industry: 'Technology',
      currentSkills: currentPage.skills.join(', ')
    });
  };

  const openAIDialog = (section: 'summary' | 'experience' | 'skills', experienceIndex?: number) => {
    if (!checkProfessionalTitle()) {
      return;
    }
    
    setActiveAISection(section);
    
    if (section === 'summary') {
      setAiExperienceYears('3+ years');
      setAiKeyStrengths(currentPage.skills.join(', '));
    } else if (section === 'experience') {
      setAiResponsibilities('');
    } else if (section === 'skills') {
      setAiIndustry('Technology');
    }
    
    if (experienceIndex !== undefined) {
      setAiDialogOpen({ open: true, experienceIndex });
    } else {
      setAiDialogOpen(true);
    }
  };

  const generateFromDialog = () => {
    let context = {};
    
    // Get experienceIndex if exists
    const experienceIndex = typeof aiDialogOpen === 'object' ? aiDialogOpen.experienceIndex : undefined;
    
    if (activeAISection === 'summary') {
      context = {
        years: aiExperienceYears,
        strengths: aiKeyStrengths || currentPage.skills.join(', ')
      };
    } else if (activeAISection === 'experience') {
      context = {
        responsibilities: aiResponsibilities || 'Describe your responsibilities here'
      };
    } else if (activeAISection === 'skills') {
      context = {
        industry: aiIndustry,
        currentSkills: currentPage.skills.join(', ')
      };
    }
    
    generateWithAI(activeAISection, context, experienceIndex);
  };

  const handlePersonalInfoChange = (field: string, value: any) => {
    onChange({
      ...data,
      personalInfo: {
        ...data.personalInfo,
        [field]: value,
      },
    });
  };

  const handlePageDataChange = (field: keyof typeof currentPage, value: any) => {
    const newPages = [...data.pages];
    newPages[currentPageIndex] = {
      ...currentPage,
      [field]: value
    };
    onChange({ ...data, pages: newPages });
  };

  const handleArrayChange = (section: 'education' | 'experience', index: number, field: string, value: string) => {
    const newPages = [...data.pages];
    const currentSection = [...currentPage[section]];
    (currentSection[index] as any)[field] = value;
    newPages[currentPageIndex] = {
      ...currentPage,
      [section]: currentSection
    };
    onChange({ ...data, pages: newPages });
  };

  const addArrayItem = (section: 'education' | 'experience') => {
    const newItem = section === 'education' 
      ? { id: uuidv4(), school: '', degree: '', startDate: '', endDate: '' }
      : { id: uuidv4(), company: '', position: '', startDate: '', endDate: '', description: '' };
    
    const newPages = [...data.pages];
    newPages[currentPageIndex] = {
      ...currentPage,
      [section]: [...currentPage[section], newItem]
    };
    onChange({ ...data, pages: newPages });
  };

  const removeArrayItem = (section: 'education' | 'experience', index: number) => {
    const newPages = [...data.pages];
    const newArray = [...currentPage[section]];
    newArray.splice(index, 1);
    newPages[currentPageIndex] = {
      ...currentPage,
      [section]: newArray
    };
    onChange({ ...data, pages: newPages });
  };

  const handleSkillChange = (index: number, value: string) => {
    const newPages = [...data.pages];
    const newSkills = [...currentPage.skills];
    newSkills[index] = value;
    newPages[currentPageIndex] = {
      ...currentPage,
      skills: newSkills
    };
    onChange({ ...data, pages: newPages });
  };

  const addSkill = () => {
    const newPages = [...data.pages];
    newPages[currentPageIndex] = {
      ...currentPage,
      skills: [...currentPage.skills, '']
    };
    onChange({ ...data, pages: newPages });
  };

  const removeSkill = (index: number) => {
    const newPages = [...data.pages];
    const newSkills = [...currentPage.skills];
    newSkills.splice(index, 1);
    newPages[currentPageIndex] = {
      ...currentPage,
      skills: newSkills
    };
    onChange({ ...data, pages: newPages });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        handlePersonalInfoChange('imageUrl', event.target.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    handlePersonalInfoChange('imageUrl', undefined);
  };

  const getTemplateName = () => {
    const templateNames: Record<string, string> = {
      'template2': 'Template 1: Simple Professional',
      'template3': 'Template 2: Modern Minimalist',
      'template4': 'Template 3: Creative Bold',
      'template5': 'Template 4: Corporate Blue',
      'template7': 'Template 5: Classic ATS',
      'template8': 'Template 6: Tech / Developer'
    };
    return templateNames[templateId] || 'Current Template';
  };

  const addCustomSection = () => {
    const newSection = {
      id: uuidv4(),
      title: 'New Custom Section',
      type: 'list' as const,
      items: []
    };
    const newPages = [...data.pages];
    newPages[currentPageIndex] = {
      ...currentPage,
      customSections: [...currentPage.customSections, newSection]
    };
    onChange({ ...data, pages: newPages });
  };

  const updateCustomSection = (index: number, updatedSection: any) => {
    const newPages = [...data.pages];
    const newSections = [...currentPage.customSections];
    newSections[index] = updatedSection;
    newPages[currentPageIndex] = {
      ...currentPage,
      customSections: newSections
    };
    onChange({ ...data, pages: newPages });
  };

  const removeCustomSection = (index: number) => {
    const newPages = [...data.pages];
    const newSections = [...currentPage.customSections];
    newSections.splice(index, 1);
    newPages[currentPageIndex] = {
      ...currentPage,
      customSections: newSections
    };
    onChange({ ...data, pages: newPages });
  };

  const addCustomSectionItem = (sectionIndex: number) => {
    const section = currentPage.customSections[sectionIndex];
    const newItem = {
      id: uuidv4(),
      title: '',
      subtitle: '',
      description: '',
      startDate: '',
      endDate: ''
    };
    const updatedSection = {
      ...section,
      items: [...section.items, newItem]
    };
    updateCustomSection(sectionIndex, updatedSection);
  };

  const updateCustomSectionItem = (sectionIndex: number, itemIndex: number, field: string, value: any) => {
    const section = currentPage.customSections[sectionIndex];
    const newItems = [...section.items];
    newItems[itemIndex] = { ...newItems[itemIndex], [field]: value };
    const updatedSection = { ...section, items: newItems };
    updateCustomSection(sectionIndex, updatedSection);
  };

  const removeCustomSectionItem = (sectionIndex: number, itemIndex: number) => {
    const section = currentPage.customSections[sectionIndex];
    const newItems = [...section.items];
    newItems.splice(itemIndex, 1);
    const updatedSection = { ...section, items: newItems };
    updateCustomSection(sectionIndex, updatedSection);
  };

  const isEmailValid = (email: string) => {
    if (!email) return true;
    return /^[a-zA-Z0-9._+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
  };

  const validateAndSwapDates = (startDate: string, endDate: string): [string, string] => {
    if (!startDate || !endDate) return [startDate || '', endDate || ''];
    
    try {
      const start = new Date(startDate);
      const end = new Date(endDate);
      
      if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        return [startDate, endDate];
      }
      
      if (end < start) {
        return [endDate, startDate];
      }
    } catch (error) {
      return [startDate, endDate];
    }
    
    return [startDate, endDate];
  };

  const handleExperienceDateChange = (index: number, field: 'startDate' | 'endDate', value: string) => {
    const exp = currentPage.experience[index];
    let newStartDate = field === 'startDate' ? value : (exp.startDate || '');
    let newEndDate = field === 'endDate' ? value : (exp.endDate || '');
    
    [newStartDate, newEndDate] = validateAndSwapDates(newStartDate, newEndDate);
    
    const newPages = [...data.pages];
    const newExperiences = [...currentPage.experience];
    newExperiences[index] = {
      ...newExperiences[index],
      startDate: newStartDate,
      endDate: newEndDate
    };
    
    newPages[currentPageIndex] = {
      ...currentPage,
      experience: newExperiences
    };
    onChange({ ...data, pages: newPages });
  };

  const handleEducationDateChange = (index: number, field: 'startDate' | 'endDate', value: string) => {
    const edu = currentPage.education[index];
    let newStartDate = field === 'startDate' ? value : (edu.startDate || '');
    let newEndDate = field === 'endDate' ? value : (edu.endDate || '');
    
    [newStartDate, newEndDate] = validateAndSwapDates(newStartDate, newEndDate);
    
    const newPages = [...data.pages];
    const newEducation = [...currentPage.education];
    newEducation[index] = {
      ...newEducation[index],
      startDate: newStartDate,
      endDate: newEndDate
    };
    
    newPages[currentPageIndex] = {
      ...currentPage,
      education: newEducation
    };
    onChange({ ...data, pages: newPages });
  };

  const handleCustomSectionDateChange = (sectionIndex: number, itemIndex: number, field: 'startDate' | 'endDate', value: string) => {
    const section = currentPage.customSections[sectionIndex];
    const item = section.items[itemIndex];
    let newStartDate = field === 'startDate' ? value : (item.startDate || '');
    let newEndDate = field === 'endDate' ? value : (item.endDate || '');
    
    [newStartDate, newEndDate] = validateAndSwapDates(newStartDate, newEndDate);
    
    const newItems = [...section.items];
    newItems[itemIndex] = {
      ...newItems[itemIndex],
      startDate: newStartDate,
      endDate: newEndDate
    };
    
    updateCustomSection(sectionIndex, { ...section, items: newItems });
  };

  return (
    <div className="space-y-6 pb-20">
      <SimpleCenteredModal
        open={typeof aiDialogOpen === 'object' ? aiDialogOpen.open : aiDialogOpen}
        onClose={() => {
          setAiDialogOpen(false);
        }}
        title={
          activeAISection === 'summary' ? 'Generate Professional Summary' :
          activeAISection === 'experience' ? 'Generate Description' :
          'Generate Skills Suggestions'
        }
      >
        <div className="space-y-4">
          {activeAISection === 'summary' && (
            <div className="space-y-3">
              <div className="space-y-2">
                <Label>Years of Experience</Label>
                <Input
                  value={aiExperienceYears}
                  onChange={(e) => setAiExperienceYears(e.target.value)}
                  placeholder="e.g., 3+ years, 5-7 years"
                />
              </div>
              <div className="space-y-2">
                <Label>Key Strengths / Skills</Label>
                <Textarea
                  value={aiKeyStrengths}
                  onChange={(e) => setAiKeyStrengths(e.target.value)}
                  placeholder="e.g., React, Node.js, Leadership, Project Management"
                  className="min-h-20"
                />
              </div>
            </div>
          )}
          
          {activeAISection === 'experience' && (
            <div className="space-y-3">
              <div className="space-y-2">
                <Label>Responsibilities / Notes</Label>
                <Textarea
                  value={aiResponsibilities}
                  onChange={(e) => setAiResponsibilities(e.target.value)}
                  placeholder="e.g., Managed team, built features, improved performance..."
                  className="min-h-25"
                />
                {/* CHANGE 1: Added help text under Responsibilities field */}
                <p className="text-xs text-gray-500 mt-1">
                  Note: AI may generate placeholders like X%, Y%, etc. Replace these with your actual values.
                </p>
              </div>
            </div>
          )}
          
          {activeAISection === 'skills' && (
            <div className="space-y-3">
              <div className="space-y-2">
                <Label>Industry / Field</Label>
                <Input
                  value={aiIndustry}
                  onChange={(e) => setAiIndustry(e.target.value)}
                  placeholder="e.g., Technology, Finance, Healthcare"
                />
              </div>
            </div>
          )}
          
          <Button
            onClick={generateFromDialog}
            disabled={isGenerating}
            className="w-full mt-6 bg-linear-to-r from-blue-600 to-purple-600"
          >
            {isGenerating ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4 mr-2" />
                {activeAISection === 'summary' && 'Generate Summary'}
                {activeAISection === 'experience' && 'Generate Description'}
                {activeAISection === 'skills' && 'Generate Skills'}
              </>
            )}
          </Button>
        </div>
      </SimpleCenteredModal>

      <PageManager
        data={data}
        currentPageIndex={currentPageIndex}
        onChange={onChange}
        onPageChange={setCurrentPageIndex}
      />

      <Accordion type="single" collapsible className="w-full" defaultValue="personal">
        <AccordionItem value="personal">
          <AccordionTrigger className="text-lg font-serif">Personal Information</AccordionTrigger>
          <AccordionContent className="space-y-4 p-1">
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label>Full Name</Label>
                <Input 
                  value={data.personalInfo.fullName} 
                  onChange={(e) => handlePersonalInfoChange('fullName', e.target.value)} 
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Professional Title*</Label>
                  <span className="text-xs text-amber-600">
                    Required for AI generation
                  </span>
                </div>
                <Input 
                  value={data.personalInfo.title} 
                  onChange={(e) => handlePersonalInfoChange('title', e.target.value)} 
                  placeholder="Software Engineer"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input 
                    value={data.personalInfo.email} 
                    onChange={(e) => handlePersonalInfoChange('email', e.target.value)} 
                    onBlur={() => setEmailTouched(true)}
                    placeholder="john@example.com"
                    className={emailTouched && !isEmailValid(data.personalInfo.email) ? "border-red-300" : ""}
                  />
                  {emailTouched && !isEmailValid(data.personalInfo.email) && (
                    <p className="text-xs text-red-500">
                      Please enter a valid email (format: name@domain.com)
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>Phone</Label>
                  <Input 
                    value={data.personalInfo.phone} 
                    onChange={(e) => handlePersonalInfoChange('phone', e.target.value)} 
                    placeholder="+1 (123) 456-7890"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Location</Label>
                <Input 
                  value={data.personalInfo.location} 
                  onChange={(e) => handlePersonalInfoChange('location', e.target.value)} 
                  placeholder="San Francisco, CA"
                />
              </div>
              <div className="space-y-2">
                <Label>Website / LinkedIn</Label>
                <Input 
                  value={data.personalInfo.website} 
                  onChange={(e) => handlePersonalInfoChange('website', e.target.value)} 
                  placeholder="linkedin.com/in/johndoe"
                />
              </div>
              
              <div className="space-y-2">
                <Label>Profile Photo</Label>
                
                {noImageTemplates.includes(templateId) ? (
                  <div className="bg-amber-50 border border-amber-200 rounded-md p-4">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5 shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-amber-800">
                          <ImageOff className="h-4 w-4 inline mr-1" />
                          No Profile Photo Section
                        </p>
                        <p className="text-xs text-amber-600 mt-1">
                          The <span className="font-semibold">{getTemplateName()}</span> template doesn't display profile photos.
                        </p>
                      </div>
                    </div>
                  </div>
                ) : !supportsImage ? (
                  <div className="bg-slate-50 border border-slate-200 rounded-md p-3">
                    <p className="text-sm text-slate-600">
                      Profile photo upload is available for this template.
                    </p>
                    <Input 
                      type="file" 
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="mt-2"
                    />
                  </div>
                ) : (
                  <>
                    <Input 
                      type="file" 
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                  </>
                )}
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="summary">
          <AccordionTrigger className="text-lg font-serif">Professional Summary</AccordionTrigger>
          <AccordionContent className="space-y-4 p-1">
            <div className="space-y-3">
              <div className="flex items-center justify-between mb-2">
                <Label>Summary</Label>
                <div className="flex gap-2">
                  {/* CHANGE 3: Added border around Generate and Enhance buttons */}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => openAIDialog('summary')}
                    disabled={isGenerating}
                    className="border border-blue-300"
                  >
                    <Sparkles className="h-3 w-3 mr-1" />
                    AI Generate
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => enhanceWithAI('summary', currentPage.summary)}
                    disabled={isGenerating || !currentPage.summary.trim()}
                    className="border border-purple-300"
                  >
                    <Zap className="h-3 w-3 mr-1" />
                    Enhance
                  </Button>
                </div>
              </div>
              <Textarea 
                className="min-h-37.5 whitespace-pre-wrap wrap-break-word"
                value={currentPage.summary}
                onChange={(e) => handlePageDataChange('summary', e.target.value)}
                placeholder="Experienced software engineer with 5+ years in full-stack development. Specialized in React, Node.js, and cloud architecture. Passionate about building scalable applications and mentoring junior developers."
              />
              <div className="flex items-start gap-2 text-sm text-gray-500">
                <Info className="h-4 w-4 mt-0.5 shrink-0" />
                <span>Write 2-3 sentences highlighting your key achievements and skills.</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="experience">
          <AccordionTrigger className="text-lg font-serif">Professional Experience</AccordionTrigger>
          <AccordionContent className="space-y-6 p-1">
            {currentPage.experience.length === 0 ? (
              <div className="text-center p-6 border-2 border-dashed border-gray-300 rounded-lg">
                <p className="text-gray-500 mb-4">No experience added yet</p>
                <div className="flex flex-col gap-3">
                  <Button onClick={() => addArrayItem('experience')}>
                    <Plus className="h-4 w-4 mr-2" /> Add Your First Experience
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => openAIDialog('experience')}
                    disabled={isGenerating}
                  >
                    <Sparkles className="h-4 w-4 mr-2" />
                    AI Generate Experience
                  </Button>
                </div>
              </div>
            ) : (
              <>
                {currentPage.experience.map((exp, index) => (
                  <Card key={exp.id} className="bg-muted/30">
                    <CardContent className="pt-6 space-y-4">
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium">Position {index + 1}</h4>
                        {/* CHANGE 2: Removed the AI buttons (Sparkles and Zap) from here */}
                        <Button variant="ghost" size="icon" onClick={() => removeArrayItem('experience', index)}>
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                      <div className="space-y-2">
                        <Label>Job Title</Label>
                        <Input 
                          value={exp.position} 
                          onChange={(e) => handleArrayChange('experience', index, 'position', e.target.value)} 
                          placeholder="Senior Software Engineer"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Company</Label>
                        <Input 
                          value={exp.company} 
                          onChange={(e) => handleArrayChange('experience', index, 'company', e.target.value)} 
                          placeholder="Google Inc."
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Start Date</Label>
                          <MonthYearPicker
                            value={exp.startDate}
                            onChange={(value) => handleExperienceDateChange(index, 'startDate', value || '')}
                            placeholder="Select start date"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>End Date</Label>
                          <MonthYearPicker
                            value={exp.endDate}
                            onChange={(value) => handleExperienceDateChange(index, 'endDate', value || '')}
                            placeholder="Select end date"
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label>Description</Label>
                          <div className="flex gap-1">
                            {/* CHANGE 3: Added border around Generate and Enhance buttons */}
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => openAIDialog('experience', index)}
                              disabled={isGenerating}
                              className="border border-blue-300"
                            >
                              <Sparkles className="h-3 w-3 mr-1" />
                              Generate
                            </Button>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => enhanceWithAI('experience', exp.description)}
                              disabled={isGenerating || !exp.description.trim()}
                              className="border border-purple-300"
                            >
                              <Zap className="h-3 w-3 mr-1" />
                              Enhance
                            </Button>
                          </div>
                        </div>
                        <Textarea 
                          value={exp.description} 
                          onChange={(e) => handleArrayChange('experience', index, 'description', e.target.value)} 
                          placeholder="• Led a team of 5 developers on a React-based SaaS product
• Improved application performance by 40% through code optimization
• Implemented CI/CD pipeline reducing deployment time by 60%"
                          className="min-h-25 font-mono text-sm whitespace-pre-wrap wrap-break-word"
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}
                <div className="flex flex-col gap-2">
                  <Button onClick={() => addArrayItem('experience')} className="w-full" variant="outline">
                    <Plus className="h-4 w-4 mr-2" /> Add Another Experience
                  </Button>
                </div>
              </>
            )}
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="education">
          <AccordionTrigger className="text-lg font-serif">Education</AccordionTrigger>
          <AccordionContent className="space-y-6 p-1">
            {currentPage.education.length === 0 ? (
              <div className="text-center p-6 border-2 border-dashed border-gray-300 rounded-lg">
                <p className="text-gray-500 mb-4">No education added yet</p>
                <Button onClick={() => addArrayItem('education')}>
                  <Plus className="h-4 w-4 mr-2" /> Add Your First Education
                </Button>
              </div>
            ) : (
              <>
                {currentPage.education.map((edu, index) => (
                  <Card key={edu.id} className="bg-muted/30">
                    <CardContent className="pt-6 spacey-4">
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium">School {index + 1}</h4>
                        <Button variant="ghost" size="icon" onClick={() => removeArrayItem('education', index)}>
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                      <div className="space-y-2">
                        <Label>Degree</Label>
                        <Input 
                          value={edu.degree} 
                          onChange={(e) => handleArrayChange('education', index, 'degree', e.target.value)} 
                          placeholder="Bachelor of Science in Computer Science"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>School / University</Label>
                        <Input 
                          value={edu.school} 
                          onChange={(e) => handleArrayChange('education', index, 'school', e.target.value)} 
                          placeholder="Stanford University"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Start Date</Label>
                          <MonthYearPicker
                            value={edu.startDate}
                            onChange={(value) => handleEducationDateChange(index, 'startDate', value || '')}
                            placeholder="Select start date"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>End Date</Label>
                          <MonthYearPicker
                            value={edu.endDate}
                            onChange={(value) => handleEducationDateChange(index, 'endDate', value || '')}
                            placeholder="Select end date"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                <Button onClick={() => addArrayItem('education')} className="w-full" variant="outline">
                  <Plus className="h-4 w-4 mr-2" /> Add Another Education
                </Button>
              </>
            )}
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="skills">
          <AccordionTrigger className="text-lg font-serif">Skills</AccordionTrigger>
          <AccordionContent className="space-y-4 p-1">
            {currentPage.skills.length === 0 || (currentPage.skills.length === 1 && !currentPage.skills[0].trim()) ? (
              <div className="text-center p-6 border-2 border-dashed border-gray-300 rounded-lg mb-4">
                <p className="text-gray-500 mb-4">No skills added yet</p>
                <div className="flex flex-col gap-3">
                  <Button onClick={addSkill}>
                    <Plus className="h-4 w-4 mr-2" /> Add Your First Skill
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => openAIDialog('skills')}
                    disabled={isGenerating}
                  >
                    <Sparkles className="h-4 w-4 mr-2" />
                    AI Suggest Skills
                  </Button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {currentPage.skills.map((skill, index) => (
                  <div key={index} className="flex gap-2">
                    <Input 
                      value={skill} 
                      onChange={(e) => handleSkillChange(index, e.target.value)} 
                      placeholder="React, Node.js, TypeScript"
                    />
                    <Button variant="ghost" size="icon" onClick={() => removeSkill(index)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
            <div className="flex flex-col gap-2">
              <Button onClick={addSkill} className="w-full" variant="outline">
                <Plus className="h-4 w-4 mr-2" /> Add Skill
              </Button>
              <Button 
                onClick={() => openAIDialog('skills')} 
                className="w-full" 
                variant="secondary"
                disabled={isGenerating}
              >
                <Sparkles className="h-4 w-4 mr-2" />
                AI Suggest More Skills
              </Button>
            </div>
            <div className="flex items-start gap-2 text-sm text-gray-500 mt-2">
              <Info className="h-4 w-4 mt-0.5 shrink-0" />
              <span>List relevant skills separated by commas. Use keywords from job descriptions.</span>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="custom">
          <AccordionTrigger className="text-lg font-serif">Custom Sections</AccordionTrigger>
          <AccordionContent className="space-y-4 p-1">
            <div className="space-y-4">
              {currentPage.customSections.map((section, index) => (
                <div key={section.id} className="border rounded-lg p-4 bg-gray-50">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-3">
                      <h4 className="font-medium text-lg">{section.title || "Untitled Section"}</h4>
                      <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                        {section.type}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeCustomSection(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label>Section Title</Label>
                        <Input
                          value={section.title}
                          onChange={(e) => {
                            updateCustomSection(index, { ...section, title: e.target.value });
                          }}
                          placeholder="e.g., Projects, Certifications"
                        />
                      </div>
                      <div>
                        <Label>Section Type</Label>
                        <select
                          value={section.type}
                          onChange={(e) => {
                            updateCustomSection(index, { 
                              ...section, 
                              type: e.target.value as 'list' | 'paragraph',
                              items: section.type === e.target.value ? section.items : []
                            });
                          }}
                          className="w-full p-2 border rounded-md"
                        >
                          <option value="list">List</option>
                          <option value="paragraph">Paragraph</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="space-y-3 mt-4">
                      <div className="flex justify-between items-center">
                        <Label>Items</Label>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => addCustomSectionItem(index)}
                        >
                          <Plus className="h-4 w-4 mr-1" />
                          Add Item
                        </Button>
                      </div>
                      
                      {section.items.map((item, itemIndex) => (
                        <div key={item.id} className="border rounded p-3 bg-white">
                          <div className="flex justify-between mb-2">
                            <span className="text-sm font-medium">Item {itemIndex + 1}</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeCustomSectionItem(index, itemIndex)}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                          
                          {section.type === 'list' && (
                            <div className="space-y-2">
                              <Input
                                value={item.title || ''}
                                onChange={(e) => updateCustomSectionItem(index, itemIndex, 'title', e.target.value)}
                                placeholder="Item Name"
                              />
                            </div>
                          )}
                          
                          {section.type === 'paragraph' && (
                            <div className="space-y-4 border rounded-lg p-4 bg-white">
                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <div className="flex items-center justify-between">
                                    <Label className="text-xs">Title (Optional)</Label>
                                    {item.title && (
                                      <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => updateCustomSectionItem(index, itemIndex, 'title', '')}
                                        className="h-6 w-6 p-0 text-red-500"
                                      >
                                        <Trash2 className="h-3 w-3" />
                                      </Button>
                                    )}
                                  </div>
                                  <Input
                                    value={item.title || ''}
                                    onChange={(e) => updateCustomSectionItem(index, itemIndex, 'title', e.target.value)}
                                    placeholder="Title"
                                  />
                                </div>
                                
                                <div className="space-y-2">
                                  <div className="flex items-center justify-between">
                                    <Label className="text-xs">Sub Title (Optional)</Label>
                                    {item.subtitle && (
                                      <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => updateCustomSectionItem(index, itemIndex, 'subtitle', '')}
                                        className="h-6 w-6 p-0 text-red-500"
                                      >
                                        <Trash2 className="h-3 w-3" />
                                      </Button>
                                    )}
                                  </div>
                                  <Input
                                    value={item.subtitle || ''}
                                    onChange={(e) => updateCustomSectionItem(index, itemIndex, 'subtitle', e.target.value)}
                                    placeholder="Sub Title"
                                  />
                                </div>
                              </div>
                              
                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <div className="flex items-center justify-between">
                                    <Label className="text-xs">Start Date (Optional)</Label>
                                    {item.startDate && (
                                      <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => updateCustomSectionItem(index, itemIndex, 'startDate', '')}
                                        className="h-6 w-6 p-0 text-red-500"
                                      >
                                        <Trash2 className="h-3 w-3" />
                                      </Button>
                                    )}
                                  </div>
                                  <MonthYearPicker
                                    value={item.startDate || ''}
                                    onChange={(value) => handleCustomSectionDateChange(index, itemIndex, 'startDate', value || '')}
                                    placeholder="Select start date"
                                    className="text-sm"
                                  />
                                </div>
                                
                                <div className="space-y-2">
                                  <div className="flex items-center justify-between">
                                    <Label className="text-xs">End Date (Optional)</Label>
                                    {item.endDate && (
                                      <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => updateCustomSectionItem(index, itemIndex, 'endDate', '')}
                                        className="h-6 w-6 p-0 text-red-500"
                                      >
                                        <Trash2 className="h-3 w-3" />
                                      </Button>
                                    )}
                                  </div>
                                  <MonthYearPicker
                                    value={item.endDate || ''}
                                    onChange={(value) => handleCustomSectionDateChange(index, itemIndex, 'endDate', value || '')}
                                    placeholder="Select end date"
                                    className="text-sm"
                                  />
                                </div>
                              </div>
                              
                              <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                  <Label>Content</Label>
                                  <div className="flex gap-1">
                                    <Button
                                      type="button"
                                      variant={paragraphMode === 'bullets' ? "default" : "outline"}
                                      size="sm"
                                      onClick={() => setParagraphMode('bullets')}
                                      className="h-7 px-2"
                                    >
                                      <List className="h-3 w-3 mr-1" />
                                      Bullets
                                    </Button>
                                    <Button
                                      type="button"
                                      variant={paragraphMode === 'paragraph' ? "default" : "outline"}
                                      size="sm"
                                      onClick={() => setParagraphMode('paragraph')}
                                      className="h-7 px-2"
                                    >
                                      <FileText className="h-3 w-3 mr-1" />
                                      Paragraph
                                    </Button>
                                  </div>
                                </div>
                                {paragraphMode === 'bullets' ? (
                                  <Textarea
                                    value={item.description || ''}
                                    onChange={(e) => updateCustomSectionItem(index, itemIndex, 'description', e.target.value)}
                                    placeholder="• Led a team of 5 developers on a React-based SaaS product
• Improved application performance by 40% through code optimization
• Implemented CI/CD pipeline reducing deployment time by 60%"
                                    className="min-h-25 font-mono text-sm whitespace-pre-wrap wrap-break-word"
                                  />
                                ) : (
                                  <Textarea
                                    value={item.description || ''}
                                    onChange={(e) => updateCustomSectionItem(index, itemIndex, 'description', e.target.value)}
                                    placeholder="Built a full-stack e-commerce platform using React and Node.js. Led a team of 5 developers and implemented CI/CD pipeline that reduced deployment time by 60%. Improved application performance by 40% through code optimization and database indexing."
                                    className="min-h-37.5 whitespace-pre-wrap wrap-break-word"
                                  />
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
              
              <Button
                onClick={addCustomSection}
                className="w-full"
                variant="outline"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Custom Section
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
