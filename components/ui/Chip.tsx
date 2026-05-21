/**
 * @file Chip.tsx
 * @description Chip/Badge component for selection and display
 */

import React from 'react';
import {
  TouchableOpacity,
  Text,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../../lib/theme/useTheme';
import { spacing, typography, borderRadius, shadows } from '../../lib/theme/spacing';

interface ChipProps {
  label: string;
  selected?: boolean;
  onPress?: () => void;
  variant?: 'filled' | 'outlined' | 'elevated';
  size?: 'sm' | 'md' | 'lg';
  icon?: string;
  disabled?: boolean;
  style?: ViewStyle;
  testID?: string;
}

export const Chip: React.FC<ChipProps> = ({
  label,
  selected = false,
  onPress,
  variant = 'outlined',
  size = 'md',
  icon,
  disabled = false,
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
          paddingVertical: spacing.xs,
          minHeight: 28,
        };
      case 'lg':
        return {
          paddingHorizontal: spacing.lg,
          paddingVertical: spacing.md,
          minHeight: 40,
        };
      case 'md':
      default:
        return {
          paddingHorizontal: spacing.lg,
          paddingVertical: spacing.sm,
          minHeight: 32,
        };
    }
  };

  const getVariantStyles = () => {
    if (selected) {
      return {
        backgroundColor: colors.primary,
        borderWidth: 0,
      };
    }

    switch (variant) {
      case 'filled':
        return {
          backgroundColor: colors.surfaceElevated,
          borderWidth: 0,
        };
      case 'elevated':
        return {
          backgroundColor: colors.surface,
          borderWidth: 0,
          ...shadows.sm,
        };
      case 'outlined':
      default:
        return {
          backgroundColor: 'transparent',
          borderWidth: 1,
          borderColor: colors.border,
        };
    }
  };

  const getTextColor = () => {
    if (selected) return '#FFFFFF';
    return colors.text;
  };

  const containerStyle: ViewStyle = {
    ...getSizeStyles(),
    ...getVariantStyles(),
    borderRadius: borderRadius.full,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: disabled ? 0.6 : 1,
  };

  const textStyle: TextStyle = {
    ...typography.bodySmall,
    color: getTextColor(),
    marginHorizontal: icon ? spacing.xs : 0,
    fontWeight: '600',
  };

  const iconSize = size === 'sm' ? 14 : size === 'lg' ? 18 : 16;

  return (
    <TouchableOpacity
      style={[containerStyle, style]}
      onPress={onPress}
      disabled={disabled || !onPress}
      activeOpacity={0.7}
    >
      {icon && (
        <MaterialCommunityIcons
          name={icon}
          size={iconSize}
          color={getTextColor()}
          style={{ marginRight: spacing.xs }}
        />
      )}
      <Text style={textStyle} numberOfLines={1}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};


