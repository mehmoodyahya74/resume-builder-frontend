import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Link } from 'wouter';
import SEO from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, 
  Mail,
  MessageCircle,
  Clock,
  Send,
  CheckCircle,
  HelpCircle,
  Shield,
  ChevronRight
} from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FAQ {
  question: string;
  answer: string;
}

export default function Contact() {
  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Privacy Policy', href: '/privacy' },
  ];

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const faqs: FAQ[] = [
    {
      question: 'How long does it take to build a resume?',
      answer: 'Most users create a professional resume in 15-20 minutes using our templates.',
    },
    {
      question: 'Is ResumeBuilder really free?',
      answer: 'Yes! All our core features are completely free with no hidden costs.',
    },
    {
      question: 'Do you offer resume reviews?',
      answer: 'We provide automated suggestions and tips. Professional review services coming soon.',
    },
    {
      question: 'Can I download my resume in different formats?',
      answer: 'Yes, you can download as PDF, Word, or plain text.',
    },
  ];

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset form after showing success
    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      setIsSubmitted(false);
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white">
      <SEO
        title="Contact Us - Get Help With Your Resume"
        description="Have questions about our resume builder? Contact our support team. We respond within 24 hours to help you create the perfect resume."
        canonical="https://www.resumecon.xyz/contact"
        keywords="contact resumecon, resume help, customer support, resume questions"
      />
      <header className="border-b bg-white/90 backdrop-blur-md sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/">
            <div className="flex items-center gap-2 cursor-pointer group">
              <div className="h-8 w-8 bg-gray-900 text-white flex items-center justify-center font-serif font-bold rounded group-hover:bg-gray-800 transition-colors">R</div>
              <span className="font-serif font-bold text-xl tracking-tight">Resume<span className="text-gray-500">Builder</span></span>
            </div>
          </Link>
          <nav className="hidden md:flex items-center gap-1">
            {navigation.map((item) => (
              <Link key={item.name} href={item.href}>
                <Button 
                  variant={item.name === 'Contact' ? 'secondary' : 'ghost'} 
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
            <MessageCircle size={14} className="mr-2" />
            We're Here to Help
          </Badge>
          <h1 className="font-serif text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Get in <span className="text-gray-600">Touch</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Have questions, feedback, or need assistance? Our team is ready to help you create the perfect resume.
          </p>
          <div className="flex items-center justify-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Clock size={14} />
              <span>Response within 24 hours</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield size={14} />
              <span>100% Privacy Protected</span>
            </div>
          </div>
        </section>

        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {/* Contact Form - Now takes full width */}
          <div className="lg:col-span-3">
            <Card className="border border-gray-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-2xl">Send us a Message</CardTitle>
                <CardDescription>
                  Fill out the form below and we'll get back to you as soon as possible.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isSubmitted ? (
                  <div className="text-center py-12">
                    <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-6" />
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Message Sent Successfully!</h3>
                    <p className="text-gray-600 mb-6">
                      Thank you for reaching out. We've received your message and will get back to you within 24 hours.
                    </p>
                    <Link href="/">
                      <Button className="gap-2">
                        Return to Home
                        <ChevronRight size={16} />
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="John Doe"
                          required
                          className="border-gray-300 focus:border-gray-900"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="john@example.com"
                          required
                          className="border-gray-300 focus:border-gray-900"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject *</Label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="How can we help?"
                        required
                        className="border-gray-300 focus:border-gray-900"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Please describe your inquiry in detail..."
                        rows={6}
                        required
                        className="border-gray-300 focus:border-gray-900 resize-none"
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-500">
                        * Required fields
                      </p>
                      <Button 
                        type="submit" 
                        className="gap-2 bg-gray-900 hover:bg-gray-800"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send size={18} />
                            Send Message
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked <span className="text-gray-600">Questions</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Quick answers to common questions
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {faqs.map((faq, index) => (
              <Card key={index} className="border border-gray-200 hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-gray-100 p-2 rounded-lg">
                      <HelpCircle className="h-5 w-5 text-gray-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">{faq.question}</h3>
                      <p className="text-gray-600">{faq.answer}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>

      <footer className="mt-16 border-t bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 bg-gray-900 text-white flex items-center justify-center font-serif font-bold rounded">R</div>
              <span className="font-serif font-bold text-xl">Resume<span className="text-gray-500">Builder</span></span>
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
              © {new Date().getFullYear()} ResumeBuilder. Your success is our priority.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
