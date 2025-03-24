import { useState, useEffect } from "react";
import { Button } from '@mui/material';
import dayjs from 'dayjs';

import { TextInput, DateInput, GenderInput } from '../others/FormFields'
import { useFormContext } from "../../pages/FormContext";




export default function ServiceAvailed({ handleBack, handleNext }) {

  const { formData, addItem, updateItem } = useFormContext();
  const { serviceAvailed = [] } = formData;

  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(-1);

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

  const handleNumberChange = (field) => (e) => {
    const value = e.target.value;
  
    if (value === '') {
      setValues(prev => ({ ...prev, [field]: '' }));
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
    setValues(prev => ({ ...prev, [field]: value }));
    
    updateTotal({ ...values, [field]: value });
  };

  const updateTotal = (currentValues) => {
    const maleValue = parseInt(currentValues.male) || 0;
    const femaleValue = parseInt(currentValues.female) || 0;
    setValues(prev => ({ ...prev, total: maleValue + femaleValue }));
  };

  const handleDateChange = (newValue) => {
    if (!newValue || !newValue.isValid()) {
      setValues(prev => ({ ...prev, date: dayjs() }));
      return;
    }
    setValues(prev => ({ ...prev, date: newValue }));
  };

  const handleChange = (field) => (e) => {
    const value = e.target.value;
    setValues(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: false }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const processedValues = {
      ...values,
      date: values.date && values.date.isValid() 
        ? values.date.format('YYYY-MM-DD')
        : null,
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
            <Button variant='outlined' onClick={handleBack} sx={{ width: '100%' }}>Cancel</Button>
            <Button variant='contained' onClick={handleSubmit} sx={{ width: '100%' }}>Next</Button>
          </div>     
      </div>
    </div>
  )
}