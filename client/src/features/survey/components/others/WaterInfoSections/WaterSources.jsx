import { useState, useEffect } from "react";
import { DropdownInput, TextInput } from '../../../../../components/common/FormFields';

export default function WaterSourceSelector({ 
  values, 
  handleChange, 
  errors,
  options
}) {
  const [showOtherInput, setShowOtherInput] = useState(false);
  
  useEffect(() => {
    const isOtherSelected = options.findIndex(option => 
      option.value === values.waterSources
    ) === -1 && values.waterSources !== '';
    
    setShowOtherInput(isOtherSelected || values.waterSources === "Others");
  }, [values.waterSources, options]);

  const handleDropdownChange = (e, newValue) => {
    handleChange('waterSources')(e, newValue);

    if (newValue && newValue.value === "Others") {
      setShowOtherInput(true);
      handleChange('waterSources')(e, { value: '' });
    } else {
      setShowOtherInput(false);
    }
  };

  const handleTextInputChange = (e) => {
    handleChange('waterSources')(e);
  };

  return (
    <>
      <DropdownInput
        label="Sources of Water"
        options={options}
        value={!showOtherInput ? values.waterSources : "Others"}
        onChange={handleDropdownChange}
        error={errors.waterSources && !showOtherInput} 
        helperText={!showOtherInput && errors.waterSources ? errors.waterSources : ""}
        required
      />
      
      {showOtherInput && (
        <TextInput
          label="Other Source (please specify)"
          name="waterSources"
          value={values.waterSources}
          onChange={handleTextInputChange}
          error={errors.waterSources && showOtherInput}
          helperText={showOtherInput && errors.waterSources ? errors.waterSources : ""}
          placeholder="Please specify water source"
          required
        />
      )}
    </>
  );
}