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

  return (
    <section className="py-16 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900/20">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-center md:justify-between mb-12"
        >
          <div className="text-center md:text-start mb-6 md:mb-0">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {t('title', { defaultValue: 'Our Latest Construction Projects' })}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl">
              {t('subtitle', { 
                defaultValue: 'Explore our most recent construction projects showcasing quality craftsmanship and innovative design.' 
              })}
            </p>
          </div>
          
          {/* View All Projects Button */}
          {!loading && projects.length > 0 && (
            <div className="flex-shrink-0">
              <Button 
                size="lg" 
                onClick={handleShowMore}
                className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-300 shadow-sm hover:shadow-md"
              >
                {t('showMore', { defaultValue: 'Show More Projects' })}
                {locale === 'ar' ? (
                  <ArrowLeft className="w-5 h-5 mr-2" />
                ) : (
                  <ArrowRight className="w-5 h-5 ml-2" />
                )}
              </Button>
            </div>
          )}
        </motion.div>

        {/* Projects Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="bg-gray-200 dark:bg-gray-700 rounded-lg h-64 mb-4"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-12 mb-12">
            <Building className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              {t('noProjects', { defaultValue: 'No Projects Found' })}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {t('noProjectsDescription', { 
                defaultValue: 'No construction projects are available at the moment. Please check back later.' 
              })}
            </p>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
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
                  imageHeight="h-64"
                />
              </motion.div>
            ))}
          </motion.div>
        )}

      </div>
    </section>
  );
}