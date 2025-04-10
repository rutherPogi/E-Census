import { TextInput, DateInput } from "../../../../../components/common/FormFields";
import dayjs from "dayjs";


export const AffiliationDetails = ({ 
  values, 
  handleChange, 
  handleDateChange, 
  errors 
}) => {

  return (
    <div className="responsive-form details">
      <div className="section-title field-full">Affiliation Details</div>
      <DateInput 
        label="As Officer"
        value={values.asOfficer ? dayjs(values.asOfficer) : null}
        onChange={handleDateChange('asOfficer')}
        error={errors.asOfficer}
        helperText={errors.asOfficer || 'date become an officer'}
      />
      <DateInput 
        label="As Member"
        value={values.asMember ? dayjs(values.asMember) : null}
        onChange={handleDateChange('asMember')}
        error={errors.asMember}
        helperText={errors.asMember || 'date become a member'}
      />
      <TextInput
        label='Name of Organization'
        value={values.organizationAffiliated}
        onChange={handleChange('organizationAffiliated')}
        error={errors.organizationAffiliated}
        helperText = {errors.organizationAffiliated}
        placeholder = 'Name of affiliated organization'
      />
    </div>
  );
};

export default AffiliationDetails;