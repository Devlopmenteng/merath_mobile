/**
 * @file ResultsTable.tsx
 * @description Advanced results table component for displaying inheritance calculations
 * Shows heir names, shares, percentages, and distributed amounts
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ViewStyle,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../lib/theme/useTheme';
import { spacing, typography, borderRadius } from '../lib/theme/spacing';

interface ResultRow {
  heir: string;
  count: number;
  share: string; // e.g., "1/2"
  percentage: number;
  amount: number;
}

interface ResultsTableProps {
  data: ResultRow[];
  totalEstate: number;
  madhab: string;
  style?: ViewStyle;
}

export const ResultsTable: React.FC<ResultsTableProps> = ({
  data,
  totalEstate,
  madhab,
  style,
}) => {
  const { theme } = useTheme();
  const colors = theme.colors;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'SAR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const formatPercentage = (percentage: number) => {
    return `${percentage.toFixed(2)}%`;
  };

  return (
    <View style={[styles.container, style]}>
      {/* Header Info */}
      <View style={[styles.headerInfo, { backgroundColor: colors.primary + '10' }]}>
        <View style={styles.headerInfoItem}>
          <Text style={[styles.headerInfoLabel, { color: colors.textSecondary }]}>
            Total Estate
          </Text>
          <Text style={[styles.headerInfoValue, { color: colors.primary }]}>
            {formatCurrency(totalEstate)}
          </Text>
        </View>
        <View style={[styles.divider, { backgroundColor: colors.border }]} />
        <View style={styles.headerInfoItem}>
          <Text style={[styles.headerInfoLabel, { color: colors.textSecondary }]}>
            School (Madhab)
          </Text>
          <Text style={[styles.headerInfoValue, { color: colors.primary }]}>
            {madhab.charAt(0).toUpperCase() + madhab.slice(1)}
          </Text>
        </View>
      </View>

      {/* Table */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.tableScroll}
      >
        <View style={styles.table}>
          {/* Table Header */}
          <View
            style={[
              styles.tableRow,
              styles.tableHeader,
              { backgroundColor: colors.primary },
            ]}
          >
            <Text style={[styles.tableHeaderCell, styles.heirColumn]}>
              الوارث (Heir)
            </Text>
            <Text style={[styles.tableHeaderCell, styles.countColumn]}>
              العدد (Count)
            </Text>
            <Text style={[styles.tableHeaderCell, styles.shareColumn]}>
              النصيب (Share)
            </Text>
            <Text style={[styles.tableHeaderCell, styles.percentageColumn]}>
              النسبة (%)
            </Text>
            <Text style={[styles.tableHeaderCell, styles.amountColumn]}>
              المبلغ (SAR)
            </Text>
          </View>

          {/* Table Rows */}
          {data.map((row, index) => (
            <View
              key={index}
              style={[
                styles.tableRow,
                {
                  backgroundColor:
                    index % 2 === 0 ? colors.surface : colors.surfaceElevated,
                  borderBottomColor: colors.border,
                },
              ]}
            >
              <Text
                style={[
                  styles.tableCell,
                  styles.heirColumn,
                  { color: colors.text },
                ]}
              >
                {row.heir}
              </Text>
              <Text
                style={[
                  styles.tableCell,
                  styles.countColumn,
                  { color: colors.text },
                ]}
              >
                {row.count}
              </Text>
              <Text
                style={[
                  styles.tableCell,
                  styles.shareColumn,
                  { color: colors.primary, fontWeight: '600' },
                ]}
              >
                {row.share}
              </Text>
              <Text
                style={[
                  styles.tableCell,
                  styles.percentageColumn,
                  { color: colors.text },
                ]}
              >
                {formatPercentage(row.percentage)}
              </Text>
              <Text
                style={[
                  styles.tableCell,
                  styles.amountColumn,
                  { color: colors.success, fontWeight: '600' },
                ]}
              >
                {formatCurrency(row.amount)}
              </Text>
            </View>
          ))}

          {/* Total Row */}
          <View
            style={[
              styles.tableRow,
              styles.totalRow,
              { backgroundColor: colors.primary + '20' },
            ]}
          >
            <Text
              style={[
                styles.tableCell,
                styles.heirColumn,
                { color: colors.primary, fontWeight: '700' },
              ]}
            >
              Total
            </Text>
            <Text style={[styles.tableCell, styles.countColumn]} />
            <Text style={[styles.tableCell, styles.shareColumn]} />
            <Text
              style={[
                styles.tableCell,
                styles.percentageColumn,
                { color: colors.primary, fontWeight: '700' },
              ]}
            >
              100.00%
            </Text>
            <Text
              style={[
                styles.tableCell,
                styles.amountColumn,
                { color: colors.primary, fontWeight: '700' },
              ]}
            >
              {formatCurrency(totalEstate)}
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Footer Info */}
      <View style={[styles.footer, { borderTopColor: colors.border }]}>
        <View style={styles.footerItem}>
          <MaterialCommunityIcons
            name="information-outline"
            size={16}
            color={colors.info}
          />
          <Text style={[styles.footerText, { color: colors.textSecondary }]}>
            Results calculated according to {madhab} school of Islamic jurisprudence
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: spacing.md,
  },

  // Header Info
  headerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.lg,
    borderRadius: borderRadius.md,
    marginBottom: spacing.lg,
  },
  headerInfoItem: {
    flex: 1,
    alignItems: 'center',
  },
  headerInfoLabel: {
    ...typography.caption,
    marginBottom: spacing.xs,
    fontWeight: '600',
  },
  headerInfoValue: {
    ...typography.h3,
  },
  divider: {
    width: 1,
    height: 40,
    marginHorizontal: spacing.lg,
  },

  // Table
  tableScroll: {
    marginBottom: spacing.lg,
  },
  table: {
    borderRadius: borderRadius.md,
    overflow: 'hidden',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
  },
  tableHeader: {
    paddingVertical: spacing.md,
  },
  tableHeaderCell: {
    ...typography.bodySmall,
    color: '#FFFFFF',
    fontWeight: '700',
    textAlign: 'center',
    paddingHorizontal: spacing.sm,
  },
  tableCell: {
    ...typography.bodySmall,
    textAlign: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.sm,
  },

  // Column widths
  heirColumn: {
    width: 120,
    textAlign: 'left',
  },
  countColumn: {
    width: 80,
  },
  shareColumn: {
    width: 100,
  },
  percentageColumn: {
    width: 100,
  },
  amountColumn: {
    width: 120,
    textAlign: 'right',
  },

  // Total Row
  totalRow: {
    fontWeight: '700',
  },

  // Footer
  footer: {
    borderTopWidth: 1,
    paddingTop: spacing.md,
    paddingHorizontal: spacing.md,
  },
  footerItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
  },
  footerText: {
    ...typography.bodySmall,
    flex: 1,
  },
});
