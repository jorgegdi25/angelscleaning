import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";

const heroImages = [
  "/images/hero-bg.png",
  "/images/hero-2.png",
  "/images/hero-3.png"
];

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.6, ease: "easeOut" },
};

const Home = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Helmet>
        <title>Angels Cleaning Services | Professional Cleaning in South Florida</title>
        <meta
          name="description"
          content="Top-quality professional cleaning services in Delray Beach, Boca Raton, and throughout South Florida. Residential, commercial, and move-in/out cleaning."
        />
      </Helmet>
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-navy">
        {/* Background Imagery with Deep Overlay */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <AnimatePresence mode="popLayout">
            <motion.img
              key={currentImageIndex}
              src={heroImages[currentImageIndex]}
              alt="Immaculate living space"
              className="absolute inset-0 object-cover w-full h-full brightness-[0.6] contrast-[1.1]"
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
          </AnimatePresence>
          {/* Multi-layered gradient for depth and text legibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-navy/60 via-navy/20 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-navy/40 via-transparent to-navy/80"></div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 relative z-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-5xl md:text-6xl lg:text-8xl font-black tracking-tight text-white mb-8 leading-[0.95] drop-shadow-2xl">
              Sparkling Clean. <br />
              <span className="text-sky-400 italic font-serif">Professional Perfection.</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-2xl mx-auto font-medium leading-relaxed drop-shadow-lg">
              Reliable, professional, and committed to delivering spotless results for your home or business in South Florida.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
              <motion.div
                animate={{ 
                  scale: [1, 1.05, 1],
                  boxShadow: [
                    "0 20px 25px -5px rgba(0, 151, 219, 0.4)",
                    "0 25px 30px -5px rgba(0, 151, 219, 0.6)",
                    "0 20px 25px -5px rgba(0, 151, 219, 0.4)"
                  ]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
                className="w-full sm:w-auto"
              >
                <Link
                  className="w-full inline-flex justify-center items-center bg-primary text-white hover:bg-sky-500 px-12 py-5 rounded-full text-lg font-black transition-all shadow-2xl hover:-translate-y-1 hover:scale-105 active:scale-95"
                  to="/quote"
                >
                  Get a Free Quote
                  <span className="material-icons ml-2" translate="no">arrow_forward</span>
                </Link>
              </motion.div>
              <Link
                className="w-full sm:w-auto inline-flex justify-center items-center bg-white/10 backdrop-blur-xl text-white hover:bg-white/20 px-12 py-5 rounded-full text-lg font-bold border border-white/30 transition-all hover:-translate-y-1 active:scale-95"
                to="/services"
              >
                Our Services
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Subtle decorative elements for that "Angelic" feel */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 animate-bounce opacity-50">
          <span className="material-icons text-white text-3xl" translate="no">expand_more</span>
        </div>
      </section>

      <section className="py-24 bg-sky-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-16"
            {...fadeUp}
          >
            <h2 className="text-primary font-bold tracking-widest uppercase text-xs mb-3 border-b border-primary/20 inline-block pb-1">
              What We Offer
            </h2>
            <h3 className="text-3xl md:text-5xl font-bold text-navy mb-6">
              Comprehensive Cleaning Solutions
            </h3>
            <p className="text-charcoal/80 text-lg">
              Tailored services to meet your specific needs, ensuring a spotless
              environment every time.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              className="bg-white border border-white rounded-3xl p-8 transition-all hover:-translate-y-2 hover:shadow-2xl duration-300 relative group"
              {...fadeUp}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="w-16 h-16 bg-sky-pale rounded-2xl flex items-center justify-center text-primary mb-8 group-hover:bg-primary group-hover:text-white transition-all">
                <span className="material-icons text-3xl" translate="no">home</span>
              </div>
              <h4 className="text-2xl font-bold text-navy mb-4">
                Residential Cleaning
              </h4>
              <p className="text-charcoal/70 mb-8 leading-relaxed">
                Regular cleaning, deep cleaning, and move-in/move-out services
                for your home.
              </p>
              <Link
                className="text-primary font-bold hover:text-navy inline-flex items-center group/link transition-colors"
                to="/services"
              >
                Learn More{" "}
                <span className="material-icons ml-2 text-sm transition-transform group-hover/link:translate-x-1" translate="no">
                  arrow_forward
                </span>
              </Link>
            </motion.div>
            <motion.div
              className="bg-white border border-white rounded-3xl p-8 transition-all hover:-translate-y-2 hover:shadow-2xl duration-300 relative group"
              {...fadeUp}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="w-16 h-16 bg-sky-pale rounded-2xl flex items-center justify-center text-primary mb-8 group-hover:bg-primary group-hover:text-white transition-all">
                <span className="material-icons text-3xl" translate="no">apartment</span>
              </div>
              <h4 className="text-2xl font-bold text-navy mb-4">
                Commercial Cleaning
              </h4>
              <p className="text-charcoal/70 mb-8 leading-relaxed">
                Maintain a professional and hygienic workspace for your
                employees and clients.
              </p>
              <Link
                className="text-primary font-bold hover:text-navy inline-flex items-center group/link transition-colors"
                to="/services"
              >
                Learn More{" "}
                <span className="material-icons ml-2 text-sm transition-transform group-hover/link:translate-x-1" translate="no">
                  arrow_forward
                </span>
              </Link>
            </motion.div>
            <motion.div
              className="bg-white border border-white rounded-3xl p-8 transition-all hover:-translate-y-2 hover:shadow-2xl duration-300 relative group"
              {...fadeUp}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="w-16 h-16 bg-sky-pale rounded-2xl flex items-center justify-center text-primary mb-8 group-hover:bg-primary group-hover:text-white transition-all">
                <span className="material-icons text-3xl" translate="no">
                  cleaning_services
                </span>
              </div>
              <h4 className="text-2xl font-bold text-navy mb-4">
                Deep Cleaning
              </h4>
              <p className="text-charcoal/70 mb-8 leading-relaxed">
                Intensive top-to-bottom cleaning that hits every nook and
                cranny.
              </p>
              <Link
                className="text-primary font-bold hover:text-navy inline-flex items-center group/link transition-colors"
                to="/services"
              >
                Learn More{" "}
                <span className="material-icons ml-2 text-sm transition-transform group-hover/link:translate-x-1" translate="no">
                  arrow_forward
                </span>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-sky-pale relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-16"
            {...fadeUp}
          >
            <h2 className="text-primary font-bold tracking-widest uppercase text-xs mb-3 border-b border-primary/20 inline-block pb-1">
              Our Process
            </h2>
            <h3 className="text-3xl md:text-4xl font-bold text-navy mb-4">
              How it Works
            </h3>
            <p className="text-charcoal/70">
              Four simple steps to a pristine home or office.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-4 gap-8 relative">
            <motion.div
              className="text-center group relative z-10"
              {...fadeUp}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="relative mb-8 inline-block">
                <div className="w-24 h-24 bg-white rounded-3xl transition-all duration-300 flex items-center justify-center text-primary border border-sky-light shadow-lg">
                  <span className="material-symbols-outlined text-4xl transition-all" translate="no">
                    description
                  </span>
                </div>
                <span className="absolute -top-3 -right-3 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-black text-lg shadow-lg shadow-primary/40 ring-4 ring-sky-pale">
                  1
                </span>
              </div>
              <h4 className="text-xl font-bold mb-3 text-navy">
                Request a Quote
              </h4>
              <p className="text-charcoal/60 text-sm leading-relaxed">
                Fill out our simple form to get a personalized estimate.
              </p>
            </motion.div>
            <motion.div
              className="text-center group relative z-10"
              {...fadeUp}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="relative mb-8 inline-block">
                <div className="w-24 h-24 bg-white rounded-3xl transition-all duration-300 flex items-center justify-center text-primary border border-sky-light shadow-lg">
                  <span className="material-symbols-outlined text-4xl transition-all" translate="no">
                    fact_check
                  </span>
                </div>
                <span className="absolute -top-3 -right-3 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-black text-lg shadow-lg shadow-primary/40 ring-4 ring-sky-pale">
                  2
                </span>
              </div>
              <h4 className="text-xl font-bold mb-3 text-navy">
                Choose Your Service
              </h4>
              <p className="text-charcoal/60 text-sm leading-relaxed">
                Select the cleaning plan that best fits your needs and schedule.
              </p>
            </motion.div>
            <motion.div
              className="text-center group relative z-10"
              {...fadeUp}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="relative mb-8 inline-block">
                <div className="w-24 h-24 bg-white rounded-3xl transition-all duration-300 flex items-center justify-center text-primary border border-sky-light shadow-lg">
                  <span className="material-symbols-outlined text-4xl transition-all" translate="no">
                    cleaning_services
                  </span>
                </div>
                <span className="absolute -top-3 -right-3 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-black text-lg shadow-lg shadow-primary/40 ring-4 ring-sky-pale">
                  3
                </span>
              </div>
              <h4 className="text-xl font-bold mb-3 text-navy">We Clean</h4>
              <p className="text-charcoal/60 text-sm leading-relaxed">
                Our professional team arrives and transforms your space.
              </p>
            </motion.div>
            <motion.div
              className="text-center group relative z-10"
              {...fadeUp}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="relative mb-8 inline-block">
                <div className="w-24 h-24 bg-white rounded-3xl transition-all duration-300 flex items-center justify-center text-primary border border-sky-light shadow-lg">
                  <span className="material-symbols-outlined text-4xl transition-all" translate="no">
                    sentiment_very_satisfied
                  </span>
                </div>
                <span className="absolute -top-3 -right-3 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-black text-lg shadow-lg shadow-primary/40 ring-4 ring-sky-pale">
                  4
                </span>
              </div>
              <h4 className="text-xl font-bold mb-3 text-navy">
                Enjoy Your Home
              </h4>
              <p className="text-charcoal/60 text-sm leading-relaxed">
                Relax and enjoy your sparkling clean, immaculate home.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-sky-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:flex lg:items-center lg:gap-20">
            <motion.div className="lg:w-1/2 mb-16 lg:mb-0 relative" {...fadeUp}>
              <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white/80">
                <img
                  alt="Professional cleaner working"
                  loading="lazy"
                  className="object-cover w-full h-full brightness-110"
                  src="/images/cleaner-action.png"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent"></div>
              </div>
              <div className="absolute -bottom-10 -right-6 bg-white p-8 rounded-3xl shadow-2xl border border-sky-light hidden md:block backdrop-blur-md">
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 bg-primary text-white rounded-2xl flex items-center justify-center shadow-lg shadow-primary/30">
                    <span className="material-icons text-3xl" translate="no">verified</span>
                  </div>
                  <div>
                    <p className="text-3xl font-black text-navy">100%</p>
                    <p className="text-sm font-bold text-primary tracking-wide uppercase">
                      Satisfaction
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div
              className="lg:w-1/2"
              {...fadeUp}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-primary font-bold tracking-widest uppercase text-xs mb-3 border-b border-primary/20 inline-block pb-1">
                Why Choose Us
              </h2>
              <h3 className="text-3xl md:text-5xl font-bold text-navy mb-8 leading-tight">
                Trustworthy &amp; Reliable Cleaning Professionals
              </h3>
              <p className="text-charcoal/80 mb-10 text-lg leading-relaxed">
                We pride ourselves on delivering exceptional quality and
                unparalleled customer service. Our team is fully trained,
                insured, and dedicated to making your space shine.
              </p>
              <div className="space-y-10">
                <div className="flex gap-6 group">
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 bg-white text-primary rounded-2xl flex items-center justify-center border border-sky-pale shadow-md group-hover:scale-110 transition-transform">
                      <span className="material-icons text-3xl" translate="no">
                        verified_user
                      </span>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-navy mb-2">
                      Vetted Professionals
                    </h4>
                    <p className="text-charcoal/70">
                      All our cleaners undergo rigorous background checks and
                      comprehensive training.
                    </p>
                  </div>
                </div>
                <div className="flex gap-6 group">
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 bg-white text-primary rounded-2xl flex items-center justify-center border border-sky-pale shadow-md group-hover:scale-110 transition-transform">
                      <span className="material-icons text-3xl" translate="no">eco</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-navy mb-2">
                      Eco-Friendly Products
                    </h4>
                    <p className="text-charcoal/70">
                      We use environmentally friendly and safe cleaning products
                      upon request.
                    </p>
                  </div>
                </div>
                <div className="flex gap-6 group">
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 bg-white text-primary rounded-2xl flex items-center justify-center border border-sky-pale shadow-md group-hover:scale-110 transition-transform">
                      <span className="material-icons text-3xl" translate="no">schedule</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-navy mb-2">
                      Flexible Scheduling
                    </h4>
                    <p className="text-charcoal/70">
                      Book services at your convenience, whether it's a one-time
                      clean or recurring schedule.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-sky-pale">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-16"
            {...fadeUp}
          >
            <h2 className="text-primary font-bold tracking-widest uppercase text-xs mb-3 border-b border-primary/20 inline-block pb-1">
              Our Reach
            </h2>
            <h3 className="text-3xl md:text-4xl font-bold text-navy mb-4">
              Service Areas
            </h3>
            <p className="text-lg text-charcoal/80">
              Proudly serving the following coastal communities:
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <motion.div
              className="bg-white rounded-[2rem] overflow-hidden shadow-xl border border-white hover:border-primary transition-all group"
              {...fadeUp}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="h-64 overflow-hidden">
                <img
                  alt="Delray Beach Lifestyle"
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700 brightness-105"
                  src="/images/delray.png"
                />
              </div>
              <div className="p-8 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="material-symbols-outlined text-primary text-3xl" translate="no">
                    location_on
                  </span>
                  <h4 className="text-2xl font-black text-navy">
                    Delray Beach
                  </h4>
                </div>
                <span className="material-icons text-primary/30 group-hover:text-primary transition-colors" translate="no">
                  arrow_outward
                </span>
              </div>
            </motion.div>
            <motion.div
              className="bg-white rounded-[2rem] overflow-hidden shadow-xl border border-white hover:border-primary transition-all group"
              {...fadeUp}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="h-64 overflow-hidden">
                <img
                  alt="Boca Raton Lifestyle"
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700 brightness-105"
                  src="/images/boca.png"
                />
              </div>
              <div className="p-8 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="material-symbols-outlined text-primary text-3xl" translate="no">
                    location_on
                  </span>
                  <h4 className="text-2xl font-black text-navy">Boca Raton</h4>
                </div>
                <span className="material-icons text-primary/30 group-hover:text-primary transition-colors" translate="no">
                  arrow_outward
                </span>
              </div>
            </motion.div>
            <motion.div
              className="bg-white rounded-[2rem] overflow-hidden shadow-xl border border-white hover:border-primary transition-all group"
              {...fadeUp}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="h-64 overflow-hidden">
                <img
                  alt="Boynton Beach Lifestyle"
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700 brightness-105"
                  src="/images/boynton.png"
                />
              </div>
              <div className="p-8 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="material-symbols-outlined text-primary text-3xl" translate="no">
                    location_on
                  </span>
                  <h4 className="text-2xl font-black text-navy">
                    Boynton Beach
                  </h4>
                </div>
                <span className="material-icons text-primary/30 group-hover:text-primary transition-colors" translate="no">
                  arrow_outward
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-sky-light relative" id="testimonials">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-16"
            {...fadeUp}
          >
            <h2 className="text-primary font-bold tracking-widest uppercase text-xs mb-3 border-b border-primary/20 inline-block pb-1">
              Google Reviews
            </h2>
            <h3 className="text-3xl md:text-4xl font-bold text-navy mb-4">
              What Our Clients Say
            </h3>
            <p className="text-charcoal/80">
              Real feedback from our satisfied customers in South Florida.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <motion.div
              className="bg-white p-10 rounded-3xl border border-white shadow-xl relative flex flex-col"
              {...fadeUp}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <span className="material-icons text-primary/10 text-6xl absolute top-6 right-8" translate="no">
                format_quote
              </span>
              <div className="flex text-yellow-400 mb-6" translate="no">
                <span className="material-icons">star</span>
                <span className="material-icons">star</span>
                <span className="material-icons">star</span>
                <span className="material-icons">star</span>
                <span className="material-icons">star</span>
              </div>
              <p className="text-charcoal italic mb-10 leading-relaxed text-lg flex-grow">
                "My house hasn’t been this clean in months. She did a great job and recommend her to others who want a great job done."
              </p>
              <div className="flex items-center border-t border-sky-pale pt-6">
                <div>
                  <h5 className="font-bold text-navy text-lg">Harriet Sulsky</h5>
                  <p className="text-sm text-primary font-medium">Google Review</p>
                </div>
              </div>
            </motion.div>
            <motion.div
              className="bg-white p-10 rounded-3xl border border-white shadow-xl relative flex flex-col"
              {...fadeUp}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className="material-icons text-primary/10 text-6xl absolute top-6 right-8" translate="no">
                format_quote
              </span>
              <div className="flex text-yellow-400 mb-6" translate="no">
                <span className="material-icons">star</span>
                <span className="material-icons">star</span>
                <span className="material-icons">star</span>
                <span className="material-icons">star</span>
                <span className="material-icons">star</span>
              </div>
              <p className="text-charcoal italic mb-10 leading-relaxed text-lg flex-grow">
                "Hi Jaky, I was just about to give your name to my neighbor when your text came in. Her name is Harriet and I will be giving her your number. Thanks for doing a great job."
              </p>
              <div className="flex items-center border-t border-sky-pale pt-6">
                <div>
                  <h5 className="font-bold text-navy text-lg">Jon Garberg</h5>
                  <p className="text-sm text-primary font-medium">Google Review</p>
                </div>
              </div>
            </motion.div>
            <motion.div
              className="bg-white p-10 rounded-3xl border border-white shadow-xl relative flex flex-col"
              {...fadeUp}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <span className="material-icons text-primary/10 text-6xl absolute top-6 right-8" translate="no">
                format_quote
              </span>
              <div className="flex text-yellow-400 mb-6" translate="no">
                <span className="material-icons">star</span>
                <span className="material-icons">star</span>
                <span className="material-icons">star</span>
                <span className="material-icons">star</span>
                <span className="material-icons">star</span>
              </div>
              <p className="text-charcoal italic mb-10 leading-relaxed text-lg flex-grow">
                "Meticulous to the very last detail. Why choose any other cleaning service!!"
              </p>
              <div className="flex items-center border-t border-sky-pale pt-6">
                <div>
                  <h5 className="font-bold text-navy text-lg">MrPetrello</h5>
                  <p className="text-sm text-primary font-medium">Google Review</p>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div className="text-center" {...fadeUp} transition={{ delay: 0.4 }}>
            <a 
              href="https://www.google.com/maps/place/Angels+Cleaning+Services/@26.4465375,-80.1103049,10z/data=!4m6!3m5!1s0x2624025a13485b29:0xb7d2d80220ea3de8!8m2!3d26.4465376!4d-80.110305!16s%2Fg%2F11xdd87clx?utm_campaign=ml-ardi-ahc_2025&g_ep=Eg1tbF8yMDI2MDMwNF8wIOC7DCoASAJQAQ%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-white text-navy font-bold px-8 py-4 rounded-2xl shadow-lg border border-sky-light hover:bg-sky-pale transition-all hover:-translate-y-1"
            >
              <img src="/images/google-logo.png" alt="Google" className="w-6 h-6 mr-3" />
              VIEW ALL REVIEWS ON GOOGLE MAPS
            </a>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-sky-pale">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-16" {...fadeUp}>
            <h2 className="text-primary font-bold tracking-widest uppercase text-xs mb-3 border-b border-primary/20 inline-block pb-1">
              Frequently Asked Questions
            </h2>
            <h3 className="text-3xl md:text-4xl font-bold text-navy mb-4">
              Everything you need to know
            </h3>
            <p className="text-charcoal/80">
              We answer your questions about our professional cleaning services.
            </p>
          </motion.div>
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-white overflow-hidden transition-all hover:border-primary/50 shadow-md">
              <details className="group p-8">
                <summary className="flex justify-between items-center font-bold cursor-pointer list-none text-xl text-navy">
                  What does a deep cleaning include?
                  <span className="bg-sky-pale text-primary p-2 rounded-full transition-transform duration-300 group-open:rotate-180">
                    <span className="material-symbols-outlined" translate="no">
                      expand_more
                    </span>
                  </span>
                </summary>
                <p className="text-charcoal/80 mt-6 leading-relaxed border-t border-sky-pale pt-6 text-lg">
                  A thorough cleaning of all surfaces, including details not
                  touched in regular cleanings, such as appliance interiors,
                  window frames, and baseboards.
                </p>
              </details>
            </div>
            <div className="bg-white rounded-2xl border border-white overflow-hidden transition-all hover:border-primary/50 shadow-md">
              <details className="group p-8">
                <summary className="flex justify-between items-center font-bold cursor-pointer list-none text-xl text-navy">
                  How can I book my service?
                  <span className="bg-sky-pale text-primary p-2 rounded-full transition-transform duration-300 group-open:rotate-180">
                    <span className="material-symbols-outlined" translate="no">
                      expand_more
                    </span>
                  </span>
                </summary>
                <p className="text-charcoal/80 mt-6 leading-relaxed border-t border-sky-pale pt-6 text-lg">
                  You can request a free quote through our online form, by
                  emailing us, or by calling us directly.
                </p>
              </details>
            </div>
            <div className="bg-white rounded-2xl border border-white overflow-hidden transition-all hover:border-primary/50 shadow-md">
              <details className="group p-8">
                <summary className="flex justify-between items-center font-bold cursor-pointer list-none text-xl text-navy">
                  Do I need to be home during the cleaning?
                  <span className="bg-sky-pale text-primary p-2 rounded-full transition-transform duration-300 group-open:rotate-180">
                    <span className="material-symbols-outlined" translate="no">
                      expand_more
                    </span>
                  </span>
                </summary>
                <p className="text-charcoal/80 mt-6 leading-relaxed border-t border-sky-pale pt-6 text-lg">
                  It is not necessary. Many of our clients provide us with
                  secure access and enjoy the convenience of returning to a
                  spotless home at the end of the day.
                </p>
              </details>
            </div>
            <div className="bg-white rounded-2xl border border-white overflow-hidden transition-all hover:border-primary/50 shadow-md">
              <details className="group p-8">
                <summary className="flex justify-between items-center font-bold cursor-pointer list-none text-xl text-navy">
                  What cleaning products do you use?
                  <span className="bg-sky-pale text-primary p-2 rounded-full transition-transform duration-300 group-open:rotate-180">
                    <span className="material-symbols-outlined" translate="no">
                      expand_more
                    </span>
                  </span>
                </summary>
                <p className="text-charcoal/80 mt-6 leading-relaxed border-t border-sky-pale pt-6 text-lg">
                  We use high-quality eco-friendly products that are
                  environmentally friendly and completely safe for your family
                  and pets.
                </p>
              </details>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-primary py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.h2
            className="text-4xl md:text-6xl font-black text-white mb-6"
            {...fadeUp}
          >
            Ready for a Cleaner Space?
          </motion.h2>
          <motion.p
            className="text-white/95 text-xl md:text-2xl mb-12 max-w-3xl mx-auto"
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Get a free, no-obligation quote today and let our experts transform
            your space.
          </motion.p>
          <motion.div {...fadeUp} transition={{ duration: 0.6, delay: 0.2 }}>
            <Link
              className="inline-flex justify-center items-center bg-white text-primary hover:bg-sky-pale px-14 py-6 rounded-full text-xl font-black transition-all shadow-2xl hover:-translate-y-2"
              to="/contact"
            >
              Get Your Free Quote
            </Link>
          </motion.div>
        </div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/20 rounded-full blur-[120px] -mr-64 -mt-64"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-white/20 rounded-full blur-[120px] -ml-64 -mb-64"></div>
      </section>
    </>
  );
};

export default Home;
