import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput,SafeAreaView  } from 'react-native';
import axios from 'axios';
import PickerScreen from './Picker';

export default function Start() {
  const [nickname, setNickname] = useState('');
  const [city, setCity] = useState('');
  const [town, setTown] = useState('');
  const [village, setVillage] = useState('');
  const [locationData, setLocationData] = useState([]);

  useEffect(() => {
    fetchLocationData();
  }, []);
  //서버로부터 위치 데이터를 가져오기 위해 Axios를 사용
  const fetchLocationData = () => {
    axios.get('http://58.231.37.42:25565/location/town')
      .then(response => {
        setLocationData(response.data);
        // 이후 두 번째 엔드포인트에 대한 요청 추가
        axios.get('http://58.231.37.42:25565/location/village?town=사하구')
          .then(villageResponse => {
            // villageResponse.data를 처리하는 로직 추가
          })
          .catch(villageError => {
            console.error('Error fetching village data:', villageError);
          });
      })
      .catch(error => {
        console.error('Error fetching location data:', error);
      });
  };
  


//사용자 입력에 따라 상태 변수를 업데이트하는 함수
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
    <SafeAreaView  style={styles.safeContainer}>
      <Text style={styles.title}> 입력란</Text>
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
      </View>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: "gray" }]}
        onPress={handleSaveNickname}
      >
        <Text style={styles.buttonText}>확인</Text>
      </TouchableOpacity>
    </SafeAreaView >
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  container: {
    flex: 1,
    margin: 20,
    backgroundColor: 'white',
    padding: 20, // 패딩 값 증가
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingBottom: 20, // 패딩 값 증가
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
    backgroundColor: 'gray',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  pickerView: {
    marginBottom: 10,
  },
});
