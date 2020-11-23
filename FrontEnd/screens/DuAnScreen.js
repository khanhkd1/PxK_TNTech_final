import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView, Keyboard
} from 'react-native';
import { TextInput, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import DropDownPicker from 'react-native-dropdown-picker';
import Constant from 'expo-constants';

export default class DuAnScreen extends React.Component {

  state = {
    ChuDauTu: "",
    DienTich: 0,
    MatTien: 0,
    Gia: 0,
    DuongVao: 0,
    isShown: false,
    MoTa: "",
    isVisibleA: false,
  };

  FIELD1 = {

  };
  FIELD2 = [

  ];

  onSubmit = () => {
    console.log(this.state)
  }

  changeVisibility(state) {
    this.setState({
      isVisibleA: false,
      ...state
    });
  }

  render() {
    return (
      <KeyboardAvoidingView
        style={styles.container}
        enabled={true}
        behavior="padding"
      >
        <ScrollView ref="scroll">
          <TouchableOpacity
            style={styles.backBtnWrapper}
            onPress={() => this.props.navigation.goBack()}
          >
            <View style={styles.backBtn}>
              <Text style={styles.backBtnText}>Quay lại</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.body}>

            <Text style={styles.textHeader}>Dự Án</Text>
            <View style={styles.fieldWrapper}>
              <View>
                <Text style={styles.text}>Vị Trí: </Text>
                <DropDownPicker
                  items={[
                    { label: 'UK', value: 'uk' },
                    { label: 'France', value: 'france' },
                    { label: 'Germany', value: 'germany' },
                  ]}
                  placeholder="Chọn"
                  containerStyle={styles.dropDown}
                  // style={styles.dropDown}
                  // dropDownStyle={styles.dropDown3}
                  onChangeItem={(item, index) => {
                    console.log(item)
                  }}
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
                <Text style={styles.text}>Giá:</Text>
                <TextInput
                  onFocus={() => {
                    this.changeVisibility();
                  }}
                  style={styles.textInput}
                  placeholder="VNĐ"
                  selectionColor="#7066f6"
                  color="#7066f6"
                  keyboardType="numeric"
                  onChangeText={text => this.setState({ Gia: text })}
                />
              </View>
              <View>
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
                <Text style={styles.text}>Mặt Tiền: </Text>
                <TextInput
                  onFocus={() => {
                    this.changeVisibility();
                  }}
                  style={styles.textInput}
                  placeholder="VD: 100"
                  selectionColor="#7066f6"
                  color="#7066f6"
                  onChangeText={text => this.setState({ MatTien: text })}
                  keyboardType="numeric"
                />
                <Text style={styles.text}>Đường vào: </Text>
                <TextInput
                  onFocus={() => {
                    this.changeVisibility();
                  }}
                  style={styles.textInput}
                  placeholder="m"
                  selectionColor="#7066f6"
                  color="#7066f6"
                  onChangeText={text => this.setState({ DuongVao: text })}
                  keyboardType="numeric"
                  maxLength={2}
                />
              </View>
            </View>
            <View style={styles.fieldWrapper2}>
              <Text style={styles.text}>Mô tả: </Text>
              <TextInput
                onFocus={() => {
                  this.changeVisibility();
                  this.refs.scroll.scrollToEnd()
                }}
                style={styles.textInputDes}
                placeholder="VD: Dịch vụ, quy mô,..."
                selectionColor="#7066f6"
                color="#7066f6"
                onChangeText={text => this.setState({ MoTa: text })}
                multiline={true}
              />
            </View>
            <TouchableOpacity
              onPress={() => this.onSubmit()}
            >
              <View style={styles.btnFind}>
                <Text style={styles.btnText}>
                  Tìm
                  </Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
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
  textHeader: {
    fontSize: 30,
    fontWeight: "700",
    color: "#7066f6",
    marginTop: 20
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
  dropDown1: {
    height: 200
  },
  dropDown3: {
    width: 200,
    zIndex: 10,
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
    marginLeft: 200,
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
