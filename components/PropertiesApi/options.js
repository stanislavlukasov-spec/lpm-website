import jwt from 'jsonwebtoken'

export const URL = process.env.NEXT_PUBLIC_API_PROPERTIES_URL
export const RECENT_PROPERTIES_URL = 'recent-properties'
export const SEARCH_PROPERTIES_URL = 'search-properties'
export const PROPERTIES_YOU_MAY_LIKE_URL = 'properties-you-may-like'
export const PROPERTY_URL = 'property'

export const PROPERTIES_AUTH_TOKEN = jwt.sign({ 
    API_PROPERTIES_SECRET_KEY: process.env.NEXT_PUBLIC_API_PROPERTIES_SECRET_KEY,
    API_PROPERTIES_ACCESS_KEY: process.env.NEXT_PUBLIC_API_PROPERTIES_ACCESS_KEY 
}, process.env.NEXT_PUBLIC_API_PROPERTIES_JWT_SECRET);

export const HEADERS = {
    'x-api-key': process.env.NEXT_PUBLIC_API_PROPERTIES_API_KEY,
    'Authorization': PROPERTIES_AUTH_TOKEN
}