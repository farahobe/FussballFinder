import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'

export default function Vorschlagen() {
    const { token } = useAuth() as any // Falls du `token` wieder hinzufügst

    const [form, setForm] = useState({
        name: '',
        city: '',
        size: '',
        latitude: '',
        longitude: '',
        address: '',
        opening_hours: '',
        image_url_1: '',
        image_url_2: '',
        place_type: 'Rasen',
        tribune: false,
        barrier_free: false,
        cost_type: 'kostenlos',
        parking: false,
        quality: 'normal',
    })

    const [message, setMessage] = useState('')

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const { name, value, type } = e.target

        const newValue =
            type === 'checkbox'
                ? (e.target as HTMLInputElement).checked
                : value

        setForm(prev => ({ ...prev, [name]: newValue }))
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setMessage('')
        try {
            const res = await fetch('/api/user/locations', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(form)
            })

            if (!res.ok) throw new Error('Fehler beim Speichern')
            setMessage('Ort erfolgreich vorgeschlagen!')
        } catch (err: any) {
            setMessage(err.message || 'Fehler beim Speichern')
        }
    }

    return (
        <div className="max-w-xl mx-auto mt-8">
            <h2 className="text-2xl font-bold mb-4">Neuen Ort vorschlagen</h2>
            {message && <p className="mb-4 text-green-600">{message}</p>}
            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
                <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="input" />
                <input name="city" value={form.city} onChange={handleChange} placeholder="Stadt" className="input" />
                <select name="size" value={form.size} onChange={handleChange} className="input">
                    <option value="">Größe auswählen</option>
                    <option value="Klein">Klein</option>
                    <option value="Mittel">Mittel</option>
                    <option value="Groß">Groß</option>
                </select>
                <input name="latitude" value={form.latitude} onChange={handleChange} placeholder="Breitengrad" className="input" />
                <input name="longitude" value={form.longitude} onChange={handleChange} placeholder="Längengrad" className="input" />
                <input name="address" value={form.address} onChange={handleChange} placeholder="Adresse" className="input" />
                <input name="opening_hours" value={form.opening_hours} onChange={handleChange} placeholder="Öffnungszeiten" className="input" />
                <input name="image_url_1" value={form.image_url_1} onChange={handleChange} placeholder="Bild-URL" className="input" />
                <input name="image_url_2" value={form.image_url_2} onChange={handleChange} placeholder="Zweite Bild-URL" className="input" />
                <select name="place_type" value={form.place_type} onChange={handleChange} className="input">
                    <option value="Rasen">Rasen</option>
                    <option value="Kunstrasen">Kunstrasen</option>
                    <option value="Asche">Asche</option>
                    <option value="Halle">Halle</option>
                    <option value="Kleinfeld">Kleinfeld</option>
                </select>
                <label><input type="checkbox" name="tribune" checked={form.tribune} onChange={handleChange} /> Tribüne</label>
                <label><input type="checkbox" name="barrier_free" checked={form.barrier_free} onChange={handleChange} /> Barrierefrei</label>
                <label><input type="checkbox" name="parking" checked={form.parking} onChange={handleChange} /> Parkplatz</label>
                <select name="cost_type" value={form.cost_type} onChange={handleChange} className="input">
                    <option value="kostenlos">Kostenlos</option>
                    <option value="Gebühren">Gebühren</option>
                    <option value="Mitgliedschaft">Mitgliedschaft</option>
                </select>
                <select name="quality" value={form.quality} onChange={handleChange} className="input">
                    <option value="einfach">einfach</option>
                    <option value="normal">normal</option>
                    <option value="Premium">Premium</option>
                </select>
                <button className="bg-green-600 text-white py-2 rounded">Vorschlagen</button>
            </form>
        </div>
    )
}
