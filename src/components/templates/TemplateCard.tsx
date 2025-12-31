import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Crown } from 'lucide-react';
import { useLocation } from 'wouter';

interface TemplateCardProps {
  id: string;
  name: string;
  description: string;
  category: string;
  color: string;
  premium: boolean;
  selected?: boolean;
}

export function TemplateCard({
  id,
  name,
  description,
  category,
  color,
  premium,
  selected = false,
}: TemplateCardProps) {
  const [, setLocation] = useLocation();

  const handleSelect = () => {
    setLocation(`/builder?template=${id}`);
  };

  return (
    <Card 
      className={`cursor-pointer transition-all duration-300 hover:shadow-xl border-2 ${selected ? 'border-primary' : 'border-transparent hover:border-gray-300'}`}
      onClick={handleSelect}
    >
      <CardContent className="p-0">
        <div className="w-full overflow-hidden relative">
          <img 
            src={`/images/templates/${id}.png`}
            alt={`${name} Template`}
            className="w-full h-auto"
          />
          {premium && (
            <div className="absolute top-3 right-3 bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
              <Crown size={10} />
              PRO
            </div>
          )}
        </div>
        
        <div className="p-5">
          <div className="flex justify-between items-start mb-4">
            <h3 className="font-serif text-lg font-semibold">{name}</h3>
            {selected && (
              <Check className="h-5 w-5 text-primary" />
            )}
          </div>
          
          <div className="flex justify-between items-center">
            <span className={`text-xs px-2 py-1 rounded-full ${premium ? 'bg-amber-100 text-amber-800' : 'bg-green-100 text-green-800'}`}>
              {premium ? 'PRO' : 'FREE'}
            </span>
            <Button size="sm" variant={selected ? "default" : "outline"}>
              Select
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}