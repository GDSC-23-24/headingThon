import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { View, Text, StyleSheet, Image, FlatList } from 'react-native';

const profileImage = require('../imgSrc/004.png');

const userData = {
  nickname: '하윤지',
  likedStores: ['Store 1', 'Store 2', 'Store 3', 'Store 4', 'Store 3', 'Store 3', 'Store 3', 'Store 3', 'Store 3', 'Store 3'],
};
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

const MyPageScreen = () => {
  const [likeData, setLikeData] = useState([]);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchLikedStores();
  }, [fetchLikedStores]);

  const fetchLikedStores = async () => {
    try {
      const axiosObject = createAxiosObject();
      const response = await axiosObject.get('http://localhost:25565/store/like?member_id=1', { headers: { Accept: 'application/json' } });
      const likedStores = response.data.storeLikeDtos;
      setLikeData(likedStores);
      const storeIds = likedStores.map(store => store.store.id);
      fetchReviews(storeIds);
    } catch (error) {
      console.log('Error fetching liked stores:', error);
    }
  };
  const fetchReviews = async () => {
    try {
      const axiosObject = createAxiosObject();
      const response = await axiosObject.get('http://localhost:25565/store/review/member/1', { headers: { Accept: 'application/json' } });
      const reviewStores = response.data.ReviewDto;
      console.log(reviewStores);
      setReviews(reviewStores);
      const storeIds = reviewStores.map(store => store.store.id);
      fetchReviews(storeIds);
    } catch (error) {
      console.log('Error fetching liked stores:', error);
    }
  };


  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>마이페이지</Text>
      <Image source={profileImage} style={styles.profileImage} />
      <Text style={styles.nickname}>{userData.nickname}</Text>

      <Text style={styles.sectionTitle}>좋아하는 가게</Text>
      <FlatList
        data={likeData}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <Text style={styles.likedStore}>{item.store.storename}</Text>}
      />

      <Text style={styles.sectionTitle}>내가 쓴 리뷰</Text>
      <FlatList
        data={reviews}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => 
        <Text style={styles.likedStore}>{item.storeDto.storename} " : "{item.content}</Text>}
        
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
