import { 
  Box, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  Divider,
  Avatar,
  Button,
  Tooltip,
  Chip
} from "@mui/material";
import {
  Person,
  Phone,
  Home,
  Edit,
  People,
  ContactPhone,
  Call
} from "@mui/icons-material";
import { formatters } from "../../../../utils/formatter";


export const EmergencyContactSection = ({ member, handleEdit, isViewing = false }) => {


  if (!member) {
    return (
      <Box sx={{ 
        textAlign: 'center', 
        py: 5,
        borderRadius: 2,
      }}>
        <Typography color="text.secondary" variant="h6">No emergency contact added</Typography>
      </Box>
    );
  }
  
  
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
            <Call/>
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
              Emergency Contact
            </Typography> 
          </Box>
        </Box>
        {!isViewing && (
          <Tooltip title="Edit section">
            <Button
              onClick={() => handleEdit(5)}
              variant="outlined"
              color="primary"
              startIcon={<Edit/>}
            >
              EDIT
            </Button>
          </Tooltip>
        )}
      </Box>
      
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Box>
          <Grid item xs={12}>
            <Card sx={{ border: '1px solid #ccc', borderRadius: 2 }}>
              <CardContent>
                {/* HEADER WITH NAME AND RELATIONSHIP */}
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: { xs: 'flex-start', sm: 'center' },
                  flexDirection: { xs: 'column', sm: 'row' }, 
                  mb: 2 
                }}>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                      {member.contactName}
                    </Typography>
                    {member.relationship && (
                      <Chip 
                        size="small" 
                        label={member.relationship} 
                        color="primary" 
                        sx={{ mt: 0.5 }} 
                      />
                    )}
                  </Box>
                </Box>
                
                <Divider sx={{ mb: 3 }} />

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2}}>
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary">Contact Number</Typography>
                    <Typography variant="body2">+63 {member.mobileNumber}</Typography>
                  </Box>

                  <Box>
                    <Typography variant="subtitle2" color="text.secondary">Address</Typography>
                    <Typography variant="body2">
                      {member.street ? `${member.street}, ` : ''}
                      {member.barangay ? `${member.barangay}, ` : ''}
                      {member.municipality ? `${member.municipality}, ` : ''}
                      {member.province || ''}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Box>
      </Box>

    </Box>
  );
};