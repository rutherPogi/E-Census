import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';

import { Notification, FormButtons } from "../../../../../components/common";
import { PI_INITIAL_VALUES } from "../../utils/initialValues";
import { PI_REQUIRED_FIELDS } from "../../utils/requiredFields";

import { useFormContext } from "../others/FormContext";
import { useNotification } from '../../hooks/useNotification';
import { useFormValidation } from '../../hooks/useFormValidation';
import { useTransformData } from "../../hooks/useTransformData";

import { 
  PersonalDetails,
  ContactDetails,
  ProfessionalDetails,
  IDReferenceDetails,
  Checkbox,
  AffiliationDetails,
  DisabilityDetails
} from '../others/PersonalInfoSection';





export default function PersonalInfo({ handleBack, handleNext, isRegistered = false}) {

  const { pwdApplicationID, populationID } = useParams();

  const { formData, updateFormData } = useFormContext();
  const { fetchPersonData } = useTransformData(pwdApplicationID, populationID);

  const [initialFetchDone, setInitialFetchDone] = useState(false);

  const {
    values,
    setValues,
    errors,
    validateForm,
    handleChange,
    handleDateChange,
    handleContactChange
  } = useFormValidation(
    PI_INITIAL_VALUES(pwdApplicationID),
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
    if (isRegistered && !initialFetchDone) {
      console.log('fetching...');
      fetchPersonData()
        .then(() => {
          setInitialFetchDone(true);
        })
        .catch(err => {
          console.error('Error fetching survey data:', err);
          setInitialFetchDone(true);
        });
    }
  }, [isRegistered, initialFetchDone, fetchPersonData]);
  
  useEffect(() => {
    // Once data is fetched and available, set the form values only once
    if (isRegistered && initialFetchDone && formData.personalInfo) {
      setValues(prev => ({
        ...prev,
        ...formData.personalInfo,
        pwdApplicationID: pwdApplicationID,
      }));
    }
  }, [isRegistered, initialFetchDone, formData.personalInfo, pwdApplicationID]);

  useEffect(() => {
    // Once data is fetched and available, set the form values only once
    if (formData.personalInfo) {
      setValues(prev => ({
        ...prev,
        ...formData.personalInfo,
        pwdApplicationID: pwdApplicationID,
      }));
    }
  }, [isRegistered, initialFetchDone, formData.personalInfo, pwdApplicationID]);
  

  const handleSubmit = async (e) => {
    e.preventDefault();
        
    if (!validateForm()) {
      showNotification("Please fill in all required fields", 'error');
      return;
    }

    const specific = values.disabilitySpecific;

    if(specific === '' || specific === undefined ) {
      values.disabilitySpecific = null;
    }

    const processedValues = { ...values };
    
    Object.keys(processedValues).forEach((key) => {
      if (!PI_REQUIRED_FIELDS.includes(key)) {
        const value = processedValues[key];
        if (value === '' || value === undefined) {
          processedValues[key] = null;
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
        <PersonalDetails
          values={values}
          handleChange={handleChange}
          handleDateChange={handleDateChange}
          errors={errors}
        />
        <DisabilityDetails
          values={values}
          handleChange={handleChange}
          errors={errors}
        />
        <ContactDetails
          values={values}
          handleChange={handleChange}
          handleContactChange={handleContactChange}
          errors={errors}
        />
        <ProfessionalDetails
          values={values}
          handleChange={handleChange}
          errors={errors}
        />
        <IDReferenceDetails
          values={values}
          handleChange={handleChange}
          errors={errors}
        />
        <Checkbox
          values={values}
          handleChange={handleChange}
          errors={errors}
        />
        

        {Boolean(values.isAffiliated) && (
          <AffiliationDetails
            values={values}
            handleChange={handleChange}
            handleContactChange={handleContactChange}
            errors={errors}
          />
        )}
      </div>
      <FormButtons
        onBack = {handleBack} 
        onNext = {handleSubmit} 
        backLabel = 'Cancel' 
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