import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {ChevronLeft, Upload} from 'lucide-react-native';
import DocumentPicker from 'react-native-document-picker';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import {colors, fonts} from '../../theme/theme';
import yape from '../../assets/images/yape.png';
import {MapPinned} from 'lucide-react-native';

function EventInformation({route}) {
  const {event} = route.params;
  const navigation = useNavigation();
  const [selectedFile, setSelectedFile] = useState(null);
  const [isSent, setIsSent] = useState(false);

  const handleSelectFile = async () => {
    try {
      const permission =
        Platform.OS === 'android'
          ? PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE
          : PERMISSIONS.IOS.PHOTO_LIBRARY;

      const result = await check(permission);

      if (result === RESULTS.GRANTED) {
        pickDocument();
      } else {
        const requestResult = await request(permission);
        if (requestResult === RESULTS.GRANTED) {
          pickDocument();
        } else {
          console.log('Permiso denegado');
        }
      }
    } catch (err) {
      console.error('Error al solicitar permiso:', err);
    }
  };

  const pickDocument = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      setSelectedFile(res);
      setIsSent(false);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancelled the picker');
      } else {
        throw err;
      }
    }
  };

  const handleSendFile = () => {
    setIsSent(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ChevronLeft size={28} color={colors.primary} strokeWidth={2} />
        </TouchableOpacity>
        <Text style={styles.h1Header}>{event.nameParty}</Text>
      </View>
      <View>
        <Image
          source={{uri: event.imageSource}}
          style={styles.image}
          resizeMode="cover"
        />
        <Text style={styles.h2}>Compra tu entrada ya!</Text>
        <View style={styles.content}>
          <View style={styles.row}>
            <View style={styles.rightAligned}>
              <Image
                source={{
                  uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8zvrYVao45kR5yoIRz9-wJAgHw6x7grO4vAIMRadhvQ&s',
                }}
                style={styles.imageQR}
                resizeMode="cover"
              />
              <Text style={styles.h2}>983 805 438</Text>
            </View>
            <View style={styles.leftAligned}>
              <View style={styles.contentPay}>
                <View style={styles.textContainer}>
                  <Text style={styles.h3}>Pague aquí!</Text>
                  <Text style={styles.h4}>
                    Escanea el código QR o utilice el número.
                  </Text>
                  <View style={styles.margin}>
                    <Text style={styles.h33}>Precio de entrada:</Text>
                    <Text style={styles.h33}>Buscar en google maps!:</Text>
                  </View>
                </View>
                <View style={styles.imageContainer}>
                  <Image
                    source={yape}
                    style={styles.imageYape}
                    resizeMode="cover"
                  />
                  <View style={styles.margin}>
                    <Text style={styles.h333}>s./10.00</Text>
                    <TouchableOpacity
                      style={styles.contentMaps}
                      onPress={() =>
                        navigation.navigate('Ubication', {
                          latitude: -13.636322107510665, 
                          longitude: -72.87580665642942,
                        })
                      }>
                      <MapPinned
                        size={20}
                        color={colors.primary}
                        strokeWidth={2}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.line}></View>
          <View style={styles.grid}>
            <View style={styles.row}>
              <View style={styles.cell}>
                <Text style={styles.cellTextHead}>Organiza:</Text>
                <Text style={styles.cellText}>EAPIIS</Text>
              </View>
              <View style={styles.cell}>
                <Text style={styles.cellTextHead}>Semestre:</Text>
                <Text style={styles.cellText}>24-2</Text>
              </View>
              <View style={styles.cell}>
                <Text style={styles.cellTextHead}>Discoteca</Text>
                <Text style={styles.cellText}>BOOM</Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.cell}>
                <Text style={styles.cellTextHead}>Universidad:</Text>
                <Text style={styles.cellText}>Unamba</Text>
              </View>
              <View style={styles.cell}>
                <Text style={styles.cellTextHead}>Inicio show:</Text>
                <Text style={styles.cellText}>20:00 hs</Text>
              </View>
              <View style={styles.cell}>
                <Text style={styles.cellTextHead}>Fecha</Text>
                <Text style={styles.cellText}>12/10/24</Text>
              </View>
            </View>
          </View>
          <View style={styles.line}></View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.botonSubir}
              onPress={handleSelectFile}>
              <Upload size={20} color={colors.primary} strokeWidth={2} />
              <Text style={styles.botonText}>Buscar archivo</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.botonEnviar, {opacity: selectedFile ? 1 : 0.5}]}
              onPress={handleSendFile}
              disabled={!selectedFile}>
              <Text style={styles.botonText}>Enviar</Text>
            </TouchableOpacity>
          </View>
          {selectedFile && (
            <Text style={styles.botonText}>1 archivo seleccionado.</Text>
          )}
          {isSent && <Text style={styles.enviadoText}>Enviado!</Text>}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 15,
  },
  header: {
    flexDirection: 'row',
    paddingTop: 20,
    paddingBottom: 20,
  },
  h1Header: {
    fontSize: 17,
    paddingTop: 2,
    fontFamily: fonts.mediumMt,
    color: colors.white,
    marginLeft: 10,
  },
  image: {
    width: '100%',
    height: 200,
  },
  imageQR: {
    width: 150,
    height: 150,
  },
  imageYape: {
    width: 40,
    height: 50,
  },
  margin: {
    marginTop: 20,
  },
  h2: {
    marginTop: 10,
    marginBottom: 15,
    fontSize: 18,
    fontFamily: fonts.boldMt,
    color: colors.white,
  },
  content: {
    backgroundColor: '#1E292A',
    padding: 10,
    paddingBottom: 15,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rightAligned: {
    alignItems: 'center',
  },
  leftAligned: {
    alignItems: 'flex-start',
    paddingStart: 10,
    paddingBottom: 40,
  },
  h3: {
    color: colors.primary,
    fontFamily: fonts.boldMt,
    fontSize: 18,
  },
  h33: {
    color: colors.primary,
    fontFamily: fonts.boldMt,
    fontSize: 12,
    marginTop: 8,
  },
  h333: {
    color: colors.white,
    fontFamily: fonts.boldMt,
    fontSize: 12,
    marginTop: 14,
  },
  h4: {
    color: colors.white,
    fontFamily: fonts.semiBoldMt,
    fontSize: 11,
  },
  contentMaps: {
    marginTop: 10,
    backgroundColor: '#223033',
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  buttonContainer: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  botonSubir: {
    marginTop: 10,
    backgroundColor: colors.background,
    width: '60%',
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  botonEnviar: {
    marginTop: 10,
    backgroundColor: 'transparent',
    width: '30%',
    height: 45,
    borderWidth: 1,
    borderColor: 'white',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    paddingHorizontal: 8,
  },
  botonText: {
    marginLeft: 8,
    color: colors.white,
    fontFamily: fonts.mediumMt,
    fontSize: 13,
  },
  enviadoText: {
    marginLeft: 8,
    color: colors.primary,
    fontFamily: fonts.boldMt,
    fontSize: 13,
  },
  contentPay: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textContainer: {
    width: '55%',
  },
  imageContainer: {
    width: '20%',
  },
  line: {
    borderColor: colors.primary,
    borderWidth: 0.4,
    marginVertical: 1,
  },
  grid: {
    marginTop: 20,
    marginBottom: 20,
  },
  cell: {
    flex: 1,
    padding: 5,
    justifyContent: 'center',
  },
  cellTextHead: {
    color: colors.primary,
    fontFamily: fonts.boldMt,
    fontSize: 14,
  },
  cellText: {
    color: colors.white,
    fontFamily: fonts.boldMt,
    fontSize: 14,
  },
});

export default EventInformation;
