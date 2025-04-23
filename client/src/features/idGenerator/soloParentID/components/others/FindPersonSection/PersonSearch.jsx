import { Box, Typography, useTheme, useMediaQuery, Paper } from '@mui/material';
import { TextInput, DropdownInput, DateInput } from '../../../../../../components/common/FormFields';
import { SUFFIX_OPTIONS, SEX_OPTIONS } from '../../../utils/options';



const PersonSearchForm = ({
  values,
  errors,
  handleChange,
  handleDateChange
}) => {

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Paper elevation={2} sx={{ mb: 3, overflow: 'hidden' }}>
      <Box sx={{ 
        bgcolor: theme.palette.primary.main, 
        color: 'white',
        p: 2
      }}>
        <Typography variant="h6">
          Find Solo Parent
        </Typography>
      </Box>
      <Box 
        sx={{
          padding: 3,
          display: 'grid',
          gap: 2,
          gridTemplateColumns: {
            xs: '1fr',
            sm: '1fr 1fr',
            md: '1fr 1fr 1fr'
          }
        }}
      >
        <TextInput
          label='First Name'
          value={values.firstName}
          onChange={handleChange('firstName')}
          error={!!errors.firstName}
          helperText={errors.firstName || 'e.g., Juan'}
          placeholder='Enter First Name'
          required
          fullWidth
        />
        <TextInput
          label='Middle Name'
          value={values.middleName}
          onChange={handleChange('middleName')}
          error={!!errors.middleName}
          helperText={errors.middleName || 'e.g., Santos'}
          placeholder='Enter Middle Name'
          fullWidth
        />
        <TextInput
          label='Last Name'
          value={values.lastName}
          onChange={handleChange('lastName')}
          error={!!errors.lastName}
          helperText={errors.lastName || 'e.g, Dela Cruz'}
          placeholder='Enter Last Name'
          required
          fullWidth
        />
        <DropdownInput
          label='Suffix'
          options={SUFFIX_OPTIONS}
          value={values.suffix}
          onChange={(e, newValue) => handleChange('suffix')(e, newValue)}
          error={!!errors.suffix} 
          helperText={errors.suffix || 'e.g., Jr - Junior'}
          placeholder='Select suffix'
          fullWidth
        />
        <DateInput
          label='Birthdate'
          value={values.birthdate}
          onChange={handleDateChange('birthdate', true)}
          error={!!errors.birthdate}  
          helperText={errors.birthdate || 'MM/DD/YYYY'}
          required
          fullWidth
        />
        <DropdownInput
          label='Sex'
          options={SEX_OPTIONS}
          value={values.sex}
          onChange={(e, newValue) => handleChange('sex')(e, newValue)}
          error={!!errors.sex} 
          helperText={errors.sex || 'e.g., Male'}
          placeholder='Select sex'
          required
          fullWidth
        />
      </Box>
    </Paper>
  );
};

export default PersonSearchForm;