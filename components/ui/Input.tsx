/**
 * @file components/ui/Input.tsx
 * @description Basic input component for screens
 */

import React, { useState } from 'react';
import { TextInput, View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { useTheme } from '../../lib/theme/useTheme';

interface InputProps {
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  label?: string;
  error?: string;
  keyboardType?: 'default' | 'numeric' | 'email-address' | 'phone-pad';
  style?: ViewStyle;
}

export const Input: React.FC<InputProps> = ({
  placeholder,
  value,
  onChangeText,
  label,
  error,
  keyboardType = 'default',
  style,
}) => {
  const { theme } = useTheme();
  const [isFocused, setIsFocused] = useState(false);

  const inputStyle: TextStyle = {
    borderWidth: 1,
    borderColor: error ? theme.colors.error : isFocused ? theme.colors.primary : '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: theme.colors.text,
    backgroundColor: theme.colors.background,
  };

  const labelStyle: TextStyle = {
    fontSize: 12,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: 6,
  };

  const errorStyle: TextStyle = {
    fontSize: 12,
    color: theme.colors.error,
    marginTop: 4,
  };

  return (
    <View style={style}>
      {label && <Text style={labelStyle}>{label}</Text>}
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        keyboardType={keyboardType}
        style={inputStyle}
        placeholderTextColor="#999"
      />
      {error && <Text style={errorStyle}>{error}</Text>}
    </View>
  );
};
