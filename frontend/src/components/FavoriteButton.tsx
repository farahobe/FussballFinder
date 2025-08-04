import React, { useState } from 'react'

type Props = {
    locationId: number
    isInitiallyFavorite?: boolean
}

export default function FavoriteButton({ locationId, isInitiallyFavorite }: Props) {
    const [isFavorite, setIsFavorite] = useState<boolean>(isInitiallyFavorite ?? false)
    const [message, setMessage] = useState('')

    const token = localStorage.getItem('token')

    const toggleFavorite = async () => {
        if (!token) return

        try {
            let res
            if (isFavorite) {
                // DELETE mit locationId in der URL
                res = await fetch(`/api/user/favorites/${locationId}`, {
                    method: 'DELETE',
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
            } else {
                // POST mit locationId im Body
                res = await fetch(`/api/user/favorites`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({ locationId })
                })
            }

            if (!res.ok) throw new Error('Fehler beim Aktualisieren')

            setIsFavorite(!isFavorite)
            setMessage(isFavorite ? 'Aus Favoriten entfernt' : 'Zu Favoriten hinzugefügt')
        } catch (err: any) {
            setMessage(err.message)
        }
    }


    return (
        <div className="mt-4">
            <button
                onClick={toggleFavorite}
                className={`px-6 py-2 rounded-full shadow text-white transition 
                    ${isFavorite ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-600 hover:bg-blue-700'}`}
            >
                {isFavorite ? 'Aus Favoriten entfernen' : 'Zu Favoriten hinzufügen'}
            </button>
            {message && <p className="mt-2 text-sm text-gray-600">{message}</p>}
        </div>
    )
}
