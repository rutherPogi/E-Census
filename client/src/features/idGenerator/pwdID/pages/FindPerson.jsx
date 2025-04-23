import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button } from "@mui/material";
import { Add } from "@mui/icons-material";

import { FP_INITIAL_VALUES } from "../utils/initialValues";
import { Notification } from "../../../../components/common";

import { useFormValidation } from '../hooks/useFormValidation';
import { useNotification } from "../hooks/useNotification";
import { get, post } from "../../../../utils/api/apiService";

import SearchResultsTable from '../components/others/FindPersonSection/SearchResult';
import PersonSearchForm from "../components/others/FindPersonSection/PersonSearch";
import FormButtons from '../components/others/FindPersonSection/FormButtons';





export default function PWDFindPerson() {

  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState(null);

  const [populationID, setPopulationID] = useState('');
  const [pwdApplicationID, setpwdApplicationID] = useState('');

  const navigate = useNavigate();

  const {
    values,
    setValues,
    errors,
    validateForm,
    handleChange,
    handleDateChange
  } = useFormValidation(
    FP_INITIAL_VALUES
  );

  const { 
    snackbarOpen, 
    snackbarMessage, 
    severity, 
    showNotification, 
    setSnackbarOpen 
  } = useNotification();

  const generateNewSurveyId = async () => {
    try {
      const response = await get('/pwdID/generate');
      return response.pwdID;
    } catch (err) {
      console.error('Error fetching PWD ID:', err);
      showNotification('Failed to generate PWD ID. Please try again.', 'error');
    } 
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
        
    if (!validateForm()) {
      showNotification("Please fill in all required fields", 'error');
      return;
    }
    
    setLoading(true);
    try {
      const formattedDate = values.birthdate
        ? new Date(new Date(values.birthdate).getTime() - new Date().getTimezoneOffset() * 60000)
            .toISOString()
            .split('T')[0]
        : null;

      const response = await post('/pwdID/find', {
        firstName: values.firstName,
        middleName: values.middleName || '',
        lastName: values.lastName,
        suffix: values.suffix || '',
        birthdate: formattedDate,
        sex: values.sex
      });
      
      console.log('Search response:', response);
      
      if (response && response.population && response.population.length > 0) {
        setSearchResults(response.population);
        showNotification(`Found ${response.population.length} results`, 'success');
      } else {
        setSearchResults([]);
        showNotification('No matching records found', 'info');
      }
    } catch (error) {
      console.error('Error searching for person:', error);
      showNotification('Error searching for person. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectPerson = (person, uniqueKey) => {
    // Store the relevant IDs
    const id = person.populationID || person.pwdApplicationID || null;
    
    console.log('Selected ID:', id);
    console.log('PWD ID NUMBER:', person.pwdApplicationID || 'None');

    // Set the IDs to state variables
    setPopulationID(person.populationID || null);
    setpwdApplicationID(person.pwdApplicationID || null);

    console.log('Population ID:', populationID);
    console.log('PWD Application ID:', pwdApplicationID);
    
    // Toggle selection logic
    setSelectedPerson(uniqueKey === selectedPerson ? null : uniqueKey);
  };

  const handleContinue = async () => {

    if (pwdApplicationID) {
      console.log('RENEWAL');
      navigate(`/main/generate-id/pwd/renewal/${pwdApplicationID}`);
      return;
    } else if (populationID) {
      console.log('REGISTERED RESIDENT');
      const newApplicantID = await generateNewSurveyId();
      console.log('NEW APPLICANT ID:', newApplicantID);
      console.log('POPULATION ID:', populationID);
      navigate(`/main/generate-id/pwd/resident/${newApplicantID}/${populationID}`);
    } else {
      console.log('NEW APPLICANT');
      const newApplicantID = await generateNewSurveyId();
      console.log('NEW APPLICANT ID:', newApplicantID);
      navigate(`/main/generate-id/pwd/new/${newApplicantID}`, { 
        state: { pwdApplicationNumber: newApplicantID } 
      });
    }
    
  };

  return(
    <Box 
      sx={{ 
        maxWidth: 1200, 
        mx: 'auto',
        backgroundColor: '#fff',
        p: { xs: 2, sm: 3 }
      }}
    >
      <Box sx={{display: 'flex', justifyContent: 'flex-end', mb: 3}}>
        <Button 
          variant='contained' 
          startIcon={<Add />}
          onClick={handleContinue}
        >
          Add New Application
        </Button>
      </Box>

      
      <PersonSearchForm
        values={values}
        errors={errors}
        handleChange={handleChange}
        handleDateChange={handleDateChange}
      />
      
      <FormButtons 
        onNext={handleSubmit}
        backLabel="Back"
        nextLabel={loading ? 'Searching...' : 'Find Person'}
        nextDisabled={loading || !values.firstName || !values.lastName}
        loading={loading}
      />
      
      {searchResults.length > 0 && (
        <SearchResultsTable
          searchResults={searchResults}
          selectedPerson={selectedPerson} 
          handleSelectPerson={handleSelectPerson}/>
      )}

      {selectedPerson && (
        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
          <Button 
            variant="contained" 
            color="success"
            onClick={handleContinue}
          >
            Continue with Selected Person
          </Button>
        </Box>
      )}

      <Notification
        snackbarMessage={snackbarMessage} 
        snackbarOpen={snackbarOpen} 
        setSnackbarOpen={setSnackbarOpen} 
        severity={severity}
      />
    </Box>
  )
}