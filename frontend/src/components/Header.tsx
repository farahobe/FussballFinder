import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function Header() {
    const { user, logout } = useAuth()

    return (
        <header className="fixed top-0 left-0 right-0 h-16 bg-white shadow z-50">
            <div className="max-w-6xl mx-auto h-full flex items-center justify-between px-4">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 text-2xl font-bold">
                    <img src="/football-pin.png" alt="Logo" className="w-8 h-8" />
                    Finder
                </Link>

                {/* Navigation */}
                <div className="flex items-center gap-4">
                    <Link to="/" className="hover:text-green-600">Home</Link>
                    <Link to="/orte" className="hover:text-green-600">Orte</Link>

                    {user && (
                        <>
                            <Link to="/vorschlagen" className="hover:text-green-600">
                                Vorschlagen
                            </Link>

                            {user.is_admin && (
                                <Link to="/admin" className="text-red-600 font-semibold hover:underline">
                                    Admin
                                </Link>
                            )}
                        </>
                    )}

                    {/* Login / Logout */}
                    {user ? (
                        <button
                            onClick={logout}
                            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
                        >
                            Logout
                        </button>
                    ) : (
                        <Link
                            to="/login"
                            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
                        >
                            Login
                        </Link>
                    )}
                </div>
            </div>
        </header>
    )
}
