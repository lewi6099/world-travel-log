import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

interface Destination {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}

const MainMap: React.FC = () => {
  const [destinations, setDestinations] = useState<Destination[]>([]);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await fetch('/api/destinations');
        const data = await response.json();
        setDestinations(data);
      } catch (error) {
        console.error('Error fetching destinations:', error);
      }
    };

    fetchDestinations();
  }, []);

  const defaultIcon = L.icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });

  return (
    <MapContainer center={[0, 0]} zoom={2} style={{ height: '100vh', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
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

export default MainMap;