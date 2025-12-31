import React from 'react';
import { ResumeData, ResumePage } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Plus, Trash2, ChevronUp, ChevronDown, Copy, FileText } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

interface PageManagerProps {
  data: ResumeData;
  currentPageIndex: number;
  onChange: (data: ResumeData) => void;
  onPageChange: (pageIndex: number) => void;
}

export function PageManager({ data, currentPageIndex, onChange, onPageChange }: PageManagerProps) {
  const addPage = () => {
    if (data.pages.length >= 3) return;
    
    const newPage: ResumePage = {
      id: uuidv4(),
      pageNumber: data.pages.length + 1,
      summary: '',
      education: [],
      experience: [],
      skills: [],
      customSections: []
    };
    
    const newPages = [...data.pages, newPage];
    onChange({ ...data, pages: newPages });
    onPageChange(data.pages.length);
  };

  const duplicatePage = (pageIndex: number) => {
    if (data.pages.length >= 3) return;
    
    const pageToCopy = data.pages[pageIndex];
    const newPage: ResumePage = {
      ...JSON.parse(JSON.stringify(pageToCopy)),
      id: uuidv4(),
      pageNumber: data.pages.length + 1
    };
    
    const newPages = [...data.pages, newPage];
    onChange({ ...data, pages: newPages });
    onPageChange(data.pages.length);
  };

  const removePage = (pageIndex: number) => {
    if (data.pages.length <= 1) return;
    
    const newPages = data.pages.filter((_, index) => index !== pageIndex)
      .map((page, index) => ({
        ...page,
        pageNumber: index + 1
      }));
    
    onChange({ ...data, pages: newPages });
    
    if (currentPageIndex >= newPages.length) {
      onPageChange(newPages.length - 1);
    } else if (currentPageIndex > pageIndex) {
      onPageChange(currentPageIndex - 1);
    }
  };

  const movePage = (fromIndex: number, toIndex: number) => {
    if (toIndex < 0 || toIndex >= data.pages.length) return;
    
    const newPages = [...data.pages];
    const [movedPage] = newPages.splice(fromIndex, 1);
    newPages.splice(toIndex, 0, movedPage);
    
    const renumberedPages = newPages.map((page, index) => ({
      ...page,
      pageNumber: index + 1
    }));
    
    onChange({ ...data, pages: renumberedPages });
    
    if (currentPageIndex === fromIndex) {
      onPageChange(toIndex);
    } else if (currentPageIndex === toIndex && fromIndex > toIndex) {
      onPageChange(toIndex + 1);
    } else if (currentPageIndex === toIndex && fromIndex < toIndex) {
      onPageChange(toIndex - 1);
    }
  };

  const getPageStats = (page: ResumePage) => {
    const stats = [];
    if (page.summary.trim()) stats.push('Summary');
    if (page.experience.length > 0) stats.push(`${page.experience.length} Exp`);
    if (page.education.length > 0) stats.push(`${page.education.length} Edu`);
    if (page.skills.length > 0 && page.skills.some(s => s.trim())) stats.push(`${page.skills.length} Skills`);
    if (page.customSections.length > 0) stats.push(`${page.customSections.length} Custom`);
    
    return stats.length > 0 ? stats.join(' • ') : 'Empty page';
  };

  return (
    <div className="flex flex-col gap-4 p-4 bg-gray-50 rounded-lg border">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-gray-600" />
          <h3 className="font-medium text-gray-900">Pages</h3>
          <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded-full">
            {data.pages.length}/3 pages
          </span>
        </div>
        <Button 
          onClick={addPage} 
          size="sm"
          disabled={data.pages.length >= 3}
          className="gap-2"
        >
          <Plus className="h-4 w-4" />
          Add Page
        </Button>
      </div>
      
      <div className="flex flex-col gap-2">
        {data.pages.map((page, index) => (
          <div
            key={page.id}
            className={`flex items-center justify-between p-3 rounded-lg transition-all ${
              currentPageIndex === index 
                ? 'bg-white border-2 border-blue-500 shadow-sm' 
                : 'bg-white border border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center gap-3">
              <button
                onClick={() => onPageChange(index)}
                className="flex items-center gap-3 font-medium hover:text-blue-600 transition-colors"
              >
                <div className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors ${
                  currentPageIndex === index 
                    ? 'bg-blue-100 text-blue-600' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}>
                  {page.pageNumber}
                </div>
                <div className="text-left">
                  <div className="font-medium">Page {page.pageNumber}</div>
                  <div className="text-xs text-gray-500 font-normal">
                    {getPageStats(page)}
                  </div>
                </div>
              </button>
            </div>
            
            <div className="flex gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => duplicatePage(index)}
                disabled={data.pages.length >= 3}
                title="Duplicate page"
                className="h-8 w-8 p-0"
              >
                <Copy className="h-3 w-3" />
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => movePage(index, index - 1)}
                disabled={index === 0}
                title="Move up"
                className="h-8 w-8 p-0"
              >
                <ChevronUp className="h-3 w-3" />
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => movePage(index, index + 1)}
                disabled={index === data.pages.length - 1}
                title="Move down"
                className="h-8 w-8 p-0"
              >
                <ChevronDown className="h-3 w-3" />
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removePage(index)}
                disabled={data.pages.length <= 1}
                title="Remove page"
                className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
          </div>
        ))}
      </div>
      
      {data.pages.length >= 3 && (
        <p className="text-xs text-gray-500 text-center">
          Maximum 3 pages reached
        </p>
      )}
      
      <div className="text-xs text-gray-500 pt-2 border-t border-gray-200">
        <p>• First page includes your personal information</p>
        <p>• Additional pages show your name and contact at the top</p>
        <p>• Each page can have different content</p>
      </div>
    </div>
  );
}