import { useState, useEffect } from "react";
import { Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, 
         FormHelperText, Button } from "@mui/material";
import dayjs from 'dayjs';

import { useFormContext } from "../../pages/FormContext";
import { TextInput, DateInput } from '../others/FormFields'



export default function NonIvatan({ handleBack, handleNext }) {

  const { formData, addItem, updateItem } = useFormContext();
  const { nonIvatan = [] } = formData;

  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(-1);

  const [values, setValues] = useState({
    name: '',
    settlement: '',
    ethnicity: '',
    origin: '',
    transient: '',
    houseOwner: '',
    transientRegistered: '',
    transientDateRegistered: null
  })

  const [errors, setErrors] = useState({
    name: false,
    settlement: false,
    ethnicity: false,
    origin: false,
    transient: false,
    houseOwner: false,
    transientRegistered: false,
    transientDateRegistered: false
  });

  useEffect(() => {
    const storedEditIndex = sessionStorage.getItem('editingMemberIndex');
    
    if (storedEditIndex !== null) {
      const index = parseInt(storedEditIndex);
      if (nonIvatan[index]) {
        setIsEditing(true);
        setEditIndex(index);
        
        // Transform the data for editing
        const memberToEdit = nonIvatan[index];
        setValues({
          ...memberToEdit,
          transientDateRegistered: memberToEdit.transientDateRegistered 
          ? dayjs(memberToEdit.transientDateRegistered) 
          : null
        });
      }
    }
  }, [nonIvatan]);

  const handleDateChange = (newValue) => {
    if (!newValue || !newValue.isValid()) {
      setValues(prev => ({ ...prev, transientDateRegistered: dayjs() }));
      return;
    }
    setValues(prev => ({ ...prev, transientDateRegistered: newValue }));
  };

  const handleChange = (field) => (e, newValue) => {
    const value = newValue?.value || e.target.value;
    setValues(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: false }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const processedValues = { ...values };
  
    if (processedValues.transient === 'No') {
      processedValues.houseOwner = 'N/A';
      processedValues.transientRegistered = 'N/A';
      processedValues.transientDateRegistered = 'N/A';
    } else if (processedValues.transientRegistered === 'No') {
      processedValues.transientDateRegistered = 'N/A';
    }

    Object.keys(processedValues).forEach(key => {
      if (!processedValues[key] === '' || processedValues[key] === null) {
        processedValues[key] = 'N/A';
      }
    });

    if (isEditing) {
      updateItem('nonIvatan', editIndex, processedValues);
      console.log("Updated Service:", processedValues);
      
      setIsEditing(false);
      setEditIndex(-1);
      sessionStorage.removeItem('editingMemberIndex');
    } else {
      addItem('nonIvatan', processedValues);
      console.log("Added Service:", processedValues);
    }
    
    handleNext();
  };
 
  return(
    <div className='responsive-container'>
      <div className='responsive-header'>FOR IPULA/NON-IVATAN AND TRANSIENTS</div>
      <div className='responsive-form'>
        <TextInput
          label='Name'
          value={values.name}
          onChange={handleChange('name')}
          error={errors.name}
          helperText = {errors.name}
          placeholder = 'Enter your name'
        />
        <TextInput
          label='Details of Settlement'
          value={values.settlement}
          onChange={handleChange('settlement')}
          error={errors.settlement}
          helperText = {errors.settlement}
          placeholder = 'Enter settlement details'
        />
        <TextInput
          label='Ethnicity'
          value={values.ethnicity}
          onChange={handleChange('ethnicity')}
          error={errors.ethnicity}
          helperText = {errors.ethnicity}
          placeholder = 'Enter your ethnicity'
        />
        <TextInput
          label='Place of Origin'
          value={values.origin}
          onChange={handleChange('origin')}
          error={errors.origin}
          helperText = {errors.origin}
          placeholder = 'Enter your origin'
        />
        <FormControl 
          component="fieldset" 
          error={!!errors.transient} 
          fullWidth 
          margin="normal"
        >
          <FormLabel component="legend">Transient?</FormLabel>
          <RadioGroup
            name="transient"
            value={values.transient}
            onChange={(e) => handleChange('transient')(e, e.target.value)}
          >
            <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="No" control={<Radio />} label="No" />
          </RadioGroup>
          {errors.transient && (
            <FormHelperText>{errors.transient}</FormHelperText>
          )}
        </FormControl>
      </div>
      {values.transient === 'Yes' && (
        <div className='responsive-details'>
          <TextInput
            label='House Owner'
            value={values.houseOwner}
            onChange={handleChange('houseOwner')}
            error={!!errors.houseOwner}
            helperText={errors.houseOwner || ''}
            placeholder='Enter house owner name'
          />
          <FormControl 
            component="fieldset" 
            error={!!errors.transientRegistered} 
            fullWidth 
            margin="normal"
          >
            <FormLabel component="legend">Registered?</FormLabel>
            <RadioGroup
              name="transientRegistered"
              value={values.transientRegistered}
              onChange={(e) => handleChange('transientRegistered')(e, e.target.value)}
            >
              <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="No" control={<Radio />} label="No" />
            </RadioGroup>
            {errors.transientRegistered && (
              <FormHelperText>{errors.transientRegistered}</FormHelperText>
            )}
          </FormControl>
          {values.transientRegistered === 'Yes' && (
            <DateInput 
              label="Date Registered"
              value={values.transientDateRegistered}
              onChange={handleDateChange}
              error={!!errors.transientDateRegistered}
              helperText={errors.transientDateRegistered || ''}
            />
          )}
        </div>
      )}
      <div className='form-buttons'>
          <div className='form-buttons-right'>
            <Button variant='outlined' onClick={handleBack} sx={{ width: '100%' }}>Cancel</Button>
            <Button variant='contained' onClick={handleSubmit} sx={{ width: '100%' }}>Next</Button>
          </div>     
      </div>
    </div>
  )
}