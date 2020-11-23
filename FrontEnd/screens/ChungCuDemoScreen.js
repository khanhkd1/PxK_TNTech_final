import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Keyboard,
  TouchableOpacity,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  ScrollView,
  Platform
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import DropDownPicker from 'react-native-dropdown-picker';
import Constant from 'expo-constants'

export default class ChungCuDemoScreen extends React.Component {

  state = {
    ChuDauTu: "",
    DienTich: "",
    SoPhong: "",
    Huong: "all",
    NoiThat: null,
    GiaM2: 0,
    GiaCan: 0,
    isShown: false,
    MoTa: "",
    isVisibleA: false,
    isVisibleB: false,
    isVisibleC: false,
    viTri: ""
  };

  QUANHUYEN = [
    { label: 'Quận Hoàn Kiếm', value: 'hoàn+kiếm' },
    { label: 'Quận Đống Đa', value: 'đống+đa' },
    { label: 'Quận Ba Đình', value: 'ba+đình' },
    { label: 'Quận Hai Bà Trưng', value: 'hai+bà+trưng' },
    { label: 'Quận Hoàng Mai', value: 'hoàng+mai' },
    { label: 'Quận Thanh Xuân', value: 'thanh+xuân' },
    { label: 'Quận Long Biên', value: 'long+biên' },
    { label: 'Quận Nam Từ Liêm', value: 'nam+từ+liêm' },
    { label: 'Quận Bắc Từ Liêm', value: 'bắc+từ+liêm' },
    { label: 'Quận Tây Hồ', value: 'tây+hồ' },
    { label: 'Quận Cầu Giấy', value: 'cầu+giấy' },
    { label: 'Quận Hà Đông', value: 'hà+đông' },

    // { label: 'Thị Xã Sơn Tây', value: 'Sơn Tây' },

    // { label: 'Huyện Ba Vì', value: 'Ba Vì' },
    // { label: 'Huyện Chương Mỹ', value: 'Chương Mỹ' },
    // { label: 'Huyện Phúc Thọ', value: 'Phúc Thọ' },
    // { label: 'Huyện Đan Phượng', value: 'Đan Phượng' },
    // { label: 'Huyện Đông Anh', value: '' },
    // { label: 'Huyện Gia Lâm', value: '' },
    // { label: 'Huyện Hoài Đức', value: '' },
    // { label: 'Huyện Mê Linh', value: '' },
    // { label: 'Huyện Mỹ Đức', value: '' },
    // { label: 'Huyện Phú Xuyên', vaue: '' },
    // { label: 'Huyện Quốc Oai', value: '' },
    // { label: 'Huyện Sóc Sơn', value: '' },
    // { label: 'Huyện Thạch Thất', value: '' },
    // { label: 'Huyện Thanh Oai', value: '' },
    // { label: 'Huyện Thường Tín', value: '' },
    // { label: 'Huyện  Ứng Hòa', value: '' },
    // { label: 'Huyện Thanh Trì', value: '' },
  ];

  onSubmit = () => {
    let {viTri, SoPhong, DienTich} = this.state;
    
    if (viTri || SoPhong || DienTich) {
      let sendInfo = {
        viTri,
        SoPhong,
        DienTich
      }
      this.props.navigation.navigate("Map", {sendInfo});
    } else {
      alert("Nhap 1 trong 3 truong")
    }
  }

  changeVisibility(state) {
    this.setState({
      isVisibleA: false,
      isVisibleB: false,
      isVisibleC: false,
      ...state
    });
  }

  render() {
    return (
     
        <KeyboardAvoidingView
          style={styles.container}
          enabled={true}
          behavior={Platform.OS == "ios" ? "padding" : "height"}
        >
           <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
          this.changeVisibility();
        }}
        style={styles.container}

      >
          <ScrollView 
          ref={(c) => { this._scroll = c; }}
          // disableScrollViewPanResponder={true}
          // overScrollMode="always"
          // scrollEnabled={false}
          >
            <TouchableOpacity
              style={styles.backBtnWrapper}
              onPress={() => this.props.navigation.goBack()}
            >
              <View style={styles.backBtn}>
                <Text style={styles.backBtnText}>Quay lại</Text>
              </View>
            </TouchableOpacity>
            <View style={styles.body}>

