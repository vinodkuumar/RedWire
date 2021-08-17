import React from 'react';
import { FlatList,View,Text } from 'react-native';
import { useSelector } from 'react-redux';
import Card from './Card';


const FavouritesScreen = props => {
    const favourites = useSelector(state => state.news.favourites);
    if(favourites.length > 0) {
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
    }else {
        return(
            <View style={{flex:1,justifyContent: 'center'}}>
                <Text style={{fontSize: 18,alignContent: 'center',justifyContent: 'center',alignItems: 'center', alignSelf: 'center'}}> No favourites found.Add more to see here</Text>
            </View>
        )
    }
    
    
}

export default FavouritesScreen;
