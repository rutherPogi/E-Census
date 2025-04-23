import dayjs from 'dayjs';
import { SUFFIX_OPTIONS, SEX_OPTIONS, CIVIL_STATUS_OPTIONS, RELIGION_OPTIONS } from '../../../utils/options';
import { TextInput, DropdownInput, DateInput } from "../../../../../../components/common/FormFields";




export const PersonalDetails = ({ 
  values, 
  handleChange, 
  handleDateChange, 
  errors
}) => {
  return (
    <>
      <div className="section-title field-full">Personal Details</div>
      <TextInput
        label='First Name'
        value={values.firstName}
        onChange={handleChange('firstName')}
        error={errors.firstName}
        helperText = {errors.firstName || 'e.g. Juan'}
        required
      />
      <TextInput
        label='Middle Name'
        value={values.middleName}
        onChange={handleChange('middleName')}
        error={errors.middleName}
        helperText = {errors.middleName || 'e.g. Santos'}
      />
      <TextInput
        label='Last Name'
        value={values.lastName}
        onChange={handleChange('lastName')}
        error={errors.lastName}
        helperText = {errors.lastName || 'e.g. Dela Cruz'}
        required
      />
      <DropdownInput
        label = 'Suffix'
        options = {SUFFIX_OPTIONS}
        value = {values.suffix}
        onChange = {(e, newValue) => handleChange('suffix')(e, newValue)}
        error = {errors.suffix} 
        helperText = {errors.suffix || 'e.g. Jr - Junior'}
      />
      <DateInput
        label =  'Birthdate'
        value =  {values.birthdate ? dayjs(values.birthdate) : null}
        onChange={handleDateChange('birthdate', true)}
        error = {errors.birthdate}  
        helperText =  {errors.birthdate}
        required
      />
      <TextInput
        label='Age'
        value={values.age}
        disabled
      />
      <DropdownInput
        label = 'Sex'
        options = {SEX_OPTIONS}
        value = {values.sex}
        onChange = {(e, newValue) => handleChange('sex')(e, newValue)}
        error = {errors.sex} 
        helperText = {errors.sex || 'e.g. Male'}
        required
      />
      <TextInput
        label='Place of Birth'
        value={values.birthplace}
        onChange={handleChange('birthplace')}
        error={errors.birthplace}
        helperText = {errors.birthplace || 'e.g. ---'}
        required
      />
      <DropdownInput
        label = 'Civil Status'
        options = {CIVIL_STATUS_OPTIONS}
        value = {values.civilStatus}
        onChange = {(e, newValue) => handleChange('civilStatus')(e, newValue)}
        error = {errors.civilStatus} 
        helperText = {errors.civilStatus || 'e.g. Single'}
        required
      />
      <DropdownInput
        label = 'Religion'
        options = {RELIGION_OPTIONS}
        value = {values.religion}
        onChange = {(e, newValue) => handleChange('religion')(e, newValue)}
        error = {errors.religion} 
        helperText = {errors.religion || 'e.g. Catholic'}
        required
      />
      <TextInput
        label='Phylsis Card Number'
        value={values.phylsisNumber}
        onChange={handleChange('phylsisNumber')}
        error={errors.phylsisNumber}
        helperText = {errors.phylsisNumber || 'e.g. ---'}
        required
      />
    </>
  );
};

export default PersonalDetails;