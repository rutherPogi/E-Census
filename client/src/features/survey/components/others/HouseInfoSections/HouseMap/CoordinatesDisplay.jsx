// CoordinatesDisplay.jsx
import { Typography } from '@mui/material';

export default function CoordinatesDisplay({ position }) {
  if (!position) return null;
  
  return (
    <Typography variant="body2" sx={{ mb: 2 }}>
      {/*Selected coordinates: {position[0].toFixed(6)}, {position[1].toFixed(6)}*/}
    </Typography>
  );
}