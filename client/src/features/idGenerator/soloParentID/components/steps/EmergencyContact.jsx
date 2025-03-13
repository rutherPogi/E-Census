import { useState, useEffect } from "react";
import { Button, Box } from '@mui/material';

import { useFormContext } from "../../components/others/FormContext";
import { EC_REQUIRED_FIELDS, BARANGAY_OPTIONS, MUNICIPALITY_OPTIONS, RELATIONSHIP_OPTIONS } from '../../utils/constants';
import { Notification } from "../../../components/Notification";
import { formatters } from "../../../utils/formatter";
import { TextInput, DropdownInput, ContactNumberInput } from '../../../../../components/common/FormFields'



export default function EmergencyContact({ handleBack, handleNext}) {

  const { formData, updateFormData } = useFormContext();

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [severity, setSeverity] = useState('');

  const [values, setValues] = useState({
    name: '',
    relationship: '',
    street: '',
    barangay: '',
    municipality: '',
    province: '',
    mobileNumber: ''
  }); 

  const [errors, setErrors] = useState({
    name: false,
    relationship: false,
    street: false,
    barangay: false,
    municipality: false,
    province: false,
    mobileNumber: false
  }); 

  useEffect(() => {
    if (formData.emergenyContact) {
      setValues(prev => ({ ...prev, ...formData.emergenyContact }));
    }
  }, [formData.emergenyContact]);

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    EC_REQUIRED_FIELDS.forEach(field => {
      if (!values[field]) {
        newErrors[field] = 'This field is required';
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (field) => (e, newValue) => {
    let value = newValue?.value || e.target.value;

    if (field === 'mobileNumber') {
      value = formatters.phone(value, 'mobile');
    }

    setValues(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: false }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
        
    if (!validateForm()) {
      setSnackbarMessage("Please fill in all required fields");
      setSeverity('error');
      setSnackbarOpen(true);
      
      return;
    }

    const processedValues = { ...values };
    
    Object.keys(processedValues).forEach((key) => {
      if (!EC_REQUIRED_FIELDS.includes(key)) {
        const value = processedValues[key];
        if (value === '' || value === null) {
          processedValues[key] = 'N/A';
        }
      }
    });
    
    updateFormData('emergenyContact', processedValues);
    console.log("Emergency Contact:", processedValues);
    
    handleNext();
  };

  return(
    <div className='responsive-container'>
      <div className='responsive-header'>EMERGENCY CONTACT</div>
      <div className='responsive-form'>
        <TextInput
          label='Name'
          value={values.name}
          onChange={handleChange('name')}
          error={errors.name}
          helperText = {errors.name || 'e.g. Juan Dela Cruz'}
          required
        />
        <DropdownInput
          label = 'Relationship'
          options = {RELATIONSHIP_OPTIONS}
          value = {values.relationship}
          onChange = {(e, newValue) => handleChange('relationship')(e, newValue)}
          error = {errors.relationship} 
          helperText = {errors.relationship || 'e.g. Brother'}
          required
        />
        <ContactNumberInput
          label = 'Mobile Number'
          value = {values.mobileNumber}
          onChange = {handleChange('mobileNumber')}
          error = {errors.mobileNumber}
          helperText = '+63 XXXXXXXXXX'
          placeholder = 'Enter mobile number'
          variant = 'outlined'
          code = '+63'
        />
        <Box></Box>
        <TextInput
          label='House Number & Street'
          value={values.street}
          onChange={handleChange('street')}
          error={errors.street}
          helperText = {errors.street || 'e.g. 123 Rizal St.'}
          required
        />
        <DropdownInput
          label = 'Barangay'
          options = {BARANGAY_OPTIONS}
          value = {values.barangay}
          onChange = {(e, newValue) => handleChange('barangay')(e, newValue)}
          error = {errors.barangay} 
          helperText = {errors.barangay || 'e.g. Barangay 1'}
          required
        />
        <DropdownInput
          label = 'Municipality'
          options = {MUNICIPALITY_OPTIONS}
          value = {values.municipality}
          onChange = {(e, newValue) => handleChange('municipality')(e, newValue)}
          error = {errors.municipality} 
          helperText = {errors.municipality || 'e.g. Municipality 1'}
          required
        />
        <DropdownInput
          label = 'Province'
          options = {BARANGAY_OPTIONS}
          value = {values.province}
          onChange = {(e, newValue) => handleChange('province')(e, newValue)}
          error = {errors.province} 
          helperText = {errors.province || 'e.g. ---'}
          required
        />
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
  )
}