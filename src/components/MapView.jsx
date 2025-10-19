import { useEffect } from 'react'
import { MapContainer, TileLayer, GeoJSON, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import './MapView.css'

const FitBounds = ({ geoData }) => {
    const map = useMap()

    useEffect(() => {
        if (geoData && geoData.features && geoData.features.length > 0) {
            const layer = new window.L.GeoJSON(geoData)
            const bounds = layer.getBounds()
            if (bounds.isValid()) {
                setTimeout(() => {
                    map.fitBounds(bounds)
                }, 100)
            }
        }
    }, [geoData, map])

    return null
}

const MapView = ({ center, geoData }) => {
    const position = center && center.length === 2 ? center : [0, 0]

    return (
        <div className="map-view-container">
            <MapContainer
                center={position}
                zoom={3}
                style={{ height: '300px', width: '100%' }}
            >
                <TileLayer
                    attribution='Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    maxZoom={18}
                />
                {geoData && <GeoJSON data={geoData} />}
                {geoData && <FitBounds geoData={geoData} />}
            </MapContainer>
        </div>
    )
}

export default MapView