              <Text style={styles.textHeader}>Chung Cư</Text>
              <View style={styles.fieldWrapper}>
                <View>
                  <Text style={styles.text}>Vị Trí: </Text>
                  <DropDownPicker
                    items={this.QUANHUYEN}
                    placeholder="Chọn"
                    containerStyle={styles.dropDown}
                    style={{ height: 500 }}
                    onChangeItem={(item, index) => {
                      this.setState({viTri: item})
                    }}
                    searchable={true}
                    searchablePlaceholder="Tìm Quận/Huyện"
                    searchablePlaceholderTextColor="#7066f6"
                    searchableError={() => <Text>Không có</Text>}
                    dropDownMaxHeight={330}
                    isVisible={this.state.isVisibleA}
                    onOpen={() => this.changeVisibility({
                      isVisibleA: true
                    })}
                    onClose={() => this.setState({
                      isVisibleA: false
                    })}
                  />
                  <Text style={styles.text}>Diện Tích: </Text>
                  <TextInput
                    onFocus={() => {
                      this.changeVisibility();
                    }}
                    style={styles.textInput}
                    placeholder="m2"
                    selectionColor="#7066f6"
                    color="#7066f6"
                    onChangeText={text => this.setState({ DienTich: text })}
                    keyboardType="numeric"
                  />

                </View>
                <View>
                 
                  <Text style={styles.text}>Số Phòng Ngủ: </Text>
                  <TextInput
                    onFocus={() => {
                      this.changeVisibility();
                    }}
                    style={styles.textInput}
                    placeholder="VD: 2"
                    selectionColor="#7066f6"
                    color="#7066f6"
                    onChangeText={text => this.setState({ SoPhong: text })}
                    keyboardType="numeric"
                    maxLength={1}
                  />

                </View>
              </View>
              
              <TouchableOpacity
                onPress={() => this.onSubmit()}
                style={styles.btnFindWrapper}
              >
                <View style={styles.btnFind}>
                  <Text style={styles.btnText}>
                    Tìm
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </ScrollView>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    marginTop: Constant.statusBarHeight
  },
  body: {
    flex: 1,
    alignItems: "center",
    fontSize: 50,
    marginTop: 30
  },
  text: {
    fontSize: 20,
    fontWeight: "500",
    color: "#7066f6",
    marginLeft: 10,
    marginTop: 20
  },
  textHeader: {
    fontSize: 30,
    fontWeight: "700",
    color: "#7066f6",
    marginTop: 20
  },
  fieldWrapper: {
    flex: 1,
    flexDirection: "row",
    // backgroundColor: "green"
    zIndex: 10
  },
  fieldWrapper2: {
    flex: 1,
    width: "100%",
  },
  dropDown: {
    width: 200,
    height: 50,
    marginTop: 10,
    marginHorizontal: 5,
  },
  textInput: {
    width: 200,
    height: 50,
    borderRadius: 10,
    paddingLeft: 10,
    paddingRight: 10,
    borderWidth: 1,
    borderColor: "#7066f6",
    marginTop: 10,
    marginHorizontal: 5,
    fontSize: 20
  },
  textInputDes: {
    width: 400,
    height: 150,
    borderRadius: 10,
    paddingLeft: 10,
    paddingRight: 10,
    borderWidth: 1,
    borderColor: "#7066f6",
    marginTop: 10,
    marginHorizontal: 5,
    fontSize: 20,
    alignItems: "center",
    justifyContent: "center"
  },
  location: {
    flex: 1,
    alignItems: "center",
    marginTop: 100
  },
  btnFind: {
    width: 100,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#7066f6",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  btnFindWrapper: {
    // backgroundColor: "green",
    marginLeft: 250,
    marginTop: 20
  },
  btn: {
    width: 280,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#7066f6",
    alignItems: "center",
    justifyContent: "center",
  },
  btnText: {
    color: "#fafafa",
    fontSize: 24,
    fontWeight: "500"
  },
  backBtnWrapper: {
    top: 40,
    left: 10,
    zIndex: 100,
    marginTop: -40,
    // backgroundColor: "green",
    width: 100
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
    fontSize: 20,
    fontWeight: "500"
  }
});
