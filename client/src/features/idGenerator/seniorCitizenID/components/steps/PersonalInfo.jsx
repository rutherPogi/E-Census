import { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import { Button } from '@mui/material';
import dayjs from "dayjs";

import { useFormContext } from "../../components/others/FormContext";
import { CIVIL_STATUS_OPTIONS, SUFFIX_OPTIONS, SEX_OPTIONS, PI_REQUIRED_FIELDS } from '../../utils/constants';
import { Notification } from "../../../components/Notification";
import { TextInput, DropdownInput, DateInput } from '../../../../../components/common/FormFields'


export default function PersonalInfo({ handleBack, handleNext}) {

  const location = useLocation();
  const seniorCitizenID = location.state?.seniorCitizenID;
  const { formData, updateFormData } = useFormContext();

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [severity, setSeverity] = useState('');

  const [values, setValues] = useState({
    seniorCitizenID: seniorCitizenID,
    firstName: '',
    middleName: '',
    lastName: '',
    suffix: '',
    birthdate: null,
    age: '',
    sex: '',
    civilStatus: '',
    birthplace: ''
  }); 
 
  const [errors, setErrors] = useState({
    firstName: false,
    middleName: false,
    lastName: false,
    suffix: false,
    birthdate: false,
    sex: false,
    civilStatus: false,
    birthplace: false
  }); 

  useEffect(() => {
    if (formData.personalInfo) {
      setValues(prev => ({
        ...prev,
        ...formData.personalInfo,
        seniorCitizenID: seniorCitizenID
      }));
    }
  }, [formData.personalInfo, seniorCitizenID]);

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

  const handleBirthdateChange = (dateValue) => {
    if (!dateValue) {
      setValues({ ...values, birthdate: null, age: '' });
      return;
    }

    if (dateValue.isAfter(dayjs())) {
      setErrors(true);
      setValues({ ...values, birthdate: dateValue, age: '' });
      return;
    }

    setErrors(false);
    const birthdate = dateValue.toDate(); // Convert dayjs to JavaScript Date
    const today = new Date();
    let age = today.getFullYear() - birthdate.getFullYear();
    
    // Adjust if the birthday hasn't occurred this year yet
    const monthDiff = today.getMonth() - birthdate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthdate.getDate())) {
      age--;
    }
  
    setValues({ 
      ...values, 
      birthdate: dateValue,
      age: age >= 0 ? age : '' 
    });
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
          helperText = {errors.firstName || 'e.g. Juan'}
          required
        />
        <TextInput
          label='Middle Name'
          value={values.middleName}
          onChange={handleChange('middleName')}
          error={errors.middleName}
          helperText = {errors.middleName || 'e.g. Santos'}
        />
        <TextInput
          label='Last Name'
          value={values.lastName}
          onChange={handleChange('lastName')}
          error={errors.lastName}
          helperText = {errors.lastName || 'e.g. Dela Cruz'}
          required
        />
        <DropdownInput
          label = 'Suffix'
          options = {SUFFIX_OPTIONS}
          value = {values.suffix}
          onChange = {(e, newValue) => handleChange('suffix')(e, newValue)}
          error = {errors.suffix} 
          helperText = {errors.suffix || 'e.g. Jr - Junior'}
        />
        <DateInput
          label =  'Birthdate'
          value =  {values.birthdate}
          onChange={handleBirthdateChange}
          error = {errors.birthdate}  
          helperText =  {errors.birthdate}
          required
        />
        <TextInput
          label='Age'
          value={values.age}
          disabled
        />
        <DropdownInput
          label = 'Sex'
          options = {SEX_OPTIONS}
          value = {values.sex}
          onChange = {(e, newValue) => handleChange('sex')(e, newValue)}
          error = {errors.sex} 
          helperText = {errors.sex || 'e.g. Male'}
          required
        />
        <TextInput
          label='Place of Birth'
          value={values.birthplace}
          onChange={handleChange('birthplace')}
          error={errors.birthplace}
          helperText = {errors.birthplace || 'e.g. ---'}
          required
        />
        <DropdownInput
          label = 'Civil Status'
          options = {CIVIL_STATUS_OPTIONS}
          value = {values.civilStatus}
          onChange = {(e, newValue) => handleChange('civilStatus')(e, newValue)}
          error = {errors.civilStatus} 
          helperText = {errors.civilStatus || 'e.g. Single'}
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