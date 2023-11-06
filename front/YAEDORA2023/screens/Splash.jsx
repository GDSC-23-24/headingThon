import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import SplashScreen from 'react-native-splash-screen'; 
import splashImage from './splash.png';

const Splash = ({ navigation }) => {
  useEffect(() => {
    const initializeApp = async () => {
      // 4초동안 스플래시 화면(좀있어보이게..ㅋ)
      await new Promise(resolve => setTimeout(resolve, 2000));

      // 앱 로드가 완료되고 표시할 준비가 되면 스플래시 화면을 숨기기 위해
      SplashScreen.hide();

      // Navigate to Selection
      navigation.navigate('Selection');
    };

    initializeApp();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image source={splashImage} style={styles.logo} />
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
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
});

export default Splash;