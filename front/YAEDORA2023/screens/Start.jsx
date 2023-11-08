import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, SafeAreaView, Image } from 'react-native';
import axios from 'axios';
import PickerScreen from './Picker';
import { createStackNavigator } from '@react-navigation/stack';

export default function Start({ navigation }) {
  const [nickname, setNickname] = useState('');
  const [city, setCity] = useState('');
  const [town, setTown] = useState('');
  const [village, setVillage] = useState('');
  const [locationData, setLocationData] = useState([]);

  useEffect(() => {
    fetchLocationData();
  }, []);

  const fetchLocationData = () => {
    axios.get('http://58.231.37.42:25565/location/town')
      .then(response => {
        setLocationData(response.data);
        axios.get('http://58.231.37.42:25565/location/village?town=사하구')
          .then(villageResponse => {
            // Handle villageResponse.data
          })
          .catch(villageError => {
            console.error('Error fetching village data:', villageError);
          });
      })
      .catch(error => {
        console.error('Error fetching location data:', error);
      });
  };

  const handleNicknameChange = (text) => {
    setNickname(text);
  };

  const handleCityChange = (text) => {
    setCity(text);
  };

  const handleTownChange = (text) => {
    setTown(text);
  };

  const handleVillage = (text) => {
    setVillage(text);
  };

  const handleSaveNickname = () => {
    alert(`Nickname: ${nickname}\nCity: ${city}\nTown: ${town}\nVillage: ${village}`);
    navigation.navigate('Main');
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <Text style={styles.title}>WELCOME YAEDORA</Text>
      <Image source={require('../imgSrc/app.png')} style={styles.logo} />
      <View style={styles.container}>
        <Text style={styles.inputTitle}>닉네임을 입력하세요</Text>
        <TextInput
          style={styles.input}
          placeholder="Nickname"
          value={nickname}
          onChangeText={handleNicknameChange}
        />
        <Text style={styles.inputTitle}>지역을 선택하세요</Text>
        <View style={styles.pickerView}>
          <PickerScreen
            onCityChange={handleCityChange}
            onTownChange={handleTownChange}
            onVillageChange={handleVillage}
            selectedCity={city}
            selectedTown={town}
            selectedVillage={village}
          />
        </View>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={handleSaveNickname}
      >
        <Text style={styles.buttonText}>확인</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FBFBEF',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#FBFBEF',
    margin: 10,
    padding: 10,
  },
  logo: {
    width: 200,
    height: 200,
    margin: 5,
  },
  title: {
    marginTop: 50,
    color: 'black',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputTitle: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '100%',
    marginTop:20,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  button: {
    padding: 15,
    borderRadius: 5,
    backgroundColor: 'white',
    marginBottom:40

  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
    
  },
  pickerView: {
    marginTop: 20,
  },
});
