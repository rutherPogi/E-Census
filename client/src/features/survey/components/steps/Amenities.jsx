import { useEffect } from "react";

import { AMENITY_TYPES } from "../../utils/initialValues";
import { FormButtons } from '../../../../components/common';
import { NumberInput } from "../../../../components/common/FormFields";

import { useFormContext } from '../../pages/FormContext';
import { useFormValidation } from '../../hooks/useFormValidation';




export default function Amenities({ handleBack, handleNext }) {

  const { formData, updateFormData } = useFormContext();

  const initialValues = () => {
    const existingData = formData.amenitiesOwn?.amenities || {};
    return Object.fromEntries(
      AMENITY_TYPES.map(type => [ type, existingData[type] || '' ])
    );
  }; 

  const {
    values,
    setValues,
    errors,
    handleNumChange,
  } = useFormValidation(initialValues);

  useEffect(() => {
    if (formData.amenitiesOwn) {
      setValues(prev => ({ ...prev, ...formData.amenitiesOwn }));
    }
  }, [formData.amenitiesOwn]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const processedValues = { ...values };
    
    Object.keys(processedValues).forEach((key) => {
      const value = processedValues[key];
        if (value === '' || value === null) {
          processedValues[key] = '0';
        }
    });

    updateFormData('amenitiesOwn', { amenities: processedValues });
    console.log("AMENITIES OWN:", processedValues);

    handleNext();
  };
  
  return (
    <div className='responsive-container'>
      <div className='responsive-header'>AMENITIES</div>
      <div className='responsive-form'>
        {AMENITY_TYPES.map((field) => (
          <NumberInput
            key={field}
            label={field}
            value={values[field]}
            onChange={handleNumChange(field)}
            error={errors[field]}
            helperText={errors[field] || `No. of ${field} own`}
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