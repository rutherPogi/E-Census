import { Box, Radio, RadioGroup, FormControlLabel, FormControl } from "@mui/material";
import { useState, useEffect } from "react";

import { NameFields } from "../Namefield";

export const AccomplishedBy = ({ 
  values, 
  handleChange, 
  errors 
}) => {
  
  const [radioError, setRadioError] = useState("");
  
  // Check if any role is selected
  const hasSelectedRole = Boolean(values.abRole);
  
  // Update error message when role changes
  useEffect(() => {
    setRadioError(hasSelectedRole ? "" : "One option must be selected");
  }, [values.abRole, hasSelectedRole]);

  // Custom handler for radio changes to update both the role and individual flags
  const handleRoleChange = (event) => {
    const newRole = event.target.value;
    
    // Update the abRole field
    handleChange('abRole')({ target: { value: newRole } });

  };

  return (
    <>
      <div className="section-title field-full">Accomplished By</div>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <FormControl component="fieldset">
          <RadioGroup
            row
            name="accomplishedBy"
            value={values.abRole || ''}
            onChange={handleRoleChange}
          >
            <FormControlLabel 
              value="Applicant" 
              control={<Radio color="primary" />} 
              label="Applicant" 
            />
            <FormControlLabel 
              value="Guardian" 
              control={<Radio color="primary" />} 
              label="Guardian" 
            />
            <FormControlLabel 
              value="Representative" 
              control={<Radio color="primary" />} 
              label="Representative" 
            />
          </RadioGroup>
        </FormControl>
        
        {radioError && (
          <Box sx={{ color: 'error.main', fontSize: '0.75rem', mt: 1, ml: 1 }}>
            {radioError}
          </Box>
        )}
      </Box>
      
      {/* Only show NameFields if a role is selected */}
      {hasSelectedRole && (
        <NameFields 
          title={values.abRole} 
          values={values} 
          handleChange={handleChange} 
          fieldPrefix="ab" 
          errors={errors}
        />
      )}
    </>
  );
};

export default AccomplishedBy;