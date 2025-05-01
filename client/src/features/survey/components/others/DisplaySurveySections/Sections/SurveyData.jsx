import { Box, Typography, Paper, Grid, Divider } from "@mui/material";


export const SurveyDataSection = (surveyData) => {

  console.log('SurveyData', surveyData);

  if (!surveyData || Object.keys(surveyData).length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 3 }}>
        <Typography color="text.secondary">No survey data available.</Typography>
      </Box>
    );
  }
  
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, mb: 4 }}>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="subtitle2" color="text.secondary">Survey ID</Typography>
          <Typography variant="body2">{surveyData.surveyID}</Typography>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="subtitle2" color="text.secondary">Family Class</Typography>
          <Typography variant="body2">{surveyData.familyClass}</Typography>
        </Grid>
      </Grid>

      <Grid container spacing={1}>
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="subtitle2" color="text.secondary">Respondent</Typography>
          <Typography variant="body2">{surveyData.respondent}</Typography>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="subtitle2" color="text.secondary">Interviewer</Typography>
          <Typography variant="body2">{surveyData.interviewer}</Typography>
        </Grid>
      </Grid>

      <Grid container spacing={1}>
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="subtitle2" color="text.secondary">Barangay</Typography>
          <Typography variant="body2">{surveyData.barangay}</Typography>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="subtitle2" color="text.secondary">Municipality</Typography>
          <Typography variant="body2">{surveyData.municipality}</Typography>
        </Grid>
      </Grid>

      <Grid container spacing={1}>
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="subtitle2" color="text.secondary">Monthly Income</Typography>
          <Typography variant="body2">{surveyData.monthlyIncome}</Typography>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="subtitle2" color="text.secondary">Irregular Income</Typography>
          <Typography variant="body2">{surveyData.irregularIncome}</Typography>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="subtitle2" color="text.secondary">Family Income</Typography>
          <Typography variant="body2">{surveyData.familyIncome}</Typography>
        </Grid>
      </Grid>
    </Box>
  );
};