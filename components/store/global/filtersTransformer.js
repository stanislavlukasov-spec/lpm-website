export function fromUrl(filters) {
	let result = {...filters}
	const bathrooms = parseInt(filters.bathrooms) || ""
	const bedrooms = parseInt(filters.bedrooms) || ""

	if(bathrooms) result.bathrooms = bathrooms
	if(bedrooms) result.bedrooms = bedrooms

	return result
}