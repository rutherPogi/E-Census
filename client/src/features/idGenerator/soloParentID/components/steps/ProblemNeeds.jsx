import { useEffect } from "react";

import { Notification, FormButtons } from "../../../../../components/common";
import { TextInput } from '../../../../../components/common/FormFields'
import { PN_INITIAL_VALUES } from "../../utils/initialValues";

import { useFormContext } from "../others/FormContext";
import { useNotification } from '../../hooks/useNotification';
import { useFormValidation } from '../../hooks/useFormValidation';



export default function ProblemNeeds({ handleBack, handleNext}) {

  const { formData, updateFormData } = useFormContext();

  const {
    values,
    setValues,
    errors,
    validateForm,
    handleChange,
  } = useFormValidation( PN_INITIAL_VALUES );

  const { 
    snackbarOpen, 
    snackbarMessage, 
    severity, 
    showNotification, 
    setSnackbarOpen 
  } = useNotification();



  useEffect(() => {
    if (formData.problemNeeds) {
      setValues(prev => ({ ...prev, ...formData.problemNeeds }));
    }
  }, [formData.problemNeeds]);


  const handleSubmit = async (e) => {
    e.preventDefault();
        
    if (!validateForm()) {
      return showNotification("Please fill in all required fields", 'error');
    }

    const processedValues = { ...values };
    
    Object.keys(processedValues).forEach((key) => {
      const value = processedValues[key];
      if (value === '' || value === undefined) {
        processedValues[key] = null;
      }
    });
    
    updateFormData('problemNeeds', processedValues);
    console.log("Problem & Needs:", processedValues);
    
    handleNext();
  };

  return(
    <div className='responsive-container'>
      <div className='responsive-header'>SOLO PARENT CIRCUMTANCES, PROBLEMS, AND NEEDS</div>
      <div className='responsive-form details'>
        <TextInput
          value={values.causeSoloParent}
          onChange={handleChange('causeSoloParent')}
          error={errors.causeSoloParent}
          helperText = {errors.causeSoloParent || 'Dahilan bakit naging solo parent'}
          placeholder={'Classification/Circumtances of being a solo parent (Dahilan bakit naging solo parent)'}
          multiline
          required
        />
        <TextInput
          value={values.needsSoloParent}
          onChange={handleChange('needsSoloParent')}
          error={errors.needsSoloParent}
          helperText = {errors.needsSoloParent || 'Kinakailangan/Problema ng isa ng solo parent'}
          placeholder={'Needs/Problem of being a solo parent (Kinakailangan/Problema ng isa ng solo parent)'}
          multiline
          required
        />
      </div>
      <FormButtons
        onBack = {handleBack} 
        onNext = {handleSubmit} 
        backLabel = 'Back' 
        nextLabel = 'Next' 
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