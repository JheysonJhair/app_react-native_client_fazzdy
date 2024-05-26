import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';

import Button from '../../components/forms/Button';
import Input from '../../components/forms/Input';
import InputPassword from '../../components/forms/InputPassword';
import StatusModal from '../../components/modals/StatusModal';

import {registerUser} from '../../services/apiUser';
import {loginUser} from '../../services/apiLogin';
import LogoName from '../../components/forms/LogoName';
import {colors, fonts} from '../../theme/theme';

const RegisterData = () => {
  const navigation = useNavigation();
  const [modal, setModal] = useState({
    visible: false,
    status: 'error',
    title: '',
    subtitle: '',
  });
  const route = useRoute();

  const email = route.params?.email || '';
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const onHandleRegister = async () => {
    if (!name || !lastName || lastName || phone || password) {
      setModal({
        visible: true,
        status: 'error',
        title: 'Campos vacios',
        subtitle: 'Complete todos los campos, es necesario!',
      });
      return;
    }

    const phoneRegexPeru = /^9\d{8}$/;
    if (!phoneRegexPeru.test(phone)) {
      setModal({
        visible: true,
        status: 'error',
        title: 'Número de celular no valido!',
        subtitle: 'Por favor ingrese nuevamente.',
      });
      return;
    }
    try {
      const response = await registerUser({
        Email: email,
        Password: password,
        FirstName: nombre,
        LastName: apellidos,
        PhoneNumber: telefono,
      });

      if (response.success) {
        setModal({
          visible: true,
          status: 'success',
          title: 'Registro exitoso!',
          subtitle: 'Usted se registro conrrectamente!',
        });
        //Login Automatico
        const user = await loginUser(email, password);
        setUserInfo({
          IdUser: user.value.IdUser,
          Email: user.value.Email,
          Contrasena: user.value.Contrasena,
          Nombre: user.value.Nombre,
          Apellido: user.value.Apellido,
          Telefono: user.value.Telefono,
        });
        navigation.navigate('Home');
      } else {
        setModal({
          visible: true,
          status: 'error',
          title: 'Error!',
          subtitle: response.msg,
        });
      }
      navigation.navigate('Steps');
    } catch (error) {
      console.error('CODE: Error al registrar el usuario:', error);
    }
  };

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
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}>
      <View style={styles.containerWhite}>
        <View style={styles.dragHandle} />
        <LogoName />

        <Text style={styles.h2}>Complete los campos</Text>
        <View style={styles.formContainer}>
          <Input
            placeholder="Correo electrónico"
            value={email}
            editable={false}
            keyboardType="email-address"
          />
          <Input
            placeholder="Nombres"
            onChangeText={text => setName(text)}
            value={name}
          />
          <Input
            placeholder="Apellidos"
            onChangeText={text => setLastName(text)}
            value={lastName}
          />
          <InputPassword
            placeholder="Contraseña"
            onChangeText={text => setPassword(text)}
            value={password}
            editable={true}
          />
          <Input
            placeholder="Número de celular"
            onChangeText={text => setPhone(text)}
            value={phone}
            keyboardType="numeric"
          />
          <Button title="Continuar" onPress={() => onHandleRegister()} />
        </View>

        <StatusModal
          visible={modal.visible}
          status={modal.status}
          title={modal.title}
          subtitle={modal.subtitle}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: '20%',
  },
  containerWhite: {
    flex: 1,
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
    backgroundColor: colors.white,
    alignItems: 'center',
    paddingTop: 20,
  },
  formContainer: {
    marginTop: 20,
    width: '85%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dragHandle: {
    width: 35,
    height: 4,
    borderRadius: 2.5,
    backgroundColor: '#CCC',
    marginBottom: 50,
  },
  h2: {
    fontFamily: fonts.semiBoldMt,
    color: '#000',
    width: '80%',
    fontSize: 16,
    marginTop: 5,
    marginBottom: 5,
    textAlign: 'center',
  },
  h3: {
    fontFamily: fonts.semiBoldMt,
    fontSize: 14,
    color: '#000',
    width: '80%',
    textAlign: 'left',
  },
  texto: {
    marginTop: 25,
  },
  span: {
    color: colors.primary,
  },
  // Linea
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 15,
  },
  dividerLine: {
    width: '39%',
    height: 1,
    backgroundColor: colors.border,
  },
  dividerText: {
    color: '#000',
    marginHorizontal: 10,
    fontFamily: fonts.semiBoldMt,
  },
  // Google y Facebook
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
});

export default RegisterData;
