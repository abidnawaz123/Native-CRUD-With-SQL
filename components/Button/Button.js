import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const CustomButton = ({ label, onPress }) => {
    return (
        <View style={styles.mainWrapper}>
            <TouchableOpacity style={styles.buttonWrapper} onPress={onPress}>
                <Text style={styles.buttonLabel}>{label}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default CustomButton

const styles = StyleSheet.create({
    mainWrapper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonWrapper: {
        backgroundColor: '#6495ed',
        width: '40%',
        borderRadius: 20,
        paddingVertical: 8,
        paddingHorizontal: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonLabel: {
        color: 'white',
        fontWeight: '400',
    }
})