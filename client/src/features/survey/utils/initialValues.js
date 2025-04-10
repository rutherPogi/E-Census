// SURVEY DETAILS
export const SD_INITIAL_VALUES = (surveyNumber, accountName) => {
  return {
    surveyID: surveyNumber,
    respondent: '',
    interviewer: accountName,
    barangay: '',
    municipality: 'Itbayat',
    monthlyIncome: '',
    irregularIncome: '',
    familyIncome: '',
    familyClass: ''
  };
};

// FAMILY PROFILE
export const FP_INITIAL_VALUES = () => {
  return {

    // Personal Infomration
    firstName: '',
    middleName: '',
    lastName: '',
    suffix: '',
    birthdate: null,
    age: '',
    sex: '',
    birthplace: '',
    religion: '',
    civilStatus: '',
    relationToFamilyHead: '',

    // Professional Information
    educationalAttainment: '',
    skills: '',
    occupation: '',
    employmentType: '',
    monthlyIncome: '',

    // Contact Information
    contactNumber: '',

    // Other Information
    philhealthNumber: '',
    healthStatus: '',
    remarks: '',

    isOSY: false,
    inSchool: false,

    outOfTown: false,
    isOFW: false,
    
    isPWD: false,
    isSoloParent: false,

    isIpula: false,
    settlementDetails: '',
    ethnicity: '',
    placeOfOrigin: '',

    isTransient: false,
    houseOwner: '',
    isRegistered: false,
    transientDateRegistered: null,

    isAffiliated: false,
    asOfficer: null,
    asMember: null,
    organizationAffiliated: ''
  };
};

export const FP_BOOLEAN_VALUES = [
  'isOSY', 'inSchool', 'outOfTown', 'isOFW',
  'isPWD', 'isSoloParent', 'isIpula','isTransient', 'isRegistered', 
  'isAffiliated'
];

export const FP_ID_VALUES = [
  'personalInfoID', 'professionalInfoID', 'contactInfoID',
  'governmentAffiliationID', 'nonIvatanID'
];

// HOUSE INFORMATION
export const HI_INITIAL_VALUES = () => {
  return {
    houseCondition: '',
    houseStructure: '',
    houseImages: [],
    houseTitle: []
  };
};

export const HI2_INITIAL_VALUES = () => {
  return {
    latitude: '',
    longitude: '',
    houseStreet: '',
    barangay: '',
    municipality: 'Itbayat'
  };
};

// WATER INFORMATION
export const WI_INITIAL_VALUES = () => {
  return {
    waterAccess: '',
    potableWater: '',
    waterSources: ''
  };
};

// EXPENSES
export const FOOD_EXPENSES = [
  'Rice', 
  'Viand', 
  'Sugar', 
  'Milk', 
  'Oil', 
  'Snacks', 
  'Other Food'
];

export const EDUCATION_EXPENSES = [
  'Tuition Fees', 
  'Miscellaneous Fees', 
  'School Supplies', 
  'Transportation', 
  'Rent/Dormitory',
  'Other Education'
];

export const FAMILY_EXPENSES = [
  'Firewood', 
  'Gas Tank', 
  'Caregivers', 
  'Laundry', 
  'Hygiene', 
  'Clothings', 
  'Others'
]

export const MONTHLY_EXPENSES = [
  'Electric Bill', 
  'Water Bill', 
  'Subscription', 
  'Mobile Load', 
  'Others'
];



// LIVESTOCK/ANIMALS
export const LIVESTOCK_TYPES = [
  'carabao', 
  'pig', 
  'goat', 
  'horse', 
  'poultry', 
  'other animals'
];

// FARMLOTS
export const FL_INITIAL_VALUES = () => {
  return {
    cultivation: '',
    pastureland: '',
    forestland: ''
  }
}

// CROPS PLANTED
export const CROP_TYPES = [
  'Camote', 
  'Ube/Tugue',  
  'Mongo', 
  'Corn/Mayes', 
  'Rice/Paray', 
  'Peanut/Mani', 
  'Garlic/Akus', 
  'Onion/Bulyas', 
  'Ginger/?', 
  'Gabi/Suli',
  'White Yam/Lukay',
  'Pechay',
  'Others'
];

// FRUIT BEARING TREE
export const TREE_TYPES = [
  'Calamansi', 
  'Papaya', 
  'Lemon', 
  'Avocado',
  'Mango', 
  'Banana', 
  'Pineapple', 
  'Others'
];

export const FAMILY_RESOURCES = [
  'Selling Vegetables', 
  'Food Vending', 
  'Fish Vending', 
  'Store Owner', 
  'E-loading', 
  'Online Selling', 
  'Other Resources'
];

export const APPLIANCE_TYPES = [
  'Washing Machine', 'Air Fryer', 'Aircon', 'Oven', 'Rice Cooker',
  'Vacuum Cleaner', 'Components/Speaker', 'Computer Desktop', 'Electric Fan', 
  'Portable Water Pump', 'Electric Stove', 'Freezer', 'Coffee Maker/Airpot', 
  'Massage Chair', 'Tablet'
];

export const AMENITY_TYPES = [
  'Motorcycle', 'Sidecar', 'Tricycle', 'Car', 'Kariton/Tangkal',
  'Jeep', 'Non-Motored Boat', 'Motor Boat', 'Bicycle', 'Cellphone'
];

export const FOOD_TYPES = [ 'Rice', 'Viand', 'Sugar', 'Milk', 'Oil', 'Snacks', 'Other Foods' ];

// COMMUNITY ISSUES
export const CI_INITIAL_VALUES = () => {
  return {
    issues: ''
  }
}






