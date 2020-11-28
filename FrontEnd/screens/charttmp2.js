import React, { useState } from 'react'
import { BarChart, LineChart } from 'react-native-chart-kit';
import { SafeAreaView, View, Text, Dimensions, StatusBar, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import Constant from 'expo-constants';
import ImageView from "react-native-image-viewing";



const fakeApi = [
  {
    "district_name": "ba đình",
    "pricePerM_mean": 53.16198226473979,
    "farCenter_mean": 3.6560832040988847
  },
  {
    "district_name": "bắc từ liêm",
    "pricePerM_mean": 27.005448814142834,
    "farCenter_mean": 8.249926169826226
  },
  {
    "district_name": "cầu giấy",
    "pricePerM_mean": 31.40809078805794,
    "farCenter_mean": 6.394735560791856
  },
  {
    "district_name": "chương mỹ",
    "pricePerM_mean": 13.26580134305087,
    "farCenter_mean": 19.723224639892578
  },
  {
    "district_name": "gia lâm",
    "pricePerM_mean": 28.52077988389963,
    "farCenter_mean": 11.833092750451817
  },
  {
    "district_name": "hà đông",
    "pricePerM_mean": 20.12012353288684,
    "farCenter_mean": 10.321998067282806
  },
  {
    "district_name": "hai bà trưng",
    "pricePerM_mean": 35.45664535799334,
    "farCenter_mean": 3.797720175356634
  },
  {
    "district_name": "hoài đức",
    "pricePerM_mean": 14.78582088307184,
    "farCenter_mean": 13.704501556515229
  },
  {
    "district_name": "hoàn kiếm",
    "pricePerM_mean": 99.70591959953308,
    "farCenter_mean": 0.9098925858736038
  },
  {
    "district_name": "hoàng mai",
    "pricePerM_mean": 20.42397412517969,
    "farCenter_mean": 6.753682255203893
  },
  {
    "district_name": "long biên",
    "pricePerM_mean": 27.886312790183755,
    "farCenter_mean": 5.0298300642858855
  },
  {
    "district_name": "nam từ liêm",
    "pricePerM_mean": 30.082536744802013,
    "farCenter_mean": 8.623249735805274
  },
  {
    "district_name": "tây hồ",
    "pricePerM_mean": 44.11049189567566,
    "farCenter_mean": 5.611255626289212
  },
  {
    "district_name": "thạch thất",
    "pricePerM_mean": 13.257131814956665,
    "farCenter_mean": 35.80127000808716
  },
  {
    "district_name": "thanh oai",
    "pricePerM_mean": 14.835724137046121,
    "farCenter_mean": 12.022868156433105
  },
  {
    "district_name": "thanh trì",
    "pricePerM_mean": 19.36604904117006,
    "farCenter_mean": 8.504596276716752
  },
  {
    "district_name": "thanh xuân",
    "pricePerM_mean": 30.00849656072156,
    "farCenter_mean": 5.911090324938982
  },
  {
    "district_name": "đan phượng",
    "pricePerM_mean": 14.425892141130236,
    "farCenter_mean": 16.57753626505534
  },
  {
    "district_name": "đông anh",
    "pricePerM_mean": 20.864864864864863,
    "farCenter_mean": 9.254660103772137
  },
  {
    "district_name": "đống đa",
    "pricePerM_mean": 34.334081835973834,
    "farCenter_mean": 3.6959590604373562
  }
]

const images = [
  require('./../assets/imgpsh_fullsize_anim.png'),
];




const Chart = (props) => {
  console.log("---------API CHART-----------");
  console.log(fakeApi);
  const [visible, setIsVisible] = useState(false);
  const showImageView = () => {
    setIsVisible(true)
  }

  return (
    <ScrollView>

      <SafeAreaView />

      <TouchableOpacity
        style={styles.backBtn}
        onPress={() => props.navigation.goBack()}
      >
        <Ionicons name="ios-arrow-back" size={30} color="#fff" />
      </TouchableOpacity>

      <View style={styles.container}>
        <View >
          <View
            // onPress={showImageView}
          >
            <ScrollView horizontal={true}>
              <Image
                source={require('./../assets/imgpsh_fullsize_anim.png')}
                style={{
                  aspectRatio: 1774 / 1340,
                  width: Dimensions.get("screen").width * 2
                }}
              />
            </ScrollView>
          </View>
        </View>
      </View>

      <ImageView
        images={images}
        imageIndex={0}
        visible={visible}
        onRequestClose={() => setIsVisible(false)}
      />

      <View style={styles.boxFake} />

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 100
  },
  boxFake: {
    height: 50,
    width: 50,
  },
  boxFake1: {
    height: 20,
    width: 20,
  },
  box2: {
    borderRadius: 10,
    backgroundColor: '#E6E6FA',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 20,
    marginTop: 20
  },
  backBtn: {
    position: "absolute",
    top: Constant.statusBarHeight,
    left: 10,
    right: 20,
    zIndex: 1000,
    padding: 10,
    width: "30%",
    borderRadius: 50,
    backgroundColor: "#F67066",
    alignItems: "center",
    justifyContent: "center",
  },



});

export default Chart;
