import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Item } from 'react-native';
import axios from 'axios'
import Picker from '@react-native-picker/picker'
import PickerScreen from './Picker';




export default function Start() {
  const [nickname, setNickname] = useState('');
  const [city, setCity] = useState('');
  const [town, setTown] = useState('');
  const [village, setVillage] = useState('');

  useEffect(() => {
    // Make a request to your backend's API endpoint to fetch location data
    axios.get('http://58.231.37.42:25565/location')
      .then(response => {
        // Assuming the response data is an array of location options
        setLocationData(response.data);
      })
      .catch(error => {
        console.error('Error fetching location data:', error);
      });
  }, []);
  const handleSaveLocation = () => {
    // Handle saving the selected location to your backend or perform any other action
    // For this example, we're just displaying the selected location.
    console.log(`Selected Location: City: ${city}, Town: ${town}, Village: ${village}`);
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
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>닉네임을 입력하세요</Text>
      <TextInput
        style={styles.input}
        placeholder="Nickname"
        value={nickname}
        onChangeText={handleNicknameChange}
      />
      <Text style={styles.title}>지역을 선택하세요</Text>
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
      <TouchableOpacity
        style={[styles.button, { backgroundColor: "gray" }]}
        onPress={handleSaveNickname}
      >
        <Text style={styles.buttonText}>확인</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 20,
  },
  title: {
    color: 'black',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '100%',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  button: {
    padding: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
