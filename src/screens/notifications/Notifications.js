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
import NotificationCard from '../../components/cards/NotificationCard';

const Notifications = () => {
  const navigation = useNavigation();
  const events = [
    // {
    //   title: 'Party Error',
    //   subtitle: 'Entrada comprada!',
    //   date: '12/10/24',
    //   isError: false,
    // },
    // {
    //   title: 'Party Error',
    //   subtitle: 'Error de compra!',
    //   date: '12/10/24',
    //   isError: true,
    // },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTitle}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ChevronLeft size={28} color={colors.primary} strokeWidth={2} />
          </TouchableOpacity>
          <Text style={styles.h1Header}>Notificaciones</Text>
        </View>
      </View>
      {events.length > 0 ? (
        <ScrollView style={styles.content}>
          {events.map((event, index) => (
            <NotificationCard
              key={index}
              event={event}
              onPress={() => alert(`Clicked on ${event.subtitle}`)}
              isError={event.isError}
            />
          ))}
        </ScrollView>
      ) : (
        <View style={styles.content2}>
          <View style={styles.circuloMayor}>
            <View style={styles.circuloMenor}>
              <Bell
                size={60}
                color={colors.primary}
                strokeWidth={0.8}
                style={styles.icon}
              />
            </View>
          </View>
          <Text style={styles.h1}>Sin notificaciones por el momento</Text>
        </View>
      )}
    </View>
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
    alignItems: 'center',
  },
  h1Header: {
    fontSize: 17,
    paddingTop: 2,
    fontFamily: fonts.mediumMt,
    color: colors.white,
    marginLeft: 10,
  },
  content: {
    flex: 1,
  },
  content2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circuloMayor: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#171E1E',
    width: 150,
    height: 150,
    borderRadius: 100,
  },
  circuloMenor: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1E292A',
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  icon: {
    transform: [{rotate: '15deg'}],
  },
  h1: {
    marginTop: 10,
    color: colors.border,
  },
});

export default Notifications;
