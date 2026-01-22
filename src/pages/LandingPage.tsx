import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  PenLine, 
  FileText, 
  Menu, 
  X, 
  Sparkles,
  Zap,
  Award,
  Users,
  TrendingUp,
  Clock,
  Shield,
  Globe,
  ArrowRight,
  ChevronRight,
  Play,
  Eye,
  Edit3,
  FileCode,
  BarChart3,
  Rocket,
  Phone,
  Mail,
  Linkedin,
  Twitter,
  Github,
  Heart,
  Star,
  CheckCircle,
  Briefcase,
  GraduationCap,
  MapPin,
  Calendar,
  Wand2,
  Target,
  Zap as Lightning,
  Timer,
  Lock,
  ShieldCheck
} from 'lucide-react';
import { Link } from 'wouter';

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [stats, setStats] = useState({ resumes: 0, users: 0, success: 0 });
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const targetStats = { resumes: 125000, users: 85000, success: 94 };
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;
    
    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      
      setStats({
        resumes: Math.floor(targetStats.resumes * progress),
        users: Math.floor(targetStats.users * progress),
        success: Math.floor(targetStats.success * progress)
      });
      
      if (step >= steps) clearInterval(timer);
    }, interval);
    
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 4);
    }, 4000);
    
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: <FileCode className="h-6 w-6" />,
      title: 'ATS Optimized',
      description: 'Every template passes through Applicant Tracking Systems used by 95% of Fortune 500 companies',
      color: 'bg-blue-500',
    },
    {
      icon: <Edit3 className="h-6 w-6" />,
      title: 'AI-Powered',
      description: 'Get intelligent recommendations for skills, phrasing, and formatting',
      color: 'bg-purple-500',
    },
    {
      icon: <Eye className="h-6 w-6" />,
      title: 'Live Preview',
      description: 'See real-time changes as you build. What you see is what you get',
      color: 'bg-green-500',
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: 'Analytics',
      description: 'Track resume performance and get insights on improvement areas',
      color: 'bg-orange-500',
    },
  ];

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Product Manager',
      company: 'Google',
      content: 'Landed 3 interviews in a week. The AI suggestions were incredibly helpful!',
      avatar: 'S',
      rating: 5,
    },
    {
      name: 'Michael Rodriguez',
      role: 'Senior Developer',
      company: 'Microsoft',
      content: 'Best resume builder I\'ve used. The ATS optimization actually works.',
      avatar: 'M',
      rating: 5,
    },
    {
      name: 'Jessica Williams',
      role: 'Marketing Director',
      company: 'Apple',
      content: 'From generic to outstanding in 20 minutes. The templates are gorgeous.',
      avatar: 'J',
      rating: 4,
    },
  ];

  const statsCards = [
    { icon: <Users className="h-5 w-5" />, value: `${stats.users.toLocaleString()}+`, label: 'Active Users' },
    { icon: <FileText className="h-5 w-5" />, value: `${stats.resumes.toLocaleString()}+`, label: 'Resumes Created' },
    { icon: <TrendingUp className="h-5 w-5" />, value: `${stats.success}%`, label: 'Interview Success' },
    { icon: <Globe className="h-5 w-5" />, value: '150+', label: 'Countries' },
  ];

  const processSteps = [
    {
      number: '01',
      title: 'Choose Template',
      description: 'Select from 50+ professional templates for different industries',
      icon: <FileText className="h-8 w-8" />,
      color: 'bg-blue-500',
      time: '1 min',
    },
    {
      number: '02',
      title: 'AI-Powered Fill',
      description: 'Our AI analyzes your profile and suggests optimal content',
      icon: <Wand2 className="h-8 w-8" />,
      color: 'bg-purple-500',
      time: '3 mins',
    },
    {
      number: '03',
      title: 'ATS Optimization',
      description: 'Get instant feedback on ATS compatibility and keywords',
      icon: <Target className="h-8 w-8" />,
      color: 'bg-green-500',
      time: '2 mins',
    },
    {
      number: '04',
      title: 'Download & Apply',
      description: 'Export in PDF or Word and start applying immediately',
      icon: <Rocket className="h-8 w-8" />,
      color: 'bg-orange-500',
      time: '1 min',
    },
  ];

  const benefits = [
    {
      icon: <Timer className="h-6 w-6" />,
      title: 'Save 5+ Hours',
      description: 'What takes hours manually takes minutes with our AI',
      stat: '85% faster',
    },
    {
      icon: <Lightning className="h-6 w-6" />,
      title: '3x More Interviews',
      description: 'Professionally designed resumes get noticed',
      stat: '300% increase',
    },
    {
      icon: <Award className="h-6 w-6" />,
      title: 'Higher Offers',
      description: 'Better resumes lead to better negotiation power',
      stat: 'Avg. +$15K',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b bg-white sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/">
            <div className="flex items-center gap-2 cursor-pointer">
              <div className="h-8 w-8 bg-gray-900 text-white flex items-center justify-center font-bold rounded-lg">
                R
              </div>
              <span className="font-bold text-xl text-gray-900">
                Resume<span className="text-gray-600">Builder</span>
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-2">
            <nav className="hidden md:flex items-center gap-1">
              <Link href="/templates">
                <Button variant="ghost" className="font-medium hover:bg-gray-100 text-sm">
                  Templates
                </Button>
              </Link>
              <Link href="/about">
                <Button variant="ghost" className="font-medium hover:bg-gray-100 text-sm">About Us</Button>
              </Link>
              <Link href="/contact">
                <Button variant="ghost" className="font-medium hover:bg-gray-100 text-sm">Contact</Button>
              </Link>
              <Link href="/privacy">
                <Button variant="ghost" className="font-medium hover:bg-gray-100 text-sm">Privacy Policy</Button>
              </Link>
            </nav>

            {/* Start Free button - hidden on mobile, visible on desktop */}
            <div className="hidden md:block">
              <Link href="/templates">
                <Button className="gap-2 bg-gray-900 hover:bg-gray-800 text-sm">
                  <PenLine size={16} />
                  Start Free
                  <ArrowRight size={16} />
                </Button>
              </Link>
            </div>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden hover:bg-gray-100"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t shadow-lg animate-in slide-in-from-top-5">
            <div className="container mx-auto px-4 py-4 space-y-1">
              <Link href="/templates">
                <Button 
                  variant="ghost" 
                  className="w-full justify-start font-medium hover:bg-gray-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Templates
                </Button>
              </Link>
              <Link href="/about">
                <Button 
                  variant="ghost" 
                  className="w-full justify-start font-medium hover:bg-gray-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  About Us
                </Button>
              </Link>
              <Link href="/contact">
                <Button 
                  variant="ghost" 
                  className="w-full justify-start font-medium hover:bg-gray-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contact
                </Button>
              </Link>
              <Link href="/privacy">
                <Button 
                  variant="ghost" 
                  className="w-full justify-start font-medium hover:bg-gray-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Privacy Policy
                </Button>
              </Link>
            </div>
          </div>
        )}
      </header>

      <section className="relative py-8 md:py-12">
        <div className="absolute inset-0 bg-gray-50" />
        
        <div className="container mx-auto px-4 relative">
          <div className="grid lg:grid-cols-2 items-center gap-8 max-w-6xl mx-auto">
            <div className="text-center lg:text-left">
              <Badge className="mb-4 bg-blue-100 text-blue-700 border-blue-200">
                <Sparkles size={12} className="mr-2" />
                Trusted by 85,000+ Professionals
              </Badge>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-snug">
                <span className="block">
                  Create a Professional
                </span>
                <span className="block text-blue-600">
                  CV in Minutes
                </span>
              </h1>
              
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Build an ATS-friendly resume that employers love. Simple, fast, and built for local job markets.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link href="/templates">
                  <Button size="lg" className="h-14 px-8 text-base bg-gray-900 hover:bg-gray-800 shadow-lg gap-3">
                    <Rocket size={20} />
                    Create My CV
                    <ArrowRight size={20} />
                  </Button>
                </Link>
                <Link href="/templates">
                  <Button size="lg" variant="outline" className="h-14">
                    View Templates
                  </Button>
                </Link>
              </div>

              <div className="grid grid-cols-3 gap-4 max-w-md">
                <div className="text-center p-3 bg-white rounded-lg border">
                  <div className="text-xl font-bold text-gray-900">94%</div>
                  <div className="text-xs text-gray-600">Success Rate</div>
                </div>
                <div className="text-center p-3 bg-white rounded-lg border">
                  <div className="text-xl font-bold text-gray-900">7 min</div>
                  <div className="text-xs text-gray-600">Average Time</div>
                </div>
                <div className="text-center p-3 bg-white rounded-lg border">
                  <div className="text-xl font-bold text-gray-900">50+</div>
                  <div className="text-xs text-gray-600">Templates</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
                <div className="p-4 sm:p-6">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="h-12 w-12 bg-blue-500 rounded-lg flex items-center justify-center">
                      <Briefcase className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">Alex Morgan</h3>
                      <p className="text-blue-600 font-medium text-sm">Senior Product Manager</p>
                      <div className="flex items-center gap-1 text-xs text-gray-600 mt-1">
                        <MapPin className="h-3 w-3" />
                        <span>San Francisco, CA</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <GraduationCap className="h-4 w-4 text-gray-500" />
                        <h4 className="font-semibold text-gray-900 text-sm">Education</h4>
                      </div>
                      <div className="pl-6">
                        <p className="font-medium text-gray-900 text-sm">Stanford University</p>
                        <p className="text-xs text-gray-600">MBA, Business Administration</p>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Briefcase className="h-4 w-4 text-gray-500" />
                        <h4 className="font-semibold text-gray-900 text-sm">Experience</h4>
                      </div>
                      <div className="pl-6 space-y-3">
                        <div>
                          <p className="font-medium text-gray-900 text-sm">Lead Product Manager</p>
                          <p className="text-xs text-gray-600">Google • Mountain View, CA</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm mb-2">Skills</h4>
                      <div className="flex flex-wrap gap-1">
                        {['Product Strategy', 'User Research', 'Data Analysis'].map((skill, idx) => (
                          <span key={idx} className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 border-t p-3">
                  <div className="flex items-center justify-between">
                    <Badge className="bg-green-100 text-green-700 border-green-200">
                      <CheckCircle size={12} className="mr-1" />
                      ATS Score: 98%
                    </Badge>
                    <div className="flex items-center gap-1 text-xs text-gray-600">
                      <div className="h-4 w-4 bg-gray-900 rounded flex items-center justify-center text-white text-xs font-bold">
                        R
                      </div>
                      <span>ResumeBuilder</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Create Your Perfect Resume in <span className="text-blue-600">7 Minutes</span>
            </h2>
            <p className="text-gray-600">
              From blank page to interview-ready in less time than a coffee break
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto mb-12">
            {processSteps.map((step, index) => (
              <div 
                key={index}
                className={`relative p-4 rounded-xl border transition-all duration-300 ${
                  activeStep === index 
                    ? 'border-blue-500 bg-white shadow-md' 
                    : 'border-gray-200 bg-white'
                }`}
                onMouseEnter={() => setActiveStep(index)}
              >
                <div className={`h-12 w-12 rounded-lg ${step.color} flex items-center justify-center mb-4 text-white`}>
                  {step.icon}
                </div>
                
                <div className="text-sm font-semibold text-gray-500 mb-1">Step {step.number}</div>
                <h3 className="font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-sm text-gray-600 mb-3">{step.description}</p>
                
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Clock size={12} />
                    <span>{step.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-2xl p-6 md:p-8 max-w-4xl mx-auto border">
            <div className="grid md:grid-cols-3 gap-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="text-center">
                  <div className={`h-12 w-12 ${index === 0 ? 'bg-blue-500' : index === 1 ? 'bg-purple-500' : 'bg-green-500'} rounded-lg flex items-center justify-center mx-auto mb-3`}>
                    <div className="text-white">
                      {benefit.icon}
                    </div>
                  </div>
                  <div className="text-xl font-bold text-gray-900 mb-1">{benefit.stat}</div>
                  <h4 className="font-semibold text-gray-900 mb-1">{benefit.title}</h4>
                  <p className="text-gray-600 text-sm">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 md:py-12 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {statsCards.map((stat, index) => (
              <div 
                key={index}
                className="text-center p-4 bg-white/5 rounded-xl border border-white/10"
              >
                <div className="flex justify-center mb-3">
                  <div className="p-2 bg-white/10 rounded-full">
                    {stat.icon}
                  </div>
                </div>
                <div className="text-2xl md:text-3xl font-bold mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Why Choose ResumeBuilder
            </h2>
            <p className="text-gray-600">
              Built with technology to give you an advantage
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <Card 
                key={index}
                className="border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow"
              >
                <CardContent className="p-6">
                  <div className={`w-12 h-12 rounded-lg ${feature.color} flex items-center justify-center mb-4 text-white`}>
                    {feature.icon}
                  </div>
                  <h3 className="font-bold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Trusted by Professionals
            </h2>
            <p className="text-gray-600">
              See what professionals from leading companies say
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card 
                key={index}
                className="border border-gray-200 bg-white"
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                    </div>
                  </div>
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} size={16} className="text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 text-sm mb-4">"{testimonial.content}"</p>
                  <div className="text-sm text-gray-500">
                    {testimonial.company}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-6 bg-white/10 text-white border-white/20">
              <ShieldCheck size={12} className="mr-2" />
              Secure & Trusted
            </Badge>
            <h2 className="text-2xl md:text-4xl font-bold text-white mb-6">
              Ready to Transform Your Career?
            </h2>
            <p className="text-lg text-gray-300 mb-8">
              Join thousands who got interviews with our AI-optimized resumes
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/templates">
                <Button size="lg" className="h-14 px-8 bg-white text-gray-900 hover:bg-gray-100 gap-3">
                  <Sparkles size={20} />
                  Start Building Free
                  <ArrowRight size={20} />
                </Button>
              </Link>
              <Link href="/templates">
                <Button size="lg" variant="outline" className="h-14 border-white text-white hover:bg-white/10">
                  View All Templates
                </Button>
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <Lock size={12} />
                <span>SSL Secured</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield size={12} />
                <span>GDPR Compliant</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle size={12} />
                <span>No Credit Card Required</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-white pt-8 md:pt-12 pb-8">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-10 w-10 bg-white text-gray-900 flex items-center justify-center font-bold rounded-lg">
                  R
                </div>
                <div>
                  <span className="font-bold text-2xl">Resume<span className="text-gray-400">Builder</span></span>
                </div>
              </div>
              <p className="text-gray-400 mb-6 max-w-md">
                The world's most advanced resume builder. Helping professionals land dream jobs since 2020.
              </p>
              <div className="flex gap-3">
                <Button variant="outline" size="icon" className="border-gray-700 hover:border-gray-600 hover:bg-gray-800">
                  <Twitter size={18} />
                </Button>
                <Button variant="outline" size="icon" className="border-gray-700 hover:border-gray-600 hover:bg-gray-800">
                  <Linkedin size={18} />
                </Button>
                <Button variant="outline" size="icon" className="border-gray-700 hover:border-gray-600 hover:bg-gray-800">
                  <Github size={18} />
                </Button>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <div className="space-y-2">
                <Link href="/about">
                  <Button variant="link" className="text-gray-400 hover:text-white p-0 h-auto text-left block">
                    About Us
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="link" className="text-gray-400 hover:text-white p-0 h-auto text-left block mt-2">
                    Contact
                  </Button>
                </Link>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <div className="space-y-2">
                <Link href="privacy">
                  <Button variant="link" className="text-gray-400 hover:text-white p-0 h-auto text-left">
                    Privacy Policy
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-gray-500 text-sm">
                © 2024 ResumeBuilder. All rights reserved.
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span>Made with <Heart size={12} className="inline text-red-500" /> for job seekers</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
