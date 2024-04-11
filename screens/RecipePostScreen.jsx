import React from 'react';
import RecipePostForm from '../components/NutritionComps/RecipePostForm';

const RecipePostScreen = ({ user_ID }) => {
  const handleRecipeSubmit = (RecipeData) => {
    console.log('Submitting fitness program:', RecipeData);
    // navigation.goBack();
  };

  return (
    <RecipePostForm user_ID={user_ID} />
  );
};

export default RecipePostScreen;
