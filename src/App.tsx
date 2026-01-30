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
import NotFound from "@/pages/NotFound";

function Router() {
  return (
    <Switch>
      <Route path="/" component={LandingPage} />
      <Route path="/builder" component={ResumeBuilder} />
      <Route path="/templates" component={TemplateSelection} />
      <Route path="/about" component={AboutUs} />
      <Route path="/contact" component={Contact} />
      <Route path="/privacy" component={PrivacyPolicy} />
      <Route component={NotFound} />
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
