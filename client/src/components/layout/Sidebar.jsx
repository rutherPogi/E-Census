import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Collapse, 
         Divider, Box, Tooltip, Container, Avatar, Typography } from '@mui/material';
import { Home, Assignment, Badge, Map, Person, ExpandLess, ExpandMore, 
         Elderly, Accessible, EscalatorWarning, AccountCircle, Newspaper,
         Groups, Storage, Wc, Boy, Female, Hail} from '@mui/icons-material';

import logo from '../../assets/MSWDO-Logo.png'

import { useAuth } from '../../utils/auth/authContext';




const Logo = () => (
  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, alignItems: 'center', width: '100%' }}>
    <Box
      component="img"
      src={logo}
      alt="eCensus Logo"
      height={'54px'}
    />

    <Typography 
      variant="h2" 
      fontFamily={'Prosto One'} 
      fontSize={'28px'}
      color="#fff"
    > 
      <span style={{ color: '#FF5733' }}>e</span>-tbayat
    </Typography>
  </Box>
)

const Sidebar = ({ 
  drawerWidth = 240, 
  collapsedWidth = 60, 
  open, 
  onToggle, 
  onNavigation,
  isMobile
}) => {

  const [idGeneratorOpen, setIdGeneratorOpen] = useState(false);
  const [dataBankOpen, setDataBankOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const { userData } = useAuth();

  const position = userData.position;

  const showHome = position === 'Admin' || position === 'MSWDO';
  const showNews = position === 'Admin' || position === 'MSWDO';
  const showAccounts = position === 'Admin';
  const showDataBank = position === 'Admin' || position === 'MSWDO';
  const showPopulation = position === 'Admin' || position === 'MSWDO';
  const showIdGenerator = position === 'Admin' || position === 'MSWDO';
  const showHazardMap = position === 'Admin' || position === 'MSWDO';

  // Track the current selected path
  const [selectedPath, setSelectedPath] = useState(location.pathname);
  
  // Update selected path when location changes
  useEffect(() => {
    setSelectedPath(location.pathname);
  }, [location.pathname]);

  const handleIdGeneratorClick = () => {
    setIdGeneratorOpen(!idGeneratorOpen);
  };

  const handleDataBankClick = () => {
    setDataBankOpen(!dataBankOpen);
  };

  const handleItemClick = (href) => {
    setSelectedPath(href);
    onNavigation();
    navigate(href);
  };
  
  // Check if path is active
  const isActive = (path) => {
    return selectedPath === path || selectedPath.startsWith(path);
  };

  // Common styles for list items
  const listItemStyles = (active) => ({
    cursor: 'pointer',
    bgcolor: active ? '#3B3B58' : 'transparent',
    transition: 'background-color 0.3s',
    borderLeft: active ? '4px solid #9393F6' : '4px solid transparent',
    '&:hover': {
      bgcolor: active ? '#3B3B58' : 'rgba(59, 59, 88, 0.8)',
    },
    color: 'white'
  });

  const drawerContent = (
    <>
      <Container 
        sx={{ 
          display: 'flex',
          alignItems: 'center',
          justifyContent: open ? 'flex-start' : 'center',
          pt: 2,
          pb: 2,
          px: open ? 2 : 1
        }}
      >
        {open ? (
          <Logo/>
        ) : (
          <Avatar sx={{ bgcolor: '#1e88e5' }}>RS</Avatar>
        )}
      </Container>

      <Divider sx={{ mb: 2, bgcolor: 'white' }}/>

      <List sx={{ width: '100%', p: 0 }}>
        {/* Home */}
        {showHome && (
          <Tooltip title={!open ? "Home" : ""} placement="right">
            <ListItem 
              onClick={() => handleItemClick('/main/dashboard')}
              sx={listItemStyles(isActive('/main/dashboard'))}
            >
              <ListItemIcon sx={{ color: isActive('/main/dashboard') ? '#FF5733' : 'inherit', minWidth: open ? 56 : 'auto', ml: open ? 0 : 0.5 }}>
                <Home />
              </ListItemIcon>
              {open && <ListItemText primary="Home" />}
            </ListItem>
          </Tooltip>
        )}

        {/* News and Updates */}
        {showNews && (
          <Tooltip title={!open ? "News and Updates" : ""} placement="right">
            <ListItem 
              onClick={() => handleItemClick('/main/updates')}
              sx={listItemStyles(isActive('/main/updates'))}
            >
              <ListItemIcon sx={{ color: isActive('/main/updates') ? '#FF5733' : 'inherit', minWidth: open ? 56 : 'auto', ml: open ? 0 : 0.5 }}>
                <Newspaper />
              </ListItemIcon>
              {open && <ListItemText primary="News and Updates" />}
            </ListItem>
          </Tooltip>
        )}
        
        {/* Accounts - Only visible if not a Barangay Official */}
        {showAccounts && (
          <Tooltip title={!open ? "Accounts" : ""} placement="right">
            <ListItem 
              onClick={() => handleItemClick('/main/accounts')}
              sx={listItemStyles(isActive('/main/accounts'))}
            >
              <ListItemIcon sx={{ color: isActive('/main/accounts') ? '#FF5733' : 'inherit', minWidth: open ? 56 : 'auto', ml: open ? 0 : 0.5 }}>
                <AccountCircle />
              </ListItemIcon>
              {open && <ListItemText primary="Accounts" />}
            </ListItem>
          </Tooltip>
        )}

        {/* Census */}
        <Tooltip title={!open ? "Census" : ""} placement="right">
          <ListItem 
            onClick={() => handleItemClick('/main/survey')}
            sx={listItemStyles(isActive('/main/survey') || isActive('/main/manage-survey'))}
          >
            <ListItemIcon sx={{ color: isActive('/main/survey') || isActive('/main/manage-survey') ? '#FF5733' : 'inherit', minWidth: open ? 56 : 'auto', ml: open ? 0 : 0.5 }}>
              <Assignment />
            </ListItemIcon>
            {open && <ListItemText primary="Census" />}
          </ListItem>
        </Tooltip>

        {/* Data Bank */}
        {showDataBank && (
          <>
            <Tooltip title={!open ? "Data Bank" : ""} placement="right">
              <ListItem 
                onClick={open ? handleDataBankClick : onToggle}
                sx={listItemStyles(selectedPath.includes('/main/databank'))}
              >
                <ListItemIcon sx={{ color: selectedPath.includes('/main/databank') ? '#FF5733' : 'inherit', minWidth: open ? 56 : 'auto', ml: open ? 0 : 0.5 }}>
                  <Storage />
                </ListItemIcon>
                {open && (
                  <>
                    <ListItemText primary="Data Bank" />
                    {dataBankOpen ? <ExpandLess /> : <ExpandMore />}
                  </>
                )}
              </ListItem>
            </Tooltip>
            
            {/* Data Bank Submenu - only show when sidebar is open */}
            {open && (
              <Collapse in={dataBankOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {/* Segregation */}
                  <ListItem 
                    sx={{ 
                      pl: 4, 
                      ...listItemStyles(isActive('/main/databank/segregation'))
                    }} 
                    onClick={() => handleItemClick('/main/databank/segregation')}
                  >
                    <ListItemIcon sx={{ color: isActive('/main/databank/segregation') ? '#FF5733' : 'inherit' }}>
                      <Wc />
                    </ListItemIcon>
                    <ListItemText primary="Segregation" />
                  </ListItem>
                  
                  {/* Youth Masterlist */}
                  <ListItem 
                    sx={{ 
                      pl: 4, 
                      ...listItemStyles(isActive('/main/databank/youth-masterlist'))
                    }} 
                    onClick={() => handleItemClick('/main/databank/youth-masterlist')}
                  >
                    <ListItemIcon sx={{ color: isActive('/main/databank/youth-masterlist') ? '#FF5733' : 'inherit' }}>
                      <Boy />
                    </ListItemIcon>
                    <ListItemText primary="Youth Masterlist" />
                  </ListItem>

                  {/* OSY */}
                  <ListItem 
                    sx={{ 
                      pl: 4, 
                      ...listItemStyles(isActive('/main/databank/osy'))
                    }} 
                    onClick={() => handleItemClick('/main/databank/osy')}
                  >
                    <ListItemIcon sx={{ color: isActive('/main/databank/osy') ? '#FF5733' : 'inherit' }}>
                      <Boy />
                    </ListItemIcon>
                    <ListItemText primary="OSY" />
                  </ListItem>
                  
                  {/* Solo Parent */}
                  <ListItem 
                    sx={{ 
                      pl: 4, 
                      ...listItemStyles(isActive('/main/databank/solo-parent'))
                    }} 
                    onClick={() => handleItemClick('/main/databank/solo-parent')}
                  >
                    <ListItemIcon sx={{ color: isActive('/main/databank/solo-parent') ? '#FF5733' : 'inherit' }}>
                      <EscalatorWarning />
                    </ListItemIcon>
                    <ListItemText primary="Solo Parent" />
                  </ListItem>

                  {/* Women */}
                  <ListItem 
                    sx={{ 
                      pl: 4, 
                      ...listItemStyles(isActive('/main/databank/women'))
                    }} 
                    onClick={() => handleItemClick('/main/databank/women')}
                  >
                    <ListItemIcon sx={{ color: isActive('/main/databank/women') ? '#FF5733' : 'inherit' }}>
                      <Female />
                    </ListItemIcon>
                    <ListItemText primary="Women" />
                  </ListItem>

                  {/* PWD */}
                  <ListItem 
                    sx={{ 
                      pl: 4, 
                      ...listItemStyles(isActive('/main/databank/pwd'))
                    }} 
                    onClick={() => handleItemClick('/main/databank/pwd')}
                  >
                    <ListItemIcon sx={{ color: isActive('/main/databank/pwd') ? '#FF5733' : 'inherit' }}>
                      <Accessible />
                    </ListItemIcon>
                    <ListItemText primary="PWD" />
                  </ListItem>

                  {/* Non-Ivatan */}
                  <ListItem 
                    sx={{ 
                      pl: 4, 
                      ...listItemStyles(isActive('/main/databank/non-ivatan'))
                    }} 
                    onClick={() => handleItemClick('/main/databank/non-ivatan')}
                  >
                    <ListItemIcon sx={{ color: isActive('/main/databank/non-ivatan') ? '#FF5733' : 'inherit' }}>
                      <Hail />
                    </ListItemIcon>
                    <ListItemText primary="Non-Ivatan" />
                  </ListItem>
                </List>
              </Collapse>
            )}
          </>
        )}

        {/* Population */}
        {showPopulation && (
          <Tooltip title={!open ? "Population" : ""} placement="right">
            <ListItem 
              onClick={() => handleItemClick('/main/population')}
              sx={listItemStyles(isActive('/main/population'))}
            >
              <ListItemIcon sx={{ color: isActive('/main/population') ? '#FF5733' : 'inherit', minWidth: open ? 56 : 'auto', ml: open ? 0 : 0.5 }}>
                <Groups />
              </ListItemIcon>
              {open && <ListItemText primary="Population" />}
            </ListItem>
          </Tooltip>
        )}
        
        {/* ID Generator with submenu - Only visible if not a Barangay Official */}
        {showIdGenerator && (
          <>
            <Tooltip title={!open ? "ID Generator" : ""} placement="right">
              <ListItem 
                onClick={open ? handleIdGeneratorClick : onToggle}
                sx={listItemStyles(selectedPath.includes('/main/generate-id'))}
              >
                <ListItemIcon sx={{ color: selectedPath.includes('/main/generate-id') ? '#FF5733' : 'inherit', minWidth: open ? 56 : 'auto', ml: open ? 0 : 0.5 }}>
                  <Badge />
                </ListItemIcon>
                {open && (
                  <>
                    <ListItemText primary="ID Generator" />
                    {idGeneratorOpen ? <ExpandLess /> : <ExpandMore />}
                  </>
                )}
              </ListItem>
            </Tooltip>
            
            {/* ID Generator Submenu - only show when sidebar is open */}
            {open && (
              <Collapse in={idGeneratorOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {/* Solo Parent ID */}
                  <ListItem 
                    sx={{ 
                      pl: 4, 
                      ...listItemStyles(isActive('/main/generate-id/solo-parent'))
                    }} 
                    onClick={() => handleItemClick('/main/generate-id/solo-parent')}
                  >
                    <ListItemIcon sx={{ color: isActive('/main/generate-id/solo-parent') ? '#FF5733' : 'inherit' }}>
                      <EscalatorWarning />
                    </ListItemIcon>
                    <ListItemText primary="Solo Parent ID" />
                  </ListItem>
                  
                  {/* Senior Citizen ID */}
                  <ListItem 
                    sx={{ 
                      pl: 4, 
                      ...listItemStyles(isActive('/main/generate-id/senior-citizen'))
                    }} 
                    onClick={() => handleItemClick('/main/generate-id/senior-citizen')}
                  >
                    <ListItemIcon sx={{ color: isActive('/main/generate-id/senior-citizen') ? '#FF5733' : 'inherit' }}>
                      <Elderly />
                    </ListItemIcon>
                    <ListItemText primary="Senior Citizen ID" />
                  </ListItem>
                  
                  {/* PWD ID */}
                  <ListItem 
                    sx={{ 
                      pl: 4, 
                      ...listItemStyles(isActive('/main/generate-id/pwd'))
                    }} 
                    onClick={() => handleItemClick('/main/generate-id/pwd')}
                  >
                    <ListItemIcon sx={{ color: isActive('/main/generate-id/pwd') ? '#FF5733' : 'inherit' }}>
                      <Accessible />
                    </ListItemIcon>
                    <ListItemText primary="PWD ID" />
                  </ListItem>
                </List>
              </Collapse>
            )}
          </>
        )}

        {/* Hazard Map - Only visible if not a Barangay Official */}
        {showHazardMap && (
          <Tooltip title={!open ? "Hazard Map" : ""} placement="right">
            <ListItem 
              onClick={() => handleItemClick('/main/hazard-map')}
              sx={listItemStyles(isActive('/main/hazard-map'))}
            >
              <ListItemIcon sx={{ color: isActive('/main/hazard-map') ? '#FF5733' : 'inherit', minWidth: open ? 56 : 'auto', ml: open ? 0 : 0.5 }}>
                <Map />
              </ListItemIcon>
              {open && <ListItemText primary="Hazard Map" />}
            </ListItem>
          </Tooltip>
        )}

        {/* Profile */}
        <Tooltip title={!open ? "Profile" : ""} placement="right">
          <ListItem 
            onClick={() => handleItemClick('/main/profile')}
            sx={listItemStyles(isActive('/main/profile'))}
          >
            <ListItemIcon sx={{ color: isActive('/main/profile') ? '#FF5733' : 'inherit', minWidth: open ? 56 : 'auto', ml: open ? 0 : 0.5 }}>
              <Person />
            </ListItemIcon>
            {open && <ListItemText primary="Profile" />}
          </ListItem>
        </Tooltip>
      </List>
    </>
  );

  return isMobile ? (
    // Mobile drawer (temporary)
    <Drawer
      variant="temporary"
      open={open}
      onClose={onToggle}
      ModalProps={{
        keepMounted: true, // Better open performance on mobile
      }}
      sx={{
        display: { xs: 'block', sm: 'none' },
        '& .MuiDrawer-paper': { 
          boxSizing: 'border-box', 
          width: drawerWidth,
          bgcolor: '#2A2A3A',
          marginTop: '55px', // Add this line to create space for the topbar

          zIndex: (theme) => theme.zIndex.appBar - 1, // Place below the AppBar
        },
      }}
    >
      {drawerContent}
    </Drawer>
  ) : (
    // Desktop drawer (permanent)
    <Drawer
      variant="permanent"
      sx={{
        gridArea: 'sidebar',
        width: open ? drawerWidth : collapsedWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: open ? drawerWidth : collapsedWidth,
          boxSizing: 'border-box',
          position: 'static',
          height: '100%',
          overflowX: 'hidden',
          bgcolor: '#2A2A3A', // Light gray background
          transition: (theme) => theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        },
      }}
    >
      {drawerContent}
    </Drawer>
  );
};

export default Sidebar;