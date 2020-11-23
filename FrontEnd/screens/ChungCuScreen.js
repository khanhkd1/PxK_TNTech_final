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

export default class ChungCuScreen extends React.Component {

  state = {
    ChuDauTu: "",
    DienTich: 0,
    SoPhong: 0,
    Huong: "all",
    NoiThat: null,
    GiaM2: 0,
    GiaCan: 0,
    isShown: false,
    MoTa: "",
    isVisibleA: false,
    isVisibleB: false,
    isVisibleC: false,
  };

  QUANHUYEN = [
    { label: 'Quận Hoàn Kiếm', value: '' },
    { label: 'Quận Đống Đa', value: '' },
    { label: 'Quận Ba Đình', value: '' },
    { label: 'Quận Hai Bà Trưng', value: '' },
    { label: 'Quận Hoàng Mai', value: '' },
    { label: 'Quận Thanh Xuân', value: '' },
    { label: 'Quận Long Biên', value: '' },
    { label: 'Quận Nam Từ Liêm', value: '' },
    { label: 'Quận Bắc Từ Liêm', value: '' },
    { label: 'Quận Tây Hồ', value: '' },
    { label: 'Quận Cầu Giấy', value: '' },
    { label: 'Quận Hà Đông', value: '' },

    { label: 'Thị Xã Sơn Tây', value: '' },

    { label: 'Huyện Ba Vì', value: '' },
    { label: 'Huyện Chương Mỹ', value: '' },
    { label: 'Huyện Phúc Thọ', value: '' },
    { label: 'Huyện Đan Phượng', value: '' },
    { label: 'Huyện Đông Anh', value: '' },
    { label: 'Huyện Gia Lâm', value: '' },
    { label: 'Huyện Hoài Đức', value: '' },
    { label: 'Huyện Mê Linh', value: '' },
    { label: 'Huyện Mỹ Đức', value: '' },
    { label: 'Huyện Phú Xuyên', vaue: '' },
    { label: 'Huyện Quốc Oai', value: '' },
    { label: 'Huyện Sóc Sơn', value: '' },
    { label: 'Huyện Thạch Thất', value: '' },
    { label: 'Huyện Thanh Oai', value: '' },
    { label: 'Huyện Thường Tín', value: '' },
    { label: 'Huyện  Ứng Hòa', value: '' },
    { label: 'Huyện Thanh Trì', value: '' },
  ];

  onSubmit = () => {
    this.props.navigation.navigate("Map");
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
                      console.log(item)
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
                  <Text style={styles.text}>Chủ Đầu Tư: </Text>
                  <TextInput
                    onFocus={() => {
                      this.changeVisibility();
                    }}
                    style={styles.textInput}
                    placeholder="VD: VinGroup"
                    selectionColor="#7066f6"
                    color="#7066f6"
                    onChangeText={text => this.setState({ ChuDauTu: text })}
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

                  <Text style={styles.text}>Giá: ( Chọn 1 trong 2 )</Text>
                  <TextInput
                    onFocus={() => {
                      this.changeVisibility();
                      this.setState({ GiaM2: 0 });
                      this._scroll.scrollToEnd();
                    }}
                    style={styles.textInput}
                    placeholder="Theo Căn"
                    selectionColor="#7066f6"
                    color="#7066f6"
                    keyboardType="numeric"
                    value={this.state.GiaCan == 0 ? null : this.state.GiaCan}
                    onChangeText={text => this.setState({ GiaCan: text })}
                  />
                </View>
                <View>
                  <Text style={styles.text}>Hướng Nhà: </Text>
                  <DropDownPicker
                    items={[
                      { label: 'Đông', value: 'd' },
                      { label: 'Tây', value: 't' },
                      { label: 'Nam', value: 'n' },
                      { label: 'Bắc', value: 'b' },
                      { label: 'Đông - Bắc', value: 'db' },
                      { label: 'Tây - Bắc', value: 'tb' },
                      { label: 'Tây - Nam', value: 'tn' },
                      { label: 'Đông - Nam', value: 'dn' },
                    ]}
                    placeholder="Tất cả các hướng"
                    containerStyle={styles.dropDown}
                    // style={styles.dropDown}
                    dropDownStyle={styles.dropDown1}
                    onChangeItem={(item, index) => {
                      this.setState({ Huong: item })
                    }}
                    dropDownMaxHeight={220}
                    isVisible={this.state.isVisibleB}
                    onOpen={() => this.changeVisibility({
                      isVisibleB: true
                    })}
                    onClose={() => this.setState({
                      isVisibleB: false
                    })}
                  />

                  <Text style={styles.text}>Nội Thất: </Text>
                  <DropDownPicker
                    items={[
                      { label: 'Thô', value: false },
                      { label: 'Có', value: true },
                    ]}
                    placeholder="Chọn"
                    containerStyle={styles.dropDown}
                    // style={styles.dropDown}
                    // dropDownStyle={styles.dropDown3}
                    onChangeItem={(item, index) => {
                      this.setState({ NoiThat: item })
                    }}
                    zIndex={1}
                    isVisible={this.state.isVisibleC}
                    onOpen={() => this.changeVisibility({
                      isVisibleC: true
                    })}
                    onClose={() => this.setState({
                      isVisibleC: false
                    })}
                  />
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

                  <TextInput
                    onFocus={() => {
                      this.changeVisibility();
                      this.setState({ GiaCan: 0 });
                      this._scroll.scrollToEnd();
                    }}
                    style={[styles.textInput, { marginTop: 54 }]}
                    placeholder="Theo m2"
                    selectionColor="#7066f6"
                    color="#7066f6"
                    value={this.state.GiaM2 == 0 ? null : this.state.GiaM2}
                    keyboardType="numeric"
                    onChangeText={text => this.setState({ GiaM2: text })}
                  />
                </View>
              </View>
              <View style={styles.fieldWrapper2}>
                <Text style={styles.text}>Mô tả: </Text>
                <TextInput
                  onFocus={() => {
                    this.changeVisibility();
                    this._scroll.scrollToEnd();
                    // this._scroll.scrollResponderScrollNativeHandleToKeyboard();
                  }}
                  style={styles.textInputDes}
                  placeholder="VD: Dịch vụ, mặt tiền,..."
                  selectionColor="#7066f6"
                  color="#7066f6"
                  onChangeText={text => this.setState({ MoTa: text })}
                  multiline={true}
                />
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
