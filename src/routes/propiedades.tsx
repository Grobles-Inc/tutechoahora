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

                </div>

                <p className="text-sm text-base-content/70 mb-2">{property.ubicacion}</p>
                <div className="flex justify-between items-center mb-4">
                  <div className="text-lg font-bold text-primary">
                    {property.precio ? `$${property.precio.toLocaleString()} USD` : ''}
                  </div>
                  <div className="text-sm text-base-content/70">
                    {property.areaTerreno ? `${property.areaTerreno} m²` : ''}
                  </div>
                </div>
                <ul className="list-disc list-inside mb-2">
                  {property.caracteristicas &&
                    (Array.isArray(property.caracteristicas)
                      ? property.caracteristicas
                      : String(property.caracteristicas).split(',').map((c: string) => c.trim())
                    ).slice(0, 3).map((car: string, idx: number) => (
                      <li key={idx} className="text-xs">{car}</li>
                    ))}
                </ul>
                {/* Empty div to keep card-body padding for layout consistency */}
                <div style={{ height: 0 }} />
                <button
                  className="btn btn-primary absolute top-4 right-4 z-10"
                  onClick={() => handleViewDetails(property)}
                >
                  <svg fill="#ffff" className='size-4' viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M16.108 10.044c-3.313 0-6 2.687-6 6s2.687 6 6 6 6-2.686 6-6-2.686-6-6-6zM16.108 20.044c-2.206 0-4.046-1.838-4.046-4.044s1.794-4 4-4c2.206 0 4 1.794 4 4s-1.748 4.044-3.954 4.044zM31.99 15.768c-0.012-0.050-0.006-0.104-0.021-0.153-0.006-0.021-0.020-0.033-0.027-0.051-0.011-0.028-0.008-0.062-0.023-0.089-2.909-6.66-9.177-10.492-15.857-10.492s-13.074 3.826-15.984 10.486c-0.012 0.028-0.010 0.057-0.021 0.089-0.007 0.020-0.021 0.030-0.028 0.049-0.015 0.050-0.009 0.103-0.019 0.154-0.018 0.090-0.035 0.178-0.035 0.269s0.017 0.177 0.035 0.268c0.010 0.050 0.003 0.105 0.019 0.152 0.006 0.023 0.021 0.032 0.028 0.052 0.010 0.027 0.008 0.061 0.021 0.089 2.91 6.658 9.242 10.428 15.922 10.428s13.011-3.762 15.92-10.422c0.015-0.029 0.012-0.058 0.023-0.090 0.007-0.017 0.020-0.030 0.026-0.050 0.015-0.049 0.011-0.102 0.021-0.154 0.018-0.090 0.034-0.177 0.034-0.27 0-0.088-0.017-0.175-0.035-0.266zM16 25.019c-5.665 0-11.242-2.986-13.982-8.99 2.714-5.983 8.365-9.047 14.044-9.047 5.678 0 11.203 3.067 13.918 9.053-2.713 5.982-8.301 8.984-13.981 8.984z"></path> </g></svg>
                  Ver Más
                </button>
                <span className="badge badge-secondary top-4 left-4 absolute z-10 text-white">ID: {property.id}</span>
              </div>
            </div>
          ))}
        </section>
      </div>
    </>
  )
}
