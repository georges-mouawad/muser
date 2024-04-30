import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

import { colors, utilities } from '../../styles/utilities';
import { profilePicturesUrl } from '../../core/tools/apiRequest';

const BandMemberCard = ({ entity, navigation }) => {
    const entityImage = `${profilePicturesUrl + entity.picture}`;
    return (
        <TouchableOpacity style={[utilities.flexRow, { marginBottom: 14 }]}>
            <View style={[utilities.flexRow, utilities.center]}>
                <Image source={{ uri: entityImage }} style={styles.bandMemberPhoto} />
                <View style={{ marginStart: 8 }}>
                    <Text style={[utilities.textM, utilities.textBold, { color: colors.black }]}>{entity.name}</Text>
                    <Text style={[utilities.textXS, { color: colors.gray }]}>{entity.instrument_id}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default BandMemberCard;

const styles = StyleSheet.create({
    bandMemberPhoto: {
        width: 42,
        height: 42,
        borderRadius: 21,
    },
});