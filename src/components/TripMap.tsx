import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Destination } from '../types/DatabaseTypes';

interface TripMapProps {
  destinations: Destination[];
}

const TripMap: React.FC<TripMapProps> = ({ destinations }) => {
  const defaultIcon = L.icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });

  // Component to adjust the map bounds
  const MapBounds: React.FC = () => {
    const map = useMap();

    useEffect(() => {
      if (destinations.length > 0) {
        const bounds = L.latLngBounds(
          destinations.map((destination) => [destination.latitude, destination.longitude])
        );
        map.fitBounds(bounds, { padding: [50, 50] }); // Add padding for better visibility
      }
    }, [destinations, map]);

    return null;
  };

  return (
    <MapContainer center={[0, 0]} zoom={2} style={{ height: '100%', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <MapBounds />
      {destinations.map((destination) => (
        <Marker
          key={destination.id}
          position={[destination.latitude, destination.longitude]}
          icon={defaultIcon}
        >
          <Popup>{destination.name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default TripMap;