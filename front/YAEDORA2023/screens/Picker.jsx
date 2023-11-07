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

function PickerScreen({ onCityChange, onTownChange, onVillageChange, selectedCity, selectedTown, selectedVillage }) {
  const [selectedCityData, setSelectedCityData] = useState([]);
  const [selectedTownData, setSelectedTownData] = useState([]);
  const [selectedVillageData, setSelectedVillageData] = useState([]);

  useEffect(() => {
    fetchApplicationDetails();
  }, []);

  const fetchApplicationDetails = async () => {
    try {
      const axiosObject = createAxiosObject();
      const townResponse = await axiosObject.get('http://58.231.37.42:25565/location/town');
      const townData = townResponse.data;
      console.log(townData);
      console.log("@@");
      townData.towns // 도시 데이터를 설정
      console.log(townData.towns)

      console.log(selectedTownData)
    } catch (error) {
      console.log('Error fetching city data:', error);
    }
  };

  const handleCityChange = (selectedCity) => {
    onCityChange(selectedCity);
    onTownChange(null);
    onVillageChange(null);
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


      <Picker
        selectedValue={selectedTown}
        onValueChange={(town) => {
          onTownChange(town);
          onVillageChange(null);

          // 선택한 "동"에 해당하는 "마을" 데이터 추출
          const townData = selectedTownData.find((item) => item.name === town);
          if (townData) {
            setSelectedVillageData(townData.villages);
          }
        }}
        style={{ color: "white" }}
      >
        {selectedTownData.map((town) => (
          <Picker.Item key={town.name} label={town.name} value={town.name} />
        ))}
      </Picker>



      <Picker
        selectedValue={selectedVillage}
        onValueChange={onVillageChange}
        style={{ color: "white" }}
      >
        {selectedVillageData.map((village) => (
          <Picker.Item key={village} label={village} value={village} />
        ))}
      </Picker>

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
