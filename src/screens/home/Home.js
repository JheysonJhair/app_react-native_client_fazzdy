import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Bell} from 'lucide-react-native';
import Notification from '../../components/notifications/Notification';
import {colors, fonts} from '../../theme/theme';
import GestureRecognizer from 'react-native-swipe-gestures';
import Footer from '../../components/utils/Footer';

const Home = () => {
  const navigation = useNavigation();
  const [selectedTab, setSelectedTab] = useState('Proximos');
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      let data;
      if (selectedTab === 'Proximos') {
        data = [
          {
            monthYear: 'Enero 2024',
            events: [
              {
                id: '5',
                imageSource:
                  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbviz9v7ao1QXCZc1TLH4udz8ceePWJlIY01eNobJnTw&s',
                nameParty: 'Party Five',
                u: 'Unamba',
                school: 'Ingeniería en Informática y Sistemas',
                date: '10/01/24',
                discotheque: 'BANG',
              },
            ],
          },
          {
            monthYear: 'Febrero 2024',
            events: [
              {
                id: '6',
                imageSource:
                  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTm0R-u8rhjywNLy52chPdOlDZIAxiEz3Mc08LhKkYAot50kF8RKEaEmQQM4qDM5urGbJk&usqp=CAU',
                nameParty: 'Party Six',
                u: 'Unamba',
                school: 'Educación inicial intercultural bilingue',
                date: '15/02/24',
                discotheque: 'ZOOM',
              },
              {
                id: '7',
                imageSource:
                  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr1HsuIfx4ZhjlMB45a14F4Tmm3_pnx28-0UAt3178ULxAA3_Df8w1Y3j6SMibrXqyUMY&usqp=CAU',
                nameParty: 'Party Seven',
                u: 'Unamba',
                school: 'Ingeniería civil',
                date: '18/02/24',
                discotheque: 'GROOVE',
              },
            ],
          },
        ];
      } else {
        data = [
          {
            monthYear: 'Marzo 2024',
            events: [
              {
                id: '1',
                imageSource:
                  'https://s3-us-west-2.amazonaws.com/joinnus.com/user/2608281/622225281bf5a.jpg',
                nameParty: 'Party One',
                u: 'Unamba',
                school: 'Ingeniería en Informática y Sistemas',
                date: '12/03/24',
                discotheque: 'BOOM',
              },
              {
                id: '2',
                imageSource:
                  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXgLOo1BIfTO6FtvUQzQhhFtgJ__-zQ4wwUKtUS0HGH5Iu3qNZDDYH9R5djIYQbISpCkc&usqp=CAU',
                nameParty: 'Party Two',
                u: 'Unamba',
                school: 'Ingeniería en Informática y Sistemas',
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
                school: 'Ingeniería en Informática y Sistemas',
                date: '14/04/24',
                discotheque: 'BLAST',
              },
              {
                id: '4',
                imageSource:
                  'https://s3-us-west-2.amazonaws.com/joinnus.com/user/3111653/act65fb0f056a6ae.jpg',
                nameParty: 'Party Four',
                u: 'Unamba',
                school: 'Ingeniería en Informática y Sistemas',
                date: '15/04/24',
                discotheque: 'POP',
              },
            ],
          },
        ];
      }
      setNotifications(data);
    };

    fetchNotifications();
  }, [selectedTab]);

  const onSwipeLeft = () => {
    if (selectedTab === 'Proximos') {
      setSelectedTab('Anteriores');
    }
  };

  const onSwipeRight = () => {
    if (selectedTab === 'Anteriores') {
      setSelectedTab('Proximos');
    }
  };

  return (
    <GestureRecognizer
      onSwipeLeft={onSwipeLeft}
      onSwipeRight={onSwipeRight}
      style={{flex: 1}}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.h1}>Eventos</Text>
          <TouchableOpacity
            style={styles.contentNotify}
            onPress={() => navigation.navigate('Notifications')}>
            <Bell size={17} color={colors.white} strokeWidth={2} />
          </TouchableOpacity>
        </View>
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[
              styles.tabButton,
              selectedTab === 'Proximos' && styles.selectedTab,
              styles.leftTabButton,
            ]}
            onPress={() => setSelectedTab('Proximos')}>
            <Text
              style={[
                styles.tabText,
                selectedTab === 'Proximos' && styles.selectedTabText,
              ]}>
              Próximos
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tabButton,
              selectedTab === 'Anteriores' && styles.selectedTab,
              styles.rightTabButton,
            ]}
            onPress={() => setSelectedTab('Anteriores')}>
            <Text
              style={[
                styles.tabText,
                selectedTab === 'Anteriores' && styles.selectedTabText,
              ]}>
              Anteriores
            </Text>
          </TouchableOpacity>
        </View>
        <ScrollView>
          {notifications.map((month, index) => (
            <View key={index}>
              <Text style={styles.h2}>{month.monthYear}</Text>
              {month.events.map((event, eventIndex) => (
                <TouchableOpacity
                  key={index}
                  onPress={() =>
                    navigation.navigate('Information', {event})
                  }>
                  <Notification
                    key={eventIndex}
                    imageSource={event.imageSource}
                    nameParty={event.nameParty}
                    u={event.u}
                    school={event.school}
                    date={event.date}
                    discotheque={event.discotheque}
                  />
                </TouchableOpacity>
              ))}
            </View>
          ))}
          {notifications.length === 0 && (
            <Text style={styles.noNotificationsText}>
              No hay notificaciones disponibles.
            </Text>
          )}
        </ScrollView>
      </View>
      <View style={styles.absoluteIconsContainer}>
        <Footer iconName="home" selectedIcon={'home'} />
        <Footer iconName="buy" selectedIcon={null} />
        <Footer iconName="history" selectedIcon={null} />
        <Footer iconName="config" selectedIcon={null} />
      </View>
    </GestureRecognizer>
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
  h1: {
    fontSize: 26,
    fontFamily: fonts.boldMt,
    color: colors.white,
  },
  h2: {
    marginTop: 20,
    marginBottom: 10,
    fontSize: 18,
    fontFamily: fonts.mediumMt,
    color: colors.white,
  },
  contentNotify: {
    backgroundColor: '#1E292A',
    width: 35,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  tabContainer: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: 5,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 13,
    backgroundColor: '#141C1D',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  leftTabButton: {
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
  },
  rightTabButton: {
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6,
  },
  selectedTab: {
    backgroundColor: '#FFFFFF',
  },
  tabText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  selectedTabText: {
    color: 'black',
  },
  noNotificationsText: {
    marginTop: 20,
    fontSize: 16,
    color: colors.white,
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

export default Home;
