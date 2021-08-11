import React from 'react';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import {View,Text,StyleSheet} from 'react-native';
import {Button} from 'react-native-elements';
import {Colors,LogoText} from './tools';


const SideDrawerCustom = (props) => {
    const mainOptions = [
        {title: 'News', location: 'Home'},
        {title: 'Videos', location: 'Videos'},
        {title: 'Profile', location: 'Profile'}
    ]
    return(
        <DrawerContentScrollView {...props}>
            <View>
                <LogoText 
                    style={{fontSize: 40, textAlign:'center', color:Colors.black2}}
                />
            </View>
            {mainOptions.map((item) => (
                <Button 
                    key={item.location}
                    title={item.title}
                    onPress={() => props.navigation.navigate(item.location)}
                    buttonStyle={styles.drawerButton}
                    titleStyle={{width: '100%'}}
                /> 
            ))}
            <Button 
                title="Logout"
                onPress={() => alert('Logout')}
                buttonStyle={styles.drawerButton}
                titleStyle={{width: '100%'}}
            />
        </DrawerContentScrollView>
    )
}

const styles = StyleSheet.create({
    drawerButton: {
        backgroundColor: Colors.black,
        borderBottomWidth: 1,
        borderBottomColor: Colors.black2
    }
})

export default SideDrawerCustom;