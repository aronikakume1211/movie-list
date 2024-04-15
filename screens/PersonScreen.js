import React, { useEffect, useState } from 'react'
import { Dimensions, Image, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native'
// import { ios, styles } from '../theme'
import { useNavigation, useRoute } from '@react-navigation/native';
import { HeartIcon } from 'react-native-heroicons/solid';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from '../theme';
import MovieList from '../components/movieList';
import Loading from '../components/loading';
import { fetchPersonDetails, fetchPersonMovies, image185 } from '../api/movieDb';

var { width, height } = Dimensions.get('window');
const ios = Platform.OS === "ios";
const verticalMargin = ios ? '' : 'my-3';

const PersonScreen = () => {
    const { params: item } = useRoute();
    const navigation = useNavigation();
    const [isFavourite, toggleFavourite] = useState(false);
    const [personMovieList, setPersonMovieList] = useState([1, 2, 3, 4, 5, 6]);
    const [loading, setLoading] = useState(false);
    const [person, setPerson] = useState({})
    useEffect(() => {
        setLoading(true);
        getPersonDetails(item.id);
        getPersonMoviesList(item.id);

    }, [item])

    const getPersonDetails = async (id) => {
        const data = await fetchPersonDetails(id);
        if (data) {
            setPerson(data);
            setLoading(false);
            console.log('person', person);
        }
    }

    const getPersonMoviesList = async id => {
        const data = await fetchPersonMovies(id);
        if (data) {
            setPersonMovieList(data.cast);
        }
    }


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
                                    <Image source={{ uri: image185(person?.profile_path) }}
                                        style={{ height: '100%', width: '100%' }}
                                    />
                                </View>
                            </View>

                            <View className="mt-6">
                                <Text className="text-3xl text-white font-bold text-center">
                                    {person?.name}
                                </Text>
                                <Text className="text-base text-neutral-500 text-center">
                                    {person?.place_of_birth}
                                </Text>
                            </View>
                            <View className="mx-3 p-4 mt-6 flex-row justify-between items-center bg-neutral-700 rounded-full">
                                <View className="border-r-2 border-r-neutral-400 px-2 items-center">
                                    <Text className="text-white font-semibold">Gender</Text>
                                    <Text className="text-neutral-400 text-sm">{(person?.gender === 1) ? 'Female' : 'Male'}</Text>
                                </View>
                                <View className="border-r-2 border-r-neutral-400 px-2 items-center">
                                    <Text className="text-white font-semibold">Birthday</Text>
                                    <Text className="text-neutral-400 text-sm">{person?.birthday}</Text>
                                </View>
                                <View className="border-r-2 border-r-neutral-400 px-2 items-center">
                                    <Text className="text-white font-semibold">Known for</Text>
                                    <Text className="text-neutral-400 text-sm">{person?.known_for_department}</Text>
                                </View>
                                <View className=" px-2 items-center">
                                    <Text className="text-white font-semibold">Popularity</Text>
                                    <Text className="text-neutral-400 text-sm">{person?.popularity?.toFixed(2)}</Text>
                                </View>
                            </View>
                            <View className="my-6 mx-4 space-y-2">
                                <Text className="text-white text-lg">Biography</Text>
                                <Text className="text-neutral-400 tracking-wide">
                                    {
                                        person?.biography ? person?.biography : 'No biography available'
                                    }

                                </Text>
                            </View>

                            {/* Movie Lists */}
                            {
                                personMovieList && <MovieList title={'Movies'} hideSeeAll={true} data={personMovieList} />
                            }
                        </View>
                    )
            }

        </ScrollView>
    )
}

export default PersonScreen
