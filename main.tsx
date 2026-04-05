import { motion, AnimatePresence } from "motion/react";
import { 
  ChevronDown, Globe, Info, Target, Users, ClipboardList, 
  FileText, GitGraph, CheckCircle2, AlertCircle, Warehouse, 
  Microscope, Truck, FileBarChart, ArrowRight, Sparkles
} from "lucide-react";
import { useState, ReactNode } from "react";

type Language = 'en' | 'hi' | 'gu';

const COLORS = {
  brand: "#0e8ce4",
  emerald: "#10b981",
  amber: "#f59e0b",
  rose: "#f43f5e",
  indigo: "#6366f1",
  slate: "#64748b"
};

const SOP_DATA = {
  purpose: {
    en: "To define the process for handling defective, damaged, or non-conforming materials received from vendors.",
    hi: "वेंडर से प्राप्त खराब, डैमेज या स्पेसिफिकेशन के अनुसार न होने वाले मटेरियल को संभालने की प्रक्रिया निर्धारित करना।",
    gu: "વિક્રેતાથી પ્રાપ્ત થયેલ ખરાબ, નુકસાનગ્રસ્ત અથવા સ્પેસિફિકેશન મુજબ ન હોય તેવા માલને હેન્ડલ કરવાની પ્રક્રિયા નિર્ધારિત કરવી।"
  },
  scope: {
    en: "Applicable to all incoming materials, components, and parts used in submersible pump manufacturing.",
    hi: "यह SOP सभी इनकमिंग मटेरियल, कंपोनेंट्स और पार्ट्स पर लागू होती है।",
    gu: "આ SOP બધા આવનાર મટીરિયલ, કોમ્પોનેન્ટ્સ અને પાર્ટ્સ પર લાગુ પડે છે।"
  },
  responsibilities: [
    {
      role: { en: "Store", hi: "स्टोर", gu: "સ્ટોર" },
      task: { en: "Material receipt & segregation", hi: "मटेरियल रिसीव और अलग करना", gu: "માલ સ્વીકાર અને અલગ પાડવું" },
      icon: Warehouse,
      color: "bg-blue-500"
    },
    {
      role: { en: "Quality (QC)", hi: "क्वालिटी (QC)", gu: "ક્વોલિટી (QC)" },
      task: { en: "Inspection & rejection decision", hi: "निरीक्षण और रिजेक्शन निर्णय", gu: "તપાસ અને રિજેકશન નિર્ણય" },
      icon: Microscope,
      color: "bg-emerald-500"
    },
    {
      role: { en: "Purchase", hi: "परचेज", gu: "પર્ચેઝ" },
      task: { en: "Vendor communication & return handling", hi: "वेंडर से संपर्क और रिटर्न प्रक्रिया", gu: "વિક્રેતાથી સંપર્ક અને રિટર્ન પ્રક્રિયા" },
      icon: Truck,
      color: "bg-amber-500"
    },
    {
      role: { en: "Accounts", hi: "अकाउंट्स", gu: "એકાઉન્ટ્સ" },
      task: { en: "Debit note & payment adjustment", hi: "डेबिट नोट और पेमेंट एडजस्टमेंट", gu: "ડેબિટ નોટ અને પેમેન્ટ એડજસ્ટમેન્ટ" },
      icon: FileBarChart,
      color: "bg-indigo-500"
    }
  ],
  steps: [
    {
      id: "01",
      title: { en: "Material Inspection", hi: "मटेरियल निरीक्षण", gu: "મટીરિયલ નિરીક્ષણ" },
      desc: { 
        en: "Inspect material as per PO & specifications. Identify defects (damage, mismatch, quality issue). Inform QC team.",
        hi: "PO और स्पेसिफिकेशन के अनुसार मटेरियल चेक करें। डैमेज/मिसमैच/क्वालिटी समस्या पहचानें। QC टीम को सूचित करें।",
        gu: "PO અને સ્પેસિફિકેશન મુજબ માલ ચકાસો. નુકસાન / ગેરમિલ / ગુણવત્તા સમસ્યા ઓળખો. QC ટીમને જાણ કરો।"
      },
      icon: ClipboardList,
      accent: "blue",
      color: "#38bdf8"
    },
    {
      id: "02",
      title: { en: "Rejection Decision", hi: "रिजेक्शन निर्णय", gu: "રિજેકશન નિર્ણય" },
      desc: {
        en: "QC inspects and approves rejection. Prepare Rejection Note.",
        hi: "QC निरीक्षण कर रिजेक्शन approve करे। रिजेक्शन नोट तैयार करें।",
        gu: "QC તપાસ કરી રિજેકશન મંજૂર કરે. રિજેકશન નોટ બનાવો।"
      },
      icon: CheckCircle2,
      accent: "emerald",
      color: "#10b981"
    },
    {
      id: "03",
      title: { en: "Material Segregation", hi: "मटेरियल अलगाव", gu: "મટીરિયલ અલગ પાડવું" },
      desc: {
        en: "Keep rejected material in separate area. Tag as 'Rejected Material'.",
        hi: "रिजेक्टेड मटेरियल को अलग रखें। 'Rejected Material' टैग लगाएं।",
        gu: "રિજેક્ટેડ માલને અલગ રાખો. 'Rejected Material' ટેગ લગાવો।"
      },
      icon: AlertCircle,
      accent: "rose",
      color: "#f43f5e"
    },
    {
      id: "04",
      title: { en: "Vendor Communication", hi: "वेंडर संचार", gu: "વિક્રેતા સંચાર" },
      desc: {
        en: "Inform vendor via email/phone. Share rejection details with photos. Ask for replacement/refund.",
        hi: "वेंडर को ईमेल/फोन से सूचित करें। फोटो के साथ डिटेल शेयर करें। रिप्लेसमेंट/रिफंड मांगें।",
        gu: "વિક્રેતાને ઇમેલ/ફોનથી જાણ કરો. ફોટા સાથે માહિતી મોકલો. રિપ્લેસમેન્ટ / રિફંડ માંગો।"
      },
      icon: Globe,
      accent: "amber",
      color: "#f59e0b"
    },
    {
      id: "05",
      title: { en: "Return Process", hi: "रिटर्न प्रक्रिया", gu: "રિટર્ન પ્રક્રિયા" },
      desc: {
        en: "Prepare Return Challan. Dispatch material to vendor. Maintain dispatch records.",
        hi: "रिटर्न चालान तैयार करें। मटेरियल वेंडर को भेजें। रिकॉर्ड बनाए रखें।",
        gu: "રિટર્ન ચલાન બનાવો. માલ વિક્રેતાને મોકલો. રેકોર્ડ રાખો।"
      },
      icon: Truck,
      accent: "indigo",
      color: "#6366f1"
    },
    {
      id: "06",
      title: { en: "Debit Note Creation", hi: "डेबिट नोट निर्माण", gu: "ડેબિટ નોટ બનાવવી" },
      desc: {
        en: "Accounts prepare Debit Note. Adjust against vendor invoice.",
        hi: "अकाउंट्स डेबिट नोट बनाएं। वेंडर बिल में एडजस्ट करें।",
        gu: "એકાઉન્ટ્સ ડેબિટ નોટ બનાવે. બિલ સામે એડજસ્ટ કરે।"
      },
      icon: FileText,
      accent: "brand",
      color: "#0e8ce4"
    },
    {
      id: "07",
      title: { en: "Replacement / Refund Tracking", hi: "रिप्लेसमेंट / रिफंड ट्रैकिंग", gu: "રિપ્લેસમેન્ટ / રિફંડ ટ્રેકિંગ" },
      desc: {
        en: "Track replacement delivery. Follow-up till closure.",
        hi: "रिप्लेसमेंट ट्रैक करें। क्लोजर तक फॉलो-अप करें।",
        gu: "રિપ્લેસમેન્ટ ટ્રેક કરો. પૂર્ણ થાય ત્યાં સુધી ફોલો-અપ કરો।"
      },
      icon: GitGraph,
      accent: "emerald",
      color: "#10b981"
    }
  ],
  documents: [
    { en: "Rejection Note", hi: "रिजेक्शन नोट", gu: "રિજેકશન નોટ", color: "bg-blue-100 text-blue-700" },
    { en: "Return Challan", hi: "रिटर्न चालान", gu: "રિટર્ન ચલાન", color: "bg-emerald-100 text-emerald-700" },
    { en: "Debit Note", hi: "डेबिट नोट", gu: "ડેબિટ નોટ", color: "bg-amber-100 text-amber-700" },
    { en: "Vendor Communication Record", hi: "वेंडर कम्युनिकेशन रिकॉर्ड", gu: "વિક્રેતા કમ્યુનિકેશન રેકોર્ડ", color: "bg-indigo-100 text-indigo-700" }
  ]
};

