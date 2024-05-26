import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {colors, fonts} from '../../theme/theme';
import Footer from '../../components/utils/Footer';
import {
  ChevronLeft,
  Bell,
  UserCog,
  LogOut,
  ChevronRight,
} from 'lucide-react-native';
import InputCommon from '../../components/forms/InputCommon';
import GoogleIcon from '../../assets/images/wp.png';
import {SendWhatsApp} from '../../utils/helpers';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useUser} from '../../hooks/UserContext';

const Config = () => {
  const navigation = useNavigation();
  const {userData} = useUser();

  const [profile, setProfile] = useState({
    email: 'jheysonjhairpro@gmail.com',
    firstName: 'Jheyson Jhair',
    lastName: 'Arone Angeles',
    phone: '983 805 438',
  });

  const clearUserData = async () => {
    try {
      await AsyncStorage.removeItem('userData');
      console.error('userData eliminado con exito');
      navigation.navigate('Login');
    } catch (error) {
      console.error('CODE: Error al borrar datos de usuario:', error);
    }
  };

  const [text, setText] = useState('');
  const [isVerified, setIsVerified] = useState(false);

  const handleWhatsAppPress = () => {
    SendWhatsApp('51983805438', 'Hola, necesito ayuda!');
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerTitle}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <ChevronLeft size={28} color={colors.primary} strokeWidth={2} />
            </TouchableOpacity>
            <Text style={styles.h1Header}>Configuración</Text>
          </View>
          <TouchableOpacity
            style={styles.contentNotify}
            onPress={() => navigation.navigate('Notifications')}>
            <Bell size={17} color={colors.white} strokeWidth={2} />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <View style={styles.editProfileButton}>
            <View style={styles.contentHeader}>
              <UserCog size={30} color={colors.primary} strokeWidth={2} />
              <View style={styles.margin}>
                <Text style={styles.editProfileText}>
                  Editar mi perfil {userData.Nombre}
                </Text>
                <Text style={styles.editProfileSubtext}>
                  Cambia de nombre a cualquier momento
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Correo</Text>
          </View>
          <InputCommon
            placeholder="Ingresa tu correo"
            onChangeText={setText}
            value={profile.email}
            isVerified={true}
            keyboardType="email-address"
          />
          <View style={styles.field}>
            <Text style={styles.label}>Nombres</Text>
          </View>
          <InputCommon
            placeholder="Ingresa tús apellidos"
            onChangeText={setText}
            value={profile.firstName}
            isVerified={false}
            keyboardType="default"
          />
          <View style={styles.field}>
            <Text style={styles.label}>Apellidos</Text>
          </View>
          <InputCommon
            placeholder="Ingresa tu nombre"
            onChangeText={setText}
            value={profile.lastName}
            isVerified={false}
            keyboardType="default"
          />
          <View style={styles.field}>
            <Text style={styles.label}>Teléfono</Text>
          </View>
          <InputCommon
            placeholder="Ingresa tu nombre"
            onChangeText={setText}
            value={profile.phone}
            isVerified={false}
            keyboardType="numeric"
          />
          <TouchableOpacity
            style={styles.editProfileButton}
            onPress={handleWhatsAppPress}>
            <View style={styles.contentWhatssap}>
              <View style={styles.contentHeader}>
                <Image source={GoogleIcon} style={styles.imageStyle} />
                <View style={styles.margin}>
                  <Text style={styles.editProfileText}>
                    Chatea por WhatsApp
                  </Text>
                  <Text style={styles.editProfileSubtext}>
                    Resuelve todas tus consultas
                  </Text>
                </View>
              </View>
              <View>
                <ChevronRight
                  size={30}
                  color={colors.primary}
                  strokeWidth={3}
                />
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.logoutButton} onPress={clearUserData}>
            <LogOut size={30} color={colors.primary} strokeWidth={2} />
            <Text style={styles.logoutText}>Cerrar sesión</Text>
          </TouchableOpacity>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Versión 1.0.0</Text>
            <Text style={styles.footerText}>R.U.C: 2020120102</Text>
            <Text style={styles.footerText}>Razón Social: ControlZ</Text>
          </View>
        </View>
      </View>
      <View style={styles.absoluteIconsContainer}>
        <Footer iconName="home" selectedIcon={null} />
        <Footer iconName="buy" selectedIcon={null} />
        <Footer iconName="history" selectedIcon={null} />
        <Footer iconName="config" selectedIcon={'config'} />
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
  contentWhatssap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingEnd: 20,
    paddingTop: 20,
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
  contentNotify: {
    backgroundColor: '#1E292A',
    width: 35,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  content: {
    flex: 1,
  },
  contentHeader: {
    flexDirection: 'row',
    width: '100%',
  },
  margin: {
    marginStart: 10,
  },
  editProfileButton: {
    marginBottom: 10,
    paddingBottom: 15,
    borderBottomWidth: 0.4,
    borderBottomColor: colors.border,
  },
  editProfileText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
  },
  editProfileSubtext: {
    color: colors.border,
    fontFamily: fonts.mediumMt,
  },
  field: {
    marginBottom: 5,
  },
  label: {
    color: colors.white,
    fontFamily: fonts.mediumMt,
    marginBottom: 4,
  },
  whatsappButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    backgroundColor: colors.whatsappBackground,
    padding: 10,
    borderRadius: 8,
  },
  imageStyle: {
    width: 29,
    height: 29,
  },
  whatsappText: {
    color: colors.primary,
    fontSize: 16,
    flex: 1,
  },
  whatsappSubtext: {
    color: colors.border,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.logoutBackground,
    borderRadius: 8,
  },
  logoutText: {
    color: colors.primary,
    fontFamily: fonts.boldMt,
    fontSize: 16,
    flex: 1,
    marginStart: 10,
  },
  footer: {
    marginTop: 10,
  },
  footerText: {
    color: colors.border,
    fontSize: 12,
    fontFamily: fonts.mediumMt,
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
});

export default Config;
