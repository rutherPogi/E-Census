import { useEffect } from "react";

import { Notification, FormButtons } from "../../../../../components/common";
import { RELATIONSHIP_OPTIONS, BARANGAY_OPTIONS, MUNICIPALITY_OPTIONS, PROVINCE_OPTIONS } from "../../utils/options";
import { EC_INITIAL_VALUES } from "../../utils/initialValues";
import { EC_REQUIRED_FIELDS } from "../../utils/requiredFields";
import { TextInput, DropdownInput, ContactNumberInput } from '../../../../../components/common/FormFields'

import { useFormContext } from "../others/FormContext";
import { useNotification } from '../../hooks/useNotification';
import { useFormValidation } from '../../hooks/useFormValidation';
import { useAuth } from '../../../../../utils/auth/authContext';



export default function EmergencyContact({ handleBack, handleNext}) {

  const { userData } = useAuth();
  const { formData, updateFormData } = useFormContext();

  const {
    values,
    setValues,
    errors,
    validateForm,
    handleChange,
    handleContactChange
  } = useFormValidation(
    EC_INITIAL_VALUES(userData.barangay),
    true, 
    EC_REQUIRED_FIELDS
  );

  const { 
    snackbarOpen, 
    snackbarMessage, 
    severity, 
    showNotification, 
    setSnackbarOpen 
  } = useNotification();



  useEffect(() => {
    if (formData.emergenyContact) {
      setValues(prev => ({ ...prev, ...formData.emergenyContact }));
    }
  }, [formData.emergenyContact]);


  const handleSubmit = async (e) => {
    e.preventDefault();
        
    if (!validateForm()) {
      return showNotification("Please fill in all required fields", 'error');
    }

    const processedValues = { ...values };
    
    Object.keys(processedValues).forEach((key) => {
      if (!EC_REQUIRED_FIELDS.includes(key)) {
        const value = processedValues[key];
        if (value === '' || value === undefined) {
          processedValues[key] = null;
        }
      }
    });
    
    updateFormData('emergencyContact', processedValues);
    console.log("Emergency Contact:", processedValues);
    
    handleNext();
  };

  return(
    <div className='responsive-container'>
      <div className='responsive-header'>EMERGENCY CONTACT</div>
      <div className='responsive-form'>
        <TextInput
          label='Name'
          value={values.contactName}
          onChange={handleChange('contactName')}
          error={errors.contactName}
          helperText = {errors.contactName || 'e.g. Juan Dela Cruz'}
          required
        />
        <DropdownInput
          label = 'Relationship'
          options = {RELATIONSHIP_OPTIONS}
          value = {values.relationship}
          onChange = {(e, newValue) => handleChange('relationship')(e, newValue)}
          error = {errors.relationship} 
          helperText = {errors.relationship || 'e.g. Brother'}
          required
        />
        <ContactNumberInput
          label = 'Mobile Number'
          value = {values.mobileNumber}
          onChange = {handleContactChange('mobileNumber')}
          error = {errors.mobileNumber}
          helperText = '+63 XXXXXXXXXX'
          placeholder = 'Enter mobile number'
          variant = 'outlined'
          code = '+63'
        />
        <TextInput
          label='House Number & Street'
          value={values.street}
          onChange={handleChange('street')}
          error={errors.street}
          helperText = {errors.street || 'e.g. 123 Rizal St.'}
          required
        />
        <DropdownInput
          label = 'Barangay'
          options = {BARANGAY_OPTIONS}
          value = {values.barangay}
          onChange = {(e, newValue) => handleChange('barangay')(e, newValue)}
          error = {errors.barangay} 
          helperText = {errors.barangay || 'e.g. Barangay 1'}
          required
        />
        <DropdownInput
          label = 'Municipality'
          options = {MUNICIPALITY_OPTIONS}
          value = {values.municipality}
          onChange = {(e, newValue) => handleChange('municipality')(e, newValue)}
          error = {errors.municipality} 
          helperText = {errors.municipality}
          disabled
        />
        <DropdownInput
          label = 'Province'
          options = {PROVINCE_OPTIONS}
          value = {values.province}
          onChange = {(e, newValue) => handleChange('province')(e, newValue)}
          error = {errors.province} 
          helperText = {errors.province}
          disabled
        />
      </div>
      <FormButtons
        onBack = {handleBack} 
        onNext = {handleSubmit} 
        backLabel = 'Back' 
        nextLabel = 'Next' 
      />
      <Notification
        snackbarMessage={snackbarMessage} 
        snackbarOpen={snackbarOpen} 
        setSnackbarOpen={setSnackbarOpen} 
        severity={severity}
      />
    </div>
  )
}