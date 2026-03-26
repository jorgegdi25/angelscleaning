import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';

const PrivacyPolicy = () => {
  const fadeUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  return (
    <>
      <Helmet>
        <title>Privacy Policy | Angels Cleaning Services</title>
        <meta name="description" content="Angels Cleaning Services Privacy Policy. Learn how we collect, use, and protect your personal data in accordance with Florida laws (FIPA)." />
      </Helmet>

      <section className="bg-navy py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-4xl md:text-5xl font-black text-white"
          >
            Privacy <span className="text-primary italic font-serif">Policy</span>
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.3 }}
            className="h-1 w-24 bg-primary mt-4 origin-left"
          ></motion.div>
        </div>
      </section>

      <section className="py-20 bg-sky-light">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-white"
            {...fadeUp}
          >
            <div className="prose prose-lg prose-navy max-w-none text-charcoal">
              <p className="font-medium text-lg leading-relaxed mb-8">
                At Angels Cleaning Services, we value your privacy and are committed to protecting your personal data. This Privacy Policy describes how we collect, use, protect, and share your information in accordance with applicable laws and regulations in Florida.
              </p>

              <div className="space-y-10">
                <section>
                  <h2 className="text-2xl font-bold text-navy flex items-center mb-4">
                    <span className="w-8 h-8 rounded-lg bg-sky-pale text-primary flex items-center justify-center text-sm mr-3">1</span>
                    Information We Collect
                  </h2>
                  <p>We collect personal information when you visit our website, use our services, or contact us through our contact form. The information we may collect includes:</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Full name</li>
                    <li>Email address</li>
                    <li>Phone number</li>
                    <li>Service address</li>
                    <li>Information related to the cleaning services you request</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-navy flex items-center mb-4">
                    <span className="w-8 h-8 rounded-lg bg-sky-pale text-primary flex items-center justify-center text-sm mr-3">2</span>
                    How We Use Your Information
                  </h2>
                  <p>The information we collect is used for the following purposes:</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>To provide our cleaning services and customer support.</li>
                    <li>To contact you in response to your inquiries or service requests.</li>
                    <li>To improve our services and personalize your experience.</li>
                    <li>To comply with local privacy and data protection laws and regulations.</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-navy flex items-center mb-4">
                    <span className="w-8 h-8 rounded-lg bg-sky-pale text-primary flex items-center justify-center text-sm mr-3">3</span>
                    How We Protect Your Information
                  </h2>
                  <p>We take reasonable measures to protect your personal information from unauthorized access, alteration, or disclosure. We use standard security technologies, such as encryption and firewalls, to safeguard the data we collect.</p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-navy flex items-center mb-4">
                    <span className="w-8 h-8 rounded-lg bg-sky-pale text-primary flex items-center justify-center text-sm mr-3">4</span>
                    Sharing Your Information
                  </h2>
                  <p>We do not sell, rent, or share your personal information with third parties for commercial purposes. However, we may share your information with third-party service providers who assist us in operating our business, such as payment services or marketing tools, ensuring that they respect the privacy and security of your data.</p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-navy flex items-center mb-4">
                    <span className="w-8 h-8 rounded-lg bg-sky-pale text-primary flex items-center justify-center text-sm mr-3">5</span>
                    Your Rights
                  </h2>
                  <p>You have the right to access, correct, or delete your personal information at any time. If you wish to update or remove your data, you can contact us through the information provided on our website.</p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-navy flex items-center mb-4">
                    <span className="w-8 h-8 rounded-lg bg-sky-pale text-primary flex items-center justify-center text-sm mr-3">6</span>
                    Cookies and Similar Technologies
                  </h2>
                  <p>We use cookies and similar technologies to enhance your experience on our website. Cookies are small files stored on your device to analyze web traffic and personalize the content you see. You can configure your browser to reject cookies, but please note that this may affect your experience on our site.</p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-navy flex items-center mb-4">
                    <span className="w-8 h-8 rounded-lg bg-sky-pale text-primary flex items-center justify-center text-sm mr-3">7</span>
                    Compliance with Florida’s Information Protection Act (FIPA)
                  </h2>
                  <p>We comply with Florida’s data protection laws, including the Florida Information Protection Act (FIPA), which governs the handling of personal data of Florida residents. We adhere to security and breach notification requirements set forth by the law.</p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-navy flex items-center mb-4">
                    <span className="w-8 h-8 rounded-lg bg-sky-pale text-primary flex items-center justify-center text-sm mr-3">8</span>
                    Changes to the Privacy Policy
                  </h2>
                  <p>We reserve the right to update or modify this Privacy Policy at any time. Any changes will be posted on this page, and the date of the last update will be indicated at the end of this policy.</p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-navy flex items-center mb-4">
                    <span className="w-8 h-8 rounded-lg bg-sky-pale text-primary flex items-center justify-center text-sm mr-3">9</span>
                    Contact Us
                  </h2>
                  <div className="bg-sky-light rounded-2xl p-6 border border-sky-pale">
                    <p className="font-bold text-navy mb-2">Angels Cleaning Services</p>
                    <p>Email: <a href="mailto:angelscleaningservices28@gmail.com" className="text-primary hover:underline font-semibold">angelscleaningservices28@gmail.com</a></p>
                  </div>
                </section>
              </div>

              <div className="mt-12 pt-8 border-t border-sky-pale text-sm text-charcoal/60 text-right italic">
                Last updated: 2026
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default PrivacyPolicy;
