import { useFormContext } from "../../pages/FormContext";
import { useState, useEffect } from "react";
import { NumberInput } from "../others/FormFields"
import { Snackbar, Alert } from '@mui/material';


export default function Farmlots({ handleBack, handleNext }) {

  const { formData, updateFormData } = useFormContext();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const [values, setValues] = useState({
    cultivation: formData.cultivation || '',
    pastureland: formData.pastureland || '',
    forestland: formData.forestland || ''
  })

  const [errors, setErrors] = useState({
    cultivation: false,
    pastureland: false,
    forestland: false
  });

  useEffect(() => {
    if (formData.farmlots) {
      setValues(prev => ({
        ...prev,
        ...formData.farmlots
      }));
    }
  }, [formData.farmlots]);

  const handleNumChange = (field) => (e) => {
    const value = e.target.value;
    const plainNumber = value.replace(/,/g, '');
    
    if (!/^\d*$/.test(plainNumber)) {
      setErrors(prev => ({ ...prev, [field]: 'Please enter numbers only' }));
      return;
    }
    
    if (Number(plainNumber) > 999) {
      setErrors(prev => ({ ...prev, [field]: 'cannot exceed 999' }));
      return;
    }

    setErrors(prev => ({ ...prev, [field]: false }));
    setValues(prevValues => {
      const updatedValues = { ...prevValues, [field]: plainNumber };
      return updatedValues;
    });
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    // Validate required fields
    Object.keys(values).forEach(key => {
      if (!values[key]) {
        newErrors[key] = 'This field is required';
        isValid = false;
      }
    });

    setErrors(prev => ({ ...prev, ...newErrors }));
    return isValid;
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setSnackbarMessage("Please fill in all required fields");
      setSnackbarOpen(true);
      return;
    }

    updateFormData('farmlots', values);
    console.log("Current Form Values:", values);

    handleNext();
  };

  return(
    <div className='responsive-container'>
      <div className='responsive-header'>NO. OF FARM LOTS</div>
      <div className='responsive-details'>
        <NumberInput
          label="Cultivation"
          value={values.cultivation}
          onChange={handleNumChange('cultivation')}
          error={errors.cultivation}
          helperText={errors.cultivation || 'How many lots for cultivation?'}
          min={0}
          required
        />
        <NumberInput
          label="Pastureland"
          value={values.pastureland}
          onChange={handleNumChange('pastureland')}
          error={errors.pastureland}
          helperText={errors.pastureland || 'How many lots for pastureland?'}
          min={0}
          required
        />
        <NumberInput
          label="Forestland"
          value={values.forestland}
          onChange={handleNumChange('forestland')}
          error={errors.forestland}
          helperText={errors.forestland || 'How many lots for forestland?'}
          min={0}
          required
        />
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
  )
}