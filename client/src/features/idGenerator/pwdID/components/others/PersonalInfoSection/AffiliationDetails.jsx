import { TextInput, ContactNumberInput } from "../../../../../../components/common/FormFields";


export const AffiliationDetails = ({ 
  values, 
  handleChange, 
  handleContactChange, 
  errors 
}) => {

  return (
    <>
      <div className="section-title field-full">Government Affiliation Details</div>
      <TextInput
        label='Name of Organization'
        value={values.organizationAffiliated}
        onChange={handleChange('organizationAffiliated')}
        error={errors.organizationAffiliated}
        helperText = {errors.organizationAffiliated}
        placeholder = 'Name of affiliated organization'
      />
      <TextInput
        label='Contact Person'
        value={values.contactPerson}
        onChange={handleChange('contactPerson')}
        error={errors.contactPerson}
        helperText = {errors.contactPerson}
      />
      <TextInput
        label='Office Address'
        value={values.officeAddress}
        onChange={handleChange('officeAddress')}
        error={errors.officeAddress}
        helperText = {errors.officeAddress || 'e.g. BGC, Taguig City'}
      />
      <ContactNumberInput
        label = 'Telephone Number'
        value = {values.telephoneNumber}
        onChange = {handleContactChange('telephoneNumber')}
        error = {errors.telephoneNumber}
        helperText = 'e.g., 02-123-4567 or 042-123-4567'
        placeholder = 'Enter telephone number'
        variant = 'outlined'
      />
      
    </>
  );
};

export default AffiliationDetails;