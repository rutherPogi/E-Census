import { useState, useEffect } from "react";
import { Button } from '@mui/material';

import { useFormContext } from "../../components/others/FormContext";
import { PROFINFO_REQUIRED_FIELDS, EDUCATIONAL_OPTIONS } from '../../utils/constants';
import { formatters } from "../../../utils/formatter";
import { Notification } from "../../../components/Notification";
import { TextInput, DropdownInput, ContactNumberInput, CurrencyInput } from '../../../../../components/common/FormFields'



export default function ProfessionalInfo({ handleBack, handleNext}) {

  const { formData, updateFormData } = useFormContext();

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [severity, setSeverity] = useState('');

  const [values, setValues] = useState({
    occupation: '',
    educationalAttainment: '',
    annualIncome: '',
    otherSkills: ''
  }); 

  const [errors, setErrors] = useState({
    occupation: false,
    educationalAttainment: false,
    annualIncome: false,
    otherSkills: false
  }); 

  useEffect(() => {
    if (formData.professionalInfo) {
      setValues(prev => ({
        ...prev,
        ...formData.professionalInfo
      }));
    }
  }, [formData.professionalInfo]);

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    PROFINFO_REQUIRED_FIELDS.forEach(field => {
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

    if (field === 'annualIncome') {
      value = formatters.currency(value);
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
    console.log("Professional Information:", processedValues);
    
    handleNext();
  };

  return(
    <div className='responsive-container'>
      <div className='responsive-header'>PROFESSIONAL INFORMATION</div>
      <div className='responsive-form'>
        <TextInput
          label='Occupation'
          value={values.occupation}
          onChange={handleChange('occupation')}
          error={errors.occupation}
          helperText = {errors.occupation || 'e.g. Teacher'}
          required
        />
        <DropdownInput
          label = 'Educational Attainment'
          options = {EDUCATIONAL_OPTIONS}
          value = {values.educationalAttainment}
          onChange = {(e, newValue) => handleChange('educationalAttainment')(e, newValue)}
          error = {errors.educationalAttainment} 
          helperText = {errors.educationalAttainment || 'e.g. College Graduate'}
        />
        <CurrencyInput
          label = 'Annual Income'
          value =  {values.annualIncome}
          onChange =  {handleChange('annualIncome')}
          error =  {errors.annualIncome}
          helperText =  {errors.annualIncome}
          placeholder= '0.00'
          variant = 'outlined'
        />
        <TextInput
          label='Other Skills'
          value={values.otherSkills}
          onChange={handleChange('otherSkills')}
          error={errors.otherSkills}
          helperText = {errors.otherSkills || 'e.g. ---'}
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