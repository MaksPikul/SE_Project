import React from 'react';
import RecipePostForm from '../components/RecipePostForm';

const RecipePostScreen = ({ navigation }) => {
  const handleRecipeSubmit = (RecipeData) => {
    console.log('Submitting fitness program:', RecipeData);
    // navigation.goBack();
  };

  return (
    <RecipePostForm onSubmit={handleRecipeSubmit} />
  );
};

export default RecipePostScreen;
