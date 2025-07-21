'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Building, Grid3x3, RefreshCw, AlertCircle, FolderOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { getConstructionProjects, ConstructionProjectDisplay } from '@/services/construction-service';
import { Locale } from '@/i18n/routing';
import { useInView } from 'react-intersection-observer';
import { ProjectCard } from '@/components/shared/ProjectCard';

interface ConstructionProjectsGridProps {
  locale: Locale;
}


export function ConstructionProjectsGrid({ locale }: ConstructionProjectsGridProps) {
  const t = useTranslations('ConstructionProjects');
  
  const [allProjects, setAllProjects] = useState<ConstructionProjectDisplay[]>([]);
  const [displayedProjects, setDisplayedProjects] = useState<ConstructionProjectDisplay[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const [lastProjectIndex, setLastProjectIndex] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'ready-construction' | 'regular-construction'>('all');
  const [retryCount, setRetryCount] = useState(0);

  // Intersection Observer for lazy loading
  const { ref, inView } = useInView({
    threshold: 0.1,
    rootMargin: '100px',
  });

  // Filter projects based on category
  const filteredProjects = useMemo(() => {
    if (categoryFilter === 'all') return allProjects;
    return allProjects.filter((project) => project.category === categoryFilter);
  }, [allProjects, categoryFilter]);

  // Create displayed projects with pagination
  const uniqueDisplayedProjects = useMemo(() => {
    return filteredProjects.slice(0, lastProjectIndex);
  }, [filteredProjects, lastProjectIndex]);

  // Calculate statistics
  const projectStats = useMemo(() => {
    const readyCount = allProjects.filter((p) => p.category === 'ready-construction').length;
    const regularCount = allProjects.filter((p) => p.category === 'regular-construction').length;
    return {
      total: allProjects.length,
      ready: readyCount,
      regular: regularCount,
    };
  }, [allProjects]);

  // Enhanced fetch function with retry logic
  const fetchConstructionProjects = useCallback(
    async (isRetry = false) => {
      if (!isRetry) {
        setLoading(true);
        setError(null);
      }

      try {
        const projectData = await getConstructionProjects(undefined, 50); // Fetch more projects for grid

        if (!projectData || projectData.length === 0) {
          setError(t('noProjects'));
          return;
        }

        setAllProjects(projectData);
        setDisplayedProjects(projectData.slice(0, 12)); // Show 12 initially
        setLastProjectIndex(12);
        setRetryCount(0);
      } catch (error) {
        console.error('Error fetching construction projects:', error);
        setError(t('noProjectsDescription'));
      } finally {
        setLoading(false);
      }
    },
    [t]
  );

  // Fetch more projects with pagination
  const fetchMoreProjects = useCallback(() => {
    if (isFetching || lastProjectIndex >= filteredProjects.length) return;

    setIsFetching(true);

    // Simulate network delay for better UX
    setTimeout(() => {
      const newLastIndex = Math.min(lastProjectIndex + 12, filteredProjects.length);
      setLastProjectIndex(newLastIndex);
      setIsFetching(false);
    }, 300);
  }, [isFetching, lastProjectIndex, filteredProjects.length]);

  // Handle retry
  const handleRetry = useCallback(() => {
    setRetryCount((prev) => prev + 1);
    fetchConstructionProjects(true);
  }, [fetchConstructionProjects]);

  // Initial fetch
  useEffect(() => {
    fetchConstructionProjects();
  }, [fetchConstructionProjects]);

  // Lazy loading effect
  useEffect(() => {
    if (inView && lastProjectIndex < filteredProjects.length && !isFetching) {
      fetchMoreProjects();
    }
  }, [inView, lastProjectIndex, filteredProjects.length, isFetching, fetchMoreProjects]);

  // Reset pagination when filter changes
  useEffect(() => {
    setLastProjectIndex(12);
  }, [categoryFilter]);

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

  // Loading state
  if (loading) {
    return (
      <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
        <section className="py-6 md:py-10 mx-auto max-w-7xl px-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {t('allProjectsTitle', { defaultValue: 'All Construction Projects' })}
            </h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 12 }).map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="bg-gray-200 dark:bg-gray-700 rounded-lg h-64 mb-4"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
        <section className="py-6 md:py-10 mx-auto max-w-7xl px-4">
          <h1 className="text-4xl font-bold text-center mb-8 text-gray-900 dark:text-white">
            {t('allProjectsTitle', { defaultValue: 'All Construction Projects' })}
          </h1>
          <div className="text-center py-20">
            <div className="mx-auto w-24 h-24 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mb-6">
              <AlertCircle className="h-12 w-12 text-red-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              {t('noProjects')}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">{error}</p>
            <Button
              onClick={handleRetry}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2"
              disabled={loading}
            >
              {loading ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  {t('retrying', { defaultValue: 'Retrying...' })}
                </>
              ) : (
                <>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  {t('tryAgain', { defaultValue: 'Try Again' })}
                </>
              )}
            </Button>
            {retryCount > 0 && (
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                Retry attempt: {retryCount}
              </p>
            )}
          </div>
        </section>
      </div>
    );
  }

  // Empty state
  if (allProjects.length === 0) {
    return (
      <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
        <section className="py-6 md:py-10 mx-auto max-w-7xl px-4">
          <h1 className="text-4xl font-bold text-center mb-8 text-gray-900 dark:text-white">
            {t('allProjectsTitle', { defaultValue: 'All Construction Projects' })}
          </h1>
          <div className="text-center py-20">
            <div className="mx-auto w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-6">
              <FolderOpen className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              {t('noProjects')}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
              {t('noProjectsDescription')}
            </p>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <section className="py-6 md:py-10 mx-auto max-w-7xl px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t('allProjectsTitle', { defaultValue: 'All Construction Projects' })}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-6">
            {t('allProjectsDescription', { 
              defaultValue: 'Explore our complete portfolio of construction projects showcasing quality craftsmanship and innovative design.' 
            })}
          </p>
        </div>

        {/* Category Filters */}
        <div className="mb-8">
          <ScrollArea className="w-full" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
            <div className="flex justify-center gap-3 pb-4 md:flex-wrap">
              {(['all', 'ready-construction', 'regular-construction'] as const).map((category) => {
                const isActive = categoryFilter === category;
                const categoryCount = category === 'all' 
                  ? projectStats.total 
                  : category === 'ready-construction' 
                    ? projectStats.ready 
                    : projectStats.regular;
                
                return (
                  <Button
                    key={category}
                    variant={isActive ? 'default' : 'outline'}
                    onClick={() => setCategoryFilter(category)}
                    className={`
                      px-4 py-2 flex-shrink-0 flex items-center gap-2 min-w-fit whitespace-nowrap
                      ${isActive 
                        ? 'bg-blue-600 hover:bg-blue-700 text-white border-blue-600' 
                        : 'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600'
                      }
                    `}
                  >
                    <span>
                      {t(`categories.${category}`, {
                        defaultValue: category === 'all' ? 'All Projects' : 
                          category === 'ready-construction' ? 'Ready Construction' : 'Regular Construction'
                      })}
                    </span>
                    <span className={`
                      text-xs px-2 py-0.5 rounded-full font-medium
                      ${isActive 
                        ? 'bg-blue-500 text-white' 
                        : category === 'ready-construction'
                          ? 'bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400'
                          : category === 'regular-construction'
                            ? 'bg-orange-100 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                      }
                    `}>
                      {categoryCount}
                    </span>
                  </Button>
                );
              })}
            </div>
            <ScrollBar orientation="horizontal" className="md:hidden" />
          </ScrollArea>
        </div>

        {/* Projects Grid */}
        {uniqueDisplayedProjects.length > 0 ? (
          <>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8"
            >
              {uniqueDisplayedProjects.map((project) => (
                <motion.div key={project.id} variants={itemVariants}>
                  <ProjectCard
                    project={project}
                    locale={locale}
                    href={`/${locale}/construction/${project.id}`}
                    variant="grid"
                    showDescription={true}
                    showImages={true}
                    imageHeight="h-48"
                  />
                </motion.div>
              ))}
            </motion.div>

            {/* Loading more indicator */}
            {isFetching && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div key={index} className="animate-pulse">
                    <div className="bg-gray-200 dark:bg-gray-700 rounded-lg h-48 mb-4"></div>
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Load more trigger */}
            <div ref={ref} className="w-full h-20 flex items-center justify-center">
              {!isFetching && lastProjectIndex < filteredProjects.length && (
                <div className="text-center">
                  <div className="inline-flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow-sm">
                    <RefreshCw className="h-4 w-4 animate-pulse" />
                    {t('loadingMore', { defaultValue: 'Loading more...' })}
                  </div>
                </div>
              )}
              {lastProjectIndex >= filteredProjects.length && filteredProjects.length > 12 && (
                <div className="text-center">
                  <div className="inline-flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow-sm">
                    ✓ {t('allProjectsLoaded', { defaultValue: 'All projects loaded' })}
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          // Filtered empty state
          <div className="text-center py-20">
            <div className="mx-auto w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-6">
              <Building className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              {t('noProjectsInCategory', { defaultValue: 'No projects found in this category' })}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-4">
              {t('filterEmptyDescription', { defaultValue: 'Try selecting a different category to view projects.' })}
            </p>
            <Button
              onClick={() => setCategoryFilter('all')}
              variant="outline"
              className="border-gray-300 hover:border-gray-400"
            >
              {t('showAllProjects', { defaultValue: 'Show All Projects' })}
            </Button>
          </div>
        )}
      </section>
    </div>
  );
}