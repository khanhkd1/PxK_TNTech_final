import React, { useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  Image,
  SafeAreaView
} from 'react-native';
import Constant from 'expo-constants';
import Swiper from 'react-native-swiper';
import { ScrollView } from 'react-native-gesture-handler';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import ImageView from "react-native-image-viewing";


const images1 = [
  require('./../assets/predict1.png'),
];

const ApiChartView = (props) => {


  const { navigation } = props;
  const ApiChart = props.route.params;
  const [visible1, setIsVisible1] = useState(false);
  const showImageView1 = () => {
    setIsVisible1(true)
  }

  console.log("predictchart: ");
  console.log(ApiChart);

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingLeft: 10,
          paddingRight: 10
        }}
      >
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="ios-arrow-back" size={30} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={showImageView1}
        >
          <FontAwesome5 name="chart-bar" size={46} color="#F67066" />
        </TouchableOpacity>
      </View>
      <ScrollView>
        {ApiChart.map((item, index) => {
          return (
            <View
              key={index}
              style={StyleSheet.wrapper}
            >
              <View style={styles.line} />
              <View>
                <Text>count: {item?.count}</Text>
                <Text>district: {item?.district}</Text>
                <Text>lowerQuartile: {item?.lowerQuartile}</Text>
                <Text>max: {item?.max}</Text>
                <Text>median: {item?.median}</Text>
                <Text>min: {item?.min}</Text>
                <Text>predictPricePerM: {item?.predictPricePerM}</Text>
                <Text>upperQuartile: {item?.upperQuartile}</Text>
              </View>
            </View>
          );
        })
        }
      </ScrollView>
      <SafeAreaView />
      <ImageView
        images={images1}
        imageIndex={0}
        visible={visible1}
        onRequestClose={() => setIsVisible1(false)}
      />
    </View>
  )
}

export default ApiChartView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constant.statusBarHeight
  },
  wrapper: {

  },
  backBtn: {
    // position: "absolute",
    padding: 10,
    width: "20%",
    borderRadius: 50,
    backgroundColor: "#F67066",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10
  },
  line: {
    width: "100%",
    height: 10,
    backgroundColor: "#dddddd",
    marginBottom: 10,
    marginTop: 10
  }


})

