'use client';

import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Calendar, User } from 'lucide-react';

interface StartupCardProps {
  startup: {
    id: string;
    title: string;
    description: string;
    category: string;
    image: string;
    author: {
      name: string;
      image: string;
    };
    createdAt: string;
  };
}

export default function StartupCard({ startup }: StartupCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <Link href={`/startup/${startup.id}`}>
      <Card className="h-full hover:shadow-lg transition-shadow duration-300 cursor-pointer border border-gray-200 hover:border-gray-300">
        <CardHeader className="p-0">
          <div className="aspect-video w-full overflow-hidden rounded-t-lg">
            <img
              src={startup.image}
              alt={startup.title}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <div className="space-y-3">
            <Badge variant="secondary" className="text-xs">
              {startup.category}
            </Badge>

            <h3 className="font-semibold text-lg text-gray-900 line-clamp-2 leading-tight">
              {startup.title}
            </h3>

            <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed">
              {startup.description}
            </p>

            <div className="flex items-center justify-between pt-2 border-t border-gray-100">
              <div className="flex items-center space-x-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={startup.author.image} alt={startup.author.name} />
                  <AvatarFallback className="text-xs">
                    {startup.author.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <span className="text-xs text-gray-500 font-medium">
                  {startup.author.name}
                </span>
              </div>
              
              <div className="flex items-center space-x-1 text-xs text-gray-400">
                <Calendar className="h-3 w-3" />
                <span>{formatDate(startup.createdAt)}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}