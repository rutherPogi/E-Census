import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@mui/material";
import dayjs from 'dayjs';

import { useFormContext } from "../../pages/FormContext";
import { TextInput, CurrencyInput, DropdownInput, DateInput } from '../others/FormFields'
import { FP_REQUIRED_FIELDS } from '../../utils/constants'
import { formatCurrency } from '../../utils/formatter'
import { Notification } from '../../../../components/common/Notification'
import { SUFFIX_OPTIONS, CIVIL_STATUS_OPTIONS, EDUCATIONAL_OPTIONS, 
         EMPLOYMENT_OPTIONS, RELATIONSHIP_OPTIONS } from '../../utils/options';


 
export default function FamilyProfile({ handleBack, handleNext }) {

  const params = useParams();
  const { formData, addItem, updateItem } = useFormContext();
  const { familyMembers = [] } = formData;

  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(-1);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [severity, setSeverity] = useState('');

  const [values, setValues] = useState({
    surveyID: params.id,
    firstName: '',
    middleName: '',
    lastName: '',
    suffix: '',
    birthdate: null,
    age: '',
    civilStatus: '',
    relationFamilyHead: '',
    educationalAttainment: '',
    occupation: '',
    skillsTraining: '',
    employmentType: '',
    philhealthNumber: '',
    monthlyIncome: '',
    healthStatus: '',
    remarks: ''
  })

  const [errors, setErrors] = useState({
    firstName: false,
    middleName: false,
    lastName: false,
    suffix: false,
    birthdate: false,
    age: false,
    civilStatus: false,
    relationFamilyHead: false,
    educationalAttainment: false,
    occupation: false,
    skillsTraining: false,
    employmentType: false,
    philhealthNumber: false,
    monthlyIncome: false,
    healthStatus: false,
    remarks: false
  });

  const showNotification = (message, type) => {
    setSnackbarMessage(message);
    setSeverity(type);
    setSnackbarOpen(true);
  };

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
          birthdate: memberToEdit.birthdate ? dayjs(memberToEdit.birthdate) : null
        });
      }
    }
  }, [familyMembers]);


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

    const birthdate = dateValue.toDate();
    const today = new Date();
    let age = today.getFullYear() - birthdate.getFullYear();
    
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

  const handleChange = (field) => (e, newValue) => {
    const value = newValue?.value || e.target.value;
    setValues(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: false }));
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    FP_REQUIRED_FIELDS.forEach(key => {
      const value = values[key];
      if (key === 'birthdate') {
        if (!value) {
          newErrors.birthdate = 'This field is required';
          isValid = false;
        }
      } else {
        if (!value) {
          newErrors[key] = 'This field is required';
          isValid = false;
        }
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      showNotification('Please fill in all required fields', 'error')
      return;
    }

    const processedValues = { ...values };

    Object.keys(processedValues).forEach((key) => {
      if (!FP_REQUIRED_FIELDS.includes(key)) {
        const value = processedValues[key];
        if (value === '' || value === null) {
          if (key === 'monthlyIncome') {
            processedValues[key] = '0';
          } else {
            processedValues[key] = 'N/A';
          }
        }
      }
    });

    if (isEditing) {
      // Update existing family member
      updateItem('familyMembers', editIndex, processedValues);
      console.log("Updated Family Member:", processedValues);
      
      // Clear the editing state
      setIsEditing(false);
      setEditIndex(-1);
      sessionStorage.removeItem('editingMemberIndex');
    } else {
      // Add new family member
      addItem('familyMembers', processedValues);
      console.log("Added Family Member:", processedValues);
    }
    
    handleNext();
  };

  return(
    <div className='responsive-container'>
      <div className='responsive-header'>FAMILY PROFILE</div>
      <div className='responsive-form'>
        <TextInput
          label='First Name'
          value={values.firstName}
          onChange={handleChange('firstName')}
          error={errors.firstName}
          helperText = {errors.firstName || 'e.g., Juan'}
          required
        />
        <TextInput
          label='Middle Name'
          value={values.middleName}
          onChange={handleChange('middleName')}
          error={errors.middleName}
          helperText = {errors.middleName || 'e.g, Santos'}
        />
        <TextInput
          label='Last Name'
          value={values.lastName}
          onChange={handleChange('lastName')}
          error={errors.lastName}
          helperText = {errors.lastName || 'e.g, Dela Cruz'}
          required
        />
        <DropdownInput
          label = 'Suffix'
          options = {SUFFIX_OPTIONS}
          value = {values.suffix}
          onChange = {(e, newValue) => handleChange('suffix')(e, newValue)}
          error = {errors.suffix} 
          helperText = {errors.suffix || 'e.g., Jr - Junior'}
        />
        <DateInput 
          label="Birthdate"
          value={values.birthdate}
          onChange={handleBirthdateChange}
          error={errors.birthdate}
          helperText={errors.birthdate}
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
          helperText = {errors.civilStatus || 'e.g., Single'}
          required
        />
        <DropdownInput
          label = 'Relation to Family Head'
          options = {RELATIONSHIP_OPTIONS}
          value = {values.relationFamilyHead}
          onChange = {(e, newValue) => handleChange('relationFamilyHead')(e, newValue)}
          error = {errors.relationFamilyHead} 
          helperText = {errors.relationFamilyHead || 'e.g., Brother'}
          required
        />
        <DropdownInput
          label = 'Educational Attainment'
          options = {EDUCATIONAL_OPTIONS}
          value = {values.educationalAttainment}
          onChange = {(e, newValue) => handleChange('educationalAttainment')(e, newValue)}
          error = {errors.educationalAttainment} 
          helperText = {errors.educationalAttainment || 'e.g., College Level'}
          required
        />
        <TextInput
          label='Occupation'
          value={values.occupation}
          onChange={handleChange('occupation')}
          error={errors.occupation}
          helperText = {errors.occupation || 'e.g., Teacher'}
        />
        <TextInput
          label='Skills Training Attended'
          value={values.skillsTraining}
          onChange={handleChange('skillsTraining')}
          error={errors.skillsTraining}
          helperText = {errors.skillsTraining || 'e.g., ---'}
        />
        <DropdownInput
          label = 'Employment Type'
          options = {EMPLOYMENT_OPTIONS}
          value = {values.employmentType}
          onChange = {(e, newValue) => handleChange('employmentType')(e, newValue)}
          error = {errors.employmentType} 
          helperText = {errors.employmentType || 'e.g., Permanent'}
        />
        <TextInput
          label='Philhealth Number'
          value={values.philhealthNumber}
          onChange={handleChange('philhealthNumber')}
          error={errors.philhealthNumber}
          helperText = {errors.philhealthNumber || '---'}
        />
        <CurrencyInput
          label = 'Average Monthly Income'
          value =  {values.monthlyIncome}
          onChange =  {handleIncomeChange('monthlyIncome')}
          error =  {errors.monthlyIncome}
          helperText = {errors.monthlyIncome}
          placeholder = {'0.00'}
        />
        <TextInput
          label='Health Status'
          value={values.healthStatus}
          onChange={handleChange('healthStatus')}
          error={errors.healthStatus}
          helperText = {errors.healthStatus || 'e.g., ---'}
        />
        <TextInput
          label='Remarks'
          value={values.remarks}
          onChange={handleChange('remarks')}
          error={errors.remarks}
          helperText = {errors.remarks || 'e.g., Out of town'}
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