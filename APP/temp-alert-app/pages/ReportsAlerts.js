import * as React from 'react'
import {
  Text,
  View,
  StyleSheet,
  Button,
  ActivityIndicator,
  FlatList,
  Image,
  TouchableOpacity
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default class PlacesListScreen extends React.Component {
  static navigationOptions = {
    title: 'Reports Alerta'
  }

  constructor(props) {
    super(props)
    this.state = { isLoading: true }
  }

  componentDidMount(){
    const { navigation } = this.props;

    this.focusListener = navigation.addListener('didFocus', () => {
      return fetch('https://api.jsonbin.io/b/6238f1237caf5d67836eae89')
        .then((response) => response.json())
        .then((json) => {
          this.setState({
            isLoading: false,
            Reports: json,
          }, function(){
          });
        })
        .catch((error) =>{
          console.error(error);
        });
    });
  }

  componentWillUnmount() {
    this.focusListener.remove()
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator />
        </View>
      )
    }

    const { navigate } = this.props.navigation
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.Reports}
          renderItem={({ item }) => (
            <View>
            <TouchableOpacity
                  onPress={() => navigate('ReportDetails', { Report: item })}
                >
    
              <Text style={styles.title}>ReportStatus {item.id}</Text>
              <Text style={styles.description}>Data:  {item.data_request}</Text>
              <Text style={styles.description}>T:{item.temperatura} H:{item.humidade}</Text>
              </TouchableOpacity>
              <View>
                
                
                <View>
                  


                  <TouchableOpacity
                    onPress={async () => {
                      const placesList = await AsyncStorage.getItem(
                        'ReportsAlerts'
                      )
                      const items = placesList ? JSON.parse(placesList) : []
                      if (items.indexOf(item.id) > -1) {
                        items.splice(items.indexOf(item.id), 1)
                        await AsyncStorage.setItem(
                          'ReportsAlerts',
                          JSON.stringify(items)
                        )
                      } else {
                        console.log('error')
                      }
                    }}
                  >
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        />
        <Button title="Voltar" onPress={() => navigate('Home')} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    height: '100%'
  },

  title: {
    padding: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'blue'
  },
  description: {  
  fontSize: 14,
  textAlign: "center"
  },
 
})