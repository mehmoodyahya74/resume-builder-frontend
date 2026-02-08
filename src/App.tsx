import { Switch, Route, useLocation } from "wouter";
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
import { useEffect, useState } from "react";

// SEO Component
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
    document.title = title;
    
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', description);
    
    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement('link');
      linkCanonical.setAttribute('rel', 'canonical');
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute('href', canonical || "https://www.resumecon.xyz/");
  }, [title, description, canonical]);
  
  return <>{children}</>;
};

// Protected Builder Component - Only accessible via state
function ProtectedBuilder() {
  const [location, setLocation] = useLocation();
  const [isValidAccess, setIsValidAccess] = useState(false);

  useEffect(() => {
    // Check if user came from a valid flow (e.g., selected a template)
    // You can use localStorage, sessionStorage, or context to validate
    const hasValidAccess = localStorage.getItem('resumeBuilderAccess') === 'true';
    
    if (!hasValidAccess) {
      // Redirect to homepage if trying to access directly
      setLocation('/');
    } else {
      setIsValidAccess(true);
      // Clear the access flag after use
      localStorage.removeItem('resumeBuilderAccess');
    }
  }, [setLocation]);

  if (!isValidAccess) {
    return null; // Or a loading spinner
  }

  return (
    <PageWithSEO
      title="Build Your Free Resume Online | ATS-Friendly Resume Maker 2026"
      description="Build your resume step-by-step with our free online resume builder. Get AI suggestions, real-time preview, and download instantly. 50+ templates available."
      canonical="https://www.resumecon.xyz/builder"
    >
      <ResumeBuilder />
    </PageWithSEO>
  );
}

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
      
      {/* ADD BACK THE BUILDER ROUTE - This fixes 404 on template click */}
      <Route path="/builder">
  {() => {
    // Check if URL has template parameter
    const hasTemplateParam = window.location.search.includes('template=');
    
    if (hasTemplateParam) {
      return (
        <PageWithSEO
          title="Build Your Free Resume Online | ATS-Friendly Resume Maker 2026"
          description="Build your resume step-by-step..."
          canonical="https://www.resumecon.xyz/builder"
        >
          <ResumeBuilder />
        </PageWithSEO>
      );
    } else {
      // Direct access without template parameter - show 404
      return <NotFound />;
    }
  }}
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
