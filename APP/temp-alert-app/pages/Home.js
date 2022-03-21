import * as React from 'react';
import { View, Text, Image, Button, BackHandler, StyleSheet } from 'react-native';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'TempAlert',
  };

  render() {
    const {navigate} = this.props.navigation;
    return (
      <View>
        <View style={styles.container}>
          <Image style={styles.logo} source={require('../assets/alert.png')} />
          <Text style={styles.title} > Temperature Alert</Text>
        </View>
        <View style={styles.button}>
          <Button title="Todos Reports" onPress={() => navigate('ReportList')} />
        </View>
        <View style={styles.button}>
          <Button title="Reports Alertas" onPress={() => navigate('ReportsAlerts')} />
        </View>
        <View style={styles.button}>
          <Button title="Sair" onPress={() => BackHandler.exitApp() } />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 60,
  },
  logo: {
    height: 200,
    width: 160,
  },
  title: {
    padding: 30,
    fontSize: 18,
  },
  button: {
    padding: 15
  }
});