import React from 'react'
import { Dimensions, Image, ScrollView, Text, TouchableNativeFeedback, TouchableOpacity, View } from 'react-native'
import { styles } from '../theme'
import { useNavigation } from '@react-navigation/native';

var { width, height } = Dimensions.get('window');

function MovieList({ title, data }) {
    let movieName = 'Ant-Man and the Wasp: Quantumania';
    const navigation = useNavigation();
    return (
        <View className="mb-8 space-y-4">
            <View className="mx-4 flex-row justify-between items-center">
                <Text className="text-white text-xl">{title}</Text>
                <TouchableOpacity>
                    <Text style={styles.text}>See All</Text>
                </TouchableOpacity>
            </View>

            {/* movie row */}
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 15 }}>
                {
                    data.map((item, index) => {
                        return (
                            <TouchableNativeFeedback key={index} onPress={() => navigation.navigate('MovieDetails', item)}>
                                <View className="space-y-1 mr-4">
                                    <Image
                                        source={require('../assets/images/moviePoster-1.jpg')}
                                        className="rounded-3xl"
                                        style={{ width: width * 0.33, height: height * 0.22 }}
                                    />
                                    <Text className="text-neutral-300 text-sm">
                                        {
                                        movieName.length>14?movieName.substring(0,14)+'...':movieName
                                        }
                                        </Text>
                                </View>
                            </TouchableNativeFeedback>
                        )
                    })
                }
            </ScrollView>
        </View>
    )
}

export default MovieList
