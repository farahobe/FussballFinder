
export interface Location {
    id: number
    name: string
    city?: string
    rating?: number
    size?: string
    latitude?: number
    longitude?: number
    address?: string
    opening_hours?: string
    image_url_1?: string
    image_url_2?: string
    place_type?: string
    tribune?: 0 | 1
    barrier_free?: 0 | 1
    cost_type?: string
    parking?: 0 | 1
    quality?: string
    is_favorite?: boolean
}
