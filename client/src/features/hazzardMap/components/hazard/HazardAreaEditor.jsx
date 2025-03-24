import {useMapEvents, useMap, GeoJSON, } from 'react-leaflet'
import { useState } from 'react';

export default function HazardAreaEditor({ isActive, onAddHazard }) {

  const map = useMap();
  const [tempCircle, setTempCircle] = useState(null);
  
  useMapEvents({
    click: (e) => {
      if (isActive) {
        const { lat, lng } = e.latlng;
        setTempCircle({ position: [lat, lng], radius: 100 });
        onAddHazard({ position: [lat, lng], radius: 100 });
        setTempCircle(null);
      }
    }
  });
  
  return null;
}