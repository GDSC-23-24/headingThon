// BreadFood.jsx

import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { View, StyleSheet, Button } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { useNavigation } from '@react-navigation/native';


const createAxiosObject = () => {
  const { CancelToken } = axios;
  const source = CancelToken.source();
  const axiosObject = axios.create({
    baseURL: 'http://localhost:25565',
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

const BreadFood = () => {

  const [breadData, setBreadData] = useState([]);


  const navigation = useNavigation();

  const handleMarkerPress = (store) => {
    navigation.navigate('StoreDetails', { id: store.store.id });
  };
  const handleCategoryButtonPress = (category) => {
    // Navigate to the corresponding screen based on the category
    navigation.navigate(category);
  };

  useEffect(() => {

    fetchBreadStores();
  }, [fetchBreadStores]);

  const fetchBreadStores = async () => {
    try {
      const axiosObject = createAxiosObject();
      const response = await axiosObject.get('http://localhost:25565/store', { headers: { Accept: "application/json" }, });

      const breadStores = response.data
      setBreadData(breadStores.stores)

    } catch (error) {
      console.log('Error fetching Bread stores:', error);
    }
  }
  const mapRef = useRef(null);
  const [selectedPlace, setSelectedPlace] = useState(null);

  const handlePlaceSelect = (data, details) => {
    setSelectedPlace({ data, details });
  };

  const moveMapToSelectedPlace = () => {
    if (mapRef.current && selectedPlace) {
      const { lat, lng } = selectedPlace.details.geometry.location;
      const newRegion = {
        latitude: lat,
        longitude: lng,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      };
      mapRef.current.animateToRegion(newRegion, 1000);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <GooglePlacesAutocomplete
          minLength={2}
          placeholder="장소를 검색해보세요!"
          query={{
            key: 'AIzaSyAHCoiPElse3luRIVilcDYYxz9l9-y4UE0',
            language: "ko",
            components: "country:kr",
          }}
          keyboardShouldPersistTaps={"handled"}
          fetchDetails={true}
          onPress={(data, details) => handlePlaceSelect(data, details)}
          onFail={(error) => console.log(error)}
          onNotFound={() => console.log("no results")}
          enablePoweredByContainer={false}
        />
        <Button title="확인" onPress={moveMapToSelectedPlace} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="일반대중음식" onPress={() => handleCategoryButtonPress("NomalFood")} />
        <Button title="편의점" onPress={() => handleCategoryButtonPress("SuperFood")} />
        <Button title="한식" onPress={() => handleCategoryButtonPress("KoreaFood")} />
        <Button title="패스트푸드" onPress={() => handleCategoryButtonPress("FastFood")} />
        <Button title="양식" onPress={() => handleCategoryButtonPress("WesternFood")} />
        <Button title="일식" onPress={() => handleCategoryButtonPress("JapanFood")} />
        <Button title="제과점" onPress={() => handleCategoryButtonPress("BreadFood")} />
        <Button title="중식" onPress={() => handleCategoryButtonPress("ChinaFood")} />
        
      </View>

      <View style={styles.mapContainer}>
        <MapView
          ref={mapRef}
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={{
            latitude: 35.11081, // 초기위치 사하구
            longitude: 128.9479, // 초기위치 사하구
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker
            coordinate={{
              latitude: 35.1085,
              longitude: 128.9643
            }}
            title="Initial Location"
            description="This is the initial location"
            pinColor="red"
          />

          {breadData.map((store) => (
            // Check if the category is "제과점" before rendering the marker
            store.store.category === "제과점" && (
              <Marker
                key={store.id}
                coordinate={{
                  latitude: store.store.latitude,
                  longitude: store.store.longitude,
                }}
                title={store.store.storename}
                description={store.store.category}
                pinColor="orange"
                onPress={() => handleMarkerPress(store)}
              />
            )
          ))}
        </MapView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  mapContainer: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  poweredContainer: {
    display: 'none',
  },
});

export default BreadFood;

