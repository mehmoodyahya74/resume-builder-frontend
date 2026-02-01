import React from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  ArrowLeft, 
  Users, 
  Target, 
  Award, 
  Globe,
  CheckCircle,
  Rocket,
  Heart,
  Shield,
  Lightbulb,
  Zap,
  ChevronRight
} from 'lucide-react';

export default function AboutUs() {
  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Templates', href: '/templates' },
    { name: 'Blog', href: '/blog' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Privacy Policy', href: '/privacy' },
  ];

  const teamMembers = [
    {
      name: 'Alex Morgan',
      role: 'Founder & CEO',
      bio: 'Former HR Director with 10+ years experience in talent acquisition',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200',
      expertise: ['HR Strategy', 'Talent Acquisition', 'Career Coaching'],
    },
    {
      name: 'Sarah Chen',
      role: 'Product Lead',
      bio: 'UX Designer passionate about creating intuitive career tools',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?auto=format&fit=crop&w=200',
      expertise: ['Product Design', 'User Research', 'A/B Testing'],
    },
    {
      name: 'Marcus Johnson',
      role: 'Engineering Lead',
      bio: 'Full-stack developer focused on building scalable career platforms',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200',
      expertise: ['Web Development', 'AI Integration', 'System Architecture'],
    },
    {
      name: 'Elena Rodriguez',
      role: 'Career Advisor',
      bio: 'Certified career coach and resume writing expert',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200',
      expertise: ['Resume Writing', 'Interview Prep', 'Career Transition'],
    },
  ];

  const values = [
    {
      title: 'Accessibility',
      description: 'We believe professional resume building should be free and accessible to everyone.',
      icon: <Globe className="h-8 w-8" />,
      color: 'text-blue-600 bg-blue-50',
    },
    {
      title: 'Quality',
      description: 'Every resume template is designed to meet ATS requirements and recruiter expectations.',
      icon: <Award className="h-8 w-8" />,
      color: 'text-purple-600 bg-purple-50',
    },
    {
      title: 'Innovation',
      description: 'Constantly evolving our tools with the latest resume trends and technologies.',
      icon: <Lightbulb className="h-8 w-8" />,
      color: 'text-amber-600 bg-amber-50',
    },
    {
      title: 'Empowerment',
      description: 'Equipping job seekers with the tools and knowledge to advance their careers.',
      icon: <Zap className="h-8 w-8" />,
      color: 'text-green-600 bg-green-50',
    },
  ];

  const milestones = [
    { year: '2020', title: 'Founded', description: 'Started with a simple resume builder' },
    { year: '2021', title: '10K Users', description: 'Reached our first major milestone' },
    { year: '2022', title: 'AI Features', description: 'Integrated AI-powered suggestions' },
    { year: '2023', title: '100K+ Users', description: 'Helped over 100,000 job seekers' },
    { year: '2024', title: 'Award Winning', description: 'Recognized as top career tool' },
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
                  variant={item.name === 'About Us' ? 'secondary' : 'ghost'} 
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
            <Users size={14} className="mr-2" />
            Our Story & Mission
          </Badge>
          <h1 className="font-serif text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Building Careers, <span className="text-gray-600">One Resume at a Time</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            We're on a mission to democratize professional resume creation and help job seekers worldwide 
            land their dream careers through powerful, accessible tools.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <Button size="lg" className="gap-2 bg-gray-900 hover:bg-gray-800">
                <Rocket size={18} />
                Start Building
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="gap-2">
                <Users size={18} />
                Join Our Mission
              </Button>
            </Link>
          </div>
        </section>

        {/* Stats */}
        <section className="mb-16 md:mb-24">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            <div className="text-center p-6 bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">150K+</div>
              <div className="text-gray-600">Resumes Created</div>
            </div>
            <div className="text-center p-6 bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">98%</div>
              <div className="text-gray-600">User Satisfaction</div>
            </div>
            <div className="text-center p-6 bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">50+</div>
              <div className="text-gray-600">Countries Reached</div>
            </div>
            <div className="text-center p-6 bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">24/7</div>
              <div className="text-gray-600">Free Access</div>
            </div>
          </div>
        </section>

        {/* Mission & Story */}
        <section className="mb-16 md:mb-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our <span className="text-gray-600">Mission</span>
              </h2>
              <div className="space-y-4">
                <p className="text-lg text-gray-700">
                  We believe that <strong>everyone deserves a professional resume</strong> that effectively showcases their skills and experience. 
                  No one should be held back by the cost or complexity of resume creation tools.
                </p>
                <p className="text-lg text-gray-700">
                  Founded by former HR professionals, ResumeCon was created to bridge the gap between job seekers and hiring managers. 
                  We understand what recruiters look for and build our tools to meet those standards.
                </p>
                <div className="flex items-start gap-3 mt-6">
                  <CheckCircle className="h-6 w-6 text-green-500 shrink-0 mt-1" />
                  <p className="text-gray-700">
                    <strong>100% Free:</strong> No hidden costs, no premium paywalls
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-500 shrink-0 mt-1" />
                  <p className="text-gray-700">
                    <strong>ATS Optimized:</strong> Every template passes applicant tracking systems
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-500 shrink-0 mt-1" />
                  <p className="text-gray-700">
                    <strong>Expert Designed:</strong> Created by career professionals and designers
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-linear-to-br from-gray-900 to-gray-800 rounded-2xl p-8 text-white">
              <Target className="h-12 w-12 mb-6 text-blue-400" />
              <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
              <p className="text-lg text-gray-200 mb-6">
                To become the most trusted career development platform globally, 
                helping millions of professionals unlock their career potential through 
                accessible, innovative tools and resources.
              </p>
              <div className="flex items-center gap-2 text-blue-300">
                <Heart size={20} />
                <span className="font-medium">Passion-driven innovation</span>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="mb-16 md:mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our <span className="text-gray-600">Core Values</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="border border-gray-200 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className={`${value.color} p-3 rounded-lg w-fit mb-4`}>
                    {value.icon}
                  </div>
                  <CardTitle>{value.title}</CardTitle>
                  <CardDescription className="mt-2">{value.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>

        {/* Team */}
        <section className="mb-16 md:mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Meet Our <span className="text-gray-600">Team</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Passionate professionals dedicated to your career success
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member) => (
              <Card key={member.name} className="border border-gray-200 overflow-hidden group hover:shadow-lg transition-all">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <Avatar className="h-24 w-24 mb-4 border-4 border-white shadow-lg">
                      <AvatarImage src={member.avatar} />
                      <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                    <p className="text-sm text-blue-600 font-medium mb-3">{member.role}</p>
                    <p className="text-gray-600 mb-4">{member.bio}</p>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {member.expertise.map((skill) => (
                        <Badge key={skill} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Timeline */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our <span className="text-gray-600">Journey</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Milestones in our mission to revolutionize resume building
            </p>
          </div>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gray-200 hidden md:block" />
            
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div 
                  key={milestone.year} 
                  className={`flex flex-col md:flex-row items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  <div className="w-full md:w-1/2 flex justify-center md:justify-end">
                    <div className={`w-full max-w-md ${index % 2 === 0 ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12'}`}>
                      <div className="text-sm font-semibold text-blue-600 mb-2">{milestone.year}</div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{milestone.title}</h3>
                      <p className="text-gray-600">{milestone.description}</p>
                    </div>
                  </div>
                  
                  {/* Timeline dot */}
                  <div className="hidden md:flex items-center justify-center w-8 h-8 rounded-full bg-gray-900 border-4 border-white shadow-lg z-10">
                    <div className="w-2 h-2 rounded-full bg-white" />
                  </div>
                  
                  <div className="w-full md:w-1/2 flex justify-center md:justify-start">
                    <div className={`w-full max-w-md ${index % 2 === 0 ? 'md:text-left md:pl-12' : 'md:text-right md:pr-12'}`}>
                      <div className="text-sm font-semibold text-blue-600 mb-2">Achievement</div>
                      <div className="text-lg font-medium text-gray-900">
                        <Shield className="inline-block mr-2 h-5 w-5 text-green-500" />
                        Key Milestone
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-linear-to-r from-gray-900 to-gray-800 rounded-2xl p-8 md:p-12 text-white text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Build Your Future?
          </h2>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Join thousands of successful professionals who've landed their dream jobs with our resume builder.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100 gap-2">
                Create Your Resume
                <ChevronRight size={20} />
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10 gap-2">
                <Users size={20} />
                Contact Our Team
              </Button>
            </Link>
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
              © {new Date().getFullYear()} ResumeCon. Empowering careers worldwide.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
