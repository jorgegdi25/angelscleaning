import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import logoUrl from '/logo-angels-c.png';
import pdfLogoUrl from '/logo-angels-pdf.png';

const serviceDetails = {
    'Standard Cleaning': {
        included: [
            { area: 'Living Areas', tasks: '• Dusting accessible surfaces\n• Cleaning tables and furniture surfaces\n• Cleaning mirrors\n• Light dusting of ceiling fans\n• Vacuuming carpets and rugs\n• Sweeping and mopping floors\n• Emptying trash bins' },
            { area: 'Kitchen', tasks: '• Cleaning and sanitizing countertops\n• Cleaning sink and faucet\n• Cleaning exterior of appliances\n• Cleaning exterior of cabinets\n• Cleaning stovetop surface\n• Cleaning backsplash\n• Sweeping and mopping floors\n• Taking out trash' },
            { area: 'Bathrooms', tasks: '• Cleaning and sanitizing sink and countertops\n• Cleaning mirrors\n• Cleaning toilet (inside and outside)\n• Light cleaning of shower or bathtub\n• Cleaning shower glass doors\n• Sweeping and mopping floors\n• Emptying trash bins' },
            { area: 'Bedrooms', tasks: '• Dusting furniture surfaces\n• Cleaning nightstands\n• Vacuuming carpets and rugs\n• Sweeping and mopping floors\n• Emptying trash bins' }
        ],
        notIncluded: [
            { id: 'bedSheet', text: '• Changing bed linens' },
            { id: 'fridge', text: '• Cleaning inside refrigerator' },
            { id: 'oven', text: '• Cleaning inside oven' },
            { id: 'cabinets', text: '• Cleaning inside cabinets or closets' },
            { id: 'dishwasher', text: '• Cleaning inside dishwasher' },
            { id: 'baseboards', text: '• Deep cleaning baseboards' },
            { id: 'windows', text: '• Window cleaning or window tracks' },
            { id: 'blinds', text: '• Cleaning blinds' },
            { id: 'ceilingFans', text: '• Deep cleaning ceiling fans' },
            { id: 'airVents', text: '• Cleaning air vents' },
            { id: 'heavyFurniture', text: '• Moving heavy furniture' },
            { id: 'wall', text: '• Wall washing' },
            { id: 'postConst', text: '• Post-construction cleaning' },
            { id: 'mold', text: '• Mold removal or severe stain removal' },
            { id: 'laundry', text: '• Laundry or dishwashing' },
            { id: 'patio', text: '• Exterior area cleaning' }
        ]
    },
    'Deep Cleaning': {
        included: [
            { area: 'Living Areas', tasks: '• Dusting accessible surfaces\n• Cleaning tables & mirrors\n• Vacuuming/mopping floors\n• Detailed cleaning of baseboards\n• Cleaning door frames\n• Cleaning window frames\n• Cleaning blinds\n• Detailed cleaning of ceiling fans' },
            { area: 'Kitchen', tasks: '• Detailed exterior cabinet cleaning\n• Cleaning top of cabinets\n• Deep cleaning of stovetop & burners\n• Cleaning inside microwave\n• Removal of grease buildup\n• Detailed cleaning of cabinet handles' },
            { area: 'Bathrooms', tasks: '• Removal of soap scum\n• Deep cleaning of tiles & grout\n• Removal of hard water stains\n• Detailed cleaning of shower glass doors\n• Cleaning behind toilet\n• Cleaning sinks, countertops, & faucets' },
            { area: 'Bedrooms', tasks: '• Detailed cleaning of baseboards\n• Cleaning blinds\n• Cleaning door & window frames\n• Vacuuming/mopping floors' }
        ],
        notIncluded: [
            { id: 'dishwashing', text: '• Dishwashing' },
            { id: 'bedSheet', text: '• Bed making' },
            { id: 'fridge', text: '• Cleaning inside refrigerator' },
            { id: 'oven', text: '• Cleaning inside oven' },
            { id: 'cabinets', text: '• Cleaning inside cabinets or closets' },
            { id: 'wall', text: '• Wall washing' },
            { id: 'windows', text: '• Exterior window cleaning' },
            { id: 'carpet', text: '• Carpet shampooing or machine carpet cleaning' },
            { id: 'upholstery', text: '• Upholstery cleaning' },
            { id: 'biohazard', text: '• Severe mold removal / Biohazard cleaning' },
            { id: 'garage', text: '• Garage cleaning' },
            { id: 'patio', text: '• Exterior area cleaning' },
            { id: 'postConst', text: '• Heavy post-construction cleaning' }
        ]
    },
    'Move Out/ Move in Cleaning': {
        included: [
            { area: 'Common Areas & Bedrooms', tasks: '• Deep cleaning of closets and cabinets inside\n• Cleaning interior of drawers and shelves\n• Detailed cleaning of doors and frames\n• Cleaning interior of windows\n• Cleaning blinds\n• Deep cleaning baseboards & ceiling fans' },
            { area: 'Kitchen', tasks: '• Cleaning inside cabinets and drawers\n• Cleaning inside refrigerator\n• Cleaning inside oven & microwave\n• Detailed cleaning of stovetop and burners\n• Deep cleaning of backsplash\n• Removal of grease buildup' },
            { area: 'Bathrooms', tasks: '• Deep cleaning of tiles and grout\n• Removal of soap scum/hard water stains\n• Deep cleaning of shower glass doors\n• Cleaning behind and around the toilet\n• Cleaning sinks, countertops, & faucets\n• Cleaning bathroom accessories' },
            { area: 'Floors & General', tasks: '• Sweeping, vacuuming, and mopping all floors\n• Emptying trash bins' }
        ],
        notIncluded: [
            { id: 'furniture', text: '• Collection of furniture or belongings' },
            { id: 'wall', text: '• Cleaning exterior walls or painting' },
            { id: 'windows', text: '• Exterior window cleaning' },
            { id: 'patio', text: '• Cleaning outdoor areas (yard/patio)' },
            { id: 'garage', text: '• Garage cleaning' },
            { id: 'biohazard', text: '• Severe mold or biohazard cleaning' }
        ]
    },
    'Commercial Cleaning - Standard': {
        included: [
            { area: 'Common Areas', tasks: '• Dusting desks, tables, accessible furniture\n• Cleaning interior mirrors and glass surfaces\n• Disinfecting light switches and door handles\n• Light dusting of ceiling fans\n• Sweeping, vacuuming, & mopping floors\n• Emptying trash bins' },
            { area: 'Reception', tasks: '• Cleaning furniture and surfaces\n• Cleaning counters and reception desks\n• Cleaning coffee tables' },
            { area: 'Offices', tasks: '• Cleaning desks and worktables\n• Dusting furniture tops\n• Vacuuming carpets & rugs\n• Sweeping and mopping floors' },
            { area: 'Bathrooms/Kitchen', tasks: '• Disinfecting sinks, countertops, & toilets\n• Sweeping and mopping floors\n• Restocking soap and paper towels (if applicable)\n• Emptying trash' }
        ],
        notIncluded: [
            { id: 'cabinets', text: '• Cleaning inside cabinets or files' },
            { id: 'carpet', text: '• Deep carpet or upholstery cleaning' },
            { id: 'windows', text: '• Exterior window cleaning' },
            { id: 'patio', text: '• Outdoor area cleaning (patios, parking lots)' },
            { id: 'heavyFurniture', text: '• Moving heavy furniture' },
            { id: 'dishwashing', text: '• Washing dishes or personal utensils' },
            { id: 'biohazard', text: '• Severe mold or biohazard cleaning' }
        ]
    },
    'Post construction': {
        included: [
            { area: 'General Areas', tasks: '• Removal of construction dust from all surfaces\n• Window cleaning (interior)\n• Vacuuming carpets/rugs\n• Sweeping & mopping hard floors\n• Wiping baseboards & door frames' },
            { area: 'Kitchen & Bathrooms', tasks: '• Disinfecting sinks, tubs, and toilets\n• Cleaning exterior of cabinets and appliances\n• Removing light paint splatters or tape residue (if safe)' }
        ],
        notIncluded: [
            { id: 'debris', text: '• Heavy debris removal (wood, bricks, etc.)' },
            { id: 'exterior', text: '• Exterior pressure washing' },
            { id: 'windows', text: '• Exterior window cleaning (unless ground floor)' },
            { id: 'paint', text: '• Extensive paint removal from floors or glass' }
        ]
    }
};

