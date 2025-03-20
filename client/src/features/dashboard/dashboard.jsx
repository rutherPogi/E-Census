import { useState, useEffect } from 'react';
import { Typography, Container, Grid, Paper, Avatar, Box } from '@mui/material';
import { Assignment, FamilyRestroom, Accessible, EscalatorWarning, Elderly, House, EmojiPeople } from '@mui/icons-material'
import { get } from '../../utils/api/apiService';
import { useAuth } from '../../utils/auth/authContext'



export default function Dashboard() {

  const { userData } = useAuth();

  const [values, setValues] = useState({
    surveys: '',
    families: '',
    population: '',
    pwdApplications: '',
    soloParentApplications: '',
    seniorCitizenApplications: '',
    registeredHouse: ''
  })

  const stats = [
    { title: 'Total Surveys', value: values.surveys, icon: <Assignment />, color: '#3f51b5' },
    { title: 'Total Families', value: values.families, icon: <FamilyRestroom />, color: '#f44336' },
    { title: 'Total Population', value: values.population, icon: <EmojiPeople />, color: '#0277bd' },
    { title: 'Registered House', value: values.registeredHouse, icon: <House />, color: '#ec407a' },
    { title: 'PWD ID Aplications', value: values.pwdApplications, icon: <Accessible />, color: '#4caf50' },
    { title: 'Solo Parent ID Applications', value: values.soloParentApplications, icon: <EscalatorWarning />, color: '#ff9800' },
    { title: 'Senior Citizen ID Applications', value: values.seniorCitizenApplications, icon: <Elderly />, color: '#009688' }
  ];

  useEffect(() => {
      const getTotalNumber = async () => {
        try {
          const response = await get('/dashboard/getTotal');
          setValues({
            surveys: response.TotalSurvey,
            families: response.TotalFamilies,
            population: response.TotalPopulation,
            pwdApplications: response.TotalPWDApplication,
            soloParentApplications: response.TotalSPApplication,
            seniorCitizenApplications: response.TotalSCApplication,
            registeredHouse: response.HouseRegistered,
          });
        } catch (err) {
          console.error('Error fetching posts:', err);
          setError(err.message);
        }
      };
  
      getTotalNumber();
    }, []);

  return (
    <Container style={{ display: 'flex' }}> 
      {/* Header */}
         
      {/* Stats Cards */}
      <Grid container spacing={3}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Paper elevation={3} style={{ height: '100%', display:'flex'}}>
              <Box p={3} display="flex" alignItems="center">
                <Avatar style={{ backgroundColor: stat.color, marginRight: 16 }}>
                  {stat.icon}
                </Avatar>
                <Box>
                  <Typography variant="h6">{stat.value}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {stat.title}
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}