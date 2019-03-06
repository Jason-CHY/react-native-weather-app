import React, { Component } from 'react';
import { StyleSheet, FlatList, TouchableOpacity, StatusBar } from 'react-native';
import { Text, View, Left, Spinner, ListItem, Header, Body, Right, Title, Icon } from 'native-base';
import Application from './src/Application';
import axios from 'axios';

const axiosConfig = {
  headers: {
    'Content-Type': 'application/json',
  }
};

const data = [
  {
    'date': '11 Jan 2017, Wed',
    'temperature': '79-81',
    'weather': 'Thunderstorm'
  }, {
    'date': '12 Jan 2017, Thu',
    'temperature': '79-81',
    'weather': 'Thunderstorm'
  }, {
    'date': '13 Jan 2017, Fri',
    'temperature': '79-81',
    'weather': 'Thunderstorm'
  }, {
    'date': '14 Jan 2017, Sat',
    'temperature': '79-81',
    'weather': 'Thunderstorm'
  }, {
    'date': '15 Jan 2017, Sun',
    'temperature': '79-81',
    'weather': 'Thunderstorm'
  }
]

export default class App extends Component {

  constructor(props) {
    super(props);
    this.getData();
  }

  getData = async () => {
    await axios.get(
      "https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where woeid in (select woeid from geo.places(1) where text='singapore,sg'&format=json&env=store://datatables.org/alltableswithkeys"
    )
      .then(function (result) {
        console.warn(result);
      });
  }

  renderItem = ({ item }) => (
    <ListItem>
      <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View style={{ flex: 0.9, justifyContent: 'flex-start', textAlign: 'left' }}>
          <Text style={styles.list_date}>
            {item.date}
          </Text>
          <Text style={ styles.list_temperature}>
            {item.temperature}
          </Text>
          <Text style={styles.list_weather}>
            {item.weather}
          </Text>
        </View>
        <View style={{ flex: 0.1, justifyContent: 'center', alignItems: 'center' }}>
          <Icon name='arrow-forward' style={styles.icon} />
        </View>
      </TouchableOpacity>
    </ListItem>
  );

  render() {
    if (data != null) {
      return (
        <Application backgroundColor={'white'}>
          <View style={{ flex: 1 }}>
            <Header style={styles.header}>
              <StatusBar barStyle={'light-content'} />
              <Body>
                <Title style={styles.header_text}>Singapore, Singapore</Title>
              </Body>
            </Header>
            <View style={styles.top_box}>
              <Text style={styles.today_date}>
                Wed, 11 Jan 2017 01:10 PM GST
              </Text>
              <Text style={styles.today_temperature}>
                82
              </Text>
              <Text style={styles.today_weather}>
                Thunderstorm
              </Text>
            </View>
            <FlatList
              data={data}
              renderItem={this.renderItem}
            />
          </View>
        </Application>
      )
    } else {
      return (
        <Application backgroundColor={'white'}>
          <Header style={styles.header}>
            <Left />
            <Body>
              <Title style={styles.header_text}>Header</Title>
            </Body>
            <Right />
          </Header>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Spinner color={"red"} />
          </View>
        </Application>)
    }
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#e53935'
  },
  header_text: {
    color: 'white',
    fontWeight: 'normal'
  },
  top_box: {
    marginVertical: 20
  },
  today_date: {
    textAlign: 'center',
    fontWeight: 'bold',
    marginVertical: 10
  },
  today_temperature: {
    textAlign: 'center',
    fontSize: 50
  },
  today_weather: {
    textAlign: 'center',
    color: 'grey'
  },
  list_weather: {
    fontSize: 14,
    color: 'grey'
  },
  list_temperature: {
    fontSize: 14,
    marginVertical: 2
  },
  list_date: {
    fontWeight: 'bold'
  },
  icon: {
    color: '#e53935'
  }
});
