import { useState, useEffect } from "react";
import dayjs from "dayjs";

import { FP_REQUIRED_FIELDS } from '../../utils/requiredFields';
import { FP_BOOLEAN_VALUES, FP_ID_VALUES, FP_INITIAL_VALUES } from '../../utils/initialValues';
import { Notification, FormButtons } from '../../../../components/common';

import { useFormContext } from "../../pages/FormContext";
import { useFormValidation } from '../../hooks/useFormValidation';
import { useNotification } from '../../hooks/useNotification';
import { PersonalInfo, ProfessionalInfo, OtherInfo, Checkbox, TransientDetails, 
         IpulaDetails, AffiliationDetails } from '../others/FamilyProfileSections';



export default function FamilyProfile({ handleBack, handleNext }) {
  
  const { formData, addItem, updateItem } = useFormContext();
  const { familyMembers = [] } = formData;

  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(-1);


  const {
    values,
    setValues,
    errors,
    validateForm,
    handleChange,
    handleContactChange,
    handleIDChange,
    handleDateChange,
    handleIncomeChange,
  } = useFormValidation(
    FP_INITIAL_VALUES,
    true, 
    FP_REQUIRED_FIELDS);

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
      if (familyMembers[index]) {

        setIsEditing(true);
        setEditIndex(index);
        
        const memberToEdit = familyMembers[index];
        setValues({ 
          ...memberToEdit,
          transientDateRegistered: memberToEdit.transientDateRegistered 
          ? dayjs(memberToEdit.transientDateRegistered) 
          : null,
          asOfficer: memberToEdit.asOfficer 
          ? dayjs(memberToEdit.asOfficer) 
          : null,
          asMember: memberToEdit.asMember 
          ? dayjs(memberToEdit.asMember) 
          : null 
        });
      }
    }
  }, [familyMembers]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      showNotification('Please fill in all required fields', 'error')
      return;
    }

    const processedValues = { ...values };


    if (!processedValues.isIpula) {
      processedValues.settlementDetails = null;
      processedValues.ethnicity = null;
      processedValues.placeOfOrigin = null;
      processedValues.isTransient = false;
    }

    if (!processedValues.isTransient) {
      processedValues.houseOwner = null;
      processedValues.isRegistered = false;
    }

    if (!processedValues.isRegistered && processedValues.transientDateRegistered) {
      processedValues.transientDateRegistered = null;
    }

    if (!processedValues.isAffiliated) {
      processedValues.asOfficer = null;
      processedValues.asMember = null;
      processedValues.organizationAffiliated = null;
    }

    Object.keys(processedValues).forEach((key) => {
      if (FP_BOOLEAN_VALUES.includes(key)) {
        processedValues[key] = !!processedValues[key];
      }
      else if (FP_ID_VALUES.includes(key)) {
        const value = processedValues[key];
        if(value === 'N/A')
        processedValues[key] = null;
      }
      else if (!FP_REQUIRED_FIELDS.includes(key)) {
        const value = processedValues[key];
        if (value === '' || value === undefined) {
          processedValues[key] = null;
        }
      }
    });

    if (isEditing) {
      // Update existing family member
      updateItem('familyMembers', editIndex, processedValues);
      
      // Clear the editing state
      setIsEditing(false);
      setEditIndex(-1);
      sessionStorage.removeItem('editingMemberIndex');
    } else {
      // Add new family member
      addItem('familyMembers', processedValues);
    }

    console.log('FAMILY PROFILE:', processedValues);
    
    handleNext();
  };

  return(
    <div className='form-container'>
      <div className='responsive-container'>
        <div className='responsive-header'>FAMILY PROFILE</div>
        <div className='responsive-form'>
          <PersonalInfo
            values={values}
            handleChange={handleChange}
            handleDateChange={handleDateChange}
            handleContactChange={handleContactChange}
            errors={errors}
          />
          <ProfessionalInfo
            values={values}
            handleChange={handleChange}
            handleIncomeChange={handleIncomeChange}
            errors={errors}
          />
          <OtherInfo
            values={values}
            handleChange={handleChange}
            handleIDChange={handleIDChange}
            errors={errors}
          />
          <Checkbox
            values={values}
            handleChange={handleChange}
            errors={errors}
          />
        </div>

        {Boolean(values.isIpula) && (
          <IpulaDetails
            values={values}
            handleChange={handleChange}
            handleDateChange={handleDateChange}
            errors={errors}
          />
        )}

        {Boolean(values.isTransient) && (
          <TransientDetails
            values={values}
            handleChange={handleChange}
            handleDateChange={handleDateChange}
            errors={errors}
          />
        )}

        {Boolean(values.isAffiliated) && (
          <AffiliationDetails
            values={values}
            handleChange={handleChange}
            handleDateChange={handleDateChange}
            errors={errors}
          />
        )}
        
        <FormButtons
          onBack={handleBack}
          onNext={handleSubmit}
          backLabel="Back"
          nextLabel= {isEditing ? 'Update' : 'Next'}
        />
        <Notification
          snackbarMessage={snackbarMessage} 
          snackbarOpen={snackbarOpen} 
          setSnackbarOpen={setSnackbarOpen} 
          severity={severity}
        />
      </div>
    </div>
  );
}