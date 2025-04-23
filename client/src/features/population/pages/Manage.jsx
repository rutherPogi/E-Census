import { useState } from "react";
import { Groups } from "@mui/icons-material";
import { Container, Paper, Box, Typography, Button, Divider } from "@mui/material";

import ManagePopulation from "../components/ManagePopulation";

import { exportPopulation } from '../utils/exportData';
import { get } from '../../../utils/api/apiService'; 



export default function Manage() {

  const handleExport = async () => {
    try {
      const { population } = await get('/population/get');
      exportPopulation(population);
    } catch (err) {
      console.error("Export failed:", err);
      alert("Something went wrong during export!");
    }
  };

 

  return (
    <Container
      component={Paper}
      sx={{
        borderRadius: 2,
        backgroundColor: "#fff",
        p: 5,
        display: "flex",
        flexDirection: "column",
        gap: 3,
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center'}}>
          <Groups/>
          <Typography variant='h5' fontWeight={'bold'}>
            POPULATION
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button 
            variant="contained" 
            color="success"
            onClick={handleExport} 
            sx={{ fontSize: '0.75rem' }}
          >
            EXPORT EXCEL
          </Button>
        </Box>
      </Box>
      <Divider/>
      <ManagePopulation/>
    </Container>
  );
}
