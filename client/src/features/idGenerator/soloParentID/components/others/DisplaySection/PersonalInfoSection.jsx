import { Box, Typography, Paper, Chip, Grid, Divider, Tooltip, Button, Container} from "@mui/material";
import { Call, Edit, Person, Work } from "@mui/icons-material";
import { formatters } from "../../../../utils/formatter";

export const PersonalInfoSection = ({member, handleEdit, isViewing = false}) => {

  if (!member) {
    return (
      <Box sx={{ textAlign: 'center', py: 3 }}>
        <Typography color="text.secondary">No Personal Information added.</Typography>
      </Box>
    );
  }
  
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
              Solo Parent
            </Typography>
          </Box>
          <Box sx={{ mt: 1}}>
            {Boolean(member.isPWD) && <Grid item><Chip size="small" label="PWD" color="info" /></Grid>}
            {Boolean(member.isLGBTQ) && <Grid item><Chip size="small" label="LGBTQ" color="info" /></Grid>}
            {Boolean(member.isIndigenous) && <Grid item><Chip size="small" label="Indigenous" color="info" /></Grid>}
            {Boolean(member.isBeneficiary) && <Grid item><Chip size="small" label="Pantawid Beneficiary" color="info" /></Grid>}
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
              <Typography variant="subtitle2" color="text.secondary">Email Address</Typography>
              <Typography variant="body2">{member.emailAddress || 'N/A'}</Typography>
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
              <Typography variant="body2">{`₱${formatters.currency(member.monthlyIncome)}` || 'N/A'}</Typography>
            </Grid>
          </Grid>
        </Box>

        {Boolean(member.isIndigenous) && (
          <Box sx={{ border: '1px solid #ccc', borderRadius: 2, padding: 2 }}>
            <Box sx={{ display: 'flex', gap: 2}}>
              <Call color="primary"/>
              <Typography variant="subtitle1" color="primary" sx={{ mb: 1, fontWeight: 'medium' }}>
                INDIGENOUS PERSON DETAILS
              </Typography>
            </Box>
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
          <Box sx={{ border: '1px solid #ccc', borderRadius: 2, padding: 2 }}>
            <Box sx={{ display: 'flex', gap: 2}}>
              <Call color="primary"/>
              <Typography variant="subtitle1" color="primary" sx={{ mb: 1, fontWeight: 'medium' }}>
                BENEFICIARY DETAILS
              </Typography>
            </Box>
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
      </Box>
    </Box>
  );
};