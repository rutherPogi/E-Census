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
        helperText = {errors.street}
        placeholder = 'e.g. 123 Rizal St. '
        required
      />
      <DropdownInput
        label = 'Barangay'
        options = {BARANGAY_OPTIONS}
        value = {values.barangay}
        onChange = {(e, newValue) => handleChange('barangay')(e, newValue)}
        error = {errors.barangay} 
        helperText = {errors.barangay || ''}
        placeholder = 'Enter your barangay'
        required
      />
      <DropdownInput
        label = 'Municipality'
        options = {MUNICIPALITY_OPTIONS}
        value = {values.municipality}
        onChange = {(e, newValue) => handleChange('municipality')(e, newValue)}
        error = {errors.municipality} 
        helperText = {errors.municipality || ''}
        placeholder = 'Enter your municipality'
        disabled
      />
      <DropdownInput
        label = 'Province'
        options = {PROVINCE_OPTIONS}
        value = {values.province}
        onChange = {(e, newValue) => handleChange('province')(e, newValue)}
        error = {errors.province} 
        helperText = {errors.province || ''}
        placeholder = 'Enter your province'
        disabled
      />
      <ContactNumberInput
        label = 'Landline Number'
        value = {values.landlineNumber}
        onChange = {handleContactChange('landlineNumber')}
        error = {errors.landlineNumber}
        helperText = 'e.g., 02-123-4567 or 042-123-4567'
        placeholder = 'Enter landline number'
        variant = 'outlined'
      />
      <ContactNumberInput
        label = 'Mobile Number'
        value = {values.mobileNumber}
        onChange = {handleContactChange('mobileNumber')}
        error = {errors.mobileNumber}
        helperText = 'e.g. +63 9285119239'
        placeholder = 'Enter mobile number'
        variant = 'outlined'
        code = '+63'
      />
      <TextInput
        label='Email Address'
        value={values.emailAddress}
        onChange={handleChange('emailAddress')}
        error={errors.emailAddress}
        helperText = {errors.emailAddress || 'example@gmail.com'}
        placeholder = 'e.g. example@gmail.com'
      />
    </>
  );
};

export default ContactDetails;