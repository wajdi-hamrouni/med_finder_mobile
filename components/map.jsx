import React from 'react';
import MapView , { AnimatedRegion } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions,  Button, } from 'react-native';
import * as Permissions from 'expo-permissions'

export default class Map extends React.Component {
 
  constructor(props){
    super(props)
    this.state = {
        latitude:null,
        longitude:null,
        mapType: 'standard'
    }
    this.getCurrentLocation = this.getCurrentLocation.bind(this)
    // this.switchMapType = this.switchMapType.bind(this); 
  }
  //   switchMapType = () => {
  //   console.log('changing');
  //   this.setState({ mapType: this.state.mapType === 'satellite' ? 'standard' : 'satellite' });
  // }
    
     getCurrentLocation = async () =>  {
      const {status} = await Permissions.getAsync(Permissions.LOCATION )
    
      if(status !== 'granted'){
          const response = await Permissions.askAsync(Permissions.LOCATION)
     }
      navigator.geolocation.getCurrentPosition(
      
          position => {
          let region = {
                  latitude: parseFloat(position.coords.latitude),
                  longitude: parseFloat(position.coords.longitude),
                  latitudeDelta:1.1,
                  longitudeDelta: 1.1,
              };
             this.setState({
                  initialRegion: region
              });
          },
          error => console.log(error),
          {
              enableHighAccuracy: true,
              timeout: 20000,
              maximumAge: 1000
          }
      );
  }
  async componentDidMount() {
  this.getCurrentLocation()
}
  goToInitialLocation() {
    let initialRegion = Object.assign({}, this.state.initialRegion);
    initialRegion["latitudeDelta"] = 0.005;
    initialRegion["longitudeDelta"] = 0.005;
    this.mapView.animateToRegion(initialRegion, 2000);
  }
    
  render() {
    return (
   
    <MapView
            style={styles.mapStyle}
            region={this.state.mapRegion}
            followUserLocation={true}
            ref={ref => (this.mapView = ref)}
            zoomEnabled={true}
            showsUserLocation={true}
           onMapReady={this.goToInitialRegion}
            initialRegion={this.state.initialRegion}>
</MapView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapStyle: {
    width: 350,
    // Dimensions.get('window').width,
    height: 500,
    marginBottom:5
  },
});
