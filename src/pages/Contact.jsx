import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Contact = () => {
    const fadeUp = {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-100px" },
        transition: { duration: 0.6 }
    };

    return (
        <>
            <Helmet>
                <title>Contact Us | Angels Cleaning Services</title>
                <meta name="description" content="Contact Angels Cleaning Services for professional cleaning in Boca Raton, Delray Beach, and Boynton Beach." />
            </Helmet>

            {/* Premium Header */}
            <section className="relative pt-32 pb-20 bg-gradient-to-br from-navy to-[#05254A] overflow-hidden min-h-[40vh] flex items-center">
                <div className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-20" style={{ backgroundImage: "url('/images/contact-header.jpg')" }}></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
                    <motion.div className="max-w-3xl mx-auto text-center" {...fadeUp}>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
                            Ready for a <br /> <span className="text-sky-pale block mt-2">Cleaner Home?</span>
                        </h1>
                        <p className="text-xl text-sky-pale/80 mb-8 leading-relaxed">
                            We are ready to tackle your toughest cleaning challenges. Contact us directly or use our instant quote calculator.
                        </p>
                    </motion.div>
                </div>
                <div className="absolute bottom-[-10%] right-[-5%] w-[400px] h-[400px] bg-primary/40 rounded-full blur-3xl z-0 pointer-events-none"></div>
            </section>

            {/* Contact Section */}
            <section className="py-20 bg-white relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 -mt-32">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

                        {/* Info Column */}
                        <motion.div
                            className="bg-white rounded-[2rem] p-10 shadow-2xl border border-sky-light/50 h-fit"
                            {...fadeUp}
                        >
                            <h3 className="text-3xl font-bold text-navy mb-10">Contact Information</h3>

                            <div className="space-y-10">
                                <div className="flex items-start">
                                    <div className="w-14 h-14 rounded-2xl bg-sky-pale flex items-center justify-center text-primary flex-shrink-0 mr-6 shadow-sm">
                                        <span className="material-icons text-3xl" translate="no">sms</span>
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-bold text-navy mb-1">SMS Our Office</h4>
                                        <a href="sms:+15616649611" className="text-xl text-charcoal/80 hover:text-primary transition-colors font-medium">+1 (561) 664-9611</a>
                                        <p className="text-base text-charcoal/60 mt-2 italic">Available Mon-Sat, 8am - 6pm</p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="w-14 h-14 rounded-2xl bg-sky-pale flex items-center justify-center text-primary flex-shrink-0 mr-6 shadow-sm">
                                        <span className="material-icons text-3xl" translate="no">email</span>
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-bold text-navy mb-1">Send an Email</h4>
                                        <a href="mailto:info@angelscleaningservices.com" className="text-xl text-charcoal/80 hover:text-primary transition-colors font-medium">info@angelscleaningservices.com</a>
                                        <p className="text-base text-charcoal/60 mt-2 italic">We respond within 24 hours</p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="w-14 h-14 rounded-2xl bg-sky-pale flex items-center justify-center text-primary flex-shrink-0 mr-6 shadow-sm">
                                        <span className="material-icons text-3xl" translate="no">location_on</span>
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-bold text-navy mb-1">Our Service Area</h4>
                                        <div className="flex flex-wrap gap-2 mt-3">
                                            {['Boca Raton', 'Delray Beach', 'Boynton Beach'].map((city) => (
                                                <span key={city} className="px-4 py-1.5 bg-sky-light/20 text-navy font-bold rounded-full text-sm border border-sky-light/30">
                                                    {city}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* CTA Column */}
                        <motion.div
                            className="bg-navy rounded-[2rem] p-10 md:p-14 shadow-2xl relative overflow-hidden flex flex-col justify-center items-center text-center"
                            {...fadeUp}
                            transition={{ delay: 0.2 }}
                        >
                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                <span className="material-icons text-9xl text-white" translate="no">calculate</span>
                            </div>
                            
                            <h2 className="text-3xl md:text-4xl font-black text-white mb-6 relative z-10">
                                Get a Quote in Less Than 60 Seconds
                            </h2>
                            <p className="text-xl text-sky-pale/80 mb-10 relative z-10 max-w-md">
                                Don't wait for a callback. Use our interactive calculator to see your estimated price instantly.
                            </p>

                            <Link
                                to="/quote"
                                className="inline-flex items-center justify-center px-10 py-5 bg-primary text-white font-black text-xl rounded-2xl shadow-2xl shadow-primary/40 hover:bg-white hover:text-primary hover:-translate-y-2 transition-all duration-300 relative z-10"
                            >
                                <span className="material-icons mr-3" translate="no">receipt_long</span>
                                GET MY INSTANT QUOTE
                            </Link>

                            <div className="mt-8 flex items-center text-sky-pale/60 text-sm font-bold tracking-widest uppercase">
                                <span className="w-8 h-[1px] bg-sky-pale/30 mr-3"></span>
                                Fast & Precise
                                <span className="w-8 h-[1px] bg-sky-pale/30 ml-3"></span>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Contact;
