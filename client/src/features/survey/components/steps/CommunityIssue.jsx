import { useState, useEffect } from "react";
import { Button } from '@mui/material';

import { TextInput } from "../others/FormFields";
import { useFormContext } from "../../pages/FormContext";
import { Notification } from '../../../../components/common/Notification'



export default function CommunityIssue({ handleBack, handleNext }) {

  const { formData, updateFormData } = useFormContext();

  const [values, setValues] = useState({ issue: formData.issue || '' })
  const [errors, setErrors] = useState({issue: false});

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [severity, setSeverity] = useState('');

  const showNotification = (message, type) => {
    setSnackbarMessage(message);
    setSeverity(type);
    setSnackbarOpen(true);
  };


  useEffect(() => {
    if (formData.communityIssues) {
      setValues(prev => ({ ...prev, ...formData.communityIssues }));
    }
  }, [formData.communityIssues]);

  const validateForm = () => {
    let isValid = true;
    const newErrors = { issue: false };
  
    if (!values.issue.trim()) {
      newErrors.issue = "This field is required.";
      isValid = false;
    }
  
    setErrors(newErrors);
    return isValid;
  };
  
  const handleChange = (field) => (e, newValue) => {
    const value = newValue?.value || e.target.value;
    setValues(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: false }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!validateForm()) {
      showNotification("Please fill in all required fields", 'error');
      return;
    };

    updateFormData('communityIssues', values);
    console.log("Current Form Values:", values);

    handleNext()
  };

  return(
    <div className='responsive-container'>
      <div className='responsive-header'>ISSUES/PROBLEMS IN THE COMMUNITY</div>
      <form id='survey-form' className='responsive-details' onSubmit={handleSubmit}>
        <TextInput
          label='Issues/Problems in the community'
          value={values.issue}
          onChange={handleChange('issue')}
          error={errors.issue}
          helperText={errors.issue || 'Enter what are the issues/problem in the community.'}
          multiline
        />
      </form>
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