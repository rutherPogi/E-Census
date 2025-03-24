import { useState, useEffect } from "react";
import { Button, Snackbar, Alert } from '@mui/material';

import { useFormContext } from "../../pages/FormContext";
import { NumberInput } from "../others/FormFields"
import { APPLIANCE_TYPES } from "../../utils/constants";
import { formatCurrency } from "../../utils/formatter";
import { Notification } from '../../../../components/common/Notification'
 
export default function AppliancesOwn({ handleBack, handleNext }) {

  const { formData, updateFormData } = useFormContext();
  
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [severity, setSeverity] = useState('');

  const [values, setValues] = useState(() => {
    const existingData = formData.appliancesOwn?.appliances || {};
    return Object.fromEntries(APPLIANCE_TYPES.map(type => [
      type, 
      existingData[type] || ''
    ]));
  }); 

  const [errors, setErrors] = useState(
    Object.fromEntries(APPLIANCE_TYPES.map(type => [type, false]))
  );

  const showNotification = (message, type) => {
    setSnackbarMessage(message);
    setSeverity(type);
    setSnackbarOpen(true);
  };

  useEffect(() => {
    if (formData.appliancesOwn) {
      setValues(prev => ({ ...prev, ...formData.appliancesOwn }));
    }
  }, [formData.appliancesOwn]);

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    const hasValue = Object.values(values).some(val => {
      if (!val || val === '') return false;
      const numValue = parseFloat(String(val).replace(/,/g, ''));
      return numValue > 0;
    });

    if (!hasValue) { isValid = false; }

    setErrors(prev => ({ ...prev, ...newErrors }));
    return isValid;
  };

  const handleChange = (field) => (e) => {
    const value = e.target.value;
    const plainNumber = value.replace(/,/g, '');
    
    if (!/^\d*$/.test(plainNumber)) {
      setErrors(prev => ({ ...prev, [field]: 'Please enter numbers only' }));
      return;
    }
    
    if (Number(plainNumber) > 9999) {
      setErrors(prev => ({ ...prev, [field]: 'cannot exceed 9999' }));
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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      showNotification("Please fill in at least one!", 'error');
      return;
    }

    const processedValues = { ...values };
    
    Object.keys(processedValues).forEach((key) => {
      const value = processedValues[key];
        if (value === '' || value === null) {
          processedValues[key] = '0';
        }
    });

    updateFormData('appliancesOwn', { appliances: processedValues });
    console.log("Current Form Values:", processedValues);

    handleNext();
  };
  
  return (
    <div className='responsive-container'>
      <div className='responsive-header'>APPLIANCES OWN</div>
      <div className='responsive-form'>
        {APPLIANCE_TYPES.map((field) => (
          <NumberInput
            key={field}
            label={field}
            value={values[field]}
            onChange={handleChange(field)}
            error={errors[field]}
            helperText={errors[field] || `No. of ${field} own`}
            min={0}
          />
        ))}
      </div>
      <div className='form-buttons'>
        <div className='form-buttons-right'>
          <Button variant='outlined' onClick={handleBack} sx={{ width: '100%' }}>Cancel</Button>
          <Button variant='contained' onClick={handleSubmit} sx={{ width: '100%' }}>Next</Button>
        </div>     
      </div>
      <Notification
        snackbarMessage={snackbarMessage} 
        snackbarOpen={snackbarOpen} 
        setSnackbarOpen={setSnackbarOpen} 
        severity={severity}
      />
    </div>
  );
}