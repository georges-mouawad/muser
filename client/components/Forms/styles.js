import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../styles/utilities';

const  windowDimension = Dimensions.get('window');

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContainer: {
        flex: 1,
        flexGrow: 1,
        justifyContent: 'space-between',
        paddingHorizontal: 20,
    },
    header: {
        color: colors.off,
        textAlign: 'center',
        fontSize: 32,
        fontFamily: 'Montserrat-Medium',
        marginTop: 24,
        marginBottom: 64,
    },
    label: {
        fontSize: 16,
        fontFamily: 'Montserrat-Regular',
        marginBottom: 6,
        marginLeft: 8,
        color: colors.white,
    },
    authInput: {
        color: colors.offWhite,
        fontFamily: 'Montserrat-Regular',
        height: 48,
        borderRadius: 24,
        borderWidth: 0.5,
        borderColor: colors.white,
        backgroundColor: '#2E2C2F15',
        padding: 16,
        marginBottom: 14,
    },
    promptText: {
        color: 'white',
        fontSize: 16,
        fontFamily: 'Montserrat-Regular',
        marginTop: 10,
        textAlign: 'center',
    },
    promptLink: {
        fontFamily: 'Montserrat-Bold',
        color: colors.primary,
        textDecorationLine: 'underline',
    },
    welcomeLogo: {
        width: 150,
        height: 150,
        alignSelf: 'center',
        objectFit: 'contain',
    },
    topInnerContainer: {
        flex: 1,        
        marginTop: 80,
    },
    bottomInnerContainer: {
        marginTop: 'auto',
        marginBottom: 64,
    },
    userTypeText: {
        fontSize: 28,
        paddingRight: 12,
        color: colors.primary,
        fontFamily: 'Montserrat-Regular',
        alignSelf: 'center',
    },

    userTypePrompt: {
        marginTop: -24,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },

    userTypePicker: {
        width: 200,
        alignSelf: 'center',
    },

    pickerItem: {
        fontSize: 24,
        fontWeight: 'bold',
    },

    userInfoContainer: {
        flex: 1,
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: 64,
        backgroundColor: colors.bgDark,
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 16,
        gap: 16,
    },

    userInfoHeaderContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },

    headerProfile: {
        color: 'white',
        fontSize: 24,
        fontFamily: 'Montserrat-Bold',
        textAlign: 'left',
    },
    addPhotoPrompt: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    addPhotoText: {
        color: 'white',
        fontSize: 20,
        fontFamily: 'Montserrat-Bold',
    },
    inputTextProfile: {
        color: 'white',
        fontSize: 14,
        fontFamily: 'Montserrat-Bold',
        textAlign: 'left',
    },
    genresContainer: {
        marginTop: 16,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: 10,
    },
    errorText: {
        color: colors.primary,
        fontSize: 16,
        fontFamily:'Montserrat-Bold',
        textAlign: 'center',
    },
    imageBackground: {
        position: 'absolute',
        flex:1,
        bottom:0,
        right:0,
        width: windowDimension.width,
        height: windowDimension.height * 1.1,
    },
    googleLogo: {
        width: 24,
        height: 24,
        position: 'absolute',
        right: 16,
    }
});
