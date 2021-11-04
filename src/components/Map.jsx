import React from 'react';
import { GeoJSON, MapContainer, TileLayer } from 'react-leaflet';
import data from '../geojson.json';

export const Map = () => {
  const defaultPosition = [48.864716, 2.349]; // Paris position
  return (
    <MapContainer center={defaultPosition} zoom={13}>
      <GeoJSON data={data} />
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
  );
};
