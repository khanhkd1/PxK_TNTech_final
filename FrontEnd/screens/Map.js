import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  Modal,
  TouchableHighlight
} from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { Ionicons, FontAwesome5, Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
import Constant from 'expo-constants';
import Carousel from 'react-native-snap-carousel';
import * as Permissions from 'expo-permissions';
import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component';


import constants from './../Constants';


const width = constants.windowWidth;
const height = constants.windowHeight;

export default class Map extends React.Component {

  state = {
    sorry: false,
    latitude: null,
    longitude: null,
    currentLatitude: null,
    currentLongitude: null,
    userInfo: null,
    coordinates: [],
    tableHeadVIE: ['', 'Thực tế', 'Dự Đoán'],
    tableTitleVIE: ['Diện Tích (m2)', 'Số Phòng Ngủ', 'Số Phòng Tắm', 'Giá(tr)/M2'],
    tableHeadENG: ['', 'Reality', 'Guess'],
    tableTitleENG: ['Acreage (m2)', 'Bedroom', 'Bathroom', 'Price(tr)/M2'],
    tableData: [
      ['-', '-'],
      ['-', '-'],
      ['-', '-'],
      ['-', '-']
    ]
  }


  async componentDidMount() {
    const { status } = await Permissions.getAsync(Permissions.LOCATION);

    if (status !== 'granted') {
      const response = await Permissions.askAsync(Permissions.LOCATION)
    }

    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => this.setState({ currentLatitude: latitude, currentLongitude: longitude }),
      (error) => console.log(error)
    );

    const { acreage, investor, numBedroom, numBathroom, furniture, directionHome, directionBalcony, farCenter, district, pricePredict } = this.props.route.params;
    let address = district;
    // let stringParams = `?${acreage ? `apartments.acreage=${acreage}&&` : ""}${investor ? `apartments.investor=${investor}&&` : ""}${numBedroom ? `apartments.numBedroom=${numBedroom}&&` : ""}${numBathroom ? `apartments.numBathroom=${numBathroom}&&` : ""}${furniture ? `apartments.furniture=${furniture}&&` : ""}${directionHome ? `apartments.directionHome=${directionHome}&&` : ""}${directionBalcony ? `apartments.directionBalcony=${directionBalcony}&&` : ""}${farCenter ? `apartments.farCenter=${farCenter}&&` : ""}${address ? `apartments.address=${address}&&` : ""}`;

    let stringParams = `?${acreage ? `apartments.acreage=${acreage}&&` : ""}${investor ? `apartments.investor=${investor}&&` : ""}${furniture ? `apartments.furniture=${furniture}&&` : ""}${directionHome ? `apartments.directionHome=${directionHome}&&` : ""}${directionBalcony ? `apartments.directionBalcony=${directionBalcony}&&` : ""}${farCenter ? `apartments.farCenter=${farCenter}&&` : ""}${address ? `apartments.address=${address}&&` : ""}`;
    // console.log(stringParams);
    await fetch(`https://pxk-api.herokuapp.com/apartment${stringParams}`)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        if (responseJson.length == 0) {
          this.setState({
            sorry: true
          })
        } else this.setState({
          coordinates: responseJson,
          userInfo: {
            pricePredict,
            acreage,
            numBathroom,
            numBedroom
          },
          // tableData: [
          //   [`${responseJson.acreage ? `${responseJson.acreage}` : '-'}`, `${acreage ? `${acreage}` : '-'}`],
          //   [`${responseJson.numBedroom ? `${responseJson.numBedroom}` : '-'}`, `${numBedroom ? `${numBedroom}` : '-'}`],
          //   [`${responseJson.numBathroom ? `${responseJson.numBathroom}` : '-'}`, `${numBathroom ? `${numBathroom}` : '-'}`],
          //   [`${responseJson.pricePerM ? `${this.formatNum(pricePerM)}` : '-'}`, `${pricePredict ? `${this.formatNum(pricePredict)}` : '-'}`],
          // ]
        })
      })
      .catch((err) => console.log("errors: " + err))
  }

  formatNum = (num) => {
    return Math.round(num * 100 + Number.EPSILON) / 100
  }

  onCurrent = () => {
    let { currentLatitude, currentLongitude } = this.state;
    this._map.animateToRegion({
      longitude: currentLongitude,
      latitude: currentLatitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01
    })
  }

  onMarkerPressed = (location, index) => {
    this._map.animateToRegion({
      longitude: location.longitude,
      latitude: location.latitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01
    })

    this._carousel.snapToItem(index)
  }

  onCarouselItemChange = (index) => {
    let location = this.state.coordinates[index];
    this._map.animateToRegion({
      longitude: location.longitude,
      latitude: location.latitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01
    })
  }

  renderCarouselItem = ({ item }) => {
    if (item && item.images) {
      return (
        <View style={styles.cardStyle}>
          <View style={styles.cardTitleWrapper1}>
            <Text style={styles.cardTitle}>{item.address}</Text>
          </View>
          <View style={styles.cardTitleWrapper2}>
            {item.images[0] !== undefined ? <Image style={styles.cardImage} source={{ uri: item.images[0] }} /> :
              <MaterialCommunityIcons style={styles.IconHomeDefault} name="home-city-outline" size={100} color="white" />
            }
          </View>
        </View>
      );
    } else return (
      <View style={styles.cardStyle}>
        <View style={styles.cardTitleWrapper1}>
          <Text style={styles.cardTitle}>{item.address}</Text>
          <MaterialCommunityIcons style={styles.IconHomeDefault} name="home-city-outline" size={100} color="white" />
        </View>
      </View>
    );
  }
  render() {
    const { coordinates, sorry, userInfo } = this.state;
    const state = this.state;
    const { language } = this.props.route.params;
    if (sorry) {
      return (
        <Modal
          animationType="slide"
          transparent={true}
          visible={sorry}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalViewWrapper}>
              <View style={styles.modalView}>
                <Entypo name="traffic-cone" size={100} color="#F67066" />
                <Text style={styles.modalViewText1}>Oops! Something Went Wrong</Text>
                <Text style={styles.modalViewText2}>{language === "VIE" ? "Có lẽ chúng tôi chưa tìm thấy căn hộ phù hợp với yêu cầu của bạn..." : "Perhaps we have not found an apartment suitable for your needs ..."}</Text>
                <TouchableHighlight
                  style={styles.modalViewBtn}
                  onPress={() => {
                    this.setState({ sorry: !sorry })
                    this.props.navigation.goBack();
                  }}>
                  <Text style={styles.modalViewText3}>{language === "VIE" ? "Thử Lại" : "Retry"}</Text>
                </TouchableHighlight>
              </View>
            </View>
          </View>
        </Modal>
      );
    } else if (coordinates.length >= 1) {
      return (
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => this.props.navigation.goBack()}
          >
            <Ionicons name="ios-arrow-back" size={30} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.currentLocationBtn}
            onPress={() => this.onCurrent()}
          >
            <FontAwesome5 name="location-arrow" size={30} color="#F67066" />
          </TouchableOpacity>
          <MapView
            showsUserLocation
            style={styles.map}
            ref={map => this._map = map}
            initialRegion={{
              longitude: coordinates[0].longitude,
              latitude: coordinates[0].latitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01
            }}
          >
            {this.state.coordinates.map((marker, index) => (
              <Marker
                key={Math.random(1000000)}
                coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
                onPress={() => this.onMarkerPressed(marker, index)}
              >
                <TouchableOpacity>
                  <View style={styles.markerWeapper}>
                    <Text style={styles.markerText}>
                      ~{marker.pricePerM} {language === "VIE" ? "triệu VNĐ" : "million VND"}
                    </Text>
                  </View>
                </TouchableOpacity>
                <Callout style={styles.callOutWrapper}>
                  <View style={styles.containerBox}>
                    <Table borderStyle={{ borderWidth: 1 }}>
                      <Row data={language === "VIE" ? state.tableHeadVIE : state.tableHeadENG} widthArr={[100, 80, 80]} style={styles.head} textStyle={styles.text} />
                      <TableWrapper style={styles.wrapper}>
                        <Col data={language === "VIE" ? state.tableTitleVIE : state.tableTitleENG} style={styles.title} width={100} heightArr={[30, 30, 30, 30]} textStyle={styles.text} />
                        <Rows data={[
                          [`${marker?.acreage ? `${marker?.acreage}` : '-'}`, `${userInfo?.acreage ? `${userInfo?.acreage}` : '-'}`],
                          [`${marker?.numBedroom ? `${marker?.numBedroom}` : '-'}`, `${userInfo?.numBedroom ? `${userInfo?.numBedroom}` : '-'}`],
                          [`${marker?.numBathroom ? `${marker?.numBathroom}` : '-'}`, `${userInfo?.numBathroom ? `${userInfo?.numBathroom}` : '-'}`],
                          [`${marker?.pricePerM ? `${this.formatNum(marker?.pricePerM)}` : '-'}`, `${userInfo?.pricePredict ? `${this.formatNum(userInfo?.pricePredict)}` : '-'}`],
                        ]
                        } heightArr={[30, 30, 30, 30]} width={80} style={styles.row} textStyle={styles.text} />
                      </TableWrapper>
                    </Table>
                  </View>
                </Callout>
              </Marker>
            ))}
          </MapView>
          <Carousel
            ref={(c) => { this._carousel = c; }}
            data={this.state.coordinates}
            renderItem={this.renderCarouselItem}
            sliderWidth={Dimensions.get('window').width}
            itemWidth={width / 1.4}
            containerCustomStyle={styles.carousel}
            onSnapToItem={(index) => this.onCarouselItemChange(index)}
          // removeClippedSubviews={false}
          />
        </View>
      );
    };
    return (
      <View style={styles.loading}>
        <ActivityIndicator size='large' color="#7066f6" />
      </View>
    );
  };
}

