import { CheckboxInput } from '../../../../../../components/common/FormFields';



export const Checkbox = ({ values, handleChange, errors }) => {

  return (
    <div className="checkbox-group">
      <CheckboxInput
        label="Government Affiliated"
        checked={Boolean(values.isAffiliated)}
        onChange={handleChange('isAffiliated')}
        color="primary"
      />
    </div>
  );
};

export default Checkbox;