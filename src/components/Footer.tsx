
export default function Footer() {
  const today = new Date();
  return (
    <footer className="bg-primary text-white py-20">
      <div className="container mx-auto max-w-7xl px-4">
        <div
          className="grid md:grid-cols-3 gap-8 pb-12 border-b border-white"
          data-aos="fade-up"
        >
          <div className="flex flex-col gap-2 mb-6">
            <img src="/logoSecundario.png" alt="Logo" className="h-24 -ml-4" />
            <span className="font-semibold opacity-70">Donde tu hogar, tu futuro y tu sonrisa son lo más importante.</span>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4 underline">Secciones</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-white">Inicio</a>
              </li>
              <li>
                <a href="/nosotros" className="text-white">Nosotros</a>
              </li>
              <li>
                <a href="/propiedades" className="text-white">Propiedades</a>
              </li>
              <li>
                <a href="/contacto" className="text-white">Contacto</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4 underline">Comunicaciones</h3>
            <ul className="space-y-2">
              <li>
                <a href="mailto:info@tutechoahora.com" className="text- white">info@tutechoahora.com</a>
              </li>
              <li>
                <a
                  href="https://wa.me/51923985594?text=hola"
                  className="text-white"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  (+51) 923 985 594
                </a>
              </li>
            </ul>
          </div>

          <div className="flex flex-col col-span-2 justify-end h-full" data-aos="fade-up">
            <div className="flex gap-4 mb-4">
              <a
                href="https://www.facebook.com"
                target="_blank"
                className="text-white hover:text-secondary"
              >
                <img
                  src="https://img.icons8.com/?size=48&id=118497&format=png"
                  alt="Facebook"
                  className="w-10 h-10"
                />
              </a>

              <a
                href="https://www.instagram.com"
                target="_blank"
                className="text-white hover:text-secondary"
              >
                <img
                  src="https://img.icons8.com/?size=48&id=16713&format=png"
                  alt="Instagram"
                  className="w-10 h-10"
                />
              </a>
              <a
                href="https://www.tiktok.com"
                target="_blank"
                className="text-white hover:text-secondary"
              >
                <img
                  src="https://img.icons8.com/?size=48&id=118640&format=png"
                  alt="Tiktok"
                  className="w-10 h-10"
                />
              </a>
            </div>
            <p className="text-white">
              ©{today.getFullYear()} TuTechoAhora. Todos los derechos reservados.
            </p>
          </div>
        </div>
        <div className="text-center mt-10 text-white">
          Desarrollado por <a
            href="https://groblesolutions.netlify.app/"
            className="text-black underline">Grobles Solutions.</a
          >
        </div>
      </div>
    </footer>
  )
}
