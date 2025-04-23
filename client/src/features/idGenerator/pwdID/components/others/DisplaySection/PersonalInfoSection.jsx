import { Box, Typography, Paper, Chip, Grid, Divider } from "@mui/material";
import { formatters } from "../../../../utils/formatter";

export const PersonalInfoSection = (member) => {

  if (!member) return null;
  
  return (
    <Box sx={{ mb: 4 }}>
      <Paper elevation={1} sx={{ p: 3, mb: 3, borderRadius: '12px' }}>
        {/* HEADER WITH NAME AND FAMILY HEAD STATUS */}
        <Box sx={{ 
          display: 'flex', 
          alignItems: { xs: 'flex-start', sm: 'center' },
          flexDirection: { xs: 'column', sm: 'row' }, 
          mb: 2 
        }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            {`${member.firstName || ''} 
              ${member.middleName === 'N/A' ? '' : member.middleName || ''} 
              ${member.lastName || ''} 
              ${member.suffix === 'N/A' ? '' : member.suffix || ''}`.trim()}
          </Typography>
          <Chip 
            size="small" 
            label= {member.disabilityType} 
            color="primary" 
            sx={{ 
              ml: { xs: 0, sm: 1 },
              mt: { xs: 0.5, sm: 0 }
            }} 
          />
          <Chip 
            size="small" 
            label= {member.disabilityCause} 
            color="success" 
            sx={{ 
              ml: { xs: 0, sm: 1 },
              mt: { xs: 0.5, sm: 0 }
            }} 
          />
          <Chip 
            size="small" 
            label= {member.disabilitySpecific} 
            color="secondary" 
            sx={{ 
              ml: { xs: 0, sm: 1 },
              mt: { xs: 0.5, sm: 0 }
            }} 
          />
        </Box>

        {/* PERSONAL INFORMATION SECTION */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" color="primary" sx={{ mb: 1, fontWeight: 'medium' }}>
            Personal Information
          </Typography>
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
              <Typography variant="subtitle2" color="text.secondary">Civil Status</Typography>
              <Typography variant="body2">{member.civilStatus || 'N/A'}</Typography>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle2" color="text.secondary">Blood Type</Typography>
              <Typography variant="body2">{member.bloodType || 'N/A'}</Typography>
            </Grid>
          </Grid>
        </Box>

        {/* CONTACT INFORMATION SECTION */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" color="primary" sx={{ mb: 1, fontWeight: 'medium' }}>
            Contact Information
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle2" color="text.secondary">House Number & Street</Typography>
              <Typography variant="body2">{member.street || 'N/A'}</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle2" color="text.secondary">Barangay</Typography>
              <Typography variant="body2">{member.barangay || 'N/A'}</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle2" color="text.secondary">Municipality</Typography>
              <Typography variant="body2">{member.municipality || 'N/A'}</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle2" color="text.secondary">Province</Typography>
              <Typography variant="body2">{member.province || 'N/A'}</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle2" color="text.secondary">Region</Typography>
              <Typography variant="body2">{member.region || 'N/A'}</Typography>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle2" color="text.secondary">Landline Number</Typography>
              <Typography variant="body2">{member.landlineNumber || 'N/A'}</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle2" color="text.secondary">Mobile Number</Typography>
              <Typography variant="body2">{member.mobileNumber || 'N/A'}</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle2" color="text.secondary">Email Address</Typography>
              <Typography variant="body2">{member.emailAddress || 'N/A'}</Typography>
            </Grid>
          </Grid>
        </Box>

        {/* PROFESSIONAL INFORMATION SECTION */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" color="primary" sx={{ mb: 1, fontWeight: 'medium' }}>
            Professional Information
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle2" color="text.secondary">Education</Typography>
              <Typography variant="body2">{member.educationalAttainment || 'N/A'}</Typography>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle2" color="text.secondary">Employment Status</Typography>
              <Typography variant="body2">{member.employmentStatus || 'N/A'}</Typography>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle2" color="text.secondary">Employment Type</Typography>
              <Typography variant="body2">{member.employmentType || 'N/A'}</Typography>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle2" color="text.secondary">Employment Category</Typography>
              <Typography variant="body2">{member.employmentCategory || 'N/A'}</Typography>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle2" color="text.secondary">Occupation</Typography>
              <Typography variant="body2">{member.occupation || 'N/A'}</Typography>
            </Grid>
          </Grid>
        </Box>

        {/* ID REFERENCE SECTION */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" color="primary" sx={{ mb: 1, fontWeight: 'medium' }}>
            ID REFERENCE NO.
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle2" color="text.secondary">Philhealth No.</Typography>
              <Typography variant="body2">{member.philhealthNumber || 'N/A'}</Typography>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle2" color="text.secondary">SSS No.</Typography>
              <Typography variant="body2">{member.sssNumber || 'N/A'}</Typography>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle2" color="text.secondary">GSIS No.</Typography>
              <Typography variant="body2">{member.gsisNumber || 'N/A'}</Typography>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle2" color="text.secondary">PAG-IBIG No.</Typography>
              <Typography variant="body2">{member.pagibigNumber || 'N/A'}</Typography>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle2" color="text.secondary">PSN No.</Typography>
              <Typography variant="body2">{member.psnNumber || 'N/A'}</Typography>
            </Grid>
          </Grid>
        </Box>

        {/* AFFILIATION DETAILS SECTION (CONDITIONAL) */}
        {Boolean(member.isAffiliated) && (
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" color="primary" sx={{ mb: 1, fontWeight: 'medium' }}>
              Government Affiliation Details
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={3}>
                <Typography variant="subtitle2" color="text.secondary">Organization Affiliated</Typography>
                <Typography variant="body2">{member.organizationAffiliated || 'N/A'}</Typography>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <Typography variant="subtitle2" color="text.secondary">Office Address</Typography>
                <Typography variant="body2">{member.officeAddress || 'N/A'}</Typography>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <Typography variant="subtitle2" color="text.secondary">Contact Person</Typography>
                <Typography variant="body2">{member.contactPerson || 'N/A'}</Typography>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <Typography variant="subtitle2" color="text.secondary">Landline Number</Typography>
                <Typography variant="body2">{member.telephoneNumber || 'N/A'}</Typography>
              </Grid>
            </Grid>
          </Box>
        )}
      </Paper>
  </Box>
  );
};