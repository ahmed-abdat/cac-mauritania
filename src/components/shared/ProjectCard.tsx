'use client';

import { useTranslations } from 'next-intl';
import { Calendar, ArrowRight, ArrowLeft, Eye } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ConstructionProjectDisplay } from '@/services/construction-service';
import { Locale } from '@/i18n/routing';
import { useSafeDateFormatter } from '@/utils/dateUtils';
import Image from 'next/image';
import Link from 'next/link';

interface ProjectCardProps {
  project: ConstructionProjectDisplay;
  locale: Locale;
  href: string;
  variant?: 'showcase' | 'grid' | 'related';
  showDescription?: boolean;
  showImages?: boolean;
  imageHeight?: string;
}

const categoryColors = {
  'ready-construction': 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400',
  'regular-construction': 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400'
};

export function ProjectCard({ 
  project, 
  locale, 
  href, 
  variant = 'grid',
  showDescription = true,
  showImages = true,
  imageHeight = 'h-48'
}: ProjectCardProps) {
  const t = useTranslations('ConstructionProjects');
  const { formatDate } = useSafeDateFormatter();

  const getCardHeight = () => {
    switch (variant) {
      case 'showcase':
        return 'h-64';
      case 'related':
        return 'h-48';
      default:
        return imageHeight;
    }
  };

  const getCardPadding = () => {
    switch (variant) {
      case 'showcase':
        return 'p-6';
      case 'related':
        return 'p-4';
      default:
        return 'p-4';
    }
  };

  const getTitleSize = () => {
    switch (variant) {
      case 'showcase':
        return 'text-xl';
      case 'related':
        return 'text-lg';
      default:
        return 'text-lg';
    }
  };

  return (
    <Link href={href}>
      <Card className="group h-full overflow-hidden hover:shadow-md transition-all duration-300 bg-white dark:bg-slate-800 border-0 shadow-sm cursor-pointer">
        {/* Project Image */}
        <div className={`relative ${getCardHeight()} overflow-hidden`}>
          <Image
            src={project.images[0]?.url || '/hero.png'}
            alt={project.title[locale as keyof typeof project.title]}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          
          {/* Category Badge */}
          <div className={`absolute top-4 ${locale === 'ar' ? 'right-4' : 'left-4'}`}>
            <Badge className={categoryColors[project.category as keyof typeof categoryColors] || 'bg-gray-100 text-gray-800'}>
              {t(`categories.${project.category}`, { 
                defaultValue: project.category.replace('-', ' ') 
              })}
            </Badge>
          </div>

          {/* View Project Button (only for showcase variant) */}
          {variant === 'showcase' && (
            <div className={`absolute top-4 ${locale === 'ar' ? 'left-4' : 'right-4'} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
              <div className="bg-white/90 hover:bg-white rounded-full p-2">
                <Eye className="w-4 h-4 text-gray-700" />
              </div>
            </div>
          )}

          {/* Date */}
          <div className={`absolute bottom-4 ${locale === 'ar' ? 'right-4' : 'left-4'} flex items-center gap-2 text-white text-sm`}>
            <Calendar className="w-4 h-4" />
            <span>
              {variant === 'related' 
                ? formatDate(project.createdAt, locale, 'short')
                : formatDate(project.createdAt, locale, 'full')
              }
            </span>
          </div>
        </div>

        <CardContent className={`${getCardPadding()} flex-1 flex flex-col`}>
          {/* Project Title */}
          <h3 className={`${getTitleSize()} font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2`}>
            {project.title[locale as keyof typeof project.title]}
          </h3>

          {/* Project Description */}
          {showDescription && project.description && (
            <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm leading-relaxed line-clamp-3">
              {project.description[locale as keyof typeof project.description]}
            </p>
          )}

          {/* Bottom Info */}
          <div className="mt-auto">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {showImages && (
                  <span>{project.images.length} {t('images', { defaultValue: 'images' })}</span>
                )}
              </div>
              <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                <span className="text-sm font-medium">
                  {t('viewProject', { defaultValue: 'View Project' })}
                </span>
                {locale === 'ar' ? (
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                ) : (
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}