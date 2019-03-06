import React, { Component } from 'react';
import { StyleSheet, FlatList, TouchableOpacity, StatusBar } from 'react-native';
import { Text, View, Left, Spinner, ListItem, Header, Body, Right, Title, Icon } from 'native-base';
import Application from './src/Application';
import axios from 'axios';

// new Date(1551884400000).toUTCString()

export default class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      data: [],
      main: []
    }

    this.getData();
  }

  getData = async () => {
    const url = "http://api.openweathermap.org/data/2.5/forecast?q=singapore,sg&APPID=e7f37a463187f09507c7c047afd44400";
    const result = await axios.get(url);
    let data = result.data.list;
    let temp = data[0];
    let main = { date: '', temp: 0, weather: '' };
    let data2 = [];

    main.date = new Date(temp.dt * 1000).toUTCString();
    main.temp = (((temp.main.temp - 273.15)*9/5)+32).toFixed(0);
    main.weather = temp.weather[0].main;

    for (let i = 0; i < data.length; i++) {
      let sub = { date: '', temp_min: 0, temp_max: 0, weather: '' };
      sub.date = new Date(data[i].dt * 1000).toUTCString();
      sub.temp_min = (((data[i].main.temp_min- 273.15)*9/5)+32).toFixed(0);
      sub.temp_max = (((data[i].main.temp_max- 273.15)*9/5)+32).toFixed(0);
      sub.weather = data[i].weather[0].main;
      data2.push(sub);
    }

    this.setState({ data: data2, main });
  }

  renderItem = ({ item }) => (
    <ListItem>
      <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View style={{ flex: 0.9, justifyContent: 'flex-start', textAlign: 'left' }}>
          <Text style={styles.list_date}>
            {item.date}
          </Text>
          <Text style={styles.list_temperature}>
            {/* {item.temperature} */}
            {item.temp_min} - {item.temp_max}
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
    const { data, main } = this.state;
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
                {/* Wed, 11 Jan 2017 01:10 PM GST */}
                {main.date}
              </Text>
              <Text style={styles.today_temperature}>
                {main.temp}
              </Text>
              <Text style={styles.today_weather}>
                {main.weather}
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
    fontSize: 15,
    fontWeight: 'bold'
  },
  icon: {
    color: '#e53935'
  }
});
