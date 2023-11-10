import React, { Component } from 'react';
import { TextInput, StyleSheet, View, Text, Alert, Button } from 'react-native';

export default function Community() {

  state = {
    texts: [], 
    inputText: ''
  }

  submitBtn = () => {
    const updatedTexts = [this.state.inputText, ...this.state.texts];
    this.setState({ texts: updatedTexts, inputText: '' });
  }

  
    return (
      <View style={styles.container}>
        <Text style={styles.headerText}>커뮤니티</Text>
        <View style={styles.bodyContainer}>
          <TextInput
            style={styles.textInput}
            onChangeText={(text) => { this.setState({ inputText: text }) }}
            placeholder="여러분들의 이야기를 들려주세요"
          />
          <Button title="글 작성하기" onPress={this.submitBtn}style={{backgroundColor:"white"}} />
          <View style={styles.textsContainer}>
            {this.state.texts.map((text, index) => (
              <Text key={index} style={[styles.showText, { borderBottomWidth: 0.5, borderColor: 'gray', paddingVertical: 10  }]}>{text}</Text>
              
            ))}
          </View>
          <View style={styles.textsContainer}>
            <Text style={[styles.showText, { borderBottomWidth: 0.5, borderColor: 'gray', paddingVertical: 15  }]}>
              맥도날드 알바생 예뻐요!!
            </Text>  
          </View>
          <View style={styles.textsContainer}>
            <Text style={[styles.showText, { borderBottomWidth: 0.5, borderColor: 'gray', paddingVertical: 15  }]}>
              화반 제육 맛있어요

            </Text>  
          </View>

          <View style={styles.textsContainer}>
            <Text style={[styles.showText, { borderBottomWidth: 0.5, borderColor: 'gray', paddingVertical: 15  }]}>
              하단에 가성비 맛집 추천해주세요

            </Text>  
          </View>
          
        </View>
      </View>
    );
  }


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F2F2F2',
    paddingHorizontal: 30,
    flex: 1,
  },
  headerText: {
    paddingTop: 50,
    alignItems: 'center',
    fontSize: 40,
    textAlign: 'center'
  },
  bodyContainer: {
    backgroundColor: '#D8D8D8',
    paddingHorizontal: 20,
    marginVertical: 30,
    flex: 1
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
  }
});


