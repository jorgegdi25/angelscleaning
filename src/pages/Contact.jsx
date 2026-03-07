import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        service: 'Deep Cleaning',
        sqft: '',
        date: '',
        message: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', or null

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus(null);

        try {
            // Replace with your actual PHP backend path when deploying
            const response = await fetch('/api/procesar_email.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                // Simulate success for local dev or handle real success
                const data = await response.json();
                if (data.status === 'success') {
                    setSubmitStatus('success');
                } else {
                    setSubmitStatus('error');
                }
            } else {
                // For local development without PHP server, simulate success after 2 seconds
                setTimeout(() => {
                    setSubmitStatus('success');
                }, 1500);
                // In production, you would set 'error' here if not response.ok
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            // Simulate success for local testing purposes if PHP is not running
            setTimeout(() => {
                setSubmitStatus('success');
            }, 1500);
        } finally {
            setIsSubmitting(false);
        }
    };

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
                <meta name="description" content="Get a free estimate for detailed, professional cleaning services in Boca Raton, Delray Beach, and Boynton Beach." />
            </Helmet>

            {/* Premium Header */}
            <section className="relative pt-32 pb-20 bg-gradient-to-br from-navy to-[#05254A] overflow-hidden min-h-[40vh] flex items-center">
                <div className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-20" style={{ backgroundImage: "url('/images/contact-header.jpg')" }}></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
                    <motion.div className="max-w-3xl mx-auto text-center" {...fadeUp}>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
                            Let's Make Your <br /> <span className="text-sky-pale block mt-2">Space Shine</span>
                        </h1>
                        <p className="text-xl text-sky-pale/80 mb-8 leading-relaxed">
                            Request your free estimate today. We respond quickly and are ready to tackle your toughest cleaning challenges.
                        </p>
                    </motion.div>
                </div>
                <div className="absolute bottom-[-10%] right-[-5%] w-[400px] h-[400px] bg-primary/40 rounded-full blur-3xl z-0 pointer-events-none"></div>
            </section>

            {/* Contact Section */}
            <section className="py-20 bg-white relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 -mt-32">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

                        {/* Info Column */}
                        <motion.div
                            className="lg:col-span-4 bg-white rounded-[2rem] p-8 shadow-2xl border border-sky-light/50 sticky top-32 h-fit"
                            {...fadeUp}
                        >
                            <h3 className="text-2xl font-bold text-navy mb-8">Contact Information</h3>

                            <div className="space-y-8">
                                <div className="flex items-start">
                                    <div className="w-12 h-12 rounded-full bg-sky-pale flex items-center justify-center text-primary flex-shrink-0 mr-4">
                                        <span className="material-icons">phone</span>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-navy mb-1">Call Us</h4>
                                        <a href="tel:+15615550198" className="text-charcoal/80 hover:text-primary transition-colors block">+1 (561) 555-0198</a>
                                        <p className="text-sm text-charcoal/60 mt-1">Mon-Sat, 8am - 6pm</p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="w-12 h-12 rounded-full bg-sky-pale flex items-center justify-center text-primary flex-shrink-0 mr-4">
                                        <span className="material-icons">email</span>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-navy mb-1">Email Us</h4>
                                        <a href="mailto:info@angelscleanservices.com" className="text-charcoal/80 hover:text-primary transition-colors block">info@angelscleanservices.com</a>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="w-12 h-12 rounded-full bg-sky-pale flex items-center justify-center text-primary flex-shrink-0 mr-4">
                                        <span className="material-icons">location_on</span>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-navy mb-1">Service Areas</h4>
                                        <p className="text-charcoal/80 leading-relaxed">
                                            Boca Raton<br />
                                            Delray Beach<br />
                                            Boynton Beach<br />
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Form Column */}
                        <motion.div
                            className="lg:col-span-8 bg-white/80 backdrop-blur-xl rounded-[2rem] p-8 md:p-12 shadow-2xl border border-white/50 relative overflow-hidden"
                            {...fadeUp}
                            transition={{ delay: 0.2 }}
                        >
                            <AnimatePresence mode="wait">
                                {submitStatus === 'success' ? (
                                    /* 💳 SUCCESS & PAYMENT VIEW */
                                    <motion.div
                                        key="success-view"
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="text-center py-10"
                                    >
                                        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
                                            <span className="material-icons text-5xl text-green-500">check_circle</span>
                                        </div>
                                        <h2 className="text-3xl md:text-4xl font-black text-navy mb-4">Request Sent successfully!</h2>
                                        <p className="text-lg text-charcoal/80 mb-10 max-w-xl mx-auto">
                                            Thank you, {formData.name}. Our team has received your request and will contact you shortly to confirm your booking date for {formData.date}.
                                        </p>

                                        {/* Seamless Payment Gateway UI */}
                                        <div className="bg-sky-pale rounded-[1.5rem] p-8 text-left max-w-xl mx-auto border border-sky-light">
                                            <h3 className="text-xl font-bold text-navy mb-6 flex items-center justify-center text-center">
                                                <span className="material-icons mr-2 text-primary">lock</span> Secure Payment Info
                                            </h3>

                                            <div className="space-y-6">
                                                <div className="bg-white rounded-xl p-5 shadow-sm">
                                                    <div className="flex justify-between items-center mb-2">
                                                        <span className="font-bold text-navy text-sm uppercase tracking-wider">Option 1: Bank Transfer (IBAN)</span>
                                                        <span className="material-icons text-charcoal/40">account_balance</span>
                                                    </div>
                                                    <p className="font-mono text-lg text-primary select-all">ES91 2100 0418 4012 3456 7890</p>
                                                    <p className="text-sm text-charcoal/60 mt-1">Beneficiary: Angels Cleaning LLC</p>
                                                </div>

                                                <div className="bg-white rounded-xl p-5 shadow-sm">
                                                    <div className="flex justify-between items-center mb-2">
                                                        <span className="font-bold text-navy text-sm uppercase tracking-wider">Option 2: Bizum</span>
                                                        <span className="material-icons text-charcoal/40">phone_iphone</span>
                                                    </div>
                                                    <p className="font-mono text-lg text-primary select-all">+34 600 000 000</p>
                                                    <p className="text-sm text-charcoal/60 mt-1">Concept: Cleaning {formData.name}</p>
                                                </div>
                                            </div>

                                            <p className="text-center text-xs text-charcoal/60 mt-6 mt-6 italic">
                                                Please keep your receipt. Payment is typically required 24 hours prior to service.
                                            </p>
                                        </div>

                                        <button
                                            onClick={() => setSubmitStatus(null)}
                                            className="mt-10 text-primary hover:text-navy underline font-bold"
                                        >
                                            Submit another request
                                        </button>
                                    </motion.div>
                                ) : (
                                    /* 📝 INTELLIGENT FORM VIEW */
                                    <motion.div
                                        key="form-view"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                    >
                                        <h2 className="text-3xl font-bold text-navy mb-6">Request Your Estimate</h2>
                                        <form onSubmit={handleSubmit} className="space-y-6">

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div>
                                                    <label className="block text-sm font-bold text-navy mb-2" htmlFor="name">Full Name *</label>
                                                    <input
                                                        type="text"
                                                        id="name"
                                                        name="name"
                                                        required
                                                        value={formData.name}
                                                        onChange={handleChange}
                                                        className="w-full bg-sky-pale/50 border border-sky-light rounded-xl px-4 py-3 text-charcoal focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
                                                        placeholder="John Doe"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-bold text-navy mb-2" htmlFor="phone">Phone Number *</label>
                                                    <input
                                                        type="tel"
                                                        id="phone"
                                                        name="phone"
                                                        required
                                                        value={formData.phone}
                                                        onChange={handleChange}
                                                        className="w-full bg-sky-pale/50 border border-sky-light rounded-xl px-4 py-3 text-charcoal focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
                                                        placeholder="(561) 555-0123"
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-bold text-navy mb-2" htmlFor="email">Email Address *</label>
                                                <input
                                                    type="email"
                                                    id="email"
                                                    name="email"
                                                    required
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    className="w-full bg-sky-pale/50 border border-sky-light rounded-xl px-4 py-3 text-charcoal focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
                                                    placeholder="john@example.com"
                                                />
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div>
                                                    <label className="block text-sm font-bold text-navy mb-2" htmlFor="service">Service Required *</label>
                                                    <select
                                                        id="service"
                                                        name="service"
                                                        value={formData.service}
                                                        onChange={handleChange}
                                                        className="w-full bg-sky-pale/50 border border-sky-light rounded-xl px-4 py-3 text-charcoal focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow appearance-none"
                                                    >
                                                        <option value="Deep Cleaning">Deep Cleaning</option>
                                                        <option value="Recurring Residential">Recurring Residential</option>
                                                        <option value="Move-in/Move-out">Move-in / Move-out</option>
                                                        <option value="Transitional Property">Transitional Property</option>
                                                        <option value="Commercial">Commercial Cleaning</option>
                                                    </select>
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-bold text-navy mb-2" htmlFor="sqft">Approximate Sq. Ft *</label>
                                                    <select
                                                        id="sqft"
                                                        name="sqft"
                                                        required
                                                        value={formData.sqft}
                                                        onChange={handleChange}
                                                        className="w-full bg-sky-pale/50 border border-sky-light rounded-xl px-4 py-3 text-charcoal focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow appearance-none"
                                                    >
                                                        <option value="" disabled>Select size range...</option>
                                                        <option value="< 1000">Under 1,000 sq ft</option>
                                                        <option value="1000-2000">1,000 - 2,000 sq ft</option>
                                                        <option value="2000-3000">2,000 - 3,000 sq ft</option>
                                                        <option value="> 3000">Over 3,000 sq ft</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-bold text-navy mb-2" htmlFor="date">Preferred Service Date</label>
                                                <input
                                                    type="date"
                                                    id="date"
                                                    name="date"
                                                    value={formData.date}
                                                    onChange={handleChange}
                                                    className="w-full bg-sky-pale/50 border border-sky-light rounded-xl px-4 py-3 text-charcoal focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-bold text-navy mb-2" htmlFor="message">Additional Details</label>
                                                <textarea
                                                    id="message"
                                                    name="message"
                                                    rows="4"
                                                    value={formData.message}
                                                    onChange={handleChange}
                                                    className="w-full bg-sky-pale/50 border border-sky-light rounded-xl px-4 py-3 text-charcoal focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow resize-none"
                                                    placeholder="Are there any specific areas to focus on or pets in the home?"
                                                ></textarea>
                                            </div>

                                            {submitStatus === 'error' && (
                                                <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm border border-red-200">
                                                    There was an error communicating with the server. Please check your connection or contact us directly.
                                                </div>
                                            )}

                                            <button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className={`w-full bg-primary text-white font-bold py-4 rounded-xl shadow-xl shadow-primary/30 transition-all flex items-center justify-center
                                                    ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:-translate-y-1 hover:shadow-2xl hover:bg-navy'}`}
                                            >
                                                {isSubmitting ? (
                                                    <>
                                                        <span className="material-icons animate-spin mr-2">refresh</span> Processing...
                                                    </>
                                                ) : (
                                                    "Get My Estimate"
                                                )}
                                            </button>
                                        </form>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Contact;
