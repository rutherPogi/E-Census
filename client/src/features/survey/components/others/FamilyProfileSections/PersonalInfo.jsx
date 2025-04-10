import { TextInput, DropdownInput, DateInput, ContactNumberInput } from '../../../../../components/common/FormFields';
import { SUFFIX_OPTIONS, CIVIL_STATUS_OPTIONS, RELATIONSHIP_OPTIONS, SEX_OPTIONS, RELIGION_OPTIONS } from '../../../utils/options';
import dayjs from 'dayjs';


const PersonalInfo = ({ values, handleChange, handleDateChange, handleContactChange, errors }) => {

  
  return (
    <>
      <div className="section-title field-full">Personal Information</div>
      <TextInput
        label='First Name'
        value={values.firstName}
        onChange={handleChange('firstName')}
        error={errors.firstName}
        helperText={errors.firstName || 'e.g., Juan'}
        required
      />
      <TextInput
        label='Middle Name'
        value={values.middleName}
        onChange={handleChange('middleName')}
        error={errors.middleName}
        helperText={errors.middleName || 'e.g, Santos'}
      />
      <TextInput
        label='Last Name'
        value={values.lastName}
        onChange={handleChange('lastName')}
        error={errors.lastName}
        helperText={errors.lastName || 'e.g, Dela Cruz'}
        required
      />
      <DropdownInput
        label='Suffix'
        options={SUFFIX_OPTIONS}
        value={values.suffix}
        onChange={(e, newValue) => handleChange('suffix')(e, newValue)}
        error={errors.suffix} 
        helperText={errors.suffix || 'e.g., Jr - Junior'}
      />
      <DateInput 
        label="Birthdate"
        value={values.birthdate ? dayjs(values.birthdate) : null}
        onChange={handleDateChange('birthdate', true)}
        error={errors.birthdate}
        helperText={errors.birthdate}
        required
      />
      <TextInput
        label='Age'
        value={values.age}
        disabled
      />
      <DropdownInput
        label='Sex'
        options={SEX_OPTIONS}
        value={values.sex}
        onChange={(e, newValue) => handleChange('sex')(e, newValue)}
        error={errors.sex} 
        helperText={errors.sex || 'e.g., Male'}
        required
      />
      <DropdownInput
        label='Civil Status'
        options={CIVIL_STATUS_OPTIONS}
        value={values.civilStatus}
        onChange={(e, newValue) => handleChange('civilStatus')(e, newValue)}
        error={errors.civilStatus} 
        helperText={errors.civilStatus || 'e.g., Single'}
        required
      />
      <DropdownInput
        label='Relation to Family Head'
        options={RELATIONSHIP_OPTIONS}
        value={values.relationToFamilyHead}
        onChange={(e, newValue) => handleChange('relationToFamilyHead')(e, newValue)}
        error={errors.relationToFamilyHead} 
        helperText={errors.relationToFamilyHead || 'e.g., Brother'}
        required
      />
      <TextInput
        label='Birthplace'
        value={values.birthplace}
        onChange={handleChange('birthplace')}
        error={errors.birthplace}
        helperText={errors.birthplace || 'e.g, ---'}
      />
       <DropdownInput
        label='Religion'
        options={RELIGION_OPTIONS}
        value={values.religion}
        onChange={(e, newValue) => handleChange('religion')(e, newValue)}
        error={errors.religion} 
        helperText={errors.religion || 'e.g., Catholic'}
      />
      <ContactNumberInput
        label='Contact Number'
        value={values.contactNumber}
        onChange={handleContactChange('contactNumber')}
        error={errors.contactNumber}
        helperText={errors.contactNumber || 'e.g., +63 9234567890'}
        placeholder={'XXXXXXXXXX'}
        code={'+63'}
      />
    </>
  );
};

export default PersonalInfo;