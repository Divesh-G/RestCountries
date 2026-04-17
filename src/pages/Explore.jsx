import { useState, useEffect, useMemo } from 'react'

const REGIONS = ['All', 'Africa', 'Americas', 'Asia', 'Europe', 'Oceania']

function Skeleton() {
  return (
    <div className="bg-card rounded-2xl overflow-hidden border border-white/5 animate-pulse">
      <div className="h-40 bg-white/5" />
      <div className="p-5 space-y-3">
        <div className="h-4 bg-white/10 rounded w-3/4" />
        <div className="h-3 bg-white/5 rounded w-1/2" />
        <div className="h-3 bg-white/5 rounded w-2/3" />
      </div>
    </div>
  )
}

function CountryCard({ country }) {
  const name = country.name?.common ?? 'Unknown'
  const capital = country.capital?.[0] ?? 'N/A'
  const population = country.population?.toLocaleString() ?? 'N/A'
  const region = country.region ?? 'N/A'
  const flag = country.flags?.svg ?? country.flags?.png ?? ''
  const currency = Object.values(country.currencies ?? {})[0]?.name ?? 'N/A'
  const languages = Object.values(country.languages ?? {}).slice(0, 2).join(', ') || 'N/A'

  return (
    <div className="bg-card rounded-2xl overflow-hidden border border-white/5 card-hover group cursor-pointer">
      {/* Flag */}
      <div className="relative h-40 overflow-hidden bg-background/50">
        <img
          src={flag}
          alt={`${name} flag`}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
        <span className="absolute bottom-3 left-3 text-xs font-semibold px-2 py-1 rounded-full bg-primary/80 text-white">
          {region}
        </span>
      </div>

      {/* Info */}
      <div className="p-5">
        <h3 className="text-textPrimary font-bold text-lg mb-3 truncate">{name}</h3>
        <div className="space-y-1.5 text-sm">
          {[
            ['🏛️', 'Capital', capital],
            ['👥', 'Population', population],
            ['💰', 'Currency', currency],
            ['🗣️', 'Languages', languages],
          ].map(([icon, label, val]) => (
            <div key={label} className="flex items-center gap-2">
              <span>{icon}</span>
              <span className="text-textSecondary">{label}:</span>
              <span className="text-textPrimary truncate">{val}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Explore() {
  const [countries, setCountries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState('')
  const [region, setRegion] = useState('All')
  const [sortBy, setSortBy] = useState('name')

  useEffect(() => {
    const controller = new AbortController()
    setLoading(true)
    setError(null)

    fetch('https://restcountries.com/v3.1/all?fields=name,capital,population,region,flags,currencies,languages', {
      signal: controller.signal,
    })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })
      .then((data) => {
        setCountries(data)
        setLoading(false)
      })
      .catch((err) => {
        if (err.name !== 'AbortError') {
          setError(err.message)
          setLoading(false)
        }
      })

    return () => controller.abort()
  }, [])

  const filtered = useMemo(() => {
    let list = countries
    if (region !== 'All') list = list.filter((c) => c.region === region)
    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter(
        (c) =>
          c.name?.common?.toLowerCase().includes(q) ||
          c.capital?.[0]?.toLowerCase().includes(q)
      )
    }
    return [...list].sort((a, b) => {
      if (sortBy === 'name') return (a.name?.common ?? '').localeCompare(b.name?.common ?? '')
      if (sortBy === 'population') return (b.population ?? 0) - (a.population ?? 0)
      return 0
    })
  }, [countries, search, region, sortBy])

  return (
    <main className="min-h-screen bg-background pt-24 pb-16 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl md:text-6xl font-black mb-3">
            World <span className="gradient-text">Explorer</span>
          </h1>
          <p className="text-textSecondary text-lg">
            {loading ? 'Loading countries…' : `${filtered.length} of ${countries.length} countries`}
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-col md:flex-row gap-4 mb-10">
          {/* Search */}
          <div className="relative flex-1">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-textSecondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search by country or capital…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-card border border-white/10 text-textPrimary placeholder-textSecondary focus:outline-none focus:border-primary/60 transition-colors"
            />
          </div>

          {/* Region Filter */}
          <select
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className="px-4 py-3 rounded-xl bg-card border border-white/10 text-textPrimary focus:outline-none focus:border-primary/60 transition-colors cursor-pointer"
          >
            {REGIONS.map((r) => (
              <option key={r} value={r}>{r === 'All' ? 'All Regions' : r}</option>
            ))}
          </select>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-3 rounded-xl bg-card border border-white/10 text-textPrimary focus:outline-none focus:border-primary/60 transition-colors cursor-pointer"
          >
            <option value="name">Sort: A–Z</option>
            <option value="population">Sort: Population</option>
          </select>
        </div>

        {/* Region Pills */}
        <div className="flex flex-wrap gap-2 mb-10">
          {REGIONS.map((r) => (
            <button
              key={r}
              onClick={() => setRegion(r)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                region === r
                  ? 'bg-primary text-white glow-primary'
                  : 'bg-card border border-white/10 text-textSecondary hover:border-primary/40 hover:text-textPrimary'
              }`}
            >
              {r}
            </button>
          ))}
        </div>

        {/* Error */}
        {error && (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <div className="text-6xl">⚠️</div>
            <h2 className="text-2xl font-bold text-textPrimary">Failed to load data</h2>
            <p className="text-textSecondary">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 rounded-xl bg-primary text-white font-semibold hover:bg-primary/80 transition-colors"
            >
              Retry
            </button>
          </div>
        )}

        {/* Loading Skeletons */}
        {loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 12 }).map((_, i) => <Skeleton key={i} />)}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <div className="text-6xl">🔍</div>
            <h2 className="text-2xl font-bold text-textPrimary">No countries found</h2>
            <p className="text-textSecondary">Try a different search or region filter.</p>
            <button
              onClick={() => { setSearch(''); setRegion('All') }}
              className="px-6 py-3 rounded-xl bg-primary text-white font-semibold hover:bg-primary/80 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Grid */}
        {!loading && !error && filtered.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filtered.map((country) => (
              <CountryCard key={country.name?.common} country={country} />
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
