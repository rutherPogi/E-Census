
export const PI_INITIAL_STATE = (pwdID) => ({
  pwdID: pwdID,
  firstName: '',
  middleName: '',
  lastName: '',
  suffix: '',
  birthdate: null,
  sex: '',
  civilStatus: '',
  pwdNumber: ''
})

export const FP_INITIAL_VALUES = () => ({
  firstName: '',
  middleName: '',
  lastName: '',
  suffix: '',
  birthdate: null,
  sex: ''
})

export const PI_REQUIRED_FIELDS = [
  'firstName',
  'middleName',
  'lastName',
  'suffix',
  'birthdate',
  'sex',
  'civilStatus',
  'pwdNumber'
]
    
