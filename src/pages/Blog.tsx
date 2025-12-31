import React from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  ArrowLeft, 
  Calendar, 
  User, 
  Clock, 
  ChevronRight,
  Share2,
  BookOpen,
  TrendingUp,
  Briefcase,
  GraduationCap,
  MessageSquare,
  Search,
  FileText
} from 'lucide-react';

interface IconProps {
  size?: number;
  className?: string;
}

const FileTextIcon = ({ size = 24, className }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
    <path d="M14 2v4a2 2 0 0 0 2 2h4" />
    <path d="M10 9H8" />
    <path d="M16 13H8" />
    <path d="M16 17H8" />
  </svg>
);

const SearchIcon = ({ size = 24, className }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
);

export default function Blog() {
  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Blog', href: '/blog' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Privacy Policy', href: '/privacy' },
  ];

  const featuredPosts = [
    {
      id: 1,
      title: 'How to Craft a Resume That Gets You Interviews in 2024',
      excerpt: 'Learn the latest resume trends and formatting techniques that recruiters are looking for this year.',
      author: 'Sarah Johnson',
      date: 'Mar 15, 2024',
      readTime: '8 min read',
      category: 'Resume Tips',
      image: 'https://images.unsplash.com/photo-1586282391129-76a6df230234?auto=format&fit=crop&w=800',
      authorAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?auto=format&fit=crop&w=100',
      badgeColor: 'bg-blue-100 text-blue-800',
    },
    {
      id: 2,
      title: 'The 5 Most Common Interview Mistakes and How to Avoid Them',
      excerpt: 'Discover the pitfalls that cost candidates their dream jobs and learn how to navigate interviews successfully.',
      author: 'Michael Chen',
      date: 'Mar 12, 2024',
      readTime: '6 min read',
      category: 'Interview Skills',
      image: 'https://images.unsplash.com/photo-1551836026-d5c2c5af78e4?auto=format&fit=crop&w=800',
      authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100',
      badgeColor: 'bg-green-100 text-green-800',
    },
    {
      id: 3,
      title: 'Career Switching: A Step-by-Step Guide for Professionals',
      excerpt: 'Transitioning to a new industry? Follow our comprehensive guide to make a smooth career change.',
      author: 'Emma Rodriguez',
      date: 'Mar 10, 2024',
      readTime: '10 min read',
      category: 'Career Growth',
      image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=800',
      authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100',
      badgeColor: 'bg-purple-100 text-purple-800',
    },
  ];

  const recentPosts = [
    {
      id: 4,
      title: 'AI Tools That Can Help You Write a Better Resume',
      excerpt: 'Explore the best AI-powered tools to enhance your resume writing process and stand out.',
      date: 'Mar 8, 2024',
      category: 'Technology',
      icon: <TrendingUp size={20} />,
    },
    {
      id: 5,
      title: 'Salary Negotiation Strategies for Every Career Level',
      excerpt: 'Learn how to negotiate your salary confidently, whether you\'re entry-level or senior executive.',
      date: 'Mar 5, 2024',
      category: 'Career Advice',
      icon: <Briefcase size={20} />,
    },
    {
      id: 6,
      title: 'Building a Personal Brand for Career Advancement',
      excerpt: 'Your personal brand can accelerate your career growth. Here\'s how to build it effectively.',
      date: 'Mar 3, 2024',
      category: 'Personal Branding',
      icon: <User size={20} />,
    },
    {
      id: 7,
      title: 'Remote Work Skills Employers Are Looking For',
      excerpt: 'Master the essential skills needed to thrive in remote and hybrid work environments.',
      date: 'Feb 28, 2024',
      category: 'Remote Work',
      icon: <BookOpen size={20} />,
    },
  ];

  const categories = [
    { name: 'Resume Tips', count: 12, icon: <FileTextIcon size={20} /> },
    { name: 'Interview Skills', count: 8, icon: <MessageSquare size={20} /> },
    { name: 'Career Growth', count: 15, icon: <TrendingUp size={20} /> },
    { name: 'Job Search', count: 10, icon: <SearchIcon size={20} /> },
    { name: 'Education', count: 6, icon: <GraduationCap size={20} /> },
  ];

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white">
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

      <main className="container mx-auto px-4 py-8 md:py-16 max-w-7xl">
        {/* Hero Section */}
        <div className="text-center mb-12 md:mb-16">
          <Badge className="mb-4 bg-gray-100 text-gray-800 hover:bg-gray-200">
            <BookOpen size={14} className="mr-2" />
            Career Insights & Professional Advice
          </Badge>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Professional <span className="text-gray-600">Insights</span> & Career <span className="text-gray-600">Advice</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Expert tips, industry trends, and strategies to advance your career and master job search techniques
          </p>
        </div>

        {/* Featured Posts */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Featured Articles</h2>
            <Link href="/blog/category/featured">
              <Button variant="ghost" className="gap-2">
                View All
                <ChevronRight size={16} />
              </Button>
            </Link>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {featuredPosts.map((post) => (
              <Card key={post.id} className="group overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="relative h-48 overflow-hidden">
                  <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent z-10" />
                  <div className="absolute top-4 left-4 z-20">
                    <Badge className={post.badgeColor}>{post.category}</Badge>
                  </div>
                  <div 
                    className="h-full w-full bg-gray-200 group-hover:scale-105 transition-transform duration-500"
                    style={{
                      backgroundImage: `url(${post.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  />
                </div>
                <CardHeader>
                  <CardTitle className="line-clamp-2 group-hover:text-gray-700 transition-colors">
                    {post.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-2">
                    {post.excerpt}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={post.authorAvatar} />
                        <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{post.author}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        <span>{post.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock size={14} />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-4">
                  <Link href={`/blog/${post.id}`} className="w-full">
                    <Button className="w-full gap-2">
                      Read Article
                      <ChevronRight size={16} />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Posts */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Recent Articles</h2>
              <Link href="/blog/archive">
                <Button variant="ghost" className="gap-2">
                  View Archive
                  <ChevronRight size={16} />
                </Button>
              </Link>
            </div>
            
            <div className="space-y-6">
              {recentPosts.map((post) => (
                <Card key={post.id} className="border border-gray-200 hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-gray-100 p-3 rounded-lg">
                        {post.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Badge variant="outline" className="text-xs">
                            {post.category}
                          </Badge>
                          <span className="text-sm text-gray-500 flex items-center gap-1">
                            <Calendar size={12} />
                            {post.date}
                          </span>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-gray-700 transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-gray-600 mb-4">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center justify-between">
                          <Link href={`/blog/${post.id}`}>
                            <Button variant="link" className="p-0 h-auto gap-2">
                              Read more
                              <ChevronRight size={16} />
                            </Button>
                          </Link>
                          <Button variant="ghost" size="sm" className="gap-2">
                            <Share2 size={16} />
                            Share
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Categories */}
            <Card className="border border-gray-200 mb-8">
              <CardHeader>
                <CardTitle className="text-xl">Browse Categories</CardTitle>
                <CardDescription>Explore topics by category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {categories.map((category) => (
                    <Link key={category.name} href={`/blog/category/${category.name.toLowerCase().replace(/\s+/g, '-')}`}>
                      <Button variant="ghost" className="w-full justify-between h-auto py-3 hover:bg-gray-50">
                        <div className="flex items-center gap-3">
                          <div className="text-gray-600">
                            {category.icon}
                          </div>
                          <span className="text-left">{category.name}</span>
                        </div>
                        <Badge variant="secondary" className="ml-2">
                          {category.count}
                        </Badge>
                      </Button>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Newsletter */}
            <Card className="border border-gray-200 bg-linear-to-br from-gray-50 to-white">
              <CardHeader>
                <CardTitle className="text-xl">Stay Updated</CardTitle>
                <CardDescription>Get the latest career tips directly in your inbox</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                    />
                    <Button className="w-full bg-gray-900 hover:bg-gray-800">
                      Subscribe
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500 text-center">
                    No spam. Unsubscribe at any time.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Stats Section */}
        <section className="mt-16 pt-8 border-t">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">250+</div>
              <div className="text-sm text-gray-600">Articles Published</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">50K+</div>
              <div className="text-sm text-gray-600">Monthly Readers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">15+</div>
              <div className="text-sm text-gray-600">Expert Contributors</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">98%</div>
              <div className="text-sm text-gray-600">Reader Satisfaction</div>
            </div>
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
              © {new Date().getFullYear()} ResumeBuilder. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}