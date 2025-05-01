import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box } from '@mui/material';

import { useFormContext } from "../../pages/FormContext";
import { useSurveyData } from "../../hooks/useSurveyData";

import DisplaySurveySections from "../others/DisplaySurveySections/DisplaySurveySections";

export default function ViewSurvey() {

  const [viewing, setViewing] = useState(true);
  const params = useParams();
  const surveyID = params.id;

  const { formData } = useFormContext();
  const { fetchSurveyData } = useSurveyData(surveyID);


  useEffect(() => {
    console.log('Fetching survey data...');
    fetchSurveyData();
  }, []);

  console.log('Form data:', formData);
  console.log('Viewing:', viewing);
  

  return (
    <div className='responsive-container'>
      <Box
        sx={{ 
          display: 'flex', 
          flexDirection: 'column',
          gap: '2em',
          backgroundColor: '#fff',
          padding: '1em'
      }}>
        <DisplaySurveySections formData={formData} isViewing={viewing} />
      </Box> 
    </div>
  );
}