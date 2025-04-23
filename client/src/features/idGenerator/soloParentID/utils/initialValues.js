
export const FP_INITIAL_VALUES = () => ({
  firstName: '',
  middleName: '',
  lastName: '',
  suffix: '',
  birthdate: null,
  sex: ''
})

export const PI_INITIAL_VALUES = (spApplicationID, populationID) => ({
  spApplicationID: spApplicationID,
  populationID: populationID,
  soloParentIDNumber: '',
  householdID: '',

  firstName: '',
  middleName: '',
  lastName: '',
  suffix: '',
  birthdate: null,
  age: '',
  sex: '',
  birthplace: '',
  civilStatus: '',
  religion: '',

  phylsisNumber: '',

  street: '',
  barangay: '',
  municipality: '',
  province: '',
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

export const EC_INITIAL_VALUES = () => ({
  contactName: '',
  relationship: '',
  street: '',
  barangay: '',
  municipality: '',
  province: '',
  mobileNumber: ''
})
    


