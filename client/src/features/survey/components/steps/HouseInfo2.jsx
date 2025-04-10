import { useState, useEffect } from "react";
import { Typography } from '@mui/material';

import { useFormContext } from "../../pages/FormContext";
import { Notification, FormButtons } from '../../../../components/common';

import { HI2_INITIAL_VALUES } from "../../utils/initialValues";
import { HI2_REQUIRED_FIELDS } from "../../utils/requiredFields";

import { useFormValidation } from '../../hooks/useFormValidation';
import { useNotification } from '../../hooks/useNotification';

import LocationMap from "../others/HouseInfoSections/HouseMap/LocationMap";
import CoordinatesDisplay from "../others/HouseInfoSections/HouseMap/CoordinatesDisplay";
import HouseAddress from "../others/HouseInfoSections/HouseAddress";




export default function HouseLocation({ handleBack, handleNext }) {

  const [position, setPosition] = useState(null);

  const { formData, updateFormData } = useFormContext();

  const {
    values,
    setValues,
    errors,
    validateForm,
    handleChange
  } = useFormValidation(
    HI2_INITIAL_VALUES,
    true, 
    HI2_REQUIRED_FIELDS
  );
  
  const { 
    snackbarOpen, 
    snackbarMessage, 
    severity, 
    showNotification, 
    setSnackbarOpen 
  } = useNotification();

  useEffect(() => {
    if (formData.houseLocation && formData.houseLocation.latitude && formData.houseLocation.longitude) {
      setValues(prev => ({ ...prev, ...formData.houseLocation }));
      setPosition([formData.houseLocation.latitude, formData.houseLocation.longitude]);
    }
  }, [formData.houseLocation]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!position) {
      showNotification("Please add a pin to mark your house location", "error");
      return;
    }

    if (!validateForm()) {
      showNotification("Please fill in all required fields", "error");
      return;
    }

    updateFormData('houseLocation', { ...values,
      latitude: position[0], 
      longitude: position[1],
      houseStreet: values.houseStreet,
      barangay: values.barangay,
      municipality: values.municipality
    });

    console.log('HOUSE INFO 2', formData.houseLocation)
    handleNext();
  };

  return (
    <div className='responsive-container'>
      <div className='responsive-header'>HOUSE LOCATION</div>
      <form id="survey-form" className="responsive-form details" onSubmit={handleSubmit}>
        
        <HouseAddress
          values={values}
          handleChange={handleChange}
          errors={errors}
        />

        <Typography variant="body1" sx={{ mb: 2 }}>
          Please mark your house location in Itbayat Municipality by clicking on the map.
        </Typography>
        
        <LocationMap 
          position={position} 
          setPosition={setPosition}
          showNotification={showNotification}
        />
        
        <CoordinatesDisplay position={position} />
      </form>

      <FormButtons 
        onBack={handleBack}
        onNext={handleSubmit}
        backLabel="Back"
        nextLabel="Next"
      />
      
      <Notification
        snackbarMessage={snackbarMessage} 
        snackbarOpen={snackbarOpen} 
        setSnackbarOpen={setSnackbarOpen} 
        severity={severity}
      />
    </div>
  );
}