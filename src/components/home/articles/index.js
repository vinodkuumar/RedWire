import React, {useEffect} from 'react';
import {
  View,
  Text,
  Button,
  ScrollView,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import Card from '../../Card';
import {useDispatch, useSelector} from 'react-redux';
import * as newsAction from '../../../store/actions';

const HomeScreen = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(newsAction.fetchArticles());
  }, [dispatch]);
  const {articles} = useSelector(state => state.news.articles);
//  console.log('articles = ', articles);

  return (
    <FlatList
      data={articles}
      keyExtractor={item => item.url}
      renderItem={({item}) => (
        <Card
          navigation={props.navigation}
          title={item.title}
          image={item.urlToImage}
          description={item.description}
          url={item.url}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  cardTitle: {
    fontSize: 20,
    textAlign: 'left',
  },
  cardText: {
    marginBottom: 10,
    marginTop: 10,
  },
});

export default HomeScreen;
