
export default function WhatsAppButton() {

  const handleWhatsAppClick = () => {
    const phoneNumber = '51914019629'
    const message = '¡Hola! Me interesa conocer más sobre sus propiedades, que tienen en venta.'
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`

    window.open(whatsappUrl, '_blank')
  }

  return (
    <button
      onClick={handleWhatsAppClick}
      className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 cursor-pointer group"
      aria-label="Contactar por WhatsApp"
    >
      <img src="https://img.icons8.com/?size=48&id=16713&format=png" alt="WhatsApp" className="w-8 h-8 group-hover:scale-110 transition-transform duration-300" />
    </button>
  )
}
