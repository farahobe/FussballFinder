// src/pages/LoginPage.tsx
import { FormEvent, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function LoginPage() {
    const { login } = useAuth()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState<string|null>(null)

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        try {
            await login(username, password)
        } catch (err: any) {
            setError(err.message)
        }
    }

    return (
        <div className="flex justify-center items-center min-h-[80vh]">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-sm bg-white p-6 rounded-lg shadow"
            >
                <h1 className="text-2xl font-bold mb-4">Anmelden</h1>
                {error && <div className="text-red-500 mb-4">{error}</div>}

                <label className="block mb-2">
                    Benutzername
                    <input
                        type="text"
                        className="w-full border px-3 py-2 rounded mt-1"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />
                </label>

                <label className="block mb-4">
                    Passwort
                    <input
                        type="password"
                        className="w-full border px-3 py-2 rounded mt-1"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </label>

                <button
                    type="submit"
                    className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
                >
                    Einloggen
                </button>

                <p className="mt-4 text-center text-sm">
                    Noch keinen Account?{' '}
                    <Link to="/register" className="text-green-600 hover:underline">
                        Registrieren
                    </Link>
                </p>
            </form>
        </div>
    )
}
