import { createFileRoute, useRouter } from '@tanstack/react-router';
import SEO from '../components/SEO';
const JSONBIN_MASTER_KEY = import.meta.env.VITE_JSONBIN_MASTER_KEY;
const JSONBIN_BIN_ID = "6884f7eaae596e708fbc1e19"

export const Route = createFileRoute('/propiedades')({
  loader: async () => {
    const response = await fetch(`https://api.jsonbin.io/v3/b/${JSONBIN_BIN_ID}/latest`, {
      headers: {
        'X-Master-Key': JSONBIN_MASTER_KEY,
        'X-Bin-Meta': 'false',
      },
    })
    const data = await response.json()
    return Array.isArray(data) ? data : data.record || []
  },
  component: RouteComponent,
})

function RouteComponent() {
  const properties = Route.useLoaderData()
  const router = useRouter()

  const handleViewDetails = (property: any) => {
    if (property.id) {
      router.navigate({ to: '/propiedad/$id', params: { id: property.id } })
    }
  }

  return (
    <>
      <SEO
        title="Propiedades en Venta y Alquiler | Tu Techo Ahora"
        description="Explora nuestra amplia selección de propiedades en venta y alquiler. Casas, apartamentos y terrenos con las mejores ubicaciones y precios."
        keywords="propiedades, casas, apartamentos, venta, alquiler, inmobiliaria, real estate"
      />
      <div className="w-11/12 lg:max-w-5xl mx-auto py-8">
        <h1 className='text-2xl font-bold'>Propiedades</h1>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {properties.map((property: any) => (
            <div className="card bg-base-100 shadow-xl relative" key={property.id}>
              <figure>
                <img
                  src={property.imagenes?.[0] || "/placeholder.jpg"}
                  alt={property.titulo}
                  className="h-48 w-full object-cover"
                />
              </figure>
              <div className="card-body">
                <div className="flex justify-between items-start mb-2">
                  <h2 className="card-title text-lg">{property.titulo}</h2>
                  <div className={`badge ${property.tipoOperacion === 'Venta' ? 'badge-primary' : 'badge-secondary'}`}>
                    {property.tipoOperacion}
                  </div>
                </div>
                <p className="text-sm text-base-content/70 mb-2">{property.ubicacion}</p>
                <p className="text-sm line-clamp-2 mb-3">{property.descripcion}</p>
                <div className="flex justify-between items-center mb-4">
                  <div className="text-lg font-bold text-primary">
                    {property.precio ? `$${property.precio.toLocaleString()} USD` : ''}
                  </div>
                  <div className="text-sm text-base-content/70">
                    {property.areaTerreno ? `${property.areaTerreno} m²` : ''}
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mb-2">
                  {property.caracteristicas &&
                    (Array.isArray(property.caracteristicas)
                      ? property.caracteristicas
                      : String(property.caracteristicas).split(',').map((c: string) => c.trim())
                    ).slice(0, 3).map((car: string, idx: number) => (
                      <span key={idx} className="badge badge-outline text-xs">{car}</span>
                    ))}
                </div>
                {/* Empty div to keep card-body padding for layout consistency */}
                <div style={{ height: 0 }} />
                <button
                  className="btn btn-primary absolute top-4 right-4 z-10"
                  onClick={() => handleViewDetails(property)}
                >
                  Ver Detalles
                </button>
              </div>
            </div>
          ))}
        </section>
      </div>
    </>
  )
}
