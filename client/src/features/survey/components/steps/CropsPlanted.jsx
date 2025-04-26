import { useState, useEffect } from "react";

import { CROP_TYPES } from "../../utils/initialValues";
import { FormButtons } from '../../../../components/common'
import { SizeInput } from "../../../../components/common/FormFields";

import { useFormContext } from '../../pages/FormContext';
import { useFormValidation } from '../../hooks/useFormValidation';


export default function CropsPlanted({ handleBack, handleNext }) {

  const { formData, updateFormData } = useFormContext();

  const initialValues = () => {
    const existingData = formData.cropsPlanted?.crops || {};
    return Object.fromEntries(
      CROP_TYPES.map(type => [ type, existingData[type] || '' ])
    );
  }; 

  const {
    values,
    setValues,
    errors,
    handleNumChange
  } = useFormValidation(initialValues);

  useEffect(() => {
    if (formData.cropsPlanted) {
      setValues(prev => ({ ...prev, ...formData.cropsPlanted }));
    }
  }, [formData.cropsPlanted]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const processedValues = { ...values };
    
    Object.keys(processedValues).forEach((key) => { 
      const value = processedValues[key];
        if (value === '' || value === null || value === undefined) {
          processedValues[key] = '0';
        }
    });

    updateFormData('cropsPlanted', { crops: processedValues });
    console.log("CROPS PLANTED:", processedValues);

    handleNext();
  };

  const isAllEmpty = Object.values(values).every(
    (val) => val === '' || val === null || val === undefined
  );
  
  
  return (
    <div className='responsive-container'>
      <div className='responsive-header'>CROPS PLANTED</div>
      <div className='responsive-form'>
        {CROP_TYPES.map((field) => (
          <SizeInput
            key={field}
            label={field}
            name={field}
            value={values[field]}
            onChange={handleNumChange(field)}
            error={errors[field]}
            helperText={errors[field] || `Land area of ${field}`}
          />
        ))}
      </div>
      <FormButtons 
        onBack={handleBack}
        onNext={handleSubmit}
        backLabel="Back"
        nextLabel={isAllEmpty ? "Skip" : "Next"}
      />
    </div>
  );
}