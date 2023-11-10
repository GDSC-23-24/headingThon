import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const notices = [
  { id: '1', title: '공지사항', content: '급식 카드를 가지고 있는 누구나 사용 가능' },
  { id: '2', title: '커뮤니티', content: '커뮤니티를 통해 밥친구를 만들고, 정보를 공유해요' },
  { id: '3', title: '공지사항', content: '오늘은 뭘 먹을까?' },
  { id: '4', title: '추천시스템', content: '좋아요를 누른 바탕으로 가게를 추천받아요!' },
  // Add more notices as needed
];

export default function Notice() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notices</Text>
      <FlatList
        data={notices}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.noticeItem}>
            <Text style={styles.noticeTitle}>{item.title}</Text>
            <Text style={styles.noticeContent}>{item.content}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  noticeItem: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  noticeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black'
  },
  noticeContent: {
    fontSize: 16,
  },
});
