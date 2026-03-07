import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';

const fadeUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 0.6, ease: "easeOut" }
};

const About = () => {
    return (
        <div className="pt-0">
            <Helmet>
                <title>About Us | Angels Cleaning Services</title>
                <meta name="description" content="Learn about Angels Cleaning Services, our mission, vision, and the professional team dedicated to providing top-quality residential and transitional cleaning." />
            </Helmet>

            {/* Header */}
            <section className="relative py-24 bg-sky-light overflow-hidden">
                <div className="absolute inset-0 z-0 opacity-20">
                    <img src="/images/about-header.png" alt="Background" className="w-full h-full object-cover" />
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <h1 className="text-4xl md:text-5xl font-bold text-navy mb-4">About Us</h1>
                    <p className="text-lg text-charcoal/80 max-w-2xl mx-auto">Delivering spotless results, fulfilling every promise.</p>
                </div>
            </section>

            {/* History */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <motion.div {...fadeUp}>
                            <h2 className="text-primary font-bold tracking-widest uppercase text-xs mb-3 border-b border-primary/20 inline-block pb-1">Our History & Experience</h2>
                            <h3 className="text-3xl font-bold text-navy mb-6">Born from a need for professional cleaning</h3>
                            <div className="space-y-4 text-charcoal/80 text-lg leading-relaxed">
                                <p>At Angels Cleaning Services, we were born from our clients’ need for reliable, professional, and committed cleaning services. Our team brings years of combined experience in residential and transitional property cleaning, offering everything from deep cleaning to move-in and move-out services.</p>
                                <p>Our mission has always been to deliver spotless results, fulfilling every promise made to our clients and ensuring each property is clean, safe, and ready for its next stage.</p>
                                <p>Today, we continue to grow while maintaining our commitment to precision, safety, and client satisfaction, serving Delray Beach and Boca Raton.</p>
                            </div>
                        </motion.div>
                        <motion.div className="relative" {...fadeUp} transition={{ duration: 0.6, delay: 0.2 }}>
                            <div className="rounded-3xl overflow-hidden shadow-2xl">
                                <img src="/images/team-history.png" alt="Cleaning professionals" loading="lazy" className="w-full h-full object-cover" />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Mission Vision */}
            <section className="py-20 bg-sky-pale">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div className="text-center max-w-3xl mx-auto mb-16" {...fadeUp}>
                        <h2 className="text-primary font-bold tracking-widest uppercase text-xs mb-3 border-b border-primary/20 inline-block pb-1">Our Philosophy</h2>
                        <h3 className="text-3xl font-bold text-navy">Mission & Vision</h3>
                    </motion.div>
                    <div className="grid md:grid-cols-2 gap-10">
                        <motion.div className="bg-white p-10 rounded-3xl shadow-xl hover:-translate-y-2 transition-transform" {...fadeUp} transition={{ duration: 0.6, delay: 0.1 }}>
                            <div className="w-14 h-14 bg-sky-pale text-primary rounded-2xl flex items-center justify-center mb-6">
                                <span className="material-icons text-3xl">flag</span>
                            </div>
                            <h4 className="text-2xl font-bold text-navy mb-4">Our Mission</h4>
                            <p className="text-charcoal/70 leading-relaxed">Our mission is to always fulfill the promises made to our clients, making property cleaning a worry-free experience. We focus on delivering reliable, detailed, and professional results, whether for houses, apartments, or transitional properties, providing peace of mind and satisfaction with every service.</p>
                        </motion.div>
                        <motion.div className="bg-white p-10 rounded-3xl shadow-xl hover:-translate-y-2 transition-transform" {...fadeUp} transition={{ duration: 0.6, delay: 0.3 }}>
                            <div className="w-14 h-14 bg-sky-pale text-primary rounded-2xl flex items-center justify-center mb-6">
                                <span className="material-icons text-3xl">visibility</span>
                            </div>
                            <h4 className="text-2xl font-bold text-navy mb-4">Our Vision</h4>
                            <p className="text-charcoal/70 leading-relaxed">To be the most trusted and recognized residential, recurring, and transitional property cleaning company in Delray Beach and Boca Raton, known for deep cleaning, recurring residential cleaning, move-in and move-out cleaning, and reliable services that deliver spotless results and peace of mind for every client.</p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Core Values */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div {...fadeUp} className="mb-12">
                        <h2 className="text-primary font-bold tracking-widest uppercase text-xs mb-3 border-b border-primary/20 inline-block pb-1">Core Values</h2>
                        <h3 className="text-3xl font-bold text-navy">What drives us</h3>
                    </motion.div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        <motion.div className="p-6" {...fadeUp} transition={{ duration: 0.5, delay: 0.1 }}>
                            <div className="w-16 h-16 mx-auto bg-sky-light text-primary rounded-full flex items-center justify-center mb-4"><span className="material-icons text-3xl">handshake</span></div>
                            <h4 className="text-xl font-bold text-navy mb-2">Commitment</h4>
                            <p className="text-charcoal/70 text-sm">Always fulfilling the promises made for residential, tenant, and transitional property cleaning.</p>
                        </motion.div>
                        <motion.div className="p-6" {...fadeUp} transition={{ duration: 0.5, delay: 0.2 }}>
                            <div className="w-16 h-16 mx-auto bg-sky-light text-primary rounded-full flex items-center justify-center mb-4"><span className="material-icons text-3xl">workspace_premium</span></div>
                            <h4 className="text-xl font-bold text-navy mb-2">Quality</h4>
                            <p className="text-charcoal/70 text-sm">Delivering deep cleaning and detailed maintenance, as well as recurring services.</p>
                        </motion.div>
                        <motion.div className="p-6" {...fadeUp} transition={{ duration: 0.5, delay: 0.3 }}>
                            <div className="w-16 h-16 mx-auto bg-sky-light text-primary rounded-full flex items-center justify-center mb-4"><span className="material-icons text-3xl">verified_user</span></div>
                            <h4 className="text-xl font-bold text-navy mb-2">Trust</h4>
                            <p className="text-charcoal/70 text-sm">A professional, insured, and respectful team providing reliable cleaning services.</p>
                        </motion.div>
                        <motion.div className="p-6" {...fadeUp} transition={{ duration: 0.5, delay: 0.4 }}>
                            <div className="w-16 h-16 mx-auto bg-sky-light text-primary rounded-full flex items-center justify-center mb-4"><span className="material-icons text-3xl">health_and_safety</span></div>
                            <h4 className="text-xl font-bold text-navy mb-2">Safety</h4>
                            <p className="text-charcoal/70 text-sm">Following professional safety standards (OSHA guidelines) with full insurance coverage.</p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Team */}
            <section className="py-20 bg-sky-pale">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div {...fadeUp} className="mb-12">
                        <h2 className="text-primary font-bold tracking-widest uppercase text-xs mb-3 border-b border-primary/20 inline-block pb-1">Our Team</h2>
                        <h3 className="text-3xl font-bold text-navy mb-4">Meet the Professionals</h3>
                        <p className="text-charcoal/80 max-w-2xl mx-auto">Professionals dedicated to maintaining our high standards of quality, safety, and attention to detail.</p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
                        <motion.div className="bg-white p-8 rounded-[2rem] shadow-xl border border-white hover:border-primary/30 transition-all" {...fadeUp} transition={{ duration: 0.6, delay: 0.1 }}>
                            <div className="w-32 h-32 bg-sky-light rounded-full mx-auto mb-6 flex items-center justify-center overflow-hidden border-4 border-white shadow-lg">
                                <img src="/images/headshot-jacqueline.png" alt="Jacqueline Henao" loading="lazy" className="w-full h-full object-cover" />
                            </div>
                            <h4 className="text-2xl font-bold text-navy mb-1">Jacqueline Henao</h4>
                            <p className="text-primary font-bold text-sm tracking-wider uppercase mb-4">Operations Manager</p>
                            <p className="text-charcoal/70">Jacqueline oversees daily cleaning operations, ensuring every service meets our high standards of quality, safety, and attention to detail.</p>
                        </motion.div>
                        <motion.div className="bg-white p-8 rounded-[2rem] shadow-xl border border-white hover:border-primary/30 transition-all" {...fadeUp} transition={{ duration: 0.6, delay: 0.3 }}>
                            <div className="w-32 h-32 bg-sky-light rounded-full mx-auto mb-6 flex items-center justify-center overflow-hidden border-4 border-white shadow-lg">
                                <img src="/images/headshot-andres.png" alt="Andrés Angel" loading="lazy" className="w-full h-full object-cover" />
                            </div>
                            <h4 className="text-2xl font-bold text-navy mb-1">Andrés Angel</h4>
                            <p className="text-primary font-bold text-sm tracking-wider uppercase mb-4">Manager</p>
                            <p className="text-charcoal/70">Andrés manages scheduling, client communication, and overall service coordination to guarantee efficient, reliable, and trustworthy cleaning.</p>
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
