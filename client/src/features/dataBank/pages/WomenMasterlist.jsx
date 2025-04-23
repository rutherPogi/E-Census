import { Container, Paper, Tabs, Tab, Box } from "@mui/material";
import { useState } from "react";
import { Female } from "@mui/icons-material";

import WomenMasterListTable from "../components/tables/WomenMasterlistTable";
import DatabankHeader from "../components/DataBankHeader";

import { exportMasterlistData } from '../utils/exportData';
import { get } from '../../../utils/api/apiService'; 



export default function WomenMasterlist() {

  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleExport = async () => {
    try {
      const [staRosa, staMaria, staLucia, sanRafael, yawran, raele] = await Promise.all([
        get('/databank/women/masterlist/Sta. Rosa'),
        get('/databank/women/masterlist/Sta. Maria'),
        get('/databank/women/masterlist/Sta. Lucia'),
        get('/databank/women/masterlist/San Rafael'),
        get('/databank/women/masterlist/Yawran'),
        get('/databank/women/masterlist/Raele')
      ]);

      exportMasterlistData('WomenMasterlist', staRosa, staMaria, staLucia, sanRafael, yawran, raele);

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
      <DatabankHeader title={'Masterlist of Women (18-59 years old)'} Icon={Female} onExport={handleExport}/>
      
      <Tabs value={tabValue} onChange={handleTabChange} aria-label="manage tabs">
        <Tab label="Sta. Rosa" />
        <Tab label="Sta. Maria" />
        <Tab label="Sta. Lucia" />
        <Tab label="San Rafael" />
        <Tab label="Yawran" />
        <Tab label="Raele" />
      </Tabs>

      <Box>
        {tabValue === 0 && <WomenMasterListTable barangay={'Sta. Rosa'}/>}
        {tabValue === 1 && <WomenMasterListTable barangay={'Sta. Maria'}/>}
        {tabValue === 2 && <WomenMasterListTable barangay={'Sta. Lucia'}/>}
        {tabValue === 3 && <WomenMasterListTable barangay={'San Rafael'}/>}
        {tabValue === 4 && <WomenMasterListTable barangay={'Yawran'}/>}
        {tabValue === 5 && <WomenMasterListTable barangay={'Raele'}/>}    
      </Box>
    </Container>
  );
}
