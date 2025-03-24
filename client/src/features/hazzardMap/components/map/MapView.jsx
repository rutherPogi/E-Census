import { useMap } from "react-leaflet";
import { useEffect } from "react";

export default function MapView({ selectedBarangay }) {
  const map = useMap();
  
  useEffect(() => {
    if (selectedBarangay) {
      map.flyTo(selectedBarangay.coordinates, selectedBarangay.zoom);
    }
  }, [selectedBarangay, map]);
  
  return null;
}