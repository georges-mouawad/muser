import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity } from 'react-native';

import { useUser } from '../contexts/UserContext';
import { sendRequest, requestMethods, showsPicturesUrl, profilePicturesUrl } from '../core/tools/apiRequest';

import { colors, utilities } from '../styles/utilities';

import ModalHigh from '../components/Modals/ModalHigh';

import { setShows } from '../store/Shows';
import { useDispatch, useSelector } from 'react-redux';
import { formatDateString, truncateText } from '../core/tools/formatDate';

const Streams = ({ navigation }) => {
    const dispatch = useDispatch();

    const { currentUser } = useUser();

    const shows = useSelector((global) => global.showsSlice.shows);

    console.log(currentUser.role.id);

    useEffect(() => {
        const getShows = async () => {
            try {
                const response = await sendRequest(
                    requestMethods.GET,
                    `shows?status=set${currentUser.role.id === 2 ? `&venue_id=${currentUser.id}` : ''}`,
                    null
                );
                if (response.status !== 200) throw new Error('Failed to fetch shows');
                console.log('Shows:', response.data);
                dispatch(setShows(response.data));
            } catch (error) {
                console.log('Error fetching shows:', error);
            }
        };

        getShows();
    }, []);

    const StreamCard = ({ show }) => {
        return (
            <TouchableOpacity style={styles.cardContainer} onPress={() => navigation.navigate('StreamView')}>
                <Image source={{ uri: showsPicturesUrl + show.picture }} style={styles.backgroundImage} />
                <View style={styles.overlay}>
                    <View>
                        <Text style={[styles.streamName]}>{truncateText(show.name)}</Text>

                        <Text style={styles.date}>{formatDateString(show.date)}</Text>
                    </View>
                </View>
                    <View style={styles.avatarsDisplay}>
                        {show.band.members.map((member) => (
                            <Image
                                source={{ uri: profilePicturesUrl + member.picture }}
                                style={{ width: 32, height: 32, borderRadius: 16 }}
                            />
                        ))}
                    </View>
            </TouchableOpacity>
        );
    };
    return (
        <ModalHigh
            title="Upcoming Shows"
            navigation={navigation}
            items={shows}
            renderItem={({ item }) => <StreamCard key={item.id} show={item} />}
        />
    );
};

export default Streams;

const styles = StyleSheet.create({
    cardContainer: {
        width: '100%',
        height: 180,
        overflow: 'hidden',
        position: 'relative',
        borderRadius: utilities.borderRadius.m,
        marginBottom: 16,
    },
    backgroundImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    overlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '50%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 16,
        justifyContent: 'space-between',
    },
    avatarsDisplay: {
        position: 'absolute',
        right: 8,
        top: 8,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    streamName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
    },
    date: {
        fontSize: 16,
        color: 'white',
    },
});
