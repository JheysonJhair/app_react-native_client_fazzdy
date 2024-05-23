import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {colors, fonts} from '../../theme/theme';
import Footer from '../../components/utils/Footer';
import {ChevronLeft, Bell} from 'lucide-react-native';

import HistoryCard from '../../components/cards/HistoryCard';

const History = () => {
  const navigation = useNavigation();
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      const data = [
        {
          monthYear: 'Marzo 2024',
          events: [
            {
              id: '1',
              imageSource:
                'https://s3-us-west-2.amazonaws.com/joinnus.com/user/2608281/622225281bf5a.jpg',
              nameParty: 'Party One',
              u: 'Unamba',
              date: '12/03/24',
              discotheque: 'BOOM',
            },
            {
              id: '2',
              imageSource:
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXgLOo1BIfTO6FtvUQzQhhFtgJ__-zQ4wwUKtUS0HGH5Iu3qNZDDYH9R5djIYQbISpCkc&usqp=CAU',
              nameParty: 'Party Two',
              u: 'Unamba',
              date: '13/03/24',
              discotheque: 'FLASH',
            },
          ],
        },
        {
          monthYear: 'Abril 2024',
          events: [
            {
              id: '3',
              imageSource: 'https://i.ytimg.com/vi/61nrFXbHfJg/sddefault.jpg',
              nameParty: 'Party Three',
              u: 'Unamba',
              date: '14/04/24',
              discotheque: 'BLAST',
            },
            {
              id: '4',
              imageSource:
                'https://s3-us-west-2.amazonaws.com/joinnus.com/user/3111653/act65fb0f056a6ae.jpg',
              nameParty: 'Party Four',
              u: 'Unamba',
              date: '15/04/24',
              discotheque: 'POP',
            },
          ],
        },
      ];
      setNotifications(data);
    };

    fetchNotifications();
  }, []);

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
        <ScrollView>
          {notifications.map((month, index) => (
            <View key={index}>
              <Text style={styles.h2}>{month.monthYear}</Text>
              {month.events.map(event => (
                <HistoryCard
                  imageSource={event.imageSource}
                  nameParty={event.nameParty}
                  u={event.u}
                  date={event.date}
                  discotheque={event.discotheque}
                />
              ))}
            </View>
          ))}
          {notifications.length === 0 && (
            <Text style={styles.noNotificationsText}>
              No hay eventos disponibles.
            </Text>
          )}
        </ScrollView>
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
  h2: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 18,
    fontFamily: fonts.mediumMt,
    color: colors.white,
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
