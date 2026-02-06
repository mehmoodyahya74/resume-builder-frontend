import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import ResumeBuilder from "@/pages/ResumeBuilder";
import LandingPage from "@/pages/LandingPage";
import AboutUs from "@/pages/AboutUs";
import Contact from "@/pages/Contact";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import TemplateSelection from "@/pages/templates";
import Blog from "@/pages/Blog";
import BlogPost from "@/pages/BlogPost";
import NotFound from "@/pages/NotFound";
import { useEffect } from "react";

// SEO Component WITHOUT react-helmet (temporary fix)
const PageWithSEO = ({ 
  children, 
  title, 
  description, 
  canonical 
}: { 
  children: React.ReactNode;
  title: string;
  description: string;
  canonical?: string;
}) => {
  useEffect(() => {
    // Update title
    document.title = title;
    
    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', description);
    
    // Update canonical
    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement('link');
      linkCanonical.setAttribute('rel', 'canonical');
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute('href', canonical || "https://www.resumecon.xyz/");
    
    // Update OG tags
    const updateMetaTag = (property: string, content: string) => {
      let meta = document.querySelector(`meta[property="${property}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('property', property);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };
    
    updateMetaTag('og:title', title);
    updateMetaTag('og:description', description);
    updateMetaTag('og:url', canonical || "https://www.resumecon.xyz/");
  }, [title, description, canonical]);
  
  return <>{children}</>;
};

function Router() {
  return (
    <Switch>
      <Route path="/">
        <PageWithSEO
          title="100% Free Resume Builder 2026 | Create ATS-Friendly Resumes in 7 Minutes"
          description="Build your perfect resume FREE in 2026. Choose from 50+ ATS-optimized templates, AI-powered suggestions, download PDF instantly. No credit card required."
          canonical="https://www.resumecon.xyz/"
        >
          <LandingPage />
        </PageWithSEO>
      </Route>
      
      <Route path="/builder">
        <PageWithSEO
          title="Build Your Free Resume Online | ATS-Friendly Resume Maker 2026"
          description="Build your resume step-by-step with our free online resume builder. Get AI suggestions, real-time preview, and download instantly. 50+ templates available."
          canonical="https://www.resumecon.xyz/builder"
        >
          <ResumeBuilder />
        </PageWithSEO>
      </Route>
      
      <Route path="/templates">
        <PageWithSEO
          title="50+ Free Resume Templates 2026 | ATS-Optimized Professional Designs"
          description="Browse 50+ professional resume templates for 2026. All templates ATS-optimized, free to use, and designed to land more interviews."
          canonical="https://www.resumecon.xyz/templates"
        >
          <TemplateSelection />
        </PageWithSEO>
      </Route>
      
      <Route path="/blog">
        <PageWithSEO
          title="Resume Tips & Career Advice Blog | Resume Con"
          description="Get expert resume tips, career advice, and job search strategies. Learn how to create ATS-friendly resumes that get interviews."
          canonical="https://www.resumecon.xyz/blog"
        >
          <Blog />
        </PageWithSEO>
      </Route>
      
      <Route path="/how-to-make-a-professional-resume-2026">
        <PageWithSEO
          title="How to Make a Professional Resume in 2026 | Step-by-Step Guide"
          description="Complete guide to creating a professional resume in 2026. Learn ATS optimization, formatting tips, and what recruiters look for."
          canonical="https://www.resumecon.xyz/how-to-make-a-professional-resume-2026"
        >
          <BlogPost />
        </PageWithSEO>
      </Route>
      
      <Route path="/about">
        <PageWithSEO
          title="About Resume Con | Free Resume Builder Since 2024"
          description="Learn about Resume Con - the 100% free resume builder helping 85,000+ professionals create ATS-friendly resumes and land dream jobs."
          canonical="https://www.resumecon.xyz/about"
        >
          <AboutUs />
        </PageWithSEO>
      </Route>
      
      <Route path="/contact">
        <PageWithSEO
          title="Contact Resume Con | Free Resume Builder Support"
          description="Get help with our free resume builder or contact our team. We're here to help you create the perfect resume for your job search."
          canonical="https://www.resumecon.xyz/contact"
        >
          <Contact />
        </PageWithSEO>
      </Route>
      
      <Route path="/privacy">
        <PageWithSEO
          title="Privacy Policy | Resume Con Free Resume Builder"
          description="Privacy policy for Resume Con. We respect your privacy - our free resume builder doesn't store personal data without consent."
          canonical="https://www.resumecon.xyz/privacy"
        >
          <PrivacyPolicy />
        </PageWithSEO>
      </Route>
      
      <Route>
        <PageWithSEO
          title="Page Not Found | Resume Con"
          description="The page you're looking for doesn't exist. Return to our free resume builder to create your perfect resume."
          canonical="https://www.resumecon.xyz/404"
        >
          <NotFound />
        </PageWithSEO>
      </Route>
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
