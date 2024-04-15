import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { Image, SafeAreaView, ScrollView, Text, TextInput, TouchableNativeFeedback, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import { XMarkIcon } from 'react-native-heroicons/outline';
import { height, width } from '../theme';
import Loading from '../components/loading';

const SearchScreen = () => {
    const navigation = useNavigation();
    const movieName = "Ant-Man and the Wasp: Quantumania";
    const [results, setResults] = useState([1, 2, 3, 4]);
    const [loading, setLoading] = useState(false);
    return (
        <SafeAreaView className="bg-neutral-800 flex-1">
            <View className="mx-4 mb-3 flex-row justify-between items-center border border-neutral-500 rounded-full">
                <TextInput
                    placeholder='Search Movie'
                    placeholderTextColor={'lightgray'}
                    className="pb-1 pl-6 flex-1 text-base font-semibold text-white tracking-wider"
                />
                <TouchableOpacity
                    onPress={() => navigation.navigate('Home')}
                    className="rounded-full p-3 m-1 bg-neutral-500" >
                    <XMarkIcon size="25" color="white" />
                </TouchableOpacity>
            </View>
            {/* results */}
            {
                loading ? <Loading />
                    :
                    results.length > 0 ?
                        (
                            <ScrollView
                                showsVerticalScrollIndicator={false}
                                contentContainerStyle={{ paddingHorizontal: 15 }}
                                className="space-y-3">
                                <Text className="text-white font-semibold ml-1">Results ({results.length})</Text>
                                <View className="flex-row justify-between flex-wrap">
                                    {
                                        results.map((item, index) => {
                                            return (
                                                <TouchableWithoutFeedback key={index} onPress={() => navigation.navigate('Movie', item)}>
                                                    <View className="space-y-2 mb-4">
                                                        <Image className="rounded-3xl"
                                                            source={require('../assets/images/moviePoster-1.jpg')}
                                                            style={{ width: width * 0.44, height: height * 0.3 }} />
                                                        <Text className="text-neutral-300 ml-1">
                                                            {movieName.length > 22 ? movieName.substring(0, 22) + '...' : movieName}
                                                        </Text>
                                                    </View>
                                                </TouchableWithoutFeedback>
                                            )
                                        })
                                    }
                                </View>
                            </ScrollView>
                        ) : (
                            <View className="flex-row justify-center items-center">
                                <Image source={require('../assets/images/movieTime.png')} className="h-96 w-96" />
                            </View>
                        )
            }

        </SafeAreaView>
    )
}

export default SearchScreen
