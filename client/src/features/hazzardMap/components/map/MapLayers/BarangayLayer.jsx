import React from 'react';
import { GeoJSON, Popup } from 'react-leaflet';
import Typography from '@mui/material/Typography';

import { ITBAYAT_BARANGAYS } from '../../../utils/constant';

const BarangayBoundaries = ({ 
  selectedBarangay 
}) => {
  
  return (
    <>
      {ITBAYAT_BARANGAYS.features.map((feature) => (
        <GeoJSON 
          key={feature.properties.id}
          data={feature}
          style={() => ({
            color: 'blue',
            weight: 2,
            opacity: selectedBarangay && 
              (selectedBarangay.name === feature.properties.name || 
               selectedBarangay.name === feature.properties.alternative_name) ? 1 : 0.5,
            fillColor: selectedBarangay && 
              (selectedBarangay.name === feature.properties.name || 
               selectedBarangay.name === feature.properties.alternative_name) ? 
                'rgba(0, 0, 255, 0.1)' : 'transparent'
          })}
        >
          <Popup>
            <Typography variant="subtitle1">{feature.properties.name}</Typography>
            {feature.properties.alternative_name && (
              <Typography variant="body2">({feature.properties.alternative_name})</Typography>
            )}
            <Typography variant="body2">Barangay of Itbayat Municipality</Typography>
          </Popup>
        </GeoJSON>
      ))}
    </>
  );
};

export default BarangayBoundaries;