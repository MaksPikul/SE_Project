import React from "react";
import { View, Text, StyleSheet } from "react-native";

export const RenderPost = ({ blog_post } : { blog_post : any}) => {
    return (
        <View style={styles.postContainer}>
            <Text style={styles.postType}>{blog_post.post_owner_name}</Text>
            {blog_post.title && <Text style={styles.postTitle}>{blog_post.title}</Text>}
            <Text>{blog_post.article}</Text>
            {blog_post.post_time && <Text style={styles.postDate}>Posted at: {blog_post.post_time}</Text>}
            {blog_post.ingredients && <Text>Ingredients: {blog_post.ingredients}</Text>}
            {blog_post.resourceLink && <Text style={styles.postLink}>Resource: {blog_post.resourceLink}</Text>}
        </View>
    )
}


const styles = StyleSheet.create({
    postContainer: {
        backgroundColor: '#fff', 
        borderRadius: 4,
        padding: 16,
        marginVertical: 8,
        marginHorizontal: 16,
        shadowOpacity: 0.1,
        shadowRadius: 4,
        shadowColor: '#000',
        shadowOffset: { height: 0, width: 0 },
        borderWidth: 1, 
        borderColor: 'purple', 
    },
    postType: {
        fontSize: 18, 
        fontWeight: 'bold',
        color: 'purple', 
        marginBottom: 4,
    },
    postTitle: {
        fontSize: 15,
        fontWeight: 'bold',
        marginBottom: 8,
        color: 'purple',
    },
    postDate: {
        fontSize: 14,
        color: '#2f4f4f',
        marginTop: 8,
    },
    postLink: {
        fontSize: 16,
        color: '#0000ff', 
        marginTop: 8,
    },
})

