import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {Dock, CircleDollarSign, FolderClock, Menu} from 'lucide-react-native';
import {useNavigation} from '@react-navigation/native';
import {colors, fonts} from '../../theme/theme';
const Footer = ({iconName, selectedIcon}) => {
  const navigation = useNavigation();

  const isSelected = iconName === selectedIcon;
  const iconColor = isSelected ? colors.primary : colors.border;

  const handlePress = () => {
    switch (iconName) {
      case 'home':
        navigation.navigate('Home');
        break;
      case 'buy':
        navigation.navigate('Buy');
        break;
      case 'history':
        navigation.navigate('History');
        break;
      case 'config':
        navigation.navigate('Config');
        break;
      default:
        break;
    }
  };

  let iconComponent;
  switch (iconName) {
    case 'home':
      iconComponent = <Dock size={25} color={iconColor} />;
      break;
    case 'buy':
      iconComponent = <CircleDollarSign size={25} color={iconColor} />;
      break;
    case 'history':
      iconComponent = <FolderClock size={25} color={iconColor} />;
      break;
    case 'config':
      iconComponent = <Menu size={25} color={iconColor} />;
      break;
    default:
      iconComponent = null;
      break;
  }

  return (
    <View style={{alignItems: 'center'}}>
      <TouchableOpacity
        style={{
          ...styles.absoluteIcon,
        }}
        onPress={handlePress}>
        {iconComponent}
      </TouchableOpacity>
    </View>
  );
};

const styles = {
  absoluteIcon: {
    marginHorizontal: 21,
    alignItems: 'center',
    paddingVertical: 0,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
};

export default Footer;
