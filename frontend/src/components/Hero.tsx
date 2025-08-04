import React from 'react'

export default function Hero(): JSX.Element {
    const handleStart = () => {
        const filterEl = document.getElementById('filter-panel')
        if (filterEl) {
            filterEl.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
    }

    return (
        <section className="bg-green-50 py-12 sm:py-16 md:py-24 lg:py-32 text-center px-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4">
                Entdecke Fußballplätze in deiner Umgebung!
            </h1>
            <p className="text-gray-700 mb-8 max-w-xl mx-auto text-base sm:text-lg md:text-xl">
                Finde Plätze, vergleiche Bewertungen und leg direkt los.
            </p>
            <button
                onClick={handleStart}
                className="bg-green-600 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-full text-base sm:text-lg font-medium hover:bg-green-700 transition"
            >
                Loslegen
            </button>
        </section>
    )
}
