import { Box, Typography, Paper, Chip, Grid, Divider, Tooltip, Button, Container} from "@mui/material";
import { Call, Edit, People, Work } from "@mui/icons-material";
import { formatters } from "../../../../utils/formatter";



export const FamilyBackgroundSection = ({ members, handleEdit, isViewing = false }) => {

  if (!members) return null;
  
  return (
    <Box
      sx={{ 
        backgroundColor: 'white',
        padding: '2em'
        }}
      >
        <Box sx={{
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          mb: 2,
          pb: 1
        }}>
          <Box sx={{ alignItems: 'center' }}>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center'}}>
              <People/>
              <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                FAMILY BACKGROUND
              </Typography> 
            </Box>
          </Box>
          {!isViewing && (
            <Tooltip title="Edit section">
              <Button
                onClick={() => handleEdit(2)}
                variant="outlined"
                color="primary"
                startIcon={<Edit/>}
              >
                EDIT
              </Button>
            </Tooltip>
          )}
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3}}>

        <Box sx={{ display: 'flex', gap: 2, border: '1px solid #ccc', borderRadius: 2, padding: 2 }}>
          <Typography variant="subtitle2" color="text.secondary">
            Father's Name:
          </Typography>
          <Typography variant="body2">
            {`${members.fatherFirstName ? members.fatherFirstName : ''} 
              ${members.fatherMiddleName ? members.fatherMiddleName : ''} 
              ${members.fatherLastName ? members.fatherLastName : ''} 
              ${members.fatherSuffix ? members.fatherSuffix : ''}`
              .trim() || 'N/A'}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: 2, border: '1px solid #ccc', borderRadius: 2, padding: 2 }}>
          <Typography variant="subtitle2" color="text.secondary">
            Mother's Name:
          </Typography>
          <Typography variant="body2">
            {`${members.motherFirstName ? members.motherFirstName : ''} 
              ${members.motherMiddleName ? members.motherMiddleName : ''} 
              ${members.motherLastName ? members.motherLastName : ''}`
              .trim() || 'N/A'}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: 2, border: '1px solid #ccc', borderRadius: 2, padding: 2 }}>
          <Typography variant="subtitle2" color="text.secondary">
            Guardian's Name:
          </Typography>
          <Typography variant="body2">
            {`${members.guardianFirstName ? members.guardianFirstName : ''} 
              ${members.guardianMiddleName ? members.guardianMiddleName : ''} 
              ${members.guardianLastName ? members.guardianLastName : ''} 
              ${members.guardianSuffix ? members.guardianSuffix : ''}`
              .trim() || 'N/A'}
          </Typography>
        </Box>

        </Box>
      </Box>
  );
};