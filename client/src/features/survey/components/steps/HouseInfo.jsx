import { useEffect } from "react";

import { Notification, FormButtons } from '../../../../components/common'
import { HI_INITIAL_VALUES } from "../../utils/initialValues";
import { HI_REQUIRED_FIELDS } from "../../utils/requiredFields";

import { useFormContext } from "../../pages/FormContext";
import { useFormValidation } from "../../hooks/useFormValidation";
import { useNotification } from "../../hooks/useNotification";

import { HousingCondition, HousingStructure, HouseImages } from "../others/HouseInfoSections";




export default function HouseInfo({ handleBack, handleNext}) {

  
  const { formData, updateFormData } = useFormContext();

  const {
      values,
      setValues,
      errors,
      setErrors,
      validateForm,
      handleChange,
    } = useFormValidation(
      HI_INITIAL_VALUES,
      true, 
      HI_REQUIRED_FIELDS
    );

  useEffect(() => {
    if (formData.houseInfo) {
      setValues({
        //houseImageID : formData.
        houseCondition: formData.houseInfo.houseCondition || "",
        houseStructure: formData.houseInfo.houseStructure || "",
        houseImages: formData.houseInfo.houseImages || []
      });
    }
  }, [formData.houseInfo]);

  const { 
      snackbarOpen,  
      snackbarMessage, 
      severity, 
      showNotification, 
      setSnackbarOpen 
    } = useNotification();
    
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Custom validation for house images
    const newErrors = {...errors};
    
    if (!values.houseImages || values.houseImages.length === 0) {
      newErrors.houseImages = "At least one house image is required";
      setErrors(newErrors);
      showNotification("Please upload at least one house image", "error");
      return;
    }
    
    // Check if any image is missing a title
    const missingTitles = values.houseImages.some(img => !img.title || img.title.trim() === "");
    if (missingTitles) {
      newErrors.title = "All images must have titles";
      setErrors(newErrors);
      showNotification("Please add titles to all images", "error");
      return;
    }

    if (!validateForm()) {
      showNotification("Please fill in all required fields", "error");
      return;
    }

    updateFormData('houseInfo', values);
    console.log("HOUSE INFO 1:", values);

    handleNext();
  }; 

  return(
    <div className='responsive-container'>
      <div className='responsive-header'>HOUSING CONDITIONING AND STRUCTURE</div>
      <form id="survey-form" className="responsive-form details" onSubmit={handleSubmit}>
        <HousingCondition
          value={values.houseCondition}
          onChange={handleChange}
          error={errors.houseCondition}
        />
        
        <HousingStructure
          value={values.houseStructure}
          onChange={handleChange}
          error={errors.houseStructure}
        />
        
        <HouseImages
          images={values.houseImages}
          setValues={setValues}
          errors={errors}
          showNotification={showNotification}
          handleChange={handleChange}
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