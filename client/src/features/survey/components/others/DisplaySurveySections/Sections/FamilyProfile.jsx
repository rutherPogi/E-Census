import { Box, Typography, Chip, Grid, Divider, Card, CardContent, Tooltip, Button,
         useMediaQuery, useTheme, IconButton } from "@mui/material";
import { Edit, Person, Work, People, MoreHoriz, Gavel } from "@mui/icons-material";
import { formatters } from "../../../../utils/formatter";



export const FamilyProfileSection = ({ members, handleEdit, isViewing = false }) => {

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  if (!members) {
    return (
      <Box sx={{ textAlign: 'center', py: 3 }}>
        <Typography color="text.secondary">No Family members added</Typography>
      </Box>
    );
  }
  
  return (
    <Box
      sx={{ 
        backgroundColor: 'white',
        padding: { xs: '1em', md: '2em' }
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
                Family Profile
              </Typography> 
            </Box>
          </Box>
            {!isViewing && (
              <Tooltip title="Edit section">
                {isSmallScreen ? (
                  <IconButton onClick={() => handleEdit(3)} color="primary">
                    <Edit />
                  </IconButton>
                ) : (
                  <Button
                    onClick={() => handleEdit(3)}
                    variant="outlined"
                    color="primary"
                    startIcon={<Edit />}
                  >
                    EDIT
                  </Button>
                )}
              </Tooltip>
            )}
        </Box>
  
  
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {members.map((member, index) => (
            <Grid item xs={12} key={index}>
              <Card sx={{ border: '1px solid #ccc', borderRadius: 2 }}>
                <CardContent>
                  {/* HEADER WITH NAME AND relationToFamilyHead */}
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
                      {member.relationToFamilyHead && (
                        <Chip 
                          size="small" 
                          label={member.relationToFamilyHead} 
                          color="primary" 
                          sx={{ mt: 0.5 }} 
                        />
                      )}
                      {Boolean(member.isPWD) && (
                        <Chip 
                          size="small" 
                          label='PWD' 
                          color="secondary" 
                          sx={{ mt: 0.5 }} 
                        />
                      )}
                      {Boolean(member.isSoloParent) && (
                        <Chip 
                          size="small" 
                          label='Solo Parent' 
                          color="secondary" 
                          sx={{ mt: 0.5 }} 
                        />
                      )}
                      {Boolean(member.isOSY) && (
                        <Chip 
                          size="small" 
                          label='Out of School Youth' 
                          color="secondary" 
                          sx={{ mt: 0.5 }} 
                        />
                      )}
                      {Boolean(member.inSchool) && (
                        <Chip 
                          size="small" 
                          label='In School' 
                          color="secondary" 
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
                          <Typography variant="subtitle2" color="text.secondary">Birthplace</Typography>
                          <Typography variant="body2">{member.birthplace || 'N/A'}</Typography>
                        </Grid>

                        <Grid item xs={12} sm={6} md={3}>
                          <Typography variant="subtitle2" color="text.secondary">Religion</Typography>
                          <Typography variant="body2">{member.religion || 'N/A'}</Typography>
                        </Grid>

                        <Grid item xs={12} sm={6} md={3}>
                          <Typography variant="subtitle2" color="text.secondary">Contact Number</Typography>
                          <Typography variant="body2">
                            {member.contactNumber ? `+63 ${member.contactNumber}` : 'N/A'}
                          </Typography>

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
                          <Typography variant="subtitle2" color="text.secondary">Education</Typography>
                          <Typography variant="body2">{member.educationalAttainment}</Typography>
                        </Grid>
  
                        <Grid item xs={12} sm={6} md={3}>
                          <Typography variant="subtitle2" color="text.secondary">Occupation</Typography>
                          <Typography variant="body2">{member.occupation || 'N/A'}</Typography>
                        </Grid>

                        <Grid item xs={12} sm={6} md={3}>
                          <Typography variant="subtitle2" color="text.secondary">Skills</Typography>
                          <Typography variant="body2">{member.skills || 'N/A'}</Typography>
                        </Grid>

                        <Grid item xs={12} sm={6} md={3}>
                          <Typography variant="subtitle2" color="text.secondary">Employment Type</Typography>
                          <Typography variant="body2">{member.employmentType || 'N/A'}</Typography>
                        </Grid>
                        
                        <Grid item xs={12} sm={6} md={3}>
                          <Typography variant="subtitle2" color="text.secondary">Monthly Income</Typography>
                          <Typography variant="body2">{`₱${formatters.currency(member.monthlyIncome)}`}</Typography>
                        </Grid>
                      </Grid>
                    </Box>

                    <Box sx={{ border: '1px solid #ccc', borderRadius: 2, padding: 2 }}>
                      <Box sx={{ display: 'flex', gap: 2}}>
                        <MoreHoriz color="primary"/>
                        <Typography variant="subtitle1" color="primary" sx={{ mb: 1, fontWeight: 'medium' }}>
                          OTHER INFORMATION
                        </Typography>
                      </Box>
                      
                      <Divider sx={{ mb: 2 }} />
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} md={3}>
                          <Typography variant="subtitle2" color="text.secondary">Philhealth Number</Typography>
                          <Typography variant="body2">{member.philhealthNumber || 'N/A'}</Typography>
                        </Grid>
  
                        <Grid item xs={12} sm={6} md={3}>
                          <Typography variant="subtitle2" color="text.secondary">Health Status</Typography>
                          <Typography variant="body2">{member.healthStatus || 'N/A'}</Typography>
                        </Grid>
                      </Grid>

                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} md={3}>
                          <Typography variant="subtitle2" color="text.secondary">Remarks</Typography>
                          <Typography variant="body2">
                            {member.remarks || member.outOfTown || member.isOFW ? (
                              `${member.remarks || ''}${member.outOfTown ? ', Out of Town' : ''}${member.isOFW ? ', OFW' : ''}`
                            ) : (
                              'N/A'
                            )}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Box>

                    {Boolean(member.isIpula) && (
                      <Box sx={{ border: '1px solid #ccc', borderRadius: 2, padding: 2 }}>
                        <Box sx={{ display: 'flex', gap: 2}}>
                          <Person color="primary"/>
                          <Typography variant="subtitle1" color="primary" sx={{ mb: 1, fontWeight: 'medium' }}>
                            IPULA/NON IVATAN
                          </Typography>
                        </Box>
                        
                        <Divider sx={{ mb: 2 }} />
                        <Grid container spacing={2}>
                          <Grid item xs={12} sm={6} md={3}>
                            <Typography variant="subtitle2" color="text.secondary">Details of Settlement</Typography>
                            <Typography variant="body2">{member.settlementDetails || 'N/A'}</Typography>
                          </Grid>
    
                          <Grid item xs={12} sm={6} md={3}>
                            <Typography variant="subtitle2" color="text.secondary">Ethnicity</Typography>
                            <Typography variant="body2">{member.ethnicity || 'N/A'}</Typography>
                          </Grid>

                          <Grid item xs={12} sm={6} md={3}>
                            <Typography variant="subtitle2" color="text.secondary">Place of Origin</Typography>
                            <Typography variant="body2">{member.placeOfOrigin || 'N/A'}</Typography>
                          </Grid>
                        </Grid>

                        {Boolean(member.isTransient) && (
                            <Grid container spacing={2}>
                              <Grid item xs={12} sm={6} md={3}>
                                <Typography variant="subtitle2" color="text.secondary">House Owner</Typography>
                                <Typography variant="body2">{member.houseOwner || 'N/A'}</Typography>
                              </Grid>
                              {member.isRegistered && (
                                <Grid item xs={12} sm={6} md={3}>
                                  <Typography variant="subtitle2" color="text.secondary">Date Registered</Typography>
                                  <Typography variant="body2">{formatters.date(member.transientDateRegistered) || 'N/A'}</Typography>
                                </Grid>
                              )}
                              
                            </Grid>
                          )}
                      </Box>
                    )}

                    {Boolean(member.isAffiliated) && (
                      <Box sx={{ border: '1px solid #ccc', borderRadius: 2, padding: 2 }}>
                        <Box sx={{ display: 'flex', gap: 2}}>
                          <Gavel color="primary"/>
                          <Typography variant="subtitle1" color="primary" sx={{ mb: 1, fontWeight: 'medium' }}>
                            GOVERNMENT AFFILIATION DETAILS
                          </Typography>
                        </Box>
                        
                        <Divider sx={{ mb: 2 }} />
                        <Grid container spacing={2}>
                          <Grid item xs={12} sm={6} md={3}>
                            <Typography variant="subtitle2" color="text.secondary">Name of Organization</Typography>
                            <Typography variant="body2">{member.organizationAffiliated || 'N/A'}</Typography>
                          </Grid>

                          <Grid item xs={12} sm={6} md={3}>
                            <Typography variant="subtitle2" color="text.secondary">Officer (Date Elected)</Typography>
                            <Typography variant="body2">{formatters.date(member.asOfficer) || 'N/A'}</Typography>
                          </Grid>

                          <Grid item xs={12} sm={6} md={3}>
                            <Typography variant="subtitle2" color="text.secondary">Member (Date Joined)</Typography>
                            <Typography variant="body2">{formatters.date(member.asMember) || 'N/A'}</Typography>
                          </Grid>
                        </Grid>
                      </Box>
                    )}
                  </Box>
  
                  
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Box>
  
      </Box>
  );
};