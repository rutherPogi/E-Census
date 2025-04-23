import { useEffect } from "react";

import { NameFields } from "../others/Namefield";
import { FormButtons } from '../../../../../components/common';
import { FB_INITIAL_VALUES } from "../../utils/initialValues";

import { useFormContext } from "../others/FormContext";
import { useFormValidation } from '../../hooks/useFormValidation';





export default function FamilyBackground({ handleBack, handleNext}) {

  const { formData, updateFormData } = useFormContext();

  const {
    values,
    setValues,
    errors,
    handleChange,
  } = useFormValidation( FB_INITIAL_VALUES );

  useEffect(() => {
    if (formData.familyBackground) {
      setValues(prev => ({ ...prev, ...formData.familyBackground }));
    }
  }, [formData.familyBackground]);

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
      <div className='responsive-form details'>
        <div className="section-title field-full">Father's Name</div>
        <NameFields 
          values={values} 
          handleChange={handleChange} 
          fieldPrefix="father" 
          errors={errors}
        />
  
        <div className="section-title field-full">Mother's Name</div>
        <NameFields 
          values={values} 
          handleChange={handleChange} 
          fieldPrefix="mother" 
          errors={errors}
        />
  
        <div className="section-title field-full">Gurdian's Name</div>
        <NameFields 
          values={values} 
          handleChange={handleChange} 
          fieldPrefix="guardian" 
          errors={errors}
        />
      </div>
      <FormButtons
        onBack = {handleBack} 
        onNext = {handleSubmit} 
        backLabel = 'Back' 
        nextLabel = 'Next' 
      />
    </div>
  )
}