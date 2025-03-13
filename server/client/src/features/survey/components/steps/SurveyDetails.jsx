import { useFormContext } from "../../pages/FormContext";
import { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import { BARANGAY_OPTIONS, MUNICIPALITY_OPTIONS } from '../../utils/constants';
import { TextInput, CurrencyInput, DropdownInput } from '../others/FormFields'
import { formatCurrency } from '../../utils/formatter'
import { Snackbar, Alert } from '@mui/material';


export default function SurveyDetails({ handleBack, handleNext}) {

  const location = useLocation();
  const surveyNumber = location.state?.surveyNumber;
  const { formData, updateFormData } = useFormContext();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const [values, setValues] = useState({
    surveyID: surveyNumber,
    respondent: '',
    interviewer: '',
    barangay: '',
    municipality: '',
    totalMonthlyIncome: '',
    irregularIncome: '',
    familyIncome: ''
  }); 

  const [errors, setErrors] = useState({
    respondent: false,
    interviewer: false,
    barangay: false,
    municipality: false,
    totalMonthlyIncome: false,
    irregularIncome: false,
    familyIncome: false
  }); 

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
    Object.keys(values).forEach(key => {
      if (!values[key]) {
        newErrors[key] = 'This field is required';
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleChange = (field) => (e, newValue) => {
    const value = newValue?.value || e.target.value;
    setValues(prev => ({
      ...prev,
      [field]: value
    }));
    setErrors(prev => ({
      ...prev,
      [field]: value ? '' : errors[field]
    }));
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
    setValues(prev => ({
      ...prev,
      [field]: formatCurrency(plainNumber)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
        
    if (!validateForm()) {
      setSnackbarMessage("Please fill in all required fields");
      setSnackbarOpen(true);
      return;
    }
    
    updateFormData('surveyData', values);
    console.log("Survey Details:", values);
    
    handleNext();
  };


  return(
    <div className='responsive-container'>
      <div className='responsive-header'>SURVEY #{surveyNumber}</div>
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
          onChange={handleChange('interviewer')}
          error={errors.interviewer}
          helperText = {errors.interviewer}
          placeholder = 'Enter respondents name'
          required
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
          onChange = {(e, newValue) => handleChange('municipality')(e, newValue)}
          error = {errors.municipality} 
          helperText = {errors.municipality}
          placeholder = 'Enter your municipality'
          required
        />
        <CurrencyInput
          label = 'Average Monthly Income'
          value =  {values.totalMonthlyIncome}
          onChange =  {handleIncomeChange('totalMonthlyIncome')}
          error =  {errors.totalMonthlyIncome}
          helperText = {errors.totalMonthlyIncome}
          required
        />
        <CurrencyInput
          label = 'Irregular Income'
          value =  {values.irregularIncome}
          onChange =  {handleIncomeChange('irregularIncome')}
          error =  {errors.irregularIncome}
          helperText = {errors.irregularIncome}
          required
        />
        <CurrencyInput
          label = 'Family Income'
          value =  {values.familyIncome}
          onChange =  {handleIncomeChange('familyIncome')}
          error =  {errors.familyIncome}
          helperText = {errors.familyIncome}
          required
        />
      </div>
      <div className='form-buttons'>
          <div className='form-buttons-right'>
            <button type='button' className="btn cancel-btn" onClick={handleBack}>Cancel</button>
            <button type='button' className="btn submit-btn" onClick={handleSubmit}>Next</button>
          </div> 
      </div>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={5000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleSnackbarClose} 
          severity="error" 
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  )
}