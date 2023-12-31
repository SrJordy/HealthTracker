import React from 'react';
import { HeaderButton, HeaderButtonProps } from 'react-navigation-header-buttons';
import { Ionicons } from '@expo/vector-icons';

// Definimos las props de forma explícita
type CustomHeaderButtonProps = {
  onPress: () => void;
};

const CustomHeaderButton: React.FC<CustomHeaderButtonProps & HeaderButtonProps> = ({ onPress, ...restProps }) => {
  return <HeaderButton {...restProps} IconComponent={Ionicons} iconSize={23} color="white" onPress={onPress} />;
};

export default CustomHeaderButton;
