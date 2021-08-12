import {firebase,userCollection} from '../../firebase';

export const registerUser = async({email,password}) => {
    try{
        const response = await firebase.auth()
        .createUserWithEmailAndPassword(email,password)

        const {user} = response;
        const userProfile = {
            uid: user.uid,
            email: email
        }
        await userCollection.doc(user.uid).set(userProfile);
        return {
            isAuth: true,
            user: userProfile
        }
    }
    catch(error) {
        return{
            error: error.message
        }
    }
}