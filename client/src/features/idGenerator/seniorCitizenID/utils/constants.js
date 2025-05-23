export const SEX_OPTIONS = [
  { value: 'Male', label: 'Male' },
  { value: 'Female', label: 'Female' },
];

export const BARANGAY_OPTIONS = [
  { value: 'Barangay 1', label: 'Barangay 1' },
  { value: 'Barangay 2', label: 'Barangay 2' },
  { value: 'Barangay 3', label: 'Barangay 3' },
  { value: 'Barangay 4', label: 'Barangay 4' },
  { value: 'Barangay 5', label: 'Barangay 5' },
];

export const MUNICIPALITY_OPTIONS = [
  { value: 'Municipality 1', label: 'Municipality 1' },
  { value: 'Municipality 2', label: 'Municipality 2' },
  { value: 'Municipality 3', label: 'Municipality 3' },
  { value: 'Municipality 4', label: 'Municipality 4' },
  { value: 'Municipality 5', label: 'Municipality 5' }
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
  { value: 'Separated', label: 'Separated' },
  { value: 'Widowed', label: 'Widowed' }
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
 { value: 'Mother', label: 'Mother' },
 { value: 'Father', label: 'Father' },
 { value: 'Son', label: 'Son' },
 { value: 'Daughter', label: 'Daughter' },
 { value: 'Brother', label: 'Brother' },
 { value: 'Sister', label: 'Sister' },
 { value: 'Grandfather', label: 'Grandfather' },
 { value: 'Grandmother', label: 'Grandmother' },
];

export const FC_REQUIRED_FIELDS = [
  'firstName', 'lastName',
  'relationship',
  'age',
  'civilStatus'
];

export const PI_REQUIRED_FIELDS = [
  'firstName',
  'lastName',
  'birthdate',
  'sex',
  'civilStatus',
  'birthplace'
];

export const CI_REQUIRED_FIELDS = ['street', 'barangay', 'municipality', 'province'];

export const PROFINFO_REQUIRED_FIELDS = [
  'educationalAttainment',
  'occupation',
  'annualIncome',
  'otherSkills'
];

export const OI_REQUIRED_FIELDS = [
  'organizationAffiliated',
  'officeAddress'
];

export const FAMILY_COMPOSITION_HEADERS = [
  'Name',
  'Age',
  'Relationship',
  'Civil Status',
  'Occupation',
  'Income'
];

export const MANAGE_TABLE_HEADERS = [
  "Applicantion ID", 
  "Name", 
  "Resident", 
  "Date of Applied", 
  "Actions"
];

