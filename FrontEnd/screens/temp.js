import React from 'react';
import { 
  StyleSheet,
  Text, 
  View, 
  ScrollView, 
  Image, 
  TouchableOpacity, 
  Dimensions
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Carousel from 'react-native-snap-carousel';
import * as Permissions from 'expo-permissions';

export default class Map extends React.Component {

  state = {
    latitude: null,
    longitude: null,
    coordinates: [
      { name: '1', latitude: 21.0229681, longitude: 105.7880946, price: 12, image: require('./../assets/1.jpg') },
      { name: '2', latitude: 21.025861, longitude: 105.7859065, price: 9, image: require('./../assets/2.jpg') },
      { name: '3', latitude: 21.025861, longitude: 105.7914062, price: 122, image: require('./../assets/3.jpg') },
      { name: '4', latitude: 21.0236077, longitude: 105.7906916, price: 100, image: require('./../assets/4.jpg') },
      { name: '5', latitude: 21.0203213, longitude: 105.7917173, price: 500, image: require('./../assets/5.jpg') },
      { name: '6', latitude: 21.0182008, longitude: 105.7839059, price: 2000, image: require('./../assets/6.jpg') },
    ]
  }

  async componentDidMount() {
    const { status } = await Permissions.getAsync(Permissions.LOCATION);

    if (status !== 'granted') {
      const response = await Permissions.askAsync(Permissions.LOCATION)
    }

    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => this.setState({ latitude, longitude }),
      (error) => console.log(error)
    );
  }

  renderCarouselItem = ({item}) => {
    <View style={styles.cardStyle}>
      <Text>{item.name}</Text>
      <Image style={styles.image} source={item.image} />
    </View>
  }


  render() {
    const { latitude, longitude } = this.state;
    if (latitude) {
      return (
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.backBtnWrapper}
            onPress={() => this.props.navigation.goBack()}
          >
            <View style={styles.backBtn}>
              <Text style={styles.backBtnText}>Back</Text>
            </View>
          </TouchableOpacity>
          <MapView
            showsUserLocation
            style={styles.container}
            initialRegion={{
              longitude,
              latitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01
            }}
          >
            {this.state.coordinates.map(marker => (
              <Marker
                key={marker.name}
                coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
              >
                <TouchableOpacity>
                  <View style={styles.markerWeapper}>
                    <Text style={styles.markerText}>
                      ~{marker.price}$
                </Text>
                  </View>
                </TouchableOpacity>
              </Marker>
            ))}
          </MapView>
          <Carousel
            ref={(c) => { this._carousel = c; }}
            data={this.state.coordinates}
            renderItem={this.renderCarouselItem}
            sliderWidth={Dimensions.get('window').width}
            itemWidth={100}
          />
        </View>
      );
    };
    return (
      <View style={styles.container}>
        <Text>u need permiss</Text>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // ...StyleSheet.absoluteFillObject
  },
  markerWeapper: {
    paddingLeft: 4,
    paddingRight: 4,
    height: 30,
    backgroundColor: "#006994",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 7
  },
  markerText: {
    color: "#f6fcff",
    fontWeight: "600"
  },
  backBtnWrapper: {
    top: 90,
    left: 10,
    zIndex: 100,
    marginTop: -40
  },
  backBtn: {
    width: 100,
    height: 40,
    borderRadius: 50,
    backgroundColor: "#7066f6",
    alignItems: "center",
    justifyContent: "center",
  },
  backBtnText: {
    color: "#fafafa",
    fontSize: 24,
    fontWeight: "500"
  },
  image: {
    width: 50,
    height: 50
  },
  cardStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
    width: 202,
    height: 327
  }
});
