
import React from 'react'
import { Link } from 'react-router-dom'
import type { Location } from '../types/Location'

interface Props {
    locations: Location[]
    onMoreClick: () => void
}

export default function PopularPlaces({
                                          locations,
                                          onMoreClick
                                      }: Props): JSX.Element {
    return (
        <section className="py-12 bg-white">
            <div className="max-w-6xl mx-auto px-4">
                <h3 className="text-3xl font-bold mb-8">Beliebte Fußballplätze</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {locations.map(loc => (
                        <Link
                            key={loc.id}
                            to={`/detail/${loc.id}`}
                            className="block bg-gray-100 rounded-xl overflow-hidden shadow hover:shadow-lg transition"
                        >
                            {loc.image_url_1 && (
                                <img
                                    src={loc.image_url_1}
                                    alt={loc.name}
                                    className="w-full h-56 object-cover"
                                />
                            )}
                            <div className="p-6">
                                <div className="flex justify-between items-baseline mb-2">
                                    <h4 className="text-xl font-semibold">{loc.name}</h4>
                                    <span className="text-yellow-500">
                    {'★'.repeat(loc.rating || 0)}
                  </span>
                                </div>
                                <p className="text-gray-600">{loc.place_type}</p>
                            </div>
                        </Link>
                    ))}
                </div>


                <div className="mt-12 text-center">
                    <button
                        onClick={onMoreClick}
                        className="inline-block bg-green-600 text-white px-8 py-3 rounded-full shadow hover:bg-green-700 transition"
                    >
                        Mehr entdecken
                    </button>
                </div>
            </div>
        </section>
    )
}
