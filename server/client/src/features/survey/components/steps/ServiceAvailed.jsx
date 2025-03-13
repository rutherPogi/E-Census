import { useFormContext } from "../../pages/FormContext";
import { useState, useEffect } from "react";
import { TextInput, DateInput, GenderInput } from '../others/FormFields'
import { Snackbar, Alert } from '@mui/material';
import dayjs from 'dayjs';


export default function ServiceAvailed({ handleBack, handleNext }) {

  const { formData, addItem, updateItem } = useFormContext();
  const { serviceAvailed = [] } = formData;
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(-1);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const [total, setTotal] = useState(0)
  const [values, setValues] = useState({
    date: null,
    ngo: '',
    assistance: '',
    male: '',
    female: '',
    total: '',
    howServiceHelp: ''
  })

  const [errors, setErrors] = useState({
    date: false,
    ngo: false,
    assistance: false,
    male: false,
    female: false,
    howServiceHelp: false
  });

  useEffect(() => {
    const storedEditIndex = sessionStorage.getItem('editingMemberIndex');
    
    if (storedEditIndex !== null) {
      const index = parseInt(storedEditIndex);
      if (serviceAvailed[index]) {
        setIsEditing(true);
        setEditIndex(index);
        
        // Transform the data for editing
        const memberToEdit = serviceAvailed[index];
        setValues({
          ...memberToEdit,
          // Convert string date to dayjs object if it exists
          date: memberToEdit.date ? dayjs(memberToEdit.date) : null
        });
      }
    }
  }, [serviceAvailed]);

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};
  
    if (!values.date || !values.date.isValid()) {
      newErrors.date = "Date is required.";
      isValid = false;
    }
  
    if (!values.ngo.trim()) {
      newErrors.ngo = "NGO name is required.";
      isValid = false;
    }
  
    if (!values.assistance.trim()) {
      newErrors.assistance = "Service/Assistance field is required.";
      isValid = false;
    }
  
    if (values.male === '' || isNaN(values.male)) {
      newErrors.male = "Please enter a valid number.";
      isValid = false;
    }
  
    if (values.female === '' || isNaN(values.female)) {
      newErrors.female = "Please enter a valid number.";
      isValid = false;
    }
  
    if (!values.howServiceHelp.trim()) {
      newErrors.howServiceHelp = "This field is required.";
      isValid = false;
    }
  
    setErrors(newErrors);
    return isValid;
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleNumberChange = (field) => (e) => {
    const value = e.target.value;
  
    if (value === '') {
      setValues(prev => ({
        ...prev,
        [field]: ''
      }));
      updateTotal({ ...values, [field]: '' });
      return;
    }
  
    if (!/^\d*$/.test(value)) {
      setErrors(prev => ({ ...prev, [field]: "Please enter numbers only" }));
      return;
    }
  
    if (Number(value) > 999) {
      setErrors(prev => ({ ...prev, [field]: "Number cannot exceed 999" }));
      return;
    }
  
    setErrors(prev => ({ ...prev, [field]: false }));
    setValues(prev => ({
      ...prev,
      [field]: value
    }));
    
    updateTotal({ ...values, [field]: value });
  };

  const updateTotal = (currentValues) => {
    const maleValue = parseInt(currentValues.male) || 0;
    const femaleValue = parseInt(currentValues.female) || 0;
    setValues(prev => ({
      ...prev,
      total: maleValue + femaleValue
    }));
  };

  const handleDateChange = (newValue) => {
    // Check if newValue is null
    if (!newValue || !newValue.isValid()) {
      setValues(prev => ({
        ...prev,
        date: dayjs() // Set to current date if invalid
      }));
      return;
    }

    setValues(prev => ({
      ...prev,
      date: newValue
    }));
  };

  const handleChange = (field) => (e) => {
    const value = e.target.value;
    setValues(prev => ({
      ...prev,
      [field]: value
    }));
    setErrors(prev => ({
      ...prev,
      [field]: false
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setSnackbarMessage("Please fill in all required fields.");
      setSnackbarOpen(true);
      return;
    }

    const processedValues = {
      ...values,
      date: values.date && values.date.isValid() 
        ? values.date.format('YYYY-MM-DD')
        : dayjs().format('YYYY-MM-DD'),
      male: parseInt(values.male) || 0,
      female: parseInt(values.female) || 0,
      total: parseInt(values.total) || 0
    };

    if (isEditing) {
      updateItem('serviceAvailed', editIndex, processedValues);
      console.log("Updated Service:", processedValues);
      
      setIsEditing(false);
      setEditIndex(-1);
      sessionStorage.removeItem('editingMemberIndex');
    } else {
      addItem('serviceAvailed', processedValues);
      console.log("Added Service:", processedValues);
      console.log("FORM:", formData);
    }

    handleNext();
  };

  return(
    <div className='responsive-container'>
      <div className='responsive-header'>ASSISTANCE/SERVICE ALREADY AVAILED</div>
      <div className='responsive-details'>
        <DateInput 
          label="Date Availed"
          value={values.date}
          onChange={handleDateChange}
          error={errors.date}
          helperText={errors.date}
        />
        <TextInput
          label='Name of NGO'
          value={values.ngo}
          onChange={handleChange('ngo')}
          error={errors.ngo}
          helperText = {errors.ngo}
          placeholder = 'Enter name of NGO'
        />
        <TextInput
          label='Kind of Service/Assistance Availed'
          value={values.assistance}
          onChange={handleChange('assistance')}
          error={errors.assistance}
          helperText = {errors.assistance}
          placeholder = 'Enter kind of assistance'
        />
        <div className='input-field serve'>
          <label>No. of Family Member Serve</label>
          <GenderInput
            label = 'Male'
            value = {values.male} 
            onChange = {handleNumberChange('male')}
            error = {errors.male} 
            helperText = {errors.male}  
          />
          <GenderInput
            label = 'Female'
            value = {values.female} 
            onChange = {handleNumberChange('female')}
            error = {errors.female} 
            helperText = {errors.female}  
          />
          <GenderInput
            label = 'Total'
            value = {values.total}
            variant = 'filled'
          />
        </div>
        <TextInput
          label='How the service help the family'
          value={values.howServiceHelp}
          onChange={handleChange('howServiceHelp')}
          error={errors.howServiceHelp}
          helperText={errors.howServiceHelp || 'ex. ...'}
          multiline
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