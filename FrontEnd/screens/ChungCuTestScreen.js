import React, { useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Keyboard,
  TouchableOpacity,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Modal,
  TouchableHighlight,
  InputAccessoryView,
  StatusBar,
  ActivityIndicator,
  LayoutAnimation,
  UIManager,
  Alert,
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import DropDownPicker from 'react-native-dropdown-picker';
import Constant from 'expo-constants';
import { AntDesign, MaterialCommunityIcons, Ionicons, FontAwesome5, Entypo, Feather, EvilIcons, FontAwesome } from '@expo/vector-icons';
import constants from './../Constants';
import I18n from 'i18n-js';
import moment from 'moment';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import ProgressCircle from 'react-native-progress-circle';

import HistoryTableScreen from './HistoryTableScreen';
import { isLoading } from 'expo-font';

const width = constants.windowWidth;
const height = constants.windowHeight;
const widthElement = 0.47 * constants.windowWidth;
const inputAccessoryViewID = 'uniqueID';

if (Constant.platform === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}
export default class ChungCuTestScreen extends React.Component {

  sheetRef = React.createRef(null);

  state = {
    isLoading: false,
    dataFromApi: null,
    // dataFromApi: {
    //   "pricePerM": 35.4,
    //   "score": 0.5487163906853896,
    //   "totalPrice": 1770,
    // },
    ApiChart: [],
    ChuDauTu: "",
    DienTich: "",
    HuongNha: "",
    HuongBanCong: "",
    NoiThat: "",
    isShown: false,
    ViTri: '',
    Loai: "",
    SoPhongNgu: "",
    SoPhongTam: "",
    CachTrungTam: "",
    isVisibleQuanHuyen: false,
    // isVisibleHuongNha: false,
    // isVisibleHuongBanCong: false,
    // isVisibleNoiThat: false,
    // isVisibleLoai: false,
    isVisibleSoPhongNgu: false,
    isVisibleSoPhongTam: false,
    isVisibleChuDauTu: false,
    isVisibleCachTrungTam: false,
    modalVisible: false,
    modalMoreVisible: false,
    count: 0,
    status: {
      addButton: 0,
      // HuongNha: false,
      // HuongBanCong: false,
      // NoiThat: false,
      // Loai: false,
      ChuDauTu: false,
      CachTrungTam: false
    },
    history: [],
  };

  QUANHUYEN = [
    { label: 'Quận Hoàn Kiếm', value: 'Hoàn Kiếm' },
    { label: 'Quận Đống Đa', value: 'Đống Đa' },
    { label: 'Quận Ba Đình', value: 'Ba Đình' },
    { label: 'Quận Hai Bà Trưng', value: 'Hai Bà Trưng' },
    { label: 'Quận Hoàng Mai', value: 'Hoàng Mai' },
    { label: 'Quận Thanh Xuân', value: 'Thanh Xuân' },
    { label: 'Quận Long Biên', value: 'Long Biên' },
    { label: 'Quận Nam Từ Liêm', value: 'Nam Từ Liêm' },
    { label: 'Quận Bắc Từ Liêm', value: 'Bắc Từ Liêm' },
    { label: 'Quận Tây Hồ', value: 'Tây Hồ' },
    { label: 'Quận Cầu Giấy', value: 'Cầu Giấy' },
    { label: 'Quận Hà Đông', value: 'Hà Đông' },
    { label: 'Huyện Chương Mỹ', value: 'Chương Mỹ' },
    { label: 'Huyện Đan Phượng', value: 'Đan Phượng' },
    { label: 'Huyện Đông Anh', value: 'Đông Anh' },
    { label: 'Huyện Gia Lâm', value: 'Gia Lâm' },
    { label: 'Huyện Hoài Đức', value: 'Hoài Đức' },
    { label: 'Huyện Thạch Thất', value: 'Thạch Thất' },
    { label: 'Huyện Thanh Oai', value: 'Thanh Oai' },
    { label: 'Huyện Thanh Trì', value: 'Thanh Trì' },
  ];

  LOAICHUNGCU = [
    { label: 'Trung Cấp', value: 'trung cấp' },
    { label: 'Cao Cấp', value: 'cao cấp' },
  ];

  SOPHONG = [
    { label: '1', value: '1' },
    { label: '2', value: '2' },
    { label: '3', value: '3' },
    { label: '4', value: '4' },
    { label: '5', value: '5' },
    { label: '6', value: '6' },
    { label: '7', value: '7' },
    { label: '8', value: '8' },
    { label: '9', value: '9' },
  ];

  CHUDAUTU = [
    {
      label: "Tập Đoàn VinGroup",
      value: "tập đoàn vingroup",
    },
    {
      label: "Tân Hoàng Minh Group",
      value: "tân hoàng minh group",
    },
    {
      label: "Công ty CP Đầu tư Văn Phú - Invest",
      value: "công ty cp đầu tư văn phú - invest",
    },
    {
      label: "Doanh Nghiệp Tư Nhân Xây Dựng Số 1 Tỉnh Điện Biên",
      value: "doanh nghiệp tư nhân xây dựng số 1 tỉnh điện biên",
    },
    {
      label: "Công Ty TNHH Việt Hân",
      value: "công ty tnhh thương mại - quảng cáo - xây dựng - địa ốc việt hân",
    },
    {
      label: "Công ty CP Tập Đoàn Sunshine",
      value: "công ty cp tập đoàn sunshine",
    },
    {
      label: "Công ty CP Xuất Nhập Khẩu Tổng Hợp HN - Geleximco",
      value: "công ty cp xuất nhập khẩu tổng hợp hà nội - geleximco",
    },
    {
      label: "Công ty CP Tập Đoàn Nam Cường Hà Nội",
      value: "công ty cp tập đoàn nam cường hà nội",
    },
    {
      label: "Tổng Công Ty Đầu Tư Phát Triển Nhà Và Đô Thị Bộ Quốc Phòng",
      value: "tổng công ty đầu tư phát triển nhà và đô thị bộ quốc phòng",
    },
    {
      label: "Tổng Công Ty Đầu Tư Phát Triển Nhà Và Đô Thị HUD",
      value: "tổng công ty đầu tư phát triển nhà và đô thị hud",
    },
    {
      label: "Tổng Công Ty Đầu Tư Phát Triển Nhà Hà Nội - Handico",
      value: "tổng công ty đầu tư và phát triển nhà hà nội - handico",
    },
    {
      label: "Tổng Công Ty Đầu Tư Phát Triển Hạ Tầng Đô Thị - UDIC",
      value: "tổng công ty đầu tư phát triển hạ tầng đô thị - udic",
    },
    {
      label: "Tập Đoàn SunGroup",
      value: "tập đoàn sun group",
    },
    {
      label: "Công ty CP Sông Đà 7",
      value: "công ty cp sông đà 7",
    },
    {
      label: "Công ty CP Xây Dựng Số 2 - Vinaconex2",
      value: "công ty cp xây dựng số 2 - vinaconex2",
    },
    {
      label: "Công ty CP Đầu Tư Xây Dựng Số 9 Hà Nội",
      value: "công ty cp đầu tư xây dựng số 9 hà nội",
    },
    {
      label: "Công ty TNHH BĐS và Xây Dựng Việt Hưng",
      value: "công ty tnhh bất động sản và xây dựng việt hưng",
    },
    {
      label: "Công ty CP Tập Đoàn FLC",
      value: "công ty cổ phần tập đoàn flc",
    },
    {
      label: "Công ty CP Xây Dựng Và Thương Mại Bắc Hà",
      value: "công ty cp xây dựng và thương mại bắc hà",
    },
    {
      label: "Công ty TNHH Phát Triển Khu Đô Thị Nam Thăng Long",
      value: "công ty tnhh phát triển khu đô thị nam thăng long",
    }
  ];

  HUONGVIE = [
    { label: 'Đông', value: 'đông' },
    { label: 'Tây', value: 'tây' },
    { label: 'Nam', value: 'nam' },
    { label: 'Bắc', value: 'bắc' },
    { label: 'Đông - Bắc', value: 'đông-bắc' },
    { label: 'Tây - Bắc', value: 'tây-bắc' },
    { label: 'Tây - Nam', value: 'tây-nam' },
    { label: 'Đông - Nam', value: 'đông-nam' },
  ]

  HUONGENG = [
    { label: 'East', value: 'đông' },
    { label: 'West', value: 'tây' },
    { label: 'South', value: 'nam' },
    { label: 'North', value: 'bắc' },
    { label: 'East - North', value: 'đông-bắc' },
    { label: 'West - North', value: 'tây-bắc' },
    { label: 'West - South', value: 'tây-nam' },
    { label: 'East - South', value: 'đông-nam' },
  ]

  NOITHATVIE = [
    { label: 'Chưa Có', value: 'chưa có' },
    { label: 'Cơ Bản', value: 'cơ bản' },
    { label: 'Đầy Đủ', value: 'full' },
    { label: 'Cao Cấp', value: 'cao cấp' },
  ]
  NOITHATENG = [
    { label: 'No', value: 'chưa có' },
    { label: 'Basic', value: 'cơ bản' },
    { label: 'Full', value: 'full' },
    { label: 'Luxury', value: 'cao cấp' },
  ]


  onSubmit = async () => {
    const { ViTri, DienTich, ChuDauTu, SoPhongNgu, SoPhongTam, NoiThat, HuongNha, HuongBanCong, Loai, CachTrungTam, ApiChart } = this.state;

    //  call API
    Keyboard.dismiss();


    if (ViTri?.value && DienTich && SoPhongNgu?.value && SoPhongTam?.value) {

      const infoToApi = {
        district: ViTri.value !== 'choose' ? ViTri.value : null,
        acreage: DienTich ? parseFloat(DienTich) : null,
        numBedroom: SoPhongNgu ? parseInt(SoPhongNgu.label) : null,
        numBathroom: SoPhongTam ? parseInt(SoPhongTam.label) : null,

        // furniture: (NoiThat && NoiThat.value) ? NoiThat.value : "chưa có",
        // directionHome: (HuongNha && HuongNha.value) ? HuongNha.value : "bắc",
        // directionBalcony: (HuongBanCong && HuongBanCong.value) ? HuongBanCong.value : "bắc",
      }

      if (ChuDauTu && ChuDauTu.value && CachTrungTam) {
        Object.assign(infoToApi, { investor: (ChuDauTu && ChuDauTu.value) ? ChuDauTu.value : "other", });
      }

      if (CachTrungTam) {
        Object.assign(infoToApi, { farCenter: CachTrungTam ? parseFloat(CachTrungTam) : 5, });
      }

      this.setState({
        isLoading: true
      })

      console.log("infoToApi: ", infoToApi);

      await fetch('https://pxk-api.herokuapp.com/predictchart', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(infoToApi),
      })
        .then((response) => response.json())
        .then((responseJson) => {
          // console.log("predictchart: ");
          // console.log(responseJson);
          this.setState({
            ApiChart: responseJson
          })
        })
        .catch((err) => console.log("errors: " + err))

      await fetch('https://pxk-api.herokuapp.com/predict', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(infoToApi),
      })
        .then((response) => response.json())
        .then((responseJson) => {
          LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);

          console.log(responseJson);
          if (responseJson) {
            let dataFromApi = {
              pricePerM: responseJson.pricePerM,
              score: responseJson.score,
              totalPrice: responseJson.totalPrice,
            }
            const infoToHistory = {
              STT: 0,
              date: moment().format("LTS"),
              PreDictPercent: `${dataFromApi ? Math.ceil(responseJson.score * 100) : 0}%`,
              PricePredictM2: I18n.toNumber(dataFromApi.pricePerM * 1000000, { precision: 0 }),
              PricePredictHouse: I18n.toNumber(dataFromApi.pricePerM * 1000000 * parseFloat(DienTich), { precision: 0 }),
              district: ViTri.label ? ViTri.label : '-',
              // type: Loai.label ? Loai.label : '-',
              acreage: DienTich ? parseFloat(DienTich) : '-',
              investor: ChuDauTu.label ? ChuDauTu.label : '-',
              numBathroom: SoPhongTam.label ? parseInt(SoPhongTam.label) : '-',
              numBedroom: SoPhongNgu.label ? parseInt(SoPhongNgu.label) : '-',
              farCenter: CachTrungTam ? parseFloat(CachTrungTam) : '-',
              // furniture: NoiThat.label ? NoiThat.label : '-',
              // directionHome: HuongNha.label ? HuongNha.label : '-',
              // directionBalcony: HuongBanCong.label ? HuongBanCong.label : '-',
            };
            let { history } = this.state;
            history.unshift(infoToHistory);
            this.setState({
              isLoading: false,
              dataFromApi: dataFromApi,
              history: history
            })
          }
        })
        .catch((err) => console.log("errors: " + err))

      this.setState({
        isLoading: false,
      })
    };
  };

  changeVisibility(state) {
    this.setState({
      isVisibleQuanHuyen: false,
      isVisibleHuongNha: false,
      isVisibleHuongBanCong: false,
      isVisibleNoiThat: false,
      isVisibleLoai: false,
      isVisibleSoPhongNgu: false,
      isVisibleSoPhongTam: false,
      isVisibleChuDauTu: false,
      ...state
    });
  }

  renderContent = () => (
    <View
      style={{
        backgroundColor: '#7066f6',
        height: 300,
      }}
    >
      <HistoryTableScreen language={this.props.route.params.language} data={this.state.history} />
    </View>
  );


  onReset = () => {
    const { status } = this.state;
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    this.setState({
      DienTich: "",
      CachTrungTam: "",
      dataFromApi: null,
      status: {
        addButton: 0,
        ChuDauTu: false,
        CachTrungTam: false
      },
    })
    this.controllerViTri.reset();
    this.controllerSoPhongTam.reset();
    this.controllerSoPhongNgu.reset();

    if (status.ChuDauTu) this.controllerChuDauTu.reset();
    // if (status.Loai) this.controllerLoai.reset();
    // if (status.HuongBanCong) this.controllerHuongBanCong.reset();
    // if (status.HuongNha) this.controllerHuongNha.reset();
    // if (status.NoiThat) this.controllerNoiThat.reset();
  }

  toMap = () => {
    const { ViTri, DienTich, ChuDauTu, SoPhongNgu, SoPhongTam, NoiThat, HuongNha, HuongBanCong, Loai, CachTrungTam, dataFromApi } = this.state;
    const infoToMap = {
      language: this.props.route.params.language,
      district: ViTri.value !== 'choose' ? ViTri.value : null,
      acreage: DienTich ? parseFloat(DienTich) : null,
      numBedroom: SoPhongNgu ? parseInt(SoPhongNgu.label) : null,
      numBathroom: SoPhongTam ? parseInt(SoPhongTam.label) : null,
      investor: ChuDauTu ? ChuDauTu.value : null,
      farCenter: CachTrungTam ? parseFloat(CachTrungTam) : null,
      furniture: NoiThat ? NoiThat.value : null,
      directionHome: HuongNha ? HuongNha.value : null,
      directionBalcony: HuongBanCong ? HuongBanCong.value : null,
      pricePredict: dataFromApi ? dataFromApi.pricePerM : null,
      // type: Loai ? Loai.label : null,
      // date: moment().format("DD/MM/YYYY"),
    }
    this.props.navigation.navigate("Map", infoToMap);

    this.setState({
      modalMoreVisible: false
    });
  }

  toApiChartView = () => {
    const { ApiChart } = this.state;

    if (ApiChart.length > 0) {
      Alert.alert(
        'Xem API Chart',
        'Click để sang màn hình API Chart',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('OK Pressed'),
            style: 'cancel'
          },
          { text: 'OK', onPress: () => this.props.navigation.navigate("ApiChartView", ApiChart) }
        ],
        { cancelable: false }
      )
    } else {
      Alert.alert(
        'Nhập thông tin cần thiết để có thể xem data từ API',
        'Vui lòng nhập lại',
        [
          { text: 'OK' }
        ],
        { cancelable: false }
      )
    }

    // Alert.alert(
    //   'Nhập thông tin cần thiết để có thể xem data từ API',
    //   [
    //     {
    //       text: 'OK',
    //       style: 'cancel'
    //     },
    //   ],
    //   { cancelable: false }
    // )
  }

  render() {
    // console.log("lang:" ,this.props.route.params.language)
    const { language } = this.props.route.params;
    const { modalVisible, modalMoreVisible, status, DienTich, CachTrungTam, isLoading, dataFromApi, ApiChart } = this.state;
    return (
      <>
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS == "ios" ? "padding" : "height"}
        >
          {isLoading &&
            <View style={styles.loading}>
              <ActivityIndicator size='large' color="#7066f6" />
            </View>
          }
          {/* Header */}
          <StatusBar barStyle='light-content' />

          <View style={styles.headerWrapper}>
            <View style={styles.backBtnWrapper}>
              <TouchableOpacity
                onPress={() => this.props.navigation.goBack()}
                style={{ marginLeft: 16 }}
              >
                <Ionicons name="ios-arrow-back" size={40} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity
                style={{ marginRight: 10 }}
                onPress={() => this.toMap()}
              >
                <MaterialCommunityIcons name="google-maps" size={40} color="#fff" />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.priceWrapper}
              onPress={() => {
                this.sheetRef.current.snapTo(200);
                Keyboard.dismiss();
              }}
            >
              {dataFromApi ?
                <>
                  <View
                    style={{ flexDirection: "row" }}
                  >
                    {/* <Entypo name="price-tag" size={28} color="#fff" /> */}
                    {/* <MaterialCommunityIcons name="tilde" size={28} color="#fff" /> */}
                    {/* <Text style={styles.priceText}>{I18n.toNumber(dataFromApi.pricePerM * 1000000, { precision: 0 })} VNĐ</Text> */}
                    {/* Math.round(num * 100 + Number.EPSILON) / 100 */}
                    <Text style={styles.priceText}>~ {Math.round(dataFromApi?.pricePerM)} triệu VNĐ</Text>
                  </View>
                  <Text style={styles.priceTextSmall}>Giá Căn: {Math.round(dataFromApi?.totalPrice)} triệu VNĐ</Text>

                </> :
                <Text style={styles.noPriceText}>{language === "VIE" ? "Nhập 4 thông tin cần thiết" : "Enter 4 required information"}</Text>
                // <Entypo name="creative-commons-noncommercial-us" size={height * width / 15000} color="#fff" />
              }
            </TouchableOpacity>

            <View style={styles.refreshAndPercentWrapper}>
              <TouchableOpacity
                onPress={() => this.onReset()}
              >
                <EvilIcons name="refresh" size={50} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.toApiChartView()}
              >
                <ProgressCircle
                  percent={dataFromApi ? dataFromApi.score * 100 : 0}
                  radius={26}
                  borderWidth={6}
                  color="#f7877e"
                  bgColor="#7066f6"
                  shadowColor="#7066f6"
                >
                  <Text style={{ fontSize: 16, color: "#fff" }}>{dataFromApi ? Math.ceil(dataFromApi.score * 100) : 0}%</Text>
                </ProgressCircle>
              </TouchableOpacity>
            </View>
          </View>


          {/* Body */}


          <TouchableWithoutFeedback
            onPress={() => {
              Keyboard.dismiss();
              // this.changeVisibility(); // active thi khi scroll bi crack, disable visible
            }}
            style={{ flex: 1 }}
          >
            <ScrollView
              ref={(c) => { this._scroll = c; }}
              style={{ flex: 1 }}
            >

              <View style={styles.body}>

                <View style={styles.fieldWrapper}>

                  {/* Modal Status */}
                  <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                      Alert.alert('Modal has been closed.');
                    }}>
                    <View style={styles.centeredView}>
                      <View style={styles.modalView}>
                        <TouchableHighlight
                          style={styles.btnCloseModal}
                          onPress={() => {
                            this.setState({ modalVisible: !modalVisible })
                          }}>
                          <AntDesign name="close" size={40} color="#7066f6" />
                        </TouchableHighlight>
                        <Text style={styles.modalText}>{language === "VIE" ? "Bạn muốn chọn: " : "You want to choose: "}</Text>
                        <View style={styles.modalButtonWrapper}>

                          {!status.CachTrungTam &&
                            <TouchableHighlight
                              style={styles.modalButton}
                              onPress={() => {
                                LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
                                this.setState({ status: { ...status, addButton: status.addButton + 1, CachTrungTam: true }, modalVisible: false })
                              }}>
                              <Text style={styles.textStyle}>{language === "VIE" ? "Cách Trung Tâm" : "Far Center"}</Text>
                            </TouchableHighlight>
                          }
                          {!status.ChuDauTu &&
                            <TouchableHighlight
                              style={styles.modalButton}
                              onPress={() => {
                                LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
                                this.setState({ status: { ...status, addButton: status.addButton + 1, ChuDauTu: true }, modalVisible: false })
                              }}>
                              <Text style={styles.textStyle}>{language === "VIE" ? "Chủ Đầu Tư" : "Investor"}</Text>
                            </TouchableHighlight>
                          }


                          {/* disable btn */}
                          {/* {!status.Loai && */}
                          <TouchableHighlight
                            style={styles.modalButtonDisable}
                            disabled={true}
                            onPress={() => {
                              this.setState({ status: { ...status, addButton: status.addButton + 1, Loai: true }, modalVisible: false })
                            }}>
                            <Text style={styles.textStyle}>{language === "VIE" ? "Loại Chung Cư" : "Type of Apartment"}</Text>
                          </TouchableHighlight>
                          {/* }
                          {!status.HuongNha && */}
                          <TouchableHighlight
                            style={styles.modalButtonDisable}
                            disabled={true}
                            onPress={() => {
                              LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
                              this.setState({ status: { ...status, addButton: status.addButton + 1, HuongNha: true }, modalVisible: false })
                            }}>
                            <Text style={styles.textStyle}>{language === "VIE" ? "Hướng Nhà" : "Home Direction"}</Text>
                          </TouchableHighlight>
                          {/* }
                          {!status.HuongBanCong && */}
                          <TouchableHighlight
                            style={styles.modalButtonDisable}
                            disabled={true}
                            onPress={() => {
                              LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
                              this.setState({ status: { ...status, addButton: status.addButton + 1, HuongBanCong: true }, modalVisible: false })
                            }}>
                            <Text style={styles.textStyle}>{language === "VIE" ? "Hướng Ban Công" : "Balcony Direction"}</Text>
                          </TouchableHighlight>
                          {/* }
                          {!status.NoiThat && */}
                          <TouchableHighlight
                            style={styles.modalButtonDisable}
                            disabled={true}
                            onPress={() => {
                              LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
                              this.setState({ status: { ...status, addButton: status.addButton + 1, NoiThat: true }, modalVisible: false })
                            }}>
                            <Text style={styles.textStyle}>{language === "VIE" ? "Nội Thất" : "Furniture"}</Text>
                          </TouchableHighlight>
                          {/* } */}
                        </View>

                      </View>
                    </View>
                  </Modal>


                  <View style={{ zIndex: 200 }}>
                    <Text style={styles.text}>{language === "VIE" ? "Vị Trí: " : "District: "}</Text>
                    <DropDownPicker
                      items={this.QUANHUYEN}
                      placeholder={language === "VIE" ? "Chọn" : "Choose"}
                      controller={instance => this.controllerViTri = instance}
                      defaultValue={this.state.ViTri.value}
                      onChangeItem={(item, index) => {
                        this.setState({ ViTri: item },
                          () => {
                            if (item.value) this.onSubmit();
                          }
                        )
                      }}

                      zIndex={100}
                      containerStyle={styles.dropDown}
                      style={{ height: 500, width: widthElement }}
                      searchable={true}
                      searchablePlaceholder={language === "VIE" ? "Tìm Quận/Huyện" : "Find District"}
                      searchablePlaceholderTextColor="#7066f6"
                      searchableError={() => <Text>{language === "VIE" ? "Không Có" : "Not Found"}</Text>}
                      dropDownMaxHeight={330}
                      isVisible={this.state.isVisibleQuanHuyen}
                      onOpen={() => this.changeVisibility({
                        isVisibleQuanHuyen: true
                      })}
                      onClose={() => this.setState({
                        isVisibleQuanHuyen: false
                      })}
                    />
                  </View>

                  <View>
                    <Text style={styles.text}>{language === "VIE" ? "Diện Tích: " : "Acreage: "}</Text>
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
                      inputAccessoryViewID={inputAccessoryViewID}
                      value={DienTich}
                    />
                  </View>

                  <View style={{ zIndex: 190 }}>
                    <Text style={styles.text}>{language === "VIE" ? "Số Phòng Ngủ: " : "Bedroom Number: "}</Text>
                    <DropDownPicker
                      items={this.SOPHONG}
                      placeholder={language === "VIE" ? "Chọn" : "Choose"}
                      containerStyle={styles.dropDown}
                      style={{ height: 500, width: widthElement }}

                      controller={instance => this.controllerSoPhongNgu = instance}
                      defaultValue={this.state.SoPhongNgu.value}
                      onChangeItem={(item, index) => {
                        this.setState({ SoPhongNgu: item },
                          () => {
                            if (item.value) this.onSubmit();
                          }
                        )
                      }}

                      zIndex={100}
                      isVisible={this.state.isVisibleSoPhongNgu}
                      onOpen={() => this.changeVisibility({
                        isVisibleSoPhongNgu: true
                      })}
                      onClose={() => this.setState({
                        isVisibleSoPhongNgu: false
                      })}
                    />
                  </View>

                  <View style={{ zIndex: 190 }}>
                    <Text style={styles.text}>{language === "VIE" ? "Số Phòng Tắm: " : "Bathroom Number: "}</Text>
                    <DropDownPicker
                      items={this.SOPHONG}
                      placeholder={language === "VIE" ? "Chọn" : "Choose"}
                      containerStyle={styles.dropDown}
                      style={{ height: 500, width: widthElement }}

                      controller={instance => this.controllerSoPhongTam = instance}
                      defaultValue={this.state.SoPhongTam.value}
                      onChangeItem={(item, index) => {
                        this.setState({ SoPhongTam: item },
                          () => {
                            if (item.value) this.onSubmit();
                          }
                        )
                      }}

                      zIndex={100}
                      isVisible={this.state.isVisibleSoPhongTam}
                      onOpen={() => this.changeVisibility({
                        isVisibleSoPhongTam: true
                      })}
                      onClose={() => this.setState({
                        isVisibleSoPhongTam: false
                      })}
                    />
                  </View>


                  {/* {status.Loai &&
                    <View style={{ zIndex: 105 }}>
                      <Text style={styles.text}>Loại Chung Cư: </Text>
                      <DropDownPicker
                        items={this.LOAICHUNGCU}
                        placeholder={language === "VIE" ? "Chọn": "Choose"}
                        containerStyle={styles.dropDown}
                        style={{ height: 500, width: widthElement }}

                        controller={instance => this.controllerLoai = instance}
                        defaultValue={this.state.Loai.value}
                        onChangeItem={(item, index) => {
                          this.setState({ Loai: item },
                            () => {
                              if (item.value) this.onSubmit();
                            }
                          )
                        }}

                        zIndex={100}
                        isVisible={this.state.isVisibleLoai}
                        onOpen={() => this.changeVisibility({
                          isVisibleLoai: true
                        })}
                        onClose={() => this.setState({
                          isVisibleLoai: false
                        })}
                      />
                    </View>
                  } */}

                  {/* {status.HuongNha &&
                    <View style={{ zIndex: 100 }}>
                      <Text style={styles.text}>{language === "VIE" ? "Hướng Nhà: " : "Home Direction: "}</Text>
                      <DropDownPicker
                        items={language === "VIE" ? this.HUONGVIE : this.HUONGENG}
                        placeholder={language === "VIE" ? "Tất cả các hướng" : "All directions"}
                        containerStyle={styles.dropDown}
                        // style={styles.dropDown}
                        dropDownStyle={styles.dropDown1}

                        controller={instance => this.controllerHuongNha = instance}
                        defaultValue={this.state.HuongNha.value}
                        onChangeItem={(item, index) => {
                          this.setState({ HuongNha: item },
                            () => {
                              if (item.value) this.onSubmit();
                            }
                          )
                        }}

                        zIndex={100}
                        dropDownMaxHeight={220}
                        isVisible={this.state.isVisibleHuongNha}
                        onOpen={() => this.changeVisibility({
                          isVisibleHuongNha: true
                        })}
                        onClose={() => this.setState({
                          isVisibleHuongNha: false
                        })}
                      />
                    </View>
                  }

                  {status.HuongBanCong &&
                    <View style={{ zIndex: 100 }}>
                      <Text style={styles.text}>{language === "VIE" ? "Hướng Ban Công: " : "Balcony Direction: "}</Text>
                      <DropDownPicker
                        items={language === "VIE" ? this.HUONGVIE : this.HUONGENG}
                        placeholder={language === "VIE" ? "Tất cả các hướng" : "All directions"}
                        containerStyle={styles.dropDown}
                        // style={styles.dropDown}
                        dropDownStyle={styles.dropDown1}
                        controller={instance => this.controllerHuongBanCong = instance}
                        defaultValue={this.state.HuongBanCong.value}
                        onChangeItem={(item, index) => {
                          this.setState({ HuongBanCong: item },
                            () => {
                              if (item.value) this.onSubmit();
                            }
                          )
                        }}
                        zIndex={100}
                        dropDownMaxHeight={220}
                        isVisible={this.state.isVisibleHuongBanCong}
                        onOpen={() => {
                          this.changeVisibility({
                            isVisibleHuongBanCong: true
                          })
                          this._scroll.scrollToEnd();
                        }}
                        onClose={() => this.setState({
                          isVisibleHuongBanCong: false
                        })}
                      />
                    </View>
                  } */}

                  {/* {status.NoiThat &&
                    <View style={{ zIndex: 90 }}>
                      <Text style={styles.text}>{language === "VIE" ? "Nội Thất: " : "Furniture: "}</Text>
                      <DropDownPicker
                        items={language === "VIE" ? this.NOITHATVIE : this.NOITHATENG}
                        placeholder={language === "VIE" ? "Chọn" : "Choose"}
                        containerStyle={styles.dropDown}
                        controller={instance => this.controllerNoiThat = instance}
                        defaultValue={this.state.NoiThat.value}
                        onChangeItem={(item, index) => {
                          this.setState({ NoiThat: item },
                            () => {
                              if (item.value) this.onSubmit();
                            }
                          )
                        }}
                        zIndex={10}
                        isVisible={this.state.isVisibleNoiThat}
                        onOpen={() => this.changeVisibility({
                          isVisibleNoiThat: true
                        })}
                        onClose={() => this.setState({
                          isVisibleNoiThat: false
                        })}
                      />
                    </View>
                  } */}

                  {status.CachTrungTam &&
                    <View>
                      <Text style={styles.text}>{language === "VIE" ? "Cách Trung Tâm: " : "Far Center: "}</Text>
                      <TextInput
                        onFocus={() => {
                          this.changeVisibility();
                        }}
                        style={styles.textInput}
                        placeholder="km"
                        selectionColor="#7066f6"
                        color="#7066f6"
                        onChangeText={text => this.setState({ CachTrungTam: text })}
                        value={CachTrungTam}
                        keyboardType="numeric"
                        inputAccessoryViewID={inputAccessoryViewID}
                      />
                    </View>
                  }

                  {status.ChuDauTu &&
                    <View style={{ zIndex: 110 }}>
                      <Text style={styles.text}>{language === "VIE" ? "Chủ Đầu Tư: " : "Investor: "}</Text>
                      <DropDownPicker
                        items={this.CHUDAUTU}
                        placeholder={language === "VIE" ? "Chọn" : "Choose"}
                        containerStyle={styles.dropDown}
                        style={{ height: 500, width: widthElement }}

                        controller={instance => this.controllerChuDauTu = instance}
                        defaultValue={this.state.ChuDauTu.value}
                        onChangeItem={(item, index) => {
                          this.setState({ ChuDauTu: item },
                            () => {
                              if (item.value) this.onSubmit();
                            }
                          )
                        }}

                        zIndex={100}
                        searchable={true}
                        searchablePlaceholder={language === "VIE" ? "Tìm Chủ Đầu Tư" : "Find Investor"}
                        searchablePlaceholderTextColor="#7066f6"
                        searchableError={() => <Text>{language === "VIE" ? "Không Có" : "Not Found"}</Text>}
                        dropDownMaxHeight={330}
                        isVisible={this.state.isVisibleChuDauTu}
                        onOpen={() => this.changeVisibility({
                          isVisibleChuDauTu: true
                        })}
                        onClose={() => this.setState({
                          isVisibleChuDauTu: false
                        })}
                      />
                    </View>
                  }

                  {status.addButton < 2 &&
                    <View style={styles.addButton}>
                      <TouchableOpacity
                        onPress={() => {
                          this.setState({ modalVisible: true })
                          this.sheetRef.current.snapTo(0);
                        }}
                      >
                        <AntDesign name="pluscircle" size={36} color="#7066f6" />
                      </TouchableOpacity>
                    </View>
                  }
                  <View
                    style={styles.box}
                  ></View>

                </View>
              </View>
            </ScrollView>
          </TouchableWithoutFeedback>

          {/* InputAccessoryView */}
          <InputAccessoryView
            nativeID={inputAccessoryViewID}
          >
            <View
              style={styles.btnFindWrapper}
            >
              <TouchableOpacity
                onPress={() => this.onSubmit()}
                style={styles.btnFind}
              >
                <FontAwesome5 name="search-dollar" size={30} color="white" />
              </TouchableOpacity>
            </View>
          </InputAccessoryView>
        </KeyboardAvoidingView>
        <BottomSheet
          ref={this.sheetRef}
          snapPoints={[0, 200, 300]}
          borderRadius={10}
          renderContent={this.renderContent}
        />
      </>
    );

  };
}

