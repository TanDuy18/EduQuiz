import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { mockExams } from '../../data/mockExams';
import { mockMath50Questions } from '../../data/mockQuestions';
import { useTheme } from '../../context/ThemeContext';

interface ExamReviewPageProps {
  examId?: string;
  userAnswers?: Record<number, string>;
  onBack?: () => void;
}

export default function ExamReviewPage({
  examId,
  userAnswers = { 1: 'B', 2: 'A', 3: 'A', 4: 'B', 5: 'A' },
  onBack,
}: ExamReviewPageProps) {
  const { colors, isDark } = useTheme();
  const exam = useMemo(() => {
    return mockExams.find((e) => e.id === examId) || mockExams[0];
  }, [examId]);

  const questions = mockMath50Questions;
  const [filterMode, setFilterMode] = useState<'all' | 'wrong' | 'correct'>('all');

  const filteredQuestions = useMemo(() => {
    return questions.filter((q) => {
      const userAns = userAnswers[q.questionNumber];
      const isCorrect = userAns === q.correctAnswerId;
      if (filterMode === 'correct') return isCorrect;
      if (filterMode === 'wrong') return !isCorrect;
      return true;
    });
  }, [questions, userAnswers, filterMode]);

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.bgSubtle }]}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      {/* HEADER */}
      <View style={styles.topHeader}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={onBack}
          style={[styles.backBtn, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}
        >
          <Feather name="arrow-left" size={16} color={colors.text} />
          <Text style={[styles.backBtnText, { color: colors.text }]}>Quay lại</Text>
        </TouchableOpacity>

        <Text style={[styles.headerTitle, { color: colors.text }]}>Giải chi tiết đề thi</Text>
      </View>

      {/* FILTER TABS */}
      <View style={styles.filterRow}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setFilterMode('all')}
          style={[
            styles.filterBtn,
            {
              backgroundColor: filterMode === 'all' ? colors.primary : colors.card,
              borderColor: filterMode === 'all' ? colors.primary : colors.cardBorder,
            },
          ]}
        >
          <Text
            style={[
              styles.filterText,
              { color: filterMode === 'all' ? '#ffffff' : colors.textMuted },
              filterMode === 'all' && styles.filterTextActive,
            ]}
          >
            Tất cả ({questions.length})
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setFilterMode('wrong')}
          style={[
            styles.filterBtn,
            {
              backgroundColor: filterMode === 'wrong' ? colors.primary : colors.card,
              borderColor: filterMode === 'wrong' ? colors.primary : colors.cardBorder,
            },
          ]}
        >
          <Text
            style={[
              styles.filterText,
              { color: filterMode === 'wrong' ? '#ffffff' : colors.textMuted },
              filterMode === 'wrong' && styles.filterTextActive,
            ]}
          >
            Câu làm sai
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setFilterMode('correct')}
          style={[
            styles.filterBtn,
            {
              backgroundColor: filterMode === 'correct' ? colors.primary : colors.card,
              borderColor: filterMode === 'correct' ? colors.primary : colors.cardBorder,
            },
          ]}
        >
          <Text
            style={[
              styles.filterText,
              { color: filterMode === 'correct' ? '#ffffff' : colors.textMuted },
              filterMode === 'correct' && styles.filterTextActive,
            ]}
          >
            Câu làm đúng
          </Text>
        </TouchableOpacity>
      </View>

      {/* QUESTION REVIEW LIST */}
      <View style={styles.questionsList}>
        {filteredQuestions.map((q) => {
          const userAns = userAnswers[q.questionNumber];
          const isCorrect = userAns === q.correctAnswerId;

          return (
            <View
              key={q.id}
              style={[
                styles.reviewCard,
                {
                  backgroundColor: colors.card,
                  borderColor: colors.cardBorder,
                },
              ]}
            >
              <View style={styles.cardTop}>
                <View style={[styles.topicBadge, { backgroundColor: colors.primaryLight }]}>
                  <Text style={[styles.topicText, { color: colors.primary }]}>{q.topic}</Text>
                </View>
                <View
                  style={[
                    styles.statusBadge,
                    {
                      backgroundColor: isCorrect
                        ? isDark ? 'rgba(22,163,74,0.2)' : '#dcfce7'
                        : isDark ? 'rgba(220,38,38,0.2)' : '#fee2e2',
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.statusText,
                      { color: isCorrect ? colors.success : colors.danger },
                    ]}
                  >
                    {isCorrect ? 'Làm đúng' : 'Làm sai'}
                  </Text>
                </View>
              </View>

              <Text style={[styles.promptText, { color: colors.text }]}>
                <Text style={[styles.qNum, { color: colors.primary }]}>Câu {q.questionNumber}: </Text>
                {q.prompt}
              </Text>

              {q.mathFormula ? (
                <View
                  style={[
                    styles.formulaBox,
                    {
                      backgroundColor: isDark ? '#0f172a' : '#f8fafc',
                      borderColor: colors.cardBorder,
                    },
                  ]}
                >
                  <Text style={[styles.formulaText, { color: colors.primary }]}>{q.mathFormula}</Text>
                </View>
              ) : null}

              <View style={styles.optionsCol}>
                {q.options.map((opt) => {
                  const isCorrectOpt = opt.id === q.correctAnswerId;
                  const isUserOpt = opt.id === userAns;

                  return (
                    <View
                      key={opt.id}
                      style={[
                        styles.optRow,
                        { borderColor: colors.cardBorder },
                        isCorrectOpt && {
                          borderColor: colors.success,
                          backgroundColor: isDark ? 'rgba(22,163,74,0.15)' : '#f0fdf4',
                        },
                        isUserOpt && !isCorrectOpt && {
                          borderColor: colors.danger,
                          backgroundColor: isDark ? 'rgba(220,38,38,0.15)' : '#fef2f2',
                        },
                      ]}
                    >
                      <View
                        style={[
                          styles.optIdBox,
                          { backgroundColor: colors.chipBg },
                          isCorrectOpt && { backgroundColor: colors.success },
                          isUserOpt && !isCorrectOpt && { backgroundColor: colors.danger },
                        ]}
                      >
                        <Text
                          style={[
                            styles.optIdText,
                            { color: colors.textSecondary },
                            (isCorrectOpt || (isUserOpt && !isCorrectOpt)) && styles.textWhite,
                          ]}
                        >
                          {opt.id}
                        </Text>
                      </View>
                      <Text style={[styles.optContentText, { color: colors.text }]}>{opt.content}</Text>
                    </View>
                  );
                })}
              </View>

              {q.explanation ? (
                <View
                  style={[
                    styles.solutionBox,
                    {
                      backgroundColor: isDark ? '#0f172a' : '#f8fafc',
                      borderColor: colors.cardBorder,
                    },
                  ]}
                >
                  <Text style={[styles.solutionTitle, { color: colors.success }]}>Lời giải chi tiết:</Text>
                  <Text style={[styles.solutionDesc, { color: colors.textSecondary }]}>{q.explanation}</Text>
                </View>
              ) : null}
            </View>
          );
        })}
      </View>
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
    maxWidth: 700,
    width: '100%',
    alignSelf: 'center',
  },
  topHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
  },
  backBtnText: {
    fontSize: 12,
    fontWeight: '700',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '800',
  },
  filterRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  filterBtn: {
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 12,
  },
  filterText: {
    fontSize: 12,
    fontWeight: '600',
  },
  filterTextActive: {
    fontWeight: '700',
  },
  questionsList: {
    gap: 14,
  },
  reviewCard: {
    borderWidth: 1,
    borderRadius: 20,
    padding: 18,
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  topicBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  topicText: {
    fontSize: 11,
    fontWeight: '700',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '700',
  },
  promptText: {
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 20,
    marginBottom: 10,
  },
  qNum: {},
  formulaBox: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  formulaText: {
    fontSize: 14,
    fontWeight: '700',
  },
  optionsCol: {
    gap: 8,
    marginBottom: 12,
  },
  optRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 12,
    borderWidth: 1,
    gap: 10,
  },
  optIdBox: {
    width: 26,
    height: 26,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optIdText: {
    fontSize: 12,
    fontWeight: '800',
  },
  textWhite: {
    color: '#ffffff',
  },
  optContentText: {
    flex: 1,
    fontSize: 13,
  },
  solutionBox: {
    borderWidth: 1,
    borderRadius: 14,
    padding: 12,
  },
  solutionTitle: {
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 4,
  },
  solutionDesc: {
    fontSize: 12,
    lineHeight: 18,
  },
});
