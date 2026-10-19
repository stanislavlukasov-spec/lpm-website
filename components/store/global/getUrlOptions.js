import { fromUrl } from './filtersTransformer'

export const FILTER_PAGE_NUMBER = 'pageNumber'

export default function getUrlOptions() {
    let url = {}
    let filters = {}
    let id = ""
    let recentPropertiesType = ""

    if (typeof window !== "undefined") {
        url = new URL(window.location)
        
        id = url.searchParams.get('id')
        recentPropertiesType = url.searchParams.get('recentPropertiesType')

        const saleRent = url.searchParams.get('saleRent') || ""
        const pageNumber = url.searchParams.get(FILTER_PAGE_NUMBER) || ""
        const district = url.searchParams.get('district') || ""
        const bedrooms = url.searchParams.get('bedrooms') || ""
        const bathrooms = url.searchParams.get('bathrooms') || ""
        const type = url.searchParams.get('type') || ""
        const area = url.searchParams.get('area') || ""
        const subType = url.searchParams.get('subType') || ""
        const storeys = url.searchParams.get('storeys') || ""
        const price = url.searchParams.get('price') || ""
        const livingSpace = url.searchParams.get('livingSpace') || ""
        const totalArea = url.searchParams.get('totalArea') || ""
        const distanceToTheSea = url.searchParams.get('distanceToTheSea') || ""
        const pool = url.searchParams.get('pool') || ""
        const newBuild = url.searchParams.get('newBuild') || ""
        const openFilters = url.searchParams.get('openFilters') || ""
    
        if(saleRent) filters.saleRent = saleRent
        if(pageNumber) filters.pageNumber = pageNumber
        if(district) filters.district = district
        if(bedrooms) filters.bedrooms = bedrooms
        if(bathrooms) filters.bathrooms = bathrooms
        if(type) filters.type = type
        if(area) filters.area = area
        if(subType) filters.subType = subType
        if(storeys) filters.storeys = storeys
        if(price) filters.price = price
        if(livingSpace) filters.livingSpace = livingSpace
        if(totalArea) filters.totalArea = totalArea
        if(distanceToTheSea) filters.distanceToTheSea = distanceToTheSea
        if(pool) filters.pool = pool
        if(newBuild) filters.newBuild = newBuild
        if(openFilters) filters.openFilters = openFilters
    }

    return {
        id,
        recentPropertiesType,
        filters: fromUrl(filters)
    }
}