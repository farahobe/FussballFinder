import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

export default function RateLocation() {
    const { id } = useParams()
    const [rating, setRating] = useState(0)
    const [message, setMessage] = useState('')
    const [alreadyRated, setAlreadyRated] = useState(false)

    const rawToken = localStorage.getItem('token')
    const token = rawToken && rawToken !== 'null' ? rawToken : null

    useEffect(() => {
        const checkExistingRating = async () => {
            if (!token || !id) return

            try {
                const res = await fetch('/api/user/rating', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })

                if (!res.ok) return

                const data = await res.json()
                const found = data.find((entry: any) => Number(entry.location_id) === Number(id))

                if (found) {
                    setAlreadyRated(true)
                    setRating(found.rating)
                    setMessage(`Du hast diesen Ort bereits mit ${found.rating} Sternen bewertet.`)
                }
            } catch (err) {
                console.error('Fehler beim Prüfen bestehender Bewertung:', err)
            }
        }

        checkExistingRating()
    }, [id, token])

    if (!token) {
        return <p className="text-center text-gray-500">Bitte melde dich an, um zu bewerten.</p>
    }

    if (!id || isNaN(Number(id))) {
        return <p className="text-center text-red-500">Fehlerhafte Orts-ID.</p>
    }

    const handleRate = async (value: number) => {
        setRating(value)
        setMessage('')

        try {
            const res = await fetch('/api/user/rating', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    locationId: Number(id),
                    rating: value
                })
            })

            const result = await res.json()

            if (!res.ok) {
                setMessage(result.error || 'Fehler beim Speichern')
                return
            }

            setAlreadyRated(true)
            setMessage('Bewertung gespeichert!')
        } catch (err: any) {
            setMessage(err.message || 'Fehler beim Speichern')
        }
    }

    return (
        <div className="max-w-md mx-auto mt-10 text-center">
            <h2 className="text-2xl font-bold mb-4">Bewerte diesen Ort</h2>

            {alreadyRated ? (
                <p className="text-green-600">{message}</p>
            ) : (
                <>
                    <div className="flex justify-center mb-4">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                onClick={() => handleRate(star)}
                                className={`text-3xl ${rating >= star ? 'text-yellow-400' : 'text-gray-400'}`}
                            >
                                ★
                            </button>
                        ))}
                    </div>
                    {message && <p className="text-green-600">{message}</p>}
                </>
            )}
        </div>
    )
}
