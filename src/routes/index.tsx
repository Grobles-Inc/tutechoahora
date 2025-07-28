import { createFileRoute } from '@tanstack/react-router'
import { PropertySection } from '../components/PropertySection'
import { FeaturedProperty } from '../components/FeaturedProperty'

const JSONBIN_MASTER_KEY = import.meta.env.VITE_JSONBIN_MASTER_KEY;
const JSONBIN_BIN_ID = "6884f7eaae596e708fbc1e19"

export const Route = createFileRoute('/')({
  loader: async () => {
    try {
      const response = await fetch(`https://api.jsonbin.io/v3/b/${JSONBIN_BIN_ID}/latest`, {
        headers: {
          'X-Master-Key': JSONBIN_MASTER_KEY,
          'X-Bin-Meta': 'false',
        },
      })
      const data = await response.json()
      return Array.isArray(data) ? data : data.record || []
    } catch (error) {
      console.error('Error fetching properties:', error)
      return []
    }
  },
  component: App,
})

function App() {
  const propiedades = Route.useLoaderData() || []
  
  const handleViewProperty = (property: any) => {
    // Aquí puedes agregar la lógica para navegar a los detalles de la propiedad
    console.log('Ver propiedad:', property)
  }

  return (
    <main className="min-h-screen bg-base-100 text-base-content">
      {/* Hero */}
      <section className="max-w-screen-xl mx-auto px-4 py-10 grid md:grid-cols-2 items-center gap-8">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-primary">
            Un hogar para ti<br />y tu familia
          </h1>
          <p className="mt-4 text-lg text-secondary">
            Encuentra el mejor lugar para vivir y disfrutar cada momento como siempre lo soñaste.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              placeholder="Elige un lugar"
              className="input input-bordered w-full sm:max-w-xs"
            />
            <input
              type="text"
              placeholder="Palabras clave"
              className="input input-bordered w-full sm:max-w-xs"
            />
            <button className="btn btn-primary w-full sm:w-auto">Buscar 🔍</button>
          </div>
        </div>
        <img
          src="/piscina.png"
          alt="Piscina"
          className="w-full h-64 object-cover rounded-2xl shadow-lg"
        />
      </section>

      {/* Propiedad destacada */}
      {Array.isArray(propiedades) && propiedades.length > 0 && (
        <FeaturedProperty 
          property={propiedades[0]} 
          onLearnMore={handleViewProperty}
        />
      )}

      {/* Lista de propiedades */}
      <PropertySection
        title="Tenemos la propiedad que necesitas:"
        properties={propiedades}
        maxItems={4}
        gridCols="4"
        onViewProperty={handleViewProperty}
      />

      {/* Propiedades recientes */}
      <PropertySection
        title="Propiedades recientes:"
        properties={propiedades}
        maxItems={2}
        variant="large"
        showDescription={false}
        gridCols="2"
        onViewProperty={handleViewProperty}
      />
    </main>
  )
}

