
// has scroll and mo ta

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
  Platform,
  Modal,
  TouchableHighlight
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import DropDownPicker from 'react-native-dropdown-picker';
import Constant from 'expo-constants';
import { AntDesign, MaterialCommunityIcons, Ionicons, FontAwesome5, Entypo } from '@expo/vector-icons';
import constants from './../Constants';

const width = constants.windowWidth;
const height = constants.windowHeight;
const widthElement = 0.47 * constants.windowWidth;

export default class ChungCuTestScreen extends React.Component {

  state = {
    ChuDauTu: "",
    DienTich: "",
    SoPhong: "",
    Huong: "",
    NoiThat: "",
    Gia: "",
    price: "",
    isShown: false,
    MoTa: "",
    ViTri: "",
    Loai: "",
    isVisibleA: false,
    isVisibleB: false,
    isVisibleC: false,
    isVisibleD: false,
    isVisibleSoPhong: false,
    isVisibleChuDauTu: false,
    modalVisible: false,
    count: 0,
    status: {
      addButton: 0,
      Gia: false,
      Huong: false,
      NoiThat: false,
      ChuDauTu: false,
      MoTa: false,
      SoPhong: false
    }
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
    { label: 'Thị Xã Sơn Tây', value: 'Sơn Tây' },
    { label: 'Huyện Ba Vì', value: 'Ba Vì' },
    { label: 'Huyện Chương Mỹ', value: 'Chương Mỹ' },
    { label: 'Huyện Phúc Thọ', value: 'Phúc Thọ' },
    { label: 'Huyện Đan Phượng', value: 'Đan Phượng' },
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

  LOAICHUNGCU = [
    { label: 'Thông Thường', value: '' },
    { label: 'Trung', value: '' },
    { label: 'Cao Cấp', value: '' },
  ];

  SOPHONG = [
    { label: '1', value: '' },
    { label: '2', value: '' },
    { label: '3', value: '' },
    { label: '4', value: '' },
    { label: '5', value: '' },
    { label: '6', value: '' },
    { label: '7', value: '' },
    { label: '8', value: '' },
    { label: '9', value: '' },
  ];

  CHUDAUTURAW = [
  //   'Công ty CP tập đoàn S.S.G',
  //   'Tập đoàn Vingroup',
  //   'Tân Hoàng Minh Group',
  //   'Tổng công ty Đầu tư Phát triển Hạ tầng đô thị - UDIC',
  //   'Công ty TNHH Thương mại - Quảng cáo - Xây dựng - Địa ốc Việt Hân',
  //   'Công ty CP Xây dựng số 2 - Vinaconex2',
  //   'Công ty CP Xuất nhập khẩu tổng hợp Hà Nội - Geleximco',
  //   'Công ty TNHH MTV đầu tư Phương Đông', 'Công ty CP Tập đoàn Sunshine',
  //   'Tổng Công ty Viglacera', 'Công ty TNHH Thiên Hương', 'Tập đoàn CapitaLand',
  //   'Tập đoàn Jaccar Bourbon', 'HD Mon Holdings', 'Công ty TNHH Indochina Land',
  //   'Công ty CP Terra Gold Việt Nam', 'Công ty Cổ phần Tập đoàn FLC',
  //   'Công ty TNHH Gamuda Land Việt Nam',
  //   'Công ty CP Xây dựng và Thương mại Bắc Hà',
  //   'Công ty xây dựng 319 Bộ Quốc phòng', 'Công ty Booyoung',
  //   'Công ty CP Đầu tư và Thương mại Thủ Đô',
  //   'Công ty TNHH phát triển khu đô thị Nam Thăng Long',
  //   'Công ty CP Tập đoàn Nam Cường Hà Nội',
  //   'Công ty CP Đầu tư và Phát triển nhà số 6 Hà Nội',
  //   'Công ty TNHH Phát triển T.H.T', 'Công ty CP Đầu tư Lạc Hồng',
  //   'Công ty CP Đầu tư - Thiết kế và Xây dựng Việt Nam', 'C.T Group',
  //   'Công ty Đầu tư Xây dựng số 2 Hà Nội',
  //   'Công ty CP Đầu tư Bất động sản Đông Đô - BQP',
  //   'Công ty CP Hóa Dầu Quân Đội', 'Công ty CP Xây lắp Điện 1',
  //   'Công ty CP Đầu tư Dầu khí Toàn cầu',
  //   'Công ty TNHH Đầu tư Xây dựng và Phát triển Hạ tầng',
  //   'Công ty CP Đầu tư Phú Thượng',
  //   'Công ty CP Đầu tư Phát triển Đô thị Thăng Long',
  //   'Công ty CP ACC - Thăng Long', 'Công ty CP Đầu tư Văn Phú - Invest',
  //   'Công ty CP Phát triển Đô thị Quốc tế Việt  Nam',
  //   'Công ty CP Đầu tư Đồng Phát', 'Công ty CP Đầu tư Xây dựng số 9 Hà Nội',
  //   'Bộ Tham Mưu - Bộ Tư Lệnh Bộ Đội Biên Phòng', 'Tập đoàn Hòa Phát',
  //   'Công ty TNHH Nhà nước MTV Kinh doanh Dịch vụ nhà Hà Nội',
  //   'Công ty CP Tháp nước Hà Nội',
  //   'Công ty CP Đầu tư Kinh doanh và Phát triển hạ tầng KCN Phúc Hà',
  //   'Công ty CP tập đoàn Đầu tư Ba Đình (B.I.G)',
  //   'Công ty CP Thương mại Minh Vĩnh Khang',
  //   'Tổng Công ty Đầu Tư và Phát Triển Nhà Hà Nội - Handico',
  //   'Doanh nghiệp tư nhân xây dựng số 1 tỉnh Điện Biên',
  //   'Công ty CP Đầu tư Thương mại Dịch vụ Cầu Giấy',
  //   'Công ty CP Thương mại và Dịch vụ Tổng hợp An Bình',
  //   'Tổng công ty CP Xuất nhập khẩu và Xây dựng Việt Nam',
  //   'Công ty CP Xây dựng Sông Hồng - Incomex',
  //   'OCEAN GROUP - Tập Đoàn Đại Dương', 'Công ty CP Bất động sản Hải Phát',
  //   'Tổng Công ty Đầu tư phát triển nhà và đô thị Bộ Quốc Phòng',
  //   'Công ty CP Sông Đà 7', 'Công ty CP Xây dựng số 3 - VINACONEX3',
  //   'Công ty CP Đầu tư Xây dựng Dân dụng Hà Nội',
  //   'Công ty Cổ phần Đầu tư Mai Linh', 'Tổng Công ty CP Thương mại Xây dựng',
  //   'Công ty CP Tập đoàn Xây dựng và Thiết bị Công nghiệp CIE Corp',
  //   'Tổng Công ty Đầu tư Phát triển Nhà và Đô thị HUD',
  //   'Công ty CP Hạ tầng và Bất động sản Việt Nam',
  //   'Công ty CP Đầu tư và Phát triển Thương mại Kinh Đô',
  //   'Công ty CP Đầu tư Xây dựng Phát triển nhà số 7 Hà Nội',
  //   'Công ty TSQ Việt Nam', 'Công ty CP Ngôi sao An Bình', 'Công ty CP Vimeco',
  //   'Công ty CP Phát triển tài trợ  Địa ốc R.C',
  //   'Tổng công ty đầu tư phát triển nhà và đô thị Bộ Quốc Phòng',
  // 'Công ty CP Tu tạo và Phát triển nhà - Handico', 'Tập đoàn Hà Đô',
  //   'Công ty TNHH Bất động sản và Xây dựng Việt Hưng',
  // 'Tập đoàn Keangnam Enterprise', 'Tập đoàn Mường Thanh',
  // 'Công ty CP Tập đoàn T&T', 'Công ty CP Sông Đà Thăng Long',
  // 'Tập đoàn Sun Group' ,'Công ty TNHH Bánh kẹo Thăng Long',
  // 'Công ty CP Sông Đà - Hoàng Long', 'Công ty Xây dựng Dân Dụng',
  // 'Công ty CP Đầu tư và Xây dựng HUD3' ,'Công ty TNHH Hibrand Việt Nam',
  // 'Công ty CP may Hồ Gươm - HOGARSCO',
  // 'Công ty CP Đầu tư Phát triển Đô thị và KCN Sông Đà - Sudico',
  // 'Tổng công ty Cơ khí Xây dựng - Coma',
  // 'Công ty CP Đầu tư Xây dựng BĐS Lanmak', 'Công ty TNHH Xuân Phương',
  // 'Công ty CP Đại Việt Trí Tuệ' ,'Công ty CP Đầu tư Hải Phát',
  // 'Công ty CP Đầu tư và Xây dựng Xuân Mai' ,'Tập đoàn Bitexco',
  // 'Tổng công ty Xây dựng Hà Nội', 'Công ty CP Xây dựng Phục Hưng Holdings',
  // 'Tập đoàn Tecco' ,'Xí nghiệp Xây dựng Tư nhân Số 1 Lai Châu',
  // 'Công ty CP Phát triển Đô thị Từ Liêm - LIDECO, JSC',
  // 'Công ty TNHH Khách sạn Kinh Đô' ,'Công ty CP Hoa Anh Đào',
  // 'Công ty TNHH Quốc tế Liên doanh VINACONEX – TAISEI',
  // 'Công ty CP Bất động sản Hanovid',
  // 'Công ty CP Đầu tư Phát triển nhà Gia Bảo',
  // 'Công ty CP Eurowindow Holding',
  // 'Công ty CP Đầu tư và Phát triển Hòa Bình - HBI' ,'Tổng công ty 789',
  // 'Công ty CP Đầu tư và Xây dựng số 1 Hà Nội', 'Công ty CP Đầu tư Hải Đăng',
  // 'Công ty CP Đầu tư Hải Phát Thủ Đô',
  // 'Công ty CP Đầu tư Xây dựng Hạ tầng và Giao Thông',
  // 'Tổng công ty Phát triển Phát thanh Truyền hình Thông tin Emico',
  // 'Công ty CP Thanh Bình Hà Nội', 'Công ty CP Xây dựng và Kỹ thuật Việt Nam',
  // 'Công ty CP TID', 'Công ty CP Đầu tư Bất động sản Hapulico',
  // 'Công ty CP Đầu tư Bất động sản Phú Mỹ', 'Công ty CP BIC Việt Nam',
  // 'Công ty CP Đầu tư và Phát triển Đô thị Long Giang',
  // 'Công ty TNHH 19-12 Bắc Hà',
  // 'Công ty CP Đầu tư và Xây dựng Quốc tế Vigeba', 'Công ty Cổ phần Tasco',
  // 'Công ty CP Đầu tư Phát triển Nhà Thăng Long - Việt Nam',
  // 'Tổng công ty 36 - Bộ quốc phòng',
  // 'Công ty CP Đầu tư và Thương mại Thăng Long',
  // 'Công ty CP Đầu tư và Xuất nhập khẩu Mỹ Sơn',
  // 'Công ty CP Đầu tư Xây dựng Vinaconex - PVC', 'Công ty CP Đầu tư An Lạc',
  // 'Công ty CP Xây dựng và Phát triển Hạ tầng Đô thị - BID Việt Nam',
  // 'Công ty Xây dựng số 3 Hà Nội',
  // 'Công ty CP Đầu tư Hạ tầng và Công trình Kiến trúc Hà Nội',
  // 'Tổng Công ty CP Đầu tư Xây dựng và Thương mại Việt Nam',
  // 'Công ty CP đầu tư xây dựng và phát triển nhà số 5',
  // 'Công ty CP Đầu Tư Xây Dựng và Phát Triển Đô Thị Sông Đà',
  // 'Công ty CP Xây dựng số 7',
  // 'Công ty TNHH Một thành viên quản lý và phát triển nhà Hà Nội',
  // 'Công ty CP Dịch vụ Hàng không Thăng Long',
  // 'Công ty CP Xây dựng Công nghiệp ICC', 'Công ty TNHH Hanotex',
  // 'Công ty CP Eco Land', 'Công ty CP Tập đoàn Bắc Hà',
  // 'Công ty CP Đầu tư Điện lực Hà Nội',
  // 'Công ty CP Đầu tư Dịch vụ Tài chính Hoàng Huy',
  // 'Công ty CP Phát triển Thanh Xuân',
  // 'Công ty CP Đầu tư xây dựng và phát triển Công nghệ cao - Decotech',
  // 'Công ty CP Đầu tư – Xây dựng Tây Hà',
  // 'Công ty CP Đầu tư Địa ốc Sông Hồng',
  // 'Công ty CP Đầu tư và Kinh doanh Bất động sản Hà Nội Sông Hồng',
  // 'Công ty CP Lộc Ninh' ,'Công ty CP Sản xuất và Xuất nhập khẩu Bao bì',
  // 'Công ty CP Đầu tư và Phát triển Hạ tầng VINACONEX - ALPHANAM',
  // 'Công ty CP Tư vấn & Đầu tư Xây dựng Đông Dương',
  // 'Công ty CP xây dựng số 1 Hà Nội', 'Tập đoàn Anh Quân Strong',
  // 'Công ty CP Đầu tư và Xây dựng HUD1',
  // 'Công ty CP Đầu tư Phát triển nhà và Xây dựng Tây Hồ',
  // 'Công ty CP Tập đoàn Trung Thủy' ,'Công ty CP Đầu tư Đô thị An Hưng',
  // 'Công ty CP Tòa nhà CFTD-VLA' ,'Công ty Cổ phần Địa ốc MB',
  // 'Công ty CP Xây dựng Số 1', 'Công ty CP Đầu tư Xây dựng NHS',
  // 'Công ty CP Tư vấn Đầu tư Dự án Quốc tế',
  // 'Công ty CP Cơ khí Xây dựng Đại Mỗ - Coma 6',
  // 'Công ty CP thương mại Cầu Giấy CTM' ,'Công ty CP Licogi 13',
  // 'Công ty CP Lắp Máy Điện nước và Xây Dựng' ,'Công ty TNHH Khải Hưng',
  // 'Công ty CP Bất động sản Dầu khí - Petrowaco',
  // 'Công ty CP Đầu tư và Phát triển nhà Hà Nội 22 (Handico 22)',
  // 'Công ty CP Đầu tư phát triển nhà Constrexim',
  // 'Công ty CP Đầu tư Sài Gòn - Hà Nội', 'Công ty CP Nông sản Agrexim',
  // 'Công ty CP đầu tư phát triển nhà và đô thị VINACONEX',
  // 'Công Ty CP Đầu Tư Xây Dựng Và Địa Ốc  An Việt Hưng',
  // 'Công ty CP Đầu tư và Xây dựng Tân Việt', 'Công ty CP Sông Đà 1.01',
  // 'Công ty CP Thi công cơ giới xây lắp' ,'Tổng công ty CP Phong Phú',
  // 'Công ty Đầu tư phát triển công trình Du lịch - Detuorpro',
  // 'Tổng Công ty xây dựng công trình giao thông 1',
  // 'Công ty CP Xây dựng Công nghiệp - DESCON',
  // 'Tổng công ty Xây dựng Thanh Hóa - Công ty Cổ phần',
  // 'Công ty Thương mại Dịch vụ Tràng Thi',
  // 'Công ty CP Đầu tư Bất động sản Hà Nội',
  // 'Công ty CP Xây dựng và Phát triển Đô thị Hòa Phát',
  // 'Công ty CP Y Dược Phẩm Vimedimex', 'Công ty CP Thiết bị Vật tư Du Lịch',
  // 'Công ty CP Bất động sản Megastar' ,'Công TNHH Bắc Chương Dương',
  // 'Công ty Cổ phần 118  – Momota', 'Công ty TNHH Thăng Long',
  // 'Công ty CP Đầu tư XD và xuất nhập khẩu Phục Hưng',
  // 'Công ty Cổ phần Licogi 12', 'Công ty Liên doanh Hà Việt – Tungshing',
  // 'Công ty Cổ phần Xây Dựng Số 5',
  // 'Công ty CP Đầu tư Bất động sản Quang Minh',
  // 'Công ty Cổ phần Cơ điện và Xây dựng Việt Nam',
  // 'Công ty TNHH Hyundai RNC Hà Tây',
  // 'Công ty Cổ phần Đầu tư Bất động sản An Bình',
  // 'Công ty CP Đầu tư Đô thị Kang Long',
  // 'Công ty CP quan hệ Quốc tế Đầu tư Sản xuất - Ciri',
  // 'Công ty CP Thương mại và Dịch vụ Tổng hợp Vinh Hạnh',
  // 'Công ty TNHH Đầu tư C.T.L' ,'Công ty CP Đầu tư - Xây dựng Hà Nội',
  // 'Công ty TNHH Hoà Bình', 'Công ty Thương mại Dịch vụ Thời trang Hà Nội',
  // 'Công ty CP đầu tư & xây dựng Ba Đình số 1',
  // 'Công ty CP Kinh doanh Phát triển nhà và Đô thị Hà Nội (HanHud)',
  // 'Công ty CP Sản xuất Dịch vụ Xuất nhập khẩu Từ Liêm',
  // 'Công ty TNHH Berjaya-Handico12' ,'Công ty CP tư vấn Thủy Lợi Hà Tây',
  // 'Công ty CP Xây dựng Bảo tàng Hồ Chí Minh' ,'Tổng công ty Thái Sơn',
  // 'TTTM XNK Hàng tiêu dùng và Thủ công Mỹ nghệ Hà Nội',
  // 'Công ty CP Bất động sản AZ (AZ Land)',
  // 'Công ty TNHH Xây dựng và Thương mại Bình Vượng',
  // 'Tổng Công ty Lắp máy Việt Nam',
  // 'Công ty TNHH Nhà nước một thành viên Thăng Long GTC',
  // 'Công ty TNHH MTV Đầu  tư Xây lắp và Phát triển Nhà' ,'Công ty CP Him Lam',
  // 'Công ty Cổ phần Xây dựng số 12 - Vinaconex 12',
  // 'Công ty CP Đầu tư Phát triển Hà Thành', 'Công ty CP Tân Phú Long',
  // 'Công ty CP tập đoàn ĐTXD phát triển Đông Đô - BQP',
  // 'Công ty CP May Thăng Long', 'Công ty Cổ phần TASCO',
  // 'Công ty CP Kỹ nghệ và Hạ tầng Talin' ,'Công ty CP Đầu tư 135',
  // 'Công ty CP Xuất nhập khẩu Tổng hợp I Việt Nam',
  // 'Công ty CP Thương mại Hà Tây' ,'Công ty CP Tập đoàn Xây dựng Nhà Đất',
  // 'Công ty CP Vật tư Vận tải Xi măng' ,'Công ty CP Trần Hưng Đạo',
  // 'Công ty CP Xây dựng Lắp máy Điện nước Hà Nội', 'Công ty CP SME Hoàng Gia',
  // 'Công ty TNHH Đá quý Thế giới',
]

  CHUDAUTU = [
    {label: "Công ty CP tập đoàn S.S.G"},
    {label: "Tập đoàn Vingroup"},
    {label: "Tân Hoàng Minh Group"},
    {label: "Tổng công ty Đầu tư Phát triển Hạ tầng đô thị - UDIC"},
    {label: "Công ty TNHH Thương mại - Quảng cáo - Xây dựng - Địa ốc Việt Hân"},
    {label: "Công ty CP Xây dựng số 2 - Vinaconex2"},
    {label: "Công ty CP Xuất nhập khẩu tổng hợp Hà Nội - Geleximco"},
    {label: "Công ty TNHH MTV đầu tư Phương Đông"},
    {label: "Công ty CP Tập đoàn Sunshine"},
    {label: "Tổng Công ty Viglacera"},
    {label: "Công ty TNHH Thiên Hương"},
    {label: "Tập đoàn CapitaLand"},
    {label: "Tập đoàn Jaccar Bourbon"},
    {label: "HD Mon Holdings"},
    {label: "Công ty TNHH Indochina Land"},
    {label: "Công ty CP Terra Gold Việt Nam"},
    {label: "Công ty Cổ phần Tập đoàn FLC"},
    {label: "Công ty TNHH Gamuda Land Việt Nam"},
    {label: "Công ty CP Xây dựng và Thương mại Bắc Hà"},
    {label: "Công ty xây dựng 319 Bộ Quốc phòng"},
    {label: "Công ty Booyoung"},
    {label: "Công ty CP Đầu tư và Thương mại Thủ Đô"},
    {label: "Công ty TNHH phát triển khu đô thị Nam Thăng Long"},
    {label: "Công ty CP Tập đoàn Nam Cường Hà Nội"},
    {label: "Công ty CP Đầu tư và Phát triển nhà số 6 Hà Nội"},
    {label: "Công ty TNHH Phát triển T.H.T"},
    {label: "Công ty CP Đầu tư Lạc Hồng"},
    {label: "Công ty CP Đầu tư - Thiết kế và Xây dựng Việt Nam"},
    {label: "C.T Group"},
    {label: "Công ty Đầu tư Xây dựng số 2 Hà Nội"},
    {label: "Công ty CP Đầu tư Bất động sản Đông Đô - BQP"},
    {label: "Công ty CP Hóa Dầu Quân Đội"},
    {label: "Công ty CP Xây lắp Điện 1"},
    {label: "Công ty CP Đầu tư Dầu khí Toàn cầu"},
    {label: "Công ty TNHH Đầu tư Xây dựng và Phát triển Hạ tầng"},
    {label: "Công ty CP Đầu tư Phú Thượng"},
    {label: "Công ty CP Đầu tư Phát triển Đô thị Thăng Long"},
    {label: "Công ty CP ACC - Thăng Long"},
    {label: "Công ty CP Đầu tư Văn Phú - Invest"},
    {label: "Công ty CP Phát triển Đô thị Quốc tế Việt  Nam"},
    {label: "Công ty CP Đầu tư Đồng Phát"},
    {label: "Công ty CP Đầu tư Xây dựng số 9 Hà Nội"},
    {label: "Bộ Tham Mưu - Bộ Tư Lệnh Bộ Đội Biên Phòng"},
    {label: "Tập đoàn Hòa Phát"},
    {label: "Công ty TNHH Nhà nước MTV Kinh doanh Dịch vụ nhà Hà Nội"},
    {label: "Công ty CP Tháp nước Hà Nội"},
    {label: "Công ty CP Đầu tư Kinh doanh và Phát triển hạ tầng KCN Phúc Hà"},
    {label: "Công ty CP tập đoàn Đầu tư Ba Đình (B.I.G)"},
    {label: "Công ty CP Thương mại Minh Vĩnh Khang"},
    {label: "Tổng Công ty Đầu Tư và Phát Triển Nhà Hà Nội - Handico"},
    {label: "Doanh nghiệp tư nhân xây dựng số 1 tỉnh Điện Biên"},
    {label: "Công ty CP Đầu tư Thương mại Dịch vụ Cầu Giấy"},
    {label: "Công ty CP Thương mại và Dịch vụ Tổng hợp An Bình"},
    {label: "Tổng công ty CP Xuất nhập khẩu và Xây dựng Việt Nam"},
    {label: "Công ty CP Xây dựng Sông Hồng - Incomex"},
    {label: "OCEAN GROUP - Tập Đoàn Đại Dương"},
    {label: "Công ty CP Bất động sản Hải Phát"},
    {label: "Tổng Công ty Đầu tư phát triển nhà và đô thị Bộ Quốc Phòng"},
    {label: "Công ty CP Sông Đà 7"},
    {label: "Công ty CP Xây dựng số 3 - VINACONEX3"},
    {label: "Công ty CP Đầu tư Xây dựng Dân dụng Hà Nội"},
    {label: "Công ty Cổ phần Đầu tư Mai Linh"},
    {label: "Tổng Công ty CP Thương mại Xây dựng"},
    {label: "Công ty CP Tập đoàn Xây dựng và Thiết bị Công nghiệp CIE Corp"},
    {label: "Tổng Công ty Đầu tư Phát triển Nhà và Đô thị HUD"},
    {label: "Công ty CP Hạ tầng và Bất động sản Việt Nam"},
    {label: "Công ty CP Đầu tư và Phát triển Thương mại Kinh Đô"},
    {label: "Công ty CP Đầu tư Xây dựng Phát triển nhà số 7 Hà Nội"},
    {label: "Công ty TSQ Việt Nam"},
    {label: "Công ty CP Ngôi sao An Bình"},
    {label: "Công ty CP Vimeco"},
    {label: "Công ty CP Phát triển tài trợ  Địa ốc R.C"},
    {label: "Tổng công ty đầu tư phát triển nhà và đô thị Bộ Quốc Phòng"},
    {label: "Công ty CP Tu tạo và Phát triển nhà - Handico"},
    {label: "Tập đoàn Hà Đô"},
    {label: "Công ty TNHH Bất động sản và Xây dựng Việt Hưng"},
    {label: "Tập đoàn Keangnam Enterprise"},
    {label: "Tập đoàn Mường Thanh"},
    {label: "Công ty CP Tập đoàn T&T"},
    {label: "Công ty CP Sông Đà Thăng Long"},
    {label: "Tập đoàn Sun Group"},
    {label: "Công ty TNHH Bánh kẹo Thăng Long"},
    {label: "Công ty CP Sông Đà - Hoàng Long"},
    {label: "Công ty Xây dựng Dân Dụng"},
    {label: "Công ty CP Đầu tư và Xây dựng HUD3"},
    {label: "Công ty TNHH Hibrand Việt Nam"},
    {label: "Công ty CP may Hồ Gươm - HOGARSCO"},
    {label: "Công ty CP Đầu tư Phát triển Đô thị và KCN Sông Đà - Sudico"},
    {label: "Tổng công ty Cơ khí Xây dựng - Coma"},
    {label: "Công ty CP Đầu tư Xây dựng BĐS Lanmak"},
    {label: "Công ty TNHH Xuân Phương"},
    {label: "Công ty CP Đại Việt Trí Tuệ"},
    {label: "Công ty CP Đầu tư Hải Phát"},
    {label: "Công ty CP Đầu tư và Xây dựng Xuân Mai"},
    {label: "Tập đoàn Bitexco"},
    {label: "Tổng công ty Xây dựng Hà Nội"},
    {label: "Công ty CP Xây dựng Phục Hưng Holdings"},
    {label: "Tập đoàn Tecco"},
    {label: "Xí nghiệp Xây dựng Tư nhân Số 1 Lai Châu"},
    {label: "Công ty CP Phát triển Đô thị Từ Liêm - LIDECO, JSC"},
    {label: "Công ty TNHH Khách sạn Kinh Đô"},
    {label: "Công ty CP Hoa Anh Đào"},
    {label: "Công ty TNHH Quốc tế Liên doanh VINACONEX – TAISEI"},
    {label: "Công ty CP Bất động sản Hanovid"},
    {label: "Công ty CP Đầu tư Phát triển nhà Gia Bảo"},
    {label: "Công ty CP Eurowindow Holding"},
    {label: "Công ty CP Đầu tư và Phát triển Hòa Bình - HBI"},
    {label: "Tổng công ty 789"},
    {label: "Công ty CP Đầu tư và Xây dựng số 1 Hà Nội"},
    {label: "Công ty CP Đầu tư Hải Đăng"},
    {label: "Công ty CP Đầu tư Hải Phát Thủ Đô"},
    {label: "Công ty CP Đầu tư Xây dựng Hạ tầng và Giao Thông"},
    {label: "Tổng công ty Phát triển Phát thanh Truyền hình Thông tin Emico"},
    {label: "Công ty CP Thanh Bình Hà Nội"},
    {label: "Công ty CP Xây dựng và Kỹ thuật Việt Nam"},
    {label: "Công ty CP TID"},
    {label: "Công ty CP Đầu tư Bất động sản Hapulico"},
    {label: "Công ty CP Đầu tư Bất động sản Phú Mỹ"},
    {label: "Công ty CP BIC Việt Nam"},
    {label: "Công ty CP Đầu tư và Phát triển Đô thị Long Giang"},
    {label: "Công ty TNHH 19-12 Bắc Hà"},
    {label: "Công ty CP Đầu tư và Xây dựng Quốc tế Vigeba"},
    {label: "Công ty Cổ phần Tasco"},
    {label: "Công ty CP Đầu tư Phát triển Nhà Thăng Long - Việt Nam"},
    {label: "Tổng công ty 36 - Bộ quốc phòng"},
    {label: "Công ty CP Đầu tư và Thương mại Thăng Long"},
    {label: "Công ty CP Đầu tư và Xuất nhập khẩu Mỹ Sơn"},
    {label: "Công ty CP Đầu tư Xây dựng Vinaconex - PVC"},
    {label: "Công ty CP Đầu tư An Lạc"},
    {label: "Công ty CP Xây dựng và Phát triển Hạ tầng Đô thị - BID Việt Nam"},
    {label: "Công ty Xây dựng số 3 Hà Nội"},
    {label: "Công ty CP Đầu tư Hạ tầng và Công trình Kiến trúc Hà Nội"},
    {label: "Tổng Công ty CP Đầu tư Xây dựng và Thương mại Việt Nam"},
    {label: "Công ty CP đầu tư xây dựng và phát triển nhà số 5"},
    {label: "Công ty CP Đầu Tư Xây Dựng và Phát Triển Đô Thị Sông Đà"},
    {label: "Công ty CP Xây dựng số 7"},
    {label: "Công ty TNHH Một thành viên quản lý và phát triển nhà Hà Nội"},
    {label: "Công ty CP Dịch vụ Hàng không Thăng Long"},
    {label: "Công ty CP Xây dựng Công nghiệp ICC"},
    {label: "Công ty TNHH Hanotex"},
    {label: "Công ty CP Eco Land"},
    {label: "Công ty CP Tập đoàn Bắc Hà"},
    {label: "Công ty CP Đầu tư Điện lực Hà Nội"},
    {label: "Công ty CP Đầu tư Dịch vụ Tài chính Hoàng Huy"},
    {label: "Công ty CP Phát triển Thanh Xuân"},
    {label: "Công ty CP Đầu tư xây dựng và phát triển Công nghệ cao - Decotech"},
    {label: "Công ty CP Đầu tư – Xây dựng Tây Hà"},
    {label: "Công ty CP Đầu tư Địa ốc Sông Hồng"},
    {label: "Công ty CP Đầu tư và Kinh doanh Bất động sản Hà Nội Sông Hồng"},
    {label: "Công ty CP Lộc Ninh"},
    {label: "Công ty CP Sản xuất và Xuất nhập khẩu Bao bì"},
    {label: "Công ty CP Đầu tư và Phát triển Hạ tầng VINACONEX - ALPHANAM"},
    {label: "Công ty CP Tư vấn & Đầu tư Xây dựng Đông Dương"},
    {label: "Công ty CP xây dựng số 1 Hà Nội"},
    {label: "Tập đoàn Anh Quân Strong"},
    {label: "Công ty CP Đầu tư và Xây dựng HUD1"},
    {label: "Công ty CP Đầu tư Phát triển nhà và Xây dựng Tây Hồ"},
    {label: "Công ty CP Tập đoàn Trung Thủy"},
    {label: "Công ty CP Đầu tư Đô thị An Hưng"},
    {label: "Công ty CP Tòa nhà CFTD-VLA"},
    {label: "Công ty Cổ phần Địa ốc MB"},
    {label: "Công ty CP Xây dựng Số 1"},
    {label: "Công ty CP Đầu tư Xây dựng NHS"},
    {label: "Công ty CP Tư vấn Đầu tư Dự án Quốc tế"},
    {label: "Công ty CP Cơ khí Xây dựng Đại Mỗ - Coma 6"},
    {label: "Công ty CP thương mại Cầu Giấy CTM"},
    {label: "Công ty CP Licogi 13"},
    {label: "Công ty CP Lắp Máy Điện nước và Xây Dựng"},
    {label: "Công ty TNHH Khải Hưng"},
    {label: "Công ty CP Bất động sản Dầu khí - Petrowaco"},
    {label: "Công ty CP Đầu tư và Phát triển nhà Hà Nội 22 (Handico 22)"},
    {label: "Công ty CP Đầu tư phát triển nhà Constrexim"},
    {label: "Công ty CP Đầu tư Sài Gòn - Hà Nội"},
    {label: "Công ty CP Nông sản Agrexim"},
    {label: "Công ty CP đầu tư phát triển nhà và đô thị VINACONEX"},
    {label: "Công Ty CP Đầu Tư Xây Dựng Và Địa Ốc  An Việt Hưng"},
    {label: "Công ty CP Đầu tư và Xây dựng Tân Việt"},
    {label: "Công ty CP Sông Đà 1.01"},
    {label: "Công ty CP Thi công cơ giới xây lắp"},
    {label: "Tổng công ty CP Phong Phú"},
    {label: "Công ty Đầu tư phát triển công trình Du lịch - Detuorpro"},
    {label: "Tổng Công ty xây dựng công trình giao thông 1"},
    {label: "Công ty CP Xây dựng Công nghiệp - DESCON"},
    {label: "Tổng công ty Xây dựng Thanh Hóa - Công ty Cổ phần"},
    {label: "Công ty Thương mại Dịch vụ Tràng Thi"},
    {label: "Công ty CP Đầu tư Bất động sản Hà Nội"},
    {label: "Công ty CP Xây dựng và Phát triển Đô thị Hòa Phát"},
    {label: "Công ty CP Y Dược Phẩm Vimedimex"},
    {label: "Công ty CP Thiết bị Vật tư Du Lịch"},
    {label: "Công ty CP Bất động sản Megastar"},
    {label: "Công TNHH Bắc Chương Dương"},
    {label: "Công ty Cổ phần 118  – Momota"},
    {label: "Công ty TNHH Thăng Long"},
    {label: "Công ty CP Đầu tư XD và xuất nhập khẩu Phục Hưng"},
    {label: "Công ty Cổ phần Licogi 12"},
    {label: "Công ty Liên doanh Hà Việt – Tungshing"},
    {label: "Công ty Cổ phần Xây Dựng Số 5"},
    {label: "Công ty CP Đầu tư Bất động sản Quang Minh"},
    {label: "Công ty Cổ phần Cơ điện và Xây dựng Việt Nam"},
    {label: "Công ty TNHH Hyundai RNC Hà Tây"},
    {label: "Công ty Cổ phần Đầu tư Bất động sản An Bình"},
    {label: "Công ty CP Đầu tư Đô thị Kang Long"},
    {label: "Công ty CP quan hệ Quốc tế Đầu tư Sản xuất - Ciri"},
    {label: "Công ty CP Thương mại và Dịch vụ Tổng hợp Vinh Hạnh"},
    {label: "Công ty TNHH Đầu tư C.T.L"},
    {label: "Công ty CP Đầu tư - Xây dựng Hà Nội"},
    {label: "Công ty TNHH Hoà Bình"},
    {label: "Công ty Thương mại Dịch vụ Thời trang Hà Nội"},
    {label: "Công ty CP đầu tư & xây dựng Ba Đình số 1"},
    {label: "Công ty CP Kinh doanh Phát triển nhà và Đô thị Hà Nội (HanHud)"},
    {label: "Công ty CP Sản xuất Dịch vụ Xuất nhập khẩu Từ Liêm"},
    {label: "Công ty TNHH Berjaya-Handico12"},
    {label: "Công ty CP tư vấn Thủy Lợi Hà Tây"},
    {label: "Công ty CP Xây dựng Bảo tàng Hồ Chí Minh"},
    {label: "Tổng công ty Thái Sơn"},
    {label: "TTTM XNK Hàng tiêu dùng và Thủ công Mỹ nghệ Hà Nội"},
    {label: "Công ty CP Bất động sản AZ (AZ Land)"},
    {label: "Công ty TNHH Xây dựng và Thương mại Bình Vượng"},
    {label: "Tổng Công ty Lắp máy Việt Nam"},
    {label: "Công ty TNHH Nhà nước một thành viên Thăng Long GTC"},
    {label: "Công ty TNHH MTV Đầu  tư Xây lắp và Phát triển Nhà"},
    {label: "Công ty CP Him Lam"},
    {label: "Công ty Cổ phần Xây dựng số 12 - Vinaconex 12"},
    {label: "Công ty CP Đầu tư Phát triển Hà Thành"},
    {label: "Công ty CP Tân Phú Long"},
    {label: "Công ty CP tập đoàn ĐTXD phát triển Đông Đô - BQP"},
    {label: "Công ty CP May Thăng Long"},
    {label: "Công ty Cổ phần TASCO"},
    {label: "Công ty CP Kỹ nghệ và Hạ tầng Talin"},
    {label: "Công ty CP Đầu tư 135"},
    {label: "Công ty CP Xuất nhập khẩu Tổng hợp I Việt Nam"},
    {label: "Công ty CP Thương mại Hà Tây"},
    {label: "Công ty CP Tập đoàn Xây dựng Nhà Đất"},
    {label: "Công ty CP Vật tư Vận tải Xi măng"},
    {label: "Công ty CP Trần Hưng Đạo"},
    {label: "Công ty CP Xây dựng Lắp máy Điện nước Hà Nội"},
    {label: "Công ty CP SME Hoàng Gia"},
    {label: "Công ty TNHH Đá quý Thế giới"},
  ]



  onSubmit = () => {
    // const { ViTri, DienTich, ChuDauTu, SoPhong, NoiThat, Gia, Huong, MoTa, Loai } = this.state;
    // const info = {
    //   place: ViTri,
    //   acreage: DienTich,
    //   investor: ChuDauTu,
    //   bedNumber: SoPhong,
    //   furniture: NoiThat,
    //   price: Gia,
    //   direction: Huong,
    //   type: Loai,
    //   description: MoTa
    // }
    // console.log(info);
  }

  changeVisibility(state) {
    this.setState({
      isVisibleA: false,
      isVisibleB: false,
      isVisibleC: false,
      isVisibleD: false,
      isVisibleSoPhong: false,
      isVisibleChuDauTu: false,
      ...state
    });
  }

  render() {
    const { modalVisible, status } = this.state;
    return (

      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS == "ios" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss();
            this.changeVisibility();
          }}

        >

          <View style={{flex: 1}}>
            <ScrollView
            ref={(c) => { this._scroll = c; }}
            style={{flex: 1}}>
            <View style={styles.backBtnWrapper}>
              <TouchableOpacity
                onPress={() => this.props.navigation.goBack()}
                style={{ marginLeft: 16 }}
              >
                <Ionicons name="ios-arrow-back" size={40} color="#7066f6" />
              </TouchableOpacity>
              <TouchableOpacity
                // onPress={() => this.props.navigation.goBack()}
                style={{ marginRight: 10 }}
              >
                <MaterialCommunityIcons name="google-maps" size={40} color="#7066f6" />
              </TouchableOpacity>
            </View>
            <View style={styles.body}>


              <View style={styles.headerWrapper}>
                <Entypo name="price-tag" size={30} color="#7066f6" />
                <Text style={styles.textHeader}>Chung Cư</Text>
              </View>
              <View style={styles.fieldWrapper}>


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
                        style={styles.modalButton}
                        onPress={() => {
                          this.setState({ modalVisible: !modalVisible })
                        }}>
                        <Text style={styles.textStyle}>Đóng</Text>
                      </TouchableHighlight>
                      <Text style={styles.modalText}>Bạn muốn chọn: </Text>
                      <View style={styles.modalButtonWrapper}>
                      {!status.ChuDauTu &&
                          <TouchableHighlight
                            style={styles.modalButton}
                            onPress={() => {
                              this.setState({ status: { ...status, addButton: status.addButton + 1, ChuDauTu: true }, modalVisible: false })
                            }}>
                            <Text style={styles.textStyle}>Chủ Đầu Tư</Text>
                          </TouchableHighlight>
                        }
                        {!status.Gia &&
                          <TouchableHighlight
                            style={styles.modalButton}
                            onPress={() => {
                              this.setState({ status: { ...status, addButton: status.addButton + 1, Gia: true }, modalVisible: false })
                            }}>
                            <Text style={styles.textStyle}>Giá</Text>
                          </TouchableHighlight>
                        }
                        {!status.Huong &&
                          <TouchableHighlight
                            style={styles.modalButton}
                            onPress={() => {
                              this.setState({ status: { ...status, addButton: status.addButton + 1, Huong: true }, modalVisible: false })
                            }}>
                            <Text style={styles.textStyle}>Hướng Nhà</Text>
                          </TouchableHighlight>
                        }
                        {!status.NoiThat &&
                          <TouchableHighlight
                            style={styles.modalButton}
                            onPress={() => {
                              this.setState({ status: { ...status, addButton: status.addButton + 1, NoiThat: true }, modalVisible: false })
                            }}>
                            <Text style={styles.textStyle}>Nội Thất</Text>
                          </TouchableHighlight>
                        }
                        {!status.SoPhong &&
                          <TouchableHighlight
                            style={styles.modalButton}
                            onPress={() => {
                              this.setState({ status: { ...status, addButton: status.addButton + 1, SoPhong: true }, modalVisible: false })
                            }}>
                            <Text style={styles.textStyle}>Phòng Ngủ</Text>
                          </TouchableHighlight>
                        }
                        {!status.MoTa &&
                          <TouchableHighlight
                            style={styles.modalButton}
                            onPress={() => {
                              this.setState({ status: { ...status, addButton: status.addButton + 1, MoTa: true }, modalVisible: false })
                            }}>
                            <Text style={styles.textStyle}>Mô Tả</Text>
                          </TouchableHighlight>
                        }
                      </View>

                    </View>
                  </View>
                </Modal>


                <View style={{ zIndex: 110 }}>
                  <Text style={styles.text}>Vị Trí: </Text>
                  <DropDownPicker
                    items={this.QUANHUYEN}
                    placeholder="Chọn"
                    containerStyle={styles.dropDown}
                    style={{ height: 500, width: widthElement }}
                    onChangeItem={(item, index) => {
                      this.setState({ ViTri: item })
                    }}
                    zIndex={100}
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
                </View>

                <View style={{ zIndex: 105 }}>
                  <Text style={styles.text}>Loại Chung Cư: </Text>
                  <DropDownPicker
                    items={this.LOAICHUNGCU}
                    placeholder="Chọn"
                    containerStyle={styles.dropDown}
                    style={{ height: 500, width: widthElement }}
                    onChangeItem={(item, index) => {
                      this.setState({ Loai: item })
                    }}
                    zIndex={100}
                    isVisible={this.state.isVisibleD}
                    onOpen={() => this.changeVisibility({
                      isVisibleD: true
                    })}
                    onClose={() => this.setState({
                      isVisibleD: false
                    })}
                  />
                </View>

                {status.ChuDauTu &&
                  <View style={{ zIndex: 110 }}>
                    <Text style={styles.text}>Chủ Đầu Tư: </Text>
                    <DropDownPicker
                    items={this.CHUDAUTU}
                    placeholder="Chọn"
                    containerStyle={styles.dropDown}
                    style={{ height: 500, width: widthElement }}
                    onChangeItem={(item, index) => {
                      this.setState({ CHUDAUTU: item })
                    }}
                    zIndex={100}
                    searchable={true}
                    searchablePlaceholder="Tìm Chủ Đầu Tư"
                    searchablePlaceholderTextColor="#7066f6"
                    searchableError={() => <Text>Không có</Text>}
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


                {status.Gia &&
                  <View style={styles.testWrapper2}>
                    <Text style={styles.text}>Giá:</Text>
                    <TextInput
                      onFocus={() => {
                        this.changeVisibility();
                        this._scroll.scrollToEnd();
                      }}
                      style={styles.textInput}
                      placeholder="Theo m2"
                      selectionColor="#7066f6"
                      color="#7066f6"
                      value={this.state.Gia == 0 ? null : this.state.Gia}
                      keyboardType="numeric"
                      onChangeText={text => this.setState({ Gia: text })}
                    />
                  </View>
                }


                {status.Huong &&
                  <View style={{ zIndex: 105 }}>
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
                      zIndex={100}
                      dropDownMaxHeight={220}
                      isVisible={this.state.isVisibleB}
                      onOpen={() => this.changeVisibility({
                        isVisibleB: true
                      })}
                      onClose={() => this.setState({
                        isVisibleB: false
                      })}
                    />
                  </View>
                }

                {status.NoiThat &&
                  <View style={{ zIndex: 90 }}>
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
                      zIndex={10}
                      isVisible={this.state.isVisibleC}
                      onOpen={() => this.changeVisibility({
                        isVisibleC: true
                      })}
                      onClose={() => this.setState({
                        isVisibleC: false
                      })}
                    />
                  </View>
                }


                {status.SoPhong &&
                  <View style={{ zIndex: 100 }}>
                    <Text style={styles.text}>Số Phòng Ngủ: </Text>
                    <DropDownPicker
                      items={this.SOPHONG}
                      placeholder="Chọn"
                      containerStyle={styles.dropDown}
                      style={{ height: 500, width: widthElement }}
                      onChangeItem={(item, index) => {
                        this.setState({ SoPhong: item })
                      }}
                      zIndex={100}
                      isVisible={this.state.isVisibleSoPhong}
                      onOpen={() => this.changeVisibility({
                        isVisibleSoPhong: true
                      })}
                      onClose={() => this.setState({
                        isVisibleSoPhong: false
                      })}
                    />
                  </View>
                }

                {status.addButton < 6 &&
                  <View style={styles.addButton}>
                    <TouchableOpacity
                      onPress={() => {
                        this.setState({ modalVisible: true })
                      }}
                    >
                      <AntDesign name="pluscircle" size={36} color="#7066f6" />
                    </TouchableOpacity>
                  </View>
                }

                {status.MoTa &&
                  <View>
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
                }
              </View>
              <TouchableOpacity
                onPress={() => this.onSubmit()}
                style={styles.btnFindWrapper}
              >
                <FontAwesome5 name="search-dollar" size={30} color="white" />
              </TouchableOpacity>
            </View>
            </ScrollView>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>

    );
  };
}

const styles = StyleSheet.create({

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
    padding: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalButton: {
    backgroundColor: '#7066f6',
    borderRadius: 20,
    padding: 15,
    elevation: 2,
    marginTop: 10
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18,
  },
  modalText: {
    marginBottom: 15,
    marginTop: 30,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: "600"
  },

  // body
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    marginTop: Constant.statusBarHeight
  },


  backBtnWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
  },
  body: {
    flex: 1,
    alignItems: "center",
    fontSize: 50,
    // backgroundColor: "green"
  },

  headerWrapper: {
    flexDirection: "row"
  },
  textHeader: {
    fontSize: 30,
    fontWeight: "700",
    color: "#7066f6",
    // backgroundColor: "red"
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
    borderRadius: 10,
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
    marginLeft: 250,
    marginTop: height / 40,
    width: width / 3.8,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#7066f6",
    alignItems: "center",
    justifyContent: "center",
  },
  testWrapper1: {
    zIndex: 100
  },
  testWrapper2: {
    zIndex: 1
  },


});
