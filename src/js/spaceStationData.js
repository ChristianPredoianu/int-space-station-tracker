export async function fetchSpaceStationData() {
  const response = await fetch(
    'https://api.wheretheiss.at/v1/satellites/25544'
  );
  const intStationData = await response.json();
  return intStationData;
}
