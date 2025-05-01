import { useNavigate } from 'react-router-dom';

import AddID from '../../components/AddID';
import soloParentID from '../../../../assets/soloParentID.svg';
import '../../../../styles/components/style';


export default function AddSoloParentID() {

  const navigate = useNavigate();

  return(
    <AddID
      idType = 'SOLO PARENT'
      onClick = {() => navigate(`/main/generate-id/solo-parent/find-person`)}
      id = 'soloParent'
      idImage = {soloParentID}
      title = {`Solo Parent`}
    />
  )
}