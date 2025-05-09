import { useState, useEffect } from 'react';
import { 
  Typography, 
  Container, 
  Grid, 
  Paper, 
  Avatar, 
  Box, 
  Divider, 
  Skeleton,
  useTheme,
  useMediaQuery,
  CircularProgress,
  Alert
} from '@mui/material';
import { 
  Assignment, 
  Accessibility, 
  Person, 
  AccessibilityNew, 
  Group, 
  EmojiPeople, 
  DashboardCustomize,
  TrendingUp
} from '@mui/icons-material';
import { get } from '../../utils/api/apiService';
import { BarChart } from '@mui/x-charts/BarChart';

export default function Dashboard() {
  // State hooks - keep these first and in the same order
  const [barangayData, setBarangayData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [values, setValues] = useState({
    surveys: '',
    population: '',
    male: '',
    female: '',
    pwd: '',
    soloParent: '',
    youth: ''
  });

  // Theme hooks - after all useState hooks
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  
  const philippineDate = new Date().toLocaleString('en-PH', {
    timeZone: 'Asia/Manila',
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });

  const stats = [
    { title: 'Total Surveys', value: values.surveys, icon: <Assignment />, color: '#3f51b5' },
    { title: 'Total Population', value: values.population, icon: <EmojiPeople />, color: '#0277bd' },
    { title: 'Total Men', value: values.male, icon: <Person />, color: '#2196f3' },
    { title: 'Total Women', value: values.female, icon: <EmojiPeople />, color: '#e91e63' },
    { title: 'Total PWD', value: values.pwd, icon: <Accessibility />, color: '#ff9800' },
    { title: 'Total Solo Parent', value: values.soloParent, icon: <AccessibilityNew />, color: '#9c27b0' },
    { title: 'Total Youth', value: values.youth, icon: <Group />, color: '#4caf50' }
  ];

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // Fetch both data sets concurrently
        const [statsResponse, barangayResponse] = await Promise.all([
          get('/dashboard/getTotal'),
          get('/dashboard/barangayStats')
        ]);
        
        setValues({
          surveys: statsResponse.totalSurveys,
          population: statsResponse.totalPopulation,
          male: statsResponse.totalMale,
          female: statsResponse.totalFemale,
          pwd: statsResponse.totalPWD,
          soloParent: statsResponse.totalSoloParent,
          youth: statsResponse.totalYouth
        });
        
        setBarangayData(barangayResponse);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('Failed to load dashboard data. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Calculate chart dimensions based on screen size
  const getChartDimensions = () => {
    if (isMobile) {
      return { width: 350, height: 300 };
    } else if (isTablet) {
      return { width: 550, height: 350 };
    } else {
      return { width: 800, height: 400 };
    }
  };

  const { width, height } = getChartDimensions();

  // Render loading skeleton for stats cards
  const renderStatsSkeleton = () => (
    <Grid container spacing={3}>
      {[...Array(7)].map((_, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <Paper elevation={3} sx={{ p: 3, display: 'flex', alignItems: 'center' }}>
            <Skeleton variant="circular" width={40} height={40} sx={{ mr: 2 }} />
            <Box>
              <Skeleton variant="text" width={80} height={32} />
              <Skeleton variant="text" width={120} height={20} />
            </Box>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );

  // Render loading skeleton for chart
  const renderChartSkeleton = () => (
    <Box mt={4} display="flex" flexDirection="column" alignItems="center">
      <Typography variant="h6" sx={{ mb: 2 }}>
        <Skeleton width={200} />
      </Typography>
      <Skeleton variant="rectangular" width={width} height={height} />
    </Box>
  );

  return (
    <Container 
      component={Paper}
      sx={{ 
        borderRadius: 2, 
        backgroundColor: "#fff", 
        p: { xs: 2, sm: 3, md: 5 }, 
        display: 'flex', 
        flexDirection: 'column', 
        gap: 3,
        width: '100%',
        maxWidth: '100%',
        mb: 4
      }}
    > 
      {/* Header */}
      <Box sx={{ 
        display: 'flex', 
        flexDirection: { xs: 'column', sm: 'row' },
        justifyContent: 'space-between',
        gap: { xs: 2, sm: 0 }
      }}>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
            <DashboardCustomize />
          </Avatar>
          <Typography variant='h5' fontWeight={'bold'}>
            DASHBOARD
          </Typography>
        </Box>
        <Box sx={{ 
          textAlign: { xs: 'left', sm: 'right' },
          mt: { xs: 1, sm: 0 }
        }}>
          <Typography 
            variant="subtitle1"
            sx={{ 
              fontSize: { xs: '0.8rem', sm: '1rem' },
              fontWeight: 'bold'
            }}
          >
            Philippine Standard Time
          </Typography>
          <Typography 
            variant="subtitle1"
            sx={{ 
              fontSize: { xs: '0.8rem', sm: '1rem' }
            }}
          >
            {philippineDate}
          </Typography>
        </Box>
      </Box>

      <Divider />
      
      {/* Error display */}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      
      {/* Loading indicator or stats cards */}
      {isLoading ? renderStatsSkeleton() : (
        <Grid container spacing={3}>
          {stats.map((stat, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Paper 
                elevation={3} 
                sx={{ 
                  height: '100%', 
                  display: 'flex',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 6
                  }
                }}
              >
                <Box p={3} display="flex" alignItems="center" width="100%">
                  <Avatar 
                    sx={{ 
                      bgcolor: stat.color, 
                      mr: 2,
                      width: 48,
                      height: 48
                    }}
                  >
                    {stat.icon}
                  </Avatar>
                  <Box>
                    <Typography variant="h6" fontWeight="bold">{stat.value}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      {stat.title}
                    </Typography>
                  </Box>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Barangay Data Chart */}
      <Box mt={4}>
        <Paper 
          elevation={3} 
          sx={{ 
            p: 3, 
            borderRadius: 2,
            overflow: 'hidden'
          }}
        >
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            mb: 3,
            gap: 2
          }}>
            <Avatar sx={{ bgcolor: theme.palette.info.main }}>
              <TrendingUp />
            </Avatar>
            <Typography variant="h6" fontWeight="bold">
              Barangay Statistics
            </Typography>
          </Box>
          
          {isLoading ? renderChartSkeleton() : (
            barangayData.length > 0 ? (
              <Box 
                sx={{ 
                  width: '100%', 
                  overflowX: 'auto',
                  display: 'flex',
                  justifyContent: 'center'
                }}
              >
                <BarChart
                  xAxis={[{ 
                    scaleType: 'band', 
                    data: barangayData.map(row => row.barangay),
                    tickLabelStyle: {
                      angle: isMobile ? 45 : 0,
                      textAnchor: isMobile ? 'start' : 'middle',
                      fontSize: isMobile ? 10 : 12
                    }
                  }]}
                  series={[
                    {
                      data: barangayData.map(row => row.Surveys),
                      label: 'Survey',
                      color: '#2196f3'
                    },
                    {
                      data: barangayData.map(row => row.Population),
                      label: 'Population',
                      color: '#f44336'
                    },
                    {
                      data: barangayData.map(row => row.Men),
                      label: 'Men',
                      color: '#4caf50'
                    },
                    {
                      data: barangayData.map(row => row.Women),
                      label: 'Women',
                      color: '#e91e63'
                    },
                    {
                      data: barangayData.map(row => row.PWD),
                      label: 'PWD',
                      color: '#ff9800'
                    },
                    {
                      data: barangayData.map(row => row.SoloParent),
                      label: 'Solo Parent',
                      color: '#9c27b0'
                    },
                    {
                      data: barangayData.map(row => row.Youth),
                      label: 'Youth',
                      color: '#009688'
                    }
                  ]}
                  width={width}
                  height={height}
                  slotProps={{
                    legend: {
                      direction: isMobile ? 'column' : 'row',
                      position: { 
                        vertical: 'bottom', 
                        horizontal: 'center' 
                      },
                      padding: {
                        top: 20,
                        bottom: 0,
                        left: 0,
                        right: 0
                      }
                    }
                  }}
                />
              </Box>
            ) : (
              <Box 
                sx={{ 
                  display: 'flex', 
                  justifyContent: 'center', 
                  alignItems: 'center',
                  height: 200
                }}
              >
                <Typography variant="body1" color="textSecondary">
                  No barangay data available
                </Typography>
              </Box>
            )
          )}
        </Paper>
      </Box>
    </Container>
  );
}