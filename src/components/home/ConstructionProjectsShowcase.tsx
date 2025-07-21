'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Building, ArrowRight, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getFeaturedConstructionProjects, ConstructionProjectDisplay } from '@/services/construction-service';
import { Locale } from '@/i18n/routing';
import { ProjectCard } from '@/components/shared/ProjectCard';

interface ConstructionProjectsShowcaseProps {
  projects?: ConstructionProjectDisplay[];
  locale: Locale;
}


export default function ConstructionProjectsShowcase({ projects: initialProjects, locale }: ConstructionProjectsShowcaseProps) {
  const t = useTranslations('ConstructionProjects');
  const [projects, setProjects] = useState<ConstructionProjectDisplay[]>(initialProjects || []);
  const [loading, setLoading] = useState(!initialProjects);

  useEffect(() => {
    const fetchProjects = async () => {
      if (initialProjects && initialProjects.length > 0) return;
      
      try {
        setLoading(true);
        const fetchedProjects = await getFeaturedConstructionProjects();
        setProjects(fetchedProjects);
      } catch (error) {
        console.error('Error fetching construction projects:', error);
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [initialProjects]);

  const handleShowMore = () => {
    // Navigate to all projects page
    window.location.href = `/${locale}/construction`;
  };

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

  // Don't render the section if there are no projects and loading is complete
  if (!loading && projects.length === 0) {
    return null;
  }

  return (
    <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900/20">
      <div className="container mx-auto px-3 sm:px-4 lg:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col space-y-6 sm:space-y-0 sm:flex-row sm:items-end sm:justify-between mb-8 sm:mb-10 md:mb-12"
        >
          <div className="text-center sm:text-start flex-1">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="inline-flex items-center gap-2 mb-3 sm:mb-4"
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <Building className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="h-1 w-8 sm:w-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full" />
            </motion.div>
            
            <h2 className="text-2xl sm:text-3xl md:text-4xl xl:text-5xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 leading-tight">
              {t('title', { defaultValue: 'أحدث مشاريعنا الإنشائية' })}
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-2xl leading-relaxed">
              {t('subtitle', { 
                defaultValue: 'استكشف أحدث مشاريع البناء التي تعرض الحرفية عالية الجودة والتصميم المبتكر.' 
              })}
            </p>
          </div>
          
          {/* View All Projects Button - Hidden on mobile, shown on larger screens */}
          {!loading && projects.length > 0 && (
            <div className="flex-shrink-0 hidden sm:block">
              <Button 
                size="lg" 
                onClick={handleShowMore}
                className="px-6 lg:px-8 py-2.5 lg:py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-0.5 text-sm lg:text-base"
              >
                {t('showMore', { defaultValue: 'عرض المزيد من المشاريع' })}
                {locale === 'ar' ? (
                  <ArrowLeft className="w-4 h-4 lg:w-5 lg:h-5 mr-2" />
                ) : (
                  <ArrowRight className="w-4 h-4 lg:w-5 lg:h-5 ml-2" />
                )}
              </Button>
            </div>
          )}
        </motion.div>

        {/* Projects Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-10 md:mb-12">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="bg-gray-200 dark:bg-gray-700 rounded-xl sm:rounded-2xl h-48 sm:h-56 lg:h-64 mb-3 sm:mb-4"></div>
                <div className="space-y-2 sm:space-y-3 px-1">
                  <div className="h-3 sm:h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                  <div className="h-2.5 sm:h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                  <div className="h-2.5 sm:h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-10 md:mb-12"
            >
              {projects.map((project) => (
                <motion.div key={project.id} variants={itemVariants}>
                  <ProjectCard
                    project={project}
                    locale={locale}
                    href={`/${locale}/construction/${project.id}`}
                    variant="showcase"
                    showDescription={true}
                    showImages={true}
                    imageHeight="h-48 sm:h-56 lg:h-64"
                  />
                </motion.div>
              ))}
            </motion.div>
            
            {/* Mobile View All Button */}
            <div className="flex justify-center sm:hidden">
              <Button 
                onClick={handleShowMore}
                className="w-full max-w-sm px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-all duration-300 shadow-sm hover:shadow-md text-sm font-medium"
              >
                {t('showMore', { defaultValue: 'عرض المزيد من المشاريع' })}
                {locale === 'ar' ? (
                  <ArrowLeft className="w-4 h-4 mr-2" />
                ) : (
                  <ArrowRight className="w-4 h-4 ml-2" />
                )}
              </Button>
            </div>
          </>
        )}

      </div>
    </section>
  );
}