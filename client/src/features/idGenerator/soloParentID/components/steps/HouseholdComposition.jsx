import { useState, useEffect } from "react";

import { Notification, FormButtons } from "../../../../../components/common";
import { HC_INITIAL_VALUES } from "../../utils/initialValues";
import { HC_REQUIRED_FIELDS } from "../../utils/requiredFields";

import { useFormContext } from "../others/FormContext";
import { useNotification } from '../../hooks/useNotification';
import { useFormValidation } from '../../hooks/useFormValidation';

import { PersonalDetails } from '../others/HouseholdComposition/PersonalDetails';
import { ProfessionalDetails } from '../others/HouseholdComposition/ProfessionalDetails';




export default function HouseholdComposition({ handleBack, handleNext}) {

  const { formData, addItem, updateItem } = useFormContext();
  const { householdComposition = [] } = formData;
  
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(-1);

  const {
    values,
    setValues,
    errors,
    validateForm,
    handleChange,
    handleDateChange,
    handleIncomeChange
  } = useFormValidation(
    HC_INITIAL_VALUES,
    true, 
    HC_REQUIRED_FIELDS
  );

  const { 
    snackbarOpen, 
    snackbarMessage, 
    severity, 
    showNotification, 
    setSnackbarOpen 
  } = useNotification();

  useEffect(() => {

    const storedEditIndex = sessionStorage.getItem('editingMemberIndex');
    
    if (storedEditIndex !== null) {
      const index = parseInt(storedEditIndex);
      if (householdComposition[index]) {
        setIsEditing(true);
        setEditIndex(index);
        
        const memberToEdit = householdComposition[index];
        setValues({ ...memberToEdit });
      }
    }
  }, [householdComposition]);

  const handleSubmit = async (e) => {
    e.preventDefault();
        
    if (!validateForm()) {
      return showNotification("Please fill in all required fields", 'error');
    }

    const processedValues = { ...values };
    
    Object.keys(processedValues).forEach((key) => {
      const value = processedValues[key];
      if (value === '' || value === undefined) {
        processedValues[key] = null;
      }
    });
    
    if (isEditing) {
      updateItem('householdComposition', editIndex, processedValues);
      console.log("Updated Household Member:", processedValues);
      
      setIsEditing(false);
      setEditIndex(-1);
      sessionStorage.removeItem('editingMemberIndex');
    } else {
      // Add new Household member
      addItem('householdComposition', processedValues);
      console.log("Added Household Member:", processedValues);
    }
    
    handleNext();
  };

  return(
    <div className='responsive-container'>
      <div className='responsive-header'>HOUSEHOLD COMPOSITION</div>
      <div className='responsive-form'>
        <PersonalDetails
          values={values}
          handleChange={handleChange}
          handleDateChange={handleDateChange}
          errors={errors}
        />
        <ProfessionalDetails
          values={values}
          handleChange={handleChange}
          handleIncomeChange={handleIncomeChange}
          errors={errors}
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