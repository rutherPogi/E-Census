// pages/admin/accounts/components/AccountGenerationForm.jsx
import { Box, Button } from '@mui/material';
import { Autorenew as AutorenewIcon } from '@mui/icons-material';
import { POSITION_OPTIONS, BARANGAY_OPTIONS } from "../utils/constants";
import { DropdownInput, NumberInput } from "../../../components/common/FormFields";

const AccountGenerationForm = ({ 
  bulkGeneration, 
  handleBulkInputChange, 
  handleGenerateAccounts,
  errors 
}) => {
  return (
    <Box  sx={{ height: '100%' }}>        
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 2 }}>
          <DropdownInput
            label="Position"
            name="position"
            options={POSITION_OPTIONS}
            value={bulkGeneration.position}
            onChange={(e, newValue) => handleBulkInputChange('position')(e, newValue)}
            error={errors.position}
            helperText={errors.position || 'e.g., MSWDO Officer, Barangay Official'}
            required
            fullWidth
          />
          
          <DropdownInput
            label="Barangay"
            name="barangay"
            options={BARANGAY_OPTIONS}
            value={bulkGeneration.barangay}
            onChange={(e, newValue) => handleBulkInputChange('barangay')(e, newValue)}
            error={errors.barangay}
            helperText={errors.barangay || 'Select the barangay for these accounts'}
            required
            fullWidth
          />
          
          <NumberInput
            label="Number of Accounts"
            name="count"
            value={bulkGeneration.count} 
            onChange={handleBulkInputChange('count')}
            max={20}
            required
            fullWidth
          />
          
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleGenerateAccounts}
            startIcon={<AutorenewIcon />}
            sx={{ py: 1.5, mt: 1 }}
          >
            Generate Accounts
          </Button>
        </Box>
    </Box>
  );
};

export default AccountGenerationForm;