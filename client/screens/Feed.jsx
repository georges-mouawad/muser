import React, { useEffect, useLayoutEffect } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

import { setConnectUsers, setFeedUsers, setUsers } from '../store/Users';
import { useUser } from '../contexts/UserContext';
import { useDispatch, useSelector } from 'react-redux';

import { sendRequest, requestMethods } from '../core/tools/apiRequest';

import FeedMemberCard from '../components/FeedMemberCard/FeedMemberCard';
import MasonryList from '@react-native-seoul/masonry-list';

import { utilities } from '../styles/utilities';

const avatar = require('../assets/avatar.png');

const Feed = ({ navigation }) => {
    const dispatch = useDispatch();
    const { currentUser } = useUser();
    const users = useSelector((global) => global.usersSlice.feedUsers);

    useEffect(() => {
        const getUsers = async () => {
            try {
                const response = await sendRequest(requestMethods.GET, 'users/type/musician', null);
                if (response.status !== 200) throw new Error('Failed to fetch users');
                dispatch(setConnectUsers(response.data.connectedUsers));
                dispatch(setFeedUsers(response.data.feedUsers));
            } catch (error) {
                console.log('Error fetching users:', error);
            }
        };
        getUsers();
    }, []);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () => <CustomHeader username={currentUser?.name} avatar={avatar} />,
        });
    });

    const CustomHeader = () => {
        const { currentUser } = useUser();
        return (
            <View style={styles.headerContainer}>
                <Image source={avatar} style={styles.avatar} />
                <View style={styles.textContainer}>
                    <Text style={[styles.welcomeDisplay, utilities.textM, utilities.noMb]}>Welcome</Text>
                    <Text style={[utilities.textL, utilities.textBold]}>{currentUser?.name}</Text>
                </View>
            </View>
        );
    };

    // const MemberCard = ({ user, height, navigation }) => {
    //     const imageUrl = `${profilePicturesUrl + user.picture}`;
    //     return (
    //         <TouchableOpacity
    //             style={[styles.cardContainer, { height: height || 180 }]}
    //             onPress={() => navigation.navigate('ProfileDetails', { user })}
    //         >
    //             <Image source={{ uri: imageUrl }} style={styles.photo} />
    //             <View style={styles.overlay}>
    //                 <Text style={styles.username}>{user.name}</Text>
    //                 <Guitar size={20} color="white" />
    //             </View>
    //         </TouchableOpacity>
    //     );
    // };

    return (
        // <View style={styles.cardsContainer}>
        //     {users && users.length > 0 && users.map((user) =>
        //         (<MemberCard key={user.firebaseUserId} username={user.name} photo={user.profilePicture} />)
        //     )}
        // </View>

        users?.length > 0 && (
            <MasonryList
                data={users}
                renderItem={({ item, index }) => {
                    const itemHeight = index % 2 === 1 ? 270 : 180;
                    return <FeedMemberCard user={item} height={itemHeight} navigation={navigation} />;
                }}
                keyExtractor={(item) => item.id}
                numColumns={2}
                style={{ flex: 1 }}
                contentContainerStyle={styles.cardsContainer}
            />
        )
    );
};

export default Feed;

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        marginRight: 8,
    },
    welcomeDisplay: {
        marginBottom: -2,
    },

    cardsContainer: {
        // flexDirection: 'row',
        // flexWrap: 'wrap',
        // justifyContent: 'center',
        // gap: 16,
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingTop: 8,
    },
});
