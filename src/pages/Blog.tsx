import React from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft,
  ArrowRight,
  Calendar,
  Clock,
  FileText,
  BookOpen,
  ChevronRight
} from 'lucide-react';

const blogPosts = [
  {
    id: 'how-to-make-a-professional-resume-2026',
    title: 'How to Make a Professional Resume in 2026 (Free Template Download)',
    excerpt: 'Step-by-step guide to creating a job-winning resume in 2026. Learn the latest resume trends, ATS optimization tips, and download a free professional template.',
    category: 'Resume Tips',
    readTime: '8 min read',
    date: 'January 31, 2026',
    featured: true,
    image: '/blog/professional-resume-2026.jpg',
  },
];

export default function Blog() {
  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Templates', href: '/templates' },
    { name: 'Blog', href: '/blog' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white">
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
            <Link href="/">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft size={16} />
                Home
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 md:py-16 max-w-6xl">
        <section className="text-center mb-12 md:mb-16">
          <Badge className="mb-4 bg-blue-100 text-blue-700 border-blue-200">
            <BookOpen size={14} className="mr-2" />
            Career Resources & Tips
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            ResumeCon <span className="text-blue-600">Blog</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Expert advice, resume tips, and career guides to help you land your dream job.
          </p>
        </section>

        <section className="mb-16">
          <div className="grid gap-8">
            {blogPosts.map((post) => (
              <Link key={post.id} href={`/${post.id}`}>
                <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group border-gray-200">
                  <CardContent className="p-0">
                    <div className="grid md:grid-cols-2 gap-0">
                      <div className="aspect-video md:aspect-auto overflow-hidden">
                        <img 
                          src="/professional-resume-2026.jpg" 
                          alt="How to make a professional resume in 2026"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-6 md:p-8 flex flex-col justify-center">
                        <div className="flex flex-wrap items-center gap-3 mb-4">
                          {post.featured && (
                            <Badge className="bg-green-100 text-green-700 border-green-200">
                              Featured
                            </Badge>
                          )}
                          <Badge variant="outline" className="text-gray-600">
                            {post.category}
                          </Badge>
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                          {post.title}
                        </h2>
                        <p className="text-gray-600 mb-6 line-clamp-3">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <Calendar size={14} />
                              {post.date}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock size={14} />
                              {post.readTime}
                            </span>
                          </div>
                          <Button variant="ghost" size="sm" className="gap-1 text-blue-600 group-hover:bg-blue-50">
                            Read More
                            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        <section className="bg-linear-to-r from-gray-900 to-gray-800 rounded-2xl p-8 md:p-12 text-white text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to Create Your Professional Resume?
          </h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Use our free resume builder to create an ATS-optimized resume that gets you interviews.
          </p>
          <Link href="/templates">
            <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100 gap-2">
              Start Building Your Resume
              <ChevronRight size={20} />
            </Button>
          </Link>
        </section>
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
