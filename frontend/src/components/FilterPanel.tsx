import React, { useState, useRef, useEffect } from 'react'
import type { Filters } from '../types/Filters'
import type { Location } from '../types/Location'

interface Props {
    filters: Filters
    setFilters: React.Dispatch<React.SetStateAction<Filters>>
    allLocations: Location[]
}

export default function FilterPanel({
                                        filters,
                                        setFilters,
                                        allLocations
                                    }: Props) {
    const [openFilters, setOpenFilters] = useState(false)
    const [suggestions, setSuggestions] = useState<string[]>([])
    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        const q = filters.search.trim().toLowerCase()
        if (!q) return setSuggestions([])
        const matches = allLocations
            .map(loc => loc.name)
            .filter(name => name.toLowerCase().startsWith(q))
            .slice(0, 5)
        setSuggestions(matches)
    }, [filters.search, allLocations])

    const pick = (name: string) => {
        setFilters(f => ({ ...f, search: name }))
        setSuggestions([])
        inputRef.current?.focus()
    }

    return (
        <section
            id="filter-panel"
            className="bg-white p-4 sm:p-6 md:p-8 shadow-inner mb-6 relative scroll-mt-20"
        >
            <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-4">
                {/* Suchfeld */}
                <div className="flex-1 relative">
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder="Stadt, Verein oder Stadtteil..."
                        className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-200"
                        value={filters.search}
                        onChange={e => setFilters(f => ({ ...f, search: e.target.value }))}
                    />
                    {suggestions.length > 0 && (
                        <ul className="absolute top-full left-0 right-0 bg-white border rounded-b-lg shadow max-h-48 overflow-auto z-20">
                            {suggestions.map((name, idx) => (
                                <li
                                    key={idx}
                                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                    onMouseDown={() => pick(name)}
                                >
                                    {name}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* Toggle-Button */}
                <button
                    onClick={() => setOpenFilters(v => !v)}
                    className="px-4 py-2 border rounded-lg"
                >
                    Filter ▾
                </button>
            </div>

            {/* Erweiterte Filterfelder */}
            {openFilters && (
                <div className="max-w-6xl mx-auto mt-4">
                    {/* Selectfelder */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                        <select
                            value={filters.size}
                            onChange={e =>
                                setFilters(f => ({ ...f, size: e.target.value }))
                            }
                            className="border rounded-lg px-3 py-2"
                        >
                            <option value="">Größe</option>
                            <option value="groß">Groß</option>
                            <option value="mittel">Mittel</option>
                            <option value="klein">Klein</option>
                        </select>

                        <select
                            value={filters.rating}
                            onChange={e =>
                                setFilters(f => ({ ...f, rating: e.target.value }))
                            }
                            className="border rounded-lg px-3 py-2"
                        >
                            <option value="">Bewertung</option>
                            <option value="5">★★★★★</option>
                            <option value="4">★★★★</option>
                            <option value="3">★★★</option>
                            <option value="2">★★</option>
                            <option value="1">★</option>
                        </select>

                        <select
                            value={filters.cost}
                            onChange={e =>
                                setFilters(f => ({ ...f, cost: e.target.value }))
                            }
                            className="border rounded-lg px-3 py-2"
                        >
                            <option value="">Kosten</option>
                            <option value="kostenlos">Kostenlos</option>
                            <option value="Gebühren">Gebühren</option>
                            <option value="Mitgliedschaft">Mitgliedschaft</option>
                        </select>
                    </div>

                    {/* Checkboxen */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        <label className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={filters.barrierFree}
                                onChange={e =>
                                    setFilters(f => ({
                                        ...f,
                                        barrierFree: e.target.checked
                                    }))
                                }
                            />
                            Barrierefrei
                        </label>

                        <label className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={filters.parking}
                                onChange={e =>
                                    setFilters(f => ({
                                        ...f,
                                        parking: e.target.checked
                                    }))
                                }
                            />
                            Parkplätze
                        </label>

                        <label className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={filters.tribune}
                                onChange={e =>
                                    setFilters(f => ({
                                        ...f,
                                        tribune: e.target.checked
                                    }))
                                }
                            />
                            Mit Tribüne
                        </label>
                    </div>
                </div>
            )}
        </section>
    )
}
