import React, { useEffect, useState } from 'react'
import { Dimensions, Image, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { styles, theme } from '../theme'
import { ChevronLeftIcon } from 'react-native-heroicons/outline'
import { HeartIcon } from 'react-native-heroicons/solid'
import { useNavigation, useRoute } from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient'
import Cast from '../components/cast'
import MovieList from '../components/movieList'
import Loading from '../components/loading'
import { fetchMovieCredits, fetchMovieDetails, fetchSimilarMovies, image500 } from '../api/movieDb'

var { width, height } = Dimensions.get('window');
const ios = Platform.OS === "ios";
const topMargin = ios ? '' : 'mt-3';
function MovieScreen() {
    const { params: item } = useRoute();
    const [isFavourite, setIsFavourite] = useState(false);
    const [cast, setCast] = useState([1, 2, 3, 4, 5]);
    const [similarMovie, setSimilarMovie] = useState([1, 2, 3, 4, 5, 6]);
    const [loading, setLoading] = useState(false);
    const [movie, setMovie] = useState({})

    const navigation = useNavigation();
    let movieName = 'Ant-Man and the Wasp: Quantumania';
    useEffect(() => {
        setLoading(true);
        getMovieDetails(item.id);
        getMovieCasts(item.id);
        getSimilarMovies(item.id);
        console.log(item.id);
    }, [item])
    const getMovieDetails = async (id) => {
        const data = await fetchMovieDetails(id);
        if (data) {
            setMovie(data);
            setLoading(false);
        }
    }
    const getMovieCasts = async (id) => {
        const data = await fetchMovieCredits(id);
        if (data) {
            setCast(data.cast);
            console.log('cast', cast);
        }
    }

    const getSimilarMovies = async (id) => {
        const data = await fetchSimilarMovies(id);
        if (data) {
            setSimilarMovie(data.results);
            console.log('similar', data);
        }
    }

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
                {
                    loading ?
                        <Loading /> :
                        (
                            <View>
                                <Image
                                    // source={require('../assets/images/moviePoster-1.jpg')}
                                    source={{ uri: image500(movie?.poster_path) }}
                                    style={{ width, height: height * 0.55 }}
                                />
                                <LinearGradient
                                    colors={['transparent', 'rgba(23,23,23,0.8)', 'rgba(23,23,23,1)']}
                                    style={{ width, height: height * 0.40 }}
                                    start={{ x: 0.5, y: 0 }}
                                    end={{ x: 0.5, y: 1 }}
                                    className="absolute bottom-0 " />
                            </View>
                        )

                }

            </View>
            {/* movie details */}
            <View className="space-y-3" style={{ marginTop: -(height * 0.09) }}>
                {/* Title */}
                <Text className="text-white text-center text-3xl font-bold tracking-wider">
                    {
                        movie.title?.length > 14 ? movie.title.substring(0, 14) + '...' : movie.title
                    }
                </Text>
                {/* status, realse, runtime */}
                <Text className="text-neutral-400 font-semibold text-base text-center">
                    Released • {movie.release_date?.toString().split("-")[0]} • {movie?.runtime} min
                </Text>
                {/* generes */}
                <View className="flex-row flex-wrap justify-center mx-4 space-x-2">
                    {
                        movie.genres?.map((genre, index) => {
                            let showDot = index + 1 != movie.genres.length;
                            return (
                                <Text key={index} className="text-neutral-400 font-semibold text-base text-center">
                                    {genre.name} {showDot ? '•' : ''}
                                </Text>
                            )
                        })
                    }

                </View>

                {/* description */}
                <Text className="text-neutral-400 mx-4 tracking-wide">
                    {movie.overview}
                </Text>
            </View>

            {/* Cast */}
            {cast.length > 0 && <Cast navigation={navigation} cast={cast} />}

            {/* SimilarMovies */}
            {similarMovie.length > 0 && <MovieList title={'Similar Movies'} data={similarMovie} hideSeeAll={true} />}
        </ScrollView>
    )
}

export default MovieScreen
