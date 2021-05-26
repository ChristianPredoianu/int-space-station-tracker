import 'regenerator-runtime/runtime';
import { fetchSpaceStationData } from './spaceStationData';
import { positionOfSpaceStation } from './map';
import { gaugeElement, setGaugeValue } from './gauge';

function refreshSpaceStationData() {
  fetchSpaceStationData().then((stationData) => {
    setGaugeValue(gaugeElement, calculateVelocity(stationData));
    positionOfSpaceStation(stationData.longitude, stationData.latitude);
  });
}

function calculateVelocity(stationData) {
  const maxVelocity = 30000;
  const currentSpeed = stationData.velocity.toFixed(0);
  const diff = currentSpeed / maxVelocity;
  return diff;
}

refreshSpaceStationData();

/* setInterval(refreshSpaceStationData, 2000); */
