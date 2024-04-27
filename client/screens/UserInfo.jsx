import React, { useState, useEffect } from 'react';
import { Text, TextInput, Image, TouchableOpacity, View } from 'react-native';

import { useUser } from '../contexts/UserContext';

import { CirclePlus, Plus, ArrowLeft } from 'lucide-react-native';

import EditProfilePicker from '../components/EditProfilePicker/EditProfilePicker';

import * as ImagePicker from 'expo-image-picker';
import { requestMethods, sendRequest } from '../core/tools/apiRequest';

// import {
//     Locations,
//     Instruments,
//     Genres,
//     Experiences,
//     Availabilities,
// } from '../core/enums/userDetails';

const { styles } = require('../components/AuthenticationForms/styles');

const UserInfo = ({ navigation }) => {
    const [profileProperties, setProfileProperties] = useState({});

    const { userInfo, setUserInfo, handleSignUp } = useUser();

    useEffect(() => {
        const getProperties = async () => {
            try {
                const response = await sendRequest(requestMethods.GET, 'auth/properties');
                if (response.status === 200) {
                    setProfileProperties(response.data.general);
                    userInfo.role_id === 1
                        ? setProfileProperties((prev) => ({ ...prev, ...response.data.musician }))
                        : setProfileProperties((prev) => ({ ...prev, ...response.data.venue }));
                    console.log('Properties:', response.data);
                }
            } catch (error) {
                console.error('Error getting properties:', error);
            }
        };
        getProperties();
    }, []);

    const handlePickerChange = (key, value) => {
        if (key === 'Location') {
            setUserInfo((prev) => ({ ...prev, key: value }));
            return;
        } else if (key === 'Genre') {
            setUserInfo((prev) => ({ ...prev, genres: [...prev.genres, value] }));
        } else {
            setUserInfo((prev) => ({ ...prev, [`${key.toLowerCase()}_id`]: value }));
        }
    };

    const handleImagePicker = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            console.error('Permission to access media library was denied');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        console.log(result);

        if (!result.cancelled && result.assets && result.assets.length > 0) {
            const uri = result.assets[0].uri;
            setUserInfo((prev) => ({ ...prev, profilePicture: uri }));
        }
    };

    return (
        <View style={styles.userInfoContainer}>
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <ArrowLeft size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.headerProfile}>Complete Your Profile</Text>
            </View>
            <View style={styles.addPhotoPrompt}>
                {userInfo.profilePicture ? (
                    <>
                        <Image
                            source={{ uri: userInfo.profilePicture }}
                            style={{ width: 100, height: 100, borderRadius: 50 }}
                        />
                    </>
                ) : (
                    <Text style={styles.addPhotoText}>Add a Photo</Text>
                )}
                <TouchableOpacity onPress={handleImagePicker}>
                    <CirclePlus size={50} color={'black'} />
                </TouchableOpacity>
            </View>
            <View>
                <Text style={styles.inputTextProfile}>{userInfo.userType === 'venue' ? 'Description' : 'Bio'}</Text>
                <TextInput
                    placeholder="Tell us about yourself!"
                    style={{ marginBottom: 20 }}
                    value={userInfo.about}
                    onChangeText={(text) => setUserInfo((prev) => ({ ...prev, about: text }))}
                />
                <View>
                    {Object.keys(profileProperties).length > 0 &&
                        Object.keys(profileProperties).map((key) => {
                            return (
                                <EditProfilePicker
                                    key={key}
                                    label={key}
                                    items={profileProperties[key]}
                                    selectedValue={
                                        userInfo[key.toLowerCase()] ??
                                        userInfo[key.toLowerCase() + '_id'] ??
                                        'Select an option'
                                    }
                                    onValueChange={(value) => handlePickerChange(key, value)}
                                />
                            );
                        })}
                </View>
            </View>
            <View style={styles.bottomInnerContainer}>
                <TouchableOpacity style={styles.primaryBtn}>
                    <Text style={styles.primaryBtnText} onPress={handleSignUp}>
                        Register
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default UserInfo;
