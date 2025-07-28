import { useRouter } from '@tanstack/react-router'

interface Property {
  id?: string
  titulo: string
  ubicacion?: string
  area?: string
  estado?: string
  precio: string
  imagenes?: string[]
  descripcion?: string
}

interface FeaturedPropertyProps {
  property: Property
  onLearnMore?: (property: Property) => void
}

export function FeaturedProperty({ property, onLearnMore }: FeaturedPropertyProps) {
  const router = useRouter()
  
  const handleLearnMore = () => {
    if (property.id) {
      router.navigate({ to: '/propiedad/$id', params: { id: String(property.id) } })
    } else if (onLearnMore) {
      onLearnMore(property)
    }
  }

  return (
    <section className="max-w-screen-xl mx-auto px-4 mt-12 relative">
      <div className="relative overflow-hidden rounded-xl shadow-2xl group">
        <img
          src={property.imagenes?.[0] || "/placeholder.jpg"}
          alt="Propiedad destacada"
          className="w-full h-60 md:h-96 object-cover transition-transform duration-700 group-hover:scale-105"
        />
        
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        
        {/* Content overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            {/* Property info */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-primary px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                  </svg>
                  Propiedad destacada
                </span>
              </div>
              
              <h3 className="text-2xl md:text-3xl font-bold mb-2">{property.titulo}</h3>
              
              {property.ubicacion && (
                <div className="flex items-center gap-2 text-gray-200">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-sm">{property.ubicacion}</span>
                </div>
              )}
              
              <div className="flex items-center gap-4 text-sm">
                {property.area && (
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                    </svg>
                    <span>{property.area}</span>
                  </div>
                )}
                
                {property.estado && (
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{property.estado}</span>
                  </div>
                )}
              </div>
              
              <div className="flex items-center gap-2 mt-3">
                <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
                <span className="text-2xl font-bold text-primary">{property.precio}</span>
              </div>
            </div>
            
            {/* Action button */}
            <div className="flex-shrink-0">
              <button 
                onClick={handleLearnMore}
                className="bg-white/90 hover:bg-white text-gray-900 px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl group"
              >
                <span>Saber más</span>
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
