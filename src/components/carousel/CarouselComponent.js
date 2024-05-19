import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Dimensions,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import {ChevronRight} from 'lucide-react-native';
import {useNavigation} from '@react-navigation/native';
import {colors, fonts} from '../../theme/theme';
const {width} = Dimensions.get('window');

const data = [
  {
    key: '1',
    title: 'Accede con tu móvil',
    description:
      'Muestra tus tickets desde la app al ingresar al evento. Funciona incluso si no tienes acceso a internet.',
    image: require('../../assets/images/steps/step1.png'),
  },
  {
    key: '2',
    title: 'Smart Tickets',
    description:
      'El código QR de tus tickets cambia de forma segura para que no puedan ser duplicados. Así siempre estarás protegido.',
    image: require('../../assets/images/steps/step2.png'),
  },
  {
    key: '3',
    title: 'Pago con yape',
    description:
      'Ahora puedes realizar la venta de entradas de forma online mediante yape de manera fácil y sencilla.',
    image: require('../../assets/images/steps/step3.png'),
  },
  {
    key: '4',
    title: 'Mantente informado',
    description:
      'Te notificaremos cuando recibas un ticket y cuando haya cambios o novedades relevantes sobre tus eventos. Acceder a notificaciones y ubicación.',
    image: require('../../assets/images/steps/step4.png'),
  },
];

const CarouselComponent = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);
  const navigation = useNavigation();

  const onViewableItemsChanged = useRef(({viewableItems}) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  const viewConfig = useRef({viewAreaCoveragePercentThreshold: 50}).current;

  const renderItem = ({item}) => (
    <View style={styles.slide}>
      <Image source={item.image} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </View>
  );

  const handleNext = () => {
    if (currentIndex < data.length - 1) {
      flatListRef.current.scrollToIndex({index: currentIndex + 1});
    }
  };

  const handleStart = () => {
    navigation.navigate('Home');
  };

  return (
    <View style={styles.wrapper}>
      <FlatList
        data={data}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.key}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewConfig}
        ref={flatListRef}
      />
      <View style={styles.pagination}>
        {data.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              {
                backgroundColor:
                  index === currentIndex ? colors.primary : '#ccc',
              },
            ]}
          />
        ))}
      </View>
      {currentIndex < data.length - 1 ? (
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <ChevronRight size={26} color={colors.primary} strokeWidth={3} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.startButton} onPress={handleStart}>
          <Text style={styles.startButtonText}>Comenzar</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: colors.foreground,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slide: {
    backgroundColor: colors.background,
    width,
    justifyContent: 'center',
    alignItems: 'center',
    height: '70%',
  },
  content: {
    backgroundColor: colors.foreground,
    justifyContent: 'center',
    width,
    height: '25%',
    alignItems: 'center',
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
    marginTop: '50%',
  },
  title: {
    fontSize: 18,
    fontFamily: fonts.boldMt,
    color: '#fff',
    marginBottom: 10,
  },
  description: {
    fontFamily: fonts.mediumMt,
    fontSize: 13,
    paddingHorizontal: 20,
    textAlign: 'center',
    color: '#fff',
  },
  pagination: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 40,
    left: 30,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 2,
  },
  nextButton: {
    position: 'absolute',
    right: 30,
    bottom: 30,
    backgroundColor: '#223033',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingStart: 4,
  },
  startButton: {
    position: 'absolute',
    right: 10,
    bottom: 30,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  startButtonText: {
    color: colors.primary,
    fontSize: 14,
    fontFamily: fonts.boldMt,
  },
});

export default CarouselComponent;
