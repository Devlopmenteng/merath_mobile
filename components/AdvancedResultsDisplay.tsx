/**
 * @file AdvancedResultsDisplay.tsx
 * @description Advanced results display component with multiple views
 * Includes table, charts, and detailed information
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { useTheme } from '../lib/theme/useTheme';
import { spacing, typography, borderRadius, shadows } from '../lib/theme/spacing';
import { ResultsTable } from './ResultsTable';
import { PrimaryButton } from './ui/PrimaryButton';
import { ModernCard } from './ui/ModernCard';

interface CalculationResult {
  success: boolean;
  heirs: Record<string, any>;
  totalEstate: number;
  madhab: string;
  details?: any;
}

interface AdvancedResultsDisplayProps {
  result: CalculationResult;
  onClose: () => void;
  onExport?: () => void;
  onShare?: () => void;
  style?: ViewStyle;
}

type ViewMode = 'table' | 'chart' | 'details';

export const AdvancedResultsDisplay: React.FC<AdvancedResultsDisplayProps> = ({
  result,
  onClose,
  onExport,
  onShare,
  style,
}) => {
  const { theme } = useTheme();
  const colors = theme.colors;
  const [viewMode, setViewMode] = useState<ViewMode>('table');
  const [expandedHeirId, setExpandedHeirId] = useState<string | null>(null);

  // Convert heirs data to table format
  const tableData = Object.entries(result.heirs).map(([heirId, heirData]: any) => ({
    heir: heirData.name || heirId,
    count: heirData.count || 1,
    share: heirData.share || '0/1',
    percentage: heirData.percentage || 0,
    amount: heirData.amount || 0,
  }));

  const renderViewModeButton = (mode: ViewMode, icon: string, label: string) => (
    <TouchableOpacity
      style={[
        styles.viewModeButton,
        {
          backgroundColor: viewMode === mode ? colors.primary : colors.surface,
          borderColor: viewMode === mode ? colors.primary : colors.border,
        },
      ]}
      onPress={() => setViewMode(mode)}
    >
      <MaterialCommunityIcons
        name={icon}
        size={18}
        color={viewMode === mode ? '#FFFFFF' : colors.text}
      />
      <Text
        style={[
          styles.viewModeLabel,
          { color: viewMode === mode ? '#FFFFFF' : colors.text },
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );

  const renderTableView = () => (
    <ResultsTable
      data={tableData}
      totalEstate={result.totalEstate}
      madhab={result.madhab}
    />
  );

  const renderChartView = () => (
    <ModernCard variant="elevated" padding={spacing.lg}>
      <View style={styles.chartContainer}>
        <MaterialCommunityIcons
          name="chart-pie"
          size={64}
          color={colors.primary}
          style={{ marginBottom: spacing.lg }}
        />
        <Text style={[styles.chartTitle, { color: colors.text }]}>
          Distribution Chart
        </Text>
        <Text style={[styles.chartDescription, { color: colors.textSecondary }]}>
          Visual representation of inheritance distribution
        </Text>

        {/* Simple distribution bars */}
        <View style={{ marginTop: spacing.lg, width: '100%' }}>
          {tableData.map((item, index) => (
            <View key={index} style={styles.barContainer}>
              <View style={styles.barLabel}>
                <Text
                  style={[styles.barLabelText, { color: colors.text }]}
                  numberOfLines={1}
                >
                  {item.heir}
                </Text>
                <Text
                  style={[styles.barPercentage, { color: colors.primary }]}
                >
                  {item.percentage.toFixed(1)}%
                </Text>
              </View>
              <View
                style={[
                  styles.barBackground,
                  { backgroundColor: colors.border },
                ]}
              >
                <View
                  style={[
                    styles.barFill,
                    {
                      width: `${item.percentage}%`,
                      backgroundColor: colors.primary,
                    },
                  ]}
                />
              </View>
            </View>
          ))}
        </View>
      </View>
    </ModernCard>
  );

  const renderDetailsView = () => (
    <View>
      {tableData.map((item, index) => (
        <ModernCard
          key={index}
          variant="outlined"
          padding={spacing.lg}
          margin={spacing.md}
        >
          <TouchableOpacity
            style={styles.detailsHeader}
            onPress={() =>
              setExpandedHeirId(
                expandedHeirId === item.heir ? null : item.heir
              )
            }
          >
            <View style={styles.detailsHeaderLeft}>
              <View
                style={[
                  styles.heirIcon,
                  { backgroundColor: colors.primary + '20' },
                ]}
              >
                <MaterialCommunityIcons
                  name="account"
                  size={24}
                  color={colors.primary}
                />
              </View>
              <View>
                <Text style={[styles.detailsHeirName, { color: colors.text }]}>
                  {item.heir}
                </Text>
                <Text
                  style={[
                    styles.detailsAmount,
                    { color: colors.success },
                  ]}
                >
                  {new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'SAR',
                  }).format(item.amount)}
                </Text>
              </View>
            </View>
            <MaterialCommunityIcons
              name={
                expandedHeirId === item.heir
                  ? 'chevron-up'
                  : 'chevron-down'
              }
              size={24}
              color={colors.textSecondary}
            />
          </TouchableOpacity>

          {expandedHeirId === item.heir && (
            <View style={[styles.detailsContent, { borderTopColor: colors.border }]}>
              <View style={styles.detailRow}>
                <Text style={[styles.detailLabel, { color: colors.textSecondary }]}>
                  Share (Portion)
                </Text>
                <Text style={[styles.detailValue, { color: colors.primary }]}>
                  {item.share}
                </Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={[styles.detailLabel, { color: colors.textSecondary }]}>
                  Percentage
                </Text>
                <Text style={[styles.detailValue, { color: colors.text }]}>
                  {item.percentage.toFixed(2)}%
                </Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={[styles.detailLabel, { color: colors.textSecondary }]}>
                  Count
                </Text>
                <Text style={[styles.detailValue, { color: colors.text }]}>
                  {item.count}
                </Text>
              </View>
            </View>
          )}
        </ModernCard>
      ))}
    </View>
  );

  return (
    <Animated.View
      style={[styles.container, style]}
      entering={FadeInUp.duration(300)}
    >
      {/* Header */}
      <View
        style={[
          styles.header,
          { backgroundColor: colors.primary, borderBottomColor: colors.border },
        ]}
      >
        <View style={styles.headerContent}>
          <MaterialCommunityIcons
            name="check-circle"
            size={24}
            color="#FFFFFF"
          />
          <Text style={styles.headerTitle}>Calculation Complete</Text>
        </View>
        <TouchableOpacity onPress={onClose}>
          <MaterialCommunityIcons name="close" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* View Mode Selector */}
      <View style={[styles.viewModeSelector, { backgroundColor: colors.surface }]}>
        {renderViewModeButton('table', 'table', 'Table')}
        {renderViewModeButton('chart', 'chart-pie', 'Chart')}
        {renderViewModeButton('details', 'information', 'Details')}
      </View>

      {/* Content */}
      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {viewMode === 'table' && renderTableView()}
        {viewMode === 'chart' && renderChartView()}
        {viewMode === 'details' && renderDetailsView()}
      </ScrollView>

      {/* Action Buttons */}
      <View style={[styles.actions, { backgroundColor: colors.surface }]}>
        <PrimaryButton
          title="Print Report"
          onPress={onExport}
          variant="filled"
          size="md"
          icon="printer"
          fullWidth
          style={{ marginBottom: spacing.md }}
        />
        <PrimaryButton
          title="New Calculation"
          onPress={onClose}
          variant="outlined"
          size="md"
          icon="plus"
          fullWidth
        />
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
    ...shadows.lg,
  },

  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
    borderBottomWidth: 1,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  headerTitle: {
    ...typography.titleLarge,
    color: '#FFFFFF',
  },

  // View Mode Selector
  viewModeSelector: {
    flexDirection: 'row',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    gap: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  viewModeButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    gap: spacing.xs,
  },
  viewModeLabel: {
    ...typography.labelSmall,
  },

  // Content
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: spacing.lg,
  },

  // Chart View
  chartContainer: {
    alignItems: 'center',
  },
  chartTitle: {
    ...typography.titleMedium,
    marginBottom: spacing.sm,
  },
  chartDescription: {
    ...typography.bodySmall,
  },
  barContainer: {
    marginBottom: spacing.lg,
  },
  barLabel: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  barLabelText: {
    ...typography.bodySmall,
    flex: 1,
  },
  barPercentage: {
    ...typography.labelSmall,
  },
  barBackground: {
    height: 8,
    borderRadius: borderRadius.full,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: borderRadius.full,
  },

  // Details View
  detailsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailsHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    flex: 1,
  },
  heirIcon: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.lg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailsHeirName: {
    ...typography.h4,
  },
  detailsAmount: {
    ...typography.caption,
    marginTop: spacing.xs,
    fontWeight: '600',
  },
  detailsContent: {
    marginTop: spacing.lg,
    paddingTop: spacing.lg,
    borderTopWidth: 1,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  detailLabel: {
    ...typography.bodySmall,
  },
  detailValue: {
    ...typography.bodySmall,
    fontWeight: '600',
  },

  // Actions
  actions: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
});
