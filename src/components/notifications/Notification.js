import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {colors, fonts} from '../../theme/theme';

const Notification = ({
  imageSource,
  nameParty,
  u,
  school,
  date,
  discotheque,
}) => {
  return (
    <View style={styles.container}>
      <Image source={{uri: imageSource}} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.h1}>{nameParty}</Text>
        <Text style={styles.h2}>{u}</Text>
        <Text style={styles.h3}>{school}</Text>
        <View style={styles.line}></View>
        <View style={styles.infoContainer}>
          <View>
            <Text style={styles.h4}>Fecha:</Text>
            <Text style={styles.h4}>Discoteca:</Text>
          </View>
          <View>
            <Text style={styles.h5}>{date}</Text>
            <Text style={styles.h5}>{discotheque}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#1E292A',
  },
  line: {
    borderColor: colors.primary,
    borderWidth: 1,
    marginVertical: 5,
  },
  image: {
    width: '55%',
    height: '100%',
    marginRight: 10,
    resizeMode: 'cover',
  },
  textContainer: {
    flex: 1,
    paddingVertical: 5,
    paddingEnd: 3
  },
  h1: {
    fontSize: 16,
    color: colors.primary,
    fontFamily: fonts.boldMt,
  },
  h2: {
    fontSize: 15,
    marginBottom: 5,
    color: 'white',
    fontFamily: fonts.boldMt,
  },
  h3: {
    fontSize: 10,
    marginBottom: 10,
    color: 'white',
    fontFamily: fonts.mediumMt,
  },
  h4: {
    fontSize: 11,
    color: colors.primary,
    fontFamily: fonts.boldMt,
  },
  h5: {
    fontSize: 11,
    color: 'white',
    fontFamily: fonts.boldMt,
  },
  location: {
    fontSize: 11,
    color: '#666',
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default Notification;
