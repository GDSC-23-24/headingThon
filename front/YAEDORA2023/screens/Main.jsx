import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet,Image } from 'react-native';

export default function Main({ navigation }) {
  const navigateToMapView = () => {
    navigation.navigate('Map');
  };

  const navigateToNotice = () => {
    navigation.navigate('Notice');
  };

  const navigateToMyPage = () => {
    navigation.navigate('My');
  };

  const navigateToCommunity = () => {
    
  };

  return (
    <View style={styles.container}>
      <View>
      <Image source={require('../imgSrc/app.png')} style={styles.main} /> 
      </View>
      {/* Horizontal container for "지도보기" and "공지사항" */}
      <View style={styles.horizontalContainer}>
        <TouchableOpacity style={styles.horizontalButton} onPress={navigateToNotice}>
        <Image source={require('../imgSrc/001.png')} style={styles.logo} /> 
        </TouchableOpacity>
        <TouchableOpacity style={styles.horizontalButton} onPress={navigateToMapView}>
        <Image source={require('../imgSrc/002.png')} style={styles.logo} /> 
        </TouchableOpacity>
      </View>

      {/* Horizontal container for "마이페이지" and "커뮤니티" */}
      <View style={styles.horizontalContainer}>
        <TouchableOpacity style={styles.horizontalButton} onPress={navigateToCommunity}>
        <Image source={require('../imgSrc/003.png')} style={styles.logo} /> 
        </TouchableOpacity>
        <TouchableOpacity style={styles.horizontalButton} onPress={navigateToMyPage}>
        <Image source={require('../imgSrc/004.png')} style={styles.logo} /> 
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

  main:{
    width:300,
    height:300,
    justifyContent:'center',

  },
  horizontalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
    marginRight:20,
    marginBottom: 5,
  },
  horizontalButton: {
    marginTop: 10,
    marginLeft: 10,
    marginHorizontal: 10,
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  logo:{
    
    width: 180,
    height: 200,
    
    
  }
});
