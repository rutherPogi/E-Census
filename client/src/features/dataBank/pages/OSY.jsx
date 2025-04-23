import { Container, Paper, Tabs, Tab, Box } from "@mui/material";
import { useState } from "react";
import { Boy } from "@mui/icons-material";

import OSYTable from "../components/tables/OSYTable";
import DatabankHeader from "../components/DataBankHeader";

import { exportMasterlistData } from '../utils/exportData';
import { get } from '../../../utils/api/apiService'; 



export default function OSY() {

  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleExport = async () => {
    try {
      const [staRosa, staMaria, staLucia, sanRafael, yawran, raele] = await Promise.all([
        get('/databank/youth/osy/Sta. Rosa'),
        get('/databank/youth/osy/Sta. Maria'),
        get('/databank/youth/osy/Sta. Lucia'),
        get('/databank/youth/osy/San Rafael'),
        get('/databank/youth/osy/Yawran'),
        get('/databank/youth/osy/Raele')
      ]);

      exportMasterlistData('OutOfSchoolYouth', staRosa, staMaria, staLucia, sanRafael, yawran, raele);

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
      <DatabankHeader title={'Out of School Youth (15-24 years old)'} Icon={Boy} onExport={handleExport}/>
      
      <Tabs value={tabValue} onChange={handleTabChange} aria-label="manage tabs">
        <Tab label="Sta. Rosa" />
        <Tab label="Sta. Maria" />
        <Tab label="Sta. Lucia" />
        <Tab label="San Rafael" />
        <Tab label="Yawran" />
        <Tab label="Raele" />
      </Tabs>

      <Box>
        {tabValue === 0 && <OSYTable barangay={'Sta. Rosa'}/>}
        {tabValue === 1 && <OSYTable barangay={'Sta. Maria'}/>}
        {tabValue === 2 && <OSYTable barangay={'Sta. Lucia'}/>}
        {tabValue === 3 && <OSYTable barangay={'San Rafael'}/>}
        {tabValue === 4 && <OSYTable barangay={'Yawran'}/>}
        {tabValue === 5 && <OSYTable barangay={'Raele'}/>}
      </Box>
    </Container>
  );
}
