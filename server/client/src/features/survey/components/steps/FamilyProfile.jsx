import { useFormContext } from "../../pages/FormContext";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { TextInput, CurrencyInput, DropdownInput, DateInput } from '../others/FormFields'
import { 
  SUFFIX_OPTIONS, CIVIL_STATUS_OPTIONS, EDUCATIONAL_OPTIONS, 
  EMPLOYMENT_OPTIONS, RELATIONSHIP_OPTIONS, FP_REQUIRED_FIELDS } from '../../utils/constants';
import { formatCurrency } from '../../utils/formatter'
import { Snackbar, Alert } from '@mui/material';
import dayjs from 'dayjs';
 

export default function FamilyProfile({ handleBack, handleNext }) {

  const params = useParams();
  const { formData, addItem, updateItem } = useFormContext();
  const { familyMembers = [] } = formData;
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(-1);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

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

  useEffect(() => {
      // Check if we're editing an existing member
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

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
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
      birthdate: dateValue, // Store the dayjs object
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
    setValues(prev => ({
      ...prev,
      [field]: formatCurrency(plainNumber)
    }));
  };

  const handleChange = (field) => (e, newValue) => {
    const value = newValue?.value || e.target.value;
    setValues(prev => ({
      ...prev,
      [field]: value
    }));
    setErrors(prev => ({
      ...prev,
      [field]: false
    }));
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
      setSnackbarMessage("Please fill in all required fields");
      setSnackbarOpen(true);
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
          helperText = {errors.firstName}
          placeholder = 'Enter First Name'
          required
        />
        <TextInput
          label='Middle Name'
          value={values.middleName}
          onChange={handleChange('middleName')}
          error={errors.middleName}
          helperText = {errors.middleName}
          placeholder = 'Enter Middle Name'
          required
        />
        <TextInput
          label='Last Name'
          value={values.lastName}
          onChange={handleChange('lastName')}
          error={errors.lastName}
          helperText = {errors.lastName}
          placeholder = 'Enter Last Name'
          required
        />
        <DropdownInput
          label = 'Suffix'
          options = {SUFFIX_OPTIONS}
          value = {values.suffix}
          onChange = {(e, newValue) => handleChange('suffix')(e, newValue)}
          error = {errors.suffix} 
          helperText = {errors.suffix || ''}
          placeholder = 'Enter your suffix'
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
          helperText = {errors.civilStatus || ''}
          placeholder = 'Enter your civilStatus'
          required
        />
        <DropdownInput
          label = 'Relation to Family Head'
          options = {RELATIONSHIP_OPTIONS}
          value = {values.relationFamilyHead}
          onChange = {(e, newValue) => handleChange('relationFamilyHead')(e, newValue)}
          error = {errors.relationFamilyHead} 
          helperText = {errors.relationFamilyHead || ''}
          placeholder = 'Enter your relationFamilyHead'
          required
        />
        <DropdownInput
          label = 'Educational Attainment'
          options = {EDUCATIONAL_OPTIONS}
          value = {values.educationalAttainment}
          onChange = {(e, newValue) => handleChange('educationalAttainment')(e, newValue)}
          error = {errors.educationalAttainment} 
          helperText = {errors.educationalAttainment || ''}
          placeholder = 'Enter your educationalAttainment'
          required
        />
        <TextInput
          label='Occupation'
          value={values.occupation}
          onChange={handleChange('occupation')}
          error={errors.occupation}
          helperText = {errors.occupation}
          placeholder = 'Enter Occupation'
        />
        <TextInput
          label='Skills Training Attended'
          value={values.skillsTraining}
          onChange={handleChange('skillsTraining')}
          error={errors.skillsTraining}
          helperText = {errors.skillsTraining}
          placeholder = 'Enter skills training attended'
        />
        <DropdownInput
          label = 'Employment Type'
          options = {EMPLOYMENT_OPTIONS}
          value = {values.employmentType}
          onChange = {(e, newValue) => handleChange('employmentType')(e, newValue)}
          error = {errors.employmentType} 
          helperText = {errors.employmentType || ''}
          placeholder = 'Enter your employmentType'
        />
        <TextInput
          label='Philhealth Number'
          value={values.philhealthNumber}
          onChange={handleChange('philhealthNumber')}
          error={errors.philhealthNumber}
          helperText = {errors.philhealthNumber}
          placeholder = 'Enter philhealth number'
        />
        <CurrencyInput
          label = 'Average Monthly Income'
          value =  {values.monthlyIncome}
          onChange =  {handleIncomeChange('monthlyIncome')}
          error =  {errors.monthlyIncome}
          helperText = {errors.monthlyIncome}
        />
        <TextInput
          label='Health Status'
          value={values.healthStatus}
          onChange={handleChange('healthStatus')}
          error={errors.healthStatus}
          helperText = {errors.healthStatus}
          placeholder = 'Enter health status'
        />
        <TextInput
          label='Remarks'
          value={values.remarks}
          onChange={handleChange('remarks')}
          error={errors.remarks}
          helperText = {errors.remarks}
          placeholder = 'Enter remarks'
        />
      </div>
      <div className='form-buttons'>
          <div className='form-buttons-right'>
            <button type='button' className="btn cancel-btn" onClick={handleBack}>Back</button>
            <button type='button' className="btn submit-btn" onClick={handleSubmit}>Next</button>
          </div> 
      </div>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
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