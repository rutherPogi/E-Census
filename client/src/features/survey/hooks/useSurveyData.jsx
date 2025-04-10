import { useCallback } from 'react';
import { useFormContext } from "../pages/FormContext";
import { useNotification } from "../hooks/useNotification";
import { get } from '../../../utils/api/apiService';


export const useSurveyData = (surveyID) => {
  
  const { setEntireFormData } = useFormContext();
  const { showNotification } = useNotification();

  const fetchSurveyData = useCallback(async () => {

    if (!surveyID) return;
    
    try {
      const response = await get(`/surveys/view-survey/${surveyID}`, {
        params: { surveyID },
      });
  
      if (response) {

        console.log('RAW:', response);

        const houseInfo = response.houseInformation[0] || {};
        const houseImages = response.houseImages || [];

        const transformedLivestock = {};
        const transformedCropsPlanted = {};
        const transformedFruitBearingTree = {};
        const transformedFamilyResources = {};
        const transformedAppliancesOwn = {};
        const transformedAmenitiesOwn = {};

        if (response.livestock && response.livestock.length > 0) {
          response.livestock.forEach(item => {

            transformedLivestock[item.livestock] = {
              livestockID: item.livestockID,
              number: item.totalNumber.toString(),
              own: item.own.toString(),
              dispersal: item.dispersal.toString()
            };
          });
        }

        if (response.cropsPlanted && response.cropsPlanted.length > 0) {
          response.cropsPlanted.forEach(item => {
            transformedCropsPlanted[item.crops] = item.size.toString();
          });
        }

        if (response.fruitBearingTree && response.fruitBearingTree.length > 0) {
          response.fruitBearingTree.forEach(item => {
            transformedFruitBearingTree[item.tree] = item.totalNumber.toString();
          });
        }

        if (response.familyResources && response.familyResources.length > 0) {
          response.familyResources.forEach(item => {
            transformedFamilyResources[item.resources] = item.amount;
          });
        }

        if (response.appliancesOwn && response.appliancesOwn.length > 0) {
          response.appliancesOwn.forEach(item => {
            transformedAppliancesOwn[item.applianceName] = item.totalOwned.toString();
          });
        }
        
        if (response.amenities && response.amenities.length > 0) {
          response.amenities.forEach(item => {
            transformedAmenitiesOwn[item.amenityName] = item.totalOwned.toString();
          });
        }

        // Transform the API response to match formData structure
        const transformedData = {
          surveyData: response.surveyResponses[0] || {},
          houseInfo: {
            ...houseInfo,
            // single image
            houseImagePreview: houseInfo.houseImage || null,
            houseImageTitle: houseInfo.houseTitle || null,
            // images
            houseImages: houseImages.map((img, index) => ({
              houseImageID: img.houseImageID,
              preview: img.houseImage,
              title: img.houseTitle || `House Image ${index + 1}`,
              id: img.id || index
            }))
          },
          houseLocation: response.houseInformation[0] || {},
          waterInfo: response.waterInformation[0] || {},
          farmlots: response.farmlots[0] || {},
          communityIssues: response.communityIssues[0] || {},
          familyMembers: response.familyProfile || [],
          serviceAvailed: response.serviceAvailed || [],

          foodExpenses: {
            foodExpensesID: response.foodExpenses?.[0]?.foodExpensesID || null,
            expenses: response.foodExpenses && response.foodExpenses.length > 0 ? {
              ['Rice']: response.foodExpenses[0].rice,
              ['Viand']: response.foodExpenses[0].viand,
              ['Sugar']: response.foodExpenses[0].sugar,
              ['Milk']: response.foodExpenses[0].milk,
              ['Oil']: response.foodExpenses[0].oil,
              ['Snacks']: response.foodExpenses[0].snacks,
              ['Other Food']: response.foodExpenses[0].otherFood
            } : {},
            foodTotal: response.foodExpenses && response.foodExpenses.length > 0 ? 
              parseFloat(response.foodExpenses[0].rice) + 
              parseFloat(response.foodExpenses[0].viand) + 
              parseFloat(response.foodExpenses[0].sugar) + 
              parseFloat(response.foodExpenses[0].milk) + 
              parseFloat(response.foodExpenses[0].oil) + 
              parseFloat(response.foodExpenses[0].snacks) + 
              parseFloat(response.foodExpenses[0].otherFood) : 0
          },

          educationExpenses: {
            educationExpensesID: response.educationExpenses?.[0]?.educationExpensesID || null,
            expenses: response.educationExpenses && response.educationExpenses.length > 0 ? {
              ['Tuition Fees']: response.educationExpenses[0].tuitionFees,
              ['Miscellaneous Fees']: response.educationExpenses[0].miscellaneousFees,
              ['School Supplies']: response.educationExpenses[0].schoolSupplies,
              ['Rent/Dormitory']: response.educationExpenses[0].rentDormitory,
              ['Transportation']: response.educationExpenses[0].transportation,
              ['Other Education']: response.educationExpenses[0].otherEducation
            } : {},
            educationTotal: response.educationExpenses && response.educationExpenses.length > 0 ? 
              parseFloat(response.educationExpenses[0].tuitionFees) + 
              parseFloat(response.educationExpenses[0].miscellaneousFees) + 
              parseFloat(response.educationExpenses[0].schoolSupplies) + 
              parseFloat(response.educationExpenses[0].rentDormitory) + 
              parseFloat(response.educationExpenses[0].transportation) + 
              parseFloat(response.educationExpenses[0].otherEducation) : 0 
          },

          familyExpenses: {
            familyExpensesID: response.familyExpenses?.[0]?.familyExpensesID || null,
            expenses: response.familyExpenses && response.familyExpenses.length > 0 ? {
              ['Firewood']: response.familyExpenses[0].firewood,
              ['Gas Tank']: response.familyExpenses[0].gasTank,
              ['Caregivers']: response.familyExpenses[0].caregivers,
              ['Clothings']: response.familyExpenses[0].clothings,
              ['Hygiene']: response.familyExpenses[0].hygiene,
              ['Laundry']: response.familyExpenses[0].laundry,
              ['Others']: response.familyExpenses[0].others,
            } : {},
            familyTotal: response.familyExpenses && response.familyExpenses.length > 0 ? 
              parseFloat(response.familyExpenses[0].firewood) + 
              parseFloat(response.familyExpenses[0].gasTank) + 
              parseFloat(response.familyExpenses[0].caregivers) + 
              parseFloat(response.familyExpenses[0].clothings) + 
              parseFloat(response.familyExpenses[0].hygiene) + 
              parseFloat(response.familyExpenses[0].laundry) +
              parseFloat(response.familyExpenses[0].others) : 0 
          },

          monthlyExpenses: {
            monthlyExpensesID: response.monthlyExpenses?.[0]?.monthlyExpensesID || null,
            expenses: response.monthlyExpenses && response.monthlyExpenses.length > 0 ? {
              ['Electric Bill']: response.monthlyExpenses[0].electricBill,
              ['Water Bill']: response.monthlyExpenses[0].waterBill,
              ['Subscription']: response.monthlyExpenses[0].subscription,
              ['Mobile Load']: response.monthlyExpenses[0].mobileLoad,
              ['Others']: response.monthlyExpenses[0].others
            } : {},
            monthlyTotal: response.monthlyExpenses && response.monthlyExpenses.length > 0 ? 
              parseFloat(response.monthlyExpenses[0].electricBill) + 
              parseFloat(response.monthlyExpenses[0].waterBill) + 
              parseFloat(response.monthlyExpenses[0].subscription) + 
              parseFloat(response.monthlyExpenses[0].mobileLoad) + 
              parseFloat(response.monthlyExpenses[0].others) : 0
          },

          livestock: transformedLivestock,
          cropsPlanted: transformedCropsPlanted,
          fruitBearingTree: transformedFruitBearingTree,
          familyResources: transformedFamilyResources,
          appliancesOwn: transformedAppliancesOwn,
          amenitiesOwn: transformedAmenitiesOwn
        };
        console.log('TRANSFORMED DATA:', transformedData);
        setEntireFormData(transformedData);
      } else {
        throw new Error("Unexpected response format");
      }
  
    } catch (err) {
      console.error('Error fetching data', err);
      showNotification('Failed to load survey data. Please try again later.', 'error');
    }
  }, [surveyID, setEntireFormData, showNotification]);

  return { fetchSurveyData };
};