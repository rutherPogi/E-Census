import { useState, useEffect } from "react";
import { useNavigate , useParams} from "react-router-dom";
import { Box, Button } from '@mui/material';

import { useFormContext } from "../../pages/FormContext";
import { get, post } from '../../../../utils/api/apiService';
import { Notification } from '../../../../components/common/Notification'
import { mapFamilyMembers, mapAffiliation, mapNonIvatan, mapServiceAvailed } from "../others/dataMappers"
import { SurveyDetailsSection, HouseInfoSection, WaterInfoSection, 
         FarmLotsSection, CommunityIssueSection } from "../others/SurveySections";
import { ResponsiveTableContainer, StandardTable, ExpenseTable, ItemQuantityTable, 
         KeyValueTable, LivestockTable, ResourcesTable} from "../others/TableSection";
import { LIVESTOCK_TYPES, AMENITY_TYPES, APPLIANCE_TYPES, NON_IVATAN_TABLE_HEADERS,
         FAMILY_PROFILE_TABLE_HEADERS, AFFILIATION_TABLE_HEADERS, SERVICE_AVAILED_TABLE_HEADERS } from '../../utils/constants'



export default function DisplaySurvey({ handleBack, handleEdit, isEditing = false }) {

  const navigate = useNavigate();
  const params = useParams();
  const surveyID = params.id;

  const { formData, clearFormData, setEntireFormData } = useFormContext();

  const [loading, setLoading] = useState(isEditing);
  const [error, setError] = useState(null);
  const [fetchedData, setFetchedData] = useState(null);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [severity, setSeverity] = useState('');

  const showNotification = (message, type) => {
    setSnackbarMessage(message);
    setSeverity(type);
    setSnackbarOpen(true);
  };

  useEffect(() => {
    if (isEditing) {
      console.log('Fetching...');
      fetchSurveyData();
      console.log('Form Data: ', formData);
    }
  }, [isEditing]);

  const fetchSurveyData = async () => {
    setLoading(true);
  
    try {
      const response = await get(`/surveys/view-survey/${surveyID}`, {
        params: { surveyID },
      });
  
      if (response) {
        setFetchedData(response);
        console.log('Raw API response:', response);

        const houseInfo = response.houseInformation[0] || {};
        
        // Transform the API response to match formData structure
        const transformedData = {
          surveyData: response.surveyResponses[0] || {},
          houseInfo: {
            ...houseInfo,
            // Use the image that's already converted to data URL by the server
            houseImagePreview: houseInfo.houseImage || null
          },
          waterInfo: response.waterInformation[0] || {},
          farmlots: response.farmlots[0] || {},
          communityIssues: response.communityIssues[0] || {},
          familyMembers: response.familyProfile || [],
          // Transform expenses data
          foodExpenses: transformExpenses(response.expenses, 'food'),
          educationExpenses: transformExpenses(response.expenses, 'education'),
          familyExpenses: transformExpenses(response.expenses, 'family'),
          monthlyExpenses: transformExpenses(response.expenses, 'monthly'),
          // Other transformations
          livestock: transformLivestock(response.livestock),
          cropsPlanted: { crops: transformKeyValue(response.cropsPlanted, 'cropName', 'fieldSize') },
          fruitBearingTree: { tree: transformKeyValue(response.fruitBearingTree, 'treeName', 'treeCount') },
          familyResources: { resources: transformKeyValue(response.familyResources, 'resourceName', 'amount') },
          appliancesOwn: { appliances: transformKeyValue(response.appliancesOwn, 'applianceName', 'quantity') },
          amenitiesOwn: { amenities: transformKeyValue(response.amenities, 'amenityName', 'quantity') },
          serviceAvailed: response.serviceAvailed || [],
          affiliation: response.governmentAffiliation || [],
          nonIvatan: response.nonIvatan || []
        };
        
        setEntireFormData(transformedData);
        console.log('Setting entire form data with:', transformedData);
      } else {
        throw new Error("Unexpected response format");
      }
  
      setLoading(false);
    } catch (err) {
      console.error('Error fetching data', err);
      setError('Failed to load survey data. Please try again later.');
      setLoading(false);
    }
  };

  const transformExpenses = (expenses, category) => {
    const categoryExpenses = expenses.filter(exp => exp.category === category);
    const expensesObj = {};
    let total = 0;
    
    categoryExpenses.forEach(exp => {
      expensesObj[exp.expenseName] = exp.amount;
      total += Number(exp.amount);
    });
    
    return {
      expenses: expensesObj,
      [`${category}Total`]: total
    };
  };
  
  const transformLivestock = (livestock) => {
    const result = {};
    livestock.forEach(item => {
      result[item.livestockType] = {
        number: item.number,
        own: item.own,
        dispersal: item.dispersal
      };
    });
    return result;
  };
  
  const transformKeyValue = (items, keyField, valueField) => {
    const result = {};
    items.forEach(item => {
      result[item[keyField]] = item[valueField];
    });
    return result;
  };
  
  const { 
    foodExpenses = { expenses: {}, foodTotal: 0 }, 
    educationExpenses = { expenses: {}, educationTotal: 0 },
    familyExpenses = { expenses: {}, familyTotal: 0 },
    monthlyExpenses = { expenses: {}, monthlyTotal: 0 },
    livestock = {},
    cropsPlanted = { crops: {} },
    fruitBearingTree = { tree: {} },
    familyResources = { resources: {} },
    appliancesOwn = { appliances: {} },
    amenitiesOwn = { amenities: {} }
  } = formData;

  const appliancesData = appliancesOwn.appliances || {};
  const amenitiesData = amenitiesOwn.amenities || {};

  const filteredAppliances = APPLIANCE_TYPES.filter(appliance => {
    const quantity = Number(appliancesData[appliance]?.replace(/,/g, '') || 0);
    return quantity >= 1;
  });

  const filteredAmenities = AMENITY_TYPES.filter(amenity => {
    const quantity = Number(amenitiesData[amenity]?.replace(/,/g, '') || 0);
    return quantity >= 1;
  });

  const familyMembersData = formData.familyMembers;
  const affiliationData = formData.affiliation;
  const nonIvatanData = formData.nonIvatan;
  const serviceAvailedData = formData.serviceAvailed;


  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {

      const formDataToSend = new FormData();
      const processedFormData = { ...formData };
      
      if (formData.houseInfo?.houseImage) {
        formDataToSend.append('houseImage', formData.houseInfo.houseImage);

        delete processedFormData.houseInfo.houseImage;
        delete processedFormData.houseInfo.houseImagePreview;
      }

      // If editing, include the surveyID
      if (isEditing && surveyID) {
        processedFormData.surveyID = surveyID;
        formDataToSend.append('surveyData', JSON.stringify(processedFormData));
        await post('/surveys/update-survey', formDataToSend, true);
        showNotification('Survey updated successfully!', 'success');
      } else {
        formDataToSend.append('surveyData', JSON.stringify(processedFormData));
        await post('/surveys/submit-survey', formDataToSend, true);
        showNotification('Survey submitted successfully!', 'success');
      }

      clearFormData();
      setTimeout(() => navigate('/main/survey'), 1000);
    
    } catch (error) {
      console.error('Error submitting survey:', error);
      
      if (error.response) {
        alert(`Server error: ${error.response.data.message || 'Unknown error'}`);
      } else if (error.request) {
        alert('No response from server. Please check your connection.');
      } else {
        alert(`Error preparing request: ${error.message}`);
      }
    }
  };

  if (loading) {
    return <div>Loading survey data...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

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

        <SurveyDetailsSection data={formData} handleEdit={handleEdit}/>
        <HouseInfoSection data={formData} handleEdit={handleEdit}/>
        <WaterInfoSection data={formData} handleEdit={handleEdit}/>
        <FarmLotsSection data={formData} handleEdit={handleEdit}/>
        <CommunityIssueSection data={formData} handleEdit={handleEdit}/>

        <ResponsiveTableContainer title='Family Profile' handleEdit={handleEdit} pageNumber={3}>
          <StandardTable
            title="Family Members Table"
            headers={FAMILY_PROFILE_TABLE_HEADERS}
            data={mapFamilyMembers(familyMembersData)}
          />
        </ResponsiveTableContainer>

        <ResponsiveTableContainer title='Government Affiliation' handleEdit={handleEdit} pageNumber={21}>
          <StandardTable
            title="Government Affiliation Table"
            headers={AFFILIATION_TABLE_HEADERS}
            data={mapAffiliation(affiliationData)}
          />
        </ResponsiveTableContainer>

        <ResponsiveTableContainer title='Non-Ivatan and Transients' handleEdit={handleEdit} pageNumber={23}>
          <StandardTable
            title="Non-Ivatan and Transient Table"
            headers={NON_IVATAN_TABLE_HEADERS}
            data={mapNonIvatan(nonIvatanData)}
          />
        </ResponsiveTableContainer>

        <ResponsiveTableContainer title='Service/Assistance Availed' handleEdit={handleEdit} pageNumber={19}>
          <StandardTable
            title="Service/Assistance Availed Table"
            headers={SERVICE_AVAILED_TABLE_HEADERS}
            data={mapServiceAvailed(serviceAvailedData)}
          />
        </ResponsiveTableContainer>

        <ResponsiveTableContainer  title='Food Expenses' handleEdit={handleEdit} pageNumber={4}>
          <ExpenseTable 
            expenses={foodExpenses.expenses || {}} 
            total={foodExpenses.foodTotal || 0} 
            title="Food" 
          />
        </ResponsiveTableContainer>

        <ResponsiveTableContainer  title='Educational Expenses' handleEdit={handleEdit} pageNumber={5}>
          <ExpenseTable 
            expenses={educationExpenses.expenses || {}} 
            total={educationExpenses.educationTotal || 0} 
            title="Education" 
          />
        </ResponsiveTableContainer>

        <ResponsiveTableContainer  title='Family Expenses' handleEdit={handleEdit} pageNumber={6}>
          <ExpenseTable 
            expenses={familyExpenses.expenses || {}} 
            total={familyExpenses.familyTotal || 0} 
            title="Family" 
          />
        </ResponsiveTableContainer>

        <ResponsiveTableContainer  title='Average Monthly Expenses' handleEdit={handleEdit} pageNumber={7}>
          <ExpenseTable 
            expenses={monthlyExpenses.expenses || {}} 
            total={monthlyExpenses.monthlyTotal || 0} 
            title="Monthly" 
          />
        </ResponsiveTableContainer>

        <ResponsiveTableContainer  title='Appliances Own' handleEdit={handleEdit} pageNumber={15}>
          <ItemQuantityTable 
            items={filteredAppliances} 
            itemData={appliancesData} 
            title="Appliance" 
          />
        </ResponsiveTableContainer>

        <ResponsiveTableContainer  title='Other Amenities' handleEdit={handleEdit} pageNumber={16}>
          <ItemQuantityTable 
            items={filteredAmenities} 
            itemData={amenitiesData} 
            title="Amenities" 
          />
        </ResponsiveTableContainer>

        <ResponsiveTableContainer  title='Crops Planted' handleEdit={handleEdit} pageNumber={12}>
          <KeyValueTable
            title="Crops Planted"
            firstHeader="Crops"
            secondHeader={<>No. of field (m<sup>2</sup>)</>}
            data={cropsPlanted.crops}
            unit="m²"
          />
        </ResponsiveTableContainer>

        <ResponsiveTableContainer  title='Fruit Bearing Tree' handleEdit={handleEdit} pageNumber={13}>
          <KeyValueTable
            title="Fruit Bearing Tree"
            firstHeader="Fruit Bearing Tree"
            secondHeader="No. of tree"
            data={fruitBearingTree.tree}
          />
        </ResponsiveTableContainer>

        <ResponsiveTableContainer  title='Family Resources' handleEdit={handleEdit} pageNumber={14}>
          <ResourcesTable 
            expenses={familyResources.resources || {}} 
            title="Family Resources" 
          />
        </ResponsiveTableContainer>

        <ResponsiveTableContainer  title='Livestocks/Animals' handleEdit={handleEdit} pageNumber={10}>
          <LivestockTable 
            livestock={livestock} 
            livestockTypes={LIVESTOCK_TYPES} 
          />
        </ResponsiveTableContainer>
      </Box>
      <div className='form-buttons'>
        <div className='form-buttons-right'>
          <Button variant='outlined' sx={{ width: '100%' }} onClick={handleBack}>Back</Button>
          <Button variant='contained'sx={{ width: '100%' }} onClick={handleSubmit}>
            {isEditing ? 'Update' : 'Submit'}
          </Button>
        </div>  
        <Notification
          snackbarMessage={snackbarMessage} 
          snackbarOpen={snackbarOpen} 
          setSnackbarOpen={setSnackbarOpen} 
          severity={severity}
        />   
      </div>
    </div>
    
  );
}