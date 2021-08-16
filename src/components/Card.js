import React from 'react';
import {View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useDispatch, useSelector} from 'react-redux';

import * as newsAction from '../store/actions';

const Card = props => {
    const dispatch = useDispatch();
    return(
        <TouchableOpacity
      onPress={() => {
        props.navigation.navigate('Article_screen', {
          articleUrl: props.url
        })
      }}>
      <View style={styles.card}>
        <View style={styles.imageWrapper}>
          <Image
            source={{
              uri: props.image
                ? props.image
                : 'https://heise.cloudimg.io/bound/1200x1200/q85.png-lossy-85.webp-lossy-85.foil1/_www-heise-de_/imgs/18/3/1/2/6/0/6/4/shutterstock_370707185-2b6e8e49424d0472.jpeg',
            }}
            style={styles.image}
          />
        </View>
        <View style={styles.titleWrapper}>
          <Text style={styles.title}>
            {props.title && props.title.length > 22
              ? props.title.slice(0, 22) + '...'
              : props.title}
          </Text>
          {/* <MaterialIcons
            name={isFav ? 'favorite' : 'favorite-border'}
            color="#72bcd4"
            size={24}
            onPress={() => {
              dispatch(newsAction.toggleFavourites(props.url));
            }}
          /> */}
        </View>
        <View style={styles.descriptionWrapper}>
          <Text style={styles.description}>
            {props.description && props.description.length > 100
              ? props.description.slice(0, 100) + '...'
              : props.description}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    card: {
      backgroundColor: '#ffffff',
      height: 300,
      margin: 20,
      borderRadius: 10,
      shadowColor: 'black',
      shadowOpacity: 0.25,
      shadowOffset: {width: 0, height: 2},
      shadowRadius: 8,
      elevation: 5,
    },
    imageWrapper: {
      width: '100%',
      height: '60%',
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      overflow: 'hidden',
    },
    image: {
      height: '100%',
      width: '100%',
    },
    titleWrapper: {
      height: '10%',
      paddingHorizontal: 15,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 10,
    },
    title: {
      fontSize: 20,
      
    },
    description: {
      
      fontSize: 15,
      marginTop: 10,
    },
    descriptionWrapper: {
      paddingHorizontal: 15,
    },
  });
  
  export default Card;
  