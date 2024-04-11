import React from "react";
import { View, Text, StyleSheet } from "react-native";
import ShowMoreShowLess from "./ShowMoreShowLess";
import SaveButton from "./SaveButton";
import DeleteButton from "./DeleteButton";
import { memo } from "react";

export const RenderPost = ({ blog_post, user_ID } : { blog_post : any, user_ID : any}) => {
    return (
        <View style={styles.postContainer}>
            <Text style={styles.postType}>{blog_post.post_owner_name}</Text>
            {blog_post.title && <Text style={styles.postTitle}>{blog_post.title}</Text>}
            <ShowMoreShowLess text={blog_post.article} textStyle={styles.textStyle} readMoreStyle={styles.readMoreStyle}></ShowMoreShowLess>
            {blog_post.post_time && <Text style={styles.postDate}>Posted on: {blog_post.post_time.substring(0,10)}</Text>}
            <SaveButton post_ID={blog_post.id} user_ID={user_ID}></SaveButton>
            <DeleteButton post_ID={blog_post.id} user_ID={user_ID}></DeleteButton>
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
    textStyle: {
        fontSize: 16,
    },
    readMoreStyle:{
        fontSize: 14,
        color: '#b366ff',
        textDecorationLine: 'underline'
    }
})

