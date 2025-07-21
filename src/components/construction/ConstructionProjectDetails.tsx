'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { ArrowLeft, ArrowRight, Calendar, Building, Grid3x3, Eye, Play, ImageIcon, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ConstructionProjectDisplay, getRelatedConstructionProjects } from '@/services/construction-service';
import { Locale } from '@/i18n/routing';
import { useInView } from 'react-intersection-observer';
import { MediaPreviewModal } from '@/components/media/MediaPreviewModal';
import { ProjectCard } from '@/components/shared/ProjectCard';
import Image from 'next/image';
import Link from 'next/link';

interface ConstructionProjectDetailsProps {
  project: ConstructionProjectDisplay;
  locale: Locale;
}

const categoryColors = {
  'ready-construction': 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400',
  'regular-construction': 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400'
};

export function ConstructionProjectDetails({ project, locale }: ConstructionProjectDetailsProps) {
  const t = useTranslations('ConstructionProjects');
  
  const [relatedProjects, setRelatedProjects] = useState<ConstructionProjectDisplay[]>([]);
  const [loadingRelated, setLoadingRelated] = useState(true);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [isClient, setIsClient] = useState(false);

  // Fix hydration mismatch by ensuring client-side rendering for dates
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Convert project images to MediaPreview format
  const mediaItems = useMemo(() => {
    return project.images.map((image, index) => ({
      url: image.url,
      id: image.id,
      type: 'image' as const,
      uniqueId: `${project.id}_${index}`,
    }));
  }, [project.images, project.id]);

  // Fetch related projects
  const fetchRelatedProjects = useCallback(async () => {
    try {
      setLoadingRelated(true);
      const related = await getRelatedConstructionProjects(project.id, project.category, 3);
      setRelatedProjects(related);
    } catch (error) {
      console.error('Error fetching related projects:', error);
      setRelatedProjects([]);
    } finally {
      setLoadingRelated(false);
    }
  }, [project.id, project.category]);

  useEffect(() => {
    fetchRelatedProjects();
  }, [fetchRelatedProjects]);

  // Handle media click with modal
  const handleMediaClick = useCallback((index: number) => {
    setSelectedImageIndex(index);
    setIsFullScreen(true);
  }, []);

  const handleExitFullScreen = useCallback(() => {
    setIsFullScreen(false);
    setSelectedImageIndex(null);
  }, []);

  const handleModalNavigate = useCallback((newIndex: number) => {
    setSelectedImageIndex(newIndex);
  }, []);

  // Handle body overflow for modal
  useEffect(() => {
    document.body.style.overflow = isFullScreen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isFullScreen]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="container mx-auto px-4 py-6">
        {/* Back Button */}
        <div className="mb-6">
          <Link href={`/${locale}/construction`}>
            <Button variant="ghost" className="gap-2 hover:bg-gray-100 dark:hover:bg-gray-800">
              {locale === 'ar' ? (
                <ArrowRight className="w-4 h-4" />
              ) : (
                <ArrowLeft className="w-4 h-4" />
              )}
              {t('backToProjects', { defaultValue: 'Back to Projects' })}
            </Button>
          </Link>
        </div>

        {/* Project Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <Badge className={categoryColors[project.category as keyof typeof categoryColors] || 'bg-gray-100 text-gray-800'}>
                  {t(`categories.${project.category}`, { 
                    defaultValue: project.category.replace('-', ' ') 
                  })}
                </Badge>
                <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm">
                  <Calendar className="w-4 h-4" />
                  <span>
                    {isClient ? (
                      project.createdAt.toLocaleDateString(locale, {
                        year: 'numeric',
                        month: 'numeric',
                        day: 'numeric',
                        numberingSystem: 'latn' // Force Latin numerals
                      })
                    ) : (
                      project.createdAt.toLocaleDateString('en', {
                        year: 'numeric',
                        month: 'numeric',
                        day: 'numeric'
                      })
                    )}
                  </span>
                </div>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                {project.title[locale as keyof typeof project.title]}
              </h1>
            </div>
            
            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
              <Grid3x3 className="w-5 h-5" />
              <span className="font-medium">
                {project.images.length} {t('images', { defaultValue: 'images' })}
              </span>
            </div>
          </div>

          {/* Project Description */}
          {project.description && (
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                {project.description[locale as keyof typeof project.description]}
              </p>
            </div>
          )}
        </motion.div>

        {/* Images Gallery */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            {t('projectGallery', { defaultValue: 'Project Gallery' })}
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {project.images.map((image, index) => (
              <motion.div
                key={image.id}
                variants={itemVariants}
                className="group relative w-full aspect-square cursor-pointer rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 bg-white dark:bg-gray-800"
                onClick={() => handleMediaClick(index)}
              >
                <Image
                  src={image.url}
                  alt={`${project.title[locale as keyof typeof project.title]} - Image ${index + 1}`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  priority={index < 4} // Prioritize first 4 images
                />

                {/* Overlay with view indicator */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="bg-white/90 backdrop-blur-sm rounded-full p-3 transform scale-90 group-hover:scale-100 transition-transform duration-300">
                    <Eye className="h-6 w-6 text-gray-700" />
                  </div>
                </div>

                {/* Image number badge */}
                <div className={`absolute top-3 ${locale === 'ar' ? 'left-3' : 'right-3'} bg-black/60 backdrop-blur-sm text-white px-2 py-1 rounded-md text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
                  {index + 1} / {project.images.length}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Related Projects */}
        {(relatedProjects.length > 0 || loadingRelated) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              {t('relatedProjects', { defaultValue: 'Related Projects' })}
            </h2>
            
            {loadingRelated ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 3 }).map((_, index) => (
                  <div key={index} className="animate-pulse">
                    <div className="bg-gray-200 dark:bg-gray-700 rounded-lg h-48 mb-4"></div>
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedProjects.map((relatedProject) => (
                  <ProjectCard
                    key={relatedProject.id}
                    project={relatedProject}
                    locale={locale}
                    href={`/${locale}/construction/${relatedProject.id}`}
                    variant="related"
                    showDescription={false}
                    showImages={true}
                    imageHeight="h-48"
                  />
                ))}
              </div>
            )}
          </motion.div>
        )}

        {/* Back to Top */}
        <div className="text-center">
          <Link href={`/${locale}/construction`}>
            <Button variant="outline" className="px-8 py-3">
              {t('viewAllProjects', { defaultValue: 'View All Projects' })}
            </Button>
          </Link>
        </div>
      </div>

      {/* Enhanced Modal using the existing MediaPreviewModal */}
      {isFullScreen && selectedImageIndex !== null && (
        <MediaPreviewModal
          isOpen={isFullScreen}
          onClose={handleExitFullScreen}
          items={mediaItems}
          currentIndex={selectedImageIndex}
          onNavigate={handleModalNavigate}
        />
      )}
    </div>
  );
}