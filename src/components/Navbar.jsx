import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="bg-white/90 backdrop-blur-lg border-b border-sky-light sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    <div className="flex-shrink-0 flex items-center py-2 pr-6">
                        <Link className="flex items-center" to="/">
                            <img alt="Angels Cleaning Services Logo" className="h-16 w-auto" src="/logo-angels-c.png" />
                        </Link>
                    </div>
                    <nav className="hidden md:flex space-x-8">
                        <Link className="text-charcoal hover:text-primary px-3 py-2 rounded-md text-sm font-semibold transition-colors" to="/">Home</Link>
                        <Link className="text-charcoal hover:text-primary px-3 py-2 rounded-md text-sm font-semibold transition-colors" to="/services">Services</Link>
                        <Link className="text-charcoal hover:text-primary px-3 py-2 rounded-md text-sm font-semibold transition-colors" to="/blog">Blog</Link>
                        <Link className="text-charcoal hover:text-primary px-3 py-2 rounded-md text-sm font-semibold transition-colors" to="/about">About Us</Link>
                        <Link className="text-charcoal hover:text-primary px-3 py-2 rounded-md text-sm font-semibold transition-colors" to="/contact">Contact</Link>
                    </nav>
                    <div className="hidden md:flex items-center">
                        <Link className="bg-primary text-white hover:bg-[#0096b4] px-6 py-2.5 rounded-full text-sm font-bold transition-all shadow-lg shadow-primary/30" to="/quote">Get a Free Quote</Link>
                    </div>
                    <div className="md:hidden flex items-center">
                        <button
                            className="text-charcoal hover:text-primary focus:outline-none"
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            <span className="material-icons">{isOpen ? 'close' : 'menu'}</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-white border-b border-sky-light">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-charcoal hover:text-primary hover:bg-sky-pale" onClick={() => setIsOpen(false)}>Home</Link>
                        <Link to="/services" className="block px-3 py-2 rounded-md text-base font-medium text-charcoal hover:text-primary hover:bg-sky-pale" onClick={() => setIsOpen(false)}>Services</Link>
                        <Link to="/blog" className="block px-3 py-2 rounded-md text-base font-medium text-charcoal hover:text-primary hover:bg-sky-pale" onClick={() => setIsOpen(false)}>Blog</Link>
                        <Link to="/about" className="block px-3 py-2 rounded-md text-base font-medium text-charcoal hover:text-primary hover:bg-sky-pale" onClick={() => setIsOpen(false)}>About Us</Link>
                        <Link to="/contact" className="block px-3 py-2 rounded-md text-base font-medium text-charcoal hover:text-primary hover:bg-sky-pale" onClick={() => setIsOpen(false)}>Contact</Link>
                        <Link to="/quote" className="block mt-4 text-center bg-primary text-white hover:bg-[#0096b4] px-6 py-2.5 rounded-full text-sm font-bold transition-all shadow-lg shadow-primary/30" onClick={() => setIsOpen(false)}>Get a Free Quote</Link>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Navbar;
