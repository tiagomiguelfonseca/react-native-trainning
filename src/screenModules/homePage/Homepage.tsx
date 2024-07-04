import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {fetchData} from '../../api/api';
const HomeScreen = () => {
  const [stories, setStories] = useState([]);
  const [posts, setPosts] = useState([]);
  console.log(posts, 'posts');
  useEffect(() => {
    fetchData()
      .then(data => {
        console.log(data, 'data');
        setStories(data.stories);
        setPosts(data.posts);
      })
      .catch(error => {
        console.error('Error loading data:', error);
      });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Icon name="camera" size={24} color="#000" />
        <Image
          source={require('../../assets/images/inst.png')}
          style={styles.logo}
        />
        <Icon name="send-o" size={24} color="#000" />
      </View>
      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Stories</Text>
          {/* <View style={styles.placeholder} /> */}
          <FlatList
            horizontal
            data={stories}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => (
              <View style={styles.story}>
                <Image source={{uri: item.image}} style={styles.storyImage} />
                <Text style={styles.storyUsername}>{item.username}</Text>
              </View>
            )}
          />
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Posts</Text>
          <View style={styles.placeholder} />
        </View>
      </ScrollView>
      <View style={styles.navBar}>
        <Icon name="home" size={24} color="#000" />
        <Icon name="search" size={24} color="#000" />
        <Icon name="plus-square-o" size={24} color="#000" />
        <Icon name="heart-o" size={24} color="#000" />
        <Icon name="user-o" size={24} color="#000" />
      </View>
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
