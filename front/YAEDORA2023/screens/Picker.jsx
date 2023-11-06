import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';

const createAxiosObject = () => {
  // AxiosObject
  const { CancelToken } = axios;
  const source = CancelToken.source();
  const axiosObject = axios.create({
    baseURL: 'http://58.231.37.42:25565/location',
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

let cities = {};
let districts = {};
let villages = {};

function PickerScreen({ onCityChange, onTownChange, onVillageChange, selectedCity, selectedTown, selectedVillage }) {
  useEffect(() => {
    fetchApplicationDetails();
  }, []);

  const fetchApplicationDetails = async () => {
    try {
      const axiosObject = createAxiosObject();
      const response = await axiosObject.get('api/v1/locations'); // Replace with the actual API endpoint
      const data = response.data;

      data.forEach((item, _) => {
        if (districts[item.state] === undefined) {
          districts[item.state] = [item.name];
        } else {
          districts[item.state].push(item.name);
        }
      });

      console.log(districts);
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
        style={{ color: "white" }}
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
          {towns[selectedCity]?.map((town) => (
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
    margin: '10%',
    padding: '10%',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});

export default PickerScreen;
