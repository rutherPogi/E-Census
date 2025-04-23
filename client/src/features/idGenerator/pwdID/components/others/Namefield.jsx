import { Box, Typography } from "@mui/material";
import { TextInput, DropdownInput } from "../../../../../components/common/FormFields";
import { SUFFIX_OPTIONS } from "../../utils/options";

export const NameFields = ({ title, values, handleChange, fieldPrefix, errors}) => (
  <Box>
    <Typography sx = {{ mb: 2 }}>{title || ''}</Typography>
    <Box 
      sx={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(4, 1fr)', 
        gap: 2 
      }}
    >
      <TextInput
        label='First Name'
        value={values[`${fieldPrefix}FirstName`]}
        onChange={handleChange(`${fieldPrefix}FirstName`)}
        error={errors[`${fieldPrefix}FirstName`]}
      />
      <TextInput
        label='Middle Name'
        value={values[`${fieldPrefix}MiddleName`]}
        onChange={handleChange(`${fieldPrefix}MiddleName`)}
      />
      <TextInput
        label='Last Name'
        value={values[`${fieldPrefix}LastName`]}
        onChange={handleChange(`${fieldPrefix}LastName`)}
        error={errors[`${fieldPrefix}LastName`]}
      />
      <DropdownInput
        label='Suffix'
        options={SUFFIX_OPTIONS}
        value={values[`${fieldPrefix}Suffix`]}
        onChange={(e, newValue) => handleChange(`${fieldPrefix}Suffix`)(e, newValue)}
        helperText='e.g. Sr.'
      />
    </Box>
  </Box>
);