import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';

const createAxiosObject = () => {
  const axiosObject = axios.create({
    baseURL: 'http://localhost:25565',
    headers: {
      Accept: 'application/json',
    },
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
  const [townData, setTownData] = useState([]);
  const [villageData, setVillageData] = useState([]);

  const fetchTownData = useCallback(async () => {
    try {
      const axiosObject = createAxiosObject();
      const townResponse = await axiosObject.get('http://localhost:25565/location/town');
      const towns = townResponse.data.towns;

      setTownData(towns);
    } catch (error) {
      console.log('Error fetching town data:', error);
    }
  }, []);

  const fetchVillageData = useCallback(async () => {
    try {
      const axiosObject = createAxiosObject();
      const villageResponse = await axiosObject.get('http://localhost:25565/location/village?town=사하구');
      const villages = villageResponse.data.villages;

      setVillageData(villages);
    } catch (error) {
      console.log('Error fetching village data:', error);
    }
  }, []);

  useEffect(() => {
    fetchTownData();
    fetchVillageData(); // Fetch village data directly
  }, [fetchTownData, fetchVillageData]);

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
        style={{ backgroundColor: '#FBFBEF', color: 'black' }}
      >
        {cities.map((city) => (
          <Picker.Item key={city} label={city} value={city} />
        ))}
      </Picker>

      <Picker
        selectedValue={selectedTown}
        style={{ backgroundColor: '#FBFBEF', color: 'black' }}
        onValueChange={(town) => {
          onTownChange(town);
          onVillageChange(null);
          
          // You can use the "townData" state directly here
          const selectedTownData = townData.find((item) => item.name === town);
          if (selectedTownData) {
            // No need to fetch village data here
            setVillageData(selectedTownData.villages);
          }
        }}
        
      >
        {townData.map((town) => (
          <Picker.Item key={town} label={town} value={town} />
        ))}
      </Picker>

      {/* <Picker
        selectedValue={selectedVillage}
        onValueChange={onVillageChange}
        style={{ color: "white" }}
      >
        {villageData.map((village) => (
          <Picker.Item key={village} label={village} value={village} />
        ))}
      </Picker> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
  
    justifyContent: 'center',
    backgroundColor: '#F5F6CE',
    margin: 10,
  },
});

export default PickerScreen;
