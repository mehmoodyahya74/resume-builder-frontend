import React from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { 
  ArrowLeft,
  Calendar,
  Clock,
  FileText,
  Download,
  CheckCircle,
  ChevronRight,
  Star,
  Target,
  Lightbulb,
  AlertCircle,
  BookOpen,
  Share2
} from 'lucide-react';

export default function BlogPost() {
  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Templates', href: '/templates' },
    { name: 'Blog', href: '/blog' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b bg-white/90 backdrop-blur-md sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/">
            <div className="flex items-center gap-2 cursor-pointer group">
              <img 
                src="/favicon.png"
                alt="ResumeCon Logo"
                className="h-8 w-8 object-contain group-hover:opacity-90 transition-opacity"
              />
              <span className="font-bold text-xl tracking-tight">
                Resume<span className="text-blue-600">Con</span>
              </span>
            </div>
          </Link>
          <nav className="hidden md:flex items-center gap-1">
            {navigation.map((item) => (
              <Link key={item.name} href={item.href}>
                <Button 
                  variant={item.name === 'Blog' ? 'secondary' : 'ghost'} 
                  className="font-medium px-4"
                >
                  {item.name}
                </Button>
              </Link>
            ))}
          </nav>
          <div className="flex md:hidden">
            <Link href="/blog">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft size={16} />
                Blog
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 md:py-12 max-w-4xl">
        <Link href="/blog">
          <Button variant="ghost" className="mb-6 gap-2 text-gray-600 hover:text-gray-900">
            <ArrowLeft size={16} />
            Back to Blog
          </Button>
        </Link>

        <article className="prose prose-lg max-w-none">
          <div className="mb-8">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <Badge className="bg-blue-100 text-blue-700 border-blue-200">
                Resume Tips
              </Badge>
              <Badge variant="outline" className="text-gray-600">
                <Calendar size={12} className="mr-1" />
                January 31, 2026
              </Badge>
              <Badge variant="outline" className="text-gray-600">
                <Clock size={12} className="mr-1" />
                8 min read
              </Badge>
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              How to Make a Professional Resume in 2026 (Free Template Download)
            </h1>
            
            <p className="text-xl text-gray-600 leading-relaxed">
              Step-by-step guide to creating a job-winning resume in 2026. Download a free professional resume template and use our online builder to customize quickly.
            </p>
          </div>

          <div className="aspect-video rounded-xl overflow-hidden mb-10">
            <img 
              src="/professional-resume-2026.jpg" 
              alt="How to make a professional resume in 2026 - step by step guide"
              className="w-full h-full object-cover"
            />
          </div>

          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Lightbulb className="h-8 w-8 text-yellow-500" />
              Why a Professional Resume Matters in 2026
            </h2>
            
            <p className="text-gray-700 mb-4 leading-relaxed">
              In today's competitive job market, your resume is more than just a document - it's your personal marketing tool. With the average recruiter spending only <strong>6-7 seconds</strong> scanning a resume, first impressions are everything.
            </p>
            
            <p className="text-gray-700 mb-4 leading-relaxed">
              A professional resume in 2026 needs to accomplish three critical goals:
            </p>
            
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-1" />
                <span className="text-gray-700"><strong>Pass ATS Systems:</strong> Over 90% of Fortune 500 companies use Applicant Tracking Systems to filter resumes before human eyes ever see them.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-1" />
                <span className="text-gray-700"><strong>Showcase Your Value:</strong> Clearly communicate your skills, achievements, and potential contribution to the company.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-1" />
                <span className="text-gray-700"><strong>Stand Out Visually:</strong> A clean, modern design helps you stand out from hundreds of other applicants.</span>
              </li>
            </ul>

            <Card className="bg-blue-50 border-blue-200 mb-6">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Target className="h-6 w-6 text-blue-600 shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">Key Statistics for 2026</h4>
                    <ul className="text-gray-700 space-y-1">
                      <li>75% of resumes are rejected by ATS before reaching a recruiter</li>
                      <li>Professionally designed resumes get 40% more interview callbacks</li>
                      <li>Tailored resumes are 6x more likely to get interviews than generic ones</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <BookOpen className="h-8 w-8 text-blue-500" />
              Step-by-Step Guide to Creating Your Resume
            </h2>

            <div className="space-y-8">
              <div className="border-l-4 border-blue-500 pl-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Step 1: Choose the Right Resume Format</h3>
                <p className="text-gray-700 mb-4">
                  The three main resume formats are <strong>chronological</strong>, <strong>functional</strong>, and <strong>combination</strong>. For most job seekers in 2026, the chronological format works best because:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>It's preferred by recruiters and hiring managers</li>
                  <li>It's ATS-friendly and easy to parse</li>
                  <li>It clearly shows career progression</li>
                </ul>
              </div>

              <div className="border-l-4 border-green-500 pl-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Step 2: Write a Compelling Professional Summary</h3>
                <p className="text-gray-700 mb-4">
                  Your professional summary is the first thing recruiters read. Make it count with this formula:
                </p>
                <Card className="bg-gray-50 border-gray-200">
                  <CardContent className="p-4">
                    <p className="text-gray-700 italic">
                      "[Job Title] with [X years] of experience in [industry/skill]. Proven track record of [key achievement]. Seeking to leverage [relevant skills] to [benefit to company]."
                    </p>
                  </CardContent>
                </Card>
                <p className="text-gray-700 mt-4">
                  <strong>Example:</strong> "Senior Marketing Manager with 7+ years of experience in digital marketing and brand strategy. Proven track record of increasing organic traffic by 200% and generating $2M+ in revenue. Seeking to leverage data-driven marketing expertise to drive growth at [Company Name]."
                </p>
              </div>

              <div className="border-l-4 border-purple-500 pl-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Step 3: Highlight Your Work Experience with Impact</h3>
                <p className="text-gray-700 mb-4">
                  Use the <strong>STAR method</strong> (Situation, Task, Action, Result) to write powerful bullet points:
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <Star className="h-5 w-5 text-yellow-500 shrink-0 mt-1" />
                    <span className="text-gray-700">Start with strong action verbs: Led, Developed, Increased, Managed, Implemented</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Star className="h-5 w-5 text-yellow-500 shrink-0 mt-1" />
                    <span className="text-gray-700">Quantify achievements: Use numbers, percentages, and dollar amounts</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Star className="h-5 w-5 text-yellow-500 shrink-0 mt-1" />
                    <span className="text-gray-700">Focus on results, not responsibilities</span>
                  </li>
                </ul>
              </div>

              <div className="border-l-4 border-orange-500 pl-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Step 4: Optimize Your Skills Section</h3>
                <p className="text-gray-700 mb-4">
                  In 2026, both hard and soft skills matter. Include a balanced mix:
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <Card className="bg-gray-50">
                    <CardContent className="p-4">
                      <h4 className="font-bold text-gray-900 mb-2">Hard Skills</h4>
                      <ul className="text-gray-700 text-sm space-y-1">
                        <li>Programming languages</li>
                        <li>Data analysis tools</li>
                        <li>Industry-specific software</li>
                        <li>Technical certifications</li>
                      </ul>
                    </CardContent>
                  </Card>
                  <Card className="bg-gray-50">
                    <CardContent className="p-4">
                      <h4 className="font-bold text-gray-900 mb-2">Soft Skills</h4>
                      <ul className="text-gray-700 text-sm space-y-1">
                        <li>Leadership & team management</li>
                        <li>Communication</li>
                        <li>Problem-solving</li>
                        <li>Adaptability</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div className="border-l-4 border-red-500 pl-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Step 5: Add Education & Certifications</h3>
                <p className="text-gray-700">
                  Include your highest degree, relevant certifications, and any continuing education. For professionals with 5+ years of experience, education should come after work experience. New graduates should lead with education.
                </p>
              </div>

              <div className="border-l-4 border-teal-500 pl-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Step 6: Proofread and Format</h3>
                <p className="text-gray-700 mb-4">
                  Before submitting, ensure your resume is error-free:
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-1" />
                    <span className="text-gray-700">Check for spelling and grammar errors</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-1" />
                    <span className="text-gray-700">Ensure consistent formatting (fonts, bullet styles, spacing)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-1" />
                    <span className="text-gray-700">Keep it to 1-2 pages (1 page for less than 10 years experience)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-1" />
                    <span className="text-gray-700">Save as PDF to preserve formatting</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <Card className="bg-linear-to-r from-blue-600 to-blue-700 text-white border-0">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                  <FileText className="h-8 w-8" />
                  Use Our Free Resume Builder
                </h3>
                <p className="text-lg text-blue-100 mb-6">
                  Don't want to start from scratch? You can use our <Link href="/templates" className="underline font-semibold hover:text-white">free resume builder</Link> at ResumeCon to create a professional, ATS-optimized resume in minutes. Choose from 50+ templates, get AI-powered suggestions, and download as PDF instantly.
                </p>
                <Link href="/templates">
                  <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 gap-2">
                    Create My Resume Now
                    <ChevronRight size={20} />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Download className="h-8 w-8 text-green-500" />
              Download Your Free Resume Template
            </h2>
            
            <p className="text-gray-700 mb-6">
              We've created a professional resume template that follows all the best practices for 2026. This template is:
            </p>
            
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-1" />
                <span className="text-gray-700">ATS-compatible and recruiter-approved</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-1" />
                <span className="text-gray-700">Clean, modern design that stands out</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-1" />
                <span className="text-gray-700">Easy to customize in Word or Google Docs</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-1" />
                <span className="text-gray-700">Includes example content and tips</span>
              </li>
            </ul>

            <Card className="bg-gray-50 border-gray-200">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900 mb-2">Professional Resume Template 2026</h4>
                    <p className="text-gray-600 mb-4">Free downloadable template in DOCX format</p>
                    <div className="flex flex-wrap gap-3">
                      <a href="/professional-resume-template-2026.pdf" download>
                        <Button className="gap-2 bg-blue-600 hover:bg-blue-700">
                          <Download size={16} />
                          Download DOCX
                        </Button>
                      </a>
                    </div>
                  </div>
                  <div className="w-32 h-40 bg-white border border-gray-300 rounded-lg shadow-sm flex items-center justify-center">
                    <FileText className="h-12 w-12 text-gray-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-yellow-50 border-yellow-200 mt-6">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-yellow-600 shrink-0 mt-0.5" />
                  <p className="text-sm text-yellow-800">
                    <strong>Pro Tip:</strong> After downloading, customize the template with your own information. Don't forget to tailor your resume for each job application by including relevant keywords from the job description.
                  </p>
                </div>
              </CardContent>
            </Card>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              Final Thoughts: Your Resume is Your First Impression
            </h2>
            
            <p className="text-gray-700 mb-4 leading-relaxed">
              Creating a professional resume doesn't have to be complicated. By following the steps in this guide and using our free template or <Link href="/templates" className="text-blue-600 hover:underline font-semibold">free resume builder</Link>, you can create a resume that gets noticed by both ATS systems and human recruiters.
            </p>
            
            <p className="text-gray-700 mb-6 leading-relaxed">
              Remember: your resume is a living document. Update it regularly with new skills, achievements, and experiences. And most importantly, tailor it for each job application to maximize your chances of landing that interview.
            </p>

            <Card className="bg-linear-to-r from-gray-900 to-gray-800 text-white border-0">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold mb-4">Ready to Build Your Winning Resume?</h3>
                <p className="text-lg text-gray-300 mb-6">
                  Join 85,000+ professionals who've created job-winning resumes with ResumeCon.
                </p>
                <Link href="/templates">
                  <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100 gap-2">
                    Start Building for Free
                    <ChevronRight size={20} />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </section>

          <div className="border-t pt-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <span className="text-gray-600 text-sm">Share this article:</span>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="gap-2">
                    <Share2 size={14} />
                    Share
                  </Button>
                </div>
              </div>
              <Link href="/blog">
                <Button variant="ghost" className="gap-2 text-blue-600">
                  <ArrowLeft size={16} />
                  Back to Blog
                </Button>
              </Link>
            </div>
          </div>
        </article>
      </main>

      <footer className="mt-16 border-t bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <img 
                src="/favicon.png"
                alt="ResumeCon Logo"
                className="h-8 w-8 object-contain"
              />
              <span className="font-bold text-xl">
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
              © {new Date().getFullYear()} ResumeCon. Empowering careers worldwide.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
