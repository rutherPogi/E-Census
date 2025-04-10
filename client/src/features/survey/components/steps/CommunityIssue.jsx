import { useEffect } from "react";

import { CI_INITIAL_VALUES } from "../../utils/initialValues";
import { Notification, FormButtons } from '../../../../components/common'
import { TextInput } from "../../../../components/common/FormFields";

import { useFormContext } from '../../pages/FormContext';
import { useFormValidation } from '../../hooks/useFormValidation';
import { useNotification } from "../../hooks/useNotification";

export default function CommunityIssue({ handleBack, handleNext }) {

  const { formData, updateFormData } = useFormContext();

  const {
    values,
    setValues,
    errors,
    validateForm,
    handleChange
  } = useFormValidation(
    CI_INITIAL_VALUES, 
    true, 
    ['issues']);

  const { 
    snackbarOpen, 
    snackbarMessage, 
    severity, 
    showNotification, 
    setSnackbarOpen 
  } = useNotification();

  useEffect(() => {
    if (formData.communityIssues) {
      setValues(prev => ({ ...prev, ...formData.communityIssues }));
    }
  }, [formData.communityIssues]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!validateForm()) {
      showNotification("Please fill in all required fields", 'error');
      return;
    };

    updateFormData('communityIssues', values);
    console.log("COMMUNITY ISSUES:", values);

    handleNext()
  };

  return(
    <div className='responsive-container'>
      <div className='responsive-header'>ISSUES/PROBLEMS IN THE COMMUNITY</div>
      <form id='survey-form' className='responsive-form details' onSubmit={handleSubmit}>
        <TextInput
          label='Issues/Problems in the community'
          value={values.issues}
          onChange={handleChange('issues')}
          error={errors.issues}
          helperText={errors.issues || 'Write the issues/problem in the community.'}
          multiline
        />
      </form>
      <FormButtons 
        onBack={handleBack}
        onNext={handleSubmit}
        backLabel="Back"
        nextLabel="Next"
      />
      <Notification
        snackbarMessage={snackbarMessage} 
        snackbarOpen={snackbarOpen} 
        setSnackbarOpen={setSnackbarOpen} 
        severity={severity}
      />
    </div>
  )
}