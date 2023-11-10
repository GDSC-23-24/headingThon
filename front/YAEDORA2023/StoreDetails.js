//App.js에서 작업함.
//파일명은 StoreDetails.js이지만 App.js에서 작업한 코드임
//현재 작업한 부분까지 
//<특징>
/*
1) 내비게이션 기능(뒤로 가기 기능 x)
2) http://localhost:25565/store 에 데이터 가져옴.
3) 전체 상세페이지 (모든 가게에 대해서 ) 다 보임 
4) 별점, 좋아요, 메뉴 는 하드코딩 함.
5) 리뷰 기능 구현 o -> 앱 재로딩시 저장되진 x
6) 좋아요 누르는 기능 구현 x (버튼 이벤트 발생시  좋아요 숫자 증가, love_empty.png -> love_full.png 로 변경하는 기능 아직 구현하지 않음. png파일은 다 다운받아 둠)

*/ 

import React, {useEffect, useState} from 'react';
import {TextInput,Button, Image,image, ActivityIndicator, style, StyleSheet, FlatList, Text, View} from 'react-native';
import MainScreen2 from './screens/MainSreen2.js';

import Category from './assets/images/category.png';
import Menu from './assets/images/menu.png';
import Address from './assets/images/food_map.png';
import love_full from './assets/images/love_full.png';
import love_empty from './assets/images/love_empty.png';
import Rating from './assets/images/star.png';
import Share from './assets/images/share.png';
import Review from './assets/images/review.png';
//let Category = require('./assets/images/category.png');

/*윤지가 준 코드

import React from 'react';
import { View, Text } from 'react-native';

const StoreDetails = ({ route }) => {
  const { storename } = route.params;
  
  return (
    <View>
      <Text>Store Name: {storename}</Text>
      
    </View>
  );
};

//export default StoreDetails;
*/

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
      <Button title="작성" onPress={submitBtn} style={styles.button}  />
      <View style={styles.textsContainer}>
        {texts.map((text, index) => (
          <Text key={index} style={[styles.showText, { borderBottomWidth: 0.5, borderColor: 'gray', paddingVertical: 10 }]}>{text}</Text>
        ))}
      </View>
    </View>
  );
};

const App = () => {
  
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  //1) 전체 store data 가져오기
  const getStores = async () => {
    try {
      const response = await fetch('http://localhost:25565/store');
      const json = await response.json();
      setData(json.stores);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    getStores();
  }, []);

  //2) 메뉴, 별점, 리뷰 데이터 가져오기
  

  return (
    
    
    <View style={{flex: 1, padding: 24}}>
      <Text>*** 상세페이지 만드는 중~ing ***</Text>
       
 
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={data}
          keyExtractor={({id}) => id}
          renderItem={({item}) => (
            <View>
              <Text style={{ fontWeight: 'bold', paddingTop:20 }}> No : {item.id}</Text>
              <Text>{item.storeName}</Text>

              <Text style={styles.storename}>{item.storename}</Text>

              <View style={styles.main}> 

              <View style={styles.firstContainer}>

                <View style={styles.rowContainer}>
                  <Image source={Category} style={styles.image}/>
                  <Text style={styles.category}><Text style={{fontWeight:'bold'}}>카테고리 :</Text> <Text>{item.category}</Text></Text>
                </View>

                <View style={styles.rowContainer}>
                  <Image source={Address} style={styles.image}/>
                  <Text style={styles.address}><Text style={{fontWeight:'bold'}}>주소:</Text> <Text>{item.fullAddress}</Text></Text>
                </View>

              
                <View style={styles.container}>
                  <View style={styles.rowContainer2}>
                    <View style={styles.rowItem}>
                      <Image source={love_full} style={styles.image}/>
                      <Text style={styles.address}><Text>10     </Text></Text>
                    </View>


                    <View style={styles.rowItem}>
                      <Image source={Share} style={styles.image}/>
                      <Text style={styles.menu}> 공유     <Text></Text></Text>
                    </View>

                    <View style={styles.rowItem}>
                      <Image source={Rating} style={styles.image}/>
                      <Text style={styles.address}><Text>4.5</Text></Text>
                    </View>

                  </View>
                </View>

              </View>
            </View>
                          
              

            <View style={[styles.rowContainer, { backgroundColor: 'white' }]}>
              <Text></Text>
            </View>

            <View style={{backgroundColor:'#f1f3f5'}}>
            <View style={[styles.rowContainer, { backgroundColor: '#f1f3f5', padding: 10 }]}>
                <Image source={Menu} style={styles.image}/>
                
                <Text style={styles.menu}> 메뉴 <Text></Text></Text>
              </View>
              <Text style={styles.menu_list}>메뉴1 하드코딩</Text>
              <Text style={styles.menu_list}>메뉴2 하드코딩</Text>
              <Text style={styles.menu_list}>메뉴3 하드코딩</Text>
            </View>
              
              <View style={[styles.rowContainer, { backgroundColor: 'white' }]}>
              <Text></Text>
              </View>

              <View style={{backgroundColor:'#f1f3f5'}}>
              <View style={[styles.rowContainer, { backgroundColor: '#f1f3f5', padding: 10 }]}>
                <Image source={Review} style={styles.image}/>
                <Text style={styles.menu}> 리뷰 <Text></Text></Text>
                
              </View>
              <ReviewComponent />
              </View>
              
            </View>
            
          )
        }
        />
      )}
    </View>
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

  storename:{
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    padding:10,
    color:'black'
  },

  category:{ 
    fontSize: 15, 
    color: 'black' ,
    padding:10
  },

  address:{
    fontSize: 15, 
    fontFamily: 'Arial', 
    padding:10,
    color: 'black' ,
  },

  menu:{
    fontSize: 15, 
    fontFamily: 'Arial', 
    padding:10,
    fontWeight:'bold',
    color:'black',
  },

  menu_list:{
    fontSize: 15, 
    fontFamily: 'Arial', 
    padding:10,
    //fontWeight:'bold',
    color:'black',
  },

  review:{
    fontSize: 15, 
    fontFamily: 'Arial', 
    padding:10
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

  button:{
    width:100
  }

  


  

});


export default App;