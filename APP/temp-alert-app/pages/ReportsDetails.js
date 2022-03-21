import * as React from 'react';
import { Text, Image, View, StyleSheet, Button, Linking, TouchableOpacity } from 'react-native';
import { Platform } from 'react-native';


export default class ReportDetailsScreen extends React.Component {
  static navigationOptions = {
    title: 'Dados da Request',
  };

  constructor(props) {
    super(props);
    let Report = props.navigation.getParam('Report');
    this.state = {
      id: Report.id,
      temperatura: Report.temperatura,
      humidade: Report.humidade,
      data_request: Report.data_request,
      date_report_sensor: Report.date_report_sensor,
    };
  }

  render() {
    const { navigate } = this.props.navigation;
    const { id, temperatura, humidade, data_request, date_report_sensor } = this.state;
    return (
      <View>
        <View style={styles.container}>
          <Text style={styles.ReportName}>Report Request ID: {id}</Text>
          <Text style={styles.ReportDescription}>Temperatura: {temperatura}°C</Text>
          <Text style={styles.ReportDescription}>Humidade: {humidade}%</Text>
          {data_request && ( <Text style={styles.ReportTimeTicket}>Horário: </Text>) }
          {data_request && ( <Text style={styles.ReportTimeTicket}>{data_request} </Text>) }
          {date_report_sensor && ( <Text style={styles.ReportTimeTicket}> </Text>) }
          {date_report_sensor && ( <Text style={styles.ReportTimeTicket}>Horário Request ReportStatus:</Text>) }
          {date_report_sensor && ( <Text style={styles.ReportTimeTicket}>{data_request}</Text>) }
          {date_report_sensor && ( <Text style={styles.ReportTimeTicket}> </Text>) }
          {(temperatura < 17 || temperatura > 27 || humidade < 30 || humidade > 90) && ( <Text style={styles.description}>Alerta! Tempo ruim!</Text>) }  
              {(temperatura > 17 && temperatura < 27 && humidade > 30 && humidade < 90) && ( <Text style={styles.description}>Tempo bom</Text>) }  
         </View>
        <Button title="Voltar" onPress={() => navigate('ReportList')} />
      </View>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    height: 200,
    width: 160,
  },
  ReportName: {
    fontSize: 18,
    fontWeight: 'bold',
    height: 44,
  },
  ReportDetails: {
    fontSize: 16,
    height: 44,
    margin: 10
  },
  ReportDescription: {
    fontSize: 16,
    margin: 10
  },
  ReportTimeTicket: {
    fontSize: 16,
  }
});