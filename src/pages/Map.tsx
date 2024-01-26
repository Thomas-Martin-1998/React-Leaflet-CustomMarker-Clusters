import ".././App.css";
import * as React from "react";
import * as L from "leaflet";
import {
  MapContainer,
  TileLayer,
  Polyline,
  Popup,
  Marker,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Spinner from "react-bootstrap/Spinner";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";

//Extra markers
import "leaflet-extra-markers/dist/css/leaflet.extra-markers.min.css";
import "leaflet/dist/leaflet.css";
import "leaflet-extra-markers";
import "@fortawesome/fontawesome-free/css/all.css";

//Clustering
import MarkerClusterGroup from "react-leaflet-cluster";

let DefaultIcon = L.icon({
  iconUrl: require("../assets/marker-icon.png"),
  shadowUrl: require("../assets/marker-shadow.png"),
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

var productMarker = L.ExtraMarkers.icon({
  icon: "fa-tags",
  markerColor: "red",
  shape: "penta",
  prefix: "fa",
});

var batchMarker = L.ExtraMarkers.icon({
  icon: "fa-box",
  markerColor: "yellow",
  shape: "square",
  prefix: "fa",
});

var shipmentMarker = L.ExtraMarkers.icon({
  icon: "fa-truck-fast",
  markerColor: "blue",
  shape: "square",
  prefix: "fa",
});

var fieldMarker = L.ExtraMarkers.icon({
  icon: "fa-tractor",
  markerColor: "green",
  shape: "penta",
  prefix: "fa",
});

var testMarker = L.ExtraMarkers.icon({
  icon: "fa-coffee",
  markerColor: "red",
  shape: "square",
  prefix: "fa",
});

type markerItem = {
  coords: number[];
  type: string;
};

function markerType(marker: markerItem) {
  if (marker.type == "New Product") return productMarker;
  if (marker.type == "New Batch") return batchMarker;
  if (marker.type == "New Transaction") return shipmentMarker;
  if (marker.type == "Field") return fieldMarker;
  return DefaultIcon;
}

function Map() {
  const [spinnerState, setSpinner] = useState(false);
  const [markers, setMarkers] = useState<markerItem[]>([
    { coords: [54.249, -5.91], type: "Field" },
    { coords: [54.242, -5.884], type: "New Product" },
    { coords: [54.242, -5.884], type: "New Batch" },
    { coords: [54.2965, -5.83624], type: "New Transaction" },
    { coords: [54.2965, -5.83624], type: "New Batch" },
    { coords: [54.588277030996665, -5.895309948184754], type: "New Transaction" },
    { coords: [54.588277030996665, -5.895309948184754], type: "New Batch" },

  ]);
  const [polyline, setPolyline] = useState<[L.LatLngTuple[]]>([[]]);

  markers.forEach(marker => {
    //Multi polyline
    polyline[0].push([marker.coords[0], marker.coords[1]])
  });

  return (
    <div>
      {spinnerState && (
        <div className="center">
          <p className="loading">Loading</p>
          <Spinner animation="grow" />
        </div>
      )}

      {!spinnerState && (
        <MapContainer
          center={[markers[0].coords[0], markers[0].coords[1]]}
          zoom={12}
          maxZoom={16}
          scrollWheelZoom={true}
        >
          <MarkerClusterGroup chunkedLoading>
            {markers.map((marker) => (
              <Marker
                position={[marker.coords[0], marker.coords[1]]}
                icon={markerType(marker)}
              >
                <Popup>{marker.type}</Popup>
              </Marker>
            ))}
          </MarkerClusterGroup>

          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Polyline pathOptions={{ color: "green" }} positions={polyline} />
        </MapContainer>
      )}
    </div>
  );
}

export default Map;
