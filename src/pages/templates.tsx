import React, { useState } from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Filter } from 'lucide-react';
import { TemplateCard } from '@/components/templates/TemplateCard';
import { templates } from '@/data/templates';

export default function TemplateSelection() {
  const [categoryFilter, setCategoryFilter] = useState('all');

  const categories = ['all', 'free', 'pro'];

  const filteredTemplates = categoryFilter === 'all' 
    ? templates 
    : templates.filter(t => t.category === categoryFilter);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/">
            <div className="flex items-center gap-2 cursor-pointer">
              {/* Updated: Replaced "R" circle with favicon */}
              <img 
                src="/favicon.png"
                alt="ResumeCon Logo"
                className="h-8 w-8 object-contain"
              />
              <span className="font-serif font-bold text-xl tracking-tight">
                Resume<span className="text-blue-600">Con</span>
              </span>
            </div>
          </Link>

          {/* Empty div to maintain flex spacing - navigation buttons removed */}
          <div></div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 md:py-12">
        <div className="text-center mb-10 md:mb-16">
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Classic Resume Template
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Professional two-column design with clean typography. 
            A4-sized, print-ready, and completely free.
          </p>
          
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            <Button
              variant={categoryFilter === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setCategoryFilter('all')}
              className="gap-2"
            >
              <Filter size={14} />
              All Templates
            </Button>
            {categories.filter(c => c !== 'all').map((category) => (
              <Button
                key={category}
                variant={categoryFilter === category ? 'default' : 'outline'}
                size="sm"
                onClick={() => setCategoryFilter(category)}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
          {filteredTemplates.map((template) => (
            <TemplateCard
              key={template.id}
              id={template.id}
              name={template.name}
              description={template.description}
              category={template.category}
              color={template.previewColor}
              premium={template.premium}
            />
          ))}
        </div>
      </main>

      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-gray-400">
              &copy; 2024 ResumeCon. All templates are free to use.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
