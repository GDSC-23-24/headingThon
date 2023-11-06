import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MyPageScreen = () => {
  // 이곳에 사용자 정보나 설정을 

  return (
    <View style={styles.container}>
      <Text style={styles.title}>마이페이지</Text>
      {/*  */}
    </View>
  );
};

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
    marginBottom: 10,
    textAlign: 'center',
  },
});

export default MyPageScreen;
