/**
 * @file components/ui/Stepper.tsx
 * @description Stepper component for multi-step forms
 */

import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '../../lib/theme/useTheme';
import { spacing, borderRadius } from '../../lib/theme/spacing';

interface StepperProps {
  steps: string[];
  currentStep: number;
  style?: ViewStyle;
}

export const Stepper: React.FC<StepperProps> = ({ steps, currentStep, style }) => {
  const { theme } = useTheme();
  const colors = theme.colors;

  return (
    <View style={[styles.container, style]}>
      {steps.map((step, index) => (
        <View key={index} style={styles.stepContainer}>
          <View
            style={[
              styles.stepCircle,
              {
                backgroundColor:
                  index <= currentStep ? colors.primary : colors.border,
              },
            ]}
          >
            <Text
              style={[
                styles.stepNumber,
                {
                  color: index <= currentStep ? '#FFFFFF' : colors.text,
                },
              ]}
            >
              {index + 1}
            </Text>
          </View>
          <Text style={[styles.stepLabel, { color: colors.text }]}>
            {step}
          </Text>
          {index < steps.length - 1 && (
            <View
              style={[
                styles.stepLine,
                {
                  backgroundColor:
                    index < currentStep ? colors.primary : colors.border,
                },
              ]}
            />
          )}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: spacing.lg,
  },
  stepContainer: {
    flex: 1,
    alignItems: 'center',
  },
  stepCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  stepNumber: {
    fontSize: 14,
    fontWeight: '700',
  },
  stepLabel: {
    fontSize: 12,
    textAlign: 'center',
  },
  stepLine: {
    position: 'absolute',
    height: 2,
    width: '100%',
    top: 20,
    zIndex: -1,
  },
});
