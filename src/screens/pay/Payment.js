import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {colors, fonts} from '../../theme/theme';
import {ChevronLeft, Bell} from 'lucide-react-native';
import BuyCard from '../../components/cards/BuyCard';
import Footer from '../../components/utils/Footer';

const Payment = () => {
  const navigation = useNavigation();

  const events = [
    {
      id: '6',
      imageSource:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTm0R-u8rhjywNLy52chPdOlDZIAxiEz3Mc08LhKkYAot50kF8RKEaEmQQM4qDM5urGbJk&usqp=CAU',
      nameParty: 'Party Six',
      u: 'Unamba',
      status: 1,
    },
    {
      id: '7',
      imageSource:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr1HsuIfx4ZhjlMB45a14F4Tmm3_pnx28-0UAt3178ULxAA3_Df8w1Y3j6SMibrXqyUMY&usqp=CAU',
      nameParty: 'Party Seven',
      u: 'Unamba',
      status: 2,
    },
  ];

  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerTitle}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <ChevronLeft size={28} color={colors.primary} strokeWidth={2} />
            </TouchableOpacity>
            <Text style={styles.h1Header}>Pagos realizados</Text>
          </View>
          <TouchableOpacity
            style={styles.contentNotify}
            onPress={() => navigation.navigate('Notifications')}>
            <Bell size={17} color={colors.white} strokeWidth={2} />
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.content}>
          {events.map((event, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => event.status !== 2 && navigation.navigate('Entrance', {event})}
              disabled={event.status === 2}
              style={event.status === 2 ? styles.disabledCard : null}>
              <BuyCard
                key={index}
                imageSource={event.imageSource}
                nameParty={event.nameParty}
                u={event.u}
                status={event.status}
              />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.absoluteIconsContainer}>
        <Footer iconName="home" selectedIcon={null} />
        <Footer iconName="buy" selectedIcon={'buy'} />
        <Footer iconName="history" selectedIcon={null} />
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
  content: {
    flexGrow: 1,
    paddingTop: 10,
  },
  absoluteIconsContainer: {
    position: 'absolute',
    width: '100%',
    backgroundColor: colors.background,
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 13,
  },
  disabledCard: {
    opacity: 0.5,
  },
});

export default Payment;
