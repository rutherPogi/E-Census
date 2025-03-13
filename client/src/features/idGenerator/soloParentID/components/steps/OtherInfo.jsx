import { useState, useEffect } from "react";
import { Button, Radio, RadioGroup, FormControlLabel, 
         FormControl, FormLabel, FormHelperText } from '@mui/material';

import { useFormContext } from "../others/FormContext";
import { OI_REQUIRED_FIELDS } from '../../utils/constants';
import { Notification } from "../../../components/Notification";
import { TextInput } from '../../../../../components/common/FormFields'



export default function OtherInfo({ handleBack, handleNext}) {

  const { formData, updateFormData } = useFormContext();

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [severity, setSeverity] = useState('');

  const [values, setValues] = useState({
    beneficiary: '',
    indigenous: '',
    lgbtq: '',
    pwd: '',
    householdID: '',
    affiliationName: ''
  }); 

  const [errors, setErrors] = useState({
    beneficiary: false,
    indigenous: false,
    lgbtq: false,
    pwd: false,
    householdID: false,
    affiliationName: false
  }); 

  useEffect(() => {
    if (formData.otherInfo) {
      setValues(prev => ({
        ...prev,
        ...formData.otherInfo
      }));
    }
  }, [formData.otherInfo]);

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    OI_REQUIRED_FIELDS.forEach(field => {
      if (!values[field]) {
        newErrors[field] = 'This field is required';
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (field) => (event) => {
    const value = event.target.value;
    
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
      if (!OI_REQUIRED_FIELDS.includes(key)) {
        const value = processedValues[key];
        if (value === '' || value === null) {
          processedValues[key] = 'N/A';
        }
      }
    });
    
    updateFormData('otherInfo', processedValues);
    console.log("Professional Information:", processedValues);
    
    handleNext();
  };

  return(
    <div className='responsive-container'>
      <div className='responsive-header'>OTHER INFORMATION</div>
      <div className='responsive-form'>
        <FormControl 
          component="fieldset" 
          error={errors.beneficiary} 
          fullWidth 
          margin="normal"
        >
          <FormLabel component="legend">Pantawid Beneficiary?</FormLabel>
          <RadioGroup
            name="beneficiary"
            value={values.beneficiary}
            onChange={handleChange('beneficiary')}
          >
            <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="No" control={<Radio />} label="No" />
          </RadioGroup>
          {errors.beneficiary && (
            <FormHelperText>Please select an answer</FormHelperText>
          )}
        </FormControl>

        <FormControl 
          component="fieldset" 
          error={errors.indigenous} 
          fullWidth 
          margin="normal"
        >
          <FormLabel component="legend">Indigenous Person?</FormLabel>
          <RadioGroup
            name="indigenous"
            value={values.indigenous}
            onChange={handleChange('indigenous')}
          >
            <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="No" control={<Radio />} label="No" />
          </RadioGroup>
          {errors.indigenous && (
            <FormHelperText>Please select an answer</FormHelperText>
          )}
        </FormControl>

        <FormControl 
          component="fieldset" 
          error={errors.lgbtq} 
          fullWidth 
          margin="normal"
        >
          <FormLabel component="legend">LGBTQ+?</FormLabel>
          <RadioGroup
            name="lgbtq"
            value={values.lgbtq}
            onChange={handleChange('lgbtq')}
          >
            <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="No" control={<Radio />} label="No" />
          </RadioGroup>
          {errors.lgbtq && (
            <FormHelperText>Please select an answer</FormHelperText>
          )}
        </FormControl>

        <FormControl 
          component="fieldset" 
          error={errors.pwd} 
          fullWidth 
          margin="normal"
        >
          <FormLabel component="legend">PWD?</FormLabel>
          <RadioGroup
            name="pwd"
            value={values.pwd}
            onChange={handleChange('pwd')}
          >
            <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="No" control={<Radio />} label="No" />
          </RadioGroup>
          {errors.pwd && (
            <FormHelperText>Please select an answer</FormHelperText>
          )}
        </FormControl>

        <TextInput
          label='Household ID no.'
          value={values.householdID}
          onChange={handleChange('householdID')}
          error={errors.householdID}
          helperText = {errors.householdID || 'e.g. ---'}
          required
        />
        <TextInput
          label='Name of Affiliation'
          value={values.affiliationName}
          onChange={handleChange('affiliationName')}
          error={errors.affiliationName}
          helperText = {errors.affiliationName || 'e.g. ---'}
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