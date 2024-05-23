import {Alert, Linking} from 'react-native';

export const SendWhatsApp = (phoneNumber, messageText) => {
  const link = `https://wa.me/${phoneNumber}?text=${messageText}`;

  Linking.canOpenURL(link).then(supported => {
    if (!supported) {
      Alert.alert('Por favor instale WhatsApp para enviar un mensaje directo');
      return;
    }
    return Linking.openURL(url);
  });
};
