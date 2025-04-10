import { useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { Outlet } from 'react-router-dom';
import { useMediaQuery, Box } from '@mui/material';
import Topbar from './Topbar';
import Sidebar from './Sidebar';

// Set the width of the sidebar
const DRAWER_WIDTH = 240;
const COLLAPSED_WIDTH = 65;

// Styled component for the layout container
const LayoutContainer = styled(Box)(({ theme }) => ({
  display: 'grid',
  height: '100vh',
}));

// Styled component for the main content area
const MainContent = styled('div')(({ theme }) => ({
  gridArea: 'main',
  padding: theme.spacing(2), // Default padding
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
  overflow: 'auto',
}));

const Layout = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleSidebarToggle = () => {
    if (isMobile) {
      setMobileOpen(!mobileOpen);
    } else {
      setSidebarOpen(!sidebarOpen);
    }
  };

  const handleNavigation = () => {
    if (isMobile) {
      setMobileOpen(false);
    }
  };

  const gridStyles = isMobile 
    ? {
        gridTemplateAreas: `
          'topbar'
          'main'
        `,
        gridTemplateRows: 'auto 1fr',
        gridTemplateColumns: '1fr',
      }
    : {
        gridTemplateAreas: `
          'sidebar topbar'
          'sidebar main'
        `,
        gridTemplateRows: 'auto 1fr',
        gridTemplateColumns: `${sidebarOpen ? DRAWER_WIDTH : COLLAPSED_WIDTH}px 1fr`,
        transition: theme.transitions.create(['grid-template-columns'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      };

  return (
    <LayoutContainer sx = {gridStyles}>
      <Topbar 
        onMenuClick={handleSidebarToggle} 
        isMobile={isMobile}
        sidebarOpen={sidebarOpen}
      />
      <Sidebar 
        drawerWidth={DRAWER_WIDTH} 
        collapsedWidth={COLLAPSED_WIDTH}
        open={isMobile ? mobileOpen : sidebarOpen}
        onToggle={handleSidebarToggle}
        onNavigation={handleNavigation}
        isMobile={isMobile}
      />
      <MainContent>
        <Outlet />
      </MainContent>
    </LayoutContainer>
  );
};

export default Layout;