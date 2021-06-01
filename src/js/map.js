import 'ol/ol.css';
import Feature from 'ol/Feature';
import Map from 'ol/Map';
import Point from 'ol/geom/Point';
import View from 'ol/View';
import { Circle as CircleStyle, Stroke, Style } from 'ol/style';
import { OSM, Vector as VectorSource } from 'ol/source';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import { easeOut } from 'ol/easing';
import { fromLonLat } from 'ol/proj';
import { getVectorContext } from 'ol/render';
import { unByKey } from 'ol/Observable';
import { fetchSpaceStationData } from './spaceStationData';

const tileLayer = new TileLayer({
  source: new OSM({
    wrapX: false,
  }),
});

const map = new Map({
  layers: [tileLayer],
  target: 'map',
  view: new View({
    zoom: 3,
    minZoom: 2,
    multiWorld: true,
  }),
});

//Set the initial position of space station when map loads
fetchSpaceStationData().then((stationData) => {
  map
    .getView()
    .setCenter(fromLonLat([stationData.longitude, stationData.latitude]));
});

const source = new VectorSource({
  wrapX: false,
});
const vector = new VectorLayer({
  source: source,
});
map.addLayer(vector);

export function setPositionOfSpaceStation(x, y) {
  const geom = new Point(fromLonLat([x, y]));
  const feature = new Feature(geom);
  source.addFeature(feature);
}

const duration = 3000;
function flash(feature) {
  const start = new Date().getTime();
  const listenerKey = tileLayer.on('postrender', animate);

  function animate(event) {
    const vectorContext = getVectorContext(event);
    const frameState = event.frameState;
    const flashGeom = feature.getGeometry().clone();
    const elapsed = frameState.time - start;
    const elapsedRatio = elapsed / duration;
    // radius will be 5 at start and 30 at end.
    const radius = easeOut(elapsedRatio) * 25 + 5;
    const opacity = easeOut(1 - elapsedRatio);

    const style = new Style({
      image: new CircleStyle({
        radius: radius,
        stroke: new Stroke({
          color: 'rgba(255, 0, 0, ' + opacity + ')',
          width: 0.25 + opacity,
        }),
      }),
    });

    vectorContext.setStyle(style);
    vectorContext.drawGeometry(flashGeom);
    if (elapsed > duration) {
      unByKey(listenerKey);
      return;
    }
    // tell OpenLayers to continue postrender animation
    map.render();
  }
}

source.on('addfeature', function (e) {
  flash(e.feature);
});
