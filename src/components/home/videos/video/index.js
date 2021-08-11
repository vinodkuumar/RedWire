import React from 'react';
import { View, Text,ScrollView } from 'react-native';
import ContentShow from '../../../../utils/contentShow';

const VideoScreen = () => {
    return(
        <ScrollView>
            <View>
                <ContentShow />
            </View>
        </ScrollView>
    )
}

export default VideoScreen;