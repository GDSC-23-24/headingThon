import React, { useEffect } from 'react';
import { View, Image, StyleSheet} from 'react-native';
import SplashScreen from 'react-native-splash-screen';;

// 이 부분에서 Splash 컴포넌트를 import하는 부분은 제거하십시오.
//import Splash from '파일경로/Splash'; // 제거

const Splash = ({ navigation }) => {
  useEffect(() => {
    const initializeApp = async () => {
      // 4초동안 스플래시 화면(좀있어보이게..ㅋ)
      await new Promise(resolve => setTimeout(resolve, 700));

      // 앱 로드가 완료되고 표시할 준비가 되면 스플래시 화면을 숨기기 위해
      SplashScreen.hide();

      // Navigate to Selection
      navigation.navigate('Start');
    };
    
    initializeApp();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image source={require('../imgSrc/splash.png')} style={styles.logo} /> 
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
    width: 400,
    height: 800,
    
  },
});


export default Splash; // Splash 컴포넌트를 export
