import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import type { Location } from '../types/Location'
import RateLocation from './RateLocation'
import FavoriteButton from '../components/FavoriteButton'

export default function DetailPage(): JSX.Element {
    const { id } = useParams<{ id: string }>()
    const [loc, setLoc] = useState<Location | null>(null)

    useEffect(() => {
        const fetchLocation = async () => {
            try {
                const token = localStorage.getItem('token')
                const res = await fetch(`/api/locations/${id}`, {
                    headers: token ? { Authorization: `Bearer ${token}` } : {}
                })

                if (!res.ok) {
                    setLoc(null)
                    return
                }

                const data: Location = await res.json()
                setLoc(data)
            } catch (err) {
                console.error(err)
                setLoc(null)
            }
        }

        fetchLocation()
    }, [id])

    if (!loc) {
        return (
            <div className="flex flex-col min-h-screen bg-gray-50">
                <Header />
                <main className="flex-1 flex items-center justify-center">
                    <p className="text-gray-500">Ort nicht gefunden.</p>
                </main>
                <Footer />
            </div>
        )
    }

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <Header />

            <section className="bg-green-50 py-12">
                <h1 className="text-5xl font-extrabold text-center text-gray-800">
                    {loc.name}
                </h1>
            </section>

            <main className="flex-1 max-w-5xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
                {loc.image_url_1 && (
                    <div className="rounded-2xl overflow-hidden shadow-lg">
                        <img
                            src={loc.image_url_1}
                            alt={loc.name}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                    </div>
                )}

                <div className="space-y-6">
                    <ul className="space-y-4">
                        <li><span className="font-semibold">Stadt:</span> {loc.city}</li>
                        <li><span className="font-semibold">Rating:</span>{' '}
                            <span className="text-yellow-500">{'★'.repeat(loc.rating || 0)}</span>
                        </li>
                        <li><span className="font-semibold">Typ:</span> {loc.place_type}</li>
                        <li><span className="font-semibold">Tribüne:</span> {loc.tribune ? '✓ Ja' : '✕ Nein'}</li>
                        <li><span className="font-semibold">Barrierefrei:</span> {loc.barrier_free ? '✓ Ja' : '✕ Nein'}</li>
                        <li><span className="font-semibold">Parkplätze:</span> {loc.parking ? '✓ Ja' : '✕ Nein'}</li>
                        <li><span className="font-semibold">Kosten:</span> {loc.cost_type}</li>
                        <li><span className="font-semibold">Adresse:</span> {loc.address}</li>
                        <li><span className="font-semibold">Öffnungszeiten:</span> {loc.opening_hours}</li>
                    </ul>

                    <FavoriteButton locationId={loc.id} isInitiallyFavorite={loc.is_favorite} />

                    <div>
                        <Link
                            to="/orte"
                            className="inline-block bg-green-600 text-white px-6 py-2 rounded-full shadow hover:bg-green-700 transition"
                        >
                            ← Zurück zur Übersicht
                        </Link>
                    </div>
                </div>
            </main>

            <section className="bg-white border-t py-8">
                <RateLocation />
            </section>

            <Footer />
        </div>
    )
}
