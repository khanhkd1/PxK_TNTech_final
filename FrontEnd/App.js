import 'react-native-gesture-handler';
import React from 'react';
import { SafeAreaView, StyleSheet, View, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Map from './screens/Map';
import ChooseScreen from './screens/ChooseScreen';
import ChungCuScreen from './screens/ChungCuScreen';
import ChungCuDemoScreen from './screens/ChungCuDemoScreen';
import ChungCuTestScreen from './screens/ChungCuTestScreen';
import DuAnScreen from './screens/DuAnScreen';
import HistoryTableScreen from './screens/HistoryTableScreen';
import GuideScreen from './screens/GuideScreen';
import ChartScreen from './screens/ChartScreen';
import ApiChartView from './screens/ApiChartView';



const Stack = createStackNavigator();

export default class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator headerMode={false}>
          <Stack.Screen name="ChooseScreen" component={ChooseScreen} />
          <Stack.Screen name="ChungCuScreen" component={ChungCuScreen} />
          <Stack.Screen name="ChungCuDemoScreen" component={ChungCuDemoScreen} />
          <Stack.Screen name="ChungCuTestScreen" component={ChungCuTestScreen} />
          <Stack.Screen name="DuAnScreen" component={DuAnScreen} />
          <Stack.Screen name="HistoryTableScreen" component={HistoryTableScreen} />
          <Stack.Screen name="GuideScreen" component={GuideScreen} />
          <Stack.Screen name="ChartScreen" component={ChartScreen} />
          <Stack.Screen name="ApiChartView" component={ApiChartView} />
          <Stack.Screen name="Map" component={Map} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  };
}

const styles = StyleSheet.create({

});
