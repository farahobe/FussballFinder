import { FormEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function RegisterPage() {
    const { register } = useAuth()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState<string | null>(null)
    const navigate = useNavigate()

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        setError(null)
        try {
            await register(username, password)
            navigate('/login')
        } catch (err: any) {
            setError(err.response?.data?.error || 'Registrierung fehlgeschlagen')
        }
    }

    return (
        <div className="flex justify-center items-center min-h-[80vh]">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-sm bg-white p-6 rounded-lg shadow"
            >
                <h1 className="text-2xl font-bold mb-4">Registrieren</h1>

                {error && <div className="text-red-500 mb-4">{error}</div>}

                <label className="block mb-2 font-medium">Benutzername</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="w-full mb-4 p-2 border rounded"
                />

                <label className="block mb-2 font-medium">Passwort</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full mb-4 p-2 border rounded"
                />

                <button
                    type="submit"
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded"
                >
                    Registrieren
                </button>

                <p className="mt-4 text-sm text-center">
                    Bereits registriert? <Link to="/login" className="text-blue-500">Zum Login</Link>
                </p>
            </form>
        </div>
    )
}
