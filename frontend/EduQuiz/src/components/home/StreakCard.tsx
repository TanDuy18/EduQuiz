import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';

interface StreakCardProps {
  streakDays?: number;
}

export const StreakCard: React.FC<StreakCardProps> = ({ streakDays = 5 }) => {
  const { colors, isDark } = useTheme();
  const daysOfWeek = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];
  const completedIndices = [0, 1, 2, 3, 4];

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: isDark ? colors.card : '#fff7ed',
          borderColor: isDark ? colors.cardBorder : '#ffedd5',
        },
      ]}
    >
      <View style={styles.header}>
        <View style={styles.leftRow}>
          <View style={[styles.flameBox, { backgroundColor: isDark ? 'rgba(249,115,22,0.2)' : '#ffedd5' }]}>
            <Feather name="zap" size={24} color="#f97316" />
          </View>
          <View>
            <Text style={[styles.title, { color: isDark ? '#fdba74' : '#9a3412' }]}>
              Chuỗi {streakDays} ngày liên tục!
            </Text>
            <Text style={[styles.subtitle, { color: isDark ? colors.textMuted : '#c2410c' }]}>
              Chăm chỉ mỗi ngày để bứt phá điểm số thi cử
            </Text>
          </View>
        </View>
        <View style={[styles.badge, { backgroundColor: isDark ? 'rgba(249,115,22,0.2)' : '#ffedd5', borderColor: isDark ? '#ea580c' : '#fed7aa' }]}>
          <Text style={[styles.badgeText, { color: isDark ? '#fdba74' : '#9a3412' }]}>Top 5%</Text>
        </View>
      </View>

      <View style={styles.daysRow}>
        {daysOfWeek.map((day, idx) => {
          const isDone = completedIndices.includes(idx);
          const isToday = idx === 4;

          return (
            <View key={day} style={styles.dayCol}>
              <View
                style={[
                  styles.dayCircle,
                  isDone ? styles.dayCircleDone : [styles.dayCirclePending, { backgroundColor: colors.card, borderColor: colors.cardBorder }],
                  isToday && styles.dayCircleToday,
                ]}
              >
                {isDone ? (
                  <Feather name="check" size={14} color="#ffffff" />
                ) : (
                  <Text style={[styles.dot, { color: colors.textMuted }]}>•</Text>
                )}
              </View>
              <Text
                style={[
                  styles.dayText,
                  { color: colors.textMuted },
                  isToday && styles.dayTextToday,
                ]}
              >
                {day}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default StreakCard;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 20,
    padding: 16,
    marginVertical: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  leftRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  flameBox: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '800',
  },
  subtitle: {
    fontSize: 12,
    marginTop: 2,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
  },
  daysRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(251, 146, 60, 0.2)',
  },
  dayCol: {
    alignItems: 'center',
    gap: 6,
  },
  dayCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayCircleDone: {
    backgroundColor: '#f97316',
  },
  dayCirclePending: {
    borderWidth: 1,
  },
  dayCircleToday: {
    borderWidth: 2,
    borderColor: '#ea580c',
  },
  dot: {
    fontSize: 14,
  },
  dayText: {
    fontSize: 11,
    fontWeight: '600',
  },
  dayTextToday: {
    color: '#ea580c',
    fontWeight: '800',
  },
});
