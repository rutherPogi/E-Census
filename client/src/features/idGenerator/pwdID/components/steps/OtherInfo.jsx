import { useEffect } from "react";

import { Notification, FormButtons } from "../../../../../components/common";
import { OTHERINFO_INITIAL_VALUES } from "../../utils/initialValues";
import { OTHERINFO_REQUIRED_FIELDS } from "../../utils/requiredFields";

import { useFormContext } from "../others/FormContext";
import { useNotification } from '../../hooks/useNotification';
import { useFormValidation } from '../../hooks/useFormValidation';

import AccomplishedBy from "../others/OtherInfoSection/AccomplishedBy";
import CertifiedPhysician from "../others/OtherInfoSection/CertifiedPhysician";




export default function OtherInfo({ handleBack, handleNext}) {

  const { formData, updateFormData } = useFormContext();

  const {
    values,
    setValues,
    errors,
    validateForm,
    handleChange,
  } = useFormValidation( 
    OTHERINFO_INITIAL_VALUES,
    true,
    OTHERINFO_REQUIRED_FIELDS
  );

  const { 
    snackbarOpen, 
    snackbarMessage, 
    severity, 
    showNotification, 
    setSnackbarOpen 
  } = useNotification();

  useEffect(() => {
    if (formData.otherInfo) {
      setValues(prev => ({ ...prev, ...formData.otherInfo }));
    }
  }, [formData.otherInfo]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      showNotification("Please fill in all required fields", "error");
      return;
    }

    const processedValues = { ...values }
    
    Object.keys(processedValues).forEach((key) => {
      const value = processedValues[key];
      if (value === '' || value === null) {
        processedValues[key] = 'N/A';
      }
    });

    updateFormData('otherInfo', processedValues);
    
    console.log("Accomplished By:", processedValues);
    
    handleNext();
  };


  return(
    <div className='responsive-container'>
      <div className='responsive-header'>OTHER INFORMATION</div>
      <div className='responsive-form details'>
        <AccomplishedBy
          values = {values}
          handleChange = {handleChange}
          errors = {errors}
        />
        <CertifiedPhysician
          values = {values}
          handleChange = {handleChange}
          errors = {errors}
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