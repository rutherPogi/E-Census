import { Box, Typography, Chip, Grid, Divider, Card, CardContent, Tooltip, Button, Paper } from "@mui/material";
import { Edit, Person, Work, People } from "@mui/icons-material";
import { formatters } from "../../../../utils/formatter";



export const FamilyProfileSection = ({ members, handleEdit, isViewing = false }) => {
  
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
                FAMILY COMPOSITION
              </Typography> 
            </Box>
          </Box>
          {!isViewing && (
            <Tooltip title="Edit section">
              <Button
                onClick={() => handleEdit(3)}
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
        {members.map((member, index) => (
          <Grid item xs={12} key={index}>
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
                      {`${member.firstName || ''} 
                        ${member.middleName === 'N/A' ? '' : member.middleName || ''} 
                        ${member.lastName || ''} 
                        ${member.suffix === 'N/A' ? '' : member.suffix || ''}`.trim()}
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

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
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
                        <Typography variant="subtitle2" color="text.secondary">Age</Typography>
                        <Typography variant="body2">{member.age}</Typography>
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
                        <Typography variant="subtitle2" color="text.secondary">Occupation</Typography>
                        <Typography variant="body2">{member.occupation || 'N/A'}</Typography>
                      </Grid>
                      
                      <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="subtitle2" color="text.secondary">Annua Income</Typography>
                        <Typography variant="body2">{`₱${formatters.currency(member.annualIncome)}`}</Typography>
                      </Grid>
                    </Grid>
                  </Box>
                </Box>

                
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Box>

    </Box>
  );
};