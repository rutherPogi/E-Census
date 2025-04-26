
export const FP_INITIAL_VALUES = () => ({
  firstName: '',
  middleName: '',
  lastName: '',
  suffix: '',
  birthdate: null,
  sex: ''
})

export const PI_INITIAL_VALUES = (seniorCitizenApplicationID, populationID, barangay) => ({
  seniorCitizenApplicationID: seniorCitizenApplicationID,
  populationID: populationID,
  seniorCitizenIDNumber: '',

  firstName: '',
  middleName: '',
  lastName: '',
  suffix: '',
  birthdate: null,
  age: '',
  formattedAge: '',
  sex: '',
  civilStatus: '',
  birthplace: '',

  street: '',
  barangay: barangay,
  municipality: 'Itbayat',
  province: 'Batanes',
  mobileNumber: '',

  occupation: '',
  educationalAttainment: '',
  annualIncome: '',
  skills: '',

  associationName: '',
  asOfficer: null,
  position: ''
})

export const FC_INITIAL_VALUES = () => ({
  firstName: '', 
  middleName: '', 
  lastName: '', 
  suffix: '',
  relationship: '',
  birthdate: null,
  age: '',
  formattedAge: '',
  civilStatus: '',
  occupation: '',
  annualIncome: ''
})
    


