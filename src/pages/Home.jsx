import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

function useInView(threshold = 0.15) {
  const ref = useRef(null)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view')
          observer.unobserve(entry.target)
        }
      },
      { threshold }
    )
    const el = ref.current
    if (el) observer.observe(el)
    return () => el && observer.unobserve(el)
  }, [threshold])
  return ref
}

function AnimatedSection({ children, className = '', delay = '' }) {
  const ref = useInView()
  return (
    <div
      ref={ref}
      className={`reveal ${delay} ${className}`}
      style={{ opacity: 0, transform: 'translateY(40px)', transition: 'opacity 0.7s ease, transform 0.7s ease' }}
    >
      {children}
    </div>
  )
}

const features = [
  {
    icon: '🌍',
    title: 'Live Country Data',
    desc: 'Explore real-time data from 250+ countries powered by the REST Countries API.',
  },
  {
    icon: '⚡',
    title: 'Blazing Fast',
    desc: 'Built with Vite and React 18 for instant load times and smooth interactions.',
  },
  {
    icon: '🎨',
    title: 'Modern Design',
    desc: 'Crafted with Tailwind CSS, custom animations, and a dark-first aesthetic.',
  },
  {
    icon: '📱',
    title: 'Fully Responsive',
    desc: 'Pixel-perfect on every device — mobile, tablet, and desktop.',
  },
]

const stats = [
  { value: '250+', label: 'Countries' },
  { value: '8', label: 'Regions' },
  { value: '100+', label: 'Languages' },
  { value: '∞', label: 'Possibilities' },
]

export default function Home() {
  const navigate = useNavigate()

  // Inject in-view style
  useEffect(() => {
    const style = document.createElement('style')
    style.textContent = `.reveal.in-view { opacity: 1 !important; transform: translateY(0) !important; }`
    document.head.appendChild(style)
    return () => document.head.removeChild(style)
  }, [])

  return (
    <main className="bg-background">
      {/* ── Hero ── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-grid">
        {/* Ambient blobs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse-slow pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/15 rounded-full blur-3xl animate-pulse-slow pointer-events-none" style={{ animationDelay: '1.5s' }} />

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium mb-8 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
            Live API Integration · REST Countries
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-7xl font-black leading-tight mb-6 animate-fade-up">
            Explore the{' '}
            <span className="gradient-text">World's Data</span>
            <br />
            Like Never Before
          </h1>

          <p className="text-textSecondary text-lg md:text-xl max-w-2xl mx-auto mb-10 animate-fade-up animate-delay-200">
            A modern, interactive experience powered by real-time APIs. Discover countries,
            cultures, and statistics with beautiful visualizations.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up animate-delay-400">
            <button
              onClick={() => navigate('/explore')}
              className="px-8 py-4 rounded-xl bg-primary text-white font-bold text-lg hover:bg-primary/80 transition-all duration-300 glow-primary hover:scale-105 active:scale-95"
            >
              Explore Data →
            </button>
            <button
              onClick={() => document.getElementById('features').scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 rounded-xl border border-white/10 text-textPrimary font-bold text-lg hover:border-primary/50 hover:bg-primary/5 transition-all duration-300"
            >
              Learn More
            </button>
          </div>

          {/* Floating orb */}
          <div className="mt-20 flex justify-center animate-float">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary to-secondary opacity-20 blur-xl" />
            <div className="absolute w-20 h-20 rounded-full border-2 border-primary/40 animate-spin-slow" style={{ marginTop: '24px' }} />
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-textSecondary text-xs animate-bounce">
          <span>Scroll</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="py-16 border-y border-white/5">
        <div className="max-w-4xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <AnimatedSection key={s.label} delay={`animate-delay-${i * 100 + 100}`} className="text-center">
              <div className="text-4xl font-black gradient-text mb-1">{s.value}</div>
              <div className="text-textSecondary text-sm">{s.label}</div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* ── Features ── */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black mb-4">
              Everything You <span className="gradient-text">Need</span>
            </h2>
            <p className="text-textSecondary text-lg max-w-xl mx-auto">
              Built with modern tools and best practices for a seamless experience.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <AnimatedSection key={f.title} delay={`animate-delay-${i * 100 + 100}`}>
                <div className="bg-card rounded-2xl p-6 border border-white/5 card-hover h-full">
                  <div className="text-4xl mb-4">{f.icon}</div>
                  <h3 className="text-textPrimary font-bold text-lg mb-2">{f.title}</h3>
                  <p className="text-textSecondary text-sm leading-relaxed">{f.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="py-24 px-6">
        <AnimatedSection>
          <div className="max-w-4xl mx-auto rounded-3xl bg-gradient-to-r from-primary/20 to-secondary/20 border border-primary/20 p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-grid opacity-30" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-black mb-4">
                Ready to <span className="gradient-text">Explore?</span>
              </h2>
              <p className="text-textSecondary text-lg mb-8 max-w-xl mx-auto">
                Dive into live country data with search, filter, and beautiful cards.
              </p>
              <button
                onClick={() => navigate('/explore')}
                className="px-10 py-4 rounded-xl bg-primary text-white font-bold text-lg hover:bg-primary/80 transition-all duration-300 glow-primary hover:scale-105 active:scale-95"
              >
                View Data Now →
              </button>
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-white/5 py-8 text-center text-textSecondary text-sm">
        <p>Built with React + Vite + Tailwind CSS · REST Countries API</p>
      </footer>
    </main>
  )
}
