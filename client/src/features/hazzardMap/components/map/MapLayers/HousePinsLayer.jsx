import { Marker } from "react-leaflet"
import { HOUSE_PIN_COLOR } from "../../../utils/constant"
import createColoredIcon  from "../../../hooks/createColoredIcon"


const HousePinsLayer = ({
  houseData,
  onHouseClick
}) => {

  return (
    <>  
      {houseData.houseInfo.map((house) => (
        <Marker 
          key={house.houseInfoID} 
          position={[parseFloat(house.latitude), parseFloat(house.longitude)]}
          icon={createColoredIcon(HOUSE_PIN_COLOR)}
          eventHandlers={{
            click: () => onHouseClick(house)
          }}
        />
      ))}
    </>
  )
}

export default HousePinsLayer