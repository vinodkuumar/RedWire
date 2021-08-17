import React from 'react';
import {View,
    Text,
    ScrollView,
    ActivityIndicator,
    StyleSheet,
    ImageBackground
} from 'react-native';
import {Image} from 'react-native-elements';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ContentShow from '../../../../utils/contentShow';
import {toggleFavourites} from '../../../../store/actions/index';
import {useSelector,useDispatch} from 'react-redux';


const ArticleScreen = (props) => {
    const dispatch = useDispatch();
    const {articleUrl} = props.route.params;
    console.log('articleurl = ',articleUrl);
    const article = useSelector(state => state.news.articles.articles.find(article => article.url === articleUrl))

    const isFav = useSelector(state => 
      state.news.favourites.some(article => article.url === articleUrl))

    return(
        <View style={styles.container}>
        <View style={styles.heading}>
          <Text style={styles.title}>{article.title}</Text>
        </View>
        <View>
          <ImageBackground
            source={{uri: article.urlToImage}}
            style={styles.image}>
            <View style={styles.titleContainer}>
              <Text style={styles.author}>{article.author}</Text>
            </View>
            <MaterialIcons
              name={isFav ? 'favorite' : 'favorite-border'}
              color="#72bcd4"
              size={24}
              onPress={() => {
                dispatch(toggleFavourites(article.url));
              }}
            />
          </ImageBackground>
        </View>
        <View style={styles.description}>
          <Text style={styles.descriptionText}>{article.description}</Text>
        </View>
      </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginVertical: 20,
      },
      heading: {
        marginHorizontal: 20,
        marginBottom: 10,
      },
      titleContainer: {
        backgroundColor: 'rgba(0, 0, 0, 0.10)',
        paddingHorizontal: 10,
        paddingVertical: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
      title: {
        // fontFamily: 'Ubuntu-Bold',
        fontSize: 24,
      },
      image: {
        width: '100%',
        height: 200,
        justifyContent: 'flex-end',
      },
      author: {
        // fontFamily: 'Ubuntu-Regular',
        fontSize: 20,
        color: 'white',
        
      },
      description: {
        margin: 10,
      },
      descriptionText: {
        fontSize: 20,
        // fontFamily: 'Ubuntu-Regular',
      },
})

export default ArticleScreen;