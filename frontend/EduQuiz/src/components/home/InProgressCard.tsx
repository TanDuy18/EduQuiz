import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { mockInProgressExam } from '../../data/mockExams';
import { useTheme } from '../../context/ThemeContext';

interface InProgressCardProps {
  onContinueExam?: (examId: string) => void;
}

export const InProgressCard: React.FC<InProgressCardProps> = ({ onContinueExam }) => {
  const { colors, isDark } = useTheme();
  const exam = mockInProgressExam;
  const answeredCount = Object.keys(exam.savedAnswers).length;
  const progressPercent = Math.round((answeredCount / exam.totalQuestions) * 100);

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: isDark ? colors.card : '#eff6ff',
          borderColor: isDark ? colors.cardBorder : '#dbeafe',
        },
      ]}
    >
      <View style={styles.topRow}>
        <View style={styles.tag}>
          <Text style={styles.tagText}>Đang làm dở</Text>
        </View>
        <View style={styles.clockRow}>
          <Feather name="clock" size={12} color={colors.textMuted} />
          <Text style={[styles.clockText, { color: colors.textMuted }]}>Còn lại 48 phút</Text>
        </View>
      </View>

      <Text style={[styles.title, { color: colors.text }]} numberOfLines={1}>
        {exam.exam.title}
      </Text>

      <View style={styles.statsRow}>
        <Text style={[styles.statsText, { color: colors.textSecondary }]}>
          Đã làm: <Text style={[styles.boldText, { color: colors.text }]}>{answeredCount}/{exam.totalQuestions} câu</Text>
        </Text>
        <Text style={[styles.dot, { color: colors.textMuted }]}>•</Text>
        <Text style={[styles.statsText, { color: colors.textSecondary }]}>
          Tiến độ: <Text style={[styles.boldText, { color: colors.text }]}>{progressPercent}%</Text>
        </Text>
      </View>

      <View style={[styles.progressBar, { backgroundColor: isDark ? '#334155' : '#bfdbfe' }]}>
        <View style={[styles.progressFill, { width: `${progressPercent}%`, backgroundColor: colors.primary }]} />
      </View>

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => onContinueExam?.(exam.exam.id)}
        style={[styles.continueBtn, { backgroundColor: colors.primary }]}
      >
        <Feather name="play" size={14} color="#ffffff" />
        <Text style={styles.continueText}>Tiếp tục thi ngay</Text>
      </TouchableOpacity>
    </View>
  );
};

export default InProgressCard;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 20,
    padding: 16,
    marginVertical: 10,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  tag: {
    backgroundColor: '#2563eb',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  tagText: {
    color: '#ffffff',
    fontSize: 11,
    fontWeight: '700',
  },
  clockRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  clockText: {
    fontSize: 12,
  },
  title: {
    fontSize: 15,
    fontWeight: '800',
    marginBottom: 6,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 10,
  },
  statsText: {
    fontSize: 12,
  },
  boldText: {
    fontWeight: '700',
  },
  dot: {},
  progressBar: {
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 14,
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  continueBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 10,
    borderRadius: 12,
  },
  continueText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '700',
  },
});
