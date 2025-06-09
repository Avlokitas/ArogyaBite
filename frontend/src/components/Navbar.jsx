"use client"

import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import { Menu, X, Utensils, ScanLine, Apple, Salad } from "lucide-react"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const isLoggedIn = !!localStorage.getItem("email");

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false)
  }, [location])

  
  const featureLinks = [
    {
      name: "OCR Label Recognition",
      path: "/ocr",
      icon: <ScanLine className="w-5 h-5 mr-2" />,
      color: "text-orange-500",
    },
    {
      name: "Recipe Recommendation",
      path: "/recommend",
      icon: <Utensils className="w-5 h-5 mr-2" />,
      color: "text-emerald-500",
    },
    {
      name: "Diet Recommendation",
      path: "/diet-recommendation",
      icon: <Apple className="w-5 h-5 mr-2" />,
      color: "text-blue-500",
    },
    {
      name: "Nutritional Alternatives",
      path: "/nutritional-recommendation",
      icon: <Salad className="w-5 h-5 mr-2" />,
      color: "text-purple-500",
    },
  ]

  // Other navigation links
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Contact Us", path: "/contact" },
  ]

  {localStorage.getItem('token') && (
    <Link
      to="/profile"
      className={`px-3 py-2 font-medium transition-colors duration-300 text-white hover:text-orange-400 ${
        location.pathname === "/profile" ? "text-orange-400" : ""
      }`}
    >
      My Profile
    </Link>
  )}
  
  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? "bg-black/90 py-2" : "bg-black py-4"}`}>
      <div className="container-custom">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-white font-script">🌿𝘈𝙧𝙤𝙜𝙮𝙖𝘽𝙞𝙩𝙚🍏</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {/* Main nav links */}
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`px-3 py-2 font-medium transition-colors duration-300 text-white hover:text-orange-400 ${
                  location.pathname === link.path ? "text-orange-400" : ""
                }`}
              >
                {link.name}
              </Link>
            ))}

              {/* My Profile link */}
  {localStorage.getItem("email") && (
    <Link
      to="/profile"
      className={`px-3 py-2 font-medium transition-colors duration-300 text-white hover:text-orange-400 ${
        location.pathname === "/profile" ? "text-orange-400" : ""
      }`}
    >
      My Profile
    </Link>
  )}


            {/* Feature links */}
            <div className="relative group ml-2">
              <button className="px-3 py-2 font-medium text-white hover:text-orange-400 flex items-center">
                Features <span className="ml-1">▾</span>
              </button>
              <div className="absolute left-0 mt-2 w-64 bg-white rounded-md shadow-lg overflow-hidden z-20 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top-right">
                {featureLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`block px-4 py-3 text-sm text-gray-800 hover:bg-gray-100 flex items-center ${link.color}`}
                  >
                    {link.icon}
                    <span>{link.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Feature Quick Access Buttons - Desktop */}
          <div className="hidden lg:flex items-center space-x-2">
            {featureLinks.map((link, index) => (
              <Link
                key={link.name}
                to={link.path}
                className={`flex items-center px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  index === 0
                    ? "bg-orange-500 hover:bg-orange-600 text-white"
                    : index === 1
                      ? "bg-emerald-500 hover:bg-emerald-600 text-white"
                      : index === 2
                        ? "bg-blue-500 hover:bg-blue-600 text-white"
                        : "bg-purple-500 hover:bg-purple-600 text-white"
                }`}
              >
                {link.icon}
                <span className="hidden xl:inline">{link.name.split(" ")[0]}</span>
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white hover:text-orange-400 focus:outline-none">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden mt-4 pb-4">
            <div className="flex flex-col space-y-2">
              {/* Main nav links */}
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="font-medium transition-colors duration-300 text-white hover:text-orange-400 py-2"
                >
                  {link.name}
                </Link>
              ))}

                {/* My Profile for mobile */}
  {localStorage.getItem("email") && (
    <Link
      to="/profile"
      className="font-medium transition-colors duration-300 text-white hover:text-orange-400 py-2"
    >
      My Profile
    </Link>
  )}


              {/* Feature links */}
              <div className="pt-2 border-t border-gray-700">
                <h3 className="text-gray-400 text-sm uppercase mb-2">Features</h3>
                {featureLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`flex items-center py-2 font-medium transition-colors duration-300 text-white hover:text-orange-400 ${link.color}`}
                  >
                    {link.icon}
                    <span>{link.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar