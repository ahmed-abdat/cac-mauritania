import React from "react";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Locale } from "@/i18n/routing";
import { ConstructionProjectDetails } from "@/components/construction/ConstructionProjectDetails";
import { getConstructionProjectById, getConstructionProjects } from "@/services/construction-service";

interface ConstructionProjectPageProps {
  params: Promise<{
    locale: string;
    id: string;
  }>;
}

export async function generateMetadata({
  params,
}: ConstructionProjectPageProps): Promise<Metadata> {
  const { locale, id } = await params;
  
  // Try to get project from both categories since we don't know which one it belongs to
  let project = await getConstructionProjectById('ready-construction', id);
  if (!project) {
    project = await getConstructionProjectById('regular-construction', id);
  }

  if (!project) {
    return {
      title: 'Project Not Found | CAC',
      description: 'The requested construction project was not found.',
    };
  }

  const typedLocale = locale as Locale;
  const title = project.title[typedLocale as keyof typeof project.title];
  const description = project.description?.[typedLocale as keyof typeof project.description] || project.title[typedLocale as keyof typeof project.title];

  return {
    title: `${title} | CAC - مركز الريادة والاستشارات`,
    description,
    keywords: [
      `CAC ${title}`,
      `${title} construction project`,
      `${project.category} CAC`,
      'construction Mauritania CAC',
    ],
    openGraph: {
      title: `${title} | CAC - مركز الريادة والاستشارات`,
      description,
      url: `https://cacmauritanie.mr/${locale}/construction/${id}`,
      type: "website",
      images: project.images.length > 0 ? [
        {
          url: project.images[0].url,
          width: 1200,
          height: 630,
          alt: title,
        },
      ] : [
        {
          url: '/og-image.jpeg',
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    alternates: {
      canonical: `/${locale}/construction/${id}`,
      languages: {
        en: `/en/construction/${id}`,
        fr: `/fr/construction/${id}`,
        ar: `/ar/construction/${id}`,
      },
    },
  };
}

export default async function ConstructionProjectPage({ params }: ConstructionProjectPageProps) {
  const { locale, id } = await params;
  const typedLocale = locale as Locale;
  
  // Try to get project from both categories
  let project = await getConstructionProjectById('ready-construction', id);
  if (!project) {
    project = await getConstructionProjectById('regular-construction', id);
  }

  if (!project) {
    notFound();
  }

  const title = project.title[typedLocale as keyof typeof project.title];

  return (
    <>
      <h1 className="sr-only">{title}</h1>
      <ConstructionProjectDetails project={project} locale={typedLocale} />
    </>
  );
}

// Generate static params for all construction projects
export async function generateStaticParams() {
  try {
    const allProjects = await getConstructionProjects();
    
    return allProjects.map((project) => ({
      id: project.id,
    }));
  } catch (error) {
    console.error('Error generating static params for construction projects:', error);
    return [];
  }
}