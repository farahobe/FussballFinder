import React, { useEffect, useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Hero from '../components/Hero'
import FilterPanel from '../components/FilterPanel'
import MapSection from '../components/MapSection'
import PopularPlaces from '../components/PopularPlaces'
import Footer from '../components/Footer'
import type { Location } from '../types/Location'
import type { Filters } from '../types/Filters'

const initialFilters: Filters = {
    search: '',
    size: '',
    type: '',
    rating: '',
    cost: '',
    tribune: false,
    barrierFree: false,
    parking: false,
    onlyWithImage: false,
}

export default function Home(): JSX.Element {
    const [locations, setLocations] = useState<Location[]>([])
    const [filtered, setFiltered] = useState<Location[]>([])
    const [filters, setFilters] = useState<Filters>(initialFilters)
    const [selected, setSelected] = useState<Location | null>(null)
    const navigate = useNavigate()

    useEffect(() => {
        fetch('/api/locations')
            .then(r => r.json())
            .then((data: Location[]) => {
                setLocations(data)
                setFiltered(data)
            })
            .catch(console.error)
    }, [])

    useEffect(() => {
        const result = locations.filter(loc => {
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
        setFiltered(result)
    }, [filters, locations])

    const popularPlaces = useMemo(
        () =>
            [...locations]
                .filter(loc => typeof loc.rating === 'number')
                .sort((a, b) => b.rating! - a.rating!)
                .slice(0, 3),
        [locations]
    )

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <Header />
            <Hero />

            <FilterPanel
                filters={filters}
                setFilters={setFilters}
                allLocations={locations}
            />

            <section className="px-4 sm:px-6 md:px-8 lg:px-16 mb-10">
                <div
                    id="map-section"
                    className="sticky top-20 z-10 mx-auto w-full max-w-6xl h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh] border-2 border-gray-200 rounded-lg overflow-hidden bg-white"
                >
                    <MapSection
                        locations={filtered}
                        selected={selected}
                        onSelect={setSelected}
                    />
                </div>
            </section>

            <PopularPlaces
                locations={popularPlaces}
                onMoreClick={() => navigate('/orte')}
            />

            <Footer />
        </div>)
}
