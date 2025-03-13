import { useState, useEffect } from "react";
import { Button } from '@mui/material';

import { useFormContext } from "../others/FormContext";
import { CI_REQUIRED_FIELDS } from '../../utils/constants';
import { Notification } from "../../../components/Notification";
import { TextInput } from "../../../../../components/common/FormFields";


export default function ReportingUnit({ handleBack, handleNext}) {

  const { formData, updateFormData } = useFormContext();

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [severity, setSeverity] = useState('');

  const [values, setValues] = useState({ office: '', controlNumber: '' }); 
  const [errors, setErrors] = useState({ office: '', controlNumber: '' }); 

  useEffect(() => {
    if (formData.reportingUnit) {
      setValues(prev => ({ ...prev, ...formData.reportingUnit }));
    }
  }, [formData.reportingUnit]);

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;
    
    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (field) => (e, newValue) => {
    let value = newValue?.value || e.target.value;

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

    updateFormData('reportingUnit', processedValues);
    console.log("Contact Info:", processedValues);
    
    handleNext();
  };


  return(
    <div className='responsive-container'>
      <div className='responsive-header'>REPORTING UNIT</div>
      <div className='responsive-form'>
        <TextInput
          label='Name of Reporting Unit'
          value={values.office}
          onChange={handleChange('office')}
          error={errors.office}
          helperText = {errors.office || 'Office/Section'}
          required
        />
        <TextInput
          label='Control No.'
          value={values.controlNumber}
          onChange={handleChange('controlNumber')}
          error={errors.controlNumber}
          helperText = {errors.controlNumber || 'Office/Section'}
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