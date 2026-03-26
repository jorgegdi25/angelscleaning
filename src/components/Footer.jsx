import React from 'react';
import { Link } from 'react-router-dom';
import { FiFacebook, FiInstagram, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';

const Footer = () => {
    return (
        <footer className="bg-white text-charcoal/80 py-16 border-t border-sky-light mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-sm">
                    {/* Brand & Intro */}
                    <div className="col-span-1 md:col-span-1">
                        <Link to="/" className="inline-block mb-6" translate="no">
                            <img alt="Angels Cleaning Services Logo" className="h-20 w-auto" src="/logo-angels-c.png" />
                        </Link>
                        <p className="mb-6 leading-relaxed">
                            Reliable, professional, and committed to delivering spotless results for your home, apartment, or transitional property.
                        </p>
                        <div className="flex space-x-4">
                            <a href="https://facebook.com/angelscleaning" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-10 h-10 rounded-full bg-sky-pale text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-colors"><FiFacebook className="text-xl" /></a>
                            <a href="https://www.instagram.com/angels_cleaningfl/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-10 h-10 rounded-full bg-sky-pale text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-colors"><FiInstagram className="text-xl" /></a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-navy font-bold mb-6 text-lg">Quick Links</h4>
                        <ul className="space-y-4">
                            <li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li>
                            <li><Link to="/services" className="hover:text-primary transition-colors">Our Services</Link></li>
                            <li><Link to="/blog" className="hover:text-primary transition-colors">Blog</Link></li>
                            <li><Link to="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
                            <li><Link to="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="text-navy font-bold mb-6 text-lg">Our Services</h4>
                        <ul className="space-y-4">
                            <li><Link to="/services" className="hover:text-primary transition-colors">Deep Cleaning</Link></li>
                            <li><Link to="/services" className="hover:text-primary transition-colors">Recurring Residential</Link></li>
                            <li><Link to="/services" className="hover:text-primary transition-colors">Move-in / Move-out</Link></li>
                            <li><Link to="/services" className="hover:text-primary transition-colors">Transitional Property</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-navy font-bold mb-6 text-lg">Contact Us</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start">
                                <FiMapPin className="text-primary mt-1 mr-3 flex-shrink-0 text-lg" />
                                <span>Delray Beach and Boca Raton</span>
                            </li>
                            <li className="flex items-center">
                                <FiPhone className="text-primary mr-3 flex-shrink-0 text-lg" />
                                <a href="tel:+10000000000" className="hover:text-primary transition-colors">+1 (000) 000-0000</a>
                            </li>
                            <li className="flex items-center">
                                <FiMail className="text-primary mr-3 flex-shrink-0 text-lg" />
                                <a href="mailto:angelscleaningservices28@gmail.com" className="break-all hover:text-primary transition-colors">angelscleaningservices28@gmail.com</a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-sky-light mt-16 pt-8 text-center text-charcoal/60 text-sm">
                    <p>&copy; {new Date().getFullYear()} Angels Cleaning Services. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
