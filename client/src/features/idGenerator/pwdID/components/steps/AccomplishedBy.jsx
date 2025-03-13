import { useState, useEffect } from "react";
import { Button, Container } from '@mui/material';

import { useFormContext } from "../others/FormContext";
import { NameFields } from "../../components/others/Namefield";
import { Notification } from "../../../components/Notification";


export default function AccomplishedBy({ handleBack, handleNext}) {

  const { formData, updateFormData } = useFormContext();

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [severity, setSeverity] = useState('');

  const [values, setValues] = useState({
    applicantFirstName: '', applicantMiddleName: '', applicantLastName: '', applicantSuffix: '',
    repFirstName: '', repMiddleName: '', repLastName: '', repSuffix: '',
    guardianFirstName: '', guardianMiddleName: '', guardianLastName: '', guardianSuffix: '',
  }); 

  useEffect(() => {
    if (formData.accomplishedBy) {
      setValues(prev => ({ ...prev, ...formData.accomplishedBy }));
    }
  }, [formData.accomplishedBy]);

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

    updateFormData('accomplishedBy', processedValues);
    console.log("Accomplished By:", processedValues);
    
    handleNext();
  };


  return(
    <div className='responsive-container'>
      <div className='responsive-header'>ACCOMPLISHED BY</div>
      <Container sx = {{ display: 'flex', flexDirection: 'column', gap: 2, p: 2 }}>
        <NameFields title="Applicant" values={values} handleChange={handleChange} fieldPrefix="applicant" />
        <NameFields title="Guardian" values={values} handleChange={handleChange} fieldPrefix="guardian" />
        <NameFields title="Representative" values={values} handleChange={handleChange} fieldPrefix="rep" />
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