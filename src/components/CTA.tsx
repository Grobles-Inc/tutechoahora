
export default function CTA() {
  return (
    <section className="relative md:my-20 py-20 px-4">
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center md:rounded-[40px] mx-auto max-w-7xl"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1448630360428-65456885c650?q=80&w=1167&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        }}
      >
      </div>
      <div className="absolute inset-0 w-full h-full bg-black/50 md:rounded-[40px] mx-auto max-w-7xl"></div>
      <div className="container mx-auto relative">
        <div className="flex flex-col items-center text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6" id="title">
            ¡Listo para encontrar tu hogar de tus sueños!
          </h2>

          <p
            className="text-lg mb-10 max-w-2xl"
          >
            Encuentra tu hogar ideal, contacta a nuestro equipo de profesionales, para poder conocer el hogar de tus sueños.
          </p>

          <a
            href="/contacto"
            className="btn btn-lg text-[#383838] hover:text-primary bg-white border border-gray-300 transition-all duration-300 hover:scale-110 items-center gap-2 group rounded-full"
          >
            Contáctanos
            <svg viewBox="0 0 24 24" className="w-5 h-5 transition-transform icon glyph duration-500 group-hover:rotate-[360deg]" xmlns="http://www.w3.org/2000/svg" id="up-right" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M19,4H9A1,1,0,0,0,9,6h7.59L4.29,18.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0L18,7.41V14.9a1,1,0,0,0,2,0V5A1,1,0,0,0,19,4Z" style={{ fill: '#231f20' }}></path></g></svg>

          </a>
        </div>
      </div>
    </section>
  )
}
