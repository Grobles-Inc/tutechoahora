import Beneficios from '@/components/Beneficios'
import CTA from '@/components/CTA'
import SEO from '@/components/SEO'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/nosotros')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <SEO
        title="Tu Techo Ahora - Encuentra tu hogar ideal | Inmobiliaria"
        description="Encuentra el hogar perfecto para ti y tu familia. Propiedades en venta y alquiler con asesoría personalizada. Tu Techo Ahora, tu inmobiliaria de confianza."
        keywords="inmobiliaria, propiedades, casas, apartamentos, venta, alquiler, hogar, real estate, encontrar casa"
      />
      <div>
        <div className="max-w-7xl mx-auto">
          <h2 className="text-primary text-center text-3xl md:text-6xl">
            ¡Llegó el momento de <br /> conocer TuTechoAhora!
          </h2>
          <div className="flex flex-col md:flex-row gap-8 mt-10">
            <div className="md:w-1/2 p-2">
              <img
                src="/portico.jpg"
                alt="Propiedad"
                className="w-full rounded-xl"
              />
            </div>
            <div className="md:w-1/2 flex flex-col justify-center p-3">
              <h3 className="text-4xl font-bold text-gray-800 mb-6">¿Quiénes somos?</h3>
              <p className="text-gray-600 mb-8 leading-relaxed">
                En <span className="text-primary">TuTechoAhora</span>, somos un equipo de profesionales comprometidos con ayudarte a encontrar el hogar ideal para ti y tu familia. Nos especializamos en seleccionar propiedades bajo estrictos estándares de calidad, transparencia y compromiso, brindando un servicio personalizado que inspira confianza, tranquilidad y eficiencia.
              </p>


              <div className="flex gap-4 mb-8">
                <div
                  className="w-12 h-12 bg-primary rounded-full flex items-center justify-center"
                >
                  <div className="w-6 h-6 bg-white rounded-full"></div>
                </div>
                <div
                  className="w-12 h-12 bg-primary rounded-full flex items-center justify-center"
                >
                  <div className="w-6 h-6 bg-white rounded-full"></div>
                </div>
                <div
                  className="w-12 h-12 bg-primary rounded-full flex items-center justify-center"
                >
                  <div className="w-6 h-6 bg-white rounded-full"></div>
                </div>
              </div>


              <div className="flex justify-between">
                <div className="text-center">
                  <div className="text-4xl font-bold text-gray-800 mb-1">98%</div>
                  <div className="text-sm text-gray-600">Satisfacción del cliente</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-gray-800 mb-1">15+</div>
                  <div className="text-sm text-gray-600">Años de experiencia</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-gray-800 mb-1">50+</div>
                  <div className="text-sm text-gray-600">Familias felices</div>
                </div>
              </div>
            </div>
          </div>


          <div className="gap-4 mt-20 p-2">
            <h2 className="text-3xl md:text-5xl text-primary text-center font-black mb-6">Gran variedad de propiedades</h2>
            <p className='text-center text-gray-600 mb-8'>En TuTechoAhora, te ofrecemos una amplia gama de propiedades para que encuentres la que mejor se adapte a tus necesidades.</p>
            <div className='flex flex-col md:flex-row gap-4'>
              <img
                src="/about1.jpg"
                alt="Casa moderna"
                className="w-full h-48 lg:h-60 md:w-1/3 rounded-xl object-cover"
              />
              <img
                src="/beneficiosSection2.jpg"
                alt="Casa rústica"
                className="w-full h-48 lg:h-60 md:w-1/3 rounded-xl object-cover"
              />
              <img
                src="/beneficiosSection.jpg"
                alt="Casa acogedora"
                className="w-full h-48 lg:h-60 md:w-1/3 rounded-xl object-cover"
              />
            </div>
          </div>
        </div>
        <Beneficios />
        <CTA />
      </div>
    </>
  )
}
