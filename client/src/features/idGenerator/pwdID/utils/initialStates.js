
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

export const PI_ERROR_STATE = {
  firstName: false,
  middleName: false,
  lastName: false,
  suffix: false,
  birthdate: false,
  sex: false,
  civilStatus: false,
  pwdNumber: false
}
    
