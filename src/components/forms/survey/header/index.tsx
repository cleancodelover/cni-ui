import Link from 'next/link'
import React from 'react'

function Header() {
  return <header className="sticky top-0 bg-gray-800 shadow-lg z-50 animate-slideDown">
  <div className="container mx-auto px-4 py-3 flex justify-between items-center">
    <h1 className="text-xl font-bold">CRMI</h1>
    <nav className="flex space-x-4">
      <a href="#dashboard" className="hover:text-blue-400 transition duration-300">Dashboard</a>
      <a href="#profile" className="hover:text-blue-400 transition duration-300">Profile</a>
      <Link href="/" className="hover:text-blue-400 transition duration-300">Logout</Link>
    </nav>
  </div>
</header>
}

export default Header