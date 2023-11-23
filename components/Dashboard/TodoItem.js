import React from 'react';
import {
    Button,
    Text,
    View,
} from 'react-native';
import CustomButton from '../Button/Button';
export const ToDoItemComponent = ({ todo: { id, value }, deleteItem }) => {
    return (
        <View >
            <View style={{ margin: 20, borderColor: 'darkturquoise', borderWidth: 1, borderRadius: 10, padding: 20, backgroundColor: "#483d8b" }}>
                <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 5 }}>
                    <Text style={{ color: 'white', fontWeight: '600' }}>
                        {value}
                    </Text>
                </View>
                <CustomButton
                    label="Done"
                    onPress={() => deleteItem(id)}
                />
            </View>

        </View>
    );
};
