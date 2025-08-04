
import React from 'react';
import { Location } from '../types/Location';

interface Props {
    locations: Location[];
    selected: Location | null;
    onSelect: (loc: Location) => void;
}

export default function Sidebar({ locations, selected, onSelect }: Props) {
    return (
        <aside className="w-64 overflow-auto p-4 bg-gray-50 border-r">
            <h2 className="font-bold mb-2">Plätze</h2>
            <ul className="space-y-2">
                {locations.map(loc => (
                    <li
                        key={loc.id}
                        onClick={() => onSelect(loc)}
                        className={`p-2 rounded cursor-pointer ${
                            selected?.id === loc.id ? 'bg-green-200' : 'hover:bg-green-100'
                        }`}
                    >
                        <strong>{loc.name}</strong><br/>
                        <small className="text-gray-600">{loc.city}</small>
                    </li>
                ))}
            </ul>
        </aside>
    );
}
