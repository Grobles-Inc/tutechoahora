
export default function BotonContacto() {
  return (
    <div>
      <a
        href="/contacto"
        className="btn btn-lg text-[#383838] hover:text-primary bg-white border border-gray-300 transition-all duration-300 hover:scale-110 items-center gap-2 group rounded-full"
      >
        Contáctanos
        <svg
          viewBox="0 0 24 24"
          className="w-5 h-5 transition-transform icon glyph duration-500 group-hover:rotate-[360deg] group-hover:fill-green-500"
          xmlns="http://www.w3.org/2000/svg"
          id="up-right"
          fill="#000000"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
          <g id="SVGRepo_iconCarrier">
            <path
              d="M19,4H9A1,1,0,0,0,9,6h7.59L4.29,18.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0L18,7.41V14.9a1,1,0,0,0,2,0V5A1,1,0,0,0,19,4Z"
              style={{ fill: 'currentColor' }}
              className="transition-colors duration-300"
            ></path>
          </g>
        </svg>
      </a>
    </div>
  )
}
