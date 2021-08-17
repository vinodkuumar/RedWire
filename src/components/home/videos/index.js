import React, {useEffect} from 'react';

import {
  View,
  Text,
  Button,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {Tile} from 'react-native-elements';
import {useSelector, useDispatch} from 'react-redux';
import {fetchVideos} from '../../../store/actions';

const VideosScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const video = useSelector(state => state.news.videos);
  const videos = video['items'];
  // console.log('videos data = ', videos.contentDetails.videoId);
  useEffect(() => {
    dispatch(fetchVideos());
  }, [dispatch]);

  const renderVideos = () => {
    return (
      <FlatList
        data={videos}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.demacate}
            onPress={() =>
              navigation.navigate('VideoScreen', {
                id: item.contentDetails.videoId,
              })
            }>
            <Text style={styles.item}>{item.snippet.title}</Text>
          </TouchableOpacity>
        )}
      />
    );
  };

  return <View>{renderVideos()}</View>;
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  demacate: {
    borderBottomColor: 'blue',
    borderBottomWidth: 2,
    borderRadius: 10,
  },
  item: {
    padding: 15,
    fontSize: 14,
    height: 50,
  },

  contentContainerStyle: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e1e8ee',
    shadowColor: 'rgba(0,0,0,0.2)',
  },
  containerStyle: {
    width: '100%',
    height: 250,
    marginBottom: 15,
  },
});

export default VideosScreen;
