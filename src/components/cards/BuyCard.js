import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { colors, fonts } from '../../theme/theme';

const BuyCard = ({ imageSource, nameParty, u, status }) => {
  const getStatusText = (status) => {
    switch (status) {
      case 1:
        return 'Correcto!';
      case 2:
        return 'En espera';
      case 3:
        return 'Rechazado';
      default:
        return 'desconocido';
    }
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: imageSource }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.h1}>{nameParty}</Text>
        <Text style={styles.h2}>{u}</Text>
        <View style={styles.line}></View>
        <View style={styles.infoContainer}>
          <View>
            <Text style={styles.h4}>Estado de pago:</Text>
          </View>
          <View>
            <Text style={styles.h5}>{getStatusText(status)}</Text>
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
    marginBottom: 15,
    backgroundColor: '#1E292A',
    borderRadius: 8,
    overflow: 'hidden',
  },
  line: {
    borderColor: colors.primary,
    borderWidth: 0.4,
    marginVertical: 5,
    width: '95%',
  },
  image: {
    width: '42%',
    height: "100%", 
    marginRight: 10,
    resizeMode: 'cover',
  },
  textContainer: {
    flex: 1,
    paddingVertical: 10,
    paddingEnd: 3,
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
    paddingEnd: 10,
  },
});

export default BuyCard;
