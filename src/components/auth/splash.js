import React,{useEffect} from 'react';
import {ActivityIndicator,View,StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {registerUser,loginUser,logoutUser,authenticate} from '../../store/actions';
import {Colors} from '../../utils/tools';
import {MainStack,AuthStack} from '../../routes/Stacks';

const Splash = (props) => {
    const dispatch = useDispatch();
    useEffect(() => {
        const tryLogin = async () => {
            const userData = await AsyncStorage.getItem('userData');
            console.log('userData is ',userData);
            if(!userData){
                return(
                    <AuthStack />
                )
            }
            const transformedData = JSON.parse(userData)
            const {token,userId,expiryDate} = transformedData
            const expirationDate = new Date(expiryDate)

            if(expirationDate <= new Date() || !token || !userId){
                
                return(
                    <AuthStack />
                )
            }
            dispatch(authenticate(userId,token))
            return(
                <MainStack />
            )
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