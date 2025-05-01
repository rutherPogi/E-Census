import { 
  Box, 
  Typography, 
  Paper, 
  Chip, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  Collapse,
  IconButton
} from "@mui/material";
import { useState } from "react";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { formatters } from "../../../../utils/formatter";

// Row component to handle expandable details
const FamilyMemberRow = ({ member }) => {
  const [open, setOpen] = useState(false);

  // Format the full name
  const fullName = `${member.firstName} 
                    ${member.middleName 
                      ? member.middleName
                      : '' } 
                    ${member.lastName} 
                    ${member.suffix
                      ? member.suffix
                      : '' }`.trim();

  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            size="small"
            onClick={() => setOpen(!open)}
            aria-label="expand row"
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {fullName}
            <Chip size="small" label={member.relationToFamilyHead} color="primary" />
          </Box>
        </TableCell>
        <TableCell>{member.age || member.formattedAge}</TableCell>
        <TableCell>{member.sex}</TableCell>
        <TableCell>{member.civilStatus || 'N/A'}</TableCell>
        <TableCell>{member.occupation || 'N/A'}</TableCell>
        <TableCell>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {Boolean(member.isPWD) && <Chip size="small" label="PWD" color="info" />}
            {Boolean(member.outOfTown) && <Chip size="small" label="OFW" color="info" />}
            {Boolean(member.isOFW) && <Chip size="small" label="OFW" color="info" />}
            {Boolean(member.isSoloParent) && <Chip size="small" label="Solo Parent" color="info" />}
            {Boolean(member.inSchool) && <Chip size="small" label="In School" color="success" />}
            {Boolean(member.isOSY) && <Chip size="small" label="OSY" color="warning" />}
          </Box>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 2 }}>
              {/* Personal Information */}
              <Typography variant="subtitle1" color="primary" sx={{ fontWeight: 'medium', mt: 2, mb: 1 }}>
                Personal Information
              </Typography>
              <Table size="small" aria-label="personal information">
                <TableHead>
                  <TableRow>
                    <TableCell>Birthdate</TableCell>
                    <TableCell>Contact</TableCell>
                    <TableCell>Birthplace</TableCell>
                    <TableCell>Religion</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>{formatters.date(member.birthdate)}</TableCell>
                    <TableCell>{member.contactNumber || 'N/A'}</TableCell>
                    <TableCell>{member.birthplace || 'N/A'}</TableCell>
                    <TableCell>{member.religion || 'N/A'}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>

              {/* Professional Information */}
              <Typography variant="subtitle1" color="primary" sx={{ fontWeight: 'medium', mt: 2, mb: 1 }}>
                Professional Information
              </Typography>
              <Table size="small" aria-label="professional information">
                <TableHead>
                  <TableRow>
                    <TableCell>Education</TableCell>
                    <TableCell>Skills</TableCell>
                    <TableCell>Employment Type</TableCell>
                    <TableCell>Monthly Income</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>{member.educationalAttainment || 'N/A'}</TableCell>
                    <TableCell>{member.skills || 'N/A'}</TableCell>
                    <TableCell>{member.employmentType || 'N/A'}</TableCell>
                    <TableCell>{
                      member.monthlyIncome 
                        ? formatters.currency 
                          ? formatters.currency(member.monthlyIncome) 
                          : member.monthlyIncome 
                        : 'N/A'
                    }</TableCell>
                  </TableRow>
                </TableBody>
              </Table>

              {/* Health Information */}
              <Typography variant="subtitle1" color="primary" sx={{ fontWeight: 'medium', mt: 2, mb: 1 }}>
                Health Information
              </Typography>
              <Table size="small" aria-label="health information">
                <TableHead>
                  <TableRow>
                    <TableCell>Philhealth No.</TableCell>
                    <TableCell>Health Status</TableCell>
                    <TableCell>Remarks</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>{member.philhealthNumber || 'N/A'}</TableCell>
                    <TableCell>{member.healthStatus || 'N/A'}</TableCell>
                    <TableCell>{member.remarks || 'N/A'}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>

              {/* IPULA Details (conditional) */}
              {Boolean(member.isIpula) && (
                <>
                  <Typography variant="subtitle1" color="primary" sx={{ fontWeight: 'medium', mt: 2, mb: 1 }}>
                    IPULA Details
                  </Typography>
                  <Table size="small" aria-label="ipula details">
                    <TableHead>
                      <TableRow>
                        <TableCell>Details of Settlement</TableCell>
                        <TableCell>Ethnicity</TableCell>
                        <TableCell>Place of Origin</TableCell>
                        <TableCell>House Owner</TableCell>
                        <TableCell>Date Registered</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell>{member.settlementDetails || 'N/A'}</TableCell>
                        <TableCell>{member.ethnicity || 'N/A'}</TableCell>
                        <TableCell>{member.placeOfOrigin || 'N/A'}</TableCell>
                        <TableCell>{member.houseOwner || 'N/A'}</TableCell>
                        <TableCell>
                          {Boolean(member.isRegistered) 
                            ? (formatters.date 
                              ? formatters.date(member.transientDateRegistered) 
                              : member.transientDateRegistered) 
                            : "Not registered"}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </>
              )}

              {/* Affiliation Details (conditional) */}
              {Boolean(member.isAffiliated) && (
                <>
                  <Typography variant="subtitle1" color="primary" sx={{ fontWeight: 'medium', mt: 2, mb: 1 }}>
                    Affiliation Details
                  </Typography>
                  <Table size="small" aria-label="affiliation details">
                    <TableHead>
                      <TableRow>
                        <TableCell>As Officer</TableCell>
                        <TableCell>As Member</TableCell>
                        <TableCell>Organization Affiliated</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell>{formatters.date(member.asOfficer) || 'N/A'}</TableCell>
                        <TableCell>{formatters.date(member.asMember) || 'N/A'}</TableCell>
                        <TableCell>{member.organizationAffiliated || 'N/A'}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </>
              )}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export const FamilyProfileSection = ({ members }) => {

  if (!members) {
    return (
      <Box sx={{ textAlign: 'center', py: 3 }}>
        <Typography color="text.secondary">No Family members added</Typography>
      </Box>
    );
  }
  
  return (
    <Paper elevation={1} sx={{ mb: 4, borderRadius: '12px', overflow: 'hidden' }}>
      <Typography variant="h6" sx={{ p: 2, borderBottom: '1px solid rgba(224, 224, 224, 1)' }}>
        Family Members
      </Typography>
      <TableContainer>
        <Table aria-label="collapsible family members table">
          <TableHead>
            <TableRow>
              <TableCell width="50px" />
              <TableCell>Name</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>Sex</TableCell>
              <TableCell>Civil Status</TableCell>
              <TableCell>Occupation</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {members.map((member, index) => (
              <FamilyMemberRow key={index} member={member} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};