import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView, Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {fetchData} from '../../api/api';
import SGTouchable from '../../components/SGTouchable';

const HomeScreen = navigation => {
  const [stories, setStories] = useState([]);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchData()
      .then(data => {
        setStories(data.stories);
        setPosts(data.posts);
      })
      .catch(error => {
        console.error('Error loading data:', error);
      });
  }, []);

  console.log(stories, posts);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <SGTouchable onPress={() => navigation.navigate('Camera')}>
          <Icon name="camera" size={24} color="#000" />
        </SGTouchable>
        <Image
          source={require('../../assets/images/inst.png')}
          style={styles.logo}
        />
        <Icon name="send-o" size={24} color="#000" />
      </View>
      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Stories</Text>
          <View style={styles.placeholder} />
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Posts</Text>
          <View style={styles.placeholder} />
        </View>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  logo: {
    width: 100,
    height: 40,
    resizeMode: 'contain',
  },
  content: {
    flex: 1,
  },
  section: {
    padding: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  placeholder: {
    height: 200,
    backgroundColor: '#eee',
    borderRadius: 10,
  },
  navBar: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
});
export default HomeScreen;
