import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from '@monsonjeremy/react-leaflet';
import { Map as LeafletMap } from 'leaflet';
import { useCallback, useEffect, useMemo, useState } from 'react';

const center = { lat: 51.505, lng: -0.09 };
const zoom = 13;

function DisplayPosition({ map }: { map: LeafletMap }) {
  const [position, setPosition] = useState(map.getCenter());

  const onClick = useCallback(() => {
    map.setView(center, zoom);
  }, [map]);

  const onMove = useCallback(() => {
    setPosition(map.getCenter());
  }, [map]);

  useEffect(() => {
    map.on('move', onMove);
    return () => {
      map.off('move', onMove);
    };
  }, [map, onMove]);

  return (
    <p>
      latitude: {position.lat.toFixed(4)}, longitude: {position.lng.toFixed(4)}{' '}
      <button onClick={onClick}>reset</button>
    </p>
  );
}

export const Map = () => {
  const [map, setMap] = useState<LeafletMap | null>(null);

  const displayMap = useMemo(
    () => (
      <MapContainer
        style={{ height: '300px', width: '50vw' }}
        center={center}
        zoom={zoom}
        scrollWheelZoom={false}
        whenCreated={setMap}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    ),
    [],
  );

  return (
    <div>
      {map ? <DisplayPosition map={map} /> : null}
      {displayMap}
    </div>
  );
};
