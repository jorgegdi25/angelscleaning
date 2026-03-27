import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';

const fadeUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 0.6, ease: "easeOut" }
};

const Services = () => {
    return (
        <div className="pt-0 bg-white">
            <Helmet>
                <title>Our Services | Angels Cleaning Services</title>
                <meta name="description" content="Explore our professional cleaning services including Deep Cleaning, Recurring Residential, Move-In/Move-Out, and Transitional Property cleaning." />
            </Helmet>
            {/* Header */}
            <section className="relative py-24 bg-sky-light overflow-hidden">
                <div className="absolute inset-0 z-0 opacity-20">
                    <img src="/images/services-header.png" alt="Background" className="w-full h-full object-cover" />
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <h1 className="text-4xl md:text-5xl font-bold text-navy mb-4">Our Services</h1>
                    <p className="text-lg text-charcoal/80 max-w-2xl mx-auto">Professional cleaning tailored to your specific needs.</p>
                </div>
            </section>

            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    {/* Service 1 */}
                    <motion.div id="deep-cleaning" className="flex flex-col md:flex-row gap-12 items-center mb-24 scroll-mt-24" {...fadeUp}>
                        <div className="w-full md:w-1/2">
                            <div className="rounded-3xl overflow-hidden shadow-2xl h-80">
                                <img src="/images/deep-clean.png" alt="Deep Cleaning" loading="lazy" className="w-full h-full object-cover" />
                            </div>
                        </div>
                        <div className="w-full md:w-1/2">
                            <h3 className="text-3xl font-bold text-navy mb-4">1. Deep & Extensive Cleaning</h3>
                            <p className="text-charcoal/80 mb-6 text-lg">A complete and thorough cleaning for homes and apartments that need attention to detail.</p>
                            <h4 className="font-bold text-primary mb-3">Includes:</h4>
                            <ul className="space-y-2 mb-8 text-charcoal/70 list-disc pl-5">
                                <li>Kitchens: surfaces, countertops, sinks, and exterior appliances.</li>
                                <li>Bathrooms: disinfecting toilets, sinks, showers, and bathtubs.</li>
                                <li>Floors: sweeping, mopping.</li>
                                <li>Dusting and details: furniture, shelves, baseboards, and accessible windows.</li>
                            </ul>
                            <Link to="/contact" className="inline-flex justify-center items-center bg-primary text-white hover:bg-[#0096b4] px-8 py-3 rounded-full text-base font-bold shadow-lg shadow-primary/30 transition-transform hover:-translate-y-1">Request Quote</Link>
                        </div>
                    </motion.div>

                    {/* Service 2 */}
                    <motion.div id="recurring-cleaning" className="flex flex-col md:flex-row-reverse gap-12 items-center mb-24 scroll-mt-24" {...fadeUp}>
                        <div className="w-full md:w-1/2">
                            <div className="rounded-3xl overflow-hidden shadow-2xl h-80">
                                <img src="/images/recurring-clean.png" alt="Recurring Cleaning" loading="lazy" className="w-full h-full object-cover" />
                            </div>
                        </div>
                        <div className="w-full md:w-1/2">
                            <h3 className="text-3xl font-bold text-navy mb-4">2. Recurring Residential & Tenant Cleaning</h3>
                            <p className="text-charcoal/80 mb-6 text-lg">Scheduled services weekly, biweekly, or monthly to keep your property always clean, organized, and reliable.</p>
                            <h4 className="font-bold text-primary mb-3">Includes:</h4>
                            <ul className="space-y-2 mb-8 text-charcoal/70 list-disc pl-5">
                                <li>General cleaning of kitchens, bathrooms, bedrooms, and living areas.</li>
                                <li>Dusting and polishing of accessible surfaces.</li>
                                <li>Maintenance of high-traffic areas.</li>
                            </ul>
                            <Link to="/contact" className="inline-flex justify-center items-center bg-primary text-white hover:bg-[#0096b4] px-8 py-3 rounded-full text-base font-bold shadow-lg shadow-primary/30 transition-transform hover:-translate-y-1">Request Quote</Link>
                        </div>
                    </motion.div>

                    {/* Service 3 */}
                    <motion.div id="move-in-out" className="flex flex-col md:flex-row gap-12 items-center mb-24 scroll-mt-24" {...fadeUp}>
                        <div className="w-full md:w-1/2">
                            <div className="rounded-3xl overflow-hidden shadow-2xl h-80">
                                <img src="/images/move-in-out.png" alt="Move-in Cleaning" loading="lazy" className="w-full h-full object-cover" />
                            </div>
                        </div>
                        <div className="w-full md:w-1/2">
                            <h3 className="text-3xl font-bold text-navy mb-4">3. Move-In / Move-Out Cleaning</h3>
                            <p className="text-charcoal/80 mb-6 text-lg">Preparing properties for new tenants, owners, or deposit returns. Leaving every space spotless, safe, and ready to move in.</p>
                            <h4 className="font-bold text-primary mb-3">Includes:</h4>
                            <ul className="space-y-2 mb-8 text-charcoal/70 list-disc pl-5">
                                <li>Deep and thorough cleaning of all accessible areas.</li>
                                <li>Kitchens and bathrooms disinfected.</li>
                                <li>Floors, walls, and surfaces inspected.</li>
                                <li>Removal of dust and leftover debris from previous occupants.</li>
                                <li>Attention to details for inspections and deposit recovery.</li>
                            </ul>
                            <Link to="/contact" className="inline-flex justify-center items-center bg-primary text-white hover:bg-[#0096b4] px-8 py-3 rounded-full text-base font-bold shadow-lg shadow-primary/30 transition-transform hover:-translate-y-1">Request Quote</Link>
                        </div>
                    </motion.div>

                    {/* Service 4 */}
                    <motion.div id="transitional" className="flex flex-col md:flex-row-reverse gap-12 items-center mb-16 scroll-mt-24" {...fadeUp}>
                        <div className="w-full md:w-1/2">
                            <div className="rounded-3xl overflow-hidden shadow-2xl h-80">
                                <img src="/images/transitional.png" alt="Transitional Cleaning" loading="lazy" className="w-full h-full object-cover" />
                            </div>
                        </div>
                        <div className="w-full md:w-1/2">
                            <h3 className="text-3xl font-bold text-navy mb-4">4. Transitional Property Cleaning</h3>
                            <p className="text-charcoal/80 mb-6 text-lg">Perfect for properties for sale, rent, or renovation. We make your property look welcoming, clean, and ready for its next purpose.</p>
                            <h4 className="font-bold text-primary mb-3">Includes:</h4>
                            <ul className="space-y-2 mb-8 text-charcoal/70 list-disc pl-5">
                                <li>Deep and thorough cleaning of all accessible areas.</li>
                                <li>Removal of stains, accumulated dust.</li>
                                <li>Preparing the property for showings to buyers or new tenants.</li>
                            </ul>
                            <Link to="/contact" className="inline-flex justify-center items-center bg-primary text-white hover:bg-[#0096b4] px-8 py-3 rounded-full text-base font-bold shadow-lg shadow-primary/30 transition-transform hover:-translate-y-1">Request Quote</Link>
                        </div>
                    </motion.div>

                </div>
            </section>

            {/* Specialized */}
            <section id="specialized" className="py-20 bg-sky-pale scroll-mt-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div className="bg-white rounded-[2.5rem] p-10 md:p-16 shadow-xl border border-white" {...fadeUp}>
                        <h2 className="text-3xl font-bold text-navy mb-10 text-center">5. Specialized & Customizable Services</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <div className="bg-sky-light/50 p-6 rounded-2xl">
                                <h4 className="text-xl font-bold text-primary mb-2">Steam Cleaning</h4>
                                <p className="text-charcoal/70 text-sm">Professional option to disinfect floors and surfaces, removing bacteria and mold without harsh chemicals.</p>
                            </div>
                            <div className="bg-sky-light/50 p-6 rounded-2xl">
                                <h4 className="text-xl font-bold text-primary mb-2">High-Level Disinfection</h4>
                                <p className="text-charcoal/70 text-sm">Especially in bathrooms and kitchens for maximum hygiene.</p>
                            </div>
                            <div className="bg-sky-light/50 p-6 rounded-2xl">
                                <h4 className="text-xl font-bold text-primary mb-2">Express / Quick Cleaning</h4>
                                <p className="text-charcoal/70 text-sm">Perfect for visits, meetings, or events, focusing on key areas.</p>
                            </div>
                            <div className="bg-sky-light/50 p-6 rounded-2xl">
                                <h4 className="text-xl font-bold text-primary mb-2">Post-Construction</h4>
                                <p className="text-charcoal/70 text-sm">Cleaning after renovations or construction to leave the property spotless.</p>
                            </div>
                            <div className="bg-sky-light/50 p-6 rounded-2xl">
                                <h4 className="text-xl font-bold text-primary mb-2">Customized Cleaning</h4>
                                <p className="text-charcoal/70 text-sm">Choose the areas you want cleaned based on your priorities.</p>
                            </div>
                            <div className="bg-sky-light/50 p-6 rounded-2xl">
                                <h4 className="text-xl font-bold text-primary mb-2">Pet-Friendly & Safe</h4>
                                <p className="text-charcoal/70 text-sm">We accept properties with pets and use products that are safe. We follow OSHA guidelines.</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default Services;
