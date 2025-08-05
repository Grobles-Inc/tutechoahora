
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { PropertySection } from '../components/PropertySection'
import { FeaturedProperty } from '../components/FeaturedProperty'
import { useState, useMemo } from 'react'
import SEO from '../components/SEO'

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
  const propiedades = Route.useLoaderData() || [];
  const navigate = useNavigate();
  const [searchId, setSearchId] = useState('');

  // Filtrado en tiempo real
  const filteredProperties = useMemo(() => {
    if (!Array.isArray(propiedades) || !searchId) return [];
    return propiedades.filter((propiedad: any) => {
      return propiedad.id?.toString().includes(searchId);
    });
  }, [propiedades, searchId]);

  const handleSearch = () => {
    if (searchId) {
      navigate({
        to: `/propiedad/${searchId}`,
      });
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <>
      <SEO
        title="Tu Techo Ahora - Encuentra tu hogar ideal | Inmobiliaria"
        description="Encuentra el hogar perfecto para ti y tu familia. Propiedades en venta y alquiler con asesoría personalizada. Tu Techo Ahora, tu inmobiliaria de confianza."
        keywords="inmobiliaria, propiedades, casas, apartamentos, venta, alquiler, hogar, real estate, encontrar casa"
      />
      <main className="min-h-screen bg-base-100 text-base-content">
        {/* Hero */}
        <section className="relative max-w-screen-xl mx-auto px-4 py-10 grid md:grid-cols-2 items-center gap-8">
          <div className="relative z-10">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
              Un hogar para ti<br />y tu familia
            </h1>
            <p className="text-lg text-content-base mb-8">
              Encuentra el mejor lugar para vivir y disfrutar cada momento como siempre lo soñaste.
            </p>
            {/* Buscador mejorado */}
            <div className="relative">
              <div className="absolute inset-0 bg-white/20 backdrop-blur-md rounded-2xl"></div>
              <div className="relative ">
                <div className="flex flex-col gap-4">
                  <div className="grid sm:grid-cols-1 gap-4">
                    {/* Input de ID */}
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        </svg>
                      </div>
                      <input
                        type="text"
                        placeholder="Búsqueda por ID"
                        value={searchId}
                        onChange={(e) => setSearchId(e.target.value)}
                        onKeyDown={handleKeyPress}
                        className="w-full pl-4 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 bg-white/80 backdrop-blur-sm"
                      />
                    </div>
                  </div>
                  {/* Botón de búsqueda */}
                  <button
                    onClick={handleSearch}
                    className="flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    Buscar Propiedad
                  </button>
                  {/* Resultados de búsqueda en tiempo real */}
                  {searchId && (
                    <div className="text-sm text-gray-600 bg-primary/10 rounded-lg p-3">
                      <span className="font-medium">
                        {filteredProperties.length} propiedad{filteredProperties.length !== 1 ? 'es' : ''} encontrada{filteredProperties.length !== 1 ? 's' : ''} con ID "{searchId}"
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="relative">
            <img
              src="/heroSection.jpg"
              alt="Piscina"
              className="w-full h-auto object-cover rounded-2xl shadow-lg"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
          </div>
        </section>



        {/* Lista de propiedades (filtradas si hay búsqueda activa) */}
        <PropertySection
          title={
            searchId
              ? `Resultado de búsqueda para ID "${searchId}":`
              : "Tenemos la propiedad que necesitas:"
          }
          properties={filteredProperties}
          maxItems={1}
          gridCols="auto"
        />
        {/* Propiedad destacada */}
        {Array.isArray(propiedades) && propiedades.length > 0 && (
          <FeaturedProperty property={propiedades[0]} />
        )}

        {/* Propiedades recientes (solo si no hay búsqueda activa) */}
        {!searchId && (
          <PropertySection
            title="Propiedades recientes:"
            properties={propiedades}
            maxItems={3}
            variant="large"
            showDescription={false}
            gridCols="3"
          />
        )}
      </main>
    </>
  );
}

