import { useState, useEffect } from "react";
import { Button } from '@mui/material';

import { useFormContext } from "../others/FormContext";
import { IDREF_FIELDS } from '../../utils/constants';
import { Notification } from "../../../components/Notification";
import { TextInput } from "../../../../../components/common/FormFields";


export default function IDReferenceInfo({ handleBack, handleNext}) {

  const { formData, updateFormData } = useFormContext();

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [severity, setSeverity] = useState('');

  const [values, setValues] = useState({
    sssNumber: '',
    philhealthNumber: '',
    gsisNumber: '',
    pagibigNumber: '',
    psnNumber: ''
  }); 

  const [errors, setErrors] = useState({
    sssNumber: false,
    philhealthNumber: false,
    gsisNumber: false,
    pagibigNumber: false,
    psnNumber: false
  }); 

  useEffect(() => {
    if (formData.idReferenceInfo) {
      setValues(prev => ({ ...prev, ...formData.idReferenceInfo }));
    }
  }, [formData.idReferenceInfo]);

  const validateForm = () => {
    const newErrors = {};
    
    // Check if at least one field has a value
    const hasAtLeastOneValue = Object.values(values).some(value => 
      value !== null && value !== undefined && value.trim() !== ''
    );
    
    if (!hasAtLeastOneValue) {
      // If no fields are filled, mark all as error
      Object.keys(values).forEach(field => {
        newErrors[field] = 'At least one ID reference is required';
      });
      setErrors(newErrors);
      return false;
    }
    
    setErrors({});
    return true;
  };

  const handleChange = (field) => (e, newValue) => {
    let value = newValue?.value || e.target.value;

    setValues(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: false }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
        
    if (!validateForm()) {
      setSnackbarMessage("Please fill in at least one ID reference field");
      setSnackbarOpen(true);
      setSeverity('error')

      return;
    }

    const processedValues = { ...values };

    Object.keys(processedValues).forEach((key) => {
      if (!IDREF_FIELDS.includes(key)) {
        const value = processedValues[key];
        if (value === '' || value === null) {
          processedValues[key] = 'N/A';
        }
      }
    });

    updateFormData('idReferenceInfo', processedValues);
    console.log("ID Reference Info:", processedValues);
    
    handleNext();
  };


  return(
    <div className='responsive-container'>
      <div className='responsive-header'>ID REFERENCE NO.</div>
      <div className='responsive-form'>
        <TextInput
          label='SSS No.'
          value={values.sssNumber}
          onChange={handleChange('sssNumber')}
          error={errors.sssNumber}
          helperText = {errors.sssNumber || 'e.g. --'}
        />
        <TextInput
          label='GSIS No.'
          value={values.gsisNumber}
          onChange={handleChange('gsisNumber')}
          error={errors.gsisNumber}
          helperText = {errors.gsisNumber || 'e.g. --'}
        />
        <TextInput
          label='PAG-IBIG No.'
          value={values.pagibigNumber}
          onChange={handleChange('pagibigNumber')}
          error={errors.pagibigNumber}
          helperText = {errors.pagibigNumber || 'e.g. --'}
        />
        <TextInput
          label='PSN No.'
          value={values.psnNumber}
          onChange={handleChange('psnNumber')}
          error={errors.psnNumber}
          helperText = {errors.psnNumber || 'e.g. --'}
        />
        <TextInput
          label='Philhealth No.'
          value={values.philhealthNumber}
          onChange={handleChange('philhealthNumber')}
          error={errors.philhealthNumber}
          helperText = {errors.philhealthNumber || 'e.g. --'}
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
        setSeverity={severity}
      />
    </div>
  )
}