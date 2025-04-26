import { CheckboxInput } from '../../../../../components/common/FormFields';



const Checkbox = ({ values, handleChange, errors }) => {

  const showYouthOptions = values.age >= 15 && values.age <= 24;

  return (
    <div className="checkbox-group">
      {showYouthOptions && (
        <>
          <CheckboxInput
            label="Out of School Youth (OSY)"
            checked={Boolean(values.isOSY)}
            onChange={handleChange('isOSY')}
            color="primary"
            error={errors.isOSY}
            helperText={errors.isOSY}
            required={showYouthOptions}
          />
          <CheckboxInput
            label="In School"
            checked={Boolean(values.inSchool)}
            onChange={handleChange('inSchool')}
            color="primary"
            error={errors.inSchool}
            helperText={errors.inSchool}
            required={showYouthOptions}
          />
        </>
      )}
      <CheckboxInput
        label="Out of Town"
        checked={Boolean(values.outOfTown)}
        onChange={handleChange('outOfTown')}
        color="primary"
      />
      <CheckboxInput
        label="OFW"
        checked={Boolean(values.isOFW)}
        onChange={handleChange('isOFW')}
        color="primary"
      />
      <CheckboxInput
        label="Person with Disability (PWD)"
        checked={Boolean(values.isPWD)}
        onChange={handleChange('isPWD')}
        color="primary"
      />
      <CheckboxInput
        label="Solo Parent"
        checked={Boolean(values.isSoloParent)}
        onChange={handleChange('isSoloParent')}
        color="primary"
      />
      <CheckboxInput
        label="Ipula/Non-Ivatan"
        checked={Boolean(values.isIpula)}
        onChange={handleChange('isIpula')}
        color="primary"
      />
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