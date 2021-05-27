import 'regenerator-runtime/runtime';
import { fetchSpaceStationData } from './spaceStationData';
import { setPositionOfSpaceStation } from './map';
import { gaugeElement, setGaugeValue } from './gauge';
import { updateUiData } from './ui';
import '@fortawesome/fontawesome-free/css/solid.css';
import '@fortawesome/fontawesome-free/css/fontawesome.css';

function refreshSpaceStationData() {
  fetchSpaceStationData().then((stationData) => {
    setPositionOfSpaceStation(stationData.longitude, stationData.latitude);
    setGaugeValue(gaugeElement, calculateVelocity(stationData));
    updateUiData(stationData);
  });
}

function calculateVelocity(stationData) {
  console.log(stationData);
  //Set a theoretical max velocity to 30000 km/h so we can calculate current speed / max velocity for the gauge
  const maxVelocity = 30000;
  const currentSpeed = stationData.velocity.toFixed(0);
  const diff = currentSpeed / maxVelocity;
  console.log(diff);
  return diff;
}

//Initial data from API
refreshSpaceStationData();

//Refresh the data from API every 2 sec. 2 Seconds because of limit from API
setInterval(refreshSpaceStationData, 2000);
