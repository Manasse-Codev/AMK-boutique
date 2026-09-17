import { useEffect } from 'react';

export interface PageSEOProps {
  title: string;
  description: string;
  canonicalPath?: string;
  ogImage?: string;
  noIndex?: boolean;
  schemaData?: Record<string, unknown> | null;
}

const SITE_URL = 'https://amk-bouquets.ci';
const DEFAULT_IMAGE = `${SITE_URL}/assets/rose_blush_champagne.png`;

export function usePageSEO({
  title,
  description,
  canonicalPath = '',
  ogImage = DEFAULT_IMAGE,
  noIndex = false,
  schemaData = null,
}: PageSEOProps) {
  useEffect(() => {
    // 1. Update Document Title
    document.title = title;

    // Helper to update or create meta tag
    const setMetaTag = (nameOrProperty: 'name' | 'property', key: string, content: string) => {
      let element = document.querySelector(`meta[${nameOrProperty}="${key}"]`) as HTMLMetaElement | null;
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(nameOrProperty, key);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // 2. Meta Description & Keywords
    setMetaTag('name', 'description', description);

    // 3. Robots
    setMetaTag('name', 'robots', noIndex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large');

    // 4. Canonical URL
    const canonicalUrl = `${SITE_URL}${canonicalPath.startsWith('/') ? canonicalPath : `/${canonicalPath}`}`;
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonicalUrl);

    // 5. Open Graph Meta Tags
    setMetaTag('property', 'og:title', title);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:url', canonicalUrl);
    setMetaTag('property', 'og:image', ogImage);

    // 6. Twitter Card Meta Tags
    setMetaTag('name', 'twitter:title', title);
    setMetaTag('name', 'twitter:description', description);
    setMetaTag('name', 'twitter:image', ogImage);

    // 7. Dynamic JSON-LD Schema
    const scriptId = 'page-schema-jsonld';
    let scriptTag = document.getElementById(scriptId) as HTMLScriptElement | null;

    if (schemaData) {
      if (!scriptTag) {
        scriptTag = document.createElement('script');
        scriptTag.id = scriptId;
        scriptTag.type = 'application/ld+json';
        document.head.appendChild(scriptTag);
      }
      scriptTag.text = JSON.stringify(schemaData);
    } else if (scriptTag) {
      scriptTag.remove();
    }

    return () => {
      const el = document.getElementById(scriptId);
      if (el) el.remove();
    };
  }, [title, description, canonicalPath, ogImage, noIndex, schemaData]);
}
