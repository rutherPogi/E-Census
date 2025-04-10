import { useEffect } from "react";
import { useParams } from 'react-router-dom';
import { Button } from '@mui/material';

import { CIVIL_STATUS_OPTIONS, SUFFIX_OPTIONS, SEX_OPTIONS, PI_REQUIRED_FIELDS } from '../../utils/constants';
import { Notification } from "../../../components/Notification";
import { TextInput, DropdownInput, DateInput } from "../../../../../components/common/FormFields";
import { PI_INITIAL_STATE } from "../../utils/initialStates";

import { useFormContext } from "../others/FormContext";
import { useNotification } from '../../hooks/useNotification';
import { useFormValidation } from '../../hooks/useFormValidation';
import { useTransformData } from "../../hooks/useTransformData";


export default function PersonalInfo({ handleBack, handleNext}) {

  const { pwdID, populationID } = useParams();

  const { formData, updateFormData } = useFormContext();
  const { fetchPersonData } = useTransformData(populationID);

  const {
    values,
    setValues,
    errors,
    validateForm,
    handleChange,
    handleDateChange
  } = useFormValidation(
    PI_INITIAL_STATE(pwdID),
    true, 
    PI_REQUIRED_FIELDS
  );

  const { 
    snackbarOpen, 
    snackbarMessage, 
    severity, 
    showNotification, 
    setSnackbarOpen 
  } = useNotification();

  useEffect(() => {

    if(populationID) {
      fetchPersonData();
    }
    
    if (formData.personalInfo) {
      setValues(prev => ({ ...prev, ...formData.personalInfo, pwdID: pwdID }));
    }
  }, [formData.personalInfo, pwdID]);

  const handleSubmit = async (e) => {
    e.preventDefault();
        
    if (!validateForm()) {
      showNotification("Please fill in all required fields", 'error');
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
          helperText = {errors.firstName || 'e.g., Juan'}
          placeholder = 'Enter First Name'
          required
        />
        <TextInput
          label='Middle Name'
          value={values.middleName}
          onChange={handleChange('middleName')}
          error={errors.middleName}
          helperText = {errors.middleName || 'e.g., Santos'}
          placeholder = 'Enter Middle Name'
        />
        <TextInput
          label='Last Name'
          value={values.lastName}
          onChange={handleChange('lastName')}
          error={errors.lastName}
          helperText = {errors.lastName || 'e.g, Dela Cruz'}
          placeholder = 'Enter Last Name'
          required
        />
        <DropdownInput
          label = 'Suffix'
          options = {SUFFIX_OPTIONS}
          value = {values.suffix}
          onChange = {(e, newValue) => handleChange('suffix')(e, newValue)}
          error = {errors.suffix} 
          helperText = {errors.suffix || 'e.g., Jr - Junior'}
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
          helperText = {errors.sex || 'e.g., Male'}
          placeholder = 'Enter your sex'
          required
        />
        <DropdownInput
          label = 'Civil Status'
          options = {CIVIL_STATUS_OPTIONS}
          value = {values.civilStatus}
          onChange = {(e, newValue) => handleChange('civilStatus')(e, newValue)}
          error = {errors.civilStatus} 
          helperText = {errors.civilStatus || 'e.g, Single'}
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