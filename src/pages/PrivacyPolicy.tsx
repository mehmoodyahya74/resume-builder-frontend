import React from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, 
  Shield,
  Lock,
  Eye,
  FileText,
  Download,
  Globe,
  UserCheck,
  AlertCircle,
  CheckCircle,
  ChevronRight,
  Mail,
  ExternalLink
} from 'lucide-react';

export default function PrivacyPolicy() {
  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Privacy Policy', href: '/privacy' },
  ];

  const lastUpdated = "March 15, 2024";

  const privacyPrinciples = [
    {
      icon: <Lock className="h-6 w-6" />,
      title: 'Local Processing',
      description: 'Your resume data is processed locally in your browser and never sent to our servers unless you choose to save it.',
      color: 'bg-blue-50 text-blue-700',
    },
    {
      icon: <Eye className="h-6 w-6" />,
      title: 'Transparency',
      description: 'We clearly explain what data we collect and how we use it. No hidden terms or practices.',
      color: 'bg-green-50 text-green-700',
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: 'Security First',
      description: 'We implement industry-standard security measures to protect your information.',
      color: 'bg-purple-50 text-purple-700',
    },
    {
      icon: <UserCheck className="h-6 w-6" />,
      title: 'User Control',
      description: 'You have full control over your data. Delete your account and data anytime.',
      color: 'bg-amber-50 text-amber-700',
    },
  ];

  const dataCategories = [
    {
      title: 'Information You Provide',
      items: [
        'Resume content (education, work experience, skills)',
        'Contact information (if you create an account)',
        'Profile preferences and settings',
        'Feedback and support requests',
      ],
    },
    {
      title: 'Automatically Collected',
      items: [
        'Browser type and version',
        'Device information',
        'Usage patterns and feature interactions',
        'Cookies and similar technologies',
      ],
    },
    {
      title: 'Information We Never Collect',
      items: [
        'Financial information (credit cards, bank accounts)',
        'Government ID numbers (SSN, passport)',
        'Sensitive personal data (health, biometrics)',
        'Private communications (emails, messages)',
      ],
    },
  ];

  const userRights = [
    {
      right: 'Access Your Data',
      description: 'Request a copy of all personal data we have about you',
      icon: <FileText className="h-5 w-5" />,
    },
    {
      right: 'Data Correction',
      description: 'Update or correct inaccurate personal information',
      icon: <CheckCircle className="h-5 w-5" />,
    },
    {
      right: 'Data Deletion',
      description: 'Request deletion of your personal data',
      icon: <AlertCircle className="h-5 w-5" />,
    },
    {
      right: 'Data Portability',
      description: 'Export your data in a machine-readable format',
      icon: <Download className="h-5 w-5" />,
    },
    {
      right: 'Opt-Out',
      description: 'Opt-out of marketing communications anytime',
      icon: <Mail className="h-5 w-5" />,
    },
    {
      right: 'Complaints',
      description: 'Lodge complaints with data protection authorities',
      icon: <Globe className="h-5 w-5" />,
    },
  ];

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white">
      <header className="border-b bg-white/90 backdrop-blur-md sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/">
            <div className="flex items-center gap-2 cursor-pointer group">
              {/* Updated: Replaced "R" circle with favicon */}
              <img 
                src="/favicon.png"
                alt="ResumeCon Logo"
                className="h-8 w-8 object-contain group-hover:opacity-90 transition-opacity"
              />
              <span className="font-serif font-bold text-xl tracking-tight">
                Resume<span className="text-blue-600">Con</span>
              </span>
            </div>
          </Link>
          <nav className="hidden md:flex items-center gap-1">
            {navigation.map((item) => (
              <Link key={item.name} href={item.href}>
                <Button 
                  variant={item.name === 'Privacy Policy' ? 'secondary' : 'ghost'} 
                  className="font-medium px-4"
                >
                  {item.name}
                </Button>
              </Link>
            ))}
          </nav>
          <div className="flex md:hidden">
            <Link href="/">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft size={16} />
                Home
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 md:py-16 max-w-7xl">
        {/* Hero Section */}
        <section className="text-center mb-16 md:mb-24">
          <Badge className="mb-4 bg-gray-100 text-gray-800 hover:bg-gray-200">
            <Shield size={14} className="mr-2" />
            Privacy & Security
          </Badge>
          <h1 className="font-serif text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Privacy <span className="text-gray-600">Policy</span>
          </h1>
          <div className="flex flex-col items-center gap-6">
            <p className="text-xl text-muted-foreground max-w-3xl">
              We take your privacy seriously. This policy explains how we collect, use, and protect your information.
            </p>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <FileText size={14} />
                <span>Last Updated: {lastUpdated}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle size={14} className="text-green-500" />
                <span>GDPR & CCPA Compliant</span>
              </div>
            </div>
          </div>
        </section>

        {/* Privacy Principles */}
        <section className="mb-16 md:mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Privacy <span className="text-gray-600">Principles</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The core values that guide how we handle your data
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {privacyPrinciples.map((principle, index) => (
              <Card key={index} className="border border-gray-200 hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className={`${principle.color} p-3 rounded-lg w-fit mb-4`}>
                    {principle.icon}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{principle.title}</h3>
                  <p className="text-gray-600">{principle.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {/* Data Categories */}
          <div className="lg:col-span-2">
            <Card className="border border-gray-200">
              <CardHeader>
                <CardTitle className="text-2xl">Data We Collect</CardTitle>
                <p className="text-gray-600">
                  We believe in collecting only what's necessary to provide our services.
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {dataCategories.map((category, index) => (
                    <div key={index}>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">{category.title}</h3>
                      <ul className="space-y-3">
                        {category.items.map((item, itemIndex) => (
                          <li key={itemIndex} className="flex items-start gap-3">
                            <div className={`mt-1 ${
                              index === 2 ? 'text-red-500' : 'text-gray-400'
                            }`}>
                              {index === 2 ? (
                                <AlertCircle className="h-5 w-5" />
                              ) : (
                                <div className="h-2 w-2 rounded-full bg-gray-300" />
                              )}
                            </div>
                            <span className={`${
                              index === 2 ? 'text-red-600' : 'text-gray-700'
                            }`}>
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Summary - Only keeping this card */}
          <div className="space-y-6">
            <Card className="border border-gray-200 bg-linear-to-br from-blue-50 to-white">
              <CardHeader>
                <CardTitle>Key Points</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                    <span className="text-gray-700">Resumes processed locally in your browser</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                    <span className="text-gray-700">No data sold to third parties</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                    <span className="text-gray-700">Clear data retention policies</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                    <span className="text-gray-700">Regular security audits</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                    <span className="text-gray-700">Easy data export and deletion</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* User Rights */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Your Data <span className="text-gray-600">Rights</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              You have control over your personal information
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userRights.map((right, index) => (
              <Card key={index} className="border border-gray-200 hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-gray-100 p-2 rounded-lg">
                      {right.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-2">{right.right}</h3>
                      <p className="text-gray-600 text-sm">{right.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Detailed Policy Sections */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Detailed <span className="text-gray-600">Information</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive breakdown of our privacy practices
            </p>
          </div>
          
          <div className="space-y-8">
            {[
              {
                title: 'How We Use Your Information',
                content: 'We use your information solely to provide and improve our resume building services. This includes processing your resume data locally, saving your preferences, and providing customer support. We do not use your data for advertising or share it with third parties for marketing purposes.'
              },
              {
                title: 'Data Storage & Security',
                content: 'Your resume data is primarily processed locally in your browser. If you choose to create an account and save your resume, we encrypt your data using industry-standard AES-256 encryption. We implement regular security audits, monitor for vulnerabilities, and use secure cloud infrastructure with multiple layers of protection.'
              },
              {
                title: 'Third-Party Services',
                content: 'We use trusted third-party services for essential functions like hosting, analytics, and customer support. These partners are contractually obligated to protect your data and comply with relevant privacy regulations. We never sell your personal information to third parties.'
              },
              {
                title: 'Data Retention',
                content: 'We retain your data only as long as necessary to provide our services. You can delete your account and all associated data at any time through your account settings. We automatically delete inactive accounts after 24 months of inactivity.'
              },
              {
                title: 'Cookies & Tracking',
                content: 'We use essential cookies to provide basic functionality and optional analytics cookies to improve our services. You can control cookie preferences through your browser settings. We do not use tracking cookies for advertising purposes.'
              },
              {
                title: 'International Data Transfers',
                content: 'As a global service, your data may be processed in countries outside your residence. We ensure all data transfers comply with international privacy standards through Standard Contractual Clauses and other approved transfer mechanisms.'
              },
            ].map((section, index) => (
              <Card key={index} className="border border-gray-200">
                <CardHeader>
                  <CardTitle>{section.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed">{section.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Contact & Updates */}
        <section className="bg-linear-to-r from-gray-50 to-gray-100 rounded-2xl p-8 md:p-12">
          <div className="max-w-3xl mx-auto text-center">
            <Shield className="h-12 w-12 text-gray-600 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Questions & Updates
            </h2>
            <p className="text-xl text-gray-700 mb-8">
              We're committed to transparency and welcome your privacy-related questions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg" className="bg-gray-900 hover:bg-gray-800 gap-2">
                  <Mail size={20} />
                  Contact Privacy Team
                </Button>
              </Link>
              <a 
                href="https://gdpr-info.eu" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex"
              >
                <Button size="lg" variant="outline" className="gap-2">
                  <ExternalLink size={20} />
                  Learn About GDPR
                </Button>
              </a>
            </div>
            <p className="mt-8 text-sm text-gray-600">
              We regularly update this policy. Significant changes will be communicated via email or site notifications.
            </p>
          </div>
        </section>
      </main>

      <footer className="mt-16 border-t bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              {/* Updated: Replaced "R" circle with favicon */}
              <img 
                src="/favicon.png"
                alt="ResumeCon Logo"
                className="h-8 w-8 object-contain"
              />
              <span className="font-serif font-bold text-xl">
                Resume<span className="text-blue-600">Con</span>
              </span>
            </div>
            <nav className="flex flex-wrap justify-center gap-4">
              {navigation.map((item) => (
                <Link key={item.name} href={item.href}>
                  <Button variant="ghost" size="sm" className="text-gray-600">
                    {item.name}
                  </Button>
                </Link>
              ))}
            </nav>
            <p className="text-sm text-gray-500 text-center md:text-right">
              © {new Date().getFullYear()} ResumeCon. Protecting your privacy.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
