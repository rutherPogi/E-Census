import { Box, Typography, Paper, Chip, Grid, Divider, Tooltip, Button } from "@mui/material";
import { Badge, Call, Edit, Person, Work } from "@mui/icons-material";
import { formatters } from "../../../../utils/formatter";


export const PersonalInfoSection = ({ member, handleEdit, isViewing = false }) => {

  if (!member) return null;
  
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
              Person with Disability (PWD)
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1, mt: 1}}>
            {Boolean(member.disabilityType) && 
              <Grid item><Chip size="small" label={member.disabilityType} color="info" /></Grid>
            }
            {Boolean(member.disabilityCause) && 
              <Grid item><Chip size="small" label={member.disabilityCause} color="success" /></Grid>
            }
            {Boolean(member.disabilitySpecific) && 
              <Grid item><Chip size="small" label={member.disabilitySpecific} color="secondary" /></Grid>
            }
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
              <Typography variant="subtitle2" color="text.secondary">Landline Number</Typography>
              <Typography variant="body2">{member.landlineNumber || 'N/A'}</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle2" color="text.secondary">Email Address</Typography>
              <Typography variant="body2">{member.emailAddress || 'N/A'}</Typography>
            </Grid>
          </Grid>
          <Box mt={2}>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle2" color="text.secondary">House Number & Street</Typography>
              <Typography variant="body2">
                {`${member.street},
                  ${member.barangay},
                  ${member.municipality},
                  ${member.province}`}
              </Typography>
            </Grid>
          </Box>
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

        {/* ID REFERENCE NO. SECTION */}
        <Box sx={{ border: '1px solid #ccc', borderRadius: 2, padding: 2 }}>
          <Box sx={{ display: 'flex', gap: 2}}>
            <Badge color="primary"/>
            <Typography variant="subtitle1" color="primary" sx={{ mb: 1, fontWeight: 'medium' }}>
              ID REFERENCE NO.
            </Typography>
          </Box>
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

      </Box>
  </Box>
  );
};