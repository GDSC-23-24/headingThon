import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function Main({ navigation }) {
  const navigateToMapView = () => {
    // Implement navigation logic to the Map View screen
  };

  const navigateToNotice = () => {
    // Implement navigation logic to the Notice screen
  };

  const navigateToMyPage = () => {
    // Implement navigation logic to the My Page screen
  };

  const navigateToCommunity = () => {
    // Implement navigation logic to the Community screen
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Main Screen</Text>

      {/* Horizontal container for "지도보기" and "공지사항" */}
      <View style={styles.horizontalContainer}>
        <TouchableOpacity style={styles.horizontalButton} onPress={navigateToMapView}>
          <Text style={styles.buttonText}>지도보기</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.horizontalButton} onPress={navigateToNotice}>
          <Text style={styles.buttonText}>공지사항</Text>
        </TouchableOpacity>
      </View>

      {/* Horizontal container for "마이페이지" and "커뮤니티" */}
      <View style={styles.horizontalContainer}>
        <TouchableOpacity style={styles.horizontalButton} onPress={navigateToMyPage}>
          <Text style={styles.buttonText}>마이페이지</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.horizontalButton} onPress={navigateToCommunity}>
          <Text style={styles.buttonText}>커뮤니티</Text>
        </TouchableOpacity>
      </View>
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
    marginBottom: 20,
  },
  horizontalContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  horizontalButton: {
    padding: 15,
    borderRadius: 5,
    backgroundColor: 'gray',
    marginHorizontal: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
