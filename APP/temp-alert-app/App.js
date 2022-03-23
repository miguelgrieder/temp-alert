import * as React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import HomeScreen from './pages/Home'
import ReportListScreen from './pages/ReportsList'
import ReportDetailsScreen from './pages/ReportsDetails'
import ReportsAlertsScreen from './pages/ReportsAlerts'

const MainNavigator = createStackNavigator({
  Home: {screen: HomeScreen},
  ReportList: {screen: ReportListScreen},
  ReportDetails: {screen: ReportDetailsScreen},
  ReportsAlerts: {screen: ReportsAlertsScreen},
});
 
const App = createAppContainer(MainNavigator);
export default App;