import { createFileRoute, useRouter } from '@tanstack/react-router'
import { PropertySection } from '../../components/PropertySection'

const JSONBIN_MASTER_KEY = import.meta.env.VITE_JSONBIN_MASTER_KEY;
const JSONBIN_BIN_ID = "6884f7eaae596e708fbc1e19"

export const Route = createFileRoute('/propiedad/$id')({
  loader: async ({ params }) => {
    try {
      const response = await fetch(`https://api.jsonbin.io/v3/b/${JSONBIN_BIN_ID}/latest`, {
        headers: {
          'X-Master-Key': JSONBIN_MASTER_KEY,
          'X-Bin-Meta': 'false',
        },
      })
      
      if (!response.ok) {
        console.error('Error fetching data from API:', response.status)
        return {
          propiedad: null,
          relacionados: [],
          error: 'Error al cargar los datos'
        }
      }
      
      const data = await response.json()
      const propiedades = Array.isArray(data) ? data : data.record || []
      
      // Buscar la propiedad específica por ID
      // Convertir ambos IDs a string para comparación consistente
      const propiedad = propiedades.find((p: any) => String(p.id) === String(params.id))
      
      return {
        propiedad: propiedad || null,
        relacionados: propiedad ? propiedades.filter((p: any) => String(p.id) !== String(params.id)).slice(0, 4) : [],
        error: propiedad ? null : 'Propiedad no encontrada'
      }
    } catch (error) {
      console.error('Error fetching property:', error)
      return {
        propiedad: null,
        relacionados: [],
        error: 'No se pudo cargar la propiedad'
      }
    }
  },
  component: PropiedadDetailComponent,
})

function PropiedadDetailComponent() {
  const { propiedad, relacionados, error } = Route.useLoaderData()
  const router = useRouter()

  // Si hay un error o no se encontró la propiedad, mostrar mensaje de error
  if (error || !propiedad) {
    return (
      <div className="min-h-screen bg-base-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🏠</div>
          <h1 className="text-3xl font-bold text-primary mb-4">
            {error || 'Propiedad no encontrada'}
          </h1>
          <p className="text-lg text-secondary mb-6">
            La propiedad que buscas no existe o no está disponible.
          </p>
          <button 
            onClick={() => router.navigate({ to: '/' })}
            className="btn btn-primary"
          >
            Volver al inicio
          </button>
        </div>
      </div>
    )
  }

  const handleWhatsAppContact = () => {
    const message = `Hola! Me interesa la propiedad: ${propiedad.titulo} - ${propiedad.precio}`
    const whatsappUrl = `https://wa.me/51970000000?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  const handleViewProperty = (property: any) => {
    router.navigate({ to: '/propiedad/$id', params: { id: String(property.id) } })
  }

  const handleGoBack = () => {
    router.history.back()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header con botón de regreso */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-screen-xl mx-auto px-4 py-4">
          <button 
            onClick={handleGoBack}
            className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            Volver
          </button>
        </div>
      </div>

      <section className="max-w-screen-xl mx-auto px-4 py-6 md:py-12">
        {/* Galería de imágenes */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="md:col-span-2">
            <img 
              src={propiedad.imagenes?.[0] || "/placeholder.jpg"} 
              alt="Imagen principal" 
              className="rounded-xl w-full h-64 md:h-96 object-cover shadow-lg" 
            />
          </div>
          <div className="flex flex-col gap-4">
            {propiedad.imagenes?.slice(1, 3).map((imagen: string, index: number) => (
              <img 
                key={index}
                src={imagen || "/placeholder.jpg"} 
                alt={`Imagen ${index + 2}`} 
                className="rounded-xl w-full h-32 md:h-44 object-cover shadow-md" 
              />
            ))}
          </div>
        </div>

        {/* Información principal */}
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div className="md:col-span-2 space-y-6">
            {/* Título y ubicación */}
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">{propiedad.titulo}</h1>
              {propiedad.ubicacion && (
                <div className="flex items-center gap-2 text-gray-600">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-lg">{propiedad.ubicacion}</span>
                </div>
              )}
            </div>

            {/* Descripción */}
            {propiedad.descripcion && (
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Descripción</h2>
                <p className="text-gray-700 whitespace-pre-line leading-relaxed">{propiedad.descripcion}</p>
              </div>
            )}

            {/* Características adicionales */}
            {propiedad.caracteristicas && (
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Características</h2>
                <div className="grid md:grid-cols-2 gap-3">
                  {(Array.isArray(propiedad.caracteristicas) 
                    ? propiedad.caracteristicas 
                    : propiedad.caracteristicas.split(',').map((item: string) => item.trim())
                  ).map((caracteristica: string, index: number) => (
                    <div key={index} className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">{caracteristica}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Panel lateral de información */}
          <div className="space-y-6">
            {/* Card principal */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-lg sticky top-6">
              {/* Detalles de la propiedad */}
              {propiedad.detalles && (
                <div className="grid grid-cols-3 gap-4 mb-4 p-4 bg-gray-50 rounded-lg">
                  {propiedad.detalles.huespedes && (
                    <div className="text-center">
                      <div className="text-2xl mb-1">👥</div>
                      <div className="text-sm text-gray-600">Huéspedes</div>
                      <div className="font-semibold">{propiedad.detalles.huespedes}</div>
                    </div>
                  )}
                  {propiedad.detalles.habitaciones && (
                    <div className="text-center">
                      <div className="text-2xl mb-1">🛏</div>
                      <div className="text-sm text-gray-600">Habitaciones</div>
                      <div className="font-semibold">{propiedad.detalles.habitaciones}</div>
                    </div>
                  )}
                  {propiedad.detalles.banos && (
                    <div className="text-center">
                      <div className="text-2xl mb-1">🛁</div>
                      <div className="text-sm text-gray-600">Baños</div>
                      <div className="font-semibold">{propiedad.detalles.banos}</div>
                    </div>
                  )}
                </div>
              )}

              {/* Área y estado */}
              <div className="flex items-center gap-2 mb-4 p-3 bg-emerald-50 rounded-lg">
                <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
                <span className="text-emerald-700 font-medium">{propiedad.area || propiedad.metros}</span>
                {propiedad.estado && (
                  <>
                    <span className="text-primary">•</span>
                    <span className="text-emerald-700 font-medium">{propiedad.estado}</span>
                  </>
                )}
              </div>

              {/* Precio */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                  <span className="text-gray-600">Precio</span>
                </div>
                <p className="text-3xl font-bold text-primary">{propiedad.precio}</p>
              </div>

              {/* Botón de contacto */}
              <button 
                onClick={handleWhatsAppContact}
                className="w-full bg-primary hover:bg-primary text-white py-3 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                </svg>
                Contáctanos por WhatsApp
              </button>
            </div>
          </div>
        </div>

        {/* Mapa (opcional) */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Ubicación</h2>
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <img src="/images/mapa.jpg" alt="Mapa de ubicación" className="w-full h-64 object-cover" />
          </div>
        </div>

        {/* Propiedades relacionadas */}
        {relacionados.length > 0 && (
          <PropertySection
            title="Propiedades relacionadas:"
            properties={relacionados}
            gridCols="4"
            onViewProperty={handleViewProperty}
          />
        )}
      </section>
    </div>
  )
}
