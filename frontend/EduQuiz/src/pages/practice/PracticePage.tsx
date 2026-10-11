import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { mockFlashcards, mockTopics, mockWrongQuestions } from '../../data/mockFlashcards';
import { useTheme } from '../../context/ThemeContext';

interface PracticePageProps {
  onNavigate?: (route: string) => void;
}

export default function PracticePage({ onNavigate }: PracticePageProps) {
  const { colors, isDark } = useTheme();
  const [activeTab, setActiveTab] = useState<'topics' | 'flashcards' | 'wrong'>('topics');
  const [currentFcIndex, setCurrentFcIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const currentCard = mockFlashcards[currentFcIndex];

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.bgSubtle }]}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Luyện tập & Tự học</Text>
        <Text style={[styles.subtitle, { color: colors.textMuted }]}>
          Củng cố kiến thức theo chuyên đề, ghi nhớ công thức bằng Flashcard và khắc phục điểm yếu.
        </Text>
      </View>

      {/* TABS */}
      <View style={styles.tabsRow}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setActiveTab('topics')}
          style={[
            styles.tabBtn,
            {
              backgroundColor: activeTab === 'topics' ? colors.primary : colors.card,
              borderColor: activeTab === 'topics' ? colors.primary : colors.cardBorder,
            },
          ]}
        >
          <Feather
            name="book-open"
            size={14}
            color={activeTab === 'topics' ? '#ffffff' : colors.textMuted}
          />
          <Text
            style={[
              styles.tabText,
              { color: activeTab === 'topics' ? '#ffffff' : colors.textMuted },
              activeTab === 'topics' && styles.tabTextActive,
            ]}
          >
            Chuyên đề
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setActiveTab('flashcards')}
          style={[
            styles.tabBtn,
            {
              backgroundColor: activeTab === 'flashcards' ? colors.primary : colors.card,
              borderColor: activeTab === 'flashcards' ? colors.primary : colors.cardBorder,
            },
          ]}
        >
          <Feather
            name="layers"
            size={14}
            color={activeTab === 'flashcards' ? '#ffffff' : colors.textMuted}
          />
          <Text
            style={[
              styles.tabText,
              { color: activeTab === 'flashcards' ? '#ffffff' : colors.textMuted },
              activeTab === 'flashcards' && styles.tabTextActive,
            ]}
          >
            Flashcard ({mockFlashcards.length})
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setActiveTab('wrong')}
          style={[
            styles.tabBtn,
            {
              backgroundColor: activeTab === 'wrong' ? colors.primary : colors.card,
              borderColor: activeTab === 'wrong' ? colors.primary : colors.cardBorder,
            },
          ]}
        >
          <Feather
            name="alert-circle"
            size={14}
            color={activeTab === 'wrong' ? '#ffffff' : colors.textMuted}
          />
          <Text
            style={[
              styles.tabText,
              { color: activeTab === 'wrong' ? '#ffffff' : colors.textMuted },
              activeTab === 'wrong' && styles.tabTextActive,
            ]}
          >
            Câu sai ({mockWrongQuestions.length})
          </Text>
        </TouchableOpacity>
      </View>

      {/* TAB 1: CHUYÊN ĐỀ */}
      {activeTab === 'topics' && (
        <View style={styles.sectionList}>
          {mockTopics.map((topic) => (
            <View
              key={topic.id}
              style={[
                styles.card,
                {
                  backgroundColor: colors.card,
                  borderColor: colors.cardBorder,
                },
              ]}
            >
              <View style={[styles.topicBadge, { backgroundColor: colors.primaryLight }]}>
                <Text style={[styles.topicBadgeText, { color: colors.primary }]}>
                  {topic.subjectId === 'math' ? 'Toán học' : 'Vật lý'}
                </Text>
              </View>
              <Text style={[styles.topicName, { color: colors.text }]}>{topic.name}</Text>
              <Text style={[styles.topicCount, { color: colors.textMuted }]}>{topic.count} câu hỏi trọng tâm</Text>

              <View style={styles.progressContainer}>
                <View style={styles.progressTextRow}>
                  <Text style={[styles.progressLabel, { color: colors.textMuted }]}>Tiến độ</Text>
                  <Text style={[styles.progressPercent, { color: colors.primary }]}>{topic.progress}%</Text>
                </View>
                <View style={[styles.progressBar, { backgroundColor: isDark ? '#334155' : '#f1f5f9' }]}>
                  <View style={[styles.progressFill, { width: `${topic.progress}%`, backgroundColor: colors.primary }]} />
                </View>
              </View>

              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => onNavigate?.('/exam')}
                style={[styles.actionBtn, { backgroundColor: colors.primaryLight }]}
              >
                <Text style={[styles.actionBtnText, { color: colors.primary }]}>Luyện tập chuyên đề này</Text>
                <Feather name="arrow-right" size={14} color={colors.primary} />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}

      {/* TAB 2: FLASHCARD */}
      {activeTab === 'flashcards' && currentCard && (
        <View style={styles.flashcardSection}>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => setIsFlipped((prev) => !prev)}
            style={[
              styles.flashcard,
              {
                backgroundColor: colors.card,
                borderColor: colors.primary,
              },
            ]}
          >
            <View style={styles.fcHeader}>
              <Text style={[styles.fcSubject, { color: colors.primary }]}>
                {currentCard.subjectId === 'math' ? 'Toán 12' : 'Vật Lý 12'}
              </Text>
              <Text style={[styles.fcHint, { color: colors.textMuted }]}>Chạm để lật thẻ ↻</Text>
            </View>

            <Text style={[styles.fcTitle, { color: colors.text }]}>
              {isFlipped ? 'Công thức & Ghi nhớ:' : currentCard.frontTitle}
            </Text>

            <View
              style={[
                styles.fcContentBox,
                {
                  backgroundColor: isDark ? '#0f172a' : '#f8fafc',
                  borderColor: colors.cardBorder,
                },
              ]}
            >
              <Text style={[styles.fcContentText, { color: colors.primary }]}>
                {isFlipped ? currentCard.backExplanation : (currentCard.frontFormula || currentCard.frontDescription)}
              </Text>
            </View>

            {isFlipped && currentCard.backExample ? (
              <Text style={[styles.fcExplanation, { color: colors.textMuted }]}>{currentCard.backExample}</Text>
            ) : null}
          </TouchableOpacity>

          <View style={styles.fcControls}>
            <TouchableOpacity
              disabled={currentFcIndex === 0}
              onPress={() => {
                setIsFlipped(false);
                setCurrentFcIndex((i) => Math.max(0, i - 1));
              }}
              style={[
                styles.fcNavBtn,
                {
                  backgroundColor: colors.card,
                  borderColor: colors.cardBorder,
                },
                currentFcIndex === 0 && styles.btnDisabled,
              ]}
            >
              <Feather name="chevron-left" size={18} color={colors.text} />
              <Text style={[styles.fcNavText, { color: colors.text }]}>Thẻ trước</Text>
            </TouchableOpacity>

            <Text style={[styles.fcCounter, { color: colors.textMuted }]}>
              {currentFcIndex + 1} / {mockFlashcards.length}
            </Text>

            <TouchableOpacity
              disabled={currentFcIndex === mockFlashcards.length - 1}
              onPress={() => {
                setIsFlipped(false);
                setCurrentFcIndex((i) => Math.min(mockFlashcards.length - 1, i + 1));
              }}
              style={[
                styles.fcNavBtn,
                {
                  backgroundColor: colors.card,
                  borderColor: colors.cardBorder,
                },
                currentFcIndex === mockFlashcards.length - 1 && styles.btnDisabled,
              ]}
            >
              <Text style={[styles.fcNavText, { color: colors.text }]}>Thẻ sau</Text>
              <Feather name="chevron-right" size={18} color={colors.text} />
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* TAB 3: CÂU LÀM SAI */}
      {activeTab === 'wrong' && (
        <View style={styles.sectionList}>
          {mockWrongQuestions.map((q) => (
            <View
              key={q.questionNumber}
              style={[
                styles.wrongCard,
                {
                  backgroundColor: colors.card,
                  borderColor: isDark ? 'rgba(239,68,68,0.3)' : '#fecaca',
                },
              ]}
            >
              <View style={styles.cardHeader}>
                <View style={[styles.wrongBadge, { backgroundColor: isDark ? 'rgba(239,68,68,0.2)' : '#fee2e2' }]}>
                  <Text style={[styles.wrongBadgeText, { color: colors.danger }]}>{q.topic}</Text>
                </View>
                <Text style={[styles.wrongDiff, { color: colors.textMuted }]}>Làm sai gần đây</Text>
              </View>

              <Text style={[styles.wrongPrompt, { color: colors.text }]}>{q.prompt}</Text>

              <View style={[styles.answerRow, { borderTopColor: colors.cardBorder }]}>
                <Text style={[styles.yourAns, { color: colors.textMuted }]}>
                  Bạn chọn: <Text style={styles.boldRed}>{q.userAnswer}</Text>
                </Text>
                <Text style={[styles.correctAns, { color: colors.textMuted }]}>
                  Đáp án đúng: <Text style={styles.boldGreen}>{q.correctAnswer}</Text>
                </Text>
              </View>

              <Text style={[styles.solutionText, { color: colors.textSecondary }]}>
                Giải thích: {q.explanation}
              </Text>
            </View>
          ))}
        </View>
      )}
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
  },
  header: {
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 13,
    lineHeight: 18,
  },
  tabsRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 18,
  },
  tabBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 14,
  },
  tabText: {
    fontSize: 12,
    fontWeight: '700',
  },
  tabTextActive: {
    fontWeight: '800',
  },
  sectionList: {
    gap: 12,
  },
  card: {
    borderWidth: 1,
    borderRadius: 20,
    padding: 18,
  },
  topicBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  topicBadgeText: {
    fontSize: 11,
    fontWeight: '700',
  },
  topicName: {
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 4,
  },
  topicCount: {
    fontSize: 12,
    marginBottom: 12,
  },
  progressContainer: {
    marginBottom: 14,
  },
  progressTextRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  progressLabel: {
    fontSize: 12,
  },
  progressPercent: {
    fontSize: 12,
    fontWeight: '700',
  },
  progressBar: {
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 10,
    borderRadius: 12,
  },
  actionBtnText: {
    fontSize: 13,
    fontWeight: '700',
  },
  flashcardSection: {
    alignItems: 'center',
  },
  flashcard: {
    width: '100%',
    maxWidth: 500,
    borderWidth: 1.5,
    borderRadius: 24,
    padding: 24,
    minHeight: 260,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  fcHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  fcSubject: {
    fontSize: 12,
    fontWeight: '700',
  },
  fcHint: {
    fontSize: 11,
    fontStyle: 'italic',
  },
  fcTitle: {
    fontSize: 18,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 16,
  },
  fcContentBox: {
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: 'center',
    marginBottom: 12,
  },
  fcContentText: {
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
  },
  fcExplanation: {
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 18,
  },
  fcControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: 500,
    marginTop: 20,
  },
  fcNavBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 14,
  },
  btnDisabled: {
    opacity: 0.4,
  },
  fcNavText: {
    fontSize: 13,
    fontWeight: '600',
  },
  fcCounter: {
    fontSize: 13,
    fontWeight: '700',
  },
  wrongCard: {
    borderWidth: 1,
    borderRadius: 20,
    padding: 18,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  wrongBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  wrongBadgeText: {
    fontSize: 11,
    fontWeight: '700',
  },
  wrongDiff: {
    fontSize: 11,
  },
  wrongPrompt: {
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 20,
    marginBottom: 8,
  },
  answerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderTopWidth: 1,
    marginBottom: 8,
  },
  yourAns: {
    fontSize: 12,
  },
  boldRed: {
    color: '#dc2626',
    fontWeight: '700',
  },
  correctAns: {
    fontSize: 12,
  },
  boldGreen: {
    color: '#16a34a',
    fontWeight: '700',
  },
  solutionText: {
    fontSize: 12,
    lineHeight: 18,
  },
});
