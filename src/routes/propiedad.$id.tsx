import { createFileRoute, useRouter } from '@tanstack/react-router'
import { PropertySection } from '../components/PropertySection'

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
    const currentUrl = window.location.href
    const precio = typeof propiedad.precio === 'number' ? `$${propiedad.precio.toLocaleString()}` : propiedad.precio

    const message = `🏠 *INFORMACIÓN DE PROPIEDAD*

 *${propiedad.titulo}*
 Ubicación: ${propiedad.ubicacion || 'No especificada'}
 Precio: ${precio}
 *Ver propiedad completa:*
${currentUrl}

¡Me interesa esta propiedad! ¿Podrían brindarme más información?`

    const whatsappUrl = `https://wa.me/51923985594?text=${encodeURIComponent(message)}`
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
      <div>
        <div className="max-w-screen-xl mx-auto px-4 py-4">
          <button
            onClick={handleGoBack}
            className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            Volver Atrás
          </button>
        </div>
      </div>

      <section className="max-w-screen-xl mx-auto px-4 py-6 md:py-12">
        {/* Galería de imágenes - Carousel DaisyUI */}
        <div className="mb-8 ">
          <div className="w-full">
            <div className="carousel w-full rounded-xl shadow-lg h-64 md:h-96 bg-base-200">
              {(() => {
                const images = propiedad.imagenes && propiedad.imagenes.length > 0 ? propiedad.imagenes : ["/placeholder.jpg"];
                const slides = [...images];
                const hasVideo = !!propiedad.videoUrl;
                if (hasVideo) slides.push("__VIDEO__");
                return slides.map((item: string, idx: number) => {
                  const isVideo = item === "__VIDEO__";
                  return (
                    <div
                      key={idx}
                      id={`slide-${idx}`}
                      className="carousel-item relative w-full h-64 md:h-96"
                    >
                      {isVideo ? (
                        <iframe
                          src={propiedad.videoUrl.replace(
                            /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([^&]+).*/,
                            'https://www.youtube.com/embed/$1'
                          )}
                          className="w-full h-full"
                          allowFullScreen
                          loading="lazy"
                          title="Video de la propiedad"
                        />
                      ) : (
                        <img
                          src={item || "/placeholder.jpg"}
                          alt={`Imagen ${idx + 1}`}
                          className="w-full h-64 md:h-96 object-cover"
                        />
                      )}
                      {slides.length > 1 && (
                        <>
                          <a
                            href={`#slide-${(idx - 1 + slides.length) % slides.length}`}
                            className="btn btn-circle btn-sm absolute left-2 top-1/2"
                          >
                            ❮
                          </a>
                          <a
                            href={`#slide-${(idx + 1) % slides.length}`}
                            className="btn btn-circle btn-sm absolute right-2 top-1/2"
                          >
                            ❯
                          </a>
                        </>
                      )}
                    </div>
                  );
                });
              })()}
            </div>
          </div>
        </div>

        {/* Información principal */}
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div className="md:col-span-2 space-y-6">
            {/* Título y ubicación */}
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">{propiedad.titulo}</h1>

              {/* Ubicación */}
              {propiedad.ubicacion && (
                <div className="flex items-center gap-2 text-gray-600 mb-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-lg">{propiedad.ubicacion}</span>
                </div>
              )}

              {/* Información básica con iconos */}

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

              {/* Precio destacado */}
              <div className="mb-6 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                  <span className="text-gray-600 font-medium">Precio</span>
                </div>
                <p className="text-4xl font-bold text-primary">
                  {typeof propiedad.precio === 'number' ? `$${propiedad.precio.toLocaleString()}` : propiedad.precio}
                </p>
              </div>

              {/* Detalles principales con iconos */}
              <div className="grid grid-cols-1 gap-4 mb-6">
                {propiedad.tipoOperacion && (
                  <div className="flex items-center gap-3 p-3  rounded-lg">
                    <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <div className="text-sm text-gray-600">Tipo de Operación</div>
                      <div className="font-semibold text-blue-700">{propiedad.tipoOperacion}</div>
                    </div>
                  </div>
                )}

                {propiedad.tipoVivienda && (
                  <div className="flex items-center gap-3 p-3  rounded-lg">
                    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                    </svg>
                    <div>
                      <div className="text-sm text-gray-600">Tipo de Propiedad</div>
                      <div className="font-semibold text-green-700">{propiedad.tipoVivienda}</div>
                    </div>
                  </div>
                )}

                {propiedad.areaTerreno && (
                  <div className="flex items-center gap-3 p-3 rounded-lg">
                    <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                    </svg>
                    <div>
                      <div className="text-sm text-gray-600">Área / Superficie</div>
                      <div className="font-semibold text-orange-700">{propiedad.areaTerreno}m²</div>
                    </div>
                  </div>
                )}
              </div>

              {/* Botón de contacto mejorado */}
              <button
                onClick={handleWhatsAppContact}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-4 px-6 rounded-lg font-semibold flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                </svg>
                <span>Consultar por WhatsApp</span>
              </button>
            </div>
          </div>
        </div>

        {/* Mapa con coordenadas */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Ubicación</h2>
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            {propiedad.coordenadas ? (
              <div className="relative">
                {/* Google Maps embebido por defecto */}
                <iframe
                  src={(() => {
                    const coords = propiedad.coordenadas.split(',').map((coord: string) => parseFloat(coord.trim()));
                    const lat = coords[0];
                    const lon = coords[1];
                    return `https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${lat},${lon}&zoom=15`;
                  })()}
                  width="100%"
                  height="400"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  className="w-full h-64 md:h-96"
                  title="Ubicación de la propiedad"
                />

                {/* Información de coordenadas superpuesta */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
                  <div className="flex items-center gap-2 text-sm">
                    <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="font-medium text-gray-700">{propiedad.coordenadas}</span>
                  </div>

                  {/* Botones para abrir en diferentes mapas */}
                  <div className="mt-2 space-y-1">
                    <button
                      onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${propiedad.coordenadas}`, '_blank')}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs py-1 px-2 rounded transition-colors"
                    >
                      Google Maps
                    </button>
                    <button
                      onClick={() => {
                        const coords = propiedad.coordenadas.split(',').map((coord: string) => parseFloat(coord.trim()));
                        const lat = coords[0];
                        const lon = coords[1];
                        window.open(`https://www.openstreetmap.org/?mlat=${lat}&mlon=${lon}#map=15/${lat}/${lon}`, '_blank');
                      }}
                      className="w-full bg-green-600 hover:bg-green-700 text-white text-xs py-1 px-2 rounded transition-colors"
                    >
                      OpenStreetMap
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              // Fallback cuando no hay coordenadas
              <div className="flex items-center justify-center h-64 bg-gray-100">
                <div className="text-center text-gray-500">
                  <svg className="w-12 h-12 mx-auto mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <p className="text-sm">Ubicación no disponible</p>
                  <p className="text-xs mt-1">No se proporcionaron coordenadas para esta propiedad</p>
                </div>
              </div>
            )}
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
