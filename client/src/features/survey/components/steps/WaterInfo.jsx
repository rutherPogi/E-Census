import { useEffect } from "react";


import { Notification, FormButtons } from '../../../../components/common'
import { WI_INITIAL_VALUES } from "../../utils/initialValues";
import { WATER_SOURCES_OPTIONS } from "../../utils/options";
import { AccessPotable, WaterSources } from '../../components/others/WaterInfoSections/'

import { useFormContext } from "../../pages/FormContext";
import { useFormValidation } from '../../hooks/useFormValidation';
import { useNotification } from '../../hooks/useNotification';
import { WI_REQUIRED_FIELDS } from "../../utils/requiredFields";



export default function WaterInfo({ handleBack, handleNext}) {

  const { formData, updateFormData } = useFormContext();

  const {
    values,
    setValues,
    errors,
    validateForm,
    handleChange,
  } = useFormValidation(
    WI_INITIAL_VALUES,
    true,
    WI_REQUIRED_FIELDS
    );

  const { 
    snackbarOpen, 
    snackbarMessage, 
    severity, 
    showNotification, 
    setSnackbarOpen 
  } = useNotification();


  useEffect(() => {
    if (formData.waterInfo) {
      setValues({
        waterInfoID: formData.waterInfo.waterInfoID || null,
        waterAccess: formData.waterInfo.waterAccess || '',
        potableWater: formData.waterInfo.potableWater || '',
        waterSources: formData.waterInfo.waterSources || ''
      });
    }
  }, [formData.waterInfo]);

 

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      showNotification('Please fill in all required fields', 'error');
      return;
    }

    updateFormData('waterInfo', values);
    console.log("WATER INFO:", values);

    handleNext();
  };



  return(
    <div className='responsive-container'>
      <div className='responsive-header'>WATER INFORMATION</div>
      <form id='survey-form' className='responsive-form details'>
        <AccessPotable 
          values={values} 
          handleChange={handleChange} 
          errors={errors} 
        />
        <WaterSources
          values={values}
          handleChange={handleChange}
          errors={errors}
          options={WATER_SOURCES_OPTIONS}
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