import Script from 'next/script';

interface StructuredDataProps {
  data: object;
  id?: string;
}

/**
 * Component for adding JSON-LD structured data to pages
 * Helps search engines understand page content and show rich snippets
 */
export default function StructuredData({ data, id = "structured-data" }: StructuredDataProps) {
  return (
    <Script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
      strategy="beforeInteractive"
    />
  );
}

export { StructuredData };