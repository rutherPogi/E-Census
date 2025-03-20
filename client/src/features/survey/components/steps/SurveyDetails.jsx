import { useState, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';


import { TextInput, CurrencyInput, DropdownInput } from '../others/FormFields'
import { SD_REQUIRED_FIELDS } from '../../utils/constants';
import { formatCurrency } from '../../utils/formatter'
import { useFormContext } from "../../pages/FormContext";
import { Notification } from '../../../../components/common/Notification'
import { BARANGAY_OPTIONS, FAMILY_CLASS_OPTIONS, INCOME_EMPLOYMENT_OPTIONS, 
         MUNICIPALITY_OPTIONS } from '../../utils/options';
import { useAuth } from '../../../../utils/auth/authContext'



export default function SurveyDetails({ handleNext}) {

  const navigate = useNavigate();
  const location = useLocation();
  const surveyNumber = location.state?.surveyNumber;

  const { userData } = useAuth();
  const { formData, updateFormData } = useFormContext();

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [severity, setSeverity] = useState('');

  const [values, setValues] = useState({
    surveyID: surveyNumber,
    respondent: '',
    interviewer: userData.accountName,
    barangay: '',
    municipality: 'Itbayat',
    totalMonthlyIncome: '',
    irregularIncome: '',
    familyIncome: '',
    familyClass: '',
    employmentType: ''
  }); 

  const [errors, setErrors] = useState({
    respondent: false,
    interviewer: false,
    barangay: false,
    municipality: false,
    totalMonthlyIncome: false,
    irregularIncome: false,
    familyIncome: false,
    familyClass: false,
    employmentType: false
  }); 

  const showNotification = (message, type) => {
    setSnackbarMessage(message);
    setSeverity(type);
    setSnackbarOpen(true);
  };

  const handleBack = () => {
    navigate('/main/survey');
  }

  useEffect(() => {
    if (formData.surveyData) {
      setValues(prev => ({
        ...prev,
        ...formData.surveyData,
        surveyID: surveyNumber
      }));
    }
  }, [formData.surveyData, surveyNumber]);


  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    // Validate required fields
    SD_REQUIRED_FIELDS.forEach(key => {
      const value = values[key];
      if (!value) {
        newErrors[key] = 'This field is required';
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };


  const handleChange = (field) => (e, newValue) => {
    const value = newValue?.value || e.target.value;
    setValues(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: value ? '' : errors[field] }));
  };

  const handleIncomeChange = (field) => (e) => {
    const value = e.target.value;
    const plainNumber = value.replace(/,/g, '');
    
    if (!/^\d*$/.test(plainNumber)) {
      setErrors(prev => ({ ...prev, [field]: 'Please enter numbers only' }));
      return;
    }
    
    if (Number(plainNumber) > 999999999) {
      setErrors(prev => ({ ...prev, [field]: 'Amount cannot exceed ₱999,999,999' }));
      return;
    }
    
    setErrors(prev => ({ ...prev, [field]: false }));
    setValues(prev => ({ ...prev, [field]: formatCurrency(plainNumber) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
        
    if (!validateForm()) {
      showNotification('Please fill in all required fields', 'error')
      return;
    }
    
    updateFormData('surveyData', values);
    console.log("Survey Details:", values);
    
    handleNext();
  };


  return(
    <div className='responsive-container'>
      <div className='responsive-header'>SURVEY DETAILS</div>
      <div className='responsive-form'>
        <TextInput
          label='Respondent'
          value={values.respondent}
          onChange={handleChange('respondent')}
          error={errors.respondent}
          helperText = {errors.respondent}
          placeholder = 'Enter respondents name'
          required
        />
        <TextInput
          label='Interviewer'
          value={values.interviewer}
          disabled
        />
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
          required
        />
        <CurrencyInput
          label = 'Average Monthly Income'
          value =  {values.totalMonthlyIncome}
          onChange =  {handleIncomeChange('totalMonthlyIncome')}
          error =  {errors.totalMonthlyIncome}
          helperText = {errors.totalMonthlyIncome}
          placeholder= '0.00'
        />
        <DropdownInput
          label = 'Employment Type'
          options = {INCOME_EMPLOYMENT_OPTIONS}
          value = {values.employmentType}
          onChange = {(e, newValue) => handleChange('employmentType')(e, newValue)}
          error = {errors.employmentType} 
          helperText = {errors.employmentType}
          placeholder = 'Enter family class'
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