import React, { useState } from 'react'
import { Dimensions, Image, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { styles, theme } from '../theme'
import { ChevronLeftIcon } from 'react-native-heroicons/outline'
import { HeartIcon } from 'react-native-heroicons/solid'
import { useNavigation, useRoute } from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient'

var { width, height } = Dimensions.get('window');
const ios = Platform.OS === "ios";
const topMargin = ios ? '' : 'mt-3';
function MovieScreen() {
    const { params: item } = useRoute();
    const [isFavourite, setIsFavourite] = useState(false);
    const navigation = useNavigation();
    let movieName = 'Ant-Man and the Wasp: Quantumania';
    return (
        <ScrollView
            contentContainerStyle={{ paddingBottom: 20 }}
            className="flex-1 bg-neutral-900"
        >
            {/* back button and movie poster */}
            <View className="w-full relative">
                <SafeAreaView className={"absolute z-20 w-full flex-row justify-between items-center px-4 " + topMargin}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.background} className="rounded-xl p-1">
                        <ChevronLeftIcon size="28" strokeWidth={2.5} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setIsFavourite(!isFavourite)}>
                        <HeartIcon size="35" color={isFavourite ? theme.background : "white"} />
                    </TouchableOpacity>
                </SafeAreaView>
                <View>
                    <Image
                        source={require('../assets/images/moviePoster-1.jpg')}
                        style={{ width, height: height * 0.55 }}
                    />
                    <LinearGradient
                        colors={['transparent', 'rgba(23,23,23,0.8)', 'rgba(23,23,23,1)']}
                        style={{ width, height: height * 0.40 }}
                        start={{ x: 0.5, y: 0 }}
                        end={{ x: 0.5, y: 1 }}
                        className="absolute bottom-0 " />
                </View>
            </View>
            {/* movie details */}
            <View className="space-y-3" style={{ marginTop: -(height * 0.09) }}>
                {/* Title */}
                <Text className="text-white text-center text-3xl font-bold tracking-wider">
                    {
                        movieName
                    }
                </Text>
                {/* status, realse, runtime */}
                <Text className="text-neutral-400 font-semibold text-base text-center">
                    Released . 2023 . 130 min
                </Text>
                {/* generes */}
                <View className="flex-row flex-wrap justify-center mx-4 space-x-2">
                    <Text className="text-neutral-400 font-semibold text-base text-center">
                        Action .
                    </Text>
                    <Text className="text-neutral-400 font-semibold text-base text-center">
                        Thrill .
                    </Text>
                    <Text className="text-neutral-400 font-semibold text-base text-center">
                        Comedy
                    </Text>
                </View>

                {/* description */}
                <Text className="text-neutral-400 mx-4 tracking-wide">
                    g for one of Ethiopia’s largest exporters for many years s
                    he set up Ephtah with the intention of empowering women fa
                    rmers and breaking down the barriers holding them back. As Q
                    grade certfified cupper, she is obsessed with finding the b
                    est quality coffee in Ethiopia. She cups every lot which Ep
                    htah buys and exports. Wubit believes in the enormous poten
                    tial of the Ethiopian coffee sector. She is convinced that
                    by taking a holistic approach, with
                    the partnership of clients, the coffee sector can
                    be the main driver of change in Ethiopia.
                </Text>
            </View>

        </ScrollView>
    )
}

export default MovieScreen
