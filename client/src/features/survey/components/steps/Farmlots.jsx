import { useEffect } from "react";

import { FL_INITIAL_VALUES } from "../../utils/initialValues";
import { FormButtons } from '../../../../components/common'
import { NumberInput } from "../../../../components/common/FormFields";

import { useFormContext } from '../../pages/FormContext';
import { useFormValidation } from '../../hooks/useFormValidation';




export default function Farmlots({ handleBack, handleNext }) {

  const { formData, updateFormData } = useFormContext();

  const {
      values,
      setValues,
      errors,
      handleNumChange
    } = useFormValidation(FL_INITIAL_VALUES);

  useEffect(() => {
    if (formData.farmlots) {
      setValues(prev => ({ ...prev, ...formData.farmlots }));
    }
  }, [formData.farmlots]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    const processedValues = { ...values };
    
    Object.keys(processedValues).forEach((key) => {
        const value = processedValues[key];
        if (value === '' || value === null) {
          processedValues[key] = '0';
      }
    });

    updateFormData('farmlots', processedValues);
    console.log("FARMLOTS:", processedValues);

    handleNext();
  };

  const isAllEmpty = Object.values(values).every(
    (val) => val === '' || val === null || val === undefined
  );
  

  return(
    <div className='responsive-container'>
      <div className='responsive-header'>NO. OF FARM LOTS</div>
      <div className='responsive-form details'>
        <NumberInput
          label="Cultivation"
          value={values.cultivation}
          onChange={handleNumChange('cultivation')}
          error={errors.cultivation}
          helperText={errors.cultivation || 'How many lots for cultivation?'}
          min={0}
        />
        <NumberInput
          label="Pastureland"
          value={values.pastureland}
          onChange={handleNumChange('pastureland')}
          error={errors.pastureland}
          helperText={errors.pastureland || 'How many lots for pastureland?'}
          min={0}
        />
        <NumberInput
          label="Forestland"
          value={values.forestland}
          onChange={handleNumChange('forestland')}
          error={errors.forestland}
          helperText={errors.forestland || 'How many lots for forestland?'}
          min={0}
        />
      </div>
      <FormButtons 
        onBack={handleBack}
        onNext={handleSubmit}
        backLabel="Back"
        nextLabel={isAllEmpty ? "Skip" : "Next"}
      />
    </div>
  )
}