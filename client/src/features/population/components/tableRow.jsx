const renderRow = (survey, index) => (
  <TableRow key={survey.surveyID || index}>
    <TableCell>{survey.surveyID}</TableCell>
    <TableCell>{survey.respondent}</TableCell>
    <TableCell>{survey.interviewer}</TableCell>
    <TableCell>
      {survey.surveyDate ? dayjs(survey.surveyDate).format('MM/DD/YYYY') : 'N/A'}
    </TableCell>
    <TableCell>
      <Box sx={{ 
        display: 'flex', 
        flexDirection: isMobile ? 'column' : 'row',
        gap: 2
      }}>
        <Tooltip title="View Survey Details">
          <Box>
            <ActionButton 
              icon={<Visibility />}
              label="View"
              color="#0d47a1"
              to={`view/${survey.surveyID}`}
            />
          </Box>
        </Tooltip>
        <Tooltip title="Edit Survey">
          <Box>
            <ActionButton 
              icon={<Edit />}
              label="Edit"
              color="#ff9800"
              to={`edit/${survey.surveyID}`}
            />
          </Box>
        </Tooltip>
        <Tooltip title="Delete Survey">
          <Box>
            <ActionButton 
              icon={<Delete />}
              label="Delete"
              color="#f44336"
              onClick={() => openDeleteDialog(survey)}
            />
          </Box>
        </Tooltip>
      </Box>
    </TableCell>
  </TableRow>
);

export default RenderRow;