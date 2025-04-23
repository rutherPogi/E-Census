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
              <Typography variant="subtitle2" color="text.secondary">Birthplace</Typography>
              <Typography variant="body2">{member.birthplace}</Typography>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle2" color="text.secondary">Civil Status</Typography>
              <Typography variant="body2">{member.civilStatus || 'N/A'}</Typography>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle2" color="text.secondary">Religion</Typography>
              <Typography variant="body2">{member.religion || 'N/A'}</Typography>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle2" color="text.secondary">Phylsis Number</Typography>
              <Typography variant="body2">{member.phylsisNumber || 'N/A'}</Typography>
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
              <Typography variant="subtitle2" color="text.secondary">Occupation</Typography>
              <Typography variant="body2">{member.occupation || 'N/A'}</Typography>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle2" color="text.secondary">Company</Typography>
              <Typography variant="body2">{member.company || 'N/A'}</Typography>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle2" color="text.secondary">Monthly Income</Typography>
              <Typography variant="body2">{member.monthlyIncome || 'N/A'}</Typography>
            </Grid>
          </Grid>
        </Box>


        {Boolean(member.isIndigenous) && (
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" color="primary" sx={{ mb: 1, fontWeight: 'medium' }}>
              Indigenous Person Details
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={3}>
                <Typography variant="subtitle2" color="text.secondary">Name of Affiliation</Typography>
                <Typography variant="body2">{member.indigenousAffiliation || 'N/A'}</Typography>
              </Grid>
            </Grid>
          </Box>
        )}

        {Boolean(member.isBeneficiary) && (
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" color="primary" sx={{ mb: 1, fontWeight: 'medium' }}>
              Beneficiary Details
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={3}>
                <Typography variant="subtitle2" color="text.secondary">Household ID</Typography>
                <Typography variant="body2">{member.householdID || 'N/A'}</Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Typography variant="subtitle2" color="text.secondary">Beneficiary Code</Typography>
                <Typography variant="body2">{member.beneficiaryCode || 'N/A'}</Typography>
              </Grid>
            </Grid>
          </Box>
        )}
        

        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle1" color="primary" sx={{ mb: 1, fontWeight: 'medium' }}>
            Status
          </Typography>
          <Grid container spacing={1}>
            {Boolean(member.isPWD) && <Grid item><Chip size="small" label="PWD" color="info" /></Grid>}
            {Boolean(member.isLGBTQ) && <Grid item><Chip size="small" label="LGBTQ" color="info" /></Grid>}
            {Boolean(member.isIndigenous) && <Grid item><Chip size="small" label="Indigenous" color="info" /></Grid>}
            {Boolean(member.isBeneficiary) && <Grid item><Chip size="small" label="Pantawid Beneficiary" color="info" /></Grid>}
          </Grid>
        </Box>
      </Paper>
  </Box>
  );
};