import { Link } from 'react-router-dom';
import { Box, useMediaQuery, useTheme } from '@mui/material';

const ActionButton = ({ icon, label, color, onClick, to, showLabelOnMobile = true  }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const buttonContent = (
    <>
      {icon}
      <span>{isMobile && showLabelOnMobile ? label : ''}</span>
    </>
  );
  
  const style = { 
    color,
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    cursor: 'pointer'
  };
  
  if (to) {
    return <Link to={to} style={style}>{buttonContent}</Link>;
  }
  
  return <Box onClick={onClick} sx={style}>{buttonContent}</Box>;
};

export default ActionButton;