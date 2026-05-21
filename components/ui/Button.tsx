/**
 * @file components/ui/Button.tsx
 * @description Basic button component for screens
 */

import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { useTheme } from '../../lib/theme/useTheme';

interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  style?: ViewStyle;
}

export const Button: React.FC<ButtonProps> = ({
  label,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  style,
}) => {
  const { theme } = useTheme();

  const getButtonStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      paddingHorizontal: size === 'small' ? 12 : size === 'large' ? 20 : 16,
      paddingVertical: size === 'small' ? 8 : size === 'large' ? 14 : 12,
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
      opacity: disabled ? 0.6 : 1,
    };

    if (variant === 'primary') {
      return {
        ...baseStyle,
        backgroundColor: theme.colors.primary,
      };
    } else if (variant === 'secondary') {
      return {
        ...baseStyle,
        backgroundColor: theme.colors.secondary,
      };
    } else {
      return {
        ...baseStyle,
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: theme.colors.primary,
      };
    }
  };

  const getTextStyle = (): TextStyle => {
    const baseTextStyle: TextStyle = {
      fontSize: size === 'small' ? 12 : size === 'large' ? 16 : 14,
      fontWeight: '600',
    };

    if (variant === 'outline') {
      return {
        ...baseTextStyle,
        color: theme.colors.primary,
      };
    } else {
      return {
        ...baseTextStyle,
        color: '#FFFFFF',
      };
    }
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[getButtonStyle(), style]}
    >
      <Text style={getTextStyle()}>{label}</Text>
    </TouchableOpacity>
  );
};
