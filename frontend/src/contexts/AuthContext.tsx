import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'

type User = {
    id: number
    email?: string
    is_admin: boolean
}

interface AuthContextType {
    user: User | null
    token: string | null
    login: (username: string, password: string) => Promise<void>
    register: (username: string, password: string) => Promise<void>
    logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [token, setToken] = useState<string | null>(localStorage.getItem('token'))
    const navigate = useNavigate()

    const parseToken = (token: string): User => {
        const payload = token.split('.')[1]
        const decoded = JSON.parse(atob(payload))
        return {
            id: decoded.id,
            email: decoded.email,
            is_admin: decoded.is_admin || false
        }
    }

    useEffect(() => {
        if (token && !user) {
            try {
                const parsed = parseToken(token)
                setUser(parsed)
            } catch (e) {
                console.error('Token-Parsing-Fehler:', e)
                setUser(null)
                setToken(null)
                localStorage.removeItem('token')
            }
        }
    }, [token])

    const login = async (username: string, password: string) => {
        const res = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        })

        if (!res.ok) {
            const { error } = await res.json()
            throw new Error(error || 'Login fehlgeschlagen')
        }

        const data = await res.json()
        localStorage.setItem('token', data.token)
        setToken(data.token)
        setUser(parseToken(data.token))
        navigate('/')
    }

    const register = async (username: string, password: string) => {
        const res = await fetch('/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        })

        if (!res.ok) {
            const { error } = await res.json()
            throw new Error(error || 'Registrierung fehlgeschlagen')
        }

        const data = await res.json()
        localStorage.setItem('token', data.token)
        setToken(data.token)
        setUser(parseToken(data.token))
        navigate('/')
    }

    const logout = () => {
        setUser(null)
        setToken(null)
        localStorage.removeItem('token')
        navigate('/')
    }

    return (
        <AuthContext.Provider value={{ user, token, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth(): AuthContextType {
    const ctx = useContext(AuthContext)
    if (!ctx) throw new Error('useAuth muss innerhalb eines AuthProvider genutzt werden')
    return ctx
}
