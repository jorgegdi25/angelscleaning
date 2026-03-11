import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import logoUrl from '/logo-angels-c.png'; // Make sure this path corresponds to your actual logo



const QuoteCalculator = () => {
    const [form, setForm] = useState({
        serviceType: 'Standard cleaning', 
        frequency: 'One-time',           
        sqft: 0, // Initially unselected
        condition: 'Light cleaning',     
        windowsCount: 0,                 
        extras: [],                      
        customerName: '',
        customerEmail: '',
        customerPhone: '',
        customerAddress: '',
        city: 'Boca Raton',
        message: ''
    });

    const [hasInteracted, setHasInteracted] = useState(false);
    const [priceRange, setPriceRange] = useState({ min: 0, max: 0 });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);
    const [cityError, setCityError] = useState('');

    // Calculation Logic from Document
    useEffect(() => {
        // 1. Base Price by Sqft
        let basePrice = 120;
        if (form.sqft < 1000) basePrice = 120;
        else if (form.sqft <= 1500) basePrice = 150;
        else if (form.sqft <= 2000) basePrice = 180;
        else if (form.sqft <= 2500) basePrice = 210;
        else if (form.sqft <= 3000) basePrice = 240;
        else basePrice = 280;

        // 2. Cleaning Type Multiplier
        let serviceMultiplier = 1.0;
        if (form.serviceType === 'Deep cleaning') serviceMultiplier = 1.5;
        if (form.serviceType === 'Move in / Move out') serviceMultiplier = 1.8;
        if (form.serviceType === 'Post construction') serviceMultiplier = 2.2;

        // 3. Home Condition Adjustment
        let conditionMultiplier = 1.0;
        if (form.condition === 'Average condition') conditionMultiplier = 1.10;
        if (form.condition === 'Heavy buildup') conditionMultiplier = 1.25;

        // Core calculation
        let calculatedBase = basePrice * serviceMultiplier * conditionMultiplier;

        // 4. Extras
        const extrasPricing = {
            oven: 35, // Avg of $25-$45
            fridge: 32, // Avg of $25-$40
            cabinets: 40,
            baseboards: 45, // Avg of $30-$60
            patio: 50,
            wall: 80,
            bedSheet: 15
        };

        let extrasTotal = 0;
        form.extras.forEach(ext => {
            if (extrasPricing[ext]) extrasTotal += extrasPricing[ext];
        });

        // 5. Windows
        let windowsTotal = form.windowsCount * 10;

        // Total
        let totalPrice = calculatedBase + extrasTotal + windowsTotal;

        // Apply Frequency Discount
        if (form.frequency === 'Weekly') totalPrice *= 0.80;
        if (form.frequency === 'Bi-weekly') totalPrice *= 0.85;
        // Monthly or One-time = 1.0 (No discount)

        // 6. Range Calculation
        let minPrice = totalPrice * 0.90;
        let maxPrice = totalPrice * 1.10;

        // Never below $120
        if (minPrice < 120) {
            minPrice = 120;
            if (maxPrice < 140) maxPrice = 140; // Ensure logical range
        }

        setPriceRange({
            min: Math.round(minPrice),
            max: Math.round(maxPrice)
        });

        // Validate City Real-time
        if (form.city === 'Other') {
            setCityError('Thank you for your inquiry, but at the moment we only serve Boca Raton, Boynton Beach, and Delray Beach.');
        } else {
            setCityError('');
        }

    }, [form]);

    const handleInput = (e) => {
        setHasInteracted(true);
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox') {
            setForm(prev => ({
                ...prev,
                extras: checked
                    ? [...prev.extras, value]
                    : prev.extras.filter(ext => ext !== value)
            }));
        } else {
            setForm(prev => ({ 
                ...prev, 
                [name]: type === 'number' ? Number(value) : value 
            }));
        }
    };

    const generatePDFBase64 = async () => {
        const doc = new jsPDF();

        try {
            const img = new Image();
            img.src = logoUrl;
            doc.addImage(img, 'PNG', 14, 10, 40, 40);
        } catch (e) {
            console.log("Could not load logo for PDF", e);
        }

        doc.setFontSize(22);
        doc.setTextColor(0, 62, 124);
        doc.text('Cleaning Service Quote', 14, 60);

        doc.setFontSize(12);
        doc.setTextColor(51, 51, 51);
        doc.text(`Date: ${new Date().toLocaleDateString()}`, 14, 70);
        doc.text(`Client: ${form.customerName}`, 14, 78);
        doc.text(`Address: ${form.customerAddress}, City: ${form.city}`, 14, 86);
        doc.text(`Phone: ${form.customerPhone} | Email: ${form.customerEmail}`, 14, 94);

        autoTable(doc, {
            startY: 105,
            head: [['Description', 'Details']],
            body: [
                ['Service Type', form.serviceType],
                ['Frequency', form.frequency],
                ['Square Footage (SqFt)', `${form.sqft} sqft`],
                ['Home Condition', form.condition],
                ['Windows Count', `${form.windowsCount} (Int/Ext)`],
                ['Extra Services', form.extras.length > 0 ? form.extras.map(e => extrasList.find(x => x.id === e)?.label).join(', ') : 'None']
            ],
            theme: 'striped',
            headStyles: { fillColor: [0, 151, 219] },
        });

        const finalY = doc.lastAutoTable.finalY || 150;

        const minPriceDisplay = hasInteracted ? priceRange.min : '0';
        const maxPriceDisplay = hasInteracted ? priceRange.max : '0';
        
        doc.setFontSize(18);
        doc.setTextColor(0, 62, 124);
        doc.text(`Estimated Total: $${minPriceDisplay} - $${maxPriceDisplay} USD`, 14, finalY + 20);

        doc.setFontSize(10);
        doc.setTextColor(100, 100, 100);
        const disclaimer = "Instant estimates are based on average home conditions. Final price may vary depending on the actual condition of the property. \n\nWe will confirm availability after reviewing your request. Recurring Standard Cleaning prices apply based on the frequency you chose. If visits are skipped or frequency is reduced, the per-visit price will adjust accordingly.";

        const splitDisclaimer = doc.splitTextToSize(disclaimer, 180);
        doc.text(splitDisclaimer, 14, finalY + 35);

        // --- SECOND PAGE: INCLUSIONS --- //
        doc.addPage();
        
        doc.setFontSize(18);
        doc.setTextColor(0, 62, 124);
        doc.text('What is Included in Your Clean?', 14, 20);

        doc.setFontSize(10);
        doc.setTextColor(100, 100, 100);
        doc.text('The following standard items apply to your quoted service.', 14, 28);

        autoTable(doc, {
            startY: 35,
            head: [['Area', 'Included Tasks']],
            body: [
                ['General Areas & Bedrooms', '• Dusting visible surfaces\n• Wiping baseboards (light)\n• Cleaning mirrors\n• Vacuuming carpets/rugs\n• Sweeping & mopping hard floors\n• Ceiling fans (reachable)\n• Emptying trash bins'],
                ['Bathrooms', '• Toilet cleaning & disinfection\n• Shower & tub cleaning\n• Sink & faucet cleaning\n• Countertop wiping\n• Mirror cleaning\n• Floor cleaning\n• Trash removal'],
                ['Kitchen', '• Cleaning exterior of appliances (oven, fridge, dishwasher, microwave)\n• Cleaning stovetop surface\n• Wiping countertops\n• Cleaning sink and faucet\n• Wiping cabinet exteriors\n• Trash removal\n• Floor vacuum & mop']
            ],
            theme: 'grid',
            headStyles: { fillColor: [0, 151, 219] },
            styles: { cellPadding: 4, rowPageBreak: 'avoid' },
            columnStyles: {
                0: { cellWidth: 50, fontStyle: 'bold' },
                1: { cellWidth: 130 }
            }
        });

        autoTable(doc, {
            startY: doc.lastAutoTable.finalY + 15,
            head: [['Not Included (Unless requested as Extra)']],
            body: [
                ['• Inside oven deep cleaning\n• Inside refrigerator/cabinets\n• Removing post-construction debris\n• Wet wiping blinds or washing walls\n• Moving heavy furniture\n• Cleaning areas outside normal reach (requires high ladder)']
            ],
            theme: 'plain',
            headStyles: { fillColor: [220, 53, 69], textColor: 255 },
            styles: { cellPadding: 4 }
        });

        const base64String = doc.output('datauristring').split(',')[1];
        doc.save(`Quote_${form.customerName.replace(/\s+/g, '_')}.pdf`);
        return base64String;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (cityError) {
            alert('Cannot submit. Selected city is outside of our service area.');
            return;
        }

        setIsSubmitting(true);
        setSubmitStatus(null);

        try {
            const pdfBase64 = await generatePDFBase64();

            const response = await fetch('/api/procesar_email.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...form,
                    totalPrice: `${priceRange.min} - ${priceRange.max}`,
                    pdfAttachment: pdfBase64,
                    source: 'Quote Calculator'
                })
            });

            if (response.ok) {
                setSubmitStatus('success');
            } else {
                setSubmitStatus('error');
            }
        } catch (error) {
            console.error(error);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    const extrasList = [
        { id: 'oven', label: 'Inside Oven ($35)' },
        { id: 'fridge', label: 'Inside Refrigerator ($35)' },
        { id: 'cabinets', label: 'Inside Cabinets ($40)' },
        { id: 'baseboards', label: 'Deep Baseboards ($45)' },
        { id: 'patio', label: 'Patio/Balcony ($50)' },
        { id: 'wall', label: 'Wall Cleaning ($80)' },
        { id: 'bedSheet', label: 'Bed Sheet Change ($15)' },
    ];

    const inputClasses = "w-full bg-white border border-sky-pale rounded-xl px-4 py-3 text-navy focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all";

    return (
        <>
            <Helmet>
                <title>Instant Quote | Angels Cleaning Services</title>
                <meta name="description" content="Schedule your cleaning today and let our team make your home sparkle. Get an instant estimate now." />
            </Helmet>

            <section className="pt-32 pb-20 bg-gradient-to-br from-sky-pale to-white min-h-screen">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-12"
                    >
                        <h1 className="text-4xl md:text-5xl font-black text-navy mb-4">
                            Get Your <span className="text-primary">Instant Cleaning Estimate</span>
                        </h1>
                        <p className="text-xl text-charcoal/80 mb-2">
                            Answer a few quick questions to see the estimated cost of your cleaning service.
                        </p>
                        <p className="text-sm font-bold text-primary">(No obligation – we will confirm the final price on-site.)</p>
                    </motion.div>

                    {submitStatus === 'success' ? (
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="bg-white rounded-3xl p-10 shadow-2xl text-center border-t-8 border-primary"
                        >
                            <span className="material-symbols-outlined text-6xl text-primary mb-4">check_circle</span>
                            <h2 className="text-3xl font-bold text-navy mb-4">Quote Request Sent!</h2>
                            <p className="text-lg text-charcoal/80 mb-6">
                                We will confirm availability after reviewing your request. We've emailed a detailed PDF copy of your estimate to {form.customerEmail}.
                            </p>
                            <button onClick={() => window.location.reload()} className="bg-primary text-white font-bold py-3 px-8 rounded-full hover:bg-navy transition-colors">
                                Calculate Another Quote
                            </button>
                        </motion.div>
                    ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Form Column */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="lg:col-span-2 bg-white rounded-3xl p-8 shadow-xl"
                            >
                                <form onSubmit={handleSubmit} className="space-y-8">
                                    
                                    {/* CITY VALIDATOR */}
                                    <div className="bg-sky-pale/20 p-6 rounded-2xl border border-sky-light">
                                        <label className="block text-sm font-bold text-navy mb-2">Service Area City</label>
                                        <select 
                                            name="city" 
                                            value={form.city} 
                                            onChange={handleInput} 
                                            className={`${inputClasses} ${cityError ? 'border-red-500' : ''}`}
                                        >
                                            <option value="Boca Raton">Boca Raton</option>
                                            <option value="Boynton Beach">Boynton Beach</option>
                                            <option value="Delray Beach">Delray Beach</option>
                                            <option value="Other">Other City (Outside Service Area)</option>
                                        </select>
                                        {cityError && (
                                            <p className="text-red-600 font-bold mt-2 text-sm">{cityError}</p>
                                        )}
                                    </div>

                                    {/* Section 1: Service Details */}
                                    <div>
                                        <h3 className="text-xl font-bold text-navy mb-4 flex items-center">
                                            <span className="material-symbols-outlined text-primary mr-2">cleaning_services</span>
                                            1. Tell us about your home
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-bold text-charcoal mb-2">Type of Cleaning</label>
                                                <select name="serviceType" value={form.serviceType} onChange={handleInput} className={inputClasses}>
                                                    <option value="Standard cleaning">Standard cleaning</option>
                                                    <option value="Deep cleaning">Deep cleaning</option>
                                                    <option value="Move in / Move out">Move In / Move Out</option>
                                                    <option value="Post construction">Post construction</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-bold text-charcoal mb-2">How Often?</label>
                                                <select name="frequency" value={form.frequency} onChange={handleInput} className={inputClasses}>
                                                    <option value="One-time">Just Once</option>
                                                    <option value="Weekly">Weekly (Best Value)</option>
                                                    <option value="Bi-weekly">Bi-weekly</option>
                                                    <option value="Monthly">Monthly</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-bold text-charcoal mb-2">Current Condition</label>
                                                <select name="condition" value={form.condition} onChange={handleInput} className={inputClasses}>
                                                    <option value="Light cleaning">Light cleaning</option>
                                                    <option value="Average condition">Average condition (+10%)</option>
                                                    <option value="Heavy buildup">Heavy buildup (+25%)</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Section 2: Property Specs */}
                                    <div>
                                        <h3 className="text-xl font-bold text-navy mb-4 flex items-center">
                                            <span className="material-symbols-outlined text-primary mr-2">straighten</span>
                                            2. Home Size & Detail
                                        </h3>
                                        <div className="space-y-8">
                                            <div>
                                                <div className="flex justify-between mb-2">
                                                    <label className="text-sm font-bold text-charcoal">Approximate Size (SqFt)</label>
                                                    <span className="text-primary font-bold">{form.sqft > 0 ? `${form.sqft} sqft +` : 'Select size'}</span>
                                                </div>
                                                <input type="range" name="sqft" min="500" max="4000" step="100" value={form.sqft || 500} onChange={handleInput} className="w-full accent-primary" />
                                            </div>
                                            
                                            <div>
                                                <div className="flex justify-between mb-2">
                                                    <label className="text-sm font-bold text-charcoal">Number of Windows (Int/Ext)</label>
                                                    <span className="text-primary font-bold">{form.windowsCount}</span>
                                                </div>
                                                <input type="range" name="windowsCount" min="0" max="30" step="1" value={form.windowsCount} onChange={handleInput} className="w-full accent-primary" />
                                                <p className="text-xs text-charcoal/60 mt-1">$10 per large window (interior + exterior includes)</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Section 3: Extras */}
                                    <div>
                                        <h3 className="text-xl font-bold text-navy mb-4 flex items-center">
                                            <span className="material-symbols-outlined text-primary mr-2">add_circle</span>
                                            3. Extra Services (Optional)
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                            {extrasList.map(extra => (
                                                <label key={extra.id} className={`flex items-center p-3 rounded-lg border cursor-pointer transition-colors ${form.extras.includes(extra.id) ? 'border-primary bg-sky-pale/30' : 'border-sky-pale hover:border-primary/50'}`}>
                                                    <input
                                                        type="checkbox"
                                                        name="extras"
                                                        value={extra.id}
                                                        checked={form.extras.includes(extra.id)}
                                                        onChange={handleInput}
                                                        className="mr-3 accent-primary w-5 h-5 rounded"
                                                    />
                                                    <span className="text-sm font-medium text-navy">{extra.label}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Section 4: Contact Info */}
                                    <div>
                                        <h3 className="text-xl font-bold text-navy mb-4 flex items-center">
                                            <span className="material-symbols-outlined text-primary mr-2">person</span>
                                            4. Final Details
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <input type="text" name="customerName" placeholder="Full Name" required value={form.customerName} onChange={handleInput} className={inputClasses} />
                                            <input type="email" name="customerEmail" placeholder="Email Address" required value={form.customerEmail} onChange={handleInput} className={inputClasses} />
                                            <input type="tel" name="customerPhone" placeholder="Phone Number" required value={form.customerPhone} onChange={handleInput} className={`md:col-span-2 ${inputClasses}`} />
                                            <input type="text" name="customerAddress" placeholder="Full Address" required value={form.customerAddress} onChange={handleInput} className={`md:col-span-2 ${inputClasses}`} />
                                            <textarea name="message" placeholder="Tell us more about your cleaning needs..." rows="3" value={form.message} onChange={handleInput} className={`md:col-span-2 ${inputClasses} resize-none`}></textarea>
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting || !!cityError}
                                        className={`w-full text-white font-bold py-4 rounded-xl transition-colors shadow-lg flex justify-center items-center text-lg mt-8 ${cityError ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary hover:bg-navy shadow-primary/30'}`}
                                    >
                                        {isSubmitting ? (
                                            <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-white"></div>
                                        ) : (
                                            <>Get My Cleaning Quote <span className="material-symbols-outlined ml-2">mail</span></>
                                        )}
                                    </button>
                                </form>
                            </motion.div>

                            {/* Floating Summary Column */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="lg:col-span-1"
                            >
                                <div className="sticky top-32 bg-navy text-white rounded-3xl p-8 shadow-2xl overflow-hidden relative">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-bl-full blur-2xl"></div>

                                    <h3 className="text-2xl font-black mb-6 border-b border-white/10 pb-4 flex items-center">
                                        <span className="material-symbols-outlined mr-2">calculate</span>
                                        See your price
                                    </h3>

                                    <div className="space-y-4 mb-8">
                                        <div className="flex justify-between items-center text-sky-pale border-b border-white/10 pb-2">
                                            <span>Service:</span>
                                            <span className="font-bold text-white text-right">{form.serviceType}</span>
                                        </div>
                                        <div className="flex justify-between items-center text-sky-pale border-b border-white/10 pb-2">
                                            <span>Size:</span>
                                            <span className="font-bold text-white text-right">{form.sqft} sq ft</span>
                                        </div>
                                        <div className="flex justify-between items-center text-sky-pale border-b border-white/10 pb-2">
                                            <span>Condition:</span>
                                            <span className="font-bold text-white text-right">{form.condition}</span>
                                        </div>
                                        <div className="flex justify-between items-center text-sky-pale border-b border-white/10 pb-2">
                                            <span>Windows:</span>
                                            <span className="font-bold text-white text-right">{form.windowsCount}</span>
                                        </div>
                                        {form.extras.length > 0 && (
                                            <div className="flex justify-between items-start text-sky-pale border-b border-white/10 pb-2">
                                                <span>Extras:</span>
                                                <span className="font-bold text-white text-right">
                                                    {form.extras.length} selected
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="bg-white/10 rounded-2xl p-6 text-center backdrop-blur-sm border border-white/20">
                                        <p className="text-sky-pale text-sm uppercase tracking-wider font-bold mb-2">Estimated Range</p>
                                        <p className="text-4xl font-black text-white">
                                            {hasInteracted ? `$${priceRange.min} - $${priceRange.max}` : '$ --'}
                                        </p>
                                    </div>

                                    <div className="mt-8 bg-sky-pale/10 rounded-2xl p-6 border border-sky-pale">
                                        <h4 className="font-bold text-white mb-4 flex items-center">
                                            <span className="material-symbols-outlined mr-2 text-primary">check_circle</span>
                                            What's Included
                                        </h4>
                                        <ul className="space-y-3 text-sm text-sky-pale">
                                            <li><strong className="text-white">Living & Bedrooms:</strong> Dusting, vacuum/mop floors, empty trash, ceiling fans (reachable), wipe light baseboards.</li>
                                            <li><strong className="text-white">Kitchen:</strong> Clean counters, sink, stovetop, wipe exterior of appliances & cabinets, mop floors.</li>
                                            <li><strong className="text-white">Bathrooms:</strong> Disinfect toilet, tub, shower, sink, clean mirrors & floors.</li>
                                        </ul>

                                        <h4 className="font-bold text-red-400 mt-6 mb-3 flex items-center">
                                            <span className="material-symbols-outlined mr-2">cancel</span>
                                            Not Included
                                        </h4>
                                        <p className="text-xs text-sky-pale/80">
                                            Unless selected in "Extras": Inside oven, inside fridge/cabinets, post-construction debris, blind washing, moving heavy furniture, or high-ladder work.
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </div>
            </section>
        </>
    );
};

export default QuoteCalculator;