const styles = StyleSheet.create({

  box: {
    height: 400,
    width: "100%",
    // backgroundColor: "green"
  },

  // loading

  loading: {
    position: 'absolute',
    zIndex: 10000000,
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "rgba(255, 255, 255, 0.6)"
  },

  //modal
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
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
  modalMoreView: {
    height: height / 4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around"
  },
  modalMoreViewItem: {
    alignItems: "center"
  },
  modalMoreViewText: {
    marginTop: 3,
    color: "#7066f6",
    fontWeight: "600"
  },
  btnCloseModal: {
    alignSelf: "flex-end",
    marginTop: 10,
    marginRight: 10
  },
  modalButton: {
    backgroundColor: '#7066f6',
    borderRadius: 20,
    padding: 15,
    marginTop: 10,
    marginLeft: 10
  },
  modalButtonDisable: {
    backgroundColor: "#dddddd",
    borderRadius: 20,
    padding: 15,
    marginTop: 10,
    marginLeft: 10
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: "600",
    color: '#7066f6',
  },
  modalButtonWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingBottom: 16
  },
  //header

  headerWrapper: {
    backgroundColor: '#7066f6', // 
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 5,
    paddingBottom: 10,
  },

  // body
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    // marginBottom: 200
    // marginTop: Constant.statusBarHeight,
  },


  backBtnWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
    marginTop: Constant.statusBarHeight,

  },
  body: {
    flex: 1,
    alignItems: "center",
    fontSize: 50,
    // backgroundColor: "green"
  },

  priceWrapper: {
    alignSelf: "center",
    width: width / 1.5,
    justifyContent: "center",
    marginTop: -15,
    // backgroundColor: "pink"
    // borderBottomWidth:10,
    // borderBottomColor: "red"
  },
  priceText: {
    fontSize: 28,
    fontWeight: "700",
    color: "#fff",
    marginLeft: 10,
  },
  noPriceText: {
    fontSize: 28,
    fontWeight: "700",
    color: "#fff",
    alignSelf: "center",
    textAlign: "center"
  },
  priceTextSmall: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
    marginTop: 8,
    alignSelf: "flex-end"
  },
  refreshAndPercentWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginRight: 10,
    marginLeft: 10
  },
  text: {
    fontSize: 16,
    fontWeight: "500",
    color: "#7066f6",
    marginLeft: 10,
    marginTop: 20
  },
  fieldWrapper: {
    flex: 1,
    flexWrap: "wrap",
    flexDirection: "row",
    zIndex: 10,
    width: '100%'
  },
  dropDown: {
    width: widthElement,
    height: 50,
    marginTop: 10,
    marginHorizontal: 5,

  },
  textInput: {
    width: widthElement,
    height: 50,
    borderRadius: 7,
    paddingLeft: 10,
    paddingRight: 10,
    borderWidth: 1,
    borderColor: "#7066f6",
    marginTop: 10,
    marginHorizontal: 5,
    fontSize: 20
  },
  addButton: {
    width: widthElement,
    height: 80,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10
  },
  textInputDes: {
    width: width / 1.1,
    height: height / 6,
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

  btnFindWrapper: {
    alignItems: "flex-end",
    marginBottom: 5,
    paddingRight: 10
  },
  btnFind: {
    backgroundColor: "#7066f6",
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    width: width / 3.5,
    borderRadius: 30,
  },
  testWrapper1: {
    zIndex: 100
  },
  testWrapper2: {
    zIndex: 1
  },


});
