import { useEffect } from 'react'

interface SEOProps {
  title?: string
  description?: string
  keywords?: string
  image?: string
  url?: string
  type?: 'website' | 'article'
}

export default function SEO({
  title = 'Tu Techo Ahora - Encuentra tu hogar ideal',
  description = 'Inmobiliaria especializada en encontrar el hogar ideal para ti y tu familia. Propiedades en venta y alquiler con asesoría personalizada.',
  keywords = 'inmobiliaria, propiedades, casas, apartamentos, venta, alquiler, hogar, real estate',
  image = '/logoPrincipal.jpg',
  url = window.location.href,
  type = 'website'
}: SEOProps) {
  useEffect(() => {
    document.title = title

    const updateMetaTag = (name: string, content: string) => {
      let meta = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement
      if (!meta) {
        meta = document.createElement('meta')
        meta.name = name
        document.head.appendChild(meta)
      }
      meta.content = content
    }

    const updateOGTag = (property: string, content: string) => {
      let meta = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement
      if (!meta) {
        meta = document.createElement('meta')
        meta.setAttribute('property', property)
        document.head.appendChild(meta)
      }
      meta.content = content
    }

    updateMetaTag('description', description)
    updateMetaTag('keywords', keywords)
    updateMetaTag('author', 'Tu Techo Ahora')

    updateOGTag('og:title', title)
    updateOGTag('og:description', description)
    updateOGTag('og:type', type)
    updateOGTag('og:url', url)
    updateOGTag('og:image', image)
    updateOGTag('og:site_name', 'Tu Techo Ahora')

    updateMetaTag('twitter:card', 'summary_large_image')
    updateMetaTag('twitter:title', title)
    updateMetaTag('twitter:description', description)
    updateMetaTag('twitter:image', image)

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
    }
    canonical.href = url

  }, [title, description, keywords, image, url, type])

  return null
} 