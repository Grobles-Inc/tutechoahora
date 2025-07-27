import { Link } from '@tanstack/react-router'
import { useState, useEffect, useRef } from 'react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const headerRef = useRef<HTMLElement>(null)
  const mobileMenuRef = useRef<HTMLElement>(null)
  const menuIconRef = useRef<HTMLImageElement>(null)
  const closeIconRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const header = headerRef.current
    const mobileMenu = mobileMenuRef.current
    const menuIcon = menuIconRef.current
    const closeIcon = closeIconRef.current

    if (!header || !mobileMenu || !menuIcon || !closeIcon) return

    const toggleMenu = (open: boolean) => {
      setIsMenuOpen(open)
      if (open) {
        mobileMenu.classList.add('max-h-screen', 'opacity-100')
        mobileMenu.classList.remove('max-h-0', 'opacity-0')
        menuIcon.classList.add('opacity-0')
        closeIcon.classList.add('opacity-100')
        document.body.style.overflow = 'hidden'
      } else {
        mobileMenu.classList.remove('max-h-screen', 'opacity-100')
        mobileMenu.classList.add('max-h-0', 'opacity-0')
        menuIcon.classList.remove('opacity-0')
        closeIcon.classList.remove('opacity-100')
        document.body.style.overflow = ''
      }
    }

    const mobileMenuButton = document.getElementById('mobile-menu-button')
    const mobileMenuClose = document.getElementById('mobile-menu-close')

    mobileMenuButton?.addEventListener('click', () => toggleMenu(!isMenuOpen))
    mobileMenuClose?.addEventListener('click', () => toggleMenu(false))

    const mobileLinks = mobileMenu.getElementsByTagName('a')
    Array.from(mobileLinks).forEach((link) => {
      link.addEventListener('click', () => toggleMenu(false))
    })

    let lastScrollY = window.scrollY

    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        header.classList.add('-translate-y-full')
        if (isMenuOpen) {
          toggleMenu(false)
        }
      } else {
        header.classList.remove('-translate-y-full')
      }
      lastScrollY = currentScrollY
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      mobileMenuButton?.removeEventListener('click', () => toggleMenu(!isMenuOpen))
      mobileMenuClose?.removeEventListener('click', () => toggleMenu(false))
      Array.from(mobileLinks).forEach((link) => {
        link.removeEventListener('click', () => toggleMenu(false))
      })
    }
  }, [isMenuOpen])

  return (
    <header
      id="main-header"
      ref={headerRef}
      className="fixed w-full py-6 backdrop-blur-sm bg-white px-6 top-0 left-0 right-0 z-50 pointer-events-auto transition-all duration-300 transform"
    >
      <div className="container max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/">
            <img src="/logoPrincipal.png" alt="Logo" className="h-10" />
          </Link>
        </div>

        <nav className="hidden md:block">
          <ul className="flex space-x-8 font-semibold">
            <li>
              <Link
                to="/"
                className="relative flex items-center gap-2 text-[#383838] hover:text-primary focus:font-bold focus:text-primary transition-colors duration-300 group"
              >
                <svg viewBox="0 0 24 24" fill="none" className="size-5" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M9 16C9.85038 16.6303 10.8846 17 12 17C13.1154 17 14.1496 16.6303 15 16" stroke="#373839" strokeWidth="1.5" strokeLinecap="round"></path> <path d="M22 12.2039V13.725C22 17.6258 22 19.5763 20.8284 20.7881C19.6569 22 17.7712 22 14 22H10C6.22876 22 4.34315 22 3.17157 20.7881C2 19.5763 2 17.6258 2 13.725V12.2039C2 9.91549 2 8.77128 2.5192 7.82274C3.0384 6.87421 3.98695 6.28551 5.88403 5.10813L7.88403 3.86687C9.88939 2.62229 10.8921 2 12 2C13.1079 2 14.1106 2.62229 16.116 3.86687L18.116 5.10812C20.0131 6.28551 20.9616 6.87421 21.4808 7.82274" stroke="#373839" strokeWidth="1.5" strokeLinecap="round"></path> </g></svg>
                <span className="relative">
                  Inicio
                  <span className="absolute left-0 bottom-0 w-full h-[2px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                </span>
              </Link>
            </li>
            <li>
              <Link
                to="/nosotros"
                className="relative flex items-center gap-2 text-[#383838] hover:text-primary focus:font-bold focus:text-primary transition-colors duration-300 group"
              >
                <svg viewBox="0 0 24 24" fill="none" className="size-5" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <circle cx="9" cy="6" r="4" stroke="#373839" strokeWidth="1.5"></circle> <path d="M15 9C16.6569 9 18 7.65685 18 6C18 4.34315 16.6569 3 15 3" stroke="#373839" strokeWidth="1.5" strokeLinecap="round"></path> <path d="M5.88915 20.5843C6.82627 20.8504 7.88256 21 9 21C12.866 21 16 19.2091 16 17C16 14.7909 12.866 13 9 13C5.13401 13 2 14.7909 2 17C2 17.3453 2.07657 17.6804 2.22053 18" stroke="#373839" strokeWidth="1.5" strokeLinecap="round"></path> <path d="M18 14C19.7542 14.3847 21 15.3589 21 16.5C21 17.5293 19.9863 18.4229 18.5 18.8704" stroke="#373839" strokeWidth="1.5" strokeLinecap="round"></path> </g></svg>
                <span className="relative">
                  Nosotros
                  <span className="absolute left-0 bottom-0 w-full h-[2px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                </span>
              </Link>
            </li>
            <li>
              <Link
                to="/propiedades"
                className="relative flex items-center gap-2 text-[#383838] hover:text-primary focus:font-bold focus:text-primary transition-colors duration-300 group"
              >
                <svg viewBox="0 0 24 24" className='size-5' fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Navigation / Building_01"> <path id="Vector" d="M2 20H4M4 20H9M4 20V7.2002C4 6.08009 4 5.51962 4.21799 5.0918C4.40973 4.71547 4.71547 4.40973 5.0918 4.21799C5.51962 4 6.08009 4 7.2002 4H8.8002C9.9203 4 10.4796 4 10.9074 4.21799C11.2837 4.40973 11.5905 4.71547 11.7822 5.0918C12 5.5192 12 6.07899 12 7.19691V10.0002M9 20H20M9 20V14.3682C9 13.8428 9 13.58 9.063 13.335C9.11883 13.1178 9.21073 12.9118 9.33496 12.7252C9.47505 12.5147 9.67113 12.3384 10.0615 11.9877L12.3631 9.91997C13.1178 9.24192 13.4955 8.90264 13.9225 8.77393C14.2989 8.66045 14.7007 8.66045 15.0771 8.77393C15.5045 8.90275 15.8827 9.2422 16.6387 9.92139L18.9387 11.9877C19.3295 12.3388 19.5245 12.5146 19.6647 12.7252C19.7889 12.9118 19.8807 13.1178 19.9365 13.335C19.9995 13.58 20 13.8428 20 14.3682V20M20 20H22" stroke="#373839" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g> </g></svg>
                <span className="relative">
                  Propiedades
                  <span className="absolute left-0 bottom-0 w-full h-[2px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                </span>
              </Link>
            </li>
          </ul>
        </nav>

        <div className="flex items-center">
          <button
            id="mobile-menu-button"
            className="md:hidden flex items-center justify-center w-8 h-8 relative"
          >
            <img
              id="menu-icon"
              ref={menuIconRef}
              src="https://img.icons8.com/?size=100&id=8113&format=png"
              alt="menu"
              className="w-6 h-6 transition-opacity duration-300"
            />

            <img
              id="close-icon"
              ref={closeIconRef}
              src="https://img.icons8.com/?size=160&id=XBRxNqBV78jJ&format=png"
              alt="closemenu"
              className="w-6 h-6 absolute opacity-0 transition-opacity duration-300"
            />
          </button>
          <Link
            to="/contacto"
            className="btn btn-lg hidden md:flex text-[#383838] hover:text-primary bg-white border border-gray-300 transition-all duration-300 hover:scale-110 items-center gap-2 group"
          >
            Contáctanos
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" id="up-right" className="icon glyph size-5" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M19,4H9A1,1,0,0,0,9,6h7.59L4.29,18.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0L18,7.41V14.9a1,1,0,0,0,2,0V5A1,1,0,0,0,19,4Z" style={{ fill: '#373839' }}></path></g></svg>
          </Link>
        </div>
      </div>

      <nav
        id="mobile-menu"
        ref={mobileMenuRef}
        className="md:hidden fixed top-0 right-0 w-full max-h-0 opacity-0 bg-white overflow-hidden transition-all duration-300 ease-in-out shadow-lg"
      >
        <div className="flex items-center justify-between p-6">
          <img src="/logoPrincipal.png" alt="Logo" className="h-10" />
          <button
            id="mobile-menu-close"
            className="text-gray-800 flex items-center justify-center w-8 h-8"
          >
            <img
              src="https://img.icons8.com/?size=160&id=XBRxNqBV78jJ&format=png"
              alt="closemenu"
              className="w-6 h-6"
            />
          </button>
        </div>
        <ul className="flex flex-col space-y-6 p-6 font-semibold">
          <li>
            <Link
              to="/"
              className="flex items-center gap-3 text-primary transition-all duration-300 py-2 text-xl"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                ></path>
              </svg>
              Inicio
            </Link>
          </li>
          <li>
            <Link
              to="/nosotros"
              className="flex items-center gap-3 text-primary transition-all duration-300 py-2 text-xl"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                ></path>
              </svg>
              Nosotros
            </Link>
          </li>
          <li>
            <Link
              to="/propiedades"
              className="flex items-center gap-3 text-primary transition-all duration-300 py-2 text-xl"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                ></path>
              </svg>
              Propiedades
            </Link>
          </li>
          <Link
            to="/contacto"
            className="btn btn-lg text-[#383838] hover:text-primary bg-white border border-gray-300 transition-all duration-300 items-center gap-2 group"
          >
            Contáctanos
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" id="up-right" className="icon glyph size-5" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M19,4H9A1,1,0,0,0,9,6h7.59L4.29,18.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0L18,7.41V14.9a1,1,0,0,0,2,0V5A1,1,0,0,0,19,4Z" style={{ fill: '#373839' }}></path></g></svg>
          </Link>
        </ul>
      </nav>
    </header>
  )
}
