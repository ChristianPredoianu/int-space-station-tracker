export function updateUiData(stationData) {
  document.querySelector(
    '.altitude'
  ).innerText = `${stationData.altitude.toFixed(3)} Km`;

  document.querySelector('.time').innerText = ` ${formatTimestamp(
    stationData.timestamp
  )} `;
}

function formatTimestamp(time) {
  let timeStamp = time;
  const date = new Date(timeStamp * 1000);
  let hours = `${
    date.getHours() < 10 ? `0${date.getHours()}` : `${date.getHours()}`
  }`;
  let minutes = `${
    date.getMinutes() < 10 ? `0${date.getMinutes()}` : `${date.getMinutes()}`
  }`;
  let seconds = `${
    date.getSeconds() < 10 ? `0${date.getSeconds()}` : `${date.getSeconds()}`
  }`;

  const formattedTime = `${hours}:${minutes.substr(-2)}:${seconds.substr(-2)}`;

  return formattedTime;
}
