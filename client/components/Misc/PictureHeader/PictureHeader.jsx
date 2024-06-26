import React from 'react';
import { StyleSheet, Text, View, Image, Pressable } from 'react-native';

import { profilePicturesUrl } from '../../../core/tools/apiRequest';

import { utilities } from '../../../styles/utilities';

const PictureHeader = ({ name, picture, handlePress, welcome = false }) => {
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {picture && (
                    <Pressable onPress={handlePress}>
                        <Image source={{ uri: profilePicturesUrl + picture }} style={styles.avatar} />
                    </Pressable>
                )}
                <View style={styles.textContainer}>
                    {welcome && <Text style={[styles.welcomeDisplay, utilities.textM, utilities.noMb]}>Welcome</Text>}
                    <Text
                        style={[
                            welcome ? utilities.textL : utilities.textM,
                            utilities.myFontMedium,
                            { marginTop: -4, color: 'white', marginLeft: 0 },
                        ]}
                    >
                        {name}
                    </Text>
                </View>
            </View>
        </View>
    );
};

export default PictureHeader;

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        marginRight: 10,
        marginLeft: 0,

        borderColor: 'white',
        borderWidth: 0.5,
    },
    welcomeDisplay: {
        marginBottom: -2,
        color: 'white',
    },
});
