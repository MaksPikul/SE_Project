import React from 'react';
import MentalHealthPostForm from '../components/blogComps/MentalHealthPostForm'; 

const MentalHealthPostScreen = ({ navigation }) => {
  const handleMentalHealthSubmit = (mentalHealthData) => {
    console.log('Submitting mental health resource:', mentalHealthData);
    // navigation.goBack();
  };

  return (
    <MentalHealthPostForm onSubmit={handleMentalHealthSubmit} />
  );
};

export default MentalHealthPostScreen;
