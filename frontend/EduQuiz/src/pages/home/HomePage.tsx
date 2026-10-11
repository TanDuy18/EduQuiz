import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
  Platform,
} from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import LevelCard from '../../components/home/LevelCard';
import StreakCard from '../../components/home/StreakCard';
import InProgressCard from '../../components/home/InProgressCard';
import WhyCard from '../../components/home/WhyCard';
import HowStep from '../../components/home/HowStep';
import AboutStage from '../../components/home/AboutStage';
import HeroShowcase from '../../components/home/HeroShowcase';
import { useTheme } from '../../context/ThemeContext';

interface HomePageProps {
  onNavigate?: (route: string) => void;
}

export default function HomePage({ onNavigate }: HomePageProps) {
  const [search, setSearch] = useState('');
  const { colors, isDark } = useTheme();
  const { width } = useWindowDimensions();

  const isDesktop = width >= 992;
  const isTablet = width >= 768 && width < 992;

  const socialAvatars = [
    { bg: '#8b5cf6', initial: 'H' },
    { bg: '#3b82f6', initial: 'M' },
    { bg: '#ec4899', initial: 'A' },
    { bg: '#10b981', initial: 'T' },
    { bg: '#f59e0b', initial: 'Q' },
  ];

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.bgSubtle }]}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      {/* ===================== HERO SECTION BẮT TREND ===================== */}
      <View
        style={[
          styles.heroWrapper,
          {
            backgroundColor: isDark
              ? 'rgba(15, 23, 42, 0.6)'
              : 'rgba(255, 255, 255, 0.7)',
            borderColor: colors.cardBorder,
          },
        ]}
      >
        {/* Lớp nền gradient ánh sáng nhẹ phía sau */}
        <View
          style={[
            styles.heroBackgroundAura,
            {
              backgroundColor: isDark
                ? 'rgba(139, 92, 246, 0.08)'
                : 'rgba(168, 85, 247, 0.08)',
            },
          ]}
        />

        <View
          style={[
            styles.heroContentGrid,
            {
              flexDirection: isDesktop ? 'row' : 'column',
              gap: isDesktop ? 40 : 28,
            },
          ]}
        >
          {/* CỘT TRÁI: TIÊU ĐỀ, PHỤ ĐỀ, SOCIAL PROOF & NÚT HÀNH ĐỘNG */}
          <View style={[styles.heroLeftCol, { flex: isDesktop ? 1 : undefined }]}>
            {/* PILL BADGE #1 NỀN TẢNG THI TRẮC NGHIỆM */}
            <View
              style={[
                styles.topBadge,
                {
                  backgroundColor: isDark ? 'rgba(139, 92, 246, 0.15)' : '#f3e8ff',
                  borderColor: isDark ? '#7c3aed' : '#c084fc',
                },
              ]}
            >
              <Ionicons name="sparkles" size={14} color="#8b5cf6" />
              <Text style={[styles.topBadgeText, { color: isDark ? '#c084fc' : '#7c3aed' }]}>
                #1 Nền tảng thi trắc nghiệm online tốt nhất
              </Text>
            </View>

            {/* TIÊU ĐỀ CHÍNH BẮT MẮT */}
            <Text style={[styles.heroTitle, { color: colors.text }]}>
              Có một cách đơn giản hơn để{'\n'}
              <Text style={styles.heroHighlightText}>tạo nhanh đề thi{'\n'}</Text>
              trắc nghiệm online
            </Text>

            {/* MÔ TẢ PHỤ ĐỀ TRUYỀN CẢM HỨNG */}
            <Text style={[styles.heroSubtitle, { color: colors.textMuted }]}>
              Tạo câu hỏi và đề thi nhanh với những giải pháp thông minh. EduQuiz tận dụng sức
              mạnh công nghệ để nâng cao trình độ học tập của bạn.
            </Text>

            {/* SOCIAL PROOF: AVATAR XẾP LỚP + ĐÁNH GIÁ 5 SAO */}
            <View style={styles.socialProofBox}>
              <View style={styles.avatarStack}>
                {socialAvatars.map((av, index) => (
                  <View
                    key={index}
                    style={[
                      styles.avatarCircle,
                      {
                        backgroundColor: av.bg,
                        marginLeft: index === 0 ? 0 : -10,
                        borderColor: isDark ? '#0f172a' : '#ffffff',
                      },
                    ]}
                  >
                    <Text style={styles.avatarInitial}>{av.initial}</Text>
                  </View>
                ))}
              </View>

              <View style={styles.ratingInfo}>
                <Text style={[styles.socialProofText, { color: colors.textSecondary }]}>
                  Hơn <Text style={styles.boldText}>200.000+</Text> học sinh & sinh viên tin dùng
                </Text>
                <View style={styles.starsRow}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Ionicons key={star} name="star" size={15} color="#f59e0b" />
                  ))}
                  <Text style={[styles.ratingScore, { color: colors.textMuted }]}>5.0 / 5.0</Text>
                </View>
              </View>
            </View>

            {/* 2 NÚT HÀNH ĐỘNG CHÍNH */}
            <View style={styles.actionButtonsRow}>
              <TouchableOpacity
                activeOpacity={0.85}
                onPress={() => onNavigate?.('/practice')}
                style={styles.primaryActionBtn}
              >
                <Ionicons name="sparkles" size={17} color="#ffffff" />
                <Text style={styles.primaryActionBtnText}>Tạo đề thi ngay</Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.85}
                onPress={() => onNavigate?.('/exam')}
                style={styles.secondaryActionBtn}
              >
                <Feather name="search" size={16} color="#ffffff" />
                <Text style={styles.secondaryActionBtnText}>Tìm kiếm đề thi</Text>
              </TouchableOpacity>
            </View>

            {/* THANH TÌM KIẾM NHANH */}
            <View
              style={[
                styles.quickSearchBar,
                {
                  backgroundColor: colors.card,
                  borderColor: colors.cardBorder,
                },
              ]}
            >
              <Feather name="search" size={18} color={colors.textMuted} />
              <TextInput
                value={search}
                onChangeText={setSearch}
                placeholder="Tìm kiếm môn học, đề thi THPT, ĐGNL..."
                placeholderTextColor={colors.textMuted}
                style={[styles.quickSearchInput, { color: colors.text }]}
              />
              {search.length > 0 && (
                <TouchableOpacity onPress={() => setSearch('')}>
                  <Feather name="x" size={16} color={colors.textMuted} />
                </TouchableOpacity>
              )}
            </View>
          </View>

          {/* CỘT PHẢI: MOCKUP GIAO DIỆN HIỆN ĐẠI (HERO SHOWCASE) */}
          <View style={[styles.heroRightCol, { flex: isDesktop ? 1.1 : undefined }]}>
            <HeroShowcase />
          </View>
        </View>
      </View>

      {/* ===================== CÁC CẤP BẬC HỌC TẬP ===================== */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionBadge, { color: colors.primary }]}>Kho đề phân loại</Text>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Lựa chọn cấp bậc học của bạn
          </Text>
          <Text style={[styles.sectionSubtitle, { color: colors.textMuted }]}>
            Đề thi bám sát cấu trúc đề minh hoạ chuẩn của Bộ Giáo Dục & Đào Tạo.
          </Text>
        </View>

        <View style={styles.levelsRow}>
          <LevelCard
            iconName="book"
            iconColor="#10b981"
            colorClass="green"
            title="THCS"
            subtitle="Lớp 6 - 9 • Thi vào 10"
            onPress={() => onNavigate?.('/exam')}
          />
          <LevelCard
            iconName="award"
            iconColor="#8b5cf6"
            colorClass="violet"
            title="THPT"
            subtitle="Lớp 10 - 12 • Tốt nghiệp & ĐGNL"
            onPress={() => onNavigate?.('/exam')}
          />
          <LevelCard
            iconName="check-circle"
            iconColor="#3b82f6"
            colorClass="blue"
            title="Đại học"
            subtitle="Đại cương & Chuyên ngành"
            onPress={() => onNavigate?.('/exam')}
          />
        </View>
      </View>

      {/* ===================== WIDGET TIẾN ĐỘ & STREAK ===================== */}
      <View style={styles.widgetsSection}>
        <InProgressCard onContinueExam={() => onNavigate?.('/quiz/exam-math-thptqg-2024')} />
        <StreakCard streakDays={5} />
      </View>

      {/* ===================== PHƯƠNG PHÁP HỌC CHỦ ĐỘNG ===================== */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionBadge, { color: colors.primary }]}>Học thông minh hơn</Text>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Phương pháp học chủ động
          </Text>
          <Text style={[styles.sectionSubtitle, { color: colors.textMuted }]}>
            Hệ thống phân tích ma trận kiến thức chuẩn, giúp bạn phát hiện lỗ hổng và bù đắp kịp thời.
          </Text>
        </View>
        <AboutStage />
      </View>

      {/* ===================== TẠI SAO CHỌN EDUQUIZ ===================== */}
      <View
        style={[
          styles.sectionAlt,
          {
            backgroundColor: isDark ? colors.card : '#f8fafc',
            borderColor: colors.cardBorder,
          },
        ]}
      >
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionBadge, { color: colors.primary }]}>Tại sao chọn EduQuiz?</Text>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Nâng tầm trải nghiệm ôn thi
          </Text>
        </View>

        <View style={styles.whyGrid}>
          <WhyCard
            iconName="shield"
            iconColor="#2563eb"
            colorClass="blue"
            title="Kho đề thi chuẩn hóa"
            desc="Hàng nghìn đề thi thử từ các trường chuyên và sở giáo dục trên toàn quốc."
            onPress={() => onNavigate?.('/exam')}
          />
          <WhyCard
            iconName="activity"
            iconColor="#7c3aed"
            colorClass="violet"
            title="Chấm điểm tức thì"
            desc="Xem ngay kết quả, phân tích chi tiết đáp án và ma trận từng chuyên đề sau khi nộp bài."
            onPress={() => onNavigate?.('/practice')}
          />
          <WhyCard
            iconName="smartphone"
            iconColor="#059669"
            colorClass="green"
            title="Đa nền tảng Web & App"
            desc="Đồng bộ tiến độ học tập trên cả máy tính, máy tính bảng và điện thoại Android."
            onPress={() => onNavigate?.('/exam')}
          />
        </View>
      </View>

      {/* ===================== LỘ TRÌNH 3 BƯỚC ===================== */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionBadge, { color: colors.primary }]}>Lộ trình học tập</Text>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Chỉ 3 bước đơn giản</Text>
        </View>

        <View style={styles.howStepsRow}>
          <HowStep
            num={1}
            colorClass="blue"
            title="Chọn đề & Chuyên đề"
            desc="Lựa chọn môn học và kỳ thi phù hợp với năng lực hiện tại của bạn."
          />
          <HowStep
            num={2}
            colorClass="violet"
            title="Làm bài bấm giờ"
            desc="Rèn luyện kỹ năng phân bổ thời gian và tâm lý phòng thi thực tế."
          />
          <HowStep
            num={3}
            colorClass="green"
            title="Xem giải chi tiết"
            desc="Khắc phục bẫy câu hỏi và củng cố vững chắc công thức bằng Flashcard."
          />
        </View>
      </View>

      {/* ===================== BANNER CTA CUỐI TRANG ===================== */}
      <View
        style={[
          styles.ctaCard,
          {
            backgroundColor: isDark ? '#1e1b4b' : '#6366f1',
          },
        ]}
      >
        <Text style={styles.ctaTitle}>Bắt đầu ôn luyện ngay hôm nay!</Text>
        <Text style={styles.ctaSubtitle}>
          Tham gia cộng đồng hơn 200.000 sĩ tử bứt phá điểm số cùng EduQuiz.
        </Text>
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => onNavigate?.('/exam')}
          style={styles.ctaBtn}
        >
          <Text style={[styles.ctaBtnText, { color: '#4f46e5' }]}>Khám phá kho đề thi</Text>
          <Feather name="arrow-right" size={16} color="#4f46e5" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 48,
  },
  heroWrapper: {
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 32,
    borderWidth: 1,
    paddingHorizontal: 24,
    paddingVertical: 32,
    position: 'relative',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.06,
    shadowRadius: 18,
    elevation: 3,
  },
  heroBackgroundAura: {
    position: 'absolute',
    top: -80,
    right: -80,
    width: 320,
    height: 320,
    borderRadius: 160,
    filter: Platform.OS === 'web' ? 'blur(60px)' : undefined,
  },
  heroContentGrid: {
    alignItems: 'center',
    width: '100%',
  },
  heroLeftCol: {
    width: '100%',
    alignItems: 'flex-start',
  },
  heroRightCol: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  topBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderWidth: 1.5,
    borderRadius: 24,
    paddingHorizontal: 14,
    paddingVertical: 6,
    marginBottom: 18,
  },
  topBadgeText: {
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0.2,
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: '900',
    lineHeight: 42,
    letterSpacing: -0.6,
    marginBottom: 16,
  },
  heroHighlightText: {
    color: '#8b5cf6',
  },
  heroSubtitle: {
    fontSize: 15,
    lineHeight: 24,
    maxWidth: 520,
    marginBottom: 24,
  },
  socialProofBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginBottom: 26,
    flexWrap: 'wrap',
  },
  avatarStack: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarInitial: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '800',
  },
  ratingInfo: {
    gap: 2,
  },
  socialProofText: {
    fontSize: 12,
    fontWeight: '600',
  },
  boldText: {
    fontWeight: '800',
    color: '#8b5cf6',
  },
  starsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  ratingScore: {
    fontSize: 11,
    fontWeight: '700',
    marginLeft: 6,
  },
  actionButtonsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 20,
    flexWrap: 'wrap',
    width: '100%',
  },
  primaryActionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#8b5cf6',
    paddingHorizontal: 22,
    paddingVertical: 14,
    borderRadius: 26,
    shadowColor: '#8b5cf6',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 14,
    elevation: 6,
  },
  primaryActionBtnText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 0.2,
  },
  secondaryActionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#2563eb',
    paddingHorizontal: 22,
    paddingVertical: 14,
    borderRadius: 26,
    shadowColor: '#2563eb',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 14,
    elevation: 4,
  },
  secondaryActionBtnText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 0.2,
  },
  quickSearchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 10,
    width: '100%',
    maxWidth: 500,
    gap: 10,
  },
  quickSearchInput: {
    flex: 1,
    fontSize: 13,
    paddingVertical: 0,
  },
  levelsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    width: '100%',
  },
  widgetsSection: {
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 26,
  },
  sectionAlt: {
    paddingHorizontal: 20,
    paddingVertical: 26,
    borderWidth: 1,
    borderRadius: 28,
    marginHorizontal: 16,
    marginVertical: 12,
  },
  sectionHeader: {
    alignItems: 'center',
    marginBottom: 22,
  },
  sectionBadge: {
    fontSize: 12,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 6,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: 6,
    letterSpacing: -0.3,
  },
  sectionSubtitle: {
    fontSize: 13,
    textAlign: 'center',
    maxWidth: 520,
    lineHeight: 20,
  },
  whyGrid: {
    gap: 10,
  },
  howStepsRow: {
    gap: 12,
  },
  ctaCard: {
    marginHorizontal: 16,
    marginTop: 24,
    borderRadius: 28,
    padding: 30,
    alignItems: 'center',
    shadowColor: '#6366f1',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 8,
  },
  ctaTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 8,
  },
  ctaSubtitle: {
    fontSize: 13,
    color: '#e0e7ff',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 20,
  },
  ctaBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#ffffff',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  ctaBtnText: {
    fontSize: 14,
    fontWeight: '800',
  },
});
