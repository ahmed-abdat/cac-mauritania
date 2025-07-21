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
        return 'h-48 sm:h-56 lg:h-64 xl:h-72';
      case 'related':
        return 'h-40 sm:h-48';
      default:
        return imageHeight || 'h-48 sm:h-56';
    }
  };

  const getCardPadding = () => {
    switch (variant) {
      case 'showcase':
        return 'p-4 sm:p-5 lg:p-6';
      case 'related':
        return 'p-3 sm:p-4';
      default:
        return 'p-4 sm:p-5';
    }
  };

  const getTitleSize = () => {
    switch (variant) {
      case 'showcase':
        return 'text-lg sm:text-xl lg:text-2xl';
      case 'related':
        return 'text-base sm:text-lg';
      default:
        return 'text-lg sm:text-xl';
    }
  };

  return (
    <Link href={href}>
      <Card className="group h-full overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 bg-white dark:bg-slate-800 border-0 shadow-sm cursor-pointer rounded-xl sm:rounded-2xl">
        {/* Project Image */}
        <div className={`relative ${getCardHeight()} overflow-hidden rounded-t-xl sm:rounded-t-2xl`}>
          <Image
            src={project.images[0]?.url || '/hero.webp'}
            alt={project.title[locale as keyof typeof project.title]}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
            priority={variant === 'showcase'}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          
          {/* Category Badge */}
          <div className={`absolute top-3 sm:top-4 ${locale === 'ar' ? 'right-3 sm:right-4' : 'left-3 sm:left-4'}`}>
            <Badge className={`${categoryColors[project.category as keyof typeof categoryColors] || 'bg-gray-100 text-gray-800'} text-xs sm:text-sm font-medium px-2 sm:px-3 py-1 rounded-full shadow-sm backdrop-blur-sm`}>
              {t(`categories.${project.category}`, { 
                defaultValue: project.category.replace('-', ' ') 
              })}
            </Badge>
          </div>

          {/* View Project Button (only for showcase variant) */}
          {variant === 'showcase' && (
            <div className={`absolute top-3 sm:top-4 ${locale === 'ar' ? 'left-3 sm:left-4' : 'right-3 sm:right-4'} opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0`}>
              <div className="bg-white/95 hover:bg-white rounded-full p-2 sm:p-2.5 shadow-lg backdrop-blur-sm">
                <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-700" />
              </div>
            </div>
          )}

          {/* Date */}
          <div className={`absolute bottom-3 sm:bottom-4 ${locale === 'ar' ? 'right-3 sm:right-4' : 'left-3 sm:left-4'} flex items-center gap-1.5 sm:gap-2 text-white text-xs sm:text-sm backdrop-blur-sm bg-black/20 rounded-full px-2 sm:px-3 py-1 sm:py-1.5`}>
            <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="font-medium">
              {variant === 'related' 
                ? formatDate(project.createdAt, locale, 'short')
                : formatDate(project.createdAt, locale, 'full')
              }
            </span>
          </div>

          {/* Mobile-specific overlay gradient for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent sm:hidden" />
        </div>

        <CardContent className={`${getCardPadding()} flex-1 flex flex-col space-y-3 sm:space-y-4`}>
          {/* Project Title */}
          <h3 className={`${getTitleSize()} sm:text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2 leading-tight`}>
            {project.title[locale as keyof typeof project.title]}
          </h3>

          {/* Project Description */}
          {showDescription && project.description && (
            <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm leading-relaxed line-clamp-2 sm:line-clamp-3 flex-1">
              {project.description[locale as keyof typeof project.description]}
            </p>
          )}

          {/* Bottom Info */}
          <div className="mt-auto pt-2 sm:pt-3 border-t border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                {showImages && (
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="font-medium">{project.images.length} {t('images', { defaultValue: 'صور' })}</span>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2 text-blue-600 dark:text-blue-400">
                <span className="text-xs sm:text-sm font-semibold">
                  {t('viewProject', { defaultValue: 'عرض المشروع' })}
                </span>
                {locale === 'ar' ? (
                  <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:-translate-x-1 transition-transform duration-300" />
                ) : (
                  <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform duration-300" />
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}