import React, { useState, useRef, useEffect } from 'react';
import { useSearchParams } from 'wouter';
import { ResumeForm } from '@/components/resume/ResumeForm';
import { ResumePreview } from '@/components/resume/ResumePreview';
import { ATSScoreChecker } from '@/components/resume/ATSScoreChecker';
import { initialResumeData } from '@/data/initialResume';
import { ResumeData } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { 
  Download, 
  Eye, 
  PenLine, 
  ZoomIn, 
  ZoomOut, 
  Maximize2,
  CheckCircle2,
  Menu,
  Smartphone,
  Monitor,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Brain,
  User,
  Briefcase,
  GraduationCap,
  Award,
  FileText,
  Settings
} from 'lucide-react';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import { Link } from 'wouter';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function ResumeBuilder() {
  const [params] = useSearchParams();
  const templateId = params.get('template') || 'template2';
  const [resumeData, setResumeData] = useState<ResumeData>(initialResumeData);
  const [activeMobileTab, setActiveMobileTab] = useState<'edit' | 'preview' | 'ats'>('edit');
  const [zoomLevel, setZoomLevel] = useState(0.7);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [deviceOrientation, setDeviceOrientation] = useState<'portrait' | 'landscape'>('portrait');
  const [showMobileTips, setShowMobileTips] = useState(true);
  const printRef = useRef<HTMLDivElement>(null);
  const previewContainerRef = useRef<HTMLDivElement>(null);

  const PDF_API_URL = 'https://rkak0mp4e7.execute-api.us-east-1.amazonaws.com/prod/generate-pdf';

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Blog', href: '/blog' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Privacy Policy', href: '/privacy' },
  ];

  // Detect device orientation
  useEffect(() => {
    const checkOrientation = () => {
      setDeviceOrientation(window.innerHeight > window.innerWidth ? 'portrait' : 'landscape');
    };
    
    checkOrientation();
    window.addEventListener('resize', checkOrientation);
    return () => window.removeEventListener('resize', checkOrientation);
  }, []);

  // Hide mobile tips after 5 seconds
  useEffect(() => {
    if (showMobileTips) {
      const timer = setTimeout(() => {
        setShowMobileTips(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showMobileTips]);

  function escapeRegExp(string: string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  const handleDownloadPDF = async () => {
    const element = printRef.current;
    if (!element) {
      alert('Cannot generate PDF. Please try again.');
      return;
    }
    
    setIsGeneratingPDF(true);
    
    try {
      console.log('🔄 Starting PDF generation...');
      
      let htmlContent = element.innerHTML;
      
      const imgTags = htmlContent.match(/<img[^>]+src="([^">]+)"/g) || [];
      console.log('Found img tags:', imgTags.length);
      
      const imageSrcs = new Set<string>();
      imgTags.forEach(tag => {
        const match = tag.match(/src="([^"]+)"/);
        if (match && match[1]) {
          const src = match[1];
          
          if (!src.startsWith('data:image/')) {
            imageSrcs.add(src);
          }
        }
      });
      
      console.log('Images to convert:', Array.from(imageSrcs));
      
      const imageConversionPromises = Array.from(imageSrcs).map(async (src) => {
        try {
          if (src.startsWith('http://') || src.startsWith('https://') || src.startsWith('data:')) {
            return { original: src, base64: src };
          }
          
          let imageUrl = src;
          if (src.startsWith('/')) {
            imageUrl = window.location.origin + src;
          } else if (src.startsWith('./')) {
            imageUrl = window.location.origin + src.substring(1);
          }
          
          console.log(`Converting: ${src} -> ${imageUrl}`);
          
          const response = await fetch(imageUrl);
          if (!response.ok) {
            console.warn(`Failed to fetch ${imageUrl}: ${response.status}`);
            return { original: src, base64: src };
          }
          
          const blob = await response.blob();
          const base64 = await new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = () => reject(new Error('Failed to convert image'));
            reader.readAsDataURL(blob);
          });
          
          return { original: src, base64 };
          
        } catch (error) {
          console.warn(`Failed to convert image ${src}:`, error);
          return { original: src, base64: src };
        }
      });
      
      const convertedImages = await Promise.all(imageConversionPromises);
      
      convertedImages.forEach(({ original, base64 }) => {
        if (original !== base64) {
          const escapedOriginal = escapeRegExp(original);
          htmlContent = htmlContent.replace(
            new RegExp(`src=["']${escapedOriginal}["']`, 'g'),
            `src="${base64}"`
          );
        }
      });
      
      const styles = Array.from(document.querySelectorAll('style, link[rel="stylesheet"]'))
        .map(style => {
          if (style.tagName === 'STYLE') {
            return `<style>${style.innerHTML}</style>`;
          } else {
            const href = style.getAttribute('href');
            if (!href) return '';
            
            if (href.startsWith('/')) {
              return `<link rel="stylesheet" href="${window.location.origin}${href}" />`;
            } else if (href.startsWith('http')) {
              return `<link rel="stylesheet" href="${href}" />`;
            } else {
              return `<link rel="stylesheet" href="${window.location.origin}/${href}" />`;
            }
          }
        })
        .join('');
    
      const completeHTML = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${resumeData.personalInfo.fullName} - Resume</title>
            ${styles}
            <style>
              @import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:wght@400;700&display=swap');
              
              body {
                margin: 0 !important;
                padding: 0 !important;
                background: white !important;
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
              }
              
              .template1-container, .template2-simple {
                width: 210mm !important;
                min-height: 297mm !important;
                box-shadow: none !important;
                margin: 0 auto !important;
                page-break-inside: avoid !important;
              }
              
              img {
                max-width: 100% !important;
                height: auto !important;
              }
              
              * {
                -webkit-print-color-adjust: exact !important;
                color-adjust: exact !important;
              }
              
              .template2-skill {
                background-color: #e0f2fe !important;
                color: #0369a1 !important;
              }
            </style>
          </head>
          <body style="margin: 0; padding: 0; background: white;">
            ${htmlContent}
            <base href="${window.location.origin}/">
          </body>
        </html>
      `;
      
      const fileName = `${resumeData.personalInfo.fullName.replace(/\s+/g, '_')}_Resume.pdf`;
      
      console.log('📦 Sending HTML to AWS Lambda...');
      console.log('HTML length:', completeHTML.length);
      
      // Send to Lambda
      const response = await fetch(PDF_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          html: completeHTML,
          fileName: fileName
        }),
        mode: 'cors'
      });
      
      if (!response.ok) {
        // Try to get error message
        let errorMessage = `Server error: ${response.status}`;
        try {
          const errorData = await response.json();
          errorMessage += ` - ${errorData.message || errorData.error}`;
        } catch {
          // If not JSON, get text
          const errorText = await response.text();
          errorMessage += ` - ${errorText}`;
        }
        throw new Error(errorMessage);
      }
      
      // Lambda returns PDF directly - just download it
      console.log('✅ Received response from Lambda, decoding PDF...');

      const data = await response.json();

      // 1️⃣ Decode base64
      const binary = atob(data.pdf);
      const bytes = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
      }

      // 2️⃣ Create PDF Blob
      const pdfBlob = new Blob([bytes], { type: 'application/pdf' });

      // 3️⃣ Download
      const url = window.URL.createObjectURL(pdfBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = data.fileName || fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      console.log('✅ PDF downloaded successfully!');
      
    } catch (error) {
      console.error('❌ PDF generation failed:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      
      alert(
        `PDF Generation Failed\n\n` +
        `Error: ${errorMessage}\n\n` +
        `1. Check browser console for details\n` +
        `2. Make sure AWS Lambda is running\n` +
        `3. Try with simpler resume content`
      );
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(1, prev + 0.1));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(0.4, prev - 0.1));
  };

  const resetZoom = () => {
    setZoomLevel(deviceOrientation === 'portrait' ? 0.6 : 0.8);
  };

  const toggleFullScreen = () => {
    if (!previewContainerRef.current) return;
    
    if (!isFullScreen) {
      if (previewContainerRef.current.requestFullscreen) {
        previewContainerRef.current.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
    setIsFullScreen(!isFullScreen);
  };

  // Mobile Preview Component
  const MobilePreview = () => (
    <div className="h-full flex flex-col">
      {/* Preview Controls */}
      <div className="flex items-center justify-between px-4 py-3 bg-white border-b sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Smartphone size={16} className="text-gray-500" />
            <span className="text-sm font-medium">Preview</span>
          </div>
          
          <div className="flex items-center gap-1.5 bg-gray-100 rounded-lg px-2 py-1">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={handleZoomOut}
              disabled={zoomLevel <= 0.4}
              className="h-7 w-7"
            >
              <ZoomOut size={14} />
            </Button>
            
            <div className="flex items-center gap-1.5">
              <Maximize2 size={12} className="text-gray-500" />
              <span className="text-xs font-medium min-w-10 text-center">
                {Math.round(zoomLevel * 100)}%
              </span>
            </div>
            
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={handleZoomIn}
              disabled={zoomLevel >= 1}
              className="h-7 w-7"
            >
              <ZoomIn size={14} />
            </Button>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={resetZoom}
            className="h-7 px-2 text-xs"
          >
            Reset
          </Button>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={toggleFullScreen}
                  className="h-7 w-7"
                >
                  <Maximize2 size={14} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{isFullScreen ? 'Exit Fullscreen' : 'Fullscreen'}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      
      {/* Preview Content */}
      <div 
        ref={previewContainerRef}
        className="flex-1 overflow-auto bg-gradient-to-br from-gray-50 to-gray-100 p-4"
      >
        <div className="min-h-full flex items-center justify-center">
          <div 
            className="bg-white shadow-xl rounded-lg overflow-hidden transition-all duration-200"
            style={{
              width: deviceOrientation === 'portrait' ? '90vw' : '70vh',
              transform: `scale(${zoomLevel})`,
              transformOrigin: 'center center',
              boxShadow: '0 10px 40px rgba(0,0,0,0.1)'
            }}
          >
            <ResumePreview 
              data={resumeData} 
              ref={printRef} 
              scale={1}
              templateId={templateId}
            />
          </div>
        </div>
        
        {/* Orientation Hint */}
        {deviceOrientation === 'landscape' && (
          <div className="mt-4 text-center">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 text-xs px-3 py-1.5 rounded-full">
              <span>🔄</span>
              <span>Rotate device for better view</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  // Mobile Editor Component
  const MobileEditor = () => (
    <div className="h-full overflow-y-auto bg-gray-50 p-4 pb-24">
      <div className="max-w-lg mx-auto">
        <div className="mb-6">
          <h2 className="text-xl font-serif font-bold text-gray-900">Edit Your Resume</h2>
          <p className="text-muted-foreground text-sm mt-1">All changes save automatically</p>
        </div>
        
        <div className="mb-6">
          <ATSScoreChecker data={resumeData} compact={true} />
        </div>
        
        <ResumeForm 
          data={resumeData} 
          onChange={setResumeData} 
          templateId={templateId}
          compact={true}
        />
      </div>
    </div>
  );

  // Mobile ATSChecker Component
  const MobileATSChecker = () => (
    <div className="h-full overflow-y-auto bg-gray-50 p-4">
      <div className="max-w-lg mx-auto">
        <div className="mb-6">
          <h2 className="text-xl font-serif font-bold text-gray-900">ATS Score Analysis</h2>
          <p className="text-muted-foreground text-sm mt-1">Optimize for applicant tracking systems</p>
        </div>
        
        <ATSScoreChecker data={resumeData} detailed={true} />
        
        <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-100">
          <h3 className="font-medium text-blue-800 mb-2">💡 Pro Tips</h3>
          <ul className="text-sm text-blue-700 space-y-1.5">
            <li>• Use standard section headings (Experience, Education, Skills)</li>
            <li>• Include keywords from the job description</li>
            <li>• Avoid tables, graphics, and complex formatting</li>
            <li>• Use common fonts (Arial, Times New Roman, Calibri)</li>
          </ul>
        </div>
      </div>
    </div>
  );

  // Mobile Navigation Tabs
  const MobileTabs = () => (
    <div className="flex border-b bg-white">
      <button
        onClick={() => setActiveMobileTab('edit')}
        className={`flex-1 py-3.5 flex flex-col items-center justify-center gap-1 transition-all ${
          activeMobileTab === 'edit' 
            ? 'text-primary border-b-2 border-primary font-semibold bg-blue-50/50' 
            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
        }`}
      >
        <PenLine size={18} className="mb-1" />
        <span className="text-xs font-medium">Edit</span>
      </button>
      
      <button
        onClick={() => setActiveMobileTab('preview')}
        className={`flex-1 py-3.5 flex flex-col items-center justify-center gap-1 transition-all ${
          activeMobileTab === 'preview' 
            ? 'text-primary border-b-2 border-primary font-semibold bg-blue-50/50' 
            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
        }`}
      >
        <Eye size={18} className="mb-1" />
        <span className="text-xs font-medium">Preview</span>
      </button>
      
      <button
        onClick={() => setActiveMobileTab('ats')}
        className={`flex-1 py-3.5 flex flex-col items-center justify-center gap-1 transition-all ${
          activeMobileTab === 'ats' 
            ? 'text-primary border-b-2 border-primary font-semibold bg-blue-50/50' 
            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
        }`}
      >
        <CheckCircle2 size={18} className="mb-1" />
        <span className="text-xs font-medium">ATS Score</span>
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Desktop Header */}
      <header className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50 hidden md:block">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/">
            <div className="flex items-center gap-2 cursor-pointer">
              <div className="h-8 w-8 bg-gray-900 text-white flex items-center justify-center font-serif font-bold rounded">R</div>
              <span className="font-serif font-bold text-xl tracking-tight">Resume<span className="text-gray-500">Builder</span></span>
            </div>
          </Link>
          
          <div className="flex items-center gap-6">
            <nav className="flex items-center gap-4">
              {navigation.map((item) => (
                <Link key={item.name} href={item.href}>
                  <Button variant="ghost" className="font-medium">
                    {item.name}
                  </Button>
                </Link>
              ))}
            </nav>

            <Button 
              onClick={handleDownloadPDF} 
              variant="default" 
              className="gap-2"
              disabled={isGeneratingPDF}
            >
              {isGeneratingPDF ? (
                <>
                  <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span className="hidden sm:inline">Generating PDF...</span>
                </>
              ) : (
                <>
                  <Download size={16} />
                  <span className="hidden sm:inline">Download PDF</span>
                </>
              )}
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Header */}
      <header className="border-b bg-white sticky top-0 z-50 md:hidden">
        <div className="px-4 h-14 flex items-center justify-between">
          <Link href="/">
            <div className="flex items-center gap-2 cursor-pointer">
              <div className="h-7 w-7 bg-gray-900 text-white flex items-center justify-center font-serif font-bold rounded text-sm">R</div>
              <span className="font-serif font-bold text-lg tracking-tight">Resume<span className="text-gray-500">Builder</span></span>
            </div>
          </Link>
          
          <div className="flex items-center gap-3">
            <Button 
              onClick={handleDownloadPDF} 
              variant="default" 
              size="sm"
              className="gap-1.5"
              disabled={isGeneratingPDF}
            >
              {isGeneratingPDF ? (
                <div className="h-3 w-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <Download size={14} />
                  <span className="hidden xs:inline">PDF</span>
                </>
              )}
            </Button>
            
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="h-8 w-8">
                  <Menu size={16} />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-64">
                <div className="flex flex-col h-full">
                  <div className="mb-6">
                    <h3 className="font-serif font-bold text-lg">Menu</h3>
                  </div>
                  <nav className="flex-1">
                    {navigation.map((item) => (
                      <Link key={item.name} href={item.href}>
                        <Button 
                          variant="ghost" 
                          className="w-full justify-start font-medium mb-1"
                        >
                          {item.name}
                        </Button>
                      </Link>
                    ))}
                  </nav>
                  <div className="pt-4 border-t">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Monitor size={14} />
                      <span>Switch to desktop for full features</span>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <main className="flex-1 h-[calc(100vh-64px)] overflow-hidden">
        {/* Desktop Layout */}
        <div className="hidden md:block h-full">
          <ResizablePanelGroup direction="horizontal">
            <ResizablePanel defaultSize={40} minSize={30} maxSize={60} className="bg-gray-50">
              <div className="h-full overflow-y-auto p-6">
                <div className="max-w-2xl mx-auto">
                  <div className="mb-6">
                    <h2 className="text-2xl font-serif font-bold text-gray-900">Editor</h2>
                    <p className="text-muted-foreground text-sm">Update your information below</p>
                  </div>
                  <div className="mb-6">
                    <ATSScoreChecker data={resumeData} />
                  </div>
                  <ResumeForm data={resumeData} onChange={setResumeData} templateId={templateId} />
                </div>
              </div>
            </ResizablePanel>
            
            <ResizableHandle withHandle />
            
            <ResizablePanel defaultSize={60} className="bg-gray-200/50">
              <div className="h-full overflow-y-auto p-8 flex justify-center items-start">
                <ResumePreview data={resumeData} ref={printRef} scale={1} templateId={templateId} />
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden h-full flex flex-col">
          {/* Mobile Tabs */}
          <MobileTabs />

          {/* Mobile Content */}
          <div className="flex-1 overflow-hidden">
            {activeMobileTab === 'edit' && <MobileEditor />}
            {activeMobileTab === 'preview' && <MobilePreview />}
            {activeMobileTab === 'ats' && <MobileATSChecker />}
          </div>

          {/* Mobile Bottom Action Bar */}
          <div className="border-t bg-white px-4 py-3 flex items-center justify-between">
            <div className="text-xs text-gray-500">
              {activeMobileTab === 'edit' && 'Tap fields to edit'}
              {activeMobileTab === 'preview' && 'Pinch to zoom • Double tap to reset'}
              {activeMobileTab === 'ats' && 'Higher score = better chances'}
            </div>
            
            <Button 
              onClick={handleDownloadPDF}
              size="sm"
              className="gap-2"
              disabled={isGeneratingPDF}
            >
              {isGeneratingPDF ? (
                <>
                  <div className="h-3 w-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <Download size={14} />
                  <span>Download PDF</span>
                </>
              )}
            </Button>
          </div>

          {/* Mobile Tips (Shows briefly on load) */}
          {showMobileTips && (
            <div className="absolute bottom-16 left-4 right-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white p-3 rounded-lg shadow-lg animate-in slide-in-from-bottom">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles size={16} />
                  <span className="text-sm font-medium">Tip: Swipe between tabs to navigate</span>
                </div>
                <button 
                  onClick={() => setShowMobileTips(false)}
                  className="text-white/80 hover:text-white"
                >
                  ✕
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
