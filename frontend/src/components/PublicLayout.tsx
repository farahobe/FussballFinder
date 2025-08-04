
import React from 'react'
import Header from './Header'

export default function PublicLayout({
                                         children,
                                     }: {
    children: React.ReactNode
}): JSX.Element {
    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <Header />
            <main className="flex-1">{children}</main>
        </div>
    )
}
