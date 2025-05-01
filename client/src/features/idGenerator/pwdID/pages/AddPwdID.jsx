import { useNavigate } from 'react-router-dom';

import AddID from '../../components/AddID';
import pwdID from '../../../../assets/pwdID.svg'
import '../../../../styles/components/style';



export default function AddPwdID() {

  const navigate = useNavigate();

  return(
    <AddID
      idType = 'PWD'
      onClick={() => navigate(`/main/generate-id/pwd/find-person`)}
      id = 'pwd'
      idImage = {pwdID}
      title = {`Person with Disability`}
    />
  )
}