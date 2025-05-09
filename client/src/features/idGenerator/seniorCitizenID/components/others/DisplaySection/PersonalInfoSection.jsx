import { Box, Typography, Paper, Chip, Grid, Divider, Tooltip, Button, Container} from "@mui/material";
import { Call, Edit, Elderly, Person, Work } from "@mui/icons-material";
import { formatters } from "../../../../utils/formatter";



export const PersonalInfoSection = ({ member, handleEdit, isViewing = false }) => {

  
  return (
    <Box 
      sx={{ 
        backgroundColor: 'white',
        padding: '2em'
        }}>
      <Box sx={{
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        mb: 2,
        pb: 1
      }}>
        <Box sx={{ alignItems: 'center' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column'}}>
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
              {`${member.firstName || ''} 
                ${member.middleName === 'N/A' ? '' : member.middleName || ''} 
                ${member.lastName || ''} 
                ${member.suffix === 'N/A' ? '' : member.suffix || ''}`.trim()}
            </Typography> 
            <Typography  color="text.secondary">
              Senior Citizen
            </Typography>
          </Box>
        </Box>
        {!isViewing && (
          <Tooltip title="Edit section">
            <Button
              onClick={() => handleEdit(1)}
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

        {/* PERSONAL INFORMATION SECTION */}
        <Box sx={{ border: '1px solid #ccc', borderRadius: 2, padding: 2 }}>
          <Box sx={{ display: 'flex', gap: 2}}>
            <Person color="primary"/>
            <Typography variant="subtitle1" color="primary" sx={{ mb: 1, fontWeight: 'medium' }}>
              PERSONAL INFORMATION
            </Typography>
          </Box>
          
          <Divider sx={{ mb: 2 }} />

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle2" color="text.secondary">Sex</Typography>
              <Typography variant="body2">{member.sex}</Typography>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle2" color="text.secondary">Birthdate</Typography>
              <Typography variant="body2">{formatters.date(member.birthdate)}</Typography>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle2" color="text.secondary">Birthplace</Typography>
              <Typography variant="body2">{member.birthplace || 'N/A'}</Typography>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle2" color="text.secondary">Civil Status</Typography>
              <Typography variant="body2">{member.civilStatus || 'N/A'}</Typography>
            </Grid>
          </Grid>
        </Box>

        {/* CONTACT INFORMATION SECTION */}
        <Box sx={{ border: '1px solid #ccc', borderRadius: 2, padding: 2 }}>
          <Box sx={{ display: 'flex', gap: 2}}>
            <Call color="primary"/>
            <Typography variant="subtitle1" color="primary" sx={{ mb: 1, fontWeight: 'medium' }}>
              CONTACT INFORMATION
            </Typography>
          </Box>
          <Divider sx={{ mb: 2 }} />
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle2" color="text.secondary">Mobile Number</Typography>
              <Typography variant="body2">{member.mobileNumber || 'N/A'}</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle2" color="text.secondary">House Number & Street</Typography>
              <Typography variant="body2">
                {`${member.street}
                  ${member.barangay}
                  ${member.municipality}
                  ${member.province}`}
              </Typography>
            </Grid>
          </Grid>
        </Box>

        {/* PROFESSIONAL INFORMATION SECTION */}
        <Box sx={{ border: '1px solid #ccc', borderRadius: 2, padding: 2 }}>
          <Box sx={{ display: 'flex', gap: 2}}>
            <Work color="primary"/>
            <Typography variant="subtitle1" color="primary" sx={{ mb: 1, fontWeight: 'medium' }}>
              PROFESSIONAL INFORMATION
            </Typography>
          </Box>
          <Divider sx={{ mb: 2 }} />
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle2" color="text.secondary">Education</Typography>
              <Typography variant="body2">{member.educationalAttainment || 'N/A'}</Typography>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle2" color="text.secondary">Skills</Typography>
              <Typography variant="body2">{member.skills || 'N/A'}</Typography>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle2" color="text.secondary">Occupation</Typography>
              <Typography variant="body2">{member.occupation || 'N/A'}</Typography>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle2" color="text.secondary">Annual Income</Typography>
              <Typography variant="body2">{`₱${formatters.currency(member.annualIncome)}` || 'N/A'}</Typography>
            </Grid>
          </Grid>
        </Box>

        {/* OSCA DETAILS SECTION */}
        <Box sx={{ border: '1px solid #ccc', borderRadius: 2, padding: 2 }}>
          <Box sx={{ display: 'flex', gap: 2}}>
            <Elderly color="primary"/>
            <Typography variant="subtitle1" color="primary" sx={{ mb: 1, fontWeight: 'medium' }}>
              OSCA DETAILS
            </Typography>
          </Box>
          <Divider sx={{ mb: 2 }} />
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle2" color="text.secondary">Association Name</Typography>
              <Typography variant="body2">{member.associationName || 'N/A'}</Typography>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle2" color="text.secondary">Date Elected as Officer</Typography>
              <Typography variant="body2">{formatters.date(member.asOfficer) || 'N/A'}</Typography>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle2" color="text.secondary">Position</Typography>
              <Typography variant="body2">{member.position || 'N/A'}</Typography>
            </Grid>
          </Grid>
        </Box>

      </Box>
  </Box>
  );
};