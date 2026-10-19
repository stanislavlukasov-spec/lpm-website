import React, { useState, useRef, useEffect } from 'react'
import { Loader } from '@googlemaps/js-api-loader'
import cStyles from '../../styles/GoogleMaps.module.css'
import { join } from '../Helpers/joinClasses'

const loader = new Loader({
    apiKey: process.env.NEXT_PUBLIC_API_GOOGLE_MAPS_API_KEY,
    version: "weekly",
    libraries: []
});

const GoogleMaps = props => {
    const {
        className = "",
        lat,
        lng
    } = props

    const mapRef = useRef()
    const [mapSet, setMapSet] = useState(false)

    useEffect(() => {
        if(mapRef && !mapSet) {
            loader.load()
            .then(() => {
                const myLatLng = { 
                    lat: parseFloat(lat), 
                    lng: parseFloat(lng)
                }

                console.log(myLatLng)

                const map = new google.maps.Map(mapRef.current, {
                    center: myLatLng,
                    zoom: 15,
                    mapTypeControl: false,
                    streetViewControl: false
                })

                new google.maps.Marker({
                    position: myLatLng,
                    map
                });

                setMapSet(true)
            })
            .catch(e => {
                console.log(e)
            });
        }
    })

    return (
        <div 
            ref={mapRef}
            className={join(cStyles['container'], className)}>

        </div>
    )
}

export default GoogleMaps