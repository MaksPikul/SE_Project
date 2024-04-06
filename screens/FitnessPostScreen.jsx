import React from 'react';
import FitnessPostForm from '../components/blogComps/FitnessPostForm'; // Update the path accordingly

const FitnessPostScreen = ({ navigation }) => {
  const handleFitnessSubmit = (fitnessData) => {
    console.log('Submitting fitness program:', fitnessData);
    // navigation.goBack();
  };

  return (
    <FitnessPostForm onSubmit={handleFitnessSubmit} />
  );
};

export default FitnessPostScreen;
