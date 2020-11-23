import React, { Component } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Table, TableWrapper, Row } from 'react-native-table-component';


export default class HistoryTableScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHeadENG: ['Number','Time', 'Accuracy', 'Estimated Price (m2) (VNĐ)', 'Estimated Apartment Price (VNĐ)', 'District', 'Acreage', 'Investor', 'Bathroom Number', 'Bedroom Number', 'Far Center'],

      tableHeadVIE: ['STT','Thời Gian', 'Độ Chính Xác', 'Giá Ước Tính (m2) (VNĐ)', 'Giá Ước Tính Căn Hộ (VNĐ)', 'Vị Trí', 'Diện Tích', 'Chủ Đầu Tư', 'Số Phòng Tắm', 'Số Phòng Ngủ', 'Cách Trung Tâm'],
      widthArr: [60,100, 100, 140 ,140, 140, 100, 140, 100, 100, 100]
    }
  }

  render() {
    const state = this.state;
    const { data, language } = this.props;
    const tableData = [];
    for (let i = 0; i < data.length; i += 1) {
      const rowData = [];
      let x;
      for (x in data[i]) {
        if ((x === "STT") || x === "Number") rowData.push(i + 1);
        else rowData.push(data[i][x]);
      }
      tableData.push(rowData);
    }

    return (
      <View style={styles.container}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <View>
            <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
              <Row data={ language === "VIE" ? state.tableHeadVIE : state.tableHeadENG} widthArr={state.widthArr} style={styles.header} textStyle={styles.textHeader} />
            </Table>
            <ScrollView style={styles.dataWrapper} showsVerticalScrollIndicator={false}>
              <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
                {
                  tableData.map((rowData, index) => (
                    <Row
                      key={index}
                      data={rowData}
                      widthArr={state.widthArr}
                      style={[styles.row, index % 2 && { backgroundColor: '#F7F6E7' }]}
                      textStyle={styles.text}
                    />
                  ))
                }
              </Table>
            </ScrollView>
          </View>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#cccccc'
  },
  header: {
    height: 50,
    backgroundColor: '#7066f6'
  },
  text: {
    textAlign: 'center',
    fontWeight: '100'
  },
  textHeader: {
    textAlign: 'center',
    fontWeight: '400',
    color: "white"
  },
  dataWrapper: {
    marginTop: -1
  },
  row: {
    height: 40,
    backgroundColor: '#E7E6E1'
  }
});