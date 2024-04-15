import React, { useState } from 'react'
import { Dimensions, Image, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native'
// import { ios, styles } from '../theme'
import { useNavigation } from '@react-navigation/native';
import { HeartIcon } from 'react-native-heroicons/solid';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from '../theme';
import MovieList from '../components/movieList';
import Loading from '../components/loading';

var { width, height } = Dimensions.get('window');
const ios = Platform.OS === "ios";
const verticalMargin = ios ? '' : 'my-3';

const PersonScreen = () => {
    const navigation = useNavigation();
    const [isFavourite, toggleFavourite] = useState(false);
    const [personMovieList, setPersonMovieList] = useState([1, 2, 3, 4, 5, 6]);
    const [loading, setLoading] = useState(false);
    return (
        <ScrollView className="bg-neutral-900 flex-1" contentContainerStyle={{ paddingBottom: 20 }}>
            {/* back button */}
            <SafeAreaView className={" z-20 w-full flex-row justify-between items-center px-4 " + verticalMargin}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.background} className="rounded-xl p-1">
                    <ChevronLeftIcon size={'28'} strokeWidth={2.5} color={'white'} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => toggleFavourite(!isFavourite)}>
                    <HeartIcon size={'35'} color={isFavourite ? 'red' : 'white'} />
                </TouchableOpacity>
            </SafeAreaView>

            {/* person details */}
            {
                loading ?
                    <Loading /> :
                    (
                        <View>
                            <View className="flex-row justify-center"
                                style={{
                                    shadowColor: "gray",
                                    shadowRadius: 0,
                                    shadowOffset: { width: 0, height: 5 },
                                    shadowOpacity: 1,

                                }}
                            >
                                <View className="items-center rounded-full overflow-hidden h-72 w-72 border-2 border-neutral-100 bg-black">
                                    <Image source={require('../assets/images/actor-1.webp')}
                                        style={{ height: '100%', width: '100%' }}
                                    />
                                </View>
                            </View>

                            <View className="mt-6">
                                <Text className="text-3xl text-white font-bold text-center">
                                    Keanu Reeves
                                </Text>
                                <Text className="text-base text-neutral-500 text-center">
                                    London, United Kingdom
                                </Text>
                            </View>
                            <View className="mx-3 p-4 mt-6 flex-row justify-between items-center bg-neutral-700 rounded-full">
                                <View className="border-r-2 border-r-neutral-400 px-2 items-center">
                                    <Text className="text-white font-semibold">Gender</Text>
                                    <Text className="text-neutral-400 text-sm">Male</Text>
                                </View>
                                <View className="border-r-2 border-r-neutral-400 px-2 items-center">
                                    <Text className="text-white font-semibold">Birthday</Text>
                                    <Text className="text-neutral-400 text-sm">1995-04-12</Text>
                                </View>
                                <View className="border-r-2 border-r-neutral-400 px-2 items-center">
                                    <Text className="text-white font-semibold">Known for</Text>
                                    <Text className="text-neutral-400 text-sm">Acting</Text>
                                </View>
                                <View className=" px-2 items-center">
                                    <Text className="text-white font-semibold">Popularity</Text>
                                    <Text className="text-neutral-400 text-sm">64.23</Text>
                                </View>
                            </View>
                            <View className="my-6 mx-4 space-y-2">
                                <Text className="text-white text-lg">Biography</Text>
                                <Text className="text-neutral-400 tracking-wide">
                                    Alban Lenoir (born 16 December 1980) is a French actor, screenwriter and stuntman.
                                    He was nominated for a Lumières Award for his leading role in the film French Blood (2015).
                                    As a stuntman, he has worked on Les Brigades du Tigre (2006), Taken (2008), Hero Corp (2008-2010),
                                    The Princess of Montpensier (2010), Outside the Law (2010), Point Blank (2010), Erased (2012).
                                </Text>
                            </View>

                            {/* Movie Lists */}

                            <MovieList title={'Movies'} hideSeeAll={true} data={personMovieList} />
                        </View>
                    )
            }

        </ScrollView>
    )
}

export default PersonScreen
