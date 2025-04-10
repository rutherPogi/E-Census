export const transformApiResponseToFormData = (response) => {
  
  const houseInfo = response.houseInformation[0] || {};
  const houseImages = response.houseImages || [];

  const transformedLivestock = transformArrayToObjectMapping(
    response.livestock || [],
    'livestock',
    (item) => ({
      number: item.totalNumber.toString(),
      own: item.own.toString(),
      dispersal: item.dispersal.toString()
    })
  );

  const transformedCropsPlanted = transformArrayToObjectMapping(
    response.cropsPlanted || [],
    'crops',
    (item) => item.size.toString(),
    (key) => key.replace(/\b\w/g, c => c.toUpperCase())
  );

  const transformedFruitBearingTree = transformArrayToObjectMapping(
    response.fruitBearingTree || [],
    'tree',
    (item) => item.size.toString(),
    (key) => key && key.replace(/\b\w/g, c => c.toUpperCase())
  );

  const transformedFamilyResources = transformArrayToObjectMapping(
    response.familyResources || [],
    'resources',
    (item) => item.amount
  );

  const transformedAppliancesOwn = transformArrayToObjectMapping(
    response.appliancesOwn || [],
    'applianceName',
    (item) => item.totalOwned.toString()
  );
  
  const transformedAmenitiesOwn = transformArrayToObjectMapping(
    response.amenities || [],
    'amenityName',
    (item) => item.totalOwned.toString()
  );

  return {
    surveyData: response.surveyResponses[0] || {},
    houseInfo: {
      ...houseInfo,
      houseImagePreview: houseInfo.houseImage || null,
      houseImageTitle: houseInfo.houseTitle || null,
      houseImages: houseImages.map((img, index) => ({
        preview: img.houseImage,
        title: img.houseTitle || `House Image ${index + 1}`,
        id: img.id || index
      }))
    },
    houseLocation: response.houseInformation,
    waterInfo: response.waterInformation[0] || {},
    farmlots: response.farmlots[0] || {},
    communityIssues: response.communityIssues[0] || {},
    familyMembers: response.familyProfile || [],
    serviceAvailed: response.serviceAvailed || [],
    foodExpenses: calculateExpenses(response.foodExpenses, ['rice', 'viand', 'sugar', 'milk', 'oil', 'snacks', 'otherFood']),
    educationExpenses: calculateExpenses(response.educationExpenses, ['tuitionFees', 'miscellaneousFees', 'schoolSupplies', 'rentDormitory', 'transportation', 'otherEducation']),
    familyExpenses: calculateExpenses(response.familyExpenses, ['firewood', 'gasTank', 'caregivers', 'clothings', 'hygiene', 'laundry', 'others']),
    monthlyExpenses: calculateExpenses(response.monthlyExpenses, ['electricBill', 'waterBill', 'subscription', 'mobileLoad', 'others']),
    livestock: transformedLivestock,
    cropsPlanted: transformedCropsPlanted,
    fruitBearingTree: transformedFruitBearingTree,
    familyResources: transformedFamilyResources,
    appliancesOwn: transformedAppliancesOwn,
    amenitiesOwn: transformedAmenitiesOwn
  };
};

const transformArrayToObjectMapping = (array, keyField, valueTransformer, keyTransformer = (key) => key) => {
  const result = {};
  
  if (array && array.length > 0) {
    array.forEach(item => {
      const key = keyTransformer(item[keyField]);
      result[key] = typeof valueTransformer === 'function' 
        ? valueTransformer(item) 
        : item[valueTransformer];
    });
  }
  
  return result;
};

const calculateExpenses = (expensesArray, fields) => {
  if (!expensesArray || expensesArray.length === 0) {
    return {
      expenses: {},
      total: 0
    };
  }

  const expenses = {};
  let total = 0;

  fields.forEach(field => {
    const value = parseFloat(expensesArray[0][field]) || 0;
    expenses[field] = value;
    total += value;
  });

  return {
    expenses,
    total
  };
};