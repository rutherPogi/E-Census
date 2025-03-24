import { useState, useEffect } from "react";
import { Button } from '@mui/material';
import dayjs from 'dayjs';

import { TextInput, DateInput } from '../others/FormFields'
import { useFormContext } from "../../pages/FormContext";




export default function Affiliation({ handleBack, handleNext }) {

  const { formData, addItem, updateItem } = useFormContext();
  const { affiliation = [] } = formData;
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(-1);

  const [values, setValues] = useState({
    nameAffiliated: '',
    asOfficer: null,
    asMember: null,
    organizationAffiliated: ''
  })

  const [errors, setErrors] = useState({
    nameAffiliated: false,
    asOfficer: false,
    asMember: false,
    organizationAffiliated: false
  });

  useEffect(() => {
    const storedEditIndex = sessionStorage.getItem('editingMemberIndex');
    
    if (storedEditIndex !== null) {
      const index = parseInt(storedEditIndex);
      if (affiliation[index]) {
        setIsEditing(true);
        setEditIndex(index);
        
        // Transform the data for editing
        const memberToEdit = affiliation[index];
        setValues({
          ...memberToEdit,
          asOfficer: memberToEdit.asOfficer ? dayjs(memberToEdit.asOfficer) : null,
          asMember: memberToEdit.asMember ? dayjs(memberToEdit.asMember) : null
        });
      }
    }
  }, [affiliation]);

  const handleDateChange = (field) => (newValue) => {
    if (!newValue || !newValue.isValid()) {
      setValues(prev => ({ ...prev, [field]: field === 'asOfficer' ? 'N/A' : dayjs() }));
      setErrors(prev => ({ ...prev, [field]: field === 'asMember' ? "Invalid date" : false }));
      return;
    }
  
    setValues(prev => ({ ...prev, [field]: newValue }));
    setErrors(prev => ({ ...prev, [field]: false }));
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
      asOfficer: values.asOfficer === 'N/A' ? 'N/A' 
        : values.asOfficer && values.asOfficer.isValid() 
          ? values.asOfficer.format('YYYY-MM-DD') 
          : 'N/A',
      asMember: values.asMember && values.asMember.isValid() 
        ? values.asMember.format('YYYY-MM-DD') 
        : null
    };
    

    if (isEditing) {
      updateItem('affiliation', editIndex, processedValues);
      console.log("Updated Affiliation:", processedValues);
      
      setIsEditing(false);
      setEditIndex(-1);
      sessionStorage.removeItem('editingMemberIndex');
    } else {
      addItem('affiliation', processedValues);
      console.log("Added Affiliation:", processedValues);
    }

    handleNext();
  };

  return(
    <div className='responsive-container'>
      <div className='responsive-header'>AFFILIATION IN GOVERNMENT/NGO ORGANIZATION</div>
      <div className='responsive-form'>
        <TextInput
          label='Name'
          value={values.nameAffiliated}
          onChange={handleChange('nameAffiliated')}
          error={errors.nameAffiliated}
          helperText = {errors.nameAffiliated}
          placeholder = 'Enter name of affiliated'
        />
        <DateInput 
          label="As Officer"
          value={values.asOfficer}
          onChange={handleDateChange('asOfficer')}
          error={errors.asOfficer}
          helperText={errors.asOfficer}
        />
        <DateInput 
          label="As Member"
          value={values.asMember}
          onChange={handleDateChange('asMember')}
          error={errors.asMember}
          helperText={errors.asMember}
        />
        <TextInput
          label='Name of Organization'
          value={values.organizationAffiliated}
          onChange={handleChange('organizationAffiliated')}
          error={errors.organizationAffiliated}
          helperText = {errors.organizationAffiliated}
          placeholder = 'Name of affiliated organization'
        />
      </div>
      <div className='form-buttons'>
          <div className='form-buttons-right'>
            <Button variant='outlined' onClick={handleBack} sx={{ width: '100%' }}>Back</Button>
            <Button variant='contained' onClick={handleSubmit} sx={{ width: '100%' }}>Next</Button>
          </div>     
      </div>
    </div>
  )
}