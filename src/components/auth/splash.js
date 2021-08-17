import React,{useEffect} from 'react';
import {ActivityIndicator,View,StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {registerUser,loginUser,logoutUser,authenticate} from '../../store/actions';
import {Colors} from '../../utils/tools';

const Splash = (props) => {
    const dispatch = useDispatch();
    useEffect(() => {
        const tryLogin = async () => {
            const userData = await AsyncStorage.getItem('userData')
            if(!userData){
                props.navigation.navigate('Main')
            }
            const transformedData = JSON.parse(userData)
            const {token,userId,expiryDate} = transformedData
            const expirationDate = new Date(expiryDate)

            if(expirationDate <= new Date() || !token || !userId){
                props.navigation.navigate('Main')
                return;
            }
            dispatch(authenticate(userId,token))
        }
        tryLogin()
    },[dispatch])
    return(
        <View style={styles.contentContainer}>
        <ActivityIndicator color={Colors.black} />
    </View>
    )
    
}

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        backgroundColor:Colors.red,
        alignItems: 'center',
        justifyContent: 'center'
    }
})


export default Splash;