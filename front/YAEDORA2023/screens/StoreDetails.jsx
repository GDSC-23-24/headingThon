import React, { useEffect, useState } from 'react';
import { TextInput, Button, Image, image, ActivityIndicator, style, StyleSheet, FlatList, Text, View, ScrollView } from 'react-native';


import Category from '../assets/images/category.png';
import Menu from '../assets/images/menu.png';
import Address from '../assets/images/food_map.png';
import love_full from '../assets/images/love_full.png';
import Rating from '../assets/images/star.png';
import Share from '../assets/images/share.png';
import Review from '../assets/images/review.png';


const ReviewComponent = () => {
  const [texts, setTexts] = useState([]);
  const [inputText, setInputText] = useState('');

  const submitBtn = () => {
    const updatedTexts = [inputText, ...texts];
    setTexts(updatedTexts);
    setInputText('');
  };

  return (
    <View>
      <TextInput
        style={styles.textInput}
        onChangeText={(text) => setInputText(text)}
        placeholder="리뷰를 남겨주세요"
      />
      <Button title="작성" onPress={submitBtn} style={styles.button} />
      <View style={styles.textsContainer}>
        {texts.map((text, index) => (
          <Text key={index} style={[styles.showText, { borderBottomWidth: 0.5, borderColor: 'gray', paddingVertical: 10 }]}>{text}</Text>
        ))}
      </View>
    </View>
  );
};


const StoreDetails = ({ route }) => {
  const [storeDetail, setStoreDetail] = useState(null);
  const { id } = route.params;

  useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:25565/store/detail/${id}`);
      const data = await response.json();
      console.log('Fetched data:', data); // Add this log
      setStoreDetail(data.storeDetailDto);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  fetchData();
}, [id]);


  return (
    <ScrollView>
    <View>
      {storeDetail && (
        <>
          <Text style={styles.storename}>{storeDetail.store.storename}</Text>

          <View style={{ backgroundColor: '#f1f3f5' }}>
            <View style={styles.rowContainer}>
              <Image source={Category} style={styles.image} />
              <Text style={styles.category}><Text style={{ fontWeight: 'bold' }}>카테고리 :</Text> <Text>{storeDetail.store.category}</Text></Text>
            </View>

            <View style={styles.rowContainer}>
              <Image source={Address} style={styles.image} />
              <Text style={styles.address}><Text style={{ fontWeight: 'bold' }}>주소:</Text> <Text>{storeDetail.store.fullAddress}</Text></Text>
            </View>

            <View style={styles.rowContainer2}>
              <View style={styles.rowItem}>
                <Image source={love_full} style={styles.image} />
                <Text style={styles.address}><Text>{storeDetail.likesCount}     </Text></Text>
              </View>

              <View style={styles.rowItem}>
                <Image source={Share} style={styles.image} />
                <Text style={styles.menu}> 공유     <Text></Text></Text>
              </View>

              <View style={styles.rowItem}>
                <Image source={Rating} style={styles.image} />
                <Text style={styles.address}><Text> {storeDetail.grade_avg}</Text></Text>
              </View>
            </View>
          </View>


          <View style={[styles.rowContainer, { backgroundColor: 'white' }]}>
            <Text></Text>
          </View>

          <View style={{ backgroundColor: '#f1f3f5' }}>
            <View style={[styles.rowContainer, { backgroundColor: '#f1f3f5', padding: 10 }]}>
              <Image source={Menu} style={styles.image} />

              <Text style={styles.menu}> 메뉴 <Text></Text></Text>
            </View>
            <Text style={styles.menu_list}>
              {storeDetail.menus.map((menu) => (
                <Text key={menu.id}>{menu.menuName}{'\n'}</Text>
              ))}
            </Text>

          </View>

          <View style={[styles.rowContainer, { backgroundColor: 'white' }]}>
            <Text></Text>
          </View>

          <View style={{ backgroundColor: '#f1f3f5', padding: 10 }}>
            <View style={[styles.rowContainer, { backgroundColor: '#f1f3f5' }]}>
              <Image source={Review} style={styles.image} />
              <View style={{ flexDirection: 'column', marginLeft: 10 }}>
                <Text style={styles.menu}> 리뷰 </Text>
                {/* 다른 스타일을 적용하고 싶다면 여기에 추가 */}
              </View>
            </View>
            <ReviewComponent />
            <Text >
            {storeDetail.reviewDtos.map((review) => (
            <Text style={[styles.showText, { borderBottomWidth: 0.5, borderColor: 'gray', paddingVertical: 10 }]}>{review.content}
            {'\n'}----------------------------------------------------------------------------{'\n'}</Text>
            ))}
            </Text>
          </View>


        </>
      )}
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({

  main: {
    flex: 1,
    backgroundColor: 'gray',
  },
  firstContainer: {
    flex: 1,
    backgroundColor: '#f1f3f5',

  },

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 30,
  },
  rowContainer2: {
    flexDirection: 'row',
    //justifyContent: 'center',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 30, // 또는 paddingHorizontal: 10

  },
  rowItem: {
    flexDirection: 'row',
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  rowContainer: {
    flexDirection: 'row',
    //justifyContent: 'center',
    alignItems: 'center',
  },

  image: {
    width: 25,
    height: 25,
  },

  storename: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 10,
    color: 'black'
  },

  category: {
    fontSize: 15,
    color: 'black',
    padding: 10
  },

  address: {
    fontSize: 15,
    fontFamily: 'Arial',
    padding: 10,
    color: 'black',
  },

  menu: {
    fontSize: 15,
    fontFamily: 'Arial',
    padding: 10,
    fontWeight: 'bold',
    color: 'black',
  },

  menu_list: {
    fontSize: 15,
    fontFamily: 'Arial',
    padding: 10,
    //fontWeight:'bold',
    color: 'black',
  },

  review: {
    fontSize: 15,
    fontFamily: 'Arial',
    padding: 10
  },

  textInput: {
    marginTop: 20,
    marginBottom: 10,
    paddingHorizontal: 10,
    height: 40,
    borderRadius: 10,
    borderColor: 'gray',
    borderWidth: 1,
    textAlign: 'center'
  },
  textsContainer: {
    marginTop: 10,
  },
  showText: {
    fontSize: 17,
  },

  button: {
    width: 100
  }

});

export default StoreDetails;