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

interface PropertyCardProps {
  property: Property
  variant?: 'default' | 'large'
  showDescription?: boolean
  onViewDetails?: (property: Property) => void
}

export function PropertyCard({
  property,
  variant = 'default',
  showDescription = false,
  onViewDetails
}: PropertyCardProps) {
  const isLarge = variant === 'large'
  const router = useRouter()

  const handleViewDetails = () => {
    if (property.id) {
      router.navigate({ to: '/propiedad/$id', params: { id: String(property.id) } })
    } else if (onViewDetails) {
      onViewDetails(property)
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100">
      {/* Imagen */}
      <div className="relative overflow-hidden">
        <img
          src={property.imagenes?.[0] || "/placeholder.jpg"}
          alt={property.titulo}
          className={`w-full object-cover transition-transform duration-300 hover:scale-105 ${isLarge ? 'h-48 md:h-56' : 'h-40 md:h-44'
            }`}
        />
        {property.id && (
          <div className="absolute top-3 left-3">
            <span className="bg-emerald-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              ID : {property.id}
            </span>
          </div>
        )}
      </div>

      {/* Contenido */}
      <div className="p-4 space-y-3">
        {/* Ubicación */}
        {property.ubicacion && (
          <div className="flex items-center gap-1 text-gray-500">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <p className="text-xs truncate">{property.ubicacion}</p>
          </div>
        )}

        {/* Título */}
        <h3 className={`font-bold text-gray-900 line-clamp-2 ${isLarge ? 'text-base md:text-lg' : 'text-sm md:text-base'
          }`}>
          {property.titulo}
        </h3>

        {/* Descripción (opcional) */}
        {showDescription && property.descripcion && (
          <p className="text-sm text-gray-600 line-clamp-2">
            {property.descripcion}
          </p>
        )}

        {/* Área */}
        {property.area && (
          <div className="flex items-center gap-1 text-emerald-600">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
            <span className="text-sm font-medium">{property.area}</span>
          </div>
        )}

        {/* Precio */}
        <div className="flex items-center gap-1">
          <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
          </svg>
          <span className="text-emerald-700 font-bold text-lg">{property.precio}</span>
        </div>

        {/* Botón de acción */}
        <button
          onClick={handleViewDetails}
          className="btn btn-primary w-full mt-4 flex items-center justify-center gap-2 hover:bg-primary-focus transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          Más información
        </button>
      </div>
    </div>
  )
}
