import { useState, useEffect } from "react";
import { Button } from '@mui/material';

import { useFormContext } from "../../components/others/FormContext";
import { CI_REQUIRED_FIELDS, BARANGAY_OPTIONS, MUNICIPALITY_OPTIONS } from '../../utils/constants';
import { Notification } from "../../../components/Notification";
import { formatters } from "../../../utils/formatter";
import { TextInput, DropdownInput, ContactNumberInput } from '../../../../../components/common/FormFields'



export default function ApplicationDetails({ handleBack, handleNext}) {

  const { formData, updateFormData } = useFormContext();

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [severity, setSeverity] = useState('');

  const [values, setValues] = useState({
    cardNumber: '',
    category: '',
    beneficiaryCode: ''
  }); 

  const [errors, setErrors] = useState({
    cardNumber: false,
    category: false,
    beneficiaryCode: false
  }); 

  useEffect(() => {
    if (formData.applicationDetails) {
      setValues(prev => ({ ...prev, ...formData.applicationDetails }));
    }
  }, [formData.applicationDetails]);

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    Object.keys(values).forEach(field => {
      if (!values[field]) {
        newErrors[field] = 'This field is required';
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (field) => (e, newValue) => {
    const value = newValue?.value || e.target.value;

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
    
    updateFormData('applicationDetails', processedValues);
    console.log("Contact Information:", processedValues);
    
    handleNext();
  };

  return(
    <div className='responsive-container'>
      <div className='responsive-header'>APPLICATION DETAILS</div>
      <div className='responsive-form'>
        <TextInput
          label='Solo Parent ID Card Number'
          value={values.cardNumber}
          onChange={handleChange('cardNumber')}
          error={errors.cardNumber}
          helperText = {errors.cardNumber || 'e.g. ---'}
          required
        />
        <DropdownInput
          label = 'Solo Parent Category'
          options = {BARANGAY_OPTIONS}
          value = {values.category}
          onChange = {(e, newValue) => handleChange('category')(e, newValue)}
          error = {errors.category} 
          helperText = {errors.category || 'e.g. category 1'}
          required
        />
        <TextInput
          label='Beneficiary Code'
          value={values.beneficiaryCode}
          onChange={handleChange('beneficiaryCode')}
          error={errors.beneficiaryCode}
          helperText = {errors.beneficiaryCode || 'e.g. ---'}
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