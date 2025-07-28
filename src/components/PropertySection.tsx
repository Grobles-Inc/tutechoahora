import { PropertyCard } from './PropertyCard'

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

interface PropertySectionProps {
  title: string
  properties: Property[]
  maxItems?: number
  variant?: 'default' | 'large'
  showDescription?: boolean
  gridCols?: 'auto' | '2' | '3' | '4'
  onViewProperty?: (property: Property) => void
}

export function PropertySection({ 
  title, 
  properties, 
  maxItems,
  variant = 'default',
  showDescription = false,
  gridCols = 'auto',
  onViewProperty 
}: PropertySectionProps) {
  if (!Array.isArray(properties) || properties.length === 0) {
    return null
  }

  const displayProperties = maxItems ? properties.slice(0, maxItems) : properties
  
  const getGridClasses = () => {
    switch (gridCols) {
      case '2':
        return 'grid-cols-1 sm:grid-cols-2'
      case '3':
        return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
      case '4':
        return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
      default:
        return maxItems === 2 ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
    }
  }

  return (
    <section className="max-w-screen-xl mx-auto px-4 py-10">
      <div className="flex items-center gap-2 mb-6">
        <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6a2 2 0 01-2 2H10a2 2 0 01-2-2V5z" />
        </svg>
        <h2 className="text-xl md:text-2xl font-bold text-primary">{title}</h2>
      </div>
      
      <div className={`grid ${getGridClasses()} gap-6`}>
        {displayProperties.map((property, index) => (
          <PropertyCard
            key={property.id || index}
            property={property}
            variant={variant}
            showDescription={showDescription}
            onViewDetails={onViewProperty}
          />
        ))}
      </div>
    </section>
  )
}
