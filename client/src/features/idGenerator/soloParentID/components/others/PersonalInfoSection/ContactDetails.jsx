import { BARANGAY_OPTIONS, MUNICIPALITY_OPTIONS, PROVINCE_OPTIONS } from '../../../utils/options';
import { TextInput, DropdownInput, ContactNumberInput } from "../../../../../../components/common/FormFields";




export const ContactDetails = ({ 
  values, 
  handleChange, 
  handleContactChange,
  errors
}) => {
  return (
    <>
      <div className="section-title field-full">Contact Details</div>
      <TextInput
        label='House Number & Street'
        value={values.street}
        onChange={handleChange('street')}
        error={errors.street}
        helperText = {errors.street || 'e.g. 123 Rizal St.'}
        required
      />
      <DropdownInput
        label = 'Barangay'
        options = {BARANGAY_OPTIONS}
        value = {values.barangay}
        onChange = {(e, newValue) => handleChange('barangay')(e, newValue)}
        error = {errors.barangay} 
        helperText = {errors.barangay || 'e.g. Barangay Sta. Rosa'}
        required
      />
      <DropdownInput
        label = 'Municipality'
        options = {MUNICIPALITY_OPTIONS}
        value = {values.municipality}
        onChange = {(e, newValue) => handleChange('municipality')(e, newValue)}
        error = {errors.municipality} 
        helperText = {errors.municipality}
        disabled
      />
      <DropdownInput
        label = 'Province'
        options = {PROVINCE_OPTIONS}
        value = {values.province}
        onChange = {(e, newValue) => handleChange('province')(e, newValue)}
        error = {errors.province} 
        helperText = {errors.province}
        disabled
      />
      <ContactNumberInput
        label = 'Mobile Number'
        value = {values.mobileNumber}
        onChange = {handleContactChange('mobileNumber')}
        error = {errors.mobileNumber}
        helperText = '+63 XXXXXXXXXX'
        placeholder = 'Enter mobile number'
        variant = 'outlined'
        code = '+63'
      />
      <TextInput
        label='Email Address'
        value={values.emailAddress}
        onChange={handleChange('emailAddress')}
        error={errors.emailAddress}
        helperText = {errors.emailAddress || 'e.g. sample@gmail.com'}
      />
    </>
  );
};

export default ContactDetails;