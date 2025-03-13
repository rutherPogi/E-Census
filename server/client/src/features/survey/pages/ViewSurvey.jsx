import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, 
         TableHead, TableRow, Box, Paper, Typography,
         useTheme, useMediaQuery, IconButton } from "@mui/material";
import { ArrowBack } from '@mui/icons-material';
import { get } from '../../utils/apiService';
import dayjs from 'dayjs';



export default function ViewSurvey() {

  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const SectionHeader = ({ title }) => (
    <Box 
      sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        mb: 2
      }}
    >
      <Typography 
        variant={isMobile ? "subtitle1" : "h6"} 
        component="h2"
        sx={{ fontWeight: 'bold' }}
      >
        {title}
      </Typography>
    </Box>
  );

  const params = useParams();
  const surveyID = params.viewId;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [surveyData, setSurveyData] = useState({});
  const [familyProfile, setFamilyProfile] = useState({});
  const [expenses, setExpenses] = useState([]);
  const [livestock, setLivestock] = useState([]);
  const [cropsPlanted, setCropsPlanted] = useState([]);
  const [fruitBearingTree, setFruitBearingTree] = useState([]);
  const [familyResources, setFamilyResources] = useState([]);
  const [appliancesOwn, setAppliancesOwn] = useState([]);
  const [amenities, setAmenities] = useState([]);
  const [serviceAvailed, setServiceAvailed] = useState([]);
  const [governmentAffiliation, setGovernmentAffiliation] = useState([]);
  const [nonIvatan, setNonIvatan] = useState([]);
    
  const fetchSurveyData = async () => {
    setLoading(true);

    try {
      const response = await get(`/surveys/view-survey/${surveyID}`, {
        params: { surveyID },
      });

      if (response) {
        setSurveyData(response.surveyData || {});
        setFamilyProfile(response.familyProfile || []);
        setExpenses(response.expenses || []);
        setLivestock(response.livestock || []);
        setCropsPlanted(response.cropsPlanted || []);
        setFruitBearingTree(response.fruitBearingTree || []);
        setFamilyResources(response.familyResources || []);
        setAppliancesOwn(response.appliancesOwn || []);
        setAmenities(response.amenities || []);
        setServiceAvailed(response.serviceAvailed || []);
        setGovernmentAffiliation(response.governmentAffiliation || []);
        setNonIvatan(response.nonIvatan || []);
      } else {
        throw new Error("Unexpected response format");
      }

      setLoading(false);

    } catch (err) {
      console.error('Error fetching data', err);
      setError('Failed to load survey data. Please try again later.');
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchSurveyData();
  }, [surveyID])

  if (loading) return <p>Loading survey data...</p>;
  if (error) return <p>{error}</p>;
  if (!surveyData || Object.keys(surveyData).length === 0) return <p>No survey data found.</p>;

  const formatters = {
    currency: value => !value ? '₱ 0' : `₱${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`,
    date: value => value ? dayjs(value).format('MM/DD/YYYY') : 'N/A',
    number: value => !value || value === '' ? '0' : value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  };

  const handleBackClick = () => {
    navigate(-1); // Navigate back to previous page (ManageSurvey)
  };

  return (
    <div className='responsive-container'>
      <div className='responsive-header'>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton
            onClick={handleBackClick}
            color="inherit"
            aria-label="back to surveys"
            sx={{ p: 0 }}
          >
            <ArrowBack />
          </IconButton>
          <span>Survey #{surveyID}</span>
        </Box>
      </div>
      <Box
        sx={{ 
          display: 'flex', 
          flexDirection: 'column',
          gap: '2em',
          backgroundColor: '#fff',
          padding: '1em'
      }}>
        <Box>
          <SectionHeader title="Survey Details" />
          <Typography>Respondent: {surveyData[0].respondent}</Typography>
          <Typography>Interviewer: {surveyData[0].interviewer}</Typography>
          <Typography>Barangay: {surveyData[0].barangay}</Typography>
          <Typography>Municipality: {surveyData[0].municipality}</Typography>
          <Typography>Total Monthly Income: {formatters.currency(surveyData[0].monthlyIncome)}</Typography>
          <Typography>Irregular Income: {formatters.currency(surveyData[0].irregularIncome)}</Typography>
          <Typography>Family Income: {formatters.currency(surveyData[0].familyIncome)}</Typography>
        </Box> 
        
        <Box>
          <SectionHeader title="Family Profile"/>
          <TableContainer 
            component={Paper}
            sx={{ 
              borderRadius: '5px',
              '& .MuiTable-root': {
                borderRadius: '5px',
                overflow: 'hidden'
              }
            }}>
            <Table aria-label="family members table">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Age</TableCell>
                  <TableCell>Birthdate</TableCell>
                  <TableCell>Civil Status</TableCell>
                  <TableCell>Relation</TableCell>
                  <TableCell>Occupation</TableCell>
                  <TableCell>Skills Training Attended</TableCell>
                  <TableCell>Employment Type</TableCell>
                  <TableCell>Philhealth Number</TableCell>
                  <TableCell>Monthly Income</TableCell>
                  <TableCell>Health Status</TableCell>
                  <TableCell>Remarks</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {familyProfile.map((member, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      {`${member.firstName} ${member.middleName} ${member.lastName} ${member.suffix}`}
                    </TableCell>
                    <TableCell>{member.age}</TableCell>
                    <TableCell>{formatters.date(member.birthdate)}</TableCell>
                    <TableCell>{member.civilStatus}</TableCell>
                    <TableCell>{member.relationToFamilyHead}</TableCell>
                    <TableCell>{member.occupation}</TableCell>
                    <TableCell>{member.skillsTraining}</TableCell>
                    <TableCell>{member.employmentType}</TableCell>
                    <TableCell>{member.philhealthNumber}</TableCell>
                    <TableCell>{formatters.currency(member.monthlyIncome)}</TableCell>
                    <TableCell>{member.healthStatus}</TableCell>
                    <TableCell>{member.remarks}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        <Box>
          <SectionHeader title="Expenses"/>
          <TableContainer 
            component={Paper} 
            sx={{ 
              borderRadius: '5px',
              '& .MuiTable-root': {
                borderRadius: '5px',
                overflow: 'hidden'
              }
            }}
          >
            <Table aria-label="Expenses Table">
              <TableHead>
                <TableRow>
                  <TableCell>Expenses</TableCell>
                  <TableCell>Expenses Type</TableCell>
                  <TableCell align="center">Amount</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {expenses.map((expense, index) => (
                  <TableRow key={index}>
                    <TableCell component="th">{expense.expenses}</TableCell>
                    <TableCell>{expense.expensesType}</TableCell>
                    <TableCell align='center'>{formatters.currency(expense.amount)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        <Box>
          <SectionHeader title="House Information" />
          <Typography>House Condition: {surveyData[0].houseCondition}</Typography>
          <Typography>House Structure: {surveyData[0].houseStructure}</Typography>
        </Box>

        <Box>
          <SectionHeader title="Water Access" />
          <Typography>Access to Water (Level III): {surveyData[0].waterAccess}</Typography>
          <Typography>Is your water potable: {surveyData[0].potableWater}</Typography>
          <Typography>Sources of Water: {surveyData[0].waterSources}</Typography>
        </Box>

        <Box>
          <SectionHeader title="Livestocks/Animals" pageNumber={10} />
          <TableContainer 
            component={Paper} 
            sx={{ 
              borderRadius: '5px',
              '& .MuiTable-root': {
                borderRadius: '5px',
                overflow: 'hidden'
              }
            }}
          >
            <Table aria-label="livestock table">
              <TableHead>
                <TableRow>
                  <TableCell>Livestock/Animals</TableCell>
                  <TableCell align="center">Number</TableCell>
                  <TableCell align="center">Own</TableCell>
                  <TableCell align="center">Dispersal</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {livestock.map((animal, index) => (
                  <TableRow key={index}>
                    <TableCell 
                      component="th" 
                      scope="row" 
                      sx={{ textTransform: 'capitalize' }}
                    >
                      {animal.livestock}
                    </TableCell>
                    <TableCell align="center">{formatters.number(animal.totalNumber)}</TableCell>
                    <TableCell align="center">{formatters.number(animal.own)}</TableCell>
                    <TableCell align="center">{formatters.number(animal.dispersal)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        <Box>
          <SectionHeader title="Farm Lots"/>
          <Typography>Cultivation Lots: {surveyData[0].cultivation}</Typography>
          <Typography>Pastureland: {surveyData[0].pastureland}</Typography>
          <Typography>Forestland: {surveyData[0].forestland}</Typography>
        </Box>

        <Box>
          <SectionHeader title="Crops Planted"/>
          <TableContainer 
              component={Paper}
              sx={{ 
                borderRadius: '5px',
                '& .MuiTable-root': {
                  borderRadius: '.5px',
                  overflow: 'hidden'
                }
              }}>
            <Table aria-label="Crops Planted Table">
              <TableHead>
                <TableRow>
                  <TableCell>Crops</TableCell>
                  <TableCell align='center'>No. of field (m<sup>2</sup>)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cropsPlanted.map((crop, index) => (
                    <TableRow key={index}>
                      <TableCell 
                        component="th" 
                        scope="row" 
                        sx={{ textTransform: 'capitalize' }}
                      >
                        {crop.crops}
                      </TableCell>
                      <TableCell align="center">{formatters.number(crop.size)}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        

        <Box>
          <SectionHeader title="Family Resources"/>
          <TableContainer 
              component={Paper}
              sx={{ 
                borderRadius: '5px',
                '& .MuiTable-root': {
                  borderRadius: '.5px',
                  overflow: 'hidden'
                }
              }}>
            <Table aria-label="Family Resources Table">
              <TableHead>
                <TableRow>
                  <TableCell>Resources</TableCell>
                  <TableCell align='center'>Amount</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {familyResources.map((resource, index) => (
                  <TableRow key={index}>
                    <TableCell component="th">{resource.resources}</TableCell>
                    <TableCell align='center'>{formatters.currency(resource.amount)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        <Box>
          <SectionHeader title="Fruit Bearing Tree" pageNumber={13} />
          <TableContainer 
              component={Paper}
              sx={{ 
                borderRadius: '5px',
                '& .MuiTable-root': {
                  borderRadius: '.5px',
                  overflow: 'hidden'
                }
              }}>
            <Table aria-label="Fruit Bearing Tree Table">
              <TableHead>
                <TableRow>
                  <TableCell>Fruit Bearing Tree</TableCell>
                  <TableCell align='center'>No. of tree</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {fruitBearingTree.map((tree, index) => (
                  <TableRow key={index}>
                    <TableCell component="th">{tree.tree}</TableCell>
                    <TableCell align='center'>{formatters.number(tree.totalNumber)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        <Box>
          <SectionHeader title="Appliances Own" pageNumber={15} />
          <TableContainer 
            component={Paper} 
            sx={{ 
              borderRadius: '5px',
              '& .MuiTable-root': {
                borderRadius: '5px',
                overflow: 'hidden'
              }
            }}
          >
            <Table aria-label="appliances owned table">
              <TableHead>
                <TableRow>
                  <TableCell>Appliance</TableCell>
                  <TableCell align="center">Quantity</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {appliancesOwn.map((appliance, index) => (
                  <TableRow key={index}>
                    <TableCell component="th">{appliance.appliances}</TableCell>
                    <TableCell align='center'>{formatters.number(appliance.totalAppliances)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        <Box>
          <SectionHeader title="Other Amenties" pageNumber={16} />
          <TableContainer 
            component={Paper} 
            sx={{ 
              borderRadius: '5px',
              '& .MuiTable-root': {
                borderRadius: '5px',
                overflow: 'hidden'
              }
            }}
          >
            <Table aria-label="Amenities Owned Table">
              <TableHead>
                <TableRow>
                  <TableCell>Amenities</TableCell>
                  <TableCell align="center">Quantity</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {amenities.map((amenity, index) => (
                  <TableRow key={index}>
                    <TableCell component="th">{amenity.amenities}</TableCell>
                    <TableCell align='center'>{formatters.number(amenity.totalAmenities)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        <Box>
          <SectionHeader title="Community Issues"/>
          <Typography>Community Issues: {surveyData[0].issues}</Typography>
        </Box>

        <Box>
          <SectionHeader title="Assitance/Service Availed"/>
          <TableContainer 
            component={Paper}
            sx={{ 
              borderRadius: '5px',
              '& .MuiTable-root': {
                borderRadius: '5px',
                overflow: 'hidden'
              }
            }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>NGO</TableCell>
                  <TableCell>Service/Assistance</TableCell>
                  <TableCell>Male Served</TableCell>
                  <TableCell>Female Served</TableCell>
                  <TableCell>Total Served</TableCell>
                  <TableCell>How the service help</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {serviceAvailed.map((service, index) => (
                  <TableRow key={index}>
                    <TableCell>{service.dateServiceAvailed ? dayjs(service.dateServiceAvailed).format('MM/DD/YYYY') : 'N/A'}</TableCell>
                    <TableCell>{service.ngoName}</TableCell>
                    <TableCell>{service.serviceAvailed}</TableCell>
                    <TableCell>{service.maleServed}</TableCell>
                    <TableCell>{service.femaleServed}</TableCell>
                    <TableCell>{service.totalServed}</TableCell>
                    <TableCell>{service.howServiceHelp}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        <Box>
          <SectionHeader title="Government Affiliation"/>
          <TableContainer 
            component={Paper}
            sx={{ 
              borderRadius: '5px',
              '& .MuiTable-root': {
                borderRadius: '5px',
                overflow: 'hidden'
              }
            }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>As Officer</TableCell>
                  <TableCell>As Member</TableCell>
                  <TableCell>Name of Organization</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {governmentAffiliation.map((affiliation, index) => (
                  <TableRow key={index}>
                    <TableCell>{affiliation.nameAffiliated}</TableCell>
                    <TableCell>{affiliation.asOfficer ? dayjs(affiliation.asOfficer).format('MM/DD/YYYY') : 'N/A'}</TableCell>
                    <TableCell>{affiliation.asMember ? dayjs(affiliation.asMember).format('MM/DD/YYYY') : 'N/A'}</TableCell>
                    <TableCell>{affiliation.organizationName}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        <Box>
          <SectionHeader title="IPULA/Non-Ivatan"/>
          <TableContainer 
            component={Paper}
            sx={{ 
              borderRadius: '5px',
              '& .MuiTable-root': {
                borderRadius: '5px',
                overflow: 'hidden'
              }
            }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Details of Settlement</TableCell>
                  <TableCell>Ethnicity</TableCell>
                  <TableCell>Place Origin</TableCell>
                  <TableCell>Transient?</TableCell>
                  <TableCell>Name of House Owner</TableCell>
                  <TableCell>Registered?</TableCell>
                  <TableCell>Date Registered</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {nonIvatan.map((ipula, index) => (
                  <TableRow key={index}>
                    <TableCell>{ipula.ipulaName}</TableCell>
                    <TableCell>{ipula.settlementDetails}</TableCell>
                    <TableCell>{ipula.ethnicity}</TableCell>
                    <TableCell>{ipula.placeOfOrigin}</TableCell>
                    <TableCell>{ipula.isTransient}</TableCell>
                    <TableCell>{ipula.houseOwner}</TableCell>
                    <TableCell>{ipula.isRegistered}</TableCell>
                    <TableCell>{ipula.dateRegistered ? dayjs(ipula.dateRegistered).format('MM/DD/YYYY') : 'N/A'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </div>
  );
}