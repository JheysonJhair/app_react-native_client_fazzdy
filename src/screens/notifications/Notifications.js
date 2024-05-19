import React, {useState, useEffect} from 'react';
import CheckBox from '@react-native-community/checkbox';
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Bell} from 'lucide-react-native';
import Notification from '../../components/notifications/Notification';
import {
  getNotificacionesProximos,
  getNotificacionesAnteriores,
} from '../../services/apiNotifications';
import {colors, fonts} from '../../theme/theme';

const Notifications = () => {
  return <View style={styles.container}></View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 20,
  },
});
export default Notifications;
