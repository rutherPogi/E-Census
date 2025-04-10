import { useState } from 'react';



export const useSurveySubmit = ( initialValues ) => {

  const [values, setValues] = useState(initialValues);

  const submitSurveyData = (values) => {
    updateFormData('surveyData', values);
    console.log("Survey Details:", values);
  };

  return {
    submitSurveyData,
    values,
    setValues
  };
};