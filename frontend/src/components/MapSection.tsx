
import React, { useState } from 'react'
import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    useMap,
    CircleMarker
} from 'react-leaflet'
import L from 'leaflet'
import type { Location } from '../types/Location'
import 'leaflet/dist/leaflet.css'

const icon = L.icon({
    iconUrl: '/football-pin.png',
    iconSize: [40, 56],
    iconAnchor: [20, 56],
    popupAnchor: [0, -50],
})

function CenterMap({ center }: { center: [number, number] }) {
    const map = useMap()
    map.setView(center, map.getZoom(), { animate: true })
    return null
}

interface Props {
    locations: Location[]
    selected: Location | null
    onSelect: (loc: Location) => void
}

export default function MapSection({ locations, selected, onSelect }: Props) {
    const defaultCenter: [number, number] = [49.9917, 8.2473]
    const center: [number, number] = selected
        ? [selected.latitude!, selected.longitude!]
        : defaultCenter

    const [userPos, setUserPos] = useState<[number, number] | null>(null)

    const locateMe = () => {
        if (!navigator.geolocation) {
            alert('Geolocation wird von Deinem Browser nicht unterstützt.')
            return
        }
        navigator.geolocation.getCurrentPosition(
            pos => {
                setUserPos([pos.coords.latitude, pos.coords.longitude])
            },
            () => {
                alert('Standort konnte nicht ermittelt werden.')
            }
        )
    }

    return (
        <div className="relative w-full" style={{ height: '500px' }}>
            <MapContainer
                className="w-full h-full"
                center={center}
                zoom={13}
                scrollWheelZoom
            >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                {selected && <CenterMap center={center} />}
                {locations.map(loc =>
                    loc.latitude && loc.longitude ? (
                        <Marker
                            key={loc.id}
                            position={[loc.latitude, loc.longitude]}
                            icon={icon}
                            eventHandlers={{ click: () => onSelect(loc) }}
                        >
                            <Popup>
                                <strong>{loc.name}</strong><br />{loc.city}
                            </Popup>
                        </Marker>
                    ) : null
                )}
                {userPos && (
                    <>
                        <CenterMap center={userPos} />
                        <CircleMarker
                            center={userPos}
                            radius={8}
                            pathOptions={{ color: '#1E40AF', fillColor: '#60A5FA', fillOpacity: 0.8 }}
                        >
                            <Popup>Du bist hier</Popup>
                        </CircleMarker>
                    </>
                )}
            </MapContainer>


            <button
                onClick={locateMe}
                title="Zu meinem Standort"
                className="absolute bottom-5 right-4 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg z-[9999] transition"
            >
                📍
            </button>
        </div>
    )
}
