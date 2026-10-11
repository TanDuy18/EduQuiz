import React, { useState, useEffect, useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
  StyleSheet,
  Alert,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { mockExams } from '../../data/mockExams';
import { mockMath50Questions } from '../../data/mockQuestions';
import { useTheme } from '../../context/ThemeContext';

interface QuizPageProps {
  examId?: string;
  onExit?: () => void;
  onSubmit?: (result: any) => void;
}

export default function QuizPage({ examId, onExit, onSubmit }: QuizPageProps) {
  const insets = useSafeAreaInsets();
  const { colors, isDark } = useTheme();
  const exam = useMemo(() => {
    return mockExams.find((e) => e.id === examId) || mockExams[0];
  }, [examId]);

  const questions = mockMath50Questions;
  const totalQuestions = questions.length;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [flagged, setFlagged] = useState<Record<number, boolean>>({});
  const [timeLeft, setTimeLeft] = useState((exam?.durationMinutes || 90) * 60);

  const [showMatrix, setShowMatrix] = useState(false);
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  // Timer countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitQuiz();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const currentQ = questions[currentIndex];
  const currentQNum = currentQ?.questionNumber || currentIndex + 1;

  const formattedTime = useMemo(() => {
    const mins = Math.floor(timeLeft / 60);
    const secs = timeLeft % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }, [timeLeft]);

  const answeredCount = Object.keys(answers).length;
  const unansweredCount = totalQuestions - answeredCount;

  const handleSelectOption = (optionId: string) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQNum]: optionId,
    }));
  };

  const handleToggleFlag = () => {
    setFlagged((prev) => ({
      ...prev,
      [currentQNum]: !prev[currentQNum],
    }));
  };

  const handleSubmitQuiz = () => {
    let correctCount = 0;
    questions.forEach((q) => {
      if (answers[q.questionNumber] === q.correctAnswerId) {
        correctCount++;
      }
    });

    const score = Number(((correctCount / totalQuestions) * 10).toFixed(1));
    const resultData = {
      examId: exam.id,
      score,
      correctCount,
      wrongCount: totalQuestions - correctCount - unansweredCount,
      unansweredCount,
      totalQuestions,
      timeSpentSeconds: (exam.durationMinutes * 60) - timeLeft,
      answers,
    };

    onSubmit?.(resultData);
  };

  return (
    <View style={[styles.container, { paddingTop: Math.max(12, insets.top), backgroundColor: colors.bgSubtle }]}>
      {/* HEADER BAR */}
      <View style={[styles.topHeader, { backgroundColor: colors.headerBg, borderBottomColor: colors.headerBorder }]}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={onExit}
          style={[styles.headerBtn, { backgroundColor: colors.chipBg }]}
        >
          <Feather name="arrow-left" size={20} color={colors.text} />
        </TouchableOpacity>

        {/* TIMER */}
        <View style={[styles.timerBox, { backgroundColor: colors.primaryLight }, timeLeft < 300 && styles.timerWarning]}>
          <Feather name="clock" size={14} color={timeLeft < 300 ? '#e11d48' : colors.primary} />
          <Text style={[styles.timerText, { color: colors.primary }, timeLeft < 300 && styles.timerTextWarning]}>
            {formattedTime}
          </Text>
        </View>

        <View style={styles.headerRight}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={handleToggleFlag}
            style={[styles.flagBtn, { backgroundColor: colors.chipBg }, flagged[currentQNum] && styles.flagBtnActive]}
          >
            <Feather
              name="flag"
              size={16}
              color={flagged[currentQNum] ? '#d97706' : colors.textMuted}
            />
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setShowMatrix(true)}
            style={[styles.matrixBtn, { backgroundColor: colors.primaryLight }]}
          >
            <Feather name="grid" size={16} color={colors.primary} />
          </TouchableOpacity>
        </View>
      </View>

      {/* QUESTION CONTENT */}
      <ScrollView
        style={styles.quizScroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.questionCard, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
          <View style={[styles.questionMetaRow, { borderColor: colors.cardBorder }]}>
            <View style={[styles.topicBadge, { backgroundColor: colors.primaryLight }]}>
              <Text style={[styles.topicText, { color: colors.primary }]}>{currentQ.topic || 'Kiến thức chung'}</Text>
            </View>
            <Text style={[styles.diffText, { color: colors.textMuted }]}>
              {currentQ.difficulty === 'hard' ? 'Vận dụng cao' : currentQ.difficulty === 'medium' ? 'Thông hiểu' : 'Nhận biết'}
            </Text>
          </View>

          <Text style={[styles.questionPrompt, { color: colors.text }]}>
            <Text style={[styles.qNumText, { color: colors.primary }]}>Câu {currentQ.questionNumber}: </Text>
            {currentQ.prompt}
          </Text>

          {currentQ.mathFormula ? (
            <View style={[styles.mathBox, { backgroundColor: isDark ? '#0f172a' : '#f8fafc', borderColor: colors.cardBorder }]}>
              <Text style={[styles.mathText, { color: colors.primary }]}>{currentQ.mathFormula}</Text>
            </View>
          ) : null}

          {/* 4 OPTIONS */}
          <View style={styles.optionsList}>
            {currentQ.options.map((opt) => {
              const isSelected = answers[currentQNum] === opt.id;
              return (
                <TouchableOpacity
                  key={opt.id}
                  activeOpacity={0.7}
                  onPress={() => handleSelectOption(opt.id)}
                  style={[
                    styles.optionCard,
                    {
                      backgroundColor: isSelected ? colors.primaryLight : colors.card,
                      borderColor: isSelected ? colors.primary : colors.cardBorder,
                    },
                  ]}
                >
                  <View
                    style={[
                      styles.optLetterBox,
                      { backgroundColor: isSelected ? colors.primary : colors.chipBg },
                    ]}
                  >
                    <Text
                      style={[
                        styles.optLetter,
                        { color: isSelected ? '#ffffff' : colors.textSecondary },
                      ]}
                    >
                      {opt.id}
                    </Text>
                  </View>
                  <Text
                    style={[
                      styles.optContent,
                      { color: isSelected ? colors.primary : colors.text },
                    ]}
                  >
                    {opt.content}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </ScrollView>

      {/* STICKY BOTTOM CONTROL BAR */}
      <View style={[styles.bottomControlBar, { paddingBottom: Math.max(12, insets.bottom), backgroundColor: colors.navBg, borderTopColor: colors.navBorder }]}>
        <TouchableOpacity
          disabled={currentIndex === 0}
          onPress={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
          style={[styles.navBtn, { backgroundColor: colors.chipBg }, currentIndex === 0 && styles.btnDisabled]}
        >
          <Feather name="chevron-left" size={18} color={colors.text} />
          <Text style={[styles.navBtnText, { color: colors.text }]}>Trước</Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setShowMatrix(true)}
          style={styles.counterCenter}
        >
          <Text style={[styles.counterText, { color: colors.textMuted }]}>
            Câu <Text style={[styles.boldText, { color: colors.text }]}>{currentIndex + 1}</Text> / {totalQuestions}
          </Text>
          <Text style={[styles.counterSub, { color: colors.textMuted }]}>Đã làm {answeredCount}/{totalQuestions}</Text>
        </TouchableOpacity>

        {currentIndex === totalQuestions - 1 ? (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setShowSubmitModal(true)}
            style={styles.submitBtn}
          >
            <Text style={styles.submitBtnText}>Nộp bài</Text>
            <Feather name="send" size={14} color="#ffffff" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setCurrentIndex((prev) => Math.min(totalQuestions - 1, prev + 1))}
            style={[styles.nextBtn, { backgroundColor: colors.primary }]}
          >
            <Text style={styles.nextBtnText}>Tiếp</Text>
            <Feather name="chevron-right" size={18} color="#ffffff" />
          </TouchableOpacity>
        )}
      </View>

      {/* MATRIX MODAL */}
      <Modal visible={showMatrix} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={[styles.matrixModalCard, { backgroundColor: colors.card }]}>
            <View style={styles.matrixHeader}>
              <Text style={[styles.matrixTitle, { color: colors.text }]}>Ma trận {totalQuestions} câu hỏi</Text>
              <TouchableOpacity onPress={() => setShowMatrix(false)}>
                <Feather name="x" size={22} color={colors.textMuted} />
              </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.matrixGrid}>
              {questions.map((q, idx) => {
                const isCurrent = idx === currentIndex;
                const isAnswered = !!answers[q.questionNumber];
                const isFlag = !!flagged[q.questionNumber];

                return (
                  <TouchableOpacity
                    key={q.questionNumber}
                    activeOpacity={0.7}
                    onPress={() => {
                      setCurrentIndex(idx);
                      setShowMatrix(false);
                    }}
                    style={[
                      styles.matrixItem,
                      { backgroundColor: colors.chipBg },
                      isAnswered && styles.matrixAnswered,
                      isFlag && styles.matrixFlagged,
                      isCurrent && styles.matrixCurrent,
                    ]}
                  >
                    <Text
                      style={[
                        styles.matrixItemText,
                        { color: colors.textSecondary },
                        (isAnswered || isCurrent) && styles.matrixTextWhite,
                        isFlag && !isAnswered && styles.matrixFlagText,
                      ]}
                    >
                      {q.questionNumber}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* SUBMIT CONFIRMATION MODAL */}
      <Modal visible={showSubmitModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={[styles.confirmModalCard, { backgroundColor: colors.card }]}>
            <Text style={[styles.confirmTitle, { color: colors.text }]}>Xác nhận nộp bài thi?</Text>
            <Text style={[styles.confirmDesc, { color: colors.textMuted }]}>
              Bạn đã trả lời {answeredCount}/{totalQuestions} câu. Còn {unansweredCount} câu chưa chọn đáp án.
            </Text>

            <View style={styles.confirmActions}>
              <TouchableOpacity
                onPress={() => setShowSubmitModal(false)}
                style={[styles.cancelBtn, { backgroundColor: colors.chipBg }]}
              >
                <Text style={[styles.cancelText, { color: colors.textMuted }]}>Làm tiếp</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  setShowSubmitModal(false);
                  handleSubmitQuiz();
                }}
                style={[styles.confirmBtn, { backgroundColor: colors.primary }]}
              >
                <Text style={styles.confirmText}>Nộp ngay</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  topHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  headerBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f1f5f9',
  },
  timerBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#eff6ff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 14,
  },
  timerWarning: {
    backgroundColor: '#ffe4e6',
  },
  timerText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#2563eb',
  },
  timerTextWarning: {
    color: '#e11d48',
  },
  headerRight: {
    flexDirection: 'row',
    gap: 8,
  },
  flagBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f1f5f9',
  },
  flagBtnActive: {
    backgroundColor: '#fef3c7',
  },
  matrixBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#eff6ff',
  },
  quizScroll: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 24,
    maxWidth: 700,
    width: '100%',
    alignSelf: 'center',
  },
  questionCard: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 24,
    padding: 20,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  questionMetaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderColor: '#f1f5f9',
  },
  topicBadge: {
    backgroundColor: '#eff6ff',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  topicText: {
    color: '#2563eb',
    fontSize: 11,
    fontWeight: '700',
  },
  diffText: {
    fontSize: 11,
    color: '#64748b',
    fontWeight: '500',
  },
  questionPrompt: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0f172a',
    lineHeight: 22,
    marginBottom: 14,
  },
  qNumText: {
    color: '#2563eb',
    fontWeight: '800',
  },
  mathBox: {
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 14,
    padding: 12,
    alignItems: 'center',
    marginVertical: 10,
  },
  mathText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1e40af',
  },
  optionsList: {
    gap: 10,
    marginTop: 8,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderWidth: 1.5,
    borderColor: '#e2e8f0',
    borderRadius: 16,
    padding: 14,
    gap: 12,
  },
  optionCardSelected: {
    borderColor: '#2563eb',
    backgroundColor: '#eff6ff',
  },
  optLetterBox: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: '#f1f5f9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  optLetterSelected: {
    backgroundColor: '#2563eb',
  },
  optLetter: {
    fontSize: 13,
    fontWeight: '800',
    color: '#475569',
  },
  optLetterTextSelected: {
    color: '#ffffff',
  },
  optContent: {
    flex: 1,
    fontSize: 14,
    color: '#1e293b',
    lineHeight: 20,
  },
  optContentSelected: {
    color: '#1e40af',
    fontWeight: '700',
  },
  bottomControlBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 12,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 4,
  },
  navBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 14,
  },
  navBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1e293b',
  },
  btnDisabled: {
    opacity: 0.35,
  },
  counterCenter: {
    alignItems: 'center',
  },
  counterText: {
    fontSize: 13,
    color: '#64748b',
  },
  boldText: {
    fontWeight: '800',
    color: '#0f172a',
  },
  counterSub: {
    fontSize: 10,
    color: '#94a3b8',
    marginTop: 1,
  },
  nextBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#2563eb',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 14,
  },
  nextBtnText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '800',
  },
  submitBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#059669',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 14,
  },
  submitBtnText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '800',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  matrixModalCard: {
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: 20,
    maxHeight: '80%',
    width: '100%',
    maxWidth: 480,
  },
  matrixHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  matrixTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0f172a',
  },
  matrixGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    justifyContent: 'center',
  },
  matrixItem: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#f1f5f9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  matrixAnswered: {
    backgroundColor: '#2563eb',
  },
  matrixFlagged: {
    backgroundColor: '#fef3c7',
    borderWidth: 1.5,
    borderColor: '#f59e0b',
  },
  matrixCurrent: {
    borderWidth: 2,
    borderColor: '#0f172a',
  },
  matrixItemText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#475569',
  },
  matrixTextWhite: {
    color: '#ffffff',
  },
  matrixFlagText: {
    color: '#d97706',
  },
  confirmModalCard: {
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: 24,
    width: '100%',
    maxWidth: 400,
  },
  confirmTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0f172a',
    marginBottom: 8,
  },
  confirmDesc: {
    fontSize: 13,
    color: '#64748b',
    lineHeight: 19,
    marginBottom: 20,
  },
  confirmActions: {
    flexDirection: 'row',
    gap: 10,
  },
  cancelBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 14,
    backgroundColor: '#f1f5f9',
    alignItems: 'center',
  },
  cancelText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#475569',
  },
  confirmBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 14,
    backgroundColor: '#2563eb',
    alignItems: 'center',
  },
  confirmText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#ffffff',
  },
});
