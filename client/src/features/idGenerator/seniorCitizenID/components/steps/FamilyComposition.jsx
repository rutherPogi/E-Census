import { useState, useEffect } from "react";

import { Notification, FormButtons } from "../../../../../components/common";
import { FC_INITIAL_VALUES } from "../../utils/initialValues";
import { FC_REQUIRED_FIELDS } from '../../utils/requiredFields';

import { useFormContext } from "../../components/others/FormContext";
import { useNotification } from "../../hooks/useNotification";
import { useFormValidation } from '../../hooks/useFormValidation';

import { PersonalDetails } from "../others/FamilyComposition/PersonalDetails";
import { ProfessionalDetails } from "../others/FamilyComposition/ProfessionalDetails";



export default function FamilyComposition({ handleBack, handleNext}) {

  const { formData, addItem, updateItem } = useFormContext();
  const { familyComposition = [] } = formData;
  
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(-1);

  const {
    values,
    setValues,
    errors,
    validateForm,
    handleChange,
    handleDateChange,
    handleIncomeChange,
  } = useFormValidation(
    FC_INITIAL_VALUES,
    true, 
    FC_REQUIRED_FIELDS);

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
      if (familyComposition[index]) {
        setIsEditing(true);
        setEditIndex(index);
        
        const memberToEdit = familyComposition[index];
        setValues({ ...memberToEdit });
      }
    }
  }, [familyComposition]);

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
      updateItem('familyComposition', editIndex, processedValues);
      console.log("Updated Family Member:", processedValues);
      
      setIsEditing(false);
      setEditIndex(-1);
      sessionStorage.removeItem('editingMemberIndex');
    } else {
      // Add new family member
      addItem('familyComposition', processedValues);
      console.log("Added Family Member:", processedValues);
    }
    
    handleNext();
  };

  return(
    <div className='responsive-container'>
      <div className='responsive-header'>FAMILY COMPOSITION</div>
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