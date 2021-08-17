import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import ContentShow from '../../../../utils/contentShow';
import YouTube from 'react-native-youtube';
import {useSelector, useDispatch} from 'react-redux';
import {fetchVideos} from '../../../../store/actions';
import {useRoute} from '@react-navigation/native';

const VideoScreen = props => {
  const dispatch = useDispatch();
  const {params} = useRoute();
 // console.log('params = ', params);

  const json = useSelector(state => state.news.videos);
  const videos = json['items'];
  const videoId = props.route.params;

  //console.log('video id = ', videoId['id']);
  // const listVideoIds = [
  //     '4A426Yjm_jM',
  //     'BfmIgt_kPvM',
  //     'F9LwbmIWIr0'
  //   ];
  return (
    <ScrollView>
      <View>
        <YouTube
          apiKey="AIzaSyBVBzOASEl7eq50CM085LUoMYEnDP6WMCI"
          videoId={params['id'].toString()}
          play={false}
          onReady={e => console.log('ready')}
          onChangeState={e => console.log(e)}
          onError={error => console.log(error)}
          style={{alignSelf: 'stretch', height: 300}}
        />
        <Text>Example of youtube video playing</Text>
        <ContentShow />
      </View>
    </ScrollView>
  );
};

export default VideoScreen;
