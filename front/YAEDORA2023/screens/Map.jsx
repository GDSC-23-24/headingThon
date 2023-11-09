import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { View, StyleSheet, Button } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

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

const Map = () => {
  const [likeData, setLikeData] = useState([]);

  useEffect(() => {
    fetchLikedStores();
  }, [fetchLikedStores]);

  const fetchLikedStores = async () => {
    try {
      const axiosObject = createAxiosObject();
      const response = await axiosObject.get('http://localhost:25565/store/like?member_id=1', { headers: { Accept: "application/json" }, });
      const likedStores = response.data
      console.log("시작")
      console.log(response)
      setLikeData(likedStores.storeLikeDtos)
      console.log(likedStores)




    } catch (error) {
      console.log('Error fetching liked stores:', error);
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
          {likeData.map((likedStore) => (
            <Marker
              key={likedStore.id}
              coordinate={{
                latitude: likedStore.store.latitude,
                longitude: likedStore.store.longitude,
              }}
              title={likedStore.store.storename}
              description={likedStore.store.category}
              pinColor={likedStore.color || "red"} // Use 'color' from the data
            />
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

export default Map;
