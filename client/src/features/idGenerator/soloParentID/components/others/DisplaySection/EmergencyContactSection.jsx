import { 
  Box, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  Divider,
  Avatar,
  useTheme
} from "@mui/material";
import {
  Person,
  Phone,
  Home,
  ContactPhone
} from "@mui/icons-material";

export const EmergencyContactSection = (member) => {
  const theme = useTheme();

  if (!member) {
    return (
      <Box sx={{ 
        textAlign: 'center', 
        py: 5,
        borderRadius: 2,
        backgroundColor: theme.palette.grey[50],
        border: `1px dashed ${theme.palette.grey[300]}`
      }}>
        <Typography color="text.secondary" variant="h6">No emergency contact added</Typography>
      </Box>
    );
  }
  
  // Helper function to render info items
  const renderInfoItem = (icon, title, value) => (
    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
      <Box sx={{ 
        mr: 1.5, 
        color: theme.palette.primary.main,
        minWidth: 24,
        display: 'flex',
        justifyContent: 'center'
      }}>
        {icon}
      </Box>
      <Box>
        <Typography variant="caption" color="text.secondary" display="block">
          {title}
        </Typography>
        <Typography variant="body1" sx={{ fontWeight: value === 'N/A' ? 400 : 500 }}>
          {value}
        </Typography>
      </Box>
    </Box>
  );
  
  return (
    <Card 
      variant="outlined" 
      sx={{ 
        borderRadius: 2,
        overflow: 'hidden'
      }}
    >
      <Box sx={{ 
        bgcolor: theme.palette.primary.light, 
        color: theme.palette.primary.contrastText,
        py: 2,
        px: 3,
        display: 'flex',
        alignItems: 'center'
      }}>
        <ContactPhone sx={{ mr: 1.5 }} />
        <Typography variant="h6">
          Emergency Contact Information
        </Typography>
      </Box>
      
      <CardContent>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Avatar 
                sx={{ 
                  bgcolor: theme.palette.secondary.main,
                  width: 56,
                  height: 56,
                  mr: 2
                }}
              >
                {member.contactName ? member.contactName.charAt(0) : "C"}
              </Avatar>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  {member.contactName || 'Not specified'}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {member.relationship || 'Relationship not specified'}
                </Typography>
              </Box>
            </Box>
            
            <Divider sx={{ mb: 3 }} />
            
            {renderInfoItem(<Phone />, "Contact Number", member.mobileNumber || 'Not provided')}
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Box sx={{ 
              p: 3, 
              bgcolor: theme.palette.grey[50], 
              borderRadius: 2,
              height: '100%'
            }}>
              <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 'medium', display: 'flex', alignItems: 'center' }}>
                <Home fontSize="small" sx={{ mr: 1 }} /> Address
              </Typography>
              
              <Typography variant="body1" paragraph>
                {member.street ? `${member.street}, ` : ''}
                {member.barangay ? `${member.barangay}, ` : ''}
                {member.municipality ? `${member.municipality}, ` : ''}
                {member.province || ''}
                {!member.street && !member.barangay && !member.municipality && !member.province && 'Address not provided'}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};