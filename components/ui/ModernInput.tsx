/**
 * @file ModernInput.tsx
 * @description Modern input component with Material Design 3 styling
 */

import React, { useState } from 'react';
import {
  TextInput,
  View,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  TouchableOpacity,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../../lib/theme/useTheme';
import { spacing, typography, borderRadius, shadows } from '../../lib/theme/spacing';

interface ModernInputProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  keyboardType?: 'default' | 'numeric' | 'email-address' | 'phone-pad';
  secureTextEntry?: boolean;
  disabled?: boolean;
  error?: string;
  icon?: string;
  rightIcon?: string;
  onRightIconPress?: () => void;
  multiline?: boolean;
  numberOfLines?: number;
  maxLength?: number;
  style?: ViewStyle;
  testID?: string;
}

export const ModernInput: React.FC<ModernInputProps> = ({
  label,
  placeholder,
  value,
  onChangeText,
  keyboardType = 'default',
  secureTextEntry = false,
  disabled = false,
  error,
  icon,
  rightIcon,
  onRightIconPress,
  multiline = false,
  numberOfLines = 1,
  maxLength,
  style,
  testID,
}) => {
  const { theme } = useTheme();
  const colors = theme.colors;
  const [isFocused, setIsFocused] = useState(false);

  const containerStyle: ViewStyle = {
    marginBottom: error ? spacing.lg : spacing.md,
  };

  const inputContainerStyle: ViewStyle = {
    flexDirection: 'row',
    alignItems: multiline ? 'flex-start' : 'center',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: isFocused ? colors.primary : error ? colors.error : colors.border,
    paddingHorizontal: spacing.md,
    paddingVertical: multiline ? spacing.md : 0,
    minHeight: 48,
    ...shadows.sm,
  };

  const inputStyle: TextStyle = {
    ...typography.bodyMedium,
    color: colors.text,
    flex: 1,
    paddingVertical: spacing.sm,
    paddingHorizontal: icon ? spacing.sm : 0,
  };

  const labelStyle: TextStyle = {
    ...typography.bodySmall,
    color: isFocused ? colors.primary : colors.textSecondary,
    marginBottom: spacing.sm,
    fontWeight: '600',
  };

  const errorStyle: TextStyle = {
    ...typography.caption,
    color: colors.error,
    marginTop: spacing.sm,
  };

  return (
    <View style={[containerStyle, style]}>
      {label && <Text style={labelStyle}>{label}</Text>}
      
      <View style={inputContainerStyle}>
        {icon && (
          <MaterialCommunityIcons
            name={icon}
            size={20}
            color={isFocused ? colors.primary : colors.textSecondary}
            style={{ marginRight: spacing.sm }}
          />
        )}
        
        <TextInput
          style={inputStyle}
          placeholder={placeholder}
          placeholderTextColor={colors.textTertiary}
          value={value}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry}
          editable={!disabled}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          multiline={multiline}
          numberOfLines={numberOfLines}
          maxLength={maxLength}
          selectionColor={colors.primary}
        />
        
        {rightIcon && (
          <TouchableOpacity
            onPress={onRightIconPress}
            disabled={disabled}
            style={{ padding: spacing.sm }}
          >
            <MaterialCommunityIcons
              name={rightIcon}
              size={20}
              color={colors.textSecondary}
            />
          </TouchableOpacity>
        )}
      </View>
      
      {error && <Text style={errorStyle}>{error}</Text>}
    </View>
  );
};


