import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function Start() {
  const [nickname, setNickname] = useState('');
  const [city, setCity] = useState('');
  const [county, setCounty] = useState('');
  const [district, setDistrict] = useState('');

  const handleNicknameChange = (text) => {
    setNickname(text);
  };

  const handleCityChange = (text) => {
    setCity(text);
  };

  const handleCountyChange = (text) => {
    setCounty(text);
  };

  const handleDistrictChange = (text) => {
    setDistrict(text);
  };

  const handleSaveNickname = () => {
   
    alert(`Nickname: ${nickname}\nCity: ${city}\nCounty: ${county}\nDistrict: ${district}`);
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
      <TextInput
        style={styles.input}
        placeholder="시"
        value={city}
        onChangeText={handleCityChange}
      />
      <TextInput
        style={styles.input}
        placeholder="읍,면,구"
        value={county}
        onChangeText={handleCountyChange}
      />
      <TextInput
        style={styles.input}
        placeholder="동"
        value={district}
        onChangeText={handleDistrictChange}
      />
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
