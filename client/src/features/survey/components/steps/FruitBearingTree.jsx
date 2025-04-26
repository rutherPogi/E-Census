import { useEffect } from "react";

import { TREE_TYPES } from "../../utils/initialValues";
import { FormButtons } from '../../../../components/common';
import { TextInput } from "../../../../components/common/FormFields";

import { useFormContext } from '../../pages/FormContext';
import { useFormValidation } from '../../hooks/useFormValidation';




export default function FruitBearingTree({ handleBack, handleNext }) {

  const { formData, updateFormData } = useFormContext();

  const initialValues = () => {
    const existingData = formData.fruitBearingTree?.tree || {};

    return Object.fromEntries(TREE_TYPES.map(type => [
      type, 
      typeof existingData[type] === 'string' ? existingData[type] : ''
    ]));
  };

  const {
      values,
      setValues,
      errors,
      handleNumChange,
    } = useFormValidation(initialValues);



    useEffect(() => {
      if (formData.fruitBearingTree) {
        setValues(prev => ({ ...prev, ...formData.fruitBearingTree }));
      }
    }, [formData.fruitBearingTree]);


  const handleSubmit = (e) => {
    e.preventDefault();

    const processedValues = { ...values };
    
    Object.keys(processedValues).forEach((key) => {
      const value = processedValues[key];
        if (value === '' || value === null) {
          processedValues[key] = '0';
        }
    });

    updateFormData('fruitBearingTree', { tree: processedValues });
    console.log("FRUIT BEARING TREES:", processedValues);

    handleNext();
  };

  const isAllEmpty = Object.values(values).every(
    (val) => val === '' || val === null || val === undefined
  );
  
  
  return (
    <div className='responsive-container'>
      <div className='responsive-header'>FRUIT BEARING TREES</div>
      <div className='responsive-form'>
        {TREE_TYPES.map((field) => (
          <TextInput
            key={field}
            label={field}
            value={values[field]}
            onChange={handleNumChange(field)}
            error={errors[field]}
            helperText={errors[field] || `No. of ${field} tree`}
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