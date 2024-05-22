import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {colors, fonts} from '../../theme/theme';
import Footer from '../../components/utils/Footer';
import {ChevronLeft, Bell} from 'lucide-react-native';

const History = () => {
  const navigation = useNavigation();

  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerTitle}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <ChevronLeft size={28} color={colors.primary} strokeWidth={2} />
            </TouchableOpacity>
            <Text style={styles.h1Header}>Historial de entradas</Text>
          </View>
          <TouchableOpacity
            style={styles.contentNotify}
            onPress={() => navigation.navigate('Notifications')}>
            <Bell size={17} color={colors.white} strokeWidth={2} />
          </TouchableOpacity>
        </View>
        <View style={styles.content}></View>
      </View>
      <View style={styles.absoluteIconsContainer}>
        <Footer iconName="home" selectedIcon={null} />
        <Footer iconName="buy" selectedIcon={null} />
        <Footer iconName="history" selectedIcon={'history'} />
        <Footer iconName="config" selectedIcon={null} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: colors.background,
  },
  headerTitle: {
    flexDirection: 'row',
    color: colors.white,
  },
  h1Header: {
    fontSize: 17,
    paddingTop: 2,
    fontFamily: fonts.mediumMt,
    color: colors.white,
    marginLeft: 10,
  },
  contentNotify: {
    backgroundColor: '#1E292A',
    width: 35,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  // ::::::::::::::::::::::::::Footer
  absoluteIconsContainer: {
    position: 'absolute',
    width: '100%',
    backgroundColor: colors.background,
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 13,
  },
});

export default History;
