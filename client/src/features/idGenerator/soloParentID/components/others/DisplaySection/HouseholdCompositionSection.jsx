import { Box, Typography, Paper, Chip, Grid, Divider } from "@mui/material";
import { formatters } from "../../../../utils/formatter";

export const HouseholdCompositionSection = (members) => {
  
  if (!members || members.length === 0) return null;
  
  return (
    <Box sx={{ mb: 4 }}>
      {members.map((member, index) => (
        <Paper key={index} elevation={1} sx={{ p: 3, mb: 3, borderRadius: '12px' }}>
          {/* HEADER WITH NAME AND FAMILY HEAD STATUS */}
          <Box sx={{ 
            display: 'flex', 
            alignItems: { xs: 'flex-start', sm: 'center' },
            flexDirection: { xs: 'column', sm: 'row' }, 
            mb: 2 
          }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              {`${member.firstName} 
                ${member.middleName === 'N/A' ? '' : member.middleName} 
                ${member.lastName} 
                ${member.suffix === 'N/A' ? '' : member.suffix}`.trim()}
            </Typography>
            {member.relationship && (
              <Chip 
                size="small" 
                label= {member.relationship} 
                color="primary" 
                sx={{ 
                  ml: { xs: 0, sm: 1 },
                  mt: { xs: 0.5, sm: 0 }
                }} 
              />
            )}
          </Box>

          {/* PERSONAL INFORMATION SECTION */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" color="primary" sx={{ mb: 1, fontWeight: 'medium' }}>
              Personal Information
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={3}>
                <Typography variant="subtitle2" color="text.secondary">Age</Typography>
                <Typography variant="body2">{member.age}</Typography>
              </Grid>
              
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
                <Typography variant="subtitle2" color="text.secondary">Occupation</Typography>
                <Typography variant="body2">{member.occupation || 'N/A'}</Typography>
              </Grid>
              
              <Grid item xs={12} sm={6} md={3}>
                <Typography variant="subtitle2" color="text.secondary">Monthly Income</Typography>
                <Typography variant="body2">{
                  member.monthlyIncome ? formatters.currency ? formatters.currency(member.monthlyIncome) : member.monthlyIncome : 'N/A'
                }</Typography>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      ))}
    </Box>
  );
};