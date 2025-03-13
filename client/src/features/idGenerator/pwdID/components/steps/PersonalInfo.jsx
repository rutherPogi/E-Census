import { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import { Button } from '@mui/material';
import dayjs from "dayjs";

import { useFormContext } from "../others/FormContext";
import { CIVIL_STATUS_OPTIONS, SUFFIX_OPTIONS, SEX_OPTIONS, PI_REQUIRED_FIELDS } from '../../utils/constants';
import { Notification } from "../../../components/Notification";
import { TextInput, DropdownInput, DateInput } from "../../../../../components/common/FormFields";


export default function PersonalInfo({ handleBack, handleNext}) {

  const location = useLocation();
  const pwdID = location.state?.applicantNumber;
  const { formData, updateFormData } = useFormContext();

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [severity, setSeverity] = useState('');

  const [values, setValues] = useState({
    pwdID: pwdID,
    firstName: '',
    middleName: '',
    lastName: '',
    suffix: '',
    birthdate: null,
    sex: '',
    civilStatus: '',
    pwdNumber: ''
  }); 

  const [errors, setErrors] = useState({
    firstName: false,
    middleName: false,
    lastName: false,
    suffix: false,
    birthdate: false,
    sex: false,
    civilStatus: false,
    pwdNumber: false,
    dateApplied: false
  }); 

  useEffect(() => {
    if (formData.personalInfo) {
      setValues(prev => ({
        ...prev,
        ...formData.personalInfo,
        pwdID: pwdID
      }));
    }
  }, [formData.personalInfo, pwdID]);

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    PI_REQUIRED_FIELDS.forEach(field => {
      if (!values[field]) {
        newErrors[field] = 'This field is required';
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleDateChange = (newValue) => {
    // Check if the date is valid
    if (!newValue || !newValue.isValid()) {
      setValues(prev => ({ ...prev, birthdate: null }));
      setErrors(prev => ({ ...prev, birthdate: 'Invalid date' }));
      return;
    }

    // Check if the selected date is in the future
    const today = dayjs();

    if (newValue.isAfter(today)) {
      setValues(prev => ({ ...prev, birthdate: newValue }));
      setErrors(prev => ({ ...prev, birthdate: 'Birthdate cannot be in the future' }));
      return;
    }

    // Valid date and not in the future
    setValues(prev => ({ ...prev, birthdate: newValue }));
    setErrors(prev => ({ ...prev, birthdate: false }));
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
      if (!PI_REQUIRED_FIELDS.includes(key)) {
        const value = processedValues[key];
        if (value === '' || value === null) {
          processedValues[key] = 'N/A';
        }
      }
    });
    
    updateFormData('personalInfo', processedValues);
    console.log("Personal Details:", processedValues);
    
    handleNext();
  };

  return(
    <div className='responsive-container'>
      <div className='responsive-header'>PERSONAL INFORMATION</div>
      <div className='responsive-form'>
        <TextInput
          label='First Name'
          value={values.firstName}
          onChange={handleChange('firstName')}
          error={errors.firstName}
          helperText = {errors.firstName}
          placeholder = 'Enter First Name'
          required
        />
        <TextInput
          label='Middle Name'
          value={values.middleName}
          onChange={handleChange('middleName')}
          error={errors.middleName}
          helperText = {errors.middleName}
          placeholder = 'Enter Middle Name'
        />
        <TextInput
          label='Last Name'
          value={values.lastName}
          onChange={handleChange('lastName')}
          error={errors.lastName}
          helperText = {errors.lastName}
          placeholder = 'Enter Last Name'
          required
        />
        <DropdownInput
          label = 'Suffix'
          options = {SUFFIX_OPTIONS}
          value = {values.suffix}
          onChange = {(e, newValue) => handleChange('suffix')(e, newValue)}
          error = {errors.suffix} 
          helperText = {errors.suffix || ''}
          placeholder = 'Enter your suffix'
        />
        <DateInput
          label =  'Birthdate'
          value =  {values.birthdate}
          onChange={handleDateChange}
          error = {errors.birthdate}  
          helperText =  {errors.birthdate}
          required
        />
        <DropdownInput
          label = 'Sex'
          options = {SEX_OPTIONS}
          value = {values.sex}
          onChange = {(e, newValue) => handleChange('sex')(e, newValue)}
          error = {errors.sex} 
          helperText = {errors.sex || ''}
          placeholder = 'Enter your sex'
          required
        />
        <DropdownInput
          label = 'Civil Status'
          options = {CIVIL_STATUS_OPTIONS}
          value = {values.civilStatus}
          onChange = {(e, newValue) => handleChange('civilStatus')(e, newValue)}
          error = {errors.civilStatus} 
          helperText = {errors.civilStatus || ''}
          placeholder = 'ex. Single'
          required
        />
        <TextInput
          label={'Person\'s with Disability Number'}
          value={values.pwdNumber}
          onChange={handleChange('pwdNumber')}
          error={errors.pwdNumber}
          helperText = {errors.pwdNumber || 'RR-PPMM-BBB-NNNNNNN'}
          placeholder = ''
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