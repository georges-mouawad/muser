import { StyleSheet } from 'react-native';

export const colors = {
    primary: '#212529',
    black: '#212529',
    darkGray: '#495057',
    lightGray: '#D9D9D9',
    gray: '#ADB5BD',
    offWhite: '#DEE2E6',

    blackTrsp: 'rgba(0,0,0,0.3)',
    whiteTrsp: 'rgba(255,255,255,0.5)',
    noColor: 'transparent',
};

export const utilities = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal:20,
    },

    flexRow: {
        flexDirection: 'row',
    },

    center: {
        alignItems: 'center',
        justifyContent: 'center',
    },

    spaceBetween:{
      alignItems: 'center',
        justifyContent: 'space-between',  
    },

    textCenter: {
        textAlign: 'center',
    },

    textLeft: {
        textAlign: 'left',
    },

    noMt: {
        marginTop: 0,
    },

    noMb: {
        marginBottom: 0,
    },

    textXS: {
        fontSize: 12,
    },

    textS: {
        fontSize: 14,
    },

    textM: {
        fontSize: 16,
    },

    textL: {
        fontSize: 20,
    },

    textXL: {
        fontSize: 24,
    },

    textTitle: {
        fontSize: 32,
    },

    textBold: {
        fontWeight: 'bold',
    },

    textRegular: {
        fontWeight: 'normal',
    },

    boxShadow: {
        shadowColor: colors.blackTrsp,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 10,
    },

    borderRadius: {
        s: 12,
        m: 18,
        l: 24,
        xl: 36,
    },

    border: {
        borderWidth: 0.5,
        borderColor: colors.gray,
    },

    borderDark: {
        borderWidth: 0.5,
        borderColor: colors.darkGray,
    },

    primaryBtn: {
        height: 48,
        borderRadius: 24,
        backgroundColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },

    secondaryBtn: {
        height: 48,
        borderRadius: 24,
        borderWidth: 2,
        borderColor: colors.primary,
        backgroundColor: colors.offWhite,
        alignItems: 'center',
        justifyContent: 'center',
    },

    primaryBtnText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },

    secondaryBtnText: {
        color: colors.primary,
        fontSize: 20,
        fontWeight: 'bold',
    },
});