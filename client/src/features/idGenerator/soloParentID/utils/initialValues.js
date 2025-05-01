
export const FP_INITIAL_VALUES = () => ({
  firstName: '',
  middleName: '',
  lastName: '',
  suffix: '',
  birthdate: null,
  sex: ''
})

export const PI_INITIAL_VALUES = (soloParentIDNumber, populationID, barangay) => ({
  populationID: populationID,
  soloParentIDNumber: soloParentIDNumber,
  householdID: '',

  firstName: '',
  middleName: '',
  lastName: '',
  suffix: '',
  birthdate: null,
  age: '',
  formattedAge: '',
  sex: '',
  birthplace: '',
  civilStatus: '',
  religion: '',

  phylsisNumber: '',

  street: '',
  barangay: barangay,
  municipality: 'Itbayat',
  province: 'Batanes',
  mobileNumber: '',
  emailAddress: '',

  educationalAttainment: '',
  employmentStatus: '',
  occupation: '',
  company: '',
  monthlyIncome: '',

  isBeneficiary: false,
  isIndigenous: false,
  isLGBTQ: false,
  isPWD: false,

  indigenousAffiliation: '',
  beneficiaryCode: '',
  soloParentCategory: ''
})

export const HC_INITIAL_VALUES = () => ({
  firstName: '',
  middleName: '',
  lastName: '',
  suffix: '',
  birthdate: null,
  age: '',
  formattedAge: '',
  sex: '',
  relationship: '',
  civilStatus: '',

  educationalAttainment: '',
  occupation: '',
  monthlyIncome: '',
})

export const PN_INITIAL_VALUES = () => ({
  causeSoloParent: '', 
  needsSoloParent: ''
})

export const EC_INITIAL_VALUES = (barangay) => ({
  contactName: '',
  relationship: '',
  street: '',
  barangay: barangay,
  municipality: 'Itbayat',
  province: 'Batanes',
  mobileNumber: ''
})
    


