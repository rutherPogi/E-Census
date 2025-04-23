import { CheckboxInput } from '../../../../../../components/common/FormFields';



export const Checkbox = ({ values, handleChange, errors }) => {

  return (
    <div className="checkbox-group">
      <CheckboxInput
        label="Pantawid Beneficiary?"
        checked={Boolean(values.isBeneficiary)}
        onChange={handleChange('isBeneficiary')}
        color="primary"
      />
      <CheckboxInput
        label="Indigenous Person?"
        checked={Boolean(values.isIndigenous)}
        onChange={handleChange('isIndigenous')}
        color="primary"
      />
      <CheckboxInput
        label="LGBTQ+?"
        checked={Boolean(values.isLGBTQ)}
        onChange={handleChange('isLGBTQ')}
        color="primary"
      />
      <CheckboxInput
        label="Person With Disability?"
        checked={Boolean(values.isPWD)}
        onChange={handleChange('isPWD')}
        color="primary"
      />
    </div>
  );
};

export default Checkbox;