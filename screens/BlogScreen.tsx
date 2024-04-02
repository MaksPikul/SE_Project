// BlogScreen.js or BlogScreen.tsx
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';


const BlogScreen = ({ navigation }: { navigation: any }) => {
    return(
        <View style={styles.container}>
            <Text> Blog </Text>
            <Button
                title="Go to Ambassador Section"
                onPress={() => navigation.navigate('Ambassador')} // This navigates to the AmbassadorSection
            />
        </View>
    );
  };
  

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default BlogScreen;
