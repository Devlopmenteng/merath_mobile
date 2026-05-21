/**
 * @file ModernCard.tsx
 * @description Modern card component with elevation and flexible layout
 */

import React from 'react';
import {
  View,
  ViewStyle,
} from 'react-native';
import { useTheme } from '../../lib/theme/useTheme';
import { spacing, borderRadius, shadows } from '../../lib/theme/spacing';

interface ModernCardProps {
  children: React.ReactNode;
  variant?: 'elevated' | 'filled' | 'outlined';
  padding?: number;
  margin?: number;
  style?: ViewStyle;
  onPress?: () => void;
  testID?: string;
}

export const ModernCard: React.FC<ModernCardProps> = ({
  children,
  variant = 'elevated',
  padding = spacing.lg,
  margin = spacing.md,
  style,
  onPress,
  testID,
}) => {
  const { theme } = useTheme();
  const colors = theme.colors;

  const getVariantStyles = () => {
    switch (variant) {
      case 'elevated':
        return {
          backgroundColor: colors.surface,
          ...shadows.md,
        };
      case 'filled':
        return {
          backgroundColor: colors.surfaceElevated,
          borderWidth: 0,
        };
      case 'outlined':
        return {
          backgroundColor: colors.surface,
          borderWidth: 1,
          borderColor: colors.border,
        };
      default:
        return {};
    }
  };

  const containerStyle: ViewStyle = {
    ...getVariantStyles(),
    borderRadius: borderRadius.lg,
    padding,
    margin,
    overflow: 'hidden',
  };

  return (
    <View
      style={[containerStyle, style]}
      testID={testID}
    >
      {children}
    </View>
  );
};


