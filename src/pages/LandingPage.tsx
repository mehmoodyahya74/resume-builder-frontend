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
  Timer
} from 'lucide-react';
import { Link } from 'wouter';

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [stats, setStats] = useState({ resumes: 0, users: 0, success: 0 });
  const [activeStep, setActiveStep] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);

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
    const handleParallax = () => {
      if (heroRef.current) {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        heroRef.current.style.transform = `translate3d(0, ${rate}px, 0)`;
      }
    };

    window.addEventListener('scroll', handleParallax);
    return () => window.removeEventListener('scroll', handleParallax);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 4);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: <FileCode className="h-6 w-6" />,
      title: 'ATS Optimized',
      description: 'Every template passes through Applicant Tracking Systems used by 95% of Fortune 500 companies',
      color: 'bg-linear-to-br from-blue-500 to-cyan-500',
    },
    {
      icon: <Edit3 className="h-6 w-6" />,
      title: 'AI-Powered Suggestions',
      description: 'Get intelligent recommendations for skills, phrasing, and formatting',
      color: 'bg-linear-to-br from-purple-500 to-pink-500',
    },
    {
      icon: <Eye className="h-6 w-6" />,
      title: 'Live Preview',
      description: 'See real-time changes as you build. What you see is what you get',
      color: 'bg-linear-to-br from-green-500 to-emerald-500',
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: 'Analytics Dashboard',
      description: 'Track resume performance and get insights on improvement areas',
      color: 'bg-linear-to-br from-orange-500 to-red-500',
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
      rating: 5,
    },
  ];

  const statsCards = [
    { icon: <Users className="h-5 w-5" />, value: `${stats.users.toLocaleString()}+`, label: 'Active Users' },
    { icon: <FileText className="h-5 w-5" />, value: `${stats.resumes.toLocaleString()}+`, label: 'Resumes Created' },
    { icon: <TrendingUp className="h-5 w-5" />, value: `${stats.success}%`, label: 'Interview Success Rate' },
    { icon: <Globe className="h-5 w-5" />, value: '150+', label: 'Countries' },
  ];

  const processSteps = [
    {
      number: '01',
      title: 'Choose Your Template',
      description: 'Select from 50+ professionally designed templates optimized for different industries',
      icon: <FileText className="h-8 w-8" />,
      color: 'from-blue-500 to-cyan-500',
      time: '1 min',
    },
    {
      number: '02',
      title: 'AI-Powered Fill',
      description: 'Our AI analyzes your profile and suggests optimal content for each section',
      icon: <Wand2 className="h-8 w-8" />,
      color: 'from-purple-500 to-pink-500',
      time: '3 mins',
    },
    {
      number: '03',
      title: 'ATS Optimization',
      description: 'Get instant feedback on ATS compatibility and keyword optimization',
      icon: <Target className="h-8 w-8" />,
      color: 'from-green-500 to-emerald-500',
      time: '2 mins',
    },
    {
      number: '04',
      title: 'Download & Apply',
      description: 'Export in multiple formats (PDF, Word) and start applying immediately',
      icon: <Rocket className="h-8 w-8" />,
      color: 'from-orange-500 to-red-500',
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
    <div className="min-h-screen bg-linear-to-b from-gray-50 via-white to-gray-50">
      <header className="border-b bg-white/90 backdrop-blur-md sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/">
            <div className="flex items-center gap-2 cursor-pointer group">
              <div className="h-8 w-8 bg-linear-to-br from-gray-900 to-gray-700 text-white flex items-center justify-center font-serif font-bold rounded-lg group-hover:scale-105 transition-transform duration-300 shadow-md">
                R
              </div>
              <span className="font-serif font-bold text-xl tracking-tight bg-linear-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                Resume<span className="text-gray-400">Builder</span>
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-4">
            <nav className="hidden lg:flex items-center gap-1">
              <Link href="/">
                <Button variant="secondary" className="font-medium">
                  Home
                </Button>
              </Link>
              <Link href="/about">
                <Button variant="ghost" className="font-medium hover:bg-gray-100">About Us</Button>
              </Link>
              <Link href="/contact">
                <Button variant="ghost" className="font-medium hover:bg-gray-100">Contact</Button>
              </Link>
              <Link href="/privacy">
                <Button variant="ghost" className="font-medium hover:bg-gray-100">Privacy</Button>
              </Link>
            </nav>

            {/* Hidden on mobile, visible on desktop */}
            <div className="hidden sm:block">
              <Link href="/templates">
                <Button className="gap-2 bg-linear-to-r from-gray-900 to-gray-700 hover:from-gray-800 hover:to-gray-600 shadow-lg hover:shadow-xl">
                  <PenLine size={16} />
                  <span className="hidden sm:inline">Get Started</span>
                  <ArrowRight size={16} />
                </Button>
              </Link>
            </div>
            
            <div className="sm:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="hover:bg-gray-100"
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </Button>
            </div>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="sm:hidden bg-white/95 backdrop-blur-xl border-t shadow-lg animate-in slide-in-from-top-5">
            <div className="container mx-auto px-4 py-4 space-y-1">
              {['/', '/about', '/contact', '/privacy'].map((path, idx) => (
                <Link key={idx} href={path}>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start font-medium hover:bg-gray-50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {path === '/' ? 'Home' : 
                     path === '/about' ? 'About Us' :
                     path === '/contact' ? 'Contact' : 'Privacy Policy'}
                  </Button>
                </Link>
              ))}
            </div>
          </div>
        )}
      </header>

      <section className="relative py-8 md:py-10 overflow-hidden" ref={heroRef}>
        <div className="absolute inset-0 bg-linear-to-br from-blue-50 via-white to-purple-50 opacity-50" />
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 items-center gap-12 max-w-6xl mx-auto">
            <div className="text-center lg:text-left">
              <Badge className="mb-6 bg-linear-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 border-0 text-white shadow-lg animate-bounce">
                <Sparkles size={12} className="mr-2" />
                Trusted by 85,000+ Professionals
              </Badge>
              
              <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
                <span className="bg-linear-to-r from-gray-900 via-gray-800 to-gray-700 bg-clip-text text-transparent">
                  Land Your Dream Job
                </span>
                <span className="block text-4xl md:text-5xl lg:text-6xl text-gray-600 mt-2">
                  With A Resume That <span className="text-blue-600">Wins</span>
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-muted-foreground mb-10 leading-relaxed">
                AI-powered resume builder with professional templates, ATS optimization, and expert guidance.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Link href="/templates">
                  <Button size="lg" className="h-16 px-10 text-lg bg-linear-to-r from-gray-900 to-gray-800 hover:from-gray-800 hover:to-gray-700 shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 transition-all duration-300 gap-4">
                    <Rocket size={24} />
                    Build Your Resume
                    <ArrowRight size={24} />
                  </Button>
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden transform hover:scale-[1.02] transition-transform duration-500 border border-gray-200">
                <div className="p-6">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="h-16 w-16 bg-linear-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                      <Briefcase className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">Alex Morgan</h3>
                      <p className="text-blue-600 font-medium">Senior Product Manager</p>
                      <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                        <MapPin className="h-3 w-3" />
                        <span>San Francisco, CA</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <GraduationCap className="h-4 w-4 text-gray-500" />
                        <h4 className="font-semibold text-gray-900">Education</h4>
                      </div>
                      <div className="pl-6">
                        <p className="font-medium text-gray-900">Stanford University</p>
                        <p className="text-sm text-gray-600">MBA, Business Administration</p>
                        <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                          <Calendar className="h-3 w-3" />
                          <span>2018 - 2020</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <Briefcase className="h-4 w-4 text-gray-500" />
                        <h4 className="font-semibold text-gray-900">Experience</h4>
                      </div>
                      <div className="pl-6 space-y-4">
                        <div>
                          <p className="font-medium text-gray-900">Lead Product Manager</p>
                          <p className="text-sm text-gray-600">Google • Mountain View, CA</p>
                          <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                            <Calendar className="h-3 w-3" />
                            <span>2021 - Present</span>
                          </div>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">Product Manager</p>
                          <p className="text-sm text-gray-600">Facebook • Menlo Park, CA</p>
                          <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                            <Calendar className="h-3 w-3" />
                            <span>2020 - 2021</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Skills</h4>
                      <div className="flex flex-wrap gap-2">
                        {['Product Strategy', 'User Research', 'Agile Methodologies', 'Data Analysis', 'Team Leadership', 'Go-to-Market'].map((skill, idx) => (
                          <span key={idx} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute top-4 right-4">
                  <Badge className="bg-linear-to-r from-green-500 to-emerald-500 border-0 text-white shadow-lg">
                    <CheckCircle size={12} className="mr-2" />
                    ATS Score: 98%
                  </Badge>
                </div>

                <div className="absolute -right-6 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-3 shadow-xl border">
                  <div className="h-12 w-12 bg-linear-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <Award className="h-6 w-6 text-white" />
                  </div>
                </div>

                <div className="bg-linear-to-r from-blue-50 to-purple-50 border-t p-4">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-600">Resume created with</div>
                    <div className="flex items-center gap-1">
                      <div className="h-5 w-5 bg-linear-to-br from-gray-900 to-gray-700 rounded flex items-center justify-center text-white text-xs font-bold">
                        R
                      </div>
                      <span className="font-semibold text-gray-900">ResumeBuilder</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-4 shadow-xl border">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 bg-linear-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">94%</div>
                    <div className="text-sm text-gray-600">Interview Rate</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge className="mb-4 bg-linear-to-r from-blue-100 to-blue-50 text-blue-700 border-blue-200">
              <Zap size={12} className="mr-2" />
              Simple 4-Step Process
            </Badge>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Create Your Perfect Resume in <span className="text-blue-600">7 Minutes</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              From blank page to interview-ready resume in less time than a coffee break
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-16">
            {processSteps.map((step, index) => (
              <div 
                key={index}
                className={`relative p-6 rounded-2xl border-2 transition-all duration-500 transform hover:-translate-y-2 ${
                  activeStep === index 
                    ? 'border-blue-500 bg-blue-50 shadow-xl' 
                    : 'border-gray-100 bg-white hover:border-blue-200 hover:shadow-lg'
                }`}
                onMouseEnter={() => setActiveStep(index)}
              >
                <div className={`absolute -top-3 -left-3 h-12 w-12 rounded-xl bg-linear-to-br ${step.color} flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
                  {step.number}
                </div>
                
                <div className={`h-16 w-16 rounded-xl bg-linear-to-br ${step.color} flex items-center justify-center mb-6 ml-4 transition-transform duration-300 ${
                  activeStep === index ? 'scale-110' : ''
                }`}>
                  <div className="text-white">
                    {step.icon}
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600 mb-4">{step.description}</p>
                
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Clock size={14} />
                    <span>{step.time}</span>
                  </div>
                  {activeStep === index && (
                    <div className="h-2 w-8 bg-linear-to-r from-blue-500 to-purple-500 rounded-full animate-pulse" />
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-linear-to-r from-blue-50 to-purple-50 rounded-3xl p-8 md:p-12 max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="text-center">
                  <div className="h-14 w-14 bg-linear-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <div className="text-white">
                      {benefit.icon}
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-2">{benefit.stat}</div>
                  <h4 className="font-semibold text-gray-900 mb-2">{benefit.title}</h4>
                  <p className="text-gray-600 text-sm">{benefit.description}</p>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-10">
              <Link href="/templates">
                <Button size="lg" className="bg-linear-to-r from-gray-900 to-gray-800 hover:from-gray-800 hover:to-gray-700 shadow-lg hover:shadow-xl gap-3">
                  <Timer size={20} />
                  Start Your 7-Minute Resume
                  <ArrowRight size={20} />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 md:py-12 bg-linear-to-r from-gray-900 to-gray-800 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {statsCards.map((stat, index) => (
              <div 
                key={index}
                className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 hover:border-white/40 transition-all duration-300 hover:scale-105"
              >
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-linear-to-br from-white/20 to-white/10 rounded-full">
                    {stat.icon}
                  </div>
                </div>
                <div className="text-3xl md:text-4xl font-bold mb-2 animate-in fade-in-50">
                  {stat.value}
                </div>
                <div className="text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 md:py-20 bg-linear-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge className="mb-4 bg-linear-to-r from-purple-100 to-purple-50 text-purple-700 border-purple-200">
              <Zap size={12} className="mr-2" />
              Advanced Features
            </Badge>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Why We're <span className="text-purple-600">Different</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Built with cutting-edge technology to give you an unfair advantage
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <Card 
                key={index}
                className="border-0 bg-white shadow-xl hover:shadow-2xl transition-all duration-500 group hover:-translate-y-2"
              >
                <CardContent className="p-8">
                  <div className={`w-14 h-14 rounded-2xl ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <div className="text-white">
                      {feature.icon}
                    </div>
                  </div>
                  <h3 className="font-serif text-xl font-bold text-gray-900 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                  <div className="mt-6 pt-6 border-t border-gray-100">
                    <Button variant="ghost" className="p-0 h-auto text-blue-600 hover:text-blue-700 group-hover:translate-x-2 transition-transform duration-300">
                      Learn more
                      <ArrowRight size={16} className="ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-20 bg-linear-to-r from-gray-900 to-gray-800 rounded-3xl overflow-hidden">
            <div className="grid lg:grid-cols-2 items-center">
              <div className="p-12 lg:p-16">
                <Badge className="mb-4 bg-white/20 text-white border-white/30">
                  <Shield size={12} className="mr-2" />
                  Privacy First
                </Badge>
                <h3 className="font-serif text-3xl md:text-4xl font-bold text-white mb-6">
                  Your Data Stays <span className="text-blue-300">Yours</span>
                </h3>
                <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                  Unlike other builders, we process everything locally in your browser. 
                  Your sensitive information never touches our servers unless you choose to save it.
                </p>
                <div className="space-y-4">
                  {['Military-grade encryption', 'GDPR & CCPA compliant', 'Zero data selling', 'Automatic data deletion'].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <CheckCircle size={20} className="text-green-400" />
                      <span className="text-gray-200">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative h-64 lg:h-full min-h-100 bg-linear-to-br from-blue-900/20 to-purple-900/20">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-48 h-48 bg-linear-to-br from-blue-500/20 to-purple-500/20 rounded-full animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge className="mb-4 bg-linear-to-r from-green-100 to-green-50 text-green-700 border-green-200">
              <Users size={12} className="mr-2" />
              Success Stories
            </Badge>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Trusted by <span className="text-green-600">Top Talent</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              See what professionals from leading companies are saying
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card 
                key={index}
                className="border-2 border-gray-100 hover:border-blue-200 hover:shadow-2xl transition-all duration-500 group"
              >
                <CardContent className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 bg-linear-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                      <p className="text-sm text-gray-600">{testimonial.role} at {testimonial.company}</p>
                    </div>
                  </div>
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} size={16} className="text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 italic mb-6">"{testimonial.content}"</p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>1 week ago</span>
                    <div className="flex gap-2">
                      <Linkedin size={16} className="hover:text-blue-600 cursor-pointer" />
                      <Twitter size={16} className="hover:text-blue-400 cursor-pointer" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 md:py-20 bg-linear-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-white/20 text-white border-white/30 backdrop-blur-sm">
              <Rocket size={12} className="mr-2" />
              Ready to Transform Your Career?
            </Badge>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8">
              Build the Resume That <span className="bg-linear-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Gets You Hired</span>
            </h2>
            <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
              Join thousands of successful professionals. Create your winning resume in minutes.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/templates">
                <Button size="lg" className="h-16 px-12 text-lg bg-linear-to-r from-white to-gray-100 text-gray-900 hover:from-gray-100 hover:to-gray-200 shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 transition-all duration-300">
                  <Sparkles size={24} className="mr-3" />
                  Start Building Resume
                  <ArrowRight size={24} className="ml-3" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-white pt-10 md:pt-16 pb-8">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-10 w-10 bg-linear-to-br from-white to-gray-200 text-gray-900 flex items-center justify-center font-serif font-bold rounded-lg">
                  R
                </div>
                <div>
                  <span className="font-serif font-bold text-2xl tracking-tight">Resume<span className="text-gray-400">Builder</span></span>
                </div>
              </div>
              <p className="text-gray-400 mb-8 max-w-md leading-relaxed">
                The world's most advanced resume builder. Helping professionals land dream jobs since 2020.
              </p>
              <div className="flex gap-4">
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
              <h3 className="font-semibold text-lg mb-6">Company</h3>
              <div className="space-y-3">
                <Link href="/about">
                  <Button variant="link" className="text-gray-400 hover:text-white p-0 h-auto text-left w-full justify-start">
                    About Us
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="link" className="text-gray-400 hover:text-white p-0 h-auto text-left w-full justify-start">
                    Contact
                  </Button>
                </Link>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-6">Legal</h3>
              <div className="space-y-3">
                <Link href="privacy">
                  <Button variant="link" className="text-gray-400 hover:text-white p-0 h-auto text-left w-full justify-start">
                    Privacy Policy
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="text-gray-500 text-sm">
                © 2024 ResumeBuilder. All rights reserved. Made with <Heart size={12} className="inline text-red-500" /> for job seekers worldwide.
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}