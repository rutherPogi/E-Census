
export const FP_INITIAL_VALUES = () => ({
  firstName: '',
  middleName: '',
  lastName: '',
  suffix: '',
  birthdate: null,
  sex: ''
})

export const PI_INITIAL_VALUES = (pwdApplicationID, barangay) => ({
  pwdApplicationID: pwdApplicationID,
  pwdIDNumber: '',

  firstName: '',
  middleName: '',
  lastName: '',
  suffix: '',
  birthdate: null,
  age: '',
  formattedAge: '',
  sex: '',
  civilStatus: '',

  disabilityType: '', 
  disabilityCause: '',
  disabilitySpecific: '',

  bloodType: '',

  street: '',
  barangay: barangay,
  municipality: 'Itbayat',
  province: 'Batanes',
  landlineNumber: '',
  mobileNumber: '',
  emailAddress: '',

  educationalAttainment: '',
  employmentStatus: '',
  employmentType: '',
  employmentCategory: '',
  occupation: '',

  sssNumber: '',
  philhealthNumber: '',
  gsisNumber: '',
  pagibigNumber: '',
  psnNumber: '',

  isAffiliated: false,

  organizationAffiliated: '',
  officeAddress: '',
  contactPerson: '',
  telephoneNumber: ''
})

export const OTHERINFO_INITIAL_VALUES = () => ({

  abFirstName: '', abMiddleName: '', abLastName: '', abSuffix: '',
  abRole: '',

  cpFirstName: '', cpMiddleName: '', cpLastName: '', cpSuffix: '', licenseNumber: '',
  poFirstName: '', poMiddleName: '', poLastName: '', poSuffix: '',
  aoFirstName: '', aoMiddleName: '', aoLastName: '', aoSuffix: '',
  eFirstName: '', eMiddleName: '', eLastName: '', eSuffix: '',

  reportingUnit: '', 
  controlNumber: ''
})

export const FB_INITIAL_VALUES = () => ({
  fatherFirstName: '', fatherMiddleName: '', fatherLastName: '', fatherSuffix: '',
  motherFirstName: '', motherMiddleName: '', motherLastName: '',
  guardianFirstName: '', guardianMiddleName: '', guardianLastName: '', guardianSuffix: '',
})
    


