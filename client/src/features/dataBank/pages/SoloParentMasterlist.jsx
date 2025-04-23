import { Container, Paper, Tabs, Tab, Box } from "@mui/material";
import { useState } from "react";
import { Accessible } from "@mui/icons-material";

import DatabankHeader from "../components/DataBankHeader";
import SoloParentTable from "../components/tables/SoloParentTable";

import { exportMasterlistData } from '../utils/exportData';
import { get } from '../../../utils/api/apiService'; 




export default function SoloParentMasterlist() {

  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleExport = async () => {
    try {
      const [staRosa, staMaria, staLucia, sanRafael, yawran, raele] = await Promise.all([
        get('/databank/solo-parent/Sta. Rosa'),
        get('/databank/solo-parent/Sta. Maria'),
        get('/databank/solo-parent/Sta. Lucia'),
        get('/databank/solo-parent/San Rafael'),
        get('/databank/solo-parent/Yawran'),
        get('/databank/solo-parent/Raele')
      ]);

      exportMasterlistData('SoloParentMasterlist', staRosa, staMaria, staLucia, sanRafael, yawran, raele);

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
      <DatabankHeader title={'Masterlist of Solo Parent'} Icon={Accessible} onExport={handleExport}/>
      
      <Tabs value={tabValue} onChange={handleTabChange} aria-label="manage tabs">
        <Tab label="Sta. Rosa" />
        <Tab label="Sta. Maria" />
        <Tab label="Sta. Lucia" />
        <Tab label="San Rafael" />
        <Tab label="Yawran" />
        <Tab label="Raele" />
      </Tabs>

      <Box>
        {tabValue === 0 && <SoloParentTable barangay={'Sta. Rosa'}/>}
        {tabValue === 1 && <SoloParentTable barangay={'Sta. Maria'}/>}
        {tabValue === 2 && <SoloParentTable barangay={'Sta. Lucia'}/>}
        {tabValue === 3 && <SoloParentTable barangay={'San Rafael'}/>}
        {tabValue === 4 && <SoloParentTable barangay={'Yawran'}/>}
        {tabValue === 5 && <SoloParentTable barangay={'Raele'}/>}
      </Box>
    </Container>
  );
}
