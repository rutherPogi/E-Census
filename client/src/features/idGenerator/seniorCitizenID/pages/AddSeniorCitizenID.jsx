import { useNavigate } from 'react-router-dom';

import AddID from '../../components/AddID';
import seniorCitizenID from '../../../../assets/seniorCitizenID.svg'
import '../../../../styles/components/style';



export default function AddSeniorCitizenID() {

  const navigate = useNavigate();

  return(
    <AddID
      idType = 'SENIOR CITIZEN'
      onClick = {() => navigate(`/main/generate-id/senior-citizen/find-person`)}
      id = 'seniorCitizen'
      idImage = {seniorCitizenID}
      title = {'Senior Citizen'}
    />
  )
}