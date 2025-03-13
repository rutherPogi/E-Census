import { useState, useEffect } from "react";
import { Button } from '@mui/material';

import { useFormContext } from "../others/FormContext";
import { Notification } from "../../../components/Notification";
import { DropdownInput } from "../../../../../components/common/FormFields";

import { PROFINFO_REQUIRED_FIELDS, EMPLOYMENT_CATEGORY_OPTIONS, EMPLOYMENT_TYPE_OPTIONS, 
         EMPLOYMENT_STATUS_OPTIONS, EDUCATIONAL_OPTIONS, OCCUPATION_OPTIONS } from '../../utils/constants';


export default function ProfessionalInfo({ handleBack, handleNext}) {

  const { formData, updateFormData } = useFormContext();

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [severity, setSeverity] = useState('');

  const [values, setValues] = useState({
    educationalAttainment: '',
    employmentStatus: '',
    employmentType: '',
    employmentCategory: '',
    occupation: ''
  }); 

  const [errors, setErrors] = useState({
    educationalAttainment: false,
    employmentStatus: false,
    employmentType: false,
    employmentCategory: false,
    occupation: false
  }); 

  useEffect(() => {
    if (formData.professionalInfo) {
      setValues(prev => ({ ...prev, ...formData.professionalInfo }));
    }
  }, [formData.professionalInfo]);

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;
  
    PROFINFO_REQUIRED_FIELDS.forEach(field => {
      if (!values[field] || values[field].trim() === '') {  // Trim whitespace to avoid empty strings
        newErrors[field] = 'This field is required';
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (field) => (e, newValue) => {
    let value;
    
    if (field === 'occupation' && typeof newValue === 'string') {
      value = newValue?.value || newValue || e?.target?.value || '';
    } else {
      value = newValue?.value || e?.target?.value || '';
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
      if (!PROFINFO_REQUIRED_FIELDS.includes(key)) {
        const value = processedValues[key];
        if (value === '' || value === null) {
          processedValues[key] = 'N/A';
        }
      }
    });

    updateFormData('professionalInfo', processedValues);
    console.log("Professional Info:", processedValues);
    
    handleNext();
  };


  return(
    <div className='responsive-container'>
      <div className='responsive-header'>PROFESSIONAL INFORMATION</div>
      <div className='responsive-form'>
        <DropdownInput
          label = 'Educational Attainment'
          options = {EDUCATIONAL_OPTIONS}
          value = {values.educationalAttainment}
          onChange = {(e, newValue) => handleChange('educationalAttainment')(e, newValue)}
          error = {errors.educationalAttainment} 
          helperText = {errors.educationalAttainment || 'e.g. College Graduate'}
        />
        <DropdownInput
          label = 'Status of Employment'
          options = {EMPLOYMENT_STATUS_OPTIONS}
          value = {values.employmentStatus}
          onChange = {(e, newValue) => handleChange('employmentStatus')(e, newValue)}
          error = {errors.employmentStatus} 
          helperText = {errors.employmentStatus || 'e.g. Employment Status'}
        />
        <DropdownInput
          label = 'Type of Employment'
          options = {EMPLOYMENT_TYPE_OPTIONS}
          value = {values.employmentType}
          onChange = {(e, newValue) => handleChange('employmentType')(e, newValue)}
          error = {errors.employmentType} 
          helperText = {errors.employmentType || 'e.g. Employment Type'}
        />
        <DropdownInput
          label = 'Category of Employment'
          options = {EMPLOYMENT_CATEGORY_OPTIONS}
          value = {values.employmentCategory}
          onChange = {(e, newValue) => handleChange('employmentCategory')(e, newValue)}
          error = {errors.employmentCategory} 
          helperText = {errors.employmentCategory || 'e.g. Employment Category'}
        />
        <DropdownInput
          label = 'Occupation'
          options = {OCCUPATION_OPTIONS}
          value = {values.occupation}
          onChange = {handleChange('occupation')}
          error = {errors.occupation} 
          helperText = {errors.occupation || 'e.g. Employment Category'}
          freeSolo = {true}
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