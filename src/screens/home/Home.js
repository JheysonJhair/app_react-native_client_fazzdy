import React, {useState, useEffect} from 'react';
import CheckBox from '@react-native-community/checkbox';
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Image,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {AsyncStorage} from 'react-native';

import Button from '../../components/forms/Button';
import InputForget from '../../components/forms/InputForget';
import StatusModal from '../../components/modals/StatusModal ';
import VerificationCodeInput from '../../components/forms/VerificationCodeInput';

import {colors, fonts} from '../../theme/theme';

const Home = () => {
  const navigation = useNavigation();
  const [modal, setModal] = useState({
    visible: false,
    status: 'error',
    title: '',
    subtitle: '',
  });

  //Modal
  useEffect(() => {
    if (modal.visible) {
      const timeout = setTimeout(
        () => setModal({...modal, visible: false}),
        2000,
      );
      return () => clearTimeout(timeout);
    }
  }, [modal]);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Text>hola</Text>
      <StatusModal
        visible={modal.visible}
        status={modal.status}
        title={modal.title}
        subtitle={modal.subtitle}
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default Home;
