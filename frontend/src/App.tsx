import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import OrtePage from './pages/OrtePage'
import DetailPage from './pages/DetailPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import Vorschlagen from './pages/Vorschlagen'
import RateLocation from './pages/RateLocation'
import AdminPage from "./pages/AdminPage";

export default function App() {
    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <Header />
            <main className="flex-1 pt-16">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/orte" element={<OrtePage />} />
                    <Route path="/detail/:id" element={<DetailPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/vorschlagen" element={<Vorschlagen />} />
                    <Route path="/rate/:id" element={<RateLocation />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                    <Route path="/admin" element={<AdminPage />} />
                </Routes>
            </main>
        </div>
    )
}
