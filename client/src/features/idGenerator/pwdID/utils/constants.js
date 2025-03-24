export const SEX_OPTIONS = [
  { value: 'Male', label: 'Male' },
  { value: 'Female', label: 'Female' },
];

export const BARANGAY_OPTIONS = [
  { value: 'Sta. Rosa', label: 'Sta. Rosa' },
  { value: 'Sta. Maria', label: 'Sta. Maria' },
  { value: 'Sta. Lucia', label: 'Sta. Lucia' },
  { value: 'San Rafael', label: 'San Rafael' },
  { value: 'Yawran', label: 'Yawran' },
  { value: 'Raele', label: 'Raele' }
];

export const MUNICIPALITY_OPTIONS = [
  { value: 'Itbayat', label: 'Itbayat' }
];

export const SUFFIX_OPTIONS = [
  { value: 'Jr', label: 'Jr - Junior' },
  { value: 'Sr', label: 'Sr - Senior' },
  { value: 'I', label: 'I - First' },
  { value: 'II', label: 'II - Second' },
  { value: 'III', label: 'III - Third' },
  { value: 'IV', label: 'IV - Fourth' },
  { value: 'V', label: 'V - Fifth' },
];

export const CIVIL_STATUS_OPTIONS = [
  { value: 'Single', label: 'Single' },
  { value: 'Married', label: 'Married' },
  { value: 'Widowed', label: 'Widowed' },
  { value: 'Legally Separated', label: 'Legally Separated' },
  { value: 'Separated in Fact', label: 'Separated in Fact' },
];

export const EDUCATIONAL_OPTIONS = [
  { value: 'None', label: 'None' },
  { value: 'Kindergarten', label: 'Kindergarten' },
  { value: 'Elementary', label: 'Elementary' },
  { value: 'Junior High School', label: 'Junior High School' },
  { value: 'Senior High School', label: 'Senior High School' },
  { value: 'College', label: 'College' },
  { value: 'Vocational', label: 'Vocational' },
  { value: 'Post Graduate', label: 'Post Graduate' },
];

export const EMPLOYMENT_STATUS_OPTIONS = [
  { value: 'Employed', label: 'Employed' },
  { value: 'Unemployed', label: 'Unemployed' },
  { value: 'Seld-employed', label: 'Self-employed' }
];

export const EMPLOYMENT_CATEGORY_OPTIONS = [
  { value: 'Government', label: 'Government' },
  { value: 'Private', label: 'Private' }
];

export const EMPLOYMENT_TYPE_OPTIONS = [
  { value: 'Permanent/Regular', label: 'Permanent/Regular' },
  { value: 'Seasonal', label: 'Seasonal' },
  { value: 'Casual', label: 'Casual' },
  { value: 'Emergency', label: 'Emergency' }
];

export const OCCUPATION_OPTIONS = [
  { value: 'Managers', label: 'Managers' },
  { value: 'Professionals', label: 'Professionals' },
  { value: 'Technicians & Associates Professionals', label: 'Technicians & Associates Professionals' },
  { value: 'Clerical Support Workers', label: 'Clerical Support Workers' },
  { value: 'Service and Sales Workers', label: 'Service and Sales Workers' },
  { value: 'Skilled Agricultural, Forestry, and Fishery Workers', label: 'Skilled Agricultural, Forestry, and Fishery Workers' },
  { value: 'Crafts and Related Trade Workers', label: 'Crafts and Related Trade Workers' },
  { value: 'Plant and Machine Operators and Assemblers', label: 'Plant and Machine Operators and Assemblers' },
  { value: 'Elementary Occupations', label: 'Elementary Occupations' },
  { value: 'Armed Forces Occupations', label: 'Armed Forces Occupations' }
];


export const RELATIONSHIP_OPTIONS = [
  { value: 'Family Head', label: 'Family Head' },
  { value: 'Husband', label: 'Husband' },
  { value: 'Wife', label: 'Wife' },
  { value: 'Father', label: 'Father' },
  { value: 'Mother', label: 'Mother' },
  { value: 'Son', label: 'Son' },
  { value: 'Daughter', label: 'Daughter' },
  { value: 'Stepchild', label: 'Stepchild' },
  { value: 'Brother', label: 'Brother' },
  { value: 'Sister', label: 'Sister' },
  { value: 'Father-in-Law', label: 'Father-in-Law' },
  { value: 'Mother-in-Law', label: 'Mother-in-Law' },
  { value: 'Brother-in-Law', label: 'Brother-in-Law' },
  { value: 'Sister-in-Law', label: 'Sister-in-Law' },
  { value: 'Grandparent', label: 'Grandparent' },
  { value: 'Grandchild', label: 'Grandchild' },
  { value: 'Niece', label: 'Niece' },
  { value: 'Nephew', label: 'Nephew' },
  { value: 'Relative', label: 'Relative' },
  { value: 'Common-Law Partner', label: 'Common-Law Partner' },
  { value: 'Others', label: 'Others' },
];

export const IDREF_FIELDS = [
  'sssNumber',
  'philhealthNumber',
  'gsisNumber',
  'pagibigNumber',
  'psnNumber'
];

export const PI_REQUIRED_FIELDS = [
  'firstName',
  'lastName',
  'birthdate',
  'sex',
  'civilStatus',
  'pwdNumber'
];

export const CI_REQUIRED_FIELDS = ['street', 'barangay', 'municipality', 'province', 'region'];

export const PROFINFO_REQUIRED_FIELDS = [
  'educationalAttainment',
  'employmentStatus',
  'employmentType',
  'employmentCategory',
  'occupation'
];

export const OI_REQUIRED_FIELDS = [
  'organizationAffiliated',
  'officeAddress'
];

export const MANAGE_TABLE_HEADERS = [
  "Survey ID", 
  "Respondent", 
  "Interviewer", 
  "Date of Survey", 
  "Actions"
];



