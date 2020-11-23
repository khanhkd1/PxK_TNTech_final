import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  Image
} from 'react-native';
import Constant from 'expo-constants';
import Swiper from 'react-native-swiper';
import { MaterialIcons } from '@expo/vector-icons';
import constants from './../Constants';
import DropDownPicker from 'react-native-dropdown-picker';

export default class GuideScreen extends Component {

  render() {
    const { navigation } = this.props;
    const { language } = this.props.route.params;
    return (
      <Swiper
        style={styles.wrapper}
        loop={false}
        showsButtons={true}
        activeDotColor="#7066f6"
        prevButton={<Text style={styles.buttonIndicatorLeft}>‹</Text>}
        nextButton={<Text style={styles.buttonIndicatorRight}>›</Text>}
      >
        <View style={styles.slide}>
          <Text style={styles.textTitle}>{language === "VIE" ? "Hướng Dẫn" : "Tutorial"}</Text>
          <Image
            source={require('./../assets/5.png')}
            style={styles.img}
            resizeMode="contain"
          />
          <Text style={styles.text}>{language === "VIE" ? "Ở màn hình trang chủ, bạn chọn loại nhà đất bạn muốn tìm." : "On the home screen, you select the type of property you want to find."}</Text>

        </View>
        <View style={styles.slide}>
          <Image
            source={require('./../assets/man1.png')}
            style={styles.img}
            resizeMode="contain"
          />
          <Text style={[styles.text, { marginBottom: 30 }]}>{language === "VIE" ? "Ấn vào để xem thêm về data" : "Click to see more about data"}</Text>
        </View>
        <View style={styles.slide}>
          <Image
            source={require('./../assets/2.png')}
            style={styles.img}
            resizeMode="contain"
          />
          <Text style={styles.text}>{language === "VIE" ? "Ấn vào dấu + để có thể nhập thêm thông tin." : "Press the + sign to enter more information."}</Text>
        </View>
        <View style={styles.slide}>
          <Image
            source={require('./../assets/1.png')}
            style={styles.img}
            resizeMode="contain"
          />
          <Text style={styles.text}>{language === "VIE" ? "Mỗi lần bạn thay đổi thông tin, giá và độ chính xác cũng sẽ bị thay đổi" : "Each time you change your information, price and accuracy will also change"}</Text>
        </View>
        <View style={styles.slide}>
          <Image
            source={require('./../assets/3.png')}
            style={styles.img}
            resizeMode="contain"
          />
          <Text style={styles.text}>{language === "VIE" ? "Nhấn vào giá để có thể xem lịch sử tìm kiếm của bạn." : "Click on the price to be able to view your search history."}</Text>
          <View>
            <Text style={styles.text}>{language === "VIE" ? "- Bạn kéo xuống hoặc kéo sang phải ( ở bảng) để có thể nhìn nhiều thông tin hơn" : "- You drag down or drag to the right (in the table) to see more information"}</Text>
            <Text style={styles.text}>{language === "VIE" ? "- Kéo bảng lịch sử xuống để bảng bé lại" : "- Drag the history board down to the baby board"}</Text>
          </View>
        </View>
        <View style={styles.slide}>
          <Image
            source={require('./../assets/man2.png')}
            style={styles.img}
            resizeMode="contain"
          />
          <Text style={styles.text}>{language === "VIE" ? "Ấn vào để tìm các căn hộ thực trên bản đồ" : "Click to find real apartments on the map"}</Text>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.btnStarted}
          >
            <Text style={styles.btnText}>{language === "VIE" ? "Bắt Đầu" : "Let's Start"}</Text>
            <MaterialIcons name="directions-run" size={36} color="#fff" />
          </TouchableOpacity>
        </View>
      </Swiper>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {},
  slide: {
    flex: 1,
    backgroundColor: '#fff',
    paddingLeft: 10,
    paddingRight: 5,
    alignItems: "center",
    justifyContent: "center",
    marginTop: -100
  },
  text: {
    color: '#7066f6',
    fontSize: 16,
    marginTop: 10
  },
  textTitle: {
    position: "absolute",
    color: '#7066f6',
    fontSize: 30,
    fontWeight: 'bold',
    top: Constant.statusBarHeight + 130
  },
  btnStarted: {
    backgroundColor: '#F67066',

    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",

    position: "absolute",
    bottom: 60,
    right: 20,

    padding: 24,
    borderRadius: 16
  },
  btnText: {
    color: "#fff",
    marginRight: 10,
    fontSize: 30,
    fontWeight: 'bold'
  },
  buttonIndicatorRight: {
    color: "#F67066",
    fontSize: 70,
    position: "absolute",
    top: constants.windowHeight / 4,
    right: 10
  },
  buttonIndicatorLeft: {
    color: "#F67066",
    fontSize: 70,
    position: "absolute",
    top: constants.windowHeight / 4,
    left: 10
  },
  img: {
    width: "100%",
    height: "30%",
    marginTop: 10,
    marginBottom: 10
  }


})

