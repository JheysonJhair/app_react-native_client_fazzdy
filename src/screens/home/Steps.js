import React from 'react';
import {StyleSheet,SafeAreaView, Text, View, KeyboardAvoidingView} from 'react-native';
import CarouselComponent from '../../components/carousel/CarouselComponent';
const Steps = () => {

  return (
    <SafeAreaView style={styles.container}>
      <CarouselComponent />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Steps;
