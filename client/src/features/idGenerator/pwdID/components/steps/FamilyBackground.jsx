import { useState, useEffect } from "react";
import { Button, Container, Typography, Box} from '@mui/material';

import { useFormContext } from "../others/FormContext";
import { NameFields } from "../../components/others/Namefield";
import { Notification } from "../../../components/Notification";
import { TextInput } from "../../../../../components/common/FormFields";

export default function FamilyBackground({ handleBack, handleNext}) {

  const { formData, updateFormData } = useFormContext();

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [severity, setSeverity] = useState('');

  const [values, setValues] = useState({
    fatherFirstName: '', fatherMiddleName: '', fatherLastName: '', fatherSuffix: '',
    motherFirstName: '', motherMiddleName: '', motherLastName: '',
    guardianFirstName: '', guardianMiddleName: '', guardianLastName: '', guardianSuffix: '',
  }); 

  useEffect(() => {
    if (formData.familyBackground) {
      setValues(prev => ({ ...prev, ...formData.familyBackground }));
    }
  }, [formData.familyBackground]);

  const handleChange = (field) => (e, newValue) => {
    let value = newValue?.value || e.target.value;

    setValues(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const processedValues = { ...values }
    Object.keys(processedValues).forEach((key) => {
      const value = processedValues[key];
      if (value === '' || value === null) {
        processedValues[key] = 'N/A';
      }
    });

    updateFormData('familyBackground', processedValues);
    console.log("Family Background:", processedValues);
    
    handleNext();
  };


  return(
    <div className='responsive-container'>
      <div className='responsive-header'>FAMILY BACKGROUND</div>
      <Container sx = {{ display: 'flex', flexDirection: 'column', gap: 2, p: 2 }}>
        <NameFields title="Father's Name" values={values} handleChange={handleChange} fieldPrefix="father" />
        <Box sx = {{mb: 2}}>
          <Typography sx = {{ mb: 2}}>Mother's Name</Typography>
          <Box 
            sx={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(4, 1fr)', 
              gap: 2 
            }}
          >
            <TextInput
              label='First Name'
              value={values.motherFirstName}
              onChange={handleChange(`motherFirstName`)}
            />
            <TextInput
              label='Middle Name'
              value={values.motherMiddleName}
              onChange={handleChange(`motherMiddleName`)}
            />
            <TextInput
              label='Last Name'
              value={values.motherLastName}
              onChange={handleChange(`motherLastName`)}
            />
            <Box/>
          </Box>
        </Box>
        <NameFields title="Guardian's Name" values={values} handleChange={handleChange} fieldPrefix="guardian" />
      </Container>
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