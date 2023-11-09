import React, { useState, useRef } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const Map = () => {
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
      mapRef.current.animateToRegion(newRegion, 1000); // Adjust the duration as needed
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <GooglePlacesAutocomplete
          minLength={2}
          placeholder="장소를 검색해보세요!"
          query={{
            key: 'AIzaSyDUxejCVhBL0GAOdlTUW-rc6qnwpxKjg_M',
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
            latitude: 35.106, // 초기위치 사하구
            longitude: 128.966, // 초기위치 사하구
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          {selectedPlace && (
            <Marker
              coordinate={{
                latitude: selectedPlace.details.geometry.location.lat,
                longitude: selectedPlace.details.geometry.location.lng,
              }}
              title={selectedPlace.data.description}
              pinColor="red" // Set the marker color to red
            />
          )}
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
