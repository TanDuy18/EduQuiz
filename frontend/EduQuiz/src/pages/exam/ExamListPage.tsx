import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { mockExams } from '../../data/mockExams';
import { useTheme } from '../../context/ThemeContext';

interface ExamListPageProps {
  onSelectExam?: (examId: string) => void;
}

const SUBJECT_TABS = [
  { id: 'all', label: 'Tất cả môn' },
  { id: 'math', label: 'Toán học' },
  { id: 'physics', label: 'Vật lý' },
  { id: 'chemistry', label: 'Hóa học' },
  { id: 'biology', label: 'Sinh học' },
  { id: 'english', label: 'Tiếng Anh' },
];

export default function ExamListPage({ onSelectExam }: ExamListPageProps) {
  const { colors, isDark } = useTheme();
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredExams = useMemo(() => {
    return mockExams.filter((exam) => {
      const matchSubject = selectedSubject === 'all' || exam.subjectId === selectedSubject;
      const matchSearch =
        exam.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exam.gradeLabel.toLowerCase().includes(searchQuery.toLowerCase());
      return matchSubject && matchSearch;
    });
  }, [selectedSubject, searchQuery]);

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.bgSubtle }]}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      {/* HEADER BANNER */}
      <View style={[styles.banner, { backgroundColor: colors.primary }]}>
        <View style={styles.bannerTag}>
          <Feather name="book-open" size={13} color="#ffffff" />
          <Text style={styles.bannerTagText}>Kho đề thi chất lượng cao</Text>
        </View>
        <Text style={styles.bannerTitle}>Luyện thi trắc nghiệm chuẩn cấu trúc</Text>
        <Text style={styles.bannerSubtitle}>
          Hàng trăm đề thi THPT Quốc Gia, Đánh giá năng lực với lời giải chi tiết và ma trận kiến thức chuẩn.
        </Text>
      </View>

      {/* SEARCH INPUT */}
      <View
        style={[
          styles.searchBox,
          {
            backgroundColor: colors.card,
            borderColor: colors.cardBorder,
          },
        ]}
      >
        <Feather name="search" size={18} color={colors.textMuted} />
        <TextInput
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Tìm kiếm đề thi..."
          placeholderTextColor={colors.textMuted}
          style={[styles.searchInput, { color: colors.text }]}
        />
      </View>

      {/* SUBJECT FILTER TABS */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tabsRow}
        style={styles.tabsScrollView}
      >
        {SUBJECT_TABS.map((tab) => {
          const isActive = selectedSubject === tab.id;
          return (
            <TouchableOpacity
              key={tab.id}
              activeOpacity={0.7}
              onPress={() => setSelectedSubject(tab.id)}
              style={[
                styles.tabBtn,
                {
                  backgroundColor: isActive ? colors.primary : colors.card,
                  borderColor: isActive ? colors.primary : colors.cardBorder,
                },
              ]}
            >
              <Text
                style={[
                  styles.tabText,
                  { color: isActive ? '#ffffff' : colors.textSecondary },
                  isActive && styles.tabTextActive,
                ]}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* EXAM LIST CARDS */}
      <View style={styles.list}>
        {filteredExams.map((exam) => (
          <View
            key={exam.id}
            style={[
              styles.examCard,
              {
                backgroundColor: colors.card,
                borderColor: colors.cardBorder,
              },
            ]}
          >
            <View style={styles.cardHeader}>
              <View style={[styles.gradeBadge, { backgroundColor: colors.primaryLight }]}>
                <Text style={[styles.gradeText, { color: colors.primary }]}>{exam.gradeLabel}</Text>
              </View>
              <View style={styles.metaRight}>
                <Feather name="clock" size={12} color={colors.textMuted} />
                <Text style={[styles.metaText, { color: colors.textMuted }]}>{exam.durationMinutes} phút</Text>
                <Text style={[styles.metaDot, { color: colors.cardBorder }]}>•</Text>
                <Feather name="help-circle" size={12} color={colors.textMuted} />
                <Text style={[styles.metaText, { color: colors.textMuted }]}>{exam.questionCount} câu</Text>
              </View>
            </View>

            <Text style={[styles.examTitle, { color: colors.text }]}>{exam.title}</Text>
            <Text style={[styles.examDesc, { color: colors.textMuted }]}>
              Độ khó: {exam.difficulty} • Đánh giá: {exam.rating} ★
            </Text>

            <View style={[styles.cardFooter, { borderTopColor: colors.cardBorder }]}>
              <View style={styles.participantsBox}>
                <Feather name="users" size={13} color={colors.textMuted} />
                <Text style={[styles.participantsText, { color: colors.textMuted }]}>
                  {exam.completedCount.toLocaleString()} lượt thi
                </Text>
              </View>

              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => onSelectExam?.(exam.id)}
                style={[styles.startBtn, { backgroundColor: colors.primary }]}
              >
                <Text style={styles.startBtnText}>Bắt đầu thi</Text>
                <Feather name="arrow-right" size={14} color="#ffffff" />
              </TouchableOpacity>
            </View>
          </View>
        ))}
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
  },
  banner: {
    borderRadius: 24,
    padding: 24,
    marginBottom: 20,
    shadowColor: '#2563eb',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 3,
  },
  bannerTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  bannerTagText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '700',
  },
  bannerTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#ffffff',
    marginBottom: 8,
  },
  bannerSubtitle: {
    fontSize: 13,
    color: '#dbeafe',
    lineHeight: 19,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom: 14,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
  },
  tabsScrollView: {
    marginBottom: 16,
  },
  tabsRow: {
    gap: 8,
  },
  tabBtn: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
  },
  tabText: {
    fontSize: 13,
    fontWeight: '600',
  },
  tabTextActive: {
    fontWeight: '700',
  },
  list: {
    gap: 14,
  },
  examCard: {
    borderWidth: 1,
    borderRadius: 20,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  gradeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  gradeText: {
    fontSize: 11,
    fontWeight: '700',
  },
  metaRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 12,
  },
  metaDot: {
    marginHorizontal: 2,
  },
  examTitle: {
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 6,
    lineHeight: 22,
  },
  examDesc: {
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 14,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    paddingTop: 12,
  },
  participantsBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  participantsText: {
    fontSize: 12,
  },
  startBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
  },
  startBtnText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '700',
  },
});
