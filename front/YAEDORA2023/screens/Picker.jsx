import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';

const createAxiosObject = () => {
  const { CancelToken } = axios;
  const source = CancelToken.source();
  const axiosObject = axios.create({
    baseURL: 'http://58.231.37.42:25565',
    headers: {
      Accept: 'application/json',
    },
    cancelToken: source.token,
  });

  const timeout = setTimeout(() => {
    source.cancel(-1);
  }, 10000);

  axiosObject.interceptors.response.use(
    (response) => {
      clearTimeout(timeout);
      return response;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return axiosObject;
};

const cities = ["강원도", "경기도", "경상남도", "경상북도", "광주광역시", "대구광역시", "부산광역시", "서울특별시", "세종특별자치시", "울산광역시", "인천광역시", "전라남도", "전라북도", "충청남도", "충청북도"];
let districts = {};
let villages = {};

function PickerScreen({ onCityChange, onTownChange, onVillageChange, selectedCity, selectedTown, selectedVillage }) {
  useEffect(() => {
    fetchApplicationDetails();
  }, []);

  const fetchApplicationDetails = async () => {
    try {
      const axiosObject = createAxiosObject();
      const response = await axiosObject.get('http://58.231.37.42:25565/location/town');
      const data = response.data;

      data.forEach((item, _) => {
        if (districts[item.state] === undefined) {
          districts[item.state] = [item.name];
        } else {
          districts[item.state].push(item.name);
        }
      });

      console.log(districts);

      // 두 번째 엔드포인트를 호출하여 village 데이터를 가져오도록 추가
      const villageResponse = await axiosObject.get('http://58.231.37.42:25565/location/village?town=사하구');
      const villageData = villageResponse.data;

      // village 데이터 처리 로직 추가
    } catch (error) {
      console.log('Error fetching application details:', error);
    }
  };

  const handleCityChange = (city) => {
    onCityChange(city);
    onTownChange(null); // Reset town when city changes
    onVillageChange(null); // Reset village when city changes
  };

  return (
    <View style={styles.container}>
      <Picker
        selectedValue={selectedCity}
        onValueChange={handleCityChange}
        style={{ backgroundColor: 'white', color: 'black' }}
      >
        {cities.map((city) => (
          <Picker.Item key={city} label={city} value={city} />
        ))}
      </Picker>

      {selectedCity && (
        <Picker
          selectedValue={selectedTown}
          onValueChange={(town) => onTownChange(town)}
          style={{ color: "white" }}
        >
          {districts[selectedCity]?.map((town) => (
            <Picker.Item key={town} label={town} value={town} />
          ))}
        </Picker>
      )}

      {selectedTown && (
        <Picker
          selectedValue={selectedVillage}
          onValueChange={(village) => onVillageChange(village)}
          style={{ color: "white" }}
        >
          {villages[selectedTown]?.map((village) => (
            <Picker.Item key={village} label={village} value={village} />
          ))}
        </Picker>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#4B8A08',
    margin: 10,
    padding: 10,
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});

export default PickerScreen;
