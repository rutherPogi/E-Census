import { useFormContext } from "../../pages/FormContext";
import { useState, useEffect } from "react";
import { NumberInput } from "../others/FormFields"
import { AMENITY_TYPES, APPLIANCE_TYPES } from "../../utils/constants";
import { Snackbar, Alert } from '@mui/material';
import { formatCurrency } from "../../utils/formatter";
 
export default function Amenities({ handleBack, handleNext }) {

  const { formData, updateFormData } = useFormContext();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const [values, setValues] = useState(() => {
    const existingData = formData.amenitiesOwn?.amenities || {};
    return Object.fromEntries(AMENITY_TYPES.map(type => [
      type, 
      existingData[type] || ''
    ]));
  }); 

  const [errors, setErrors] = useState(
    Object.fromEntries(AMENITY_TYPES.map(type => [type, false]))
  );

  useEffect(() => {
    if (formData.amenitiesOwn) {
      setValues(prev => ({
        ...prev,
        ...formData.amenitiesOwn
      }));
    }
  }, [formData.amenitiesOwn]);

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleChange = (field) => (e) => {
    const value = e.target.value;
    const plainNumber = value.replace(/,/g, '');
    
    if (!/^\d*$/.test(plainNumber)) {
      setErrors(prev => ({ ...prev, [field]: 'Please enter numbers only' }));
      return;
    }
    
    if (Number(plainNumber) > 999) {
      setErrors(prev => ({ ...prev, [field]: 'Total area cannot exceed 999' }));
      return;
    }

    setErrors(prev => ({ ...prev, [field]: false }));
    
    setValues(prevValues => {
      const updatedValues = {
        ...prevValues,
        [field]: formatCurrency(plainNumber)
      };

      return updatedValues;
    });
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    const hasValue = Object.values(values).some(val => 
      parseFloat(val.replace(/,/g, '')) > 0
    );

    if (!hasValue) { isValid = false; }

    setErrors(prev => ({ ...prev, ...newErrors }));
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setSnackbarMessage("Please fill in at least one!");
      setSnackbarOpen(true);
      return;
    }

    const processedValues = { ...values };
    
    Object.keys(processedValues).forEach((key) => {
      const value = processedValues[key];
        if (value === '' || value === null) {
          processedValues[key] = '0';
        }
    });

    updateFormData('amenitiesOwn', { amenities: processedValues });
    console.log("Current Form Values:", processedValues);

    handleNext();
  };
  
  return (
    <div className='responsive-container'>
      <div className='responsive-header'>AMENITIES</div>
      <div className='responsive-form'>
        {AMENITY_TYPES.map((field) => (
          <NumberInput
            key={field}
            label={field}
            value={values[field]}
            onChange={handleChange(field)}
            error={errors[field]}
            helperText={errors[field] || `No. of ${field} own`}
          />
        ))}
      </div>
      <div className='form-buttons'>
        <div className='form-buttons-right'>
          <button type='button' className="btn cancel-btn" onClick={handleBack}>Back</button>
          <button type='button' className="btn submit-btn" onClick={handleSubmit}>Next</button>
        </div>     
      </div>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={5000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleSnackbarClose} 
          severity="error" 
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}