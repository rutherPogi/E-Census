import { useState, useEffect } from "react";
import { Button } from '@mui/material';

import { useFormContext } from "../../components/others/FormContext";
import { SUFFIX_OPTIONS, CIVIL_STATUS_OPTIONS, RELATIONSHIP_OPTIONS, FC_REQUIRED_FIELDS } from '../../utils/constants';
import { formatters } from "../../../utils/formatter";
import { Notification } from "../../../components/Notification";
import { TextInput, DropdownInput, CurrencyInput, NumberInput } from '../../../../../components/common/FormFields'



export default function FamilyComposition({ handleBack, handleNext}) {

  const { formData, addItem, updateItem } = useFormContext();
  const { familyComposition = [] } = formData;
  
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(-1);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [severity, setSeverity] = useState('');

  const [values, setValues] = useState({
    firstName: '', middleName: '', lastName: '', suffix: '',
    relationship: '',
    age: '',
    civilStatus: '',
    occupation: '',
    income: ''
  }); 

  const [errors, setErrors] = useState({
    firstName: false, middleName: false, lastName: false, suffix: false,
    relationship: false,
    age: false,
    civilStatus: false,
    occupation: false,
    income: false
  }); 

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

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    FC_REQUIRED_FIELDS.forEach(field => {
      if (!values[field]) {
        newErrors[field] = 'This field is required';
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (field) => (e, newValue) => {
    let value = newValue?.value || e.target.value;

    if (field === 'income') {
      value = formatters.currency(value);
    } else if(field === 'age') {
      value = formatters.age(value);
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
        <TextInput
          label='First Name'
          value={values.firstName}
          onChange={handleChange('firstName')}
          error={errors.firstName}
          helperText = {errors.firstName || 'Juan'}
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
        <NumberInput
          label='Age'
          value={values.age}
          onChange={handleChange('age')}
          error={errors.age}
          helperText = {errors.age}
          required
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
          label = 'Income'
          value =  {values.income}
          onChange =  {handleChange('income')}
          error =  {errors.income}
          helperText = {errors.income}
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