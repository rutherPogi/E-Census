import { useEffect } from "react";

import { APPLIANCE_TYPES } from "../../utils/initialValues";
import { FormButtons } from '../../../../components/common';
import { NumberInput } from "../../../../components/common/FormFields";

import { useFormContext } from '../../pages/FormContext';
import { useFormValidation } from '../../hooks/useFormValidation';
 



export default function AppliancesOwn({ handleBack, handleNext }) {

  const { formData, updateFormData } = useFormContext();


  const initialValues = () => {
    const existingData = formData.appliancesOwn?.appliances || {};
    return Object.fromEntries(
      APPLIANCE_TYPES.map(type => [ type, existingData[type] || '' ])
    );
  }; 

  const {
    values,
    setValues,
    errors,
    handleNumChange,
  } = useFormValidation(initialValues);


  useEffect(() => {
    if (formData.appliancesOwn) {
      setValues(prev => ({ ...prev, ...formData.appliancesOwn }));
    }
  }, [formData.appliancesOwn]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const processedValues = { ...values };
    
    Object.keys(processedValues).forEach((key) => {
      const value = processedValues[key];
        if (value === '' || value === null) {
          processedValues[key] = '0';
        }
    });

    updateFormData('appliancesOwn', { appliances: processedValues });
    console.log("APPLIANCES OWN:", processedValues);

    handleNext();
  };
  
  return (
    <div className='responsive-container'>
      <div className='responsive-header'>APPLIANCES OWN</div>
      <div className='responsive-form'>
        {APPLIANCE_TYPES.map((field) => (
          <NumberInput
            key={field}
            label={field}
            value={values[field]}
            onChange={handleNumChange(field)}
            error={errors[field]}
            helperText={errors[field] || `No. of ${field} own`}
            min={0}
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