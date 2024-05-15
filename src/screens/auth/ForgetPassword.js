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
import InputPassword from '../../components/forms/InputPassword';
import GoogleButton from '../../components/forms/GoogleButton';
import FacebookButton from '../../components/forms/FacebookButton';
import StatusModal from '../../components/modals/StatusModal ';

import {loginUser} from '../../services/apiLogin';
import {useUser} from '../../hooks/UserContext';
import LogoName from '../../components/forms/LogoName';
import {colors, fonts} from '../../theme/theme';

const ForgetPassword = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalStatus, setModalStatus] = useState('error');
  const [text, setText] = useState('');
  const [text2, setText2] = useState('');

  const {setUserInfo} = useUser();

  const [isChecked, setChecked] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  console.log(isChecked);
  const onHandleLogin = async (email, password) => {
    try {
      if (!email || !password) {
        setModalStatus('error');
        setModalVisible(true);
        setText('Campos vacios');
        setText2('Complete todos los campos, es necesario!');
        return;
      }

      const emailRegex = /\S+@\S+\.\S+/;
      if (!emailRegex.test(email)) {
        setModalStatus('error');
        setModalVisible(true);
        setText('Correo invalido');
        setText2('Por favor, utiliza una cuenta de Gmail.');
        return;
      }

      const user = await loginUser(email, password);

      if (user.msg == 'Ingreso correctamente') {
        if (isChecked) {
          saveUserData();
        }
        setUserInfo({
          IdUser: user.value.IdUser,
          FirstName: user.value.FirstName,
          LastName: user.value.LastName,
          BirthDate: user.value.BirthDate,
          Phone: user.value.Phone,
          ProfileImage: user.value.ProfileImage,
          UserName: user.value.UserName,
          Description: user.value.Description,
        });

        const birthDate = new Date(user.birthDate);
        const today = new Date();

        const age = today.getFullYear() - birthDate.getFullYear();
        if (age >= 16 || birthDate) {
          navigation.navigate('Home');
        } else {
          setModalStatus('warning');
          setModalVisible(true);
          setText('Opps! menor de edad');
          setText2('Usted no cumple con los requisitos mínimos');
        }
      } else {
        setModalStatus('error');
        setModalVisible(true);
        setText('Error de ingreso');
        setText2('Crea una cuenta, es muy rápido!');
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
    }
  };

  const handleLogin = () => {
    navigation.navigate('Login');
  };
  const handleNewPassword = () => {
    navigation.navigate('VerificatePassword');
  };

  ///
  const saveUserData = async () => {
    try {
      await AsyncStorage.setItem('userData', JSON.stringify({email, password}));
    } catch (error) {
      console.error('Error al guardar datos de usuario:', error);
    }
  };
  const clearUserData = async () => {
    try {
      await AsyncStorage.removeItem('userData');
    } catch (error) {
      console.error('Error al borrar datos de usuario:', error);
    }
  };
  ///
  useEffect(() => {
    if (modalVisible) {
      const timeout = setTimeout(() => {
        setModalVisible(false);
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [modalVisible]);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Image
        source={require('../../assets/Logo.png')}
        style={styles.logoImage}
      />
      <Text style={styles.h1}>Contraseña olvidada</Text>
      <Text style={styles.h2}>
        Te enviaremos tu código de recuperación a tu correo electronico
      </Text>

      <View style={styles.formContainer}>
        <InputForget
          placeholder="Email"
          onChangeText={text => setEmail(text)}
          value={email}
        />
        <Button
          title="Continuar"
          onPress={() => handleNewPassword()}
        />
      </View>

      <StatusModal
        visible={modalVisible}
        status={modalStatus}
        text={text}
        text2={text2}
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

  formContainer: {
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoImage: {
    width: 45,
    height: 35,
    marginBottom: 10,
  },
  h1: {
    fontFamily: fonts.boldMt,
    color: '#000',
    width: '80%',
    color: '#fff',
    fontSize: 24,
    marginTop: 5,
    marginBottom: 5,
    textAlign: 'center',
  },
  h2: {
    fontFamily: fonts.semiBoldMt,
    color: '#000',
    width: '80%',
    color: '#fff',
    fontSize: 15,
    marginTop: 5,
    marginBottom: 25,
    textAlign: 'center',
  },
  texto: {
    marginTop: 25,
  },
  h3: {
    fontSize: 13,
    fontFamily: fonts.semiBoldMt,
  },
  span: {
    color: colors.primary,
  },
  //Linea
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 15,
  },
  dividerLine: {
    width: '36%',
    height: 1,
    backgroundColor: colors.border,
  },
  dividerText: {
    color: '#000',
    marginHorizontal: 10,
    fontFamily: fonts.semiBoldMt,
  },
  //Google y Facebook
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
});
export default ForgetPassword;
