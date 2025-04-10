import { useEffect } from "react";

import { FAMILY_RESOURCES } from '../../utils/initialValues';
import { FormButtons } from '../../../../components/common'
import { CurrencyInput } from "../../../../components/common/FormFields";

import { useFormContext } from '../../pages/FormContext';
import { useFormValidation } from '../../hooks/useFormValidation';


export default function FamilyResources({ handleBack, handleNext }) {

  const { formData, updateFormData } = useFormContext();

  const initialValues = () => {
    const existingData = formData.familyResources?.resources || {};
    return Object.fromEntries(
      FAMILY_RESOURCES.map(type => [ type, existingData[type] || '' ])
    );
  };

  const {
      values,
      setValues,
      errors,
      handleIncomeChange,
    } = useFormValidation(initialValues);


  useEffect(() => {
    if (formData.familyResources) {
      setValues(prev => ({ ...prev, ...formData.familyResources }));
    }
  }, [formData.familyResources]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const processedValues = { ...values };
    
    Object.keys(processedValues).forEach((key) => {
      const value = processedValues[key];
        if (value === '' || value === null) {
          processedValues[key] = '0';
        }
    });

    updateFormData('familyResources', { resources: processedValues });
    console.log("FAMILY RESOURCES:", processedValues);

    handleNext();
  };



  
  return (
    <div className='responsive-container'>
      <div className='responsive-header'>FAMILY RESOURCES</div>
      <div className='responsive-form'>
        {FAMILY_RESOURCES.map((field) => (
          <CurrencyInput
            key={field}
            label={field}
            name={field}
            value={values[field]}
            onChange={handleIncomeChange(field)}
            error={errors[field]}
            helperText={errors[field] || `Amount of ${field} resources`}
            placeholder={'0.00'}
          />
        ))}
      </div>
      <FormButtons 
        onBack={handleBack}
        onNext={handleSubmit}
        backLabel="Back"
        nextLabel="Next"
      />
    </div>
  );
}