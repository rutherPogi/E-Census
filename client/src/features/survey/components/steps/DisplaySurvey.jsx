import { useFormContext } from "../../pages/FormContext";
import { LIVESTOCK_TYPES, AMENITY_TYPES, APPLIANCE_TYPES, NON_IVATAN_TABLE_HEADERS,
         FAMILY_PROFILE_TABLE_HEADERS, AFFILIATION_TABLE_HEADERS, 
         SERVICE_AVAILED_TABLE_HEADERS,
         FOOD_TYPES} from '../../utils/constants'
import { post } from '../../../../utils/api/apiService';
import { useNavigate } from "react-router-dom";
import { Box } from '@mui/material';
import { SurveyDetailsSection, HouseInfoSection, WaterInfoSection, 
         FarmLotsSection, CommunityIssueSection } from "../others/SurveySections";
import { ResponsiveTableContainer, StandardTable, ExpenseTable, ItemQuantityTable, 
         KeyValueTable, LivestockTable, 
         ResourcesTable} from "../others/TableSection";
import { mapFamilyMembers, mapAffiliation, mapNonIvatan, mapServiceAvailed } from "../others/dataMappers"


export default function DisplaySurvey({ handleBack, handleNext, handleEdit }) {

  const navigate = useNavigate();
  const { formData, clearFormData } = useFormContext();

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
  const foodExpensesData = foodExpenses.expenses || {};

  const filteredAppliances = APPLIANCE_TYPES.filter(appliance => {
    const quantity = Number(appliancesData[appliance]?.replace(/,/g, '') || 0);
    return quantity >= 1;
  });

  const filteredAmenities = AMENITY_TYPES.filter(amenity => {
    const quantity = Number(amenitiesData[amenity]?.replace(/,/g, '') || 0);
    return quantity >= 1;
  });

  const filteredFoodExpenses = FOOD_TYPES.filter(food => {
    const quantity = Number(foodExpensesData[food]?.replace(/,/g, '') || 0);
    return quantity >= 1;
  });



  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      console.log('Submitting form data:', formData);
      const response = await post('/surveys/submit-survey', formData);
      
      if (response.success) {
        alert('Survey submitted successfully!');
        clearFormData();
        navigate('/main/survey');
      }
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
            data={mapFamilyMembers(formData.familyMembers)}
          />
        </ResponsiveTableContainer>

        <ResponsiveTableContainer title='Government Affiliation' handleEdit={handleEdit} pageNumber={21}>
          <StandardTable
            title="Government Affiliation Table"
            headers={AFFILIATION_TABLE_HEADERS}
            data={mapAffiliation(formData.affiliation)}
          />
        </ResponsiveTableContainer>

        <ResponsiveTableContainer title='Non-Ivatan and Transients' handleEdit={handleEdit} pageNumber={23}>
          <StandardTable
            title="Non-Ivatan and Transient Table"
            headers={NON_IVATAN_TABLE_HEADERS}
            data={mapNonIvatan(formData.nonIvatan)}
          />
        </ResponsiveTableContainer>

        <ResponsiveTableContainer title='Service/Assistance Availed' handleEdit={handleEdit} pageNumber={19}>
          <StandardTable
            title="Service/Assistance Availed Table"
            headers={SERVICE_AVAILED_TABLE_HEADERS}
            data={mapServiceAvailed(formData.serviceAvailed)}
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
          <button type='button' className="btn cancel-btn" onClick={handleBack}>Back</button>
          <button type='button' className="btn submit-btn" onClick={handleSubmit}>Submit</button>
        </div>     
      </div>
    </div>
    
  );
}