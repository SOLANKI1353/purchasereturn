@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
@import "tailwindcss";

@theme {
  --font-sans: "Plus Jakarta Sans", ui-sans-serif, system-ui, sans-serif;
  --font-display: "Outfit", sans-serif;
  
  --color-brand-50: #f0f7ff;
  --color-brand-100: #e0effe;
  --color-brand-200: #bae0fd;
  --color-brand-300: #7cc7fb;
  --color-brand-400: #38a9f8;
  --color-brand-500: #0e8ce4;
  --color-brand-600: #026fc7;
  --color-brand-700: #0359a1;
  --color-brand-800: #074c85;
  --color-brand-900: #0c406e;
  --color-brand-950: #082949;
}

@layer base {
  body {
    @apply bg-[#f8fafc] text-slate-900 antialiased;
  }
}

.glass-card {
  @apply bg-white/70 backdrop-blur-xl border border-white/40 shadow-[0_8px_32px_rgba(0,0,0,0.04)];
}

.gradient-text {
  @apply bg-clip-text text-transparent bg-linear-to-r from-brand-600 to-emerald-600 font-extrabold;
}

.step-card-hover {
  @apply transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-brand-200;
}

.stylish-shadow {
  @apply shadow-[0_20px_50px_rgba(8,112,184,0.07)];
}
