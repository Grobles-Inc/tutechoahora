import { Link } from '@tanstack/react-router'
import { useRef, useEffect } from 'react'
import BotonContacto from './BotonContacto'

export default function Header() {
  const headerRef = useRef<HTMLElement>(null)
  const drawerCheckboxRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const header = headerRef.current
    if (!header) return

    let lastScrollY = window.scrollY

    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        header.classList.add('-translate-y-full')
        if (drawerCheckboxRef.current) {
          drawerCheckboxRef.current.checked = false
        }
      } else {
        header.classList.remove('-translate-y-full')
      }
      lastScrollY = currentScrollY
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <header
      id="main-header"
      ref={headerRef}
      className="fixed w-full py-6 backdrop-blur-sm bg-white px-6 top-0 left-0 right-0 z-50 pointer-events-auto transition-all duration-300 transform"
    >
      <div className="drawer drawer-end">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" ref={drawerCheckboxRef} />
        <div className="drawer-content">
          <div className="container max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center">
              <Link to="/">
                <img src="/logoPrincipal.jpg" alt="Logo" className="h-16" />
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
              <label
                htmlFor="my-drawer"
                className="drawer-button md:hidden flex items-center justify-center w-8 h-8 relative cursor-pointer"
              >
                <svg viewBox="0 0 24 24" fill="none" className='size-8' xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 18L20 18" stroke="#292929" strokeWidth="2" strokeLinecap="round"></path> <path d="M4 12L20 12" stroke="#292929" strokeWidth="2" strokeLinecap="round"></path> <path d="M4 6L20 6" stroke="#292929" strokeWidth="2" strokeLinecap="round"></path> </g></svg>
              </label>
              <Link
                to="/contacto"
                className="hidden md:flex "
              >
                <BotonContacto />
              </Link>
            </div>
          </div>
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 min-h-full bg-base-100 text-base-content">
            <div className="flex items-center justify-between p-2 mb-4">
              <img src="/logoPrincipal.jpg" alt="Logo" className="h-10" />
              <label
                htmlFor="my-drawer"
                className="btn btn-ghost btn-circle"
                aria-label="close sidebar"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </label>
            </div>
            <li onClick={() => drawerCheckboxRef.current && (drawerCheckboxRef.current.checked = false)}>
              <Link
                to="/"
                className="flex items-center gap-3 text-primary transition-all duration-300 py-4 text-xl"
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
            <li onClick={() => drawerCheckboxRef.current && (drawerCheckboxRef.current.checked = false)}>
              <Link
                to="/nosotros"
                className="flex items-center gap-3 text-primary transition-all duration-300 py-4 text-xl"
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
            <li onClick={() => drawerCheckboxRef.current && (drawerCheckboxRef.current.checked = false)}>
              <Link
                to="/propiedades"
                className="flex items-center gap-3 text-primary transition-all duration-300 py-4 text-xl"
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
            <li onClick={() => drawerCheckboxRef.current && (drawerCheckboxRef.current.checked = false)}>
              <Link
                to="/contacto"
                className="flex items-center gap-3 text-primary transition-all duration-300 py-4 text-xl"
              >
                <BotonContacto />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  )
}
