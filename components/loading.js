import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { height, theme, width } from '../theme';
import * as Progress from 'react-native-progress';

const Loading = () => {
    return (
        <View style={{ height, width }} className="absolute flex-row justify-center items-center">
            <Progress.CircleSnail thickness={10} size={100} color={theme.background} />
        </View>
    )
}

export default Loading;
