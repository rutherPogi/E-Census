import { useState, useEffect } from "react";
import { Button } from '@mui/material';

import { useFormContext } from "../others/FormContext";
import { OI_REQUIRED_FIELDS } from '../../utils/constants';
import { formatters } from "../../../utils/formatter";
import { Notification } from "../../../components/Notification";
import { TextInput, ContactNumberInput } from "../../../../../components/common/FormFields";


export default function OrganizationInfo({ handleBack, handleNext}) {

  const { formData, updateFormData } = useFormContext();

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [severity, setSeverity] = useState('');

  const [values, setValues] = useState({
    organizationAffiliated: '',
    officeAddress: '',
    contactPerson: '',
    telephoneNumber: ''
  }); 

  const [errors, setErrors] = useState({
    organizationAffiliated: false,
    officeAddress: false,
    contactPerson: false,
    telephoneNumber: false
  }); 

  useEffect(() => {
    if (formData.organizationInfo) {
      setValues(prev => ({ ...prev, ...formData.organizationInfo }));
    }
  }, [formData.organizationInfo]);

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

  const handleChange = (field) => (e, newValue) => {
    let value = newValue?.value || e.target.value;

    if (field === 'telephoneNumber') {
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
      if (!OI_REQUIRED_FIELDS.includes(key)) {
        const value = processedValues[key];
        if (value === '' || value === null) {
          processedValues[key] = 'N/A';
        }
      }
    });

    updateFormData('organizationInfo', processedValues);
    console.log("Organization Affiliated Info:", processedValues);
    
    handleNext();
  };


  return(
    <div className='responsive-container'>
      <div className='responsive-header'>ORGANIZATION AFFILIATED INFORMATION</div>
      <div className='responsive-form'>
        <TextInput
          label='Organization Affiliated'
          value={values.organizationAffiliated}
          onChange={handleChange('organizationAffiliated')}
          error={errors.organizationAffiliated}
          helperText = {errors.organizationAffiliated || 'e.g. --'}
        />
        <TextInput
          label='Contact Person'
          value={values.contactPerson}
          onChange={handleChange('contactPerson')}
          error={errors.contactPerson}
          helperText = {errors.contactPerson || 'e.g. --'}
        />
        <TextInput
          label='Office Address'
          value={values.officeAddress}
          onChange={handleChange('officeAddress')}
          error={errors.officeAddress}
          helperText = {errors.officeAddress || 'e.g. BGC, Taguig City'}
        />
        <ContactNumberInput
          label = 'Telephone Number'
          value = {values.telephoneNumber}
          onChange = {handleChange('telephoneNumber')}
          error = {errors.telephoneNumber}
          helperText = '(XX) XXXX-XXXX'
          variant = 'outlined'
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