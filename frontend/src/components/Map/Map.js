import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import { Icon } from "@iconify/react";
import locationIcon from "@iconify/icons-mdi/map-marker";

import "./Map.css";
import Geocode from "react-geocode";

Geocode.setApiKey("AIzaSyAIzrgRfxiIcZhQe3Qf5rIIRx6exhZPwwE");
Geocode.setLanguage("en");
Geocode.setRegion("us");

const LocationPin = ({ text }) => (
  <div className="pin">
    <Icon icon={locationIcon} className="pin-icon" />
    <p className="pin-text">{text}</p>
  </div>
);

class Map extends Component {
  constructor(props) {
    super(props);
    this.showMarkers = this.showMarkers.bind(this);
  }

  componentDidMount() {
    Geocode.fromAddress("95128").then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        console.log("-------Location-------------");
        console.log(lat, lng);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  showMarkers(map, maps) {
    console.log("show markers");
    if (this.props && this.props.locationList) {
      console.log(this.props.locationList);
      let markers = [];
      for (let i = 0; i < this.props.locationList.length; i++) {
        console.log("markerssssssss");
        let pos = {
          lat: this.props.locationList[i].lat,
          lng: this.props.locationList[i].lng,
          address: this.props.locationList[i].restaurant_name,
        };
        console.log(pos);
        let m1 = new maps.Marker({
          position: pos,
          map,
          title: this.props.locationList[i].restaurant_name,
          label: this.props.locationList[i].restaurant_name,
          optimized: false,
        });
        markers.push(m1);
        this.forceUpdate();
      }
      this.setState({
        markers: markers,
      });
    }
  }

  render() {
    console.log("render map");
    console.log(this.props);
    let pinTags = null;
    /*if (this.props && this.props.locationList) {
      console.log(this.props.locationList);
      pinTags = this.props.locationList.map((coordinates) => {
        return (
          <LocationPin
            lat={coordinates.lat}
            lng={coordinates.lng}
            text={coordinates.restaurant_name}
          />
        );
      });
    }*/
    return (
      <div className="map">
        <div className="google-map">
          <GoogleMapReact
            bootstrapURLKeys={{
              key: "AIzaSyAIzrgRfxiIcZhQe3Qf5rIIRx6exhZPwwE",
            }}
            defaultCenter={this.props.center}
            defaultZoom={this.props.zoomLevel}
            options={{
              //scrollwheel: false,
              zoomControl: false,
              //disableDoubleClickZoom: true,
              gestureHandling: "cooperative",
            }}
            onGoogleApiLoaded={({ map, maps }) => this.showMarkers(map, maps)}
          >
            {pinTags}
          </GoogleMapReact>
        </div>
      </div>
    );
  }
}

export default Map;
