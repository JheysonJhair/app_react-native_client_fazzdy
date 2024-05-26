import React, {useState, useEffect} from 'react';
import {
  Modal,
  View,
  ActivityIndicator,
  Text,
  StyleSheet,
  Animated,
} from 'react-native';
import {
  CircleCheckBig,
  CircleX,
  CircleAlert,
  Subtitle,
} from 'lucide-react-native';
import {colors, fonts} from '../../theme/theme';

const StatusModal = ({visible, status, title, subtitle}) => {
  const [opacity] = useState(new Animated.Value(0));

  useEffect(() => {
    if (visible) {
      Animated.timing(opacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(opacity, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  }, [visible, opacity]);

  const getIcon = () => {
    switch (status) {
      case 'success':
        return <CircleCheckBig color={colors.primary} size={60} />;
      case 'error':
        return <CircleX color={colors.primary} size={60} />;
      case 'loading':
        return (
          <ActivityIndicator
            size="large"
            color={colors.primary}
            style={{transform: [{scale: 1.2}]}}
          />
        );
      case 'warning':
        return <CircleAlert color={colors.primary} size={60} />;
      default:
        return null;
    }
  };

  return (
    <Modal transparent={true} animationType="fade" visible={visible}>
      <Animated.View style={[styles.modalContainer, {opacity}]}>
        <View style={styles.modalContent}>
          {getIcon()}
          <Text style={styles.loadingText}>{title}</Text>
          <View style={styles.Text}>
            <Text style={styles.loadingText2}>{subtitle}</Text>
          </View>
        </View>
      </Animated.View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    paddingTop: 30,
    backgroundColor: colors.background,
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: '75%',
    paddingBottom: 40,
  },
  Text: {
    width: '85%',
    textAlign: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 27,
    color: 'white',
    textAlign: 'center',
    fontFamily: fonts.boldMt,
  },
  loadingText2: {
    color: colors.border,
    marginTop: 10,
    fontSize: 15,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default StatusModal;
