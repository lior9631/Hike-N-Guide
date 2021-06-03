import React, { Component } from 'react';
import {
  Map, InfoWindow, Marker, GoogleApiWrapper,
} from 'google-maps-react';
import history from '../history';
import mapStyle from '../style/mapStyle'
export class MapContainer extends Component {
    state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      lat: 0,
      lng: 0,
      fromAdd: false,
    };

    componentDidMount() {
      if (history.location.pathname === '/trail/add') {
        this.setState({ fromAdd: true });
      }
    }


    onMarkerClick = (props, marker, e) => this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
    });

    updateLatLng=(lat, lng) => {
      // this.setState({lat,lng})
      this.props.updateLatLng(lat, lng);
    }

    onMapClicked = (props, map, clickEvent) => {
      if (!this.state.fromAdd) return;
      const lat = clickEvent.latLng.lat();
      const lng = clickEvent.latLng.lng();

      this.updateLatLng(lat, lng);


      if (this.state.showingInfoWindow) {
        this.setState({
          showingInfoWindow: false,
          activeMarker: null,
        });
      }
    };

    updateLatLng = (lat, lng) => {
      // this.setState({lat,lng})
      this.props.updateLatLng(lat, lng);
    }

    onMapClicked = (props, map, clickEvent) => {
      if (!this.state.fromAdd) return;
      const lat = clickEvent.latLng.lat();
      const lng = clickEvent.latLng.lng();

      this.updateLatLng(lat, lng);
      this.setState({ lat, lng });

      if (this.state.showingInfoWindow) {
        this.setState({
          showingInfoWindow: false,
          activeMarker: null,
        });
      }
    };


    render() {
      const style = {
        position: 'relative',
        width: '100%',
        height: '100%',
      };
      return (
            <Map
                styles={ mapStyle }
                zoom ={10}
                google={ this.props.google }
                initialCenter={ this.props.location ? {
                  lat: this.props.location.lat,
                  lng: this.props.location.lng,
                } : {
                  lat: 41,
                  lng: 24,
                } }
                onClick={ this.onMapClicked }
            >
                {this.state.lat

                  ? <Marker onClick={ this.onMarkerClick }
                        position={ { lat: this.state.lat, lng: this.state.lng } }
                        name={ 'Current location' } /> : <Marker onClick={ this.onMarkerClick } name={ 'Current location' } />}

                <InfoWindow
                    marker={ this.state.activeMarker }
                    visible={ this.state.showingInfoWindow }>
                    <div>
                        <h1>{this.state.selectedPlace.name}</h1>
                    </div>
                </InfoWindow>
            </Map>
      );
    }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyDw7z6CMCiRYFpFmT4LIk7JWqyqvSWm1R8'),
})(MapContainer);
