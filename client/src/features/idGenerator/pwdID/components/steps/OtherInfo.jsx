import { useState, useEffect } from "react";
import { Box, Button, Container } from '@mui/material';

import { useFormContext } from "../others/FormContext";
import { NameFields } from "../../components/others/Namefield";
import { Notification } from "../../../components/Notification";
import { TextInput } from "../../../../../components/common/FormFields";


export default function OtherInfo({ handleBack, handleNext}) {

  const { formData, updateFormData } = useFormContext();

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [severity, setSeverity] = useState('');

  const [values, setValues] = useState({
    cpFirstName: '', cpMiddleName: '', cpLastName: '', cpSuffix: '', license: '',
    poFirstName: '', poMiddleName: '', poLastName: '', poSuffix: '',
    aoFirstName: '', aoMiddleName: '', aoLastName: '', aoSuffix: '',
    eFirstName: '', eMiddleName: '', eLastName: '', eSuffix: ''
  }); 

  useEffect(() => {
    if (formData.otherInfo) {
      setValues(prev => ({ ...prev, ...formData.otherInfo }));
    }
  }, [formData.otherInfo]);

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

    updateFormData('otherInfo', processedValues);
    console.log("Accomplished By:", processedValues);
    
    handleNext();
  };


  return(
    <div className='responsive-container'>
      <div className='responsive-header'>OTHER INFORMATION</div>
      <Container sx = {{ display: 'flex', flexDirection: 'column', gap: 2, p: 2 }}>
        <Box>
          <NameFields title="Certified Physician" values={values} handleChange={handleChange} fieldPrefix="cp" />
          <Box sx={{ display: 'grid',  gridTemplateColumns: 'repeat(4, 1fr)', gap: 2 }}>
            <TextInput
              label='License No.'
              value={values.license}
              onChange={handleChange(`license`)}
              helperText='e.g. --'
            />
          </Box>
        </Box>
        <NameFields title="Processing Officer" values={values} handleChange={handleChange} fieldPrefix="po" />
        <NameFields title="Approving Officer" values={values} handleChange={handleChange} fieldPrefix="ao" />
        <NameFields title="Encoder" values={values} handleChange={handleChange} fieldPrefix="e" />
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
        setSeverity={severity}
      />
    </div>
  )
}