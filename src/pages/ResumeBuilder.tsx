import React, { useState, useRef } from 'react';
import { useSearchParams } from 'wouter';
import { ResumeForm } from '@/components/resume/ResumeForm';
import { ResumePreview } from '@/components/resume/ResumePreview';
import { ATSScoreChecker } from '@/components/resume/ATSScoreChecker';
import { initialResumeData } from '@/data/initialResume';
import { ResumeData } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Download, Eye, PenLine, ZoomIn, ZoomOut, Maximize } from 'lucide-react';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import { Link } from 'wouter';

export default function ResumeBuilder() {
  const [params] = useSearchParams();
  const templateId = params.get('template') || 'template1';
  const [resumeData, setResumeData] = useState<ResumeData>(initialResumeData);
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');
  const [zoomLevel, setZoomLevel] = useState(0.65);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);

  const PDF_API_URL = 'http://localhost:5000/generate-pdf';

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Blog', href: '/blog' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Privacy Policy', href: '/privacy' },
  ];

  // Helper function to escape regex special characters
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
      
      // 1. Get the HTML content
      let htmlContent = element.innerHTML;
      
      // 2. Find all images in the HTML
      const imgTags = htmlContent.match(/<img[^>]+src="([^">]+)"/g) || [];
      console.log('Found img tags:', imgTags.length);
      
      // 3. Create a set of unique image sources
      const imageSrcs = new Set<string>();
      imgTags.forEach(tag => {
        const match = tag.match(/src="([^"]+)"/);
        if (match && match[1]) {
          const src = match[1];
          
          // Only process if it's NOT a base64 image (uploaded images are already base64)
          if (!src.startsWith('data:image/')) {
            imageSrcs.add(src);
          }
        }
      });
      
      console.log('Images to convert:', Array.from(imageSrcs));
      
      // 4. Convert each non-base64 image to base64
      const imageConversionPromises = Array.from(imageSrcs).map(async (src) => {
        try {
          // Skip external URLs and data URLs
          if (src.startsWith('http://') || src.startsWith('https://') || src.startsWith('data:')) {
            return { original: src, base64: src };
          }
          
          // Handle relative paths
          let imageUrl = src;
          if (src.startsWith('/')) {
            imageUrl = window.location.origin + src;
          } else if (src.startsWith('./')) {
            imageUrl = window.location.origin + src.substring(1);
          }
          
          console.log(`Converting: ${src} -> ${imageUrl}`);
          
          // Fetch and convert to base64
          const response = await fetch(imageUrl);
          if (!response.ok) {
            console.warn(`Failed to fetch ${imageUrl}: ${response.status}`);
            return { original: src, base64: src }; // Keep original as fallback
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
          return { original: src, base64: src }; // Keep original as fallback
        }
      });
      
      // Wait for all conversions
      const convertedImages = await Promise.all(imageConversionPromises);
      
      // 5. Replace all image sources in HTML
      convertedImages.forEach(({ original, base64 }) => {
        if (original !== base64) {
          const escapedOriginal = escapeRegExp(original);
          htmlContent = htmlContent.replace(
            new RegExp(`src=["']${escapedOriginal}["']`, 'g'),
            `src="${base64}"`
          );
        }
      });
      
      // 6. Get all CSS styles
      const styles = Array.from(document.querySelectorAll('style, link[rel="stylesheet"]'))
        .map(style => {
          if (style.tagName === 'STYLE') {
            return `<style>${style.innerHTML}</style>`;
          } else {
            const href = style.getAttribute('href');
            if (!href) return '';
            
            // Make CSS URLs absolute
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
      
      // 7. Create complete HTML document
      const completeHTML = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${resumeData.personalInfo.fullName} - Resume</title>
            ${styles}
            <style>
              /* Critical CSS for PDF */
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
              
              /* Ensure background colors print */
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
      
      console.log('📦 Sending HTML to PDF server...');
      
      // 8. Send to backend
      const response = await fetch(PDF_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          html: completeHTML,
          fileName: fileName
        }),
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Server error: ${response.status} - ${errorText}`);
      }
      
      // 9. Download PDF
      const pdfBlob = await response.blob();
      const url = window.URL.createObjectURL(pdfBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      
      // 10. Clean up
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      console.log('✅ PDF generated successfully!');
      
    } catch (error) {
      console.error('❌ PDF generation failed:', error);
      alert(
        `Failed to generate PDF:\n\n` +
        `1. Make sure backend server is running on ${PDF_API_URL}\n` +
        `2. Check that Chrome is installed\n` +
        `3. Check browser console for details`
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

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/">
            <div className="flex items-center gap-2 cursor-pointer">
              <div className="h-8 w-8 bg-gray-900 text-white flex items-center justify-center font-serif font-bold rounded">R</div>
              <span className="font-serif font-bold text-xl tracking-tight">Resume<span className="text-gray-500">Builder</span></span>
            </div>
          </Link>
          
          <div className="flex items-center gap-6">
            <nav className="hidden md:flex items-center gap-4">
              {navigation.map((item) => (
                <Link key={item.name} href={item.href}>
                  <Button variant="ghost" className="font-medium">
                    {item.name}
                  </Button>
                </Link>
              ))}
            </nav>

            <div className="md:hidden flex bg-muted rounded-lg p-1 mr-2">
              <button 
                onClick={() => setActiveTab('edit')}
                className={`p-2 rounded-md transition-all ${activeTab === 'edit' ? 'bg-white shadow-sm' : 'text-muted-foreground'}`}
              >
                <PenLine size={18} />
              </button>
              <button 
                onClick={() => setActiveTab('preview')}
                className={`p-2 rounded-md transition-all ${activeTab === 'preview' ? 'bg-white shadow-sm' : 'text-muted-foreground'}`}
              >
                <Eye size={18} />
              </button>
            </div>
            
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

      <main className="flex-1 h-[calc(100vh-64px)] overflow-hidden">
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

        <div className="md:hidden h-full flex flex-col bg-gray-50">
          {activeTab === 'edit' ? (
            <div className="flex-1 overflow-y-auto p-4 pb-20">
              <div className="mb-6">
                <h2 className="text-2xl font-serif font-bold text-gray-900">Editor</h2>
                <p className="text-muted-foreground text-sm">Update your information below</p>
              </div>
              <div className="mb-6">
                <ATSScoreChecker data={resumeData} />
              </div>
              <ResumeForm data={resumeData} onChange={setResumeData} />
            </div>
          ) : (
            <>
              <div className="flex items-center justify-center px-4 py-3 bg-white border-b gap-4">
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={handleZoomOut}
                  disabled={zoomLevel <= 0.4}
                  className="h-8 w-8"
                >
                  <ZoomOut size={14} />
                </Button>
                
                <div className="flex items-center gap-2 px-3">
                  <Maximize size={14} className="text-gray-500" />
                  <span className="text-sm font-medium min-w-10 text-center">
                    {Math.round(zoomLevel * 100)}%
                  </span>
                </div>
                
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={handleZoomIn}
                  disabled={zoomLevel >= 1}
                  className="h-8 w-8"
                >
                  <ZoomIn size={14} />
                </Button>
              </div>
              
              <div className="flex-1 overflow-auto">
                <ResumePreview data={resumeData} ref={printRef} scale={zoomLevel} templateId={templateId} />
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}