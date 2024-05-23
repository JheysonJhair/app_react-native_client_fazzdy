import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {ChevronLeft} from 'lucide-react-native';
import {colors, fonts} from '../../theme/theme';
import qr from '../../assets/images/qr.png';

function Entrance({route}) {
  const {event} = route.params;
  const navigation = useNavigation();
  const [selectedFile, setSelectedFile] = useState(null);
  const [isSent, setIsSent] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ChevronLeft size={28} color={colors.primary} strokeWidth={2} />
        </TouchableOpacity>
        <Text style={styles.h1Header}>Mi entrada</Text>
      </View>
      <View>
        <Image
          source={{uri: event.imageSource}}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.content}>
          <View style={styles.row}>
            <Text style={styles.textLeft}>Usuario:</Text>
            <Text style={styles.textRight}>Jheyson Jhair Arone Angeles</Text>
          </View>
          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={styles.textLeft}>Entrada:</Text>
              <Text style={styles.textRight}>s/10.00</Text>
            </View>
            <View style={styles.column}>
              <Text style={styles.textLeft}>Vale:</Text>
              <Text style={styles.textRight}>X1</Text>
            </View>
          </View>
        </View>
        <Text style={styles.h2}>Código QR para comprobar mi entrada</Text>
        <View style={styles.qrContainer}>
          <Image
            source={qr}
            style={styles.imageQr}
            resizeMode="contain"
          />
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
  h2: {
    marginTop: 15,
    marginBottom: 15,
    fontSize: 14,
    fontFamily: fonts.mediumMt,
    color: colors.white,
    textAlign: 'center',
  },
  content: {
    backgroundColor: '#1E292A',
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginTop: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  textLeft: {
    color: colors.primary,
    fontFamily: fonts.boldMt,
  },
  textRight: {
    color: colors.white,
    fontFamily: fonts.mediumMt,
  },
  column: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  qrContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  imageQr: {
    width: 240,
    height: 240,
  },
});

export default Entrance;
