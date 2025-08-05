
import { createFileRoute } from '@tanstack/react-router'
import { useMemo, useState } from 'react'
import { FeaturedProperty } from '../components/FeaturedProperty'
import { PropertySection } from '../components/PropertySection'
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
  const [searchId, setSearchId] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [operationType, setOperationType] = useState('');
  const [propertyType, setPropertyType] = useState('');

  // Filtrado solo cuando se ejecuta la búsqueda
  const filteredProperties = useMemo(() => {
    if (!Array.isArray(propiedades) || (!searchTerm && !operationType && !propertyType)) return [];

    return propiedades.filter((propiedad: any) => {
      let matchesSearch = true;
      let matchesOperation = true;
      let matchesPropertyType = true;

      // Filtro por término de búsqueda
      if (searchTerm) {
        const term = searchTerm.trim();
        const isNumeric = /^\d+$/.test(term);

        if (isNumeric) {
          // Si es numérico, buscar solo en ID
          matchesSearch = propiedad.id?.toString().includes(term);
        } else {
          // Si es string, buscar en título y ubicación
          const termLower = term.toLowerCase();
          const titleMatch = propiedad.titulo?.toLowerCase().includes(termLower);
          const locationMatch = propiedad.ubicacion?.toLowerCase().includes(termLower);
          matchesSearch = titleMatch || locationMatch;
        }
      }

      // Filtro por tipo de operación
      if (operationType) {
        matchesOperation = propiedad.tipoOperacion?.toLowerCase() === operationType.toLowerCase();
      }

      // Filtro por tipo de vivienda
      if (propertyType) {
        matchesPropertyType = propiedad.tipoVivienda?.toLowerCase() === propertyType.toLowerCase();
      }

      return matchesSearch && matchesOperation && matchesPropertyType;
    });
  }, [propiedades, searchTerm, operationType, propertyType]);

  const handleSearch = () => {
    if (searchId.trim() || operationType || propertyType) {
      setSearchTerm(searchId.trim());
    }
  };

  const handleReset = () => {
    setSearchId('');
    setSearchTerm('');
    setOperationType('');
    setPropertyType('');
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
                  <div className="grid sm:grid-cols-3 gap-4">
                    {/* Input de búsqueda */}
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        </svg>
                      </div>
                      <input
                        type="text"
                        placeholder="ID, título o ubicación"
                        value={searchId}
                        onChange={(e) => setSearchId(e.target.value)}
                        onKeyDown={handleKeyPress}
                        className="w-full input input-bordered"
                      />
                    </div>

                    {/* Select de tipo de operación */}
                    <div className="relative">
                      <select
                        value={operationType}
                        onChange={(e) => setOperationType(e.target.value)}
                        className="select select-bordered"
                      >
                        <option value="">Operación</option>
                        <option value="venta">Venta</option>
                        <option value="alquiler">Alquiler</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>

                    {/* Select de tipo de vivienda */}
                    <div className="relative">
                      <select
                        value={propertyType}
                        onChange={(e) => setPropertyType(e.target.value)}
                        className="select select-bordered"
                      >
                        <option value="">Tipo</option>
                        <option value="casa">Casa</option>
                        <option value="departamento">Departamento</option>
                        <option value="local">Local</option>
                        <option value="terreno">Terreno</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  {/* Botones de búsqueda y reset */}
                  <div className="flex gap-3">
                    <button
                      onClick={handleSearch}
                      className="flex-1 flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                      Buscar propiedad
                    </button>
                    <button
                      onClick={handleReset}
                      className="flex items-center justify-center gap-2 bg-gray-500 hover:bg-gray-600 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>

                    </button>
                  </div>
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
        {(searchTerm || operationType || propertyType) ? (
          <PropertySection
            title={`Resultados de búsqueda${searchTerm ? ` para "${searchTerm}"` : ''}${operationType ? ` - ${operationType}` : ''}${propertyType ? ` - ${propertyType}` : ''} (${filteredProperties.length}):`}
            properties={filteredProperties}
            maxItems={filteredProperties.length}
            gridCols="auto"
          />
        ) : (
          <PropertySection
            title="Tenemos la propiedad que necesitas:"
            properties={propiedades}
            maxItems={4}
            gridCols="4"
          />
        )}
        {/* Propiedad destacada */}
        {Array.isArray(propiedades) && propiedades.length > 0 && (
          <FeaturedProperty property={propiedades[0]} />
        )}

        {/* Propiedades recientes (solo si no hay búsqueda activa) */}
        {!searchTerm && !operationType && !propertyType && (
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

