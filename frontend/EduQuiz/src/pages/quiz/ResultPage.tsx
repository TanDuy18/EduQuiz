import React, { useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { mockExams } from '../../data/mockExams';
import { useTheme } from '../../context/ThemeContext';

interface ResultPageProps {
  examId?: string;
  resultData?: any;
  onRetry?: () => void;
  onReview?: () => void;
  onGoHome?: () => void;
}

export default function ResultPage({
  examId,
  resultData,
  onRetry,
  onReview,
  onGoHome,
}: ResultPageProps) {
  const { colors, isDark } = useTheme();
  const exam = useMemo(() => {
    return mockExams.find((e) => e.id === examId) || mockExams[0];
  }, [examId]);

  const result = resultData || {
    score: 8.6,
    correctCount: 43,
    wrongCount: 5,
    unansweredCount: 2,
    totalQuestions: 50,
    timeSpentSeconds: 4250,
  };

  const mins = Math.floor((result.timeSpentSeconds || 3600) / 60);
  const secs = (result.timeSpentSeconds || 3600) % 60;

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.bgSubtle }]}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      {/* SCORE CARD */}
      <View
        style={[
          styles.scoreCard,
          {
            backgroundColor: colors.card,
            borderColor: colors.cardBorder,
          },
        ]}
      >
        <View style={[styles.trophyCircle, { backgroundColor: isDark ? 'rgba(217,119,6,0.2)' : '#fef3c7' }]}>
          <Feather name="award" size={36} color="#d97706" />
        </View>

        <Text style={[styles.examTitle, { color: colors.text }]}>{exam.title}</Text>
        <Text style={[styles.scoreValue, { color: colors.text }]}>{result.score?.toFixed(1) || '8.6'}</Text>
        <Text style={[styles.scoreMax, { color: colors.textMuted }]}>Thang điểm 10.0</Text>

        <View style={styles.statsRow}>
          <View style={styles.statCol}>
            <Text style={[styles.statNum, { color: colors.success }]}>{result.correctCount}</Text>
            <Text style={[styles.statLabel, { color: colors.textMuted }]}>Đúng</Text>
          </View>
          <View style={[styles.divider, { backgroundColor: colors.cardBorder }]} />
          <View style={styles.statCol}>
            <Text style={[styles.statNum, { color: colors.danger }]}>{result.wrongCount}</Text>
            <Text style={[styles.statLabel, { color: colors.textMuted }]}>Sai</Text>
          </View>
          <View style={[styles.divider, { backgroundColor: colors.cardBorder }]} />
          <View style={styles.statCol}>
            <Text style={[styles.statNum, { color: colors.warning }]}>{result.unansweredCount}</Text>
            <Text style={[styles.statLabel, { color: colors.textMuted }]}>Chưa làm</Text>
          </View>
        </View>

        <View style={styles.timeSpentRow}>
          <Feather name="clock" size={14} color={colors.textMuted} />
          <Text style={[styles.timeSpentText, { color: colors.textMuted }]}>
            Thời gian hoàn thành: {mins} phút {secs} giây
          </Text>
        </View>
      </View>

      {/* ACTION BUTTONS */}
      <View style={styles.actionRow}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={onRetry}
          style={[styles.retryBtn, { backgroundColor: colors.chipBg, borderColor: colors.cardBorder }]}
        >
          <Feather name="rotate-ccw" size={16} color={colors.primary} />
          <Text style={[styles.retryText, { color: colors.primary }]}>Thi lại đề này</Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={onReview}
          style={[styles.reviewBtn, { backgroundColor: colors.primary }]}
        >
          <Text style={styles.reviewText}>Xem lời giải chi tiết</Text>
          <Feather name="arrow-right" size={16} color="#ffffff" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        activeOpacity={0.7}
        onPress={onGoHome}
        style={styles.homeBtn}
      >
        <Text style={[styles.homeBtnText, { color: colors.textMuted }]}>Về trang chủ</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 40,
    maxWidth: 600,
    width: '100%',
    alignSelf: 'center',
  },
  scoreCard: {
    borderWidth: 1,
    borderRadius: 28,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
    marginBottom: 20,
  },
  trophyCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  examTitle: {
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 8,
  },
  scoreValue: {
    fontSize: 48,
    fontWeight: '900',
    letterSpacing: -1,
  },
  scoreMax: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 20,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
    paddingVertical: 14,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#f1f5f9',
    marginBottom: 16,
  },
  statCol: {
    alignItems: 'center',
    flex: 1,
  },
  statNum: {
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 12,
  },
  divider: {
    width: 1,
    height: 30,
  },
  timeSpentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  timeSpentText: {
    fontSize: 13,
  },
  actionRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  retryBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    borderWidth: 1,
    paddingVertical: 13,
    borderRadius: 16,
  },
  retryText: {
    fontSize: 14,
    fontWeight: '700',
  },
  reviewBtn: {
    flex: 1.2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 13,
    borderRadius: 16,
  },
  reviewText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '700',
  },
  homeBtn: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  homeBtnText: {
    fontSize: 14,
    fontWeight: '600',
  },
});
