import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';

import { ChevronLeft, CircleCheckBig } from 'lucide-react-native';

import { colors, utilities } from '../styles/utilities';

import { sendRequest, requestMethods } from '../core/tools/apiRequest';
import { generateHours, generateRandomDates } from '../core/data/generateDatetime';

import DetailsPill from '../components/DetailsPill/DetailsPill';
import ProfileDetailsPicker from '../components/ProfileDetailsPicker/ProfileDetailsPicker';
import PrimaryBtn from '../components/Elements/PrimaryBtn';

const ShowDetails = ({ route, navigation }) => {
    const [switchHandler, setSwitchHandler] = useState(false);
    const [userBands, setUserBands] = useState([]);
    const [genres, setGenres] = useState([]);
    const hours = generateHours();
    const dates = generateRandomDates(5);
    const [showBooking, setShowBooking] = useState({
        name: '',
        date: '',
        time: '',
        band_id: '',
        venue_id: '',
        picture: '',
        genres: [],
    });
    // const { venue } = route.params;

    console.log('showbooking', showBooking);

    useEffect(() => {
        const getUserBands = async () => {
            try {
                const response = await sendRequest(requestMethods.GET, 'bands/me', null);
                if (response.status !== 200) throw new Error('Failed to fetch user bands');
                console.log(response.data);
                setUserBands(response.data);
            } catch (error) {
                console.log('Error fetching user bands:', error);
            }
        };

        const getGenres = async () => {
            try {
                const response = await sendRequest(requestMethods.GET, 'genres', null);
                if (response.status !== 200) throw new Error('Failed to fetch genres');
                console.log(response.data);
                setGenres(response.data);
            } catch (error) {
                console.log('Error fetching genres:', error);
            }
        };

        getUserBands();
        getGenres();
    }, []);

    const durations = [
        {
            id: 1,
            name: '1 hour',
        },
        {
            id: 2,
            name: '2 hours',
        },
        {
            id: 3,
            name: '3 hours',
        },
        {
            id: 4,
            name: '> 3 hours',
        },
    ];

    const availabilities = [
        {
            id: 1,
        },
    ];

    const title = 'Paloma';

    const handleProceed = () => {
        // navigation.navigate('ShowConfirmation')
        try {
        } catch (error) {}
        setSwitchHandler(true);
    };

    const handlePress = (genreId) => {
        let newGenres = [];
        if (showBooking.genres.includes(genreId)) {
            newGenres = showBooking.genres.filter((id) => id !== genreId);
        } else {
            newGenres = [...showBooking.genres, genreId];
        }
        setShowBooking((prev) => ({ ...prev, genres: newGenres }));
    };

    if (userBands)
        return (
            <View style={styles.main}>
                <View style={[utilities.container, styles.overviewContainer]}>
                    <View style={[utilities.flexRow, utilities.center, { marginBottom: 24 }]}>
                        <ChevronLeft
                            size={24}
                            color="white"
                            style={{ position: 'absolute', left: 0 }}
                            onPress={() => navigation.goBack()}
                        />
                        <Text style={[utilities.textL, utilities.myFontBold]}>{title}</Text>
                    </View>
                    <View>
                        <Text style={[utilities.inputLabel]}>Show</Text>
                        <TextInput
                            placeholder="What are you calling this show?"
                            placeholderTextColor={colors.gray}
                            cursorColor={colors.primary}
                            style={[utilities.textM,{ marginBottom: 20, color: colors.gray }]}
                            value={showBooking.name}
                            onChangeText={(text) => setShowBooking((prev) => ({ ...prev, name: text }))}
                        />
                        <ProfileDetailsPicker
                            items={userBands}
                            label={'Band'}
                            selectedValue={showBooking.band_id}
                            onValueChange={(value) =>
                                setShowBooking((prev) => ({
                                    ...prev,
                                    band_id: value,
                                }))
                            }
                        />
                        {/* <ProfileDetailsPicker
                            items={dates}
                            label={'Date'}
                            selectedValue={showBooking.date}
                            onValueChange={(value) => setShowBooking((prev) => ({ ...prev, date: value }))}
                        />
                        <ProfileDetailsPicker
                            items={hours}
                            label={'Show Starts'}
                            selectedValue={showBooking.time}
                            onValueChange={(value) => setShowBooking((prev) => ({ ...prev, time: value }))}
                        /> */}
                        {genres && genres.length > 0 && (
                            <View style={styles.showGenresContainer}>
                                <Text style={styles.inputTextProfile}>Music Genres</Text>
                                {genres.map((genre) => (
                                    <DetailsPill
                                        key={genre.id}
                                        item={genre}
                                        handlePress={handlePress}
                                        isSelected={showBooking.genres.includes(genre.id)}
                                    />
                                ))}
                            </View>
                        )}

                        {/* <Text style={[utilities.textCenter, utilities.myFontBold, { fontSize: 18 }]}>Availability</Text> */}
                    </View>
                    <View style={styles.bottomInnerContainer}>
                        <Text style={[utilities.errorText]}>Hello</Text>
                        <PrimaryBtn text="Confrim" handlePress={handleProceed} />
                    </View>
                </View>
            </View>
        );
};

export default ShowDetails;

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: colors.bgDarkest,
    },
    overviewContainer: {
        marginTop: 64,
        backgroundColor: colors.bgDark,
        borderTopEndRadius: utilities.borderRadius.xl,
        borderTopLeftRadius: utilities.borderRadius.xl,
        paddingTop: 24,
        justifyContent: 'space-between',
    },
    showGenresContainer: {
        marginBottom: 20,
    },
});
