import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Keyboard,
  TouchableOpacity,
  TouchableWithoutFeedback,
  SafeAreaView,
  Button,
} from 'react-native';
import constants from './../Constants';
import { FontAwesome5, Octicons, MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';
import {
  VarelaRound_400Regular,
  useFonts
} from '@expo-google-fonts/varela-round';
import SwitchSelector from "react-native-switch-selector";
import { AppLoading } from 'expo';
import LottieView from 'lottie-react-native';
import Constant from 'expo-constants';


export default function ChooseScreen(props) {

  let [fontsLoaded] = useFonts({
    VarelaRound_400Regular,
  });

  const [language, setLanguage] = useState("VIE");

  if (!fontsLoaded) {
    return <AppLoading />;
  } else return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require('./../assets/splash.png')}
        style={styles.img}
      />
      <TouchableOpacity
        style={styles.iconGuide}
        onPress={() => props.navigation.navigate("GuideScreen", { language })}
      >
        <MaterialCommunityIcons
          name="book-open-page-variant"
          size={50} color="#F67066"
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.iconLineChart}
        onPress={() => props.navigation.navigate("ChartScreen", { language })}
      >
        {/* <AntDesign name="linechart" size={50} color="#F67066" /> */}
        <FontAwesome5 name="chart-bar" size={50} color="#F67066" />
      </TouchableOpacity>
      <View style={styles.body}>
        <View style={styles.btnWrapper}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => props.navigation.navigate("ChungCuTestScreen", { language })}
          >
            <FontAwesome5 name="city" size={50} color="white" />
            <Text style={styles.btnText}>{language === "VIE" ? "Chung Cư" : "Apartment"}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnDisable}
            disabled={true}
          // onPress={() => props.navigation.navigate("ChungCuDemoScreen")}
          >
            <Octicons name="project" size={50} color="white" />
            <Text style={styles.btnText}>{language === "VIE" ? "Nhà Đất" : "Real Estate"}</Text>
          </TouchableOpacity>
          <SwitchSelector
            initial={0}
            onPress={value => setLanguage(value)}
            textColor="#7066f6"
            selectedColor="#fff"
            buttonColor="#7066f6"
            borderColor="#7066f6"
            hasPadding
            options={[
              { label: "VIE", value: "VIE" },
              { label: "ENG", value: "ENG" },
            ]}
            style={styles.ChangeLang}
          />
          <LottieView
            source={require('./../22490-wood-house-home-building.json')}
            style={styles.lottie}
            autoPlay
            loop
          />
        </View>
      </View>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  iconGuide: {
    position: "absolute",
    top: Constant.statusBarHeight,
    right: 10
  },
  iconLineChart: {
    position: "absolute",
    top: Constant.statusBarHeight,
    left: 20
  },
  headerWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  body: {
    flex: 1,
    alignItems: "center",
    fontSize: 50,
    marginTop: -constants.windowHeight / 4,
    // backgroundColor: "green"
  },
  img: {
    width: constants.windowWidth,
    height: constants.windowHeight / 2,
    marginTop: -20
  },
  text: {
    fontSize: 36,
    color: "#7066f6",
    fontFamily: 'VarelaRound_400Regular',
    marginTop: 20,
    // backgroundColor: "green"
  },
  btnWrapper: {
    width: "100%",
    flex: 1,
    // backgroundColor: "green"
  },
  btn: {
    width: constants.windowWidth / 1.3,
    height: constants.windowHeight / 8,

    borderRadius: 20,
    backgroundColor: "#7066f6",
    shadowColor: '#7066f6',
    shadowOffset: { width: 2, height: 8 },
    shadowOpacity: 0.8,
    shadowRadius: 15,
    elevation: 10,
    marginTop: 40,

    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  btnDisable: {
    width: constants.windowWidth / 1.3,
    height: constants.windowHeight / 8,

    borderRadius: 20,
    backgroundColor: "#dddddd",
    shadowColor: '#dddddd',
    shadowOffset: { width: 2, height: 8 },
    shadowOpacity: 0.8,
    shadowRadius: 15,
    elevation: 10,
    marginTop: 40,

    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",

  },

  btnText: {
    color: "#fafafa",
    fontSize: 34,
    fontFamily: 'VarelaRound_400Regular',
    paddingLeft: 10,
    paddingRight: 10,
    // zIndex: 10
  },
  lottie: {
    height: constants.windowHeight / 3,
    alignSelf: "center",
    // position: "absolute",
  },
  ChangeLang: {
    width: constants.windowWidth / 3,
    marginTop: 20,
    alignSelf: "center"
  }
});
