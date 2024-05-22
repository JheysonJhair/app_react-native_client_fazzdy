import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {colors, fonts} from '../../theme/theme';
import {CircleCheckBig, Ban} from 'lucide-react-native';

const NotificationCard = ({event, onPress, isError}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.cardContainer,
        isError ? styles.errorCard : styles.successCard,
      ]}>
      <View style={styles.content}>
        <Text
          style={[styles.h1, isError ? styles.errorText : styles.successText]}>
          {isError ? 'Error de compra!' : 'Entrada comprada!'}
        </Text>
        <Text style={styles.h2}>{event.title}</Text>
        <Text style={styles.h3}>
          <Text style={styles.span}>Fecha:</Text> {event.date}
        </Text>
      </View>
      <View style={styles.icons}>
        {isError ? (
          <Ban size={40} color={colors.error} strokeWidth={2} />
        ) : (
          <CircleCheckBig size={40} color={colors.success} strokeWidth={2} />
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    marginVertical: 8,
    backgroundColor: colors.card,
  },
  content: {
    flex: 1,
  },
  h1: {
    fontSize: 18,
    marginBottom: 4,
    fontFamily: fonts.boldMt,
  },
  h2: {
    fontSize: 16,
    marginBottom: 4,
    color: colors.border,
    fontFamily: fonts.boldMt,
  },
  h3: {
    fontSize: 14,
    color: colors.border,
    fontFamily: fonts.boldMt,
  },
  span: {
    color: colors.success,
  },
  successText: {
    color: colors.success,
  },
  errorText: {
    color: colors.error,
  },
  icons: {
    marginLeft: 16,
  },
});

export default NotificationCard;
