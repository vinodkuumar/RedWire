import React from 'react';
import { FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import Card from './Card';


const FavouritesScreen = props => {
    const favourites = useSelector(state => state.news.favourites);
    return(
        <FlatList 
            data={favourites}
            keyExtractor={item => item.url}
            renderItem={({item}) => (
                <Card 
                    navigation={props.navigation}
                    title={item.title}
                    image={item.urlToImage}
                    description={item.description}
                    url = {item.url}
                />
            )}
        />
    )
}

export default FavouritesScreen;
