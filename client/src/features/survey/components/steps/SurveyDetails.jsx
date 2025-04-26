import { useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';

import { SD_REQUIRED_FIELDS } from '../../utils/requiredFields';
import { SD_INITIAL_VALUES } from '../../utils/initialValues';
import { Notification, FormButtons } from '../../../../components/common'
import { BARANGAY_OPTIONS, FAMILY_CLASS_OPTIONS, 
         MUNICIPALITY_OPTIONS } from '../../utils/options';
import { TextInput, CurrencyInput, DropdownInput } from "../../../../components/common/FormFields";

import { useFormContext } from '../../pages/FormContext';
import { useFormValidation } from '../../hooks/useFormValidation';
import { useNotification } from '../../hooks/useNotification';
import { useAuth } from '../../../../utils/auth/authContext'




export default function SurveyDetails({ handleNext }) { 

  const navigate = useNavigate();
  const location = useLocation();
  const surveyNumber = location.state?.surveyNumber;

  const { userData } = useAuth();
  const { formData, updateFormData } = useFormContext();


  const {
    values,
    setValues,
    errors,
    validateForm,
    handleChange,
    handleIncomeChange,
  } = useFormValidation(
    SD_INITIAL_VALUES(surveyNumber, userData.accountName, userData.barangay),
    true, 
    SD_REQUIRED_FIELDS
  );

  const { 
    snackbarOpen, 
    snackbarMessage, 
    severity, 
    showNotification, 
    setSnackbarOpen 
  } = useNotification();

  useEffect(() => {
    if (formData.surveyData) {
      setValues(prev => ({
        ...prev,
        ...formData.surveyData
      }));
    }
  }, [formData.surveyData, surveyNumber, setValues]);

  const handleBack = () => {
    navigate('/main/survey');
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
        
    if (!validateForm()) {
      showNotification('Please fill in all required fields', 'error')
      return;
    }

    if( values.familyClass === null || values.familyClass === undefined || values.familyClass === '') { 
      values.familyClass = 'N/A' 
    };
    
    updateFormData('surveyData', values);
    console.log("Survey Details:", values);
    
    handleNext();
  };




  return(
    <div className='responsive-container'>
      <div className='responsive-header'>SURVEY DETAILS</div>
      <div className='responsive-form'>
        <div className="section-title field-full">Household Information</div>
        <TextInput
          label='Respondent'
          value={values.respondent}
          onChange={handleChange('respondent')}
          error={errors.respondent}
          helperText = {errors.respondent}
          placeholder = 'Enter respondents name'
          required
        />
        <DropdownInput
          label = 'Family Class'
          options = {FAMILY_CLASS_OPTIONS}
          value = {values.familyClass}
          onChange = {(e, newValue) => handleChange('familyClass')(e, newValue)}
          error = {errors.familyClass} 
          helperText = {errors.familyClass}
          placeholder = 'Enter family class'
        />
        <div className="section-title field-full">Location Information</div>
        <DropdownInput
          label = 'Barangay'
          options = {BARANGAY_OPTIONS}
          value = {values.barangay}
          onChange = {(e, newValue) => handleChange('barangay')(e, newValue)}
          error = {errors.barangay} 
          helperText = {errors.barangay || ''}
          placeholder = 'Enter your barangay'
          required
        />
        <DropdownInput
          label = 'Municipality'
          options = {MUNICIPALITY_OPTIONS}
          value = {values.municipality}
          placeholder = 'Enter your municipality'
          disabled
        />
        <div className="section-title field-full">Financial Information</div>
        <CurrencyInput
          label = 'Average Monthly Income'
          value =  {values.monthlyIncome}
          onChange =  {handleIncomeChange('monthlyIncome')}
          error =  {errors.monthlyIncome}
          helperText = {errors.monthlyIncome}
          placeholder= '0.00'
          required
        />
        <CurrencyInput
          label = 'Irregular Income'
          value =  {values.irregularIncome}
          onChange =  {handleIncomeChange('irregularIncome')}
          error =  {errors.irregularIncome}
          helperText = {errors.irregularIncome}
          placeholder= '0.00'
          required
        />
        <CurrencyInput
          label = 'Family Income'
          value =  {values.familyIncome}
          onChange =  {handleIncomeChange('familyIncome')}
          error =  {errors.familyIncome}
          helperText = {errors.familyIncome}
          placeholder= '0.00'
          required
        />
      </div>
      <FormButtons 
        onBack={handleBack}
        onNext={handleSubmit}
        backLabel="Cancel"
        nextLabel="Next"
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