import { useState, useEffect } from "react";
import { Button } from '@mui/material';
import dayjs from "dayjs";

import { useFormContext } from "../others/FormContext";
import { SUFFIX_OPTIONS, CIVIL_STATUS_OPTIONS, RELATIONSHIP_OPTIONS, HC_REQUIRED_FIELDS, EDUCATIONAL_OPTIONS, SEX_OPTIONS } from '../../utils/constants';
import { formatters } from "../../../utils/formatter";
import { Notification } from "../../../components/Notification";
import { TextInput, DropdownInput, CurrencyInput, DateInput } from '../../../../../components/common/FormFields'



export default function HouseholdComposition({ handleBack, handleNext}) {

  const { formData, addItem, updateItem } = useFormContext();
  const { householdComposition = [] } = formData;
  
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(-1);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [severity, setSeverity] = useState('');

  const [values, setValues] = useState({
    firstName: '', middleName: '', lastName: '', suffix: '',
    sex: '',
    relationship: '',
    age: '',
    birthdate: null,
    civilStatus: '',
    educationalAttainment: '',
    occupation: '',
    monthlyIncome: ''
  }); 

  const [errors, setErrors] = useState({
    firstName: false, middleName: false, lastName: false, suffix: false,
    sex: false,
    relationship: false,
    age: false,
    birthdate: false,
    civilStatus: false,
    educationalAttainment: false,
    occupation: false,
    monthlyIncome: false
  }); 

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

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    HC_REQUIRED_FIELDS.forEach(field => {
      if (!values[field]) {
        newErrors[field] = 'This field is required';
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleBirthdateChange = (dateValue) => {
      if (!dateValue) {
        setValues({ ...values, birthdate: null, age: '' });
        return;
      }
  
      if (dateValue.isAfter(dayjs())) {
        setErrors(true);
        setValues({ ...values, birthdate: dateValue, age: '' });
        return;
      }
  
      setErrors(false);
      const birthdate = dateValue.toDate(); // Convert dayjs to JavaScript Date
      const today = new Date();
      let age = today.getFullYear() - birthdate.getFullYear();
      
      // Adjust if the birthday hasn't occurred this year yet
      const monthDiff = today.getMonth() - birthdate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthdate.getDate())) {
        age--;
      }
    
      setValues({ 
        ...values, 
        birthdate: dateValue,
        age: age >= 0 ? age : '' 
      });
    };

  const handleChange = (field) => (e, newValue) => {
    let value = newValue?.value || e.target.value;

    if (field === 'monthlyIncome') {
      value = formatters.currency(value);
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
      const value = processedValues[key];
      if (value === '' || value === null) {
        processedValues[key] = 'N/A';
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
        <TextInput
          label='First Name'
          value={values.firstName}
          onChange={handleChange('firstName')}
          error={errors.firstName}
          helperText = {errors.firstName || 'e.g. Juan'}
          required
        />
        <TextInput
          label='Middle Name'
          value={values.middleName}
          onChange={handleChange('middleName')}
          error={errors.middleName}
          helperText = {errors.middleName || 'e.g. Santos'}
        />
        <TextInput
          label='Last Name'
          value={values.lastName}
          onChange={handleChange('lastName')}
          error={errors.lastName}
          helperText = {errors.lastName || 'e.g. Dela Cruz'}
          required
        />
        <DropdownInput
          label = 'Suffix'
          options = {SUFFIX_OPTIONS}
          value = {values.suffix}
          onChange = {(e, newValue) => handleChange('suffix')(e, newValue)}
          error = {errors.suffix} 
          helperText = {errors.suffix || 'e.g. Jr - Junior'}
        />
        <DropdownInput
          label = 'Sex'
          options = {SEX_OPTIONS}
          value = {values.sex}
          onChange = {(e, newValue) => handleChange('sex')(e, newValue)}
          error = {errors.sex} 
          helperText = {errors.sex || 'e.g. Male'}
          required
        />
        <DateInput
          label =  'Birthdate'
          value =  {values.birthdate}
          onChange={handleBirthdateChange}
          error = {errors.birthdate}  
          helperText =  {errors.birthdate}
          required
        />
        <TextInput
          label='Age'
          value={values.age}
          disabled
        />
        <DropdownInput
          label = 'Civil Status'
          options = {CIVIL_STATUS_OPTIONS}
          value = {values.civilStatus}
          onChange = {(e, newValue) => handleChange('civilStatus')(e, newValue)}
          error = {errors.civilStatus} 
          helperText = {errors.civilStatus || 'e.g. Single'}
          required
        />
        <DropdownInput
          label = 'Educational Attainment'
          options = {EDUCATIONAL_OPTIONS}
          value = {values.educationalAttainment}
          onChange = {(e, newValue) => handleChange('educationalAttainment')(e, newValue)}
          error = {errors.educationalAttainment} 
          helperText = {errors.educationalAttainment || 'e.g. Single'}
          required
        />
        <DropdownInput
          label = 'Relationship'
          options = {RELATIONSHIP_OPTIONS}
          value = {values.relationship}
          onChange = {(e, newValue) => handleChange('relationship')(e, newValue)}
          error = {errors.relationship} 
          helperText = {errors.relationship || 'e.g. Father'}
          required
        />
        <TextInput
          label='Occupation'
          value={values.occupation}
          onChange={handleChange('occupation')}
          error={errors.occupation}
          helperText = {errors.occupation || 'e.g. Teacher'}
        />
        <CurrencyInput
          label = 'Monthly Income'
          value =  {values.monthlyIncome}
          onChange =  {handleChange('monthlyIncome')}
          error =  {errors.monthlyIncome}
          helperText = {errors.monthlyIncome}
          placeholder= '0.00'
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