import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
} from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { mockRecentExamResults } from '../../data/mockProfile';

interface ProfilePageProps {
  onNavigate?: (route: string) => void;
  onLogout?: () => void;
}

export default function ProfilePage({ onNavigate, onLogout }: ProfilePageProps) {
  const { colors, isDark } = useTheme();
  const { user } = useAuth();

  // NẾU CHƯA ĐĂNG NHẬP: Hiển thị màn hình yêu cầu đăng nhập, KHÔNG HIỂN THỊ DỮ LIỆU GIẢ
  if (!user) {
    return (
      <View style={[styles.container, styles.emptyContainer, { backgroundColor: colors.bgSubtle }]}>
        <View style={[styles.emptyCard, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
          <View style={[styles.emptyIconCircle, { backgroundColor: colors.primaryLight }]}>
            <Feather name="user-x" size={36} color={colors.primary} />
          </View>

          <Text style={[styles.emptyTitle, { color: colors.text }]}>Bạn chưa đăng nhập</Text>
          <Text style={[styles.emptySubtitle, { color: colors.textMuted }]}>
            Vui lòng đăng nhập bằng tài khoản Google để xem hồ sơ cá nhân, lưu lịch sử bài thi và đồng bộ kết quả học tập.
          </Text>

          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => onNavigate?.('/login')}
            style={[styles.loginBtn, { backgroundColor: colors.primary }]}
          >
            <Ionicons name="logo-google" size={18} color="#ffffff" />
            <Text style={styles.loginBtnText}>Đăng nhập với Google</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // KHI ĐÃ ĐĂNG NHẬP BẰNG TÀI KHOẢN GOOGLE THỰC TẾ
  const displayName = user.name || 'Học viên Google';
  const displayEmail = user.email || 'Chưa có email';

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.bgSubtle }]}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      {/* THẺ HỒ SƠ TÀI KHOẢN GOOGLE */}
      <View
        style={[
          styles.profileCard,
          {
            backgroundColor: colors.card,
            borderColor: colors.cardBorder,
          },
        ]}
      >
        {user.avatar ? (
          <Image source={{ uri: user.avatar }} style={styles.avatarImage} />
        ) : (
          <View style={[styles.avatarCircle, { backgroundColor: colors.primary }]}>
            <Text style={styles.avatarText}>{displayName.charAt(0).toUpperCase()}</Text>
          </View>
        )}

        <View style={styles.profileInfo}>
          <View style={styles.nameRow}>
            <Text style={[styles.name, { color: colors.text }]} numberOfLines={1}>
              {displayName}
            </Text>
            <View style={[styles.googleTag, { backgroundColor: isDark ? '#334155' : '#eff6ff' }]}>
              <Ionicons name="logo-google" size={12} color="#ea4335" />
              <Text style={[styles.googleTagText, { color: colors.primary }]}>Google</Text>
            </View>
          </View>
          <Text style={[styles.target, { color: colors.textMuted }]} numberOfLines={1}>
            {displayEmail}
          </Text>
        </View>
      </View>

      {/* 4 THỐNG KÊ HỌC TẬP */}
      <View style={styles.statsGrid}>
        <View
          style={[
            styles.statBox,
            {
              backgroundColor: colors.card,
              borderColor: colors.cardBorder,
            },
          ]}
        >
          <View style={[styles.statIconBox, { backgroundColor: isDark ? 'rgba(37,99,235,0.2)' : '#eff6ff' }]}>
            <Feather name="book-open" size={20} color={colors.primary} />
          </View>
          <Text style={[styles.statLabel, { color: colors.textMuted }]}>Đề đã làm</Text>
          <Text style={[styles.statValue, { color: colors.text }]}>12</Text>
        </View>

        <View
          style={[
            styles.statBox,
            {
              backgroundColor: colors.card,
              borderColor: colors.cardBorder,
            },
          ]}
        >
          <View style={[styles.statIconBox, { backgroundColor: isDark ? 'rgba(217,119,6,0.2)' : '#fffbeb' }]}>
            <Feather name="award" size={20} color="#d97706" />
          </View>
          <Text style={[styles.statLabel, { color: colors.textMuted }]}>Điểm TB</Text>
          <Text style={[styles.statValue, { color: colors.text }]}>8.2 / 10</Text>
        </View>

        <View
          style={[
            styles.statBox,
            {
              backgroundColor: colors.card,
              borderColor: colors.cardBorder,
            },
          ]}
        >
          <View style={[styles.statIconBox, { backgroundColor: isDark ? 'rgba(124,58,237,0.2)' : '#f5f3ff' }]}>
            <Feather name="clock" size={20} color="#7c3aed" />
          </View>
          <Text style={[styles.statLabel, { color: colors.textMuted }]}>Thời gian học</Text>
          <Text style={[styles.statValue, { color: colors.text }]}>18.5h</Text>
        </View>

        <View
          style={[
            styles.statBox,
            {
              backgroundColor: colors.card,
              borderColor: colors.cardBorder,
            },
          ]}
        >
          <View style={[styles.statIconBox, { backgroundColor: isDark ? 'rgba(234,88,12,0.2)' : '#fff7ed' }]}>
            <Feather name="zap" size={20} color="#ea580c" />
          </View>
          <Text style={[styles.statLabel, { color: colors.textMuted }]}>Chuỗi Streak</Text>
          <Text style={[styles.statValue, { color: colors.text }]}>5 ngày</Text>
        </View>
      </View>

      {/* LỊCH SỬ BÀI THI GẦN ĐÂY */}
      <View
        style={[
          styles.historyCard,
          {
            backgroundColor: colors.card,
            borderColor: colors.cardBorder,
          },
        ]}
      >
        <Text style={[styles.historyTitle, { color: colors.text }]}>Lịch sử bài thi gần đây</Text>

        <View style={styles.historyList}>
          {mockRecentExamResults.map((result) => (
            <View key={result.examId} style={[styles.historyItem, { borderColor: colors.cardBorder }]}>
              <View style={styles.historyLeft}>
                <Text style={[styles.examTitle, { color: colors.text }]} numberOfLines={1}>
                  {result.examTitle}
                </Text>
                <View style={styles.examMeta}>
                  <Text style={[styles.examDate, { color: colors.textMuted }]}>{result.dateCompleted}</Text>
                  <Text style={[styles.metaDot, { color: colors.cardBorder }]}>•</Text>
                  <Text style={styles.correctCount}>Đúng {result.correctCount}/{result.totalQuestions} câu</Text>
                </View>
              </View>

              <View style={[styles.scoreBadge, { backgroundColor: colors.primaryLight }]}>
                <Text style={[styles.scoreText, { color: colors.primary }]}>{result.score.toFixed(1)}</Text>
              </View>
            </View>
          ))}
        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => onNavigate?.('/exam')}
          style={[styles.moreExamsBtn, { backgroundColor: colors.primaryLight }]}
        >
          <Text style={[styles.moreExamsText, { color: colors.primary }]}>Luyện thêm đề mới</Text>
          <Feather name="arrow-right" size={15} color={colors.primary} />
        </TouchableOpacity>
      </View>

      {/* NÚT ĐĂNG XUẤT */}
      {onLogout && (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={onLogout}
          style={[styles.logoutBtn, { backgroundColor: isDark ? 'rgba(239,68,68,0.2)' : '#fee2e2' }]}
        >
          <Feather name="log-out" size={16} color={colors.danger} />
          <Text style={[styles.logoutText, { color: colors.danger }]}>Đăng xuất tài khoản</Text>
        </TouchableOpacity>
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
  emptyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  emptyCard: {
    width: '100%',
    maxWidth: 420,
    borderWidth: 1,
    borderRadius: 28,
    padding: 32,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 14,
    elevation: 3,
  },
  emptyIconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },
  loginBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 13,
    paddingHorizontal: 24,
    borderRadius: 16,
    width: '100%',
  },
  loginBtnText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '800',
  },
  profileCard: {
    borderWidth: 1,
    borderRadius: 24,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 16,
  },
  avatarCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  avatarText: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: '800',
  },
  profileInfo: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  name: {
    fontSize: 18,
    fontWeight: '800',
    flexShrink: 1,
  },
  googleTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  googleTagText: {
    fontSize: 11,
    fontWeight: '700',
  },
  target: {
    fontSize: 12,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 16,
  },
  statBox: {
    flex: 1,
    minWidth: '45%',
    borderWidth: 1,
    borderRadius: 18,
    padding: 14,
  },
  statIconBox: {
    width: 38,
    height: 38,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 11,
    marginBottom: 2,
  },
  statValue: {
    fontSize: 17,
    fontWeight: '800',
  },
  historyCard: {
    borderWidth: 1,
    borderRadius: 24,
    padding: 20,
    marginBottom: 16,
  },
  historyTitle: {
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 14,
  },
  historyList: {
    gap: 12,
    marginBottom: 16,
  },
  historyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
  },
  historyLeft: {
    flex: 1,
    marginRight: 12,
  },
  examTitle: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 4,
  },
  examMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  examDate: {
    fontSize: 11,
  },
  metaDot: {},
  correctCount: {
    fontSize: 11,
    color: '#10b981',
    fontWeight: '600',
  },
  scoreBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  scoreText: {
    fontSize: 15,
    fontWeight: '800',
  },
  moreExamsBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 11,
    borderRadius: 14,
  },
  moreExamsText: {
    fontSize: 13,
    fontWeight: '700',
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    borderRadius: 16,
  },
  logoutText: {
    fontSize: 14,
    fontWeight: '700',
  },
});
