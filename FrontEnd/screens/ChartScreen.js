import React from 'react'
import { BarChart, LineChart } from 'react-native-chart-kit';
import { SafeAreaView, View, Text, Dimensions, StatusBar, StyleSheet, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import Constant from 'expo-constants';



const data1 = {
  labels: ['Ba đình', 'Bắc Từ Liêm', 'Cầu Giấy ', 'Chương Mỹ', 'Đan Phượng',
    'Đông Anh', 'Đống Đa', 'Gia Lâm', 'Hà Đông', 'Hai Bà Trưng', 'Hoài Đức', 'Hoàn Kiếm',
    'Hoàng Mai', 'Long Biên', 'Nam Từ Liêm', 'Tây Hồ', 'Thạch Thất', 'Thành Trì', 'Thanh Oai', 'Thanh Xuân'],
  datasets: [
    {
      data: [53.2, 27.1, 31.4, 13.3, 14.4, 20.9, 34.3, 28.5, 20.1, 35.5, 14.8, 99.7, 20.4, 27.9, 30.1, 44.1, 13.3, 19.1, 14.8, 30]
    }
  ]
};
const data2 = {
  labels: ['Ba đình', 'Bắc Từ Liêm', 'Cầu Giấy ', 'Chương Mỹ', 'Đan Phượng',
    'Đông Anh', 'Đống Đa', 'Gia Lâm', 'Hà Đông', 'Hai Bà Trưng', 'Hoài Đức', 'Hoàn Kiếm',
    'Hoàng Mai', 'Long Biên', 'Nam Từ Liêm', 'Tây Hồ', 'Thạch Thất', 'Thành Trì', 'Thanh Oai', 'Thanh Xuân'],
  datasets: [
    {
      data: [3.7, 8.3, 6.4, 19.8, 16.6, 9.2, 3.7, 11.8, 10.3, 3.8, 13.7, 0.91, 6.8, 5.03, 8.6, 5.6, 35.8, 8.5, 12.02, 5.9]
    }
  ]
};

const Chart = (props) => {

  return (
    <ScrollView>
      <TouchableOpacity
            style={styles.backBtn}
            onPress={() => props.navigation.goBack()}
          >
            <Ionicons name="ios-arrow-back" size={30} color="#fff" />
          </TouchableOpacity>
      <View style={styles.container}>
        <SafeAreaView/>
        <View >
          <View>
            <TouchableOpacity style={styles.box2}>
              <Text style={{ padding: 15, fontSize: 18, }}> {props.route.params.language === "VIE" ? "Khoảng Cách Các Quận Với Trung Tâm Hà Nội" : "Distances From Districts To The Center Of Hanoi"}</Text>
            </TouchableOpacity>

            <ScrollView horizontal={true}>
              <LineChart
                data={data2}
                width={650} // from react-native
                height={500}
                verticalLabelRotation="80"
                yAxisSuffix="km"
                fromZero='true'
                yAxisInterval={1} // optional, defaults to 1

                chartConfig={{
                  backgroundColor: "#E6E6FA",
                  backgroundGradientFrom: "#7B68EE",
                  backgroundGradientTo: "#7B68EE",
                  decimalPlaces: 2, // optional, defaults to 2dp
                  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                  style: {
                    borderRadius: 16
                  },
                  propsForDots: {
                    r: "6",
                    strokeWidth: "2",
                    stroke: "#ffa726"
                  }
                }}
              />
            </ScrollView>
          </View>
          {/* <TouchableOpacity style={styles.box2}>
            <Text style={{ padding: 15, fontSize: 18 }}> Biểu đồ mặt bằng giá của các quận </Text>
          </TouchableOpacity>

          <ScrollView horizontal={true}>
            <BarChart
              data={data1}
              width={1300}
              height={500}
              yAxisSuffix="tr"
              verticalLabelRotation="70"
              horizontalLabelRotation=""
              showValuesOnTopOfBars
              fromZero='true'
              chartConfig={{
                backgroundColor: '#7B68EE',
                backgroundGradientFrom: '#CEF6F5',
                backgroundGradientTo: '#CEF6F5',
                decimalPlaces: 2, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
                propsForDots: {
                  r: '6',
                  strokeWidth: '2',
                  stroke: '#ffa726',
                },

              }}
              bezier
              style={{
                marginVertical: 10,
                borderRadius: 15,
              }}
            />
          </ScrollView> */}
        </View>
      </View>
      <View style={styles.boxFake}></View>
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
