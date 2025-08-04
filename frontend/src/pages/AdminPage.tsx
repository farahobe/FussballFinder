import React, { useEffect, useState } from 'react'

type Location = {
    id: number
    name: string
    city: string
    address: string
    image_url_1?: string
    place_type?: string
}

export default function AdminPage() {
    const [pendingLocations, setPendingLocations] = useState<Location[]>([])

    const fetchPending = async () => {
        const token = localStorage.getItem('token')
        const res = await fetch('/api/admin/pending-locations', {
            headers: { Authorization: `Bearer ${token}` }
        })

        if (res.ok) {
            const data = await res.json()
            setPendingLocations(data)
        } else {
            console.error('Fehler beim Abrufen')
        }
    }

    useEffect(() => {
        fetchPending()
    }, [])

    const approve = async (id: number) => {
        const token = localStorage.getItem('token')
        await fetch(`/api/admin/approve/${id}`, {
            method: 'POST',
            headers: { Authorization: `Bearer ${token}` }
        })
        setPendingLocations(prev => prev.filter(loc => loc.id !== id))
    }

    const reject = async (id: number) => {
        const token = localStorage.getItem('token')
        await fetch(`/api/admin/reject/${id}`, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${token}` }
        })
        setPendingLocations(prev => prev.filter(loc => loc.id !== id))
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Ausstehende Orte</h1>

            {pendingLocations.length === 0 ? (
                <p className="text-gray-500">Keine ausstehenden Vorschläge.</p>
            ) : (
                <div className="space-y-6">
                    {pendingLocations.map(loc => (
                        <div key={loc.id} className="border p-4 rounded-lg shadow-sm">
                            {loc.image_url_1 && (
                                <img
                                    src={loc.image_url_1}
                                    alt={loc.name}
                                    className="w-full h-48 object-cover rounded mb-3"
                                />
                            )}
                            <h2 className="text-xl font-semibold">{loc.name}</h2>
                            <p className="text-gray-600">{loc.city} – {loc.address}</p>
                            <p className="text-sm text-gray-500 mb-4">{loc.place_type}</p>

                            <div className="flex gap-4">
                                <button
                                    onClick={() => approve(loc.id)}
                                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                                >
                                    Genehmigen
                                </button>
                                <button
                                    onClick={() => reject(loc.id)}
                                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                >
                                    Ablehnen
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
