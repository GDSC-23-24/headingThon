import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import SplashScreen from 'react-native-splash-screen'; 
//import splashImage from ".\imgSrc\splash.png;
const Splash = ({ navigation }) => {
  useEffect(() => {
    const initializeApp = async () => {
      // 4초동안 스플래시 화면(좀있어보이게..ㅋ)
      await new Promise(resolve => setTimeout(resolve, 5000));

      // 앱 로드가 완료되고 표시할 준비가 되면 스플래시 화면을 숨기기 위해
      SplashScreen.hide();

      // Navigate to Selection
      navigation.navigate('Main');
    };

    initializeApp();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image source={require('.\imgSrc\splash.png')} style={styles.logo} /> {/* Use require() to load the image */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
});

export default Splash;
