/**
 * @file PrimaryButton.tsx
 * @description Primary button component following Material Design 3
 * Supports multiple variants, sizes, and states
 */

import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../../lib/theme/useTheme';
import { spacing, typography, borderRadius, shadows } from '../../lib/theme/spacing';

interface PrimaryButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'filled' | 'outlined' | 'text' | 'elevated';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  icon?: string;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  style?: ViewStyle;
  testID?: string;
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  title,
  onPress,
  variant = 'filled',
  size = 'md',
  disabled = false,
  loading = false,
  icon,
  iconPosition = 'left',
  fullWidth = false,
  style,
  testID,
}) => {
  const { theme } = useTheme();
  const colors = theme.colors;

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return {
          paddingHorizontal: spacing.md,
          paddingVertical: spacing.sm,
          minHeight: 32,
        };
      case 'lg':
        return {
          paddingHorizontal: spacing.xl,
          paddingVertical: spacing.lg,
          minHeight: 48,
        };
      case 'md':
      default:
        return {
          paddingHorizontal: spacing.lg,
          paddingVertical: spacing.md,
          minHeight: 40,
        };
    }
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'filled':
        return {
          backgroundColor: disabled ? colors.textDisabled : colors.primary,
          borderWidth: 0,
        };
      case 'outlined':
        return {
          backgroundColor: 'transparent',
          borderWidth: 1,
          borderColor: disabled ? colors.textDisabled : colors.primary,
        };
      case 'elevated':
        return {
          backgroundColor: disabled ? colors.textDisabled : colors.primary,
          borderWidth: 0,
          ...shadows.md,
        };
      case 'text':
        return {
          backgroundColor: 'transparent',
          borderWidth: 0,
        };
      default:
        return {};
    }
  };

  const getTextColor = () => {
    if (disabled) return colors.textDisabled;
    
    switch (variant) {
      case 'filled':
      case 'elevated':
        return '#FFFFFF';
      case 'outlined':
      case 'text':
        return colors.primary;
      default:
        return colors.text;
    }
  };

  const containerStyle: ViewStyle = {
    ...getSizeStyles(),
    ...getVariantStyles(),
    borderRadius: borderRadius.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: disabled ? 0.6 : 1,
    width: fullWidth ? '100%' : 'auto',
  };

  const textStyle: TextStyle = {
    ...typography.button,
    color: getTextColor(),
    marginHorizontal: icon ? spacing.sm : 0,
  };

  const iconSize = size === 'sm' ? 16 : size === 'lg' ? 24 : 20;

  return (
    <TouchableOpacity
      style={[containerStyle, style]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator color={getTextColor()} size="small" />
      ) : (
        <>
          {icon && iconPosition === 'left' && (
            <MaterialCommunityIcons
              name={icon}
              size={iconSize}
              color={getTextColor()}
            />
          )}
          <Text style={textStyle} numberOfLines={1}>
            {title}
          </Text>
          {icon && iconPosition === 'right' && (
            <MaterialCommunityIcons
              name={icon}
              size={iconSize}
              color={getTextColor()}
            />
          )}
        </>
      )}
    </TouchableOpacity>
  );
};