const styles = StyleSheet.create({



  containerBox: { flex: 1, padding: 16, backgroundColor: '#fff' },
  head: { height: 40, backgroundColor: '#f1f8ff' },
  wrapper: { flexDirection: 'row' },
  title: { flex: 1, backgroundColor: '#f6f8fa' },
  row: { flex: 1 },
  text: { textAlign: 'center' },
  // Modal

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalViewWrapper: {
    margin: 20,
    backgroundColor: '#fff',
    borderRadius: 20,
    width: width / 1.2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalView: {
    alignItems: "center",
    justifyContent: "space-around"
  },
  modalViewText1: {
    marginTop: 3,
    color: "#7066f6",
    paddingLeft: 3,
    paddingRight: 3,
    fontWeight: "600",
    fontSize: 22

  },
  modalViewText2: {
    marginTop: 10,
    color: "#7066f6",
    paddingLeft: 10,
    paddingRight: 10
  },
  modalViewBtn: {
    width: 120,
    height: height / 11,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F67066",
    borderRadius: 20,
    marginTop: 16,
    marginBottom: 16
  },
  modalViewText3: {
    marginTop: 3,
    color: "#fff",
    fontWeight: "600",
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 20
  },

  // other

  loading: {
    position: 'absolute',
    zIndex: 10000000,
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: "rgba(255, 255, 255, 0.6)"
  },
  container: {
    ...StyleSheet.absoluteFillObject
  },
  map: {
    ...StyleSheet.absoluteFillObject
  },
  markerWeapper: {
    paddingLeft: 4,
    paddingRight: 4,
    height: 30,
    backgroundColor: "#7066f6",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 7
  },
  markerText: {
    color: "#f6fcff",
    fontWeight: "600"
  },
  callOutWrapper: {
    width: width / 1.5,
    alignItems: "center",
    justifyContent: "center",

  },
  callOutChild1: {
    paddingRight: 10,
    borderRightWidth: 2,
    marginRight: 10,
    borderRightColor: "#F67066"
  },
  callOutChild2: {
    alignItems: "center"
  },
  callOutText: {
    marginTop: 5
  },
  backBtn: {
    position: "absolute",
    top: Constant.statusBarHeight,
    left: 10,
    right: 20,
    zIndex: 1000,
    padding: 10,
    width: 60,
    borderRadius: 50,
    backgroundColor: "#F67066",
    alignItems: "center",
    justifyContent: "center",
  },
  currentLocationBtn: {
    position: "absolute",
    top: Constant.statusBarHeight + 50,
    right: 20,
    zIndex: 1000,
  },
  carousel: {
    position: 'absolute',
    bottom: 0,
    marginBottom: 20,
  },

  cardStyle: {
    height: height / 3,
    width: width / 1.5,
    backgroundColor: "#8c84f7",
    borderRadius: 24,
  },
  cardTitleWrapper1: {
    flex: 1,
    alignItems: "center",
  },
  cardTitleWrapper2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  cardTitle: {
    fontSize: 16,
    color: "white",
    width: width / 1.5,
    textAlign: "center",
    padding: 10

  },
  cardImage: {
    width: width / 1.5,
    height: height / 5,
    position: 'absolute',
    bottom: 0,
    borderBottomRightRadius: 24,
    borderBottomLeftRadius: 24,
  },
  IconHomeDefault: {
    alignSelf: "center",
    marginTop: 70
  },
});
