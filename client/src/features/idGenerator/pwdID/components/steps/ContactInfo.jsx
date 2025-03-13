import { useState, useEffect } from "react";
import { Button } from '@mui/material';

import { useFormContext } from "../others/FormContext";
import { CI_REQUIRED_FIELDS, BARANGAY_OPTIONS, MUNICIPALITY_OPTIONS } from '../../utils/constants';
import { formatters } from "../../../utils/formatter";
import { Notification } from "../../../components/Notification";
import { TextInput, DropdownInput, ContactNumberInput } from "../../../../../components/common/FormFields";


export default function ContactInfo({ handleBack, handleNext}) {

  const { formData, updateFormData } = useFormContext();

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [severity, setSeverity] = useState('');

  const [values, setValues] = useState({
    street: '',
    barangay: '',
    municipality: '',
    province: '',
    region: '',
    landlineNumber: '',
    mobileNumber: '',
    emailAddress: ''
  }); 

  const [errors, setErrors] = useState({
    street: false,
    barangay: false,
    municipality: false,
    province: false,
    region: false,
    landline: false,
    mobileNumber: false,
    emailAddress: false
  }); 

  useEffect(() => {
    if (formData.contactInfo) {
      setValues(prev => ({ ...prev, ...formData.contactInfo }));
    }
  }, [formData.contactInfo]);

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;
  
    CI_REQUIRED_FIELDS.forEach(field => {
      if (!values[field]) {
        newErrors[field] = 'This field is required';
        isValid = false;
      }
    });
    
    // Email validation (only if provided)
    if (values.emailAddress && !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(values.emailAddress)) {
      newErrors.emailAddress = 'Please enter a valid email address';
      isValid = false;
    }

      setErrors(newErrors);
      return isValid;
    };

  const handleChange = (field) => (e, newValue) => {
    let value = newValue?.value || e.target.value;

    if (field === 'mobileNumber') {
      value = formatters.phone(value, 'mobile');
    } else if (field === 'landlineNumber') {
      value = formatters.phone(value, 'landline');
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
      if (!CI_REQUIRED_FIELDS.includes(key)) {
        const value = processedValues[key];
        if (value === '' || value === null) {
          processedValues[key] = 'N/A';
        }
      }
    });

    updateFormData('contactInfo', processedValues);
    console.log("Contact Info:", processedValues);
    
    handleNext();
  };


  return(
    <div className='responsive-container'>
      <div className='responsive-header'>CONTACT INFORMATION</div>
      <div className='responsive-form'>
        <TextInput
          label='House Number & Street'
          value={values.street}
          onChange={handleChange('street')}
          error={errors.street}
          helperText = {errors.street}
          placeholder = 'e.g. 123 Rizal St. '
          required
        />
        <DropdownInput
          label = 'Barangay'
          options = {BARANGAY_OPTIONS}
          value = {values.barangay}
          onChange = {(e, newValue) => handleChange('barangay')(e, newValue)}
          error = {errors.barangay} 
          helperText = {errors.barangay || ''}
          placeholder = 'Enter your barangay'
          required
        />
        <DropdownInput
          label = 'Municipality'
          options = {MUNICIPALITY_OPTIONS}
          value = {values.municipality}
          onChange = {(e, newValue) => handleChange('municipality')(e, newValue)}
          error = {errors.municipality} 
          helperText = {errors.municipality || ''}
          placeholder = 'Enter your municipality'
          required
        />
        <DropdownInput
          label = 'Province'
          options = {BARANGAY_OPTIONS}
          value = {values.province}
          onChange = {(e, newValue) => handleChange('province')(e, newValue)}
          error = {errors.province} 
          helperText = {errors.province || ''}
          placeholder = 'Enter your province'
          required
        />
        <DropdownInput
          label = 'Region'
          options = {BARANGAY_OPTIONS}
          value = {values.region}
          onChange = {(e, newValue) => handleChange('region')(e, newValue)}
          error = {errors.region} 
          helperText = {errors.region || ''}
          placeholder = 'Enter your region'
          required
        />
        <ContactNumberInput
          label = 'Landline Number'
          value = {values.landlineNumber}
          onChange = {handleChange('landlineNumber')}
          error = {errors.landlineNumber}
          helperText = '(XX) XXXX-XXXX'
          placeholder = 'Enter landline number'
          variant = 'outlined'
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
        <TextInput
          label='Email Address'
          value={values.emailAddress}
          onChange={handleChange('emailAddress')}
          error={errors.emailAddress}
          helperText = {errors.emailAddress || 'example@gmail.com'}
          placeholder = 'e.g. example@gmail.com'
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