const extrasList = [
    { id: 'oven', label: 'Inside Oven ($35)' },
    { id: 'fridge', label: 'Inside Refrigerator (Empty) ($32)' },
    { id: 'cabinets', label: 'Inside Cabinets (Empty) ($40)' },
    { id: 'baseboards', label: 'Deep Baseboards ($45)' },
    { id: 'windows', label: 'Windows (Int/Ext) ($10 ea.)', isCounter: true },
    { id: 'patio', label: 'Patio/Balcony ($50)' },
    { id: 'wall', label: 'Wall Washing ($80)' },
    { id: 'bedSheet', label: 'Bed Sheet Change ($15)' },
];

const QuoteCalculator = () => {
    const [form, setForm] = useState({
        serviceType: 'Standard Cleaning', 
        frequency: 'One-time',           
        serviceDate: '',
        hasPets: false,
        sqft: 0, 
        bedrooms: 1,
        fullBathrooms: 1,
        halfBathrooms: 0,
        windowsCount: 0,                 
        extras: [],                      
        customerName: '',
        customerEmail: '',
        customerPhone: '',
        customerAddress: '',
        city: '',
        message: '',
        referenceImages: [],
        acceptTerms: false,
        acceptQualityPolicy: false,
        intent: 'quote',
        isUrgent: false,
        hasHadDeepClean: 'unsure' // 'yes', 'no', 'unsure'
    });

    const [hasInteracted, setHasInteracted] = useState(false);
    const [estimatedPrice, setEstimatedPrice] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);
    const [cityError, setCityError] = useState('');
    const [showModal, setShowModal] = useState(false);
    
    // Multi-step form state
    const [step, setStep] = useState(1);
    const totalSteps = 4;

    const nextStep = () => {
        if (step === 1) {
            if (cityError || !form.city) return;
            if (form.serviceType === 'Standard Cleaning' && form.hasHadDeepClean !== 'yes') return;
        }
        setStep(prev => Math.min(prev + 1, totalSteps));
        
        if (window.innerWidth < 1024) {
            window.scrollTo({ top: 120, behavior: 'smooth' });
        }
    };

    const prevStep = () => {
        setStep(prev => Math.max(prev - 1, 1));
        
        if (window.innerWidth < 1024) {
            window.scrollTo({ top: 120, behavior: 'smooth' });
        }
    };

    // Calculation Logic
    useEffect(() => {
        let basePrice = 120;
        if (form.sqft < 1000) basePrice = 120;
        else if (form.sqft <= 1500) basePrice = 150;
        else if (form.sqft <= 2000) basePrice = 180;
        else if (form.sqft <= 2500) basePrice = 210;
        else if (form.sqft <= 3000) basePrice = 240;
        else basePrice = 280;

        let serviceMultiplier = 1.0;
        if (form.serviceType === 'Deep Cleaning' || form.serviceType === 'Commercial Cleaning - Standard') serviceMultiplier = 1.5;
        if (form.serviceType === 'Move Out/ Move in Cleaning') serviceMultiplier = 1.8;
        if (form.serviceType === 'Post construction') serviceMultiplier = 2.2;

        let conditionMultiplier = 1.0;
        // Pets adjustment +10%
        if (form.hasPets) {
            conditionMultiplier += 0.10; 
        }

        let calculatedBase = basePrice * serviceMultiplier * conditionMultiplier;

        const extrasPricing = {
            oven: 35, 
            fridge: 32, 
            cabinets: 40,
            baseboards: 45, 
            patio: 50,
            wall: 80,
            bedSheet: 15
        };

        let extrasTotal = 0;
        form.extras.forEach(ext => {
            if (extrasPricing[ext]) extrasTotal += extrasPricing[ext];
        });

        // Windows
        let windowsTotal = form.windowsCount * 10;
        let extraBedroomsPrice = Math.max(0, form.bedrooms - 4) * 20;
        let totalBathUnits = form.fullBathrooms + (form.halfBathrooms * 0.5);
        let extraBathPrice = Math.max(0, totalBathUnits - 4) * 20;

        // Urgency Fee
        let urgencyFee = form.isUrgent ? 50 : 0;

        let totalPrice = calculatedBase + extrasTotal + windowsTotal + extraBedroomsPrice + extraBathPrice + urgencyFee;

        if (form.frequency === 'Weekly') totalPrice *= 0.80;
        if (form.frequency === 'Bi-weekly') totalPrice *= 0.85;

        if (totalPrice < 120) {
            totalPrice = 120;
        }

        setEstimatedPrice(Math.round(totalPrice));

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
            if (name === 'extras') {
                setForm(prev => ({
                    ...prev,
                    extras: checked
                        ? [...prev.extras, value]
                        : prev.extras.filter(ext => ext !== value)
                }));
            } else {
                setForm(prev => ({ ...prev, [name]: checked }));
            }
        } else {
            setForm(prev => ({ 
                ...prev, 
                [name]: type === 'number' ? Number(value) : value 
            }));
        }
    };

    const handleWindowChange = (increment) => {
        setHasInteracted(true);
        setForm(prev => ({
            ...prev,
            windowsCount: Math.max(0, prev.windowsCount + increment)
        }));
    };

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        if (files.length + form.referenceImages.length > 2) {
            alert('You can only upload up to 2 images.');
            return;
        }
        
        files.forEach(file => {
            if(file.size > 5 * 1024 * 1024) {
               alert('File too large. Max 5MB per image.');
               return;
            }
            const reader = new FileReader();
            reader.onloadend = () => {
                setForm(prev => ({
                    ...prev,
                    referenceImages: [...prev.referenceImages, reader.result]
                }));
            };
            reader.readAsDataURL(file);
        });
    };

    const removeImage = (index) => {
        setForm(prev => ({
            ...prev,
            referenceImages: prev.referenceImages.filter((_, i) => i !== index)
        }));
    };

    const generatePDFBase64 = async () => {
        const doc = new jsPDF();
        
        try {
            // Use the non-transparent version of the logo for PDF
            const img = new Image();
            img.src = pdfLogoUrl;
            
            await new Promise((resolve) => {
                img.onload = resolve;
                img.onerror = resolve;
            });
            
            if (img.complete && img.naturalWidth > 0) {
                const pdfWidth = 40;
                const aspectRatio = img.naturalHeight / img.naturalWidth;
                const pdfHeight = pdfWidth * aspectRatio;
                doc.addImage(img, 'PNG', 14, 10, pdfWidth, pdfHeight);
            }
        } catch (e) {
            console.error("Could not load logo for PDF", e);
        }

        doc.setFontSize(22);
        doc.setTextColor(0, 62, 124);
        doc.text('Cleaning Service Quote', 14, 60);

        doc.setFontSize(12);
        doc.setTextColor(51, 51, 51);
        doc.text(`Date: ${new Date().toLocaleDateString()}`, 14, 70);
        doc.text(`Client: ${form.customerName}`, 14, 78);
        doc.text(`Preferred Date: ${form.intent === 'quote' ? 'Just getting a quote for now' : (form.serviceDate || 'Not specified')}`, 14, 86);
        doc.text(`Phone: ${form.customerPhone} | Email: ${form.customerEmail}`, 14, 94);

        autoTable(doc, {
            startY: 105,
            head: [['Description', 'Details']],
            body: [
                ['Service Type', form.serviceType],
                ['Frequency', form.frequency],
                ['Intent', form.intent === 'quote' ? 'Just saving quote' : 'Ready to schedule'],
                ['Preferred Date', form.intent === 'quote' ? 'Not applicable' : (form.serviceDate || 'Not specified')],
                ['Property Size', `${form.sqft} sqft | ${form.bedrooms} Beds`],
                ['Bathrooms', `${form.fullBathrooms} Full | ${form.halfBathrooms} Half`],
                ['Condition', form.hasPets ? 'Pets Home' : 'Standard'],
                ['Urgency Fee', form.isUrgent ? '$50 (Requested)' : 'No'],
                ['Windows Count', `${form.windowsCount} (Int/Ext)`],
                ['Extra Services', form.extras.length > 0 ? form.extras.map(e => extrasList.find(x => x.id === e)?.label.split(' ($')[0]).join(', ') : 'None']
            ],
            theme: 'striped',
            headStyles: { fillColor: [0, 151, 219] },
        });

        const finalY = doc.lastAutoTable.finalY || 150;
        const priceDisplay = hasInteracted ? estimatedPrice : '0';
        
        doc.setFontSize(18);
        doc.setTextColor(0, 62, 124);
        doc.text(`Estimated Total: ~$${priceDisplay} USD`, 14, finalY + 20);

        doc.setFontSize(10);
        doc.setTextColor(100, 100, 100);
        const disclaimer = "Instant estimates are based on average home conditions. Final price may vary depending on the actual condition of the property. The details of the service remain the same, but the quoted cost is an estimate. \n\nWe will confirm availability after reviewing your request. Recurring cleaning prices apply based on the chosen frequency.";

        const splitDisclaimer = doc.splitTextToSize(disclaimer, 180);
        doc.text(splitDisclaimer, 14, finalY + 35);

        // --- SECOND PAGE: INCLUSIONS --- //
        doc.addPage();
        
        doc.setFontSize(18);
        doc.setTextColor(0, 62, 124);
        doc.text('What is Included in Your Clean?', 14, 20);

        doc.setFontSize(10);
        doc.setTextColor(100, 100, 100);
        doc.text(`The following tasks apply to your selected service (${form.serviceType}):`, 14, 28);

        const serviceTypeData = serviceDetails[form.serviceType] || serviceDetails['Standard Cleaning'];
        
        // Remove Extras from Not Included
        let finalNotIncluded = serviceTypeData.notIncluded.filter(item => {
            if (item.id === 'windows' && form.windowsCount > 0) return false;
            if (form.extras.includes(item.id)) return false;
            return true;
        });

        // Add requested extras as Included
        let requestedExtras = [];
        form.extras.forEach(extraId => {
            const extraInfo = extrasList.find(e => e.id === extraId);
            if(extraInfo) requestedExtras.push(`• ${extraInfo.label.split(' ($')[0]}`);
        });
        if (form.windowsCount > 0) {
            requestedExtras.push(`• Interior/Exterior Windows (${form.windowsCount})`);
        }

        autoTable(doc, {
            startY: 35,
            head: [['Area', 'Included Tasks']],
            body: [
                ...serviceTypeData.included.map(inc => [inc.area, inc.tasks]),
                ...(requestedExtras.length > 0 ? [['Added Extras', requestedExtras.join('\n')]] : [])
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
                [finalNotIncluded.map(n => n.text).join('\n')]
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
        
        if (step !== totalSteps) {
            nextStep();
            return;
        }
        
        if (cityError || !form.acceptTerms || !form.acceptQualityPolicy || (form.intent === 'schedule' && !form.serviceDate)) {
            if (cityError) alert('Cannot submit. Selected city is outside of our service area.');
            else if (!form.acceptTerms) alert('Please accept the estimate terms to proceed.');
            else if (!form.acceptQualityPolicy) alert('Please accept our Quality Policy to proceed.');
            else alert('Please select a desired service date to schedule.');
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
                    totalPrice: `~$${estimatedPrice}`,
                    pdfAttachment: pdfBase64,
                    source: 'Quote Calculator'
                })
            });

            if (response.ok) {
                setSubmitStatus('success');
                window.scrollTo({ top: 0, behavior: 'smooth' });
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

    const resetForm = () => {
        setForm({
            serviceType: 'Standard Cleaning', 
            frequency: 'One-time',           
            serviceDate: '',
            hasPets: false,
            sqft: 0, 
            bedrooms: 1,
            fullBathrooms: 1,
            halfBathrooms: 0,
            windowsCount: 0,                 
            extras: [],                      
            customerName: '',
            customerEmail: '',
            customerPhone: '',
            customerAddress: '',
            city: '',
            message: '',
            referenceImages: [],
            acceptTerms: false,
            acceptQualityPolicy: false,
            isUrgent: false,
            hasHadDeepClean: 'unsure'
        });
        setStep(1);
        setSubmitStatus(null);
        setHasInteracted(false);
    };

    const inputClasses = "w-full bg-white border border-sky-pale rounded-xl px-4 py-3 text-navy focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all";

    return (
        <>
            <Helmet>
                <title>Instant Quote | Angels Cleaning Services</title>
                <meta name="description" content="Schedule your cleaning today and let our team make your home sparkle. Get an instant estimate now." />
            </Helmet>

            <section className="pt-32 pb-32 lg:pb-20 bg-gradient-to-br from-sky-pale to-white min-h-[90vh]">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-8"
                    >
                        <h1 className="text-4xl md:text-5xl font-black text-navy mb-4">
                            Your <span className="text-primary">Instant Cleaning Quote</span>
                        </h1>
                        <p className="text-lg text-charcoal/80 mb-2">
                            Answer a few quick questions to customize your perfect cleaning service.
                        </p>
                    </motion.div>

                    {/* Trust Badges */}
                    <div className="flex justify-center items-center space-x-4 md:space-x-8 mb-10 text-primary font-bold text-xs sm:text-sm bg-white/50 py-3 rounded-full mx-auto max-w-fit px-6 shadow-sm border border-sky-light">
                        <div className="flex items-center"><span className="material-symbols-outlined text-lg mr-1.5" translate="no">verified_user</span> Insured</div>
                        <div className="flex items-center"><span className="material-symbols-outlined text-lg mr-1.5" translate="no">star</span> Professional</div>
                        <div className="flex items-center"><span className="material-symbols-outlined text-lg mr-1.5" translate="no">thumb_up</span> 100% Guaranteed</div>
                    </div>

                    {submitStatus === 'success' ? (
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="bg-white rounded-3xl p-10 shadow-2xl text-center border-t-8 border-primary md:mx-auto max-w-2xl"
                        >
                            <span className="material-symbols-outlined text-6xl text-primary mb-4" translate="no">check_circle</span>
                            <h2 className="text-3xl font-bold text-navy mb-4">Quote Request Sent!</h2>
                            <p className="text-lg text-charcoal/80 mb-6">
                                We've emailed a detailed PDF copy of your estimate to {form.customerEmail}. Our team will contact you shortly to confirm the details.
                            </p>
                            <button onClick={resetForm} className="bg-primary text-white font-bold py-3 px-8 rounded-full hover:bg-navy transition-colors">
                                Calculate Another Quote
                            </button>
                        </motion.div>
                    ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-10">
                            {/* Form Column */}
                            <div className="lg:col-span-2">
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl relative"
                                >
                                    {/* Progress indicator */}
                                    <div className="mb-10">
                                        <div className="flex justify-between items-center mb-3">
                                            <span className="text-sm font-black text-navy uppercase tracking-wider">Step {step} of {totalSteps}</span>
                                            <span className="text-sm font-bold text-primary">{Math.round((step / totalSteps) * 100)}%</span>
                                        </div>
                                        <div className="w-full bg-sky-pale rounded-full h-3 overflow-hidden">
                                            <div 
                                                className="bg-primary h-full rounded-full transition-all duration-500 ease-out" 
                                                style={{ width: `${(step / totalSteps) * 100}%` }}
                                            ></div>
                                        </div>
                                    </div>

                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        
                                        <AnimatePresence mode="wait">
                                            {/* STEP 1: Details */}
                                            {step === 1 && (
                                                <motion.div 
                                                    key="step1"
                                                    initial={{ opacity: 0, x: 20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    exit={{ opacity: 0, x: -20 }}
                                                    transition={{ duration: 0.3 }}
                                                    className="space-y-8"
                                                >
                                                    <div className="bg-sky-pale/20 p-6 rounded-2xl border border-sky-light">
                                                        <label className="block text-sm font-bold text-navy mb-2">Service Area City</label>
                                                        <select name="city" value={form.city} onChange={handleInput} className={`${inputClasses} ${cityError ? 'border-red-500' : ''}`}>
                                                            <option value="" disabled>Select City</option>
                                                            <option value="Boca Raton">Boca Raton</option>
                                                            <option value="Boynton Beach">Boynton Beach</option>
                                                            <option value="Delray Beach">Delray Beach</option>
                                                            <option value="Other">Other City (Outside Area)</option>
                                                        </select>
                                                        {cityError && <p className="text-red-500 font-bold mt-2 text-sm">{cityError}</p>}
                                                    </div>

                                                    <div>
                                                        <h3 className="text-xl font-bold text-navy mb-4 flex items-center">
                                                            <span className="material-symbols-outlined text-primary mr-2" translate="no">cleaning_services</span>
                                                            1. Tell us about your home & service
                                                        </h3>
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                                            <div className="md:col-span-2">
                                                                <div className="flex justify-between items-center mb-2">
                                                                    <label className="block text-sm font-bold text-charcoal">Type of Cleaning</label>
                                                                    <button type="button" onClick={() => setShowModal(true)} className="text-[#0097DB] text-sm font-bold flex items-center hover:underline bg-sky-pale/20 px-3 py-1 rounded-full border border-[#0097DB]/20">
                                                                        <span className="material-symbols-outlined text-[16px] mr-1" translate="no">info</span>
                                                                        View Details
                                                                    </button>
                                                                </div>
                                                                <select name="serviceType" value={form.serviceType} onChange={handleInput} className={inputClasses}>
                                                                    <option value="Standard Cleaning">Standard Cleaning (Maintenance)</option>
                                                                    <option value="Deep Cleaning">Deep Cleaning (Recommended for first time)</option>
                                                                    <option value="Move Out/ Move in Cleaning">Move Out/ Move in Cleaning</option>
                                                                    <option value="Commercial Cleaning - Standard">Commercial Cleaning - Standard</option>
                                                                    <option value="Post construction">Post construction</option>
                                                                </select>
                                                                
                                                                <AnimatePresence>
                                                                    {form.serviceType === 'Standard Cleaning' && (
                                                                        <motion.div 
                                                                            initial={{ height: 0, opacity: 0 }}
                                                                            animate={{ height: 'auto', opacity: 1 }}
                                                                            exit={{ height: 0, opacity: 0 }}
                                                                            className="mt-4 space-y-4 overflow-hidden"
                                                                        >
                                                                            <div className="bg-primary/5 border border-primary/20 rounded-xl p-5 shadow-sm">
                                                                                <p className="text-sm font-bold text-navy mb-4">Have you had a Deep Cleaning with us in the last 30 days?</p>
                                                                                <div className="flex gap-4">
                                                                                    <button 
                                                                                        type="button" 
                                                                                        onClick={() => setForm(prev => ({ ...prev, hasHadDeepClean: 'yes' }))}
                                                                                        className={`flex-1 py-3 px-4 rounded-xl font-bold text-sm transition-all border-2 ${form.hasHadDeepClean === 'yes' ? 'bg-primary border-primary text-white' : 'bg-white border-sky-pale text-navy hover:border-primary/50'}`}
                                                                                    >
                                                                                        Yes, I have
                                                                                    </button>
                                                                                    <button 
                                                                                        type="button" 
                                                                                        onClick={() => setForm(prev => ({ ...prev, hasHadDeepClean: 'no' }))}
                                                                                        className={`flex-1 py-3 px-4 rounded-xl font-bold text-sm transition-all border-2 ${form.hasHadDeepClean === 'no' ? 'bg-primary border-primary text-white' : 'bg-white border-sky-pale text-navy hover:border-primary/50'}`}
                                                                                    >
                                                                                        No, first time
                                                                                    </button>
                                                                                </div>
                                                                            </div>

                                                                            {form.hasHadDeepClean === 'no' && (
                                                                                <motion.div 
                                                                                    initial={{ opacity: 0, scale: 0.95 }}
                                                                                    animate={{ opacity: 1, scale: 1 }}
                                                                                    className="bg-amber-50 border-2 border-amber-200 rounded-xl p-5 flex items-start space-x-3 shadow-md"
                                                                                >
                                                                                    <span className="material-symbols-outlined text-amber-500 text-[24px] mt-0.5" translate="no">warning</span>
                                                                                    <div className="flex-1">
                                                                                        <p className="text-sm text-amber-900 font-bold mb-3 leading-relaxed">
                                                                                            To ensure our quality standards, an initial <span className="underline italic">Deep Cleaning</span> is required for first-time customers or homes not professionally cleaned recently.
                                                                                        </p>
                                                                                        <button 
                                                                                            type="button"
                                                                                            onClick={() => setForm(prev => ({ ...prev, serviceType: 'Deep Cleaning', hasHadDeepClean: 'unsure' }))}
                                                                                            className="bg-amber-500 hover:bg-amber-600 text-white text-xs font-black uppercase tracking-wider py-2.5 px-5 rounded-lg transition-all shadow-sm flex items-center"
                                                                                        >
                                                                                            Switch to Deep Cleaning <span className="material-symbols-outlined ml-2 text-sm" translate="no">auto_awesome</span>
                                                                                        </button>
                                                                                    </div>
                                                                                </motion.div>
                                                                            )}

                                                                            {form.hasHadDeepClean === 'yes' && (
                                                                                <motion.div 
                                                                                    initial={{ opacity: 0 }}
                                                                                    animate={{ opacity: 1 }}
                                                                                    className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center space-x-3"
                                                                                >
                                                                                    <span className="material-symbols-outlined text-green-500 text-[20px]" translate="no">check_circle</span>
                                                                                    <p className="text-xs text-green-800 font-medium">Great! Standard Cleaning is perfect for maintaining your home's sparkle.</p>
                                                                                </motion.div>
                                                                            )}
                                                                        </motion.div>
                                                                    )}
                                                                </AnimatePresence>
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
                                                            <div className="flex items-center space-x-3 pt-6">
                                                                <input type="checkbox" id="hasPets" name="hasPets" checked={form.hasPets} onChange={handleInput} className="w-6 h-6 accent-primary rounded cursor-pointer" />
                                                                <label htmlFor="hasPets" className="text-base font-bold text-navy cursor-pointer">Do you have pets?</label>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <button 
                                                        type="button" 
                                                        onClick={nextStep} 
                                                        disabled={!!cityError || !form.city || (form.serviceType === 'Standard Cleaning' && form.hasHadDeepClean !== 'yes')} 
                                                        className={`w-full text-white font-bold py-4 rounded-xl transition-all shadow-lg flex justify-center items-center text-lg mt-8 border-none outline-none ${!!cityError || !form.city || (form.serviceType === 'Standard Cleaning' && form.hasHadDeepClean !== 'yes') ? 'bg-gray-400 cursor-not-allowed opacity-50' : 'bg-[#0097DB] hover:bg-navy shadow-[#0097DB]/30 hover:-translate-y-1'}`}
                                                    >
                                                        Next Step <span className="material-symbols-outlined ml-2" translate="no">arrow_forward</span>
                                                    </button>
                                                </motion.div>
                                            )}
                                            
                                            {/* STEP 2: Specs */}
                                            {step === 2 && (
                                                <motion.div 
                                                    key="step2"
                                                    initial={{ opacity: 0, x: 20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    exit={{ opacity: 0, x: -20 }}
                                                    transition={{ duration: 0.3 }}
                                                    className="space-y-8"
                                                >
                                                    <div>
                                                        <h3 className="text-xl font-bold text-navy mb-4 flex items-center">
                                                            <span className="material-symbols-outlined text-primary mr-2" translate="no">straighten</span>
                                                            2. Home Details
                                                        </h3>
                                                        <div className="space-y-10">
                                                            <div>
                                                                <div className="flex justify-between mb-4">
                                                                    <label className="text-sm font-bold text-charcoal">Approximate Size (SqFt)</label>
                                                                    <span className="text-primary font-black text-lg bg-sky-pale px-3 py-1 rounded-lg">{form.sqft > 0 ? `${form.sqft} sqft +` : 'Select'}</span>
                                                                </div>
                                                                <input type="range" name="sqft" min="500" max="4000" step="100" value={form.sqft || 500} onChange={handleInput} className="w-full accent-primary h-2 bg-sky-light/50 rounded-lg appearance-none cursor-pointer border-none" />
                                                            </div>
                                                            
                                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                                <div>
                                                                    <label className="block text-sm font-bold text-charcoal mb-2">Bedrooms</label>
                                                                    <div className="flex bg-white border border-sky-pale rounded-xl overflow-hidden">
                                                                        <button type="button" onClick={() => setForm(p=>({...p, bedrooms: Math.max(1, p.bedrooms-1)}))} className="w-12 h-12 bg-sky-pale text-primary font-bold text-xl hover:bg-primary hover:text-white transition-colors">-</button>
                                                                        <div className="flex-1 flex items-center justify-center font-bold text-navy text-lg">{form.bedrooms}</div>
                                                                        <button type="button" onClick={() => setForm(p=>({...p, bedrooms: p.bedrooms+1}))} className="w-12 h-12 bg-sky-pale text-primary font-bold text-xl hover:bg-primary hover:text-white transition-colors">+</button>
                                                                    </div>
                                                                    <p className="text-[10px] text-charcoal/60 mt-1">4 included, +$20 per extra</p>
                                                                </div>
                                                                <div className="md:col-span-1">
                                                                    <label className="block text-sm font-bold text-charcoal mb-2">Full Bathrooms <span className="text-charcoal/50 font-normal">(with shower/tub)</span></label>
                                                                    <div className="flex bg-white border border-sky-pale rounded-xl overflow-hidden">
                                                                        <button type="button" onClick={() => setForm(p=>({...p, fullBathrooms: Math.max(0, p.fullBathrooms-1)}))} className="w-12 h-12 bg-sky-pale text-primary font-bold text-xl hover:bg-primary hover:text-white transition-colors">-</button>
                                                                        <div className="flex-1 flex items-center justify-center font-bold text-navy text-lg">{form.fullBathrooms}</div>
                                                                        <button type="button" onClick={() => setForm(p=>({...p, fullBathrooms: p.fullBathrooms+1}))} className="w-12 h-12 bg-sky-pale text-primary font-bold text-xl hover:bg-primary hover:text-white transition-colors">+</button>
                                                                    </div>
                                                                    <p className="text-[10px] text-charcoal/60 mt-1">Full = 1.0 Unit ($20 extra)</p>
                                                                </div>
                                                                <div>
                                                                    <label className="block text-sm font-bold text-charcoal mb-2">Half Bathrooms <span className="text-charcoal/50 font-normal">(without shower/tub)</span></label>
                                                                    <div className="flex bg-white border border-sky-pale rounded-xl overflow-hidden">
                                                                        <button type="button" onClick={() => setForm(p=>({...p, halfBathrooms: Math.max(0, p.halfBathrooms-1)}))} className="w-12 h-12 bg-sky-pale text-primary font-bold text-xl hover:bg-primary hover:text-white transition-colors">-</button>
                                                                        <div className="flex-1 flex items-center justify-center font-bold text-navy text-lg">{form.halfBathrooms}</div>
                                                                        <button type="button" onClick={() => setForm(p=>({...p, halfBathrooms: p.halfBathrooms+1}))} className="w-12 h-12 bg-sky-pale text-primary font-bold text-xl hover:bg-primary hover:text-white transition-colors">+</button>
                                                                    </div>
                                                                    <p className="text-[10px] text-charcoal/60 mt-1">Half = 0.5 Unit ($10 extra)</p>
                                                                </div>
                                                                <div className="md:col-span-2">
                                                                    <p className="text-xs text-primary font-bold">Note: 4 units included. Units = Full + (Half * 0.5)</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="flex gap-4 pt-4">
                                                        <button type="button" onClick={prevStep} className="w-1/3 text-primary font-bold py-4 rounded-xl border-2 border-primary/20 hover:border-primary hover:bg-sky-pale transition-all flex justify-center items-center group">
                                                            <span className="material-symbols-outlined mr-2 group-hover:-translate-x-1 transition-transform" translate="no">arrow_back</span> Back
                                                        </button>
                                                        <button type="button" onClick={nextStep} className="w-2/3 text-white font-bold py-4 rounded-xl bg-primary hover:bg-navy transition-all shadow-lg hover:shadow-primary/30 shadow-primary/20 flex justify-center items-center hover:-translate-y-1">
                                                            Next Step <span className="material-symbols-outlined ml-2" translate="no">arrow_forward</span>
                                                        </button>
                                                    </div>
                                                </motion.div>
                                            )}

                                            {/* STEP 3: Extras */}
                                            {step === 3 && (
                                                <motion.div 
                                                    key="step3"
                                                    initial={{ opacity: 0, x: 20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    exit={{ opacity: 0, x: -20 }}
                                                    transition={{ duration: 0.3 }}
                                                    className="space-y-8"
                                                >
                                                    <div>
                                                        <h3 className="text-xl font-bold text-navy mb-4 flex items-center">
                                                            <span className="material-symbols-outlined text-primary mr-2" translate="no">add_circle</span>
                                                            3. Extra Services (Optional)
                                                        </h3>
                                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                            {extrasList.map(extra => {
                                                                if(extra.isCounter) {
                                                                    return (
                                                                        <div key={extra.id} className={`p-4 rounded-xl border-2 flex flex-col justify-between transition-all ${form.windowsCount > 0 ? 'border-primary bg-sky-pale/30 shadow-sm' : 'border-sky-light/50 bg-white'}`}>
                                                                            <span className="text-sm font-bold text-navy mb-3">{extra.label}</span>
                                                                            <div className="flex bg-white border border-sky-pale rounded-xl overflow-hidden h-10 w-32 self-end">
                                                                                <button type="button" onClick={() => handleWindowChange(-1)} className="w-10 bg-sky-pale text-primary font-bold hover:bg-primary hover:text-white transition-colors">-</button>
                                                                                <div className="flex-1 flex items-center justify-center font-bold text-navy">{form.windowsCount}</div>
                                                                                <button type="button" onClick={() => handleWindowChange(1)} className="w-10 bg-sky-pale text-primary font-bold hover:bg-primary hover:text-white transition-colors">+</button>
                                                                            </div>
                                                                        </div>
                                                                    )
                                                                }
                                                                
                                                                return (
                                                                    <label key={extra.id} className={`flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all ${form.extras.includes(extra.id) ? 'border-primary bg-sky-pale/30 shadow-sm' : 'border-sky-light/50 hover:border-primary/50 bg-white'}`}>
                                                                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mr-3 ${form.extras.includes(extra.id) ? 'border-primary bg-primary' : 'border-gray-300'}`}>
                                                                            {form.extras.includes(extra.id) && <span className="material-symbols-outlined text-white text-[14px] font-black" translate="no">check</span>}
                                                                        </div>
                                                                        <input type="checkbox" name="extras" value={extra.id} checked={form.extras.includes(extra.id)} onChange={handleInput} className="hidden" />
                                                                        <span className="text-sm font-bold text-navy">{extra.label}</span>
                                                                    </label>
                                                                );
                                                            })}
                                                        </div>
                                                    </div>

                                                    <div className="flex gap-4 pt-4">
                                                        <button type="button" onClick={prevStep} className="w-1/3 text-primary font-bold py-4 rounded-xl border-2 border-primary/20 hover:border-primary hover:bg-sky-pale transition-all flex justify-center items-center group">
                                                            <span className="material-symbols-outlined mr-2 group-hover:-translate-x-1 transition-transform" translate="no">arrow_back</span> Back
                                                        </button>
                                                        <button type="button" onClick={nextStep} className="w-2/3 text-white font-bold py-4 rounded-xl bg-primary hover:bg-navy transition-all shadow-lg hover:shadow-primary/30 shadow-primary/20 flex justify-center items-center hover:-translate-y-1">
                                                            Final Step <span className="material-symbols-outlined ml-2" translate="no">person</span>
                                                        </button>
                                                    </div>
                                                </motion.div>
                                            )}

                                            {/* STEP 4: Info + Submit */}
                                            {step === 4 && (
                                                <motion.div 
                                                    key="step4"
                                                    initial={{ opacity: 0, x: 20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    exit={{ opacity: 0, x: -20 }}
                                                    transition={{ duration: 0.3 }}
                                                    className="space-y-8"
                                                >
                                                    <div>
                                                        <h3 className="text-xl font-bold text-navy mb-4 flex items-center">
                                                            <span className="material-symbols-outlined text-primary mr-2" translate="no">check_circle</span>
                                                            4. Final Details
                                                        </h3>
                                                        
                                                        <div className="md:col-span-2 bg-sky-pale/10 p-5 rounded-xl border border-sky-light/50 mb-6">
                                                            <label className="block text-sm font-bold text-navy mb-3">How would you like to proceed?</label>
                                                            <div className="flex flex-col sm:flex-row gap-4">
                                                                <label className={`flex-1 border-2 p-4 rounded-xl cursor-pointer flex items-center transition-all ${form.intent === 'quote' ? 'border-[#0097DB] bg-sky-pale/20' : 'border-gray-200 hover:border-[#0097DB]/50'}`}>
                                                                    <input type="radio" name="intent" value="quote" checked={form.intent === 'quote'} onChange={handleInput} className="hidden" />
                                                                    <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${form.intent === 'quote' ? 'border-[#0097DB] bg-[#0097DB]' : 'border-gray-300'}`}>
                                                                        {form.intent === 'quote' && <div className="w-2 h-2 rounded-full bg-white"></div>}
                                                                    </div>
                                                                    <span className="font-bold text-sm text-navy">I'm just saving this quote for later</span>
                                                                </label>
                                                                <label className={`flex-1 border-2 p-4 rounded-xl cursor-pointer flex items-center transition-all ${form.intent === 'schedule' ? 'border-[#0097DB] bg-sky-pale/20' : 'border-gray-200 hover:border-[#0097DB]/50'}`}>
                                                                    <input type="radio" name="intent" value="schedule" checked={form.intent === 'schedule'} onChange={handleInput} className="hidden" />
                                                                    <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${form.intent === 'schedule' ? 'border-[#0097DB] bg-[#0097DB]' : 'border-gray-300'}`}>
                                                                        {form.intent === 'schedule' && <div className="w-2 h-2 rounded-full bg-white"></div>}
                                                                    </div>
                                                                    <span className="font-bold text-sm text-navy">I'm ready to schedule this service</span>
                                                                </label>
                                                            </div>
                                                            <AnimatePresence>
                                                                {form.intent === 'schedule' && (
                                                                    <motion.div 
                                                                        initial={{ height: 0, opacity: 0 }} 
                                                                        animate={{ height: 'auto', opacity: 1 }} 
                                                                        exit={{ height: 0, opacity: 0 }} 
                                                                        className="mt-4 overflow-hidden space-y-4"
                                                                    >
                                                                        <div>
                                                                            <label className="block text-sm font-bold text-navy mb-2">When would you like the service? <span className="text-primary font-normal">(Subject to availability)</span></label>
                                                                            <input 
                                                                                type="date" 
                                                                                name="serviceDate" 
                                                                                value={form.serviceDate} 
                                                                                onChange={handleInput} 
                                                                                required={form.intent === 'schedule'}
                                                                                className={inputClasses} 
                                                                            />
                                                                        </div>
                                                                        
                                                                        {/* Urgency Fee Toggle */}
                                                                        <label className={`flex items-start p-4 rounded-xl border-2 cursor-pointer transition-all ${form.isUrgent ? 'border-primary bg-sky-pale/30 shadow-sm' : 'border-sky-light/50 bg-white'}`}>
                                                                            <div className="flex-shrink-0 mt-0.5 mr-3">
                                                                                <input 
                                                                                    type="checkbox" 
                                                                                    name="isUrgent" 
                                                                                    checked={form.isUrgent} 
                                                                                    onChange={handleInput} 
                                                                                    className="w-5 h-5 accent-primary rounded cursor-pointer" 
                                                                                />
                                                                            </div>
                                                                            <div>
                                                                                <span className="block font-bold text-sm text-navy">I need this cleaning urgently (Same day / Next day)</span>
                                                                                <span className="block text-[11px] text-primary font-bold">+$50 Urgency Fee applies</span>
                                                                            </div>
                                                                        </label>
                                                                    </motion.div>
                                                                )}
                                                            </AnimatePresence>
                                                        </div>

                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                            <input type="text" name="customerName" placeholder="Full Name" required value={form.customerName} onChange={handleInput} className={inputClasses} />
                                                            <input type="email" name="customerEmail" placeholder="Email Address" required value={form.customerEmail} onChange={handleInput} className={inputClasses} />
                                                            <input type="tel" name="customerPhone" placeholder="Phone Number" required value={form.customerPhone} onChange={handleInput} className={`md:col-span-2 ${inputClasses}`} />
                                                            <input type="text" name="customerAddress" placeholder="Full Address" required value={form.customerAddress} onChange={handleInput} className={`md:col-span-2 ${inputClasses}`} />
                                                            <textarea name="message" placeholder="Extra notes or instructions..." rows="3" value={form.message} onChange={handleInput} className={`md:col-span-2 ${inputClasses} resize-none`}></textarea>
                                                            
                                                            {/* Image Upload */}
                                                            <div className="md:col-span-2 bg-sky-pale/20 border-2 border-dashed border-sky-pale rounded-xl p-6 text-center">
                                                                <h4 className="font-bold text-navy mb-2">Attach Photos (Optional)</h4>
                                                                <p className="text-xs text-charcoal/70 mb-4">Upload photos of the areas you'd like us to focus on or any special requirements. Max 2 images, 5MB each.</p>
                                                                
                                                                <div className="flex flex-col items-center justify-center">
                                                                    {form.referenceImages.length < 2 && (
                                                                        <label className="bg-white border border-primary text-primary font-bold py-2 px-6 rounded-full cursor-pointer hover:bg-primary hover:text-white transition-colors mb-4 inline-block">
                                                                            <span className="material-symbols-outlined align-middle mr-2" translate="no">upload</span>
                                                                            Select Image
                                                                            <input type="file" accept="image/*" multiple onChange={handleImageUpload} className="hidden" />
                                                                        </label>
                                                                    )}
                                                                    
                                                                    {form.referenceImages.length > 0 && (
                                                                        <div className="flex gap-4 flex-wrap justify-center">
                                                                            {form.referenceImages.map((src, idx) => (
                                                                                <div key={idx} className="relative w-24 h-24 rounded-xl overflow-hidden border-2 border-primary">
                                                                                    <img src={src} alt={`Ref ${idx+1}`} className="w-full h-full object-cover" />
                                                                                    <button type="button" onClick={() => removeImage(idx)} className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shadow">&times;</button>
                                                                                </div>
                                                                            ))}
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {submitStatus === 'error' && (
                                                        <div className="md:col-span-2 bg-red-50 border border-red-200 rounded-xl p-4 flex items-start space-x-3 mb-4">
                                                            <span className="material-symbols-outlined text-red-600" translate="no">error</span>
                                                            <p className="text-sm text-red-800 font-bold leading-relaxed">
                                                                There was an error sending your request to our server. Your PDF quote is ready, but please try submitting again or contact us directly.
                                                            </p>
                                                        </div>
                                                    )}

                                                    <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-5 mb-8 space-y-6">
                                                        {/* Estimate Terms */}
                                                        <div>
                                                            <div className="flex items-start space-x-3 mb-4">
                                                                <span className="material-symbols-outlined text-yellow-600 mt-0.5" translate="no">info</span>
                                                                <p className="text-sm text-yellow-800 font-medium leading-relaxed">
                                                                    <strong>Important Notice:</strong> The quoted cost is an estimate based on average conditions. The final price may be adjusted on-site depending on the actual condition of the property. The details of the service inclusions remain unchanged.
                                                                </p>
                                                            </div>
                                                            <label className="flex items-start cursor-pointer group">
                                                                <div className="flex-shrink-0 mt-0.5">
                                                                    <input 
                                                                        type="checkbox" 
                                                                        name="acceptTerms" 
                                                                        checked={form.acceptTerms} 
                                                                        onChange={handleInput} 
                                                                        required
                                                                        className="w-5 h-5 accent-[#0097DB] rounded border-yellow-400 cursor-pointer" 
                                                                    />
                                                                </div>
                                                                <span className="ml-3 text-sm font-bold text-navy group-hover:text-[#0097DB] transition-colors leading-tight">
                                                                    I acknowledge and accept that this quote is an estimate and the final price will be confirmed upon arrival.
                                                                </span>
                                                            </label>
                                                        </div>

                                                        {/* Quality Policy */}
                                                        <div className="pt-4 border-t border-yellow-200">
                                                            <div className="flex items-start space-x-3 mb-4">
                                                                <span className="material-symbols-outlined text-primary mt-0.5" translate="no">verified</span>
                                                                <p className="text-sm text-navy font-bold leading-relaxed">
                                                                    Quality Policy
                                                                </p>
                                                            </div>
                                                            <p className="text-xs text-charcoal/80 italic mb-4 leading-relaxed bg-white/50 p-3 rounded-lg border border-sky-pale">
                                                                "At Angels Cleaning Services, we are committed to providing reliable, detailed cleaning services tailored to each client. We work with responsibility and dedication, always striving to exceed expectations and ensure clean, safe, and harmonious spaces."
                                                            </p>
                                                            <label className="flex items-start cursor-pointer group">
                                                                <div className="flex-shrink-0 mt-0.5">
                                                                    <input 
                                                                        type="checkbox" 
                                                                        name="acceptQualityPolicy" 
                                                                        checked={form.acceptQualityPolicy} 
                                                                        onChange={handleInput} 
                                                                        required
                                                                        className="w-5 h-5 accent-[#0097DB] rounded border-sky-pale cursor-pointer" 
                                                                    />
                                                                </div>
                                                                <span className="ml-3 text-sm font-bold text-navy group-hover:text-[#0097DB] transition-colors leading-tight">
                                                                    I have read and I accept the Quality Policy.
                                                                </span>
                                                            </label>
                                                            <p className="text-xs text-charcoal/60 mt-3">
                                                                By submitting this form, you agree to our{' '}
                                                                <a href="https://angelscleaningservices.com/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-primary underline hover:text-navy font-bold">Privacy Policy</a>.
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                                        <button type="button" onClick={prevStep} className="w-full sm:w-1/3 text-primary font-bold py-4 rounded-xl border-2 border-primary/20 hover:border-primary hover:bg-sky-pale transition-all flex justify-center items-center group">
                                                            <span className="material-symbols-outlined mr-2 group-hover:-translate-x-1 transition-transform" translate="no">arrow_back</span> Back
                                                        </button>
                                                        <button
                                                            type="submit"
                                                            disabled={isSubmitting || !!cityError || !form.acceptTerms || !form.acceptQualityPolicy || (form.intent === 'schedule' && !form.serviceDate)}
                                                            className={`w-full sm:w-2/3 text-white font-bold py-4 rounded-xl transition-all shadow-lg flex justify-center items-center text-lg ${cityError || !form.acceptTerms || !form.acceptQualityPolicy || (form.intent === 'schedule' && !form.serviceDate) ? 'bg-gray-400 cursor-not-allowed opacity-50' : 'bg-[#0097DB] hover:bg-navy shadow-[#0097DB]/30 hover:-translate-y-1'}`}
                                                        >
                                                            {isSubmitting ? (
                                                                <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-white"></div>
                                                            ) : (
                                                                <>Send My Quote Request <span className="material-symbols-outlined ml-2" translate="no">mail</span></>
                                                            )}
                                                        </button>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </form>
                                </motion.div>
                            </div>

                            {/* Floating Summary Column - DESKTOP ONLY */}
                            <div className="hidden lg:block lg:col-span-1">
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="sticky top-32 bg-navy text-white rounded-3xl p-8 shadow-2xl overflow-hidden relative"
                                >
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-bl-full blur-2xl"></div>

                                    <h3 className="text-2xl font-black mb-6 border-b border-white/10 pb-4 flex items-center">
                                        <span className="material-symbols-outlined mr-2" translate="no">calculate</span>
                                        Estimation
                                    </h3>

                                    <div className="space-y-4 mb-8">
                                        <div className="flex justify-between items-center text-sky-pale border-b border-white/10 pb-2">
                                            <span>Service:</span>
                                            <span className="font-bold text-white text-right truncate max-w-[150px]" title={form.serviceType}>{form.serviceType}</span>
                                        </div>
                                        <div className="flex justify-between items-center text-sky-pale border-b border-white/10 pb-2">
                                            <span>Date:</span>
                                            <span className="font-bold text-white text-right truncate max-w-[150px]">{form.intent === 'quote' ? 'Exploring Quotes' : (form.serviceDate ? new Date(form.serviceDate).toLocaleDateString() : 'Needs scheduling')}</span>
                                        </div>
                                        <div className="flex justify-between items-center text-sky-pale border-b border-white/10 pb-2">
                                            <span>House Info:</span>
                                            <span className="font-bold text-white text-right">{form.sqft} sqft | {form.bedrooms}B | {form.fullBathrooms}F/{form.halfBathrooms}H</span>
                                        </div>
                                        {step > 1 && (
                                            <div className="flex justify-between items-center text-sky-pale border-b border-white/10 pb-2">
                                                <span>Condition:</span>
                                                <span className="font-bold text-white text-right truncate max-w-[150px]">{form.hasPets ? 'Pets Home' : 'Standard'}</span>
                                            </div>
                                        )}
                                        {form.isUrgent && (
                                            <div className="flex justify-between items-center text-sky-pale border-b border-white/10 pb-2">
                                                <span>Urgency Fee:</span>
                                                <span className="font-bold text-white text-right">$50</span>
                                            </div>
                                        )}
                                        {step > 2 && (form.extras.length > 0 || form.windowsCount > 0) && (
                                            <div className="flex justify-between items-start text-sky-pale border-b border-white/10 pb-2">
                                                <span>Extras:</span>
                                                <span className="font-bold text-white text-right">
                                                    {form.extras.length + (form.windowsCount > 0 ? 1 : 0)} selected
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="bg-white/10 rounded-2xl p-6 text-center backdrop-blur-sm border border-white/20">
                                        <p className="text-sky-pale text-sm uppercase tracking-wider font-bold mb-2">Estimated Price</p>
                                        <div className="flex items-baseline justify-center">
                                            <span className="text-lg font-bold text-sky-pale mr-1">~</span>
                                            <p className="text-4xl font-black text-white">
                                                {hasInteracted ? `$${estimatedPrice}` : '$--'}
                                            </p>
                                        </div>
                                    </div>
                                    
                                    <div className="mt-8 text-center text-xs text-sky-pale/60 px-4">
                                        <p>Final price confirmed on-site based on actual property condition.</p>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* STICKY MOBILE SUMMARY FOOTER - Visible only on mobile/tablet */}
            <AnimatePresence>
                {!submitStatus && hasInteracted && (
                    <motion.div 
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 100, opacity: 0 }}
                        className="lg:hidden fixed bottom-0 left-0 right-0 bg-navy border-t-2 border-primary text-white p-4 shadow-[0_-15px_40px_rgba(0,0,0,0.3)] z-[100] pb-safe"
                        style={{ paddingBottom: 'calc(1rem + env(safe-area-inset-bottom))' }}
                    >
                        <div className="flex justify-between items-center max-w-5xl mx-auto">
                            <div>
                                <p className="text-[10px] text-sky-pale uppercase tracking-wider font-bold mb-0.5">Estimated Price</p>
                                <p className="text-2xl font-black text-white leading-none">~${estimatedPrice}</p>
                            </div>
                            <div>
                                {step < totalSteps ? (
                                    <button type="button" onClick={nextStep} disabled={step === 1 && !!cityError} className={`bg-[#0097DB] text-white font-bold py-2.5 px-6 rounded-xl transition-all flex items-center shadow-lg ${(cityError) && step===1 ? 'opacity-50' : 'hover:bg-white hover:text-[#0097DB] active:scale-95'}`}>
                                        Next <span className="material-symbols-outlined ml-2 text-sm" translate="no">arrow_forward</span>
                                    </button>
                                ) : (
                                    <button type="button" onClick={handleSubmit} disabled={isSubmitting || !!cityError || !form.acceptTerms || !form.acceptQualityPolicy || (form.intent === 'schedule' && !form.serviceDate)} className={`bg-primary text-white font-bold py-2.5 px-6 rounded-xl transition-all flex items-center shadow-lg ${(isSubmitting || cityError || !form.acceptTerms || !form.acceptQualityPolicy || (form.intent === 'schedule' && !form.serviceDate)) ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white hover:text-primary active:scale-95'}`}>
                                        {isSubmitting ? 'Sending...' : 'Submit'} {!isSubmitting && <span className="material-symbols-outlined ml-2 text-sm" translate="no">check_circle</span>}
                                    </button>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* SERVICE DETAILS MODAL */}
            <AnimatePresence>
                {showModal && (
                    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 pb-24 lg:pb-6">
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-navy/60 backdrop-blur-sm"
                            onClick={() => setShowModal(false)}
                        />
                        <motion.div 
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            className="bg-white rounded-3xl w-full max-w-3xl max-h-[85vh] shadow-2xl relative z-10 flex flex-col overflow-hidden"
                        >
                            {/* Modal Header */}
                            <div className="flex justify-between items-center p-5 sm:p-6 border-b border-sky-pale bg-sky-pale/10">
                                <div>
                                    <h2 className="text-2xl font-black text-navy">{form.serviceType}</h2>
                                    <p className="text-sm text-charcoal/70">What to expect from this service</p>
                                </div>
                                <button onClick={() => setShowModal(false)} className="w-10 h-10 bg-white rounded-full border shadow flex items-center justify-center text-charcoal hover:bg-red-50 hover:text-red-500 hover:border-red-200 transition-colors">
                                    <span className="material-symbols-outlined font-bold" translate="no">close</span>
                                </button>
                            </div>

                            {/* Modal Body */}
                            <div className="p-5 sm:p-6 overflow-y-auto bg-gray-50/50 flex-1 relative">
                                <div className="mb-6 bg-green-50/50 border border-green-200 rounded-2xl p-5 pb-6">
                                    <h3 className="text-lg font-bold text-green-800 flex items-center mb-4 border-b border-green-200 pb-2">
                                        <span className="material-symbols-outlined mr-2" translate="no">check_circle</span>
                                        What's Included
                                    </h3>
                                    <div className="space-y-5">
                                        {(serviceDetails[form.serviceType] || serviceDetails['Standard Cleaning']).included.map((inc, i) => (
                                            <div key={i}>
                                                <h4 className="font-bold text-navy text-sm mb-1">{inc.area}</h4>
                                                <div className="text-sm text-charcoal whitespace-pre-line pl-2 leading-relaxed">
                                                    {inc.tasks}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="bg-red-50/50 border border-red-200 rounded-2xl p-5 mb-4">
                                    <h3 className="text-lg font-bold text-red-800 flex items-center mb-4 border-b border-red-200 pb-2">
                                        <span className="material-symbols-outlined mr-2" translate="no">cancel</span>
                                        Not Included
                                    </h3>
                                    <div className="text-sm text-charcoal whitespace-pre-line pl-2 leading-relaxed">
                                        {(serviceDetails[form.serviceType] || serviceDetails['Standard Cleaning']).notIncluded.map(n => n.text).join('\n')}
                                    </div>
                                </div>
                                
                                <div className="mt-8 text-center text-xs text-charcoal/60 px-4">
                                    <p>💡 Note: Additional services may apply depending on the property's actual condition upon arrival.</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
};

export default QuoteCalculator;
