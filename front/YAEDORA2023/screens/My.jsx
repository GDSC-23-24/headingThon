import React from 'react';
import { View, Text, StyleSheet, Image, FlatList } from 'react-native';

const profileImage = require('../imgSrc/004.png');

const userData = {
  nickname: '하윤지',
  likedStores: ['Store 1', 'Store 2', 'Store 3', 'Store 4', 'Store 3', 'Store 3', 'Store 3', 'Store 3', 'Store 3', 'Store 3'],
  reviews: [
    { id: '1', store: '의영은 만찢남', content: '맛있어욤' },
    { id: '2', store: '지우의 햇살미소', content: '친절해요' },
    { id: '3', store: '승지는 섬섬옥수', content: '가격이 싸요' },
    { id: '4', store: 'store', content: 'Review' },
    { id: '5', store: 'store', content: 'Review' },
    { id: '6', store: 'store', content: 'Review' },
    
  ],
};

const MyPageScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>마이페이지</Text>
      <Image source={profileImage} style={styles.profileImage} />
      <Text style={styles.nickname}>{userData.nickname}</Text>

      <Text style={styles.sectionTitle}>좋아하는 가게</Text>
      <FlatList
        data={userData.likedStores}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <Text style={styles.likedStore}>{item}</Text>}
      />

      <Text style={styles.sectionTitle}>내가 쓴 리뷰</Text>
      <FlatList
        data={userData.reviews}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.reviewContainer}>
            <Text style={styles.storeName}>{item.store}</Text>
            <Text style={styles.reviewContent}>{item.content}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
  },
  nickname: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  sectionTitle: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
  },
  likedStore: {
    fontSize: 16,
    marginVertical: 5,
  },
  reviewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  storeName: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
  },
  reviewContent: {
    flex: 2,
    fontSize: 16,
  },
});

export default MyPageScreen;