const LanguageToggle = ({ current, onChange }: { current: Language, onChange: (l: Language) => void }) => (
  <div className="flex gap-1 bg-slate-100/50 p-1 rounded-full w-fit mb-4 backdrop-blur-sm border border-slate-200/50">
    {(['en', 'hi', 'gu'] as Language[]).map((lang) => (
      <button
        key={lang}
        onClick={() => onChange(lang)}
        className={`px-5 py-1.5 rounded-full text-xs font-extrabold transition-all duration-300 ${
          current === lang 
            ? "bg-brand-600 text-white shadow-md shadow-brand-200" 
            : "text-slate-500 hover:bg-slate-200 hover:text-slate-700"
        }`}
      >
        {lang === 'en' ? "ENGLISH" : lang === 'hi' ? "हिन्दी" : "ગુજરાતી"}
      </button>
    ))}
  </div>
);

const SectionCard = ({ 
  title, 
  icon: Icon, 
  children, 
  isOpen, 
  onToggle,
  lang,
  onLangChange,
  accentColor = "brand"
}: { 
  title: string; 
  icon: any; 
  children: ReactNode; 
  isOpen: boolean; 
  onToggle: () => void;
  lang: Language;
  onLangChange: (l: Language) => void;
  accentColor?: string;
}) => (
  <div className="mb-8 overflow-hidden rounded-[2.5rem] border-2 border-slate-100 bg-white stylish-shadow transition-all duration-500 hover:border-brand-200/50 hover:shadow-2xl hover:shadow-slate-200/50">
    <button
      onClick={onToggle}
      className="flex w-full items-center justify-between p-8 text-left transition-colors hover:bg-slate-50/30"
    >
      <div className="flex items-center gap-6">
        <div className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-${accentColor}-600 text-white shadow-lg shadow-${accentColor}-200`}>
          <Icon size={28} strokeWidth={3} />
        </div>
        <h2 className="font-display text-2xl font-[900] tracking-tighter text-slate-900 uppercase">{title}</h2>
      </div>
      <motion.div
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-500"
      >
        <ChevronDown size={22} strokeWidth={3} />
      </motion.div>
    </button>
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
        >
          <div className="border-t border-slate-100/50 p-8 pt-4">
            <LanguageToggle current={lang} onChange={onLangChange} />
            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              {children}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

export default function App() {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    purpose: true,
    scope: false,
    responsibility: false,
    procedure: false,
    documents: false,
    flowchart: true
  });

  const [langs, setLangs] = useState<Record<string, Language>>({
    purpose: 'en',
    scope: 'en',
    responsibility: 'en',
    procedure: 'en',
    documents: 'en',
    flowchart: 'en'
  });

  const toggleSection = (id: string) => {
    setOpenSections(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const setLang = (id: string, l: Language) => {
    setLangs(prev => ({ ...prev, [id]: l }));
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] p-4 md:p-10 lg:p-16">
      <div className="mx-auto max-w-6xl">
        {/* Header Section */}
        <header className="mb-16 relative">
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-brand-200/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-emerald-200/20 rounded-full blur-3xl" />
          
          <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl">
              <motion.div 
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="mb-4 inline-flex items-center gap-2 rounded-full bg-brand-50 px-5 py-1.5 text-xs font-black text-brand-700 uppercase tracking-widest border border-brand-100 shadow-sm"
              >
                <Sparkles size={14} className="text-brand-500" />
                Standard Operating Procedure
              </motion.div>
              <h1 className="font-display text-6xl font-[900] tracking-tighter text-slate-900 md:text-8xl leading-[0.95] mb-4">
                Purchase <span className="gradient-text">Return</span> <br className="hidden md:block" />
                <span className="text-slate-300">&</span> Rejection
              </h1>
              <p className="mt-8 text-2xl text-slate-500 font-bold leading-tight max-w-xl">
                The definitive interactive protocol for high-stakes quality control and vendor lifecycle management.
              </p>
            </div>
            
            <div className="flex flex-col items-end gap-3">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 overflow-hidden shadow-sm">
                    <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="User" referrerPolicy="no-referrer" />
                  </div>
                ))}
                <div className="w-10 h-10 rounded-full border-2 border-white bg-brand-600 flex items-center justify-center text-[10px] font-black text-white shadow-sm">
                  +12
                </div>
              </div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Active Stakeholders</span>
            </div>
          </div>
        </header>

        <div className="grid gap-0">
          {/* 1. Purpose & Scope - Bento Style */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="md:col-span-2 rounded-[3rem] bg-white p-12 border-2 border-slate-100 stylish-shadow group transition-all duration-500 hover:border-brand-400/30 hover:shadow-2xl hover:shadow-brand-500/10">
              <div className="flex items-center gap-5 mb-8">
                <div className="w-14 h-14 rounded-2xl bg-brand-600 text-white flex items-center justify-center shadow-lg shadow-brand-200">
                  <Target size={28} strokeWidth={3} />
                </div>
                <h2 className="font-display text-3xl font-[900] text-slate-900 uppercase tracking-tighter">Mission Purpose</h2>
              </div>
              <LanguageToggle current={langs.purpose} onChange={(l) => setLang('purpose', l)} />
              <p className="text-2xl leading-snug text-slate-700 font-extrabold tracking-tight">
                {SOP_DATA.purpose[langs.purpose]}
              </p>
            </div>
            
            <div className="rounded-[3rem] bg-linear-to-br from-brand-600 to-brand-800 p-12 text-white stylish-shadow relative overflow-hidden group border-2 border-brand-500/20">
              <div className="absolute -right-10 -top-10 w-48 h-48 bg-white/10 rounded-full blur-3xl transition-transform duration-1000 group-hover:scale-150" />
              <div className="flex items-center gap-5 mb-8 relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-white/20 text-white flex items-center justify-center backdrop-blur-xl border border-white/30">
                  <Info size={28} strokeWidth={3} />
                </div>
                <h2 className="font-display text-3xl font-[900] uppercase tracking-tighter">Scope</h2>
              </div>
              <LanguageToggle current={langs.scope} onChange={(l) => setLang('scope', l)} />
              <p className="text-xl font-black leading-tight opacity-95 relative z-10 tracking-tight">
                {SOP_DATA.scope[langs.scope]}
              </p>
            </div>
          </div>

          {/* 3. Responsibility */}
          <SectionCard
            title="Responsibility Matrix"
            icon={Users}
            isOpen={openSections.responsibility}
            onToggle={() => toggleSection('responsibility')}
            lang={langs.responsibility}
            onLangChange={(l) => setLang('responsibility', l)}
            accentColor="emerald"
          >
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {SOP_DATA.responsibilities.map((item, idx) => (
                <motion.div 
                  key={idx} 
                  whileHover={{ y: -5 }}
                  className="rounded-3xl border border-slate-100 bg-slate-50/50 p-6 transition-all hover:bg-white hover:shadow-xl hover:shadow-brand-500/5 group"
                >
                  <div className={`mb-5 flex h-14 w-14 items-center justify-center rounded-2xl ${item.color} text-white shadow-lg shadow-brand-500/20 transition-transform duration-500 group-hover:rotate-6`}>
                    <item.icon size={28} strokeWidth={2} />
                  </div>
                  <h3 className="font-display text-lg font-black text-slate-900 mb-2">{item.role[langs.responsibility]}</h3>
                  <p className="text-sm font-bold text-slate-500 leading-relaxed">{item.task[langs.responsibility]}</p>
                </motion.div>
              ))}
            </div>
          </SectionCard>

          {/* 4. Procedure */}
          <SectionCard
            title="Standard Procedure"
            icon={ClipboardList}
            isOpen={openSections.procedure}
            onToggle={() => toggleSection('procedure')}
            lang={langs.procedure}
            onLangChange={(l) => setLang('procedure', l)}
            accentColor="amber"
          >
            <div className="space-y-10 relative">
              <div className="absolute left-[27px] top-4 bottom-4 w-1 bg-linear-to-b from-brand-500 via-emerald-500 to-indigo-500 rounded-full opacity-20" />
              
              {SOP_DATA.steps.map((step, idx) => (
                <motion.div 
                  key={idx} 
                  initial={{ x: -20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  className="relative flex gap-8 group"
                >
                  <div className={`relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white border-4 border-slate-50 shadow-lg text-slate-900 font-black text-xl transition-all duration-500 group-hover:scale-110 group-hover:bg-brand-600 group-hover:text-white group-hover:border-brand-100`}>
                    {step.id}
                  </div>
                  <div className="pt-2">
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`p-1.5 rounded-lg bg-slate-100 text-slate-500 group-hover:bg-brand-50 group-hover:text-brand-600 transition-colors`}>
                        <step.icon size={20} strokeWidth={2.5} />
                      </div>
                      <h3 className="font-display text-2xl font-[900] text-slate-900 tracking-tight">{step.title[langs.procedure]}</h3>
                    </div>
                    <p className="text-lg text-slate-500 font-bold leading-relaxed max-w-3xl">
                      {step.desc[langs.procedure]}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </SectionCard>

          {/* 5. Documents */}
          <SectionCard
            title="Required Documentation"
            icon={FileText}
            isOpen={openSections.documents}
            onToggle={() => toggleSection('documents')}
            lang={langs.documents}
            onLangChange={(l) => setLang('documents', l)}
            accentColor="indigo"
          >
            <div className="flex flex-wrap gap-4">
              {SOP_DATA.documents.map((doc, idx) => (
                <motion.div 
                  key={idx} 
                  whileHover={{ scale: 1.05 }}
                  className={`flex items-center gap-3 rounded-2xl ${doc.color} px-8 py-4 text-sm font-black uppercase tracking-wider shadow-sm border border-white/20`}
                >
                  <FileText size={18} strokeWidth={2.5} />
                  {doc[langs.documents]}
                </motion.div>
              ))}
            </div>
          </SectionCard>

          {/* 6. Flowchart */}
          <SectionCard
            title="Advanced Process Flow"
            icon={GitGraph}
            isOpen={openSections.flowchart}
            onToggle={() => toggleSection('flowchart')}
            lang={langs.flowchart}
            onLangChange={(l) => setLang('flowchart', l)}
            accentColor="rose"
          >
            <div className="rounded-[3rem] bg-slate-950 p-6 md:p-12 overflow-x-auto shadow-2xl shadow-brand-900/40 border border-slate-800">
               <svg viewBox="-50 -20 1100 1350" className="mx-auto w-full h-auto min-w-[750px]" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="gradBrand" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#38bdf8" />
                    <stop offset="100%" stopColor="#0e8ce4" />
                  </linearGradient>
                  <linearGradient id="gradEmerald" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#34d399" />
                    <stop offset="100%" stopColor="#10b981" />
                  </linearGradient>
                  <linearGradient id="gradAmber" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#fbbf24" />
                    <stop offset="100%" stopColor="#f59e0b" />
                  </linearGradient>
                  <linearGradient id="gradRose" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#fb7185" />
                    <stop offset="100%" stopColor="#f43f5e" />
                  </linearGradient>
                  <linearGradient id="gradIndigo" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#818cf8" />
                    <stop offset="100%" stopColor="#6366f1" />
                  </linearGradient>
                  <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
                    <feGaussianBlur stdDeviation="8" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                  <marker id="arrowHead" markerWidth="12" markerHeight="8" refX="11" refY="4" orient="auto">
                    <path d="M 0 0 L 12 4 L 0 8 Z" fill="#64748b" />
                  </marker>
                </defs>
                
                {/* START */}
                <rect x="400" y="20" width="200" height="70" rx="35" fill="url(#gradBrand)" filter="url(#glow)" />
                <text x="500" y="62" textAnchor="middle" fill="white" fontWeight="900" fontSize="20" fontFamily="Outfit" letterSpacing="1">START PROTOCOL</text>
                
                <path d="M 500 90 L 500 150" stroke="#334155" strokeWidth="4" fill="none" markerEnd="url(#arrowHead)" />

                {/* STEP 1 */}
                <rect x="325" y="150" width="350" height="100" rx="24" fill="#0f172a" stroke="#38bdf8" strokeWidth="3" filter="url(#glow)" />
                <text x="500" y="195" textAnchor="middle" fill="#38bdf8" fontWeight="900" fontSize="18" fontFamily="Outfit">01. MATERIAL INSPECTION</text>
                <text x="500" y="220" textAnchor="middle" fill="#64748b" fontSize="14" fontWeight="800">Verify PO & Technical Specs</text>
                
                <path d="M 500 250 L 500 310" stroke="#334155" strokeWidth="4" fill="none" markerEnd="url(#arrowHead)" />

                {/* DECISION 1 */}
                <polygon points="500,310 650,400 500,490 350,400" fill="#0f172a" stroke="#f59e0b" strokeWidth="4" filter="url(#glow)" />
                <text x="500" y="395" textAnchor="middle" fill="#f59e0b" fontWeight="900" fontSize="18" fontFamily="Outfit">NON-CONFORMING?</text>
                <text x="500" y="420" textAnchor="middle" fill="#64748b" fontSize="12" fontWeight="800">Damage / Quality / Mismatch</text>

                {/* NO PATH */}
                <path d="M 650 400 L 800 400 L 800 460" stroke="#10b981" strokeWidth="4" fill="none" strokeDasharray="10,6" markerEnd="url(#arrowHead)" />
                <text x="725" y="385" fill="#10b981" fontWeight="900" fontSize="16">NO</text>
                
                <rect x="675" y="460" width="250" height="70" rx="35" fill="url(#gradEmerald)" filter="url(#glow)" />
                <text x="800" y="502" textAnchor="middle" fill="white" fontWeight="900" fontSize="18" fontFamily="Outfit">ACCEPT & INVENTORY</text>

                {/* YES PATH */}
                <path d="M 500 490 L 500 550" stroke="#f43f5e" strokeWidth="4" fill="none" markerEnd="url(#arrowHead)" />
                <text x="525" y="525" fill="#f43f5e" fontWeight="900" fontSize="16">YES</text>

                {/* STEP 2 */}
                <rect x="325" y="550" width="350" height="100" rx="24" fill="#0f172a" stroke="#f43f5e" strokeWidth="3" filter="url(#glow)" />
                <text x="500" y="595" textAnchor="middle" fill="#fb7185" fontWeight="900" fontSize="18" fontFamily="Outfit">02. REJECTION DECISION</text>
                <text x="500" y="620" textAnchor="middle" fill="#64748b" fontSize="14" fontWeight="800">QC Approval + Formal Note</text>
                
                <path d="M 500 650 L 500 710" stroke="#334155" strokeWidth="4" fill="none" markerEnd="url(#arrowHead)" />

                {/* STEP 3 */}
                <rect x="325" y="710" width="350" height="100" rx="24" fill="#0f172a" stroke="#fbbf24" strokeWidth="3" filter="url(#glow)" />
                <text x="500" y="755" textAnchor="middle" fill="#fbbf24" fontWeight="900" fontSize="18" fontFamily="Outfit">03. SEGREGATION & TAGGING</text>
                <text x="500" y="780" textAnchor="middle" fill="#64748b" fontSize="14" fontWeight="800">Quarantine Area + Status Tag</text>
                
                <path d="M 500 810 L 500 870" stroke="#334155" strokeWidth="4" fill="none" markerEnd="url(#arrowHead)" />

                {/* STEP 4 */}
                <rect x="325" y="870" width="350" height="100" rx="24" fill="#0f172a" stroke="#818cf8" strokeWidth="3" filter="url(#glow)" />
                <text x="500" y="915" textAnchor="middle" fill="#818cf8" fontWeight="900" fontSize="18" fontFamily="Outfit">04. VENDOR RESOLUTION</text>
                <text x="500" y="940" textAnchor="middle" fill="#64748b" fontSize="14" fontWeight="800">Communication + Evidence Log</text>
                
                <path d="M 500 970 L 500 1030" stroke="#334155" strokeWidth="4" fill="none" markerEnd="url(#arrowHead)" />

                {/* STEP 5 */}
                <rect x="325" y="1030" width="350" height="100" rx="24" fill="#0f172a" stroke="#0e8ce4" strokeWidth="3" filter="url(#glow)" />
                <text x="500" y="1075" textAnchor="middle" fill="#38bdf8" fontWeight="900" fontSize="18" fontFamily="Outfit">05. DISPATCH & DEBIT</text>
                <text x="500" y="1100" textAnchor="middle" fill="#64748b" fontSize="14" fontWeight="800">Return Challan + Financial Adj.</text>
                
                <path d="M 500 1130 L 500 1160" stroke="#334155" strokeWidth="4" fill="none" markerEnd="url(#arrowHead)" />

                {/* END */}
                <rect x="400" y="1160" width="200" height="70" rx="35" fill="url(#gradRose)" filter="url(#glow)" />
                <text x="500" y="1202" textAnchor="middle" fill="white" fontWeight="900" fontSize="20" fontFamily="Outfit" letterSpacing="1">END PROTOCOL</text>
                
                {/* CONNECTING ACCEPT TO END */}
                <path d="M 925 495 L 960 495 L 960 1195 L 600 1195" stroke="#10b981" strokeWidth="3" fill="none" strokeDasharray="8,8" markerEnd="url(#arrowHead)" />
              </svg>
            </div>
          </SectionCard>
        </div>

        <footer className="mt-24 border-t border-slate-200 pt-12 text-center">
          <div className="flex justify-center gap-8 mb-6">
            <div className="flex flex-col items-center">
              <span className="text-2xl font-black text-slate-800">100%</span>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Compliance</span>
            </div>
            <div className="w-px h-10 bg-slate-200" />
            <div className="flex flex-col items-center">
              <span className="text-2xl font-black text-slate-800">ISO</span>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Certified</span>
            </div>
            <div className="w-px h-10 bg-slate-200" />
            <div className="flex flex-col items-center">
              <span className="text-2xl font-black text-slate-800">24/7</span>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Monitoring</span>
            </div>
          </div>
          <p className="text-sm font-bold text-slate-400 uppercase tracking-[0.2em]">
            Quality Management Systems • Interactive SOP Dashboard v2.0
          </p>
        </footer>
      </div>
    </div>
  );
}
