import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import FilterPanel from '../components/FilterPanel'
import Footer from '../components/Footer'
import type { Location } from '../types/Location'

export default function OrtePage(): JSX.Element {
    const [locations, setLocations] = useState<Location[]>([])
    const [filtered, setFiltered] = useState<Location[]>([])
    const [filters, setFilters] = useState({
        search: '',
        size: '',
        type: '',
        rating: '',
        cost: '',
        tribune: false,
        barrierFree: false,
        parking: false,
        onlyWithImage: false,
    })

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token')

            const headers: HeadersInit = {
                'Content-Type': 'application/json',
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
            }

            try {
                const res = await fetch('/api/locations', { headers })

                if (!res.ok) {
                    console.error('Fehler beim Laden der Orte:', res.status)
                    return
                }

                const data: Location[] = await res.json()

                // Favoriten nach oben sortieren
                data.sort((a, b) => (b.is_favorite ? 1 : 0) - (a.is_favorite ? 1 : 0))

                setLocations(data)
                setFiltered(data)
            } catch (error) {
                console.error('Fehler beim Abrufen:', error)
            }
        }

        fetchData()
    }, [])


    useEffect(() => {
        const res = locations.filter(loc => {
            if (
                filters.search &&
                !(
                    loc.name.toLowerCase().includes(filters.search.toLowerCase()) ||
                    loc.city?.toLowerCase().includes(filters.search.toLowerCase())
                )
            ) return false

            if (filters.size && loc.size !== filters.size) return false
            if (filters.type && loc.place_type !== filters.type) return false
            if (filters.rating && String(loc.rating) !== filters.rating) return false
            if (filters.cost && loc.cost_type !== filters.cost) return false
            if (filters.tribune && !loc.tribune) return false
            if (filters.barrierFree && !loc.barrier_free) return false
            if (filters.parking && !loc.parking) return false
            if (filters.onlyWithImage && !loc.image_url_1) return false

            return true
        })

        setFiltered(res)
    }, [filters, locations])

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <Header />

            <section className="bg-green-50 py-12 text-center">
                <h1 className="text-4xl font-extrabold">Orte</h1>
            </section>

            <div className="sticky top-[72px] z-20 bg-white border-b border-gray-200">
                <div className="max-w-6xl mx-auto py-4 px-4 md:px-0">
                    <FilterPanel
                        filters={filters}
                        setFilters={setFilters}
                        allLocations={locations}
                    />
                </div>
            </div>

            <main className="flex-1 max-w-6xl mx-auto px-4 py-8">
                {filtered.length === 0 ? (
                    <p className="text-center text-gray-500">Keine Orte gefunden.</p>
                ) : (
                    <div
                        id="map-section"
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {filtered.map(loc => (
                            <Link
                                key={loc.id}
                                to={`/detail/${loc.id}`}
                                className={`group block bg-white rounded-2xl border ${loc.is_favorite ? 'border-yellow-400' : 'border-gray-100'} shadow-sm hover:shadow-lg transform hover:-translate-y-1 transition p-4 min-h-[350px] flex flex-col`}
                            >
                                {loc.image_url_1 && (
                                    <img
                                        src={loc.image_url_1}
                                        alt={loc.name}
                                        className="w-full h-48 object-cover rounded-lg mb-4"
                                    />
                                )}
                                <h2 className="font-semibold text-xl mb-1 group-hover:text-green-600 transition">
                                    {loc.name}
                                </h2>
                                <p className="text-gray-600 mb-2">{loc.city}</p>
                                {!!loc.is_favorite && <p className="text-yellow-500 text-sm">★ Favorit</p>}
                                <div className="mt-auto flex items-center justify-between">
                                    <span className="text-yellow-500">
                                        {'★'.repeat(loc.rating || 0)}
                                    </span>
                                    <span className="text-sm text-gray-500">
                                        {loc.place_type}
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </main>

            <Footer />
        </div>
    )
}