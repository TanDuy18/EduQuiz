import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  useWindowDimensions,
  Platform,
} from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';

export default function HeroShowcase() {
  const { colors, isDark } = useTheme();
  const { width } = useWindowDimensions();
  const isDesktop = width >= 992;
  const isMobile = width < 600;

  // Hiệu ứng floating nhẹ nhàng bắt trend (60fps native)
  const floatAnim1 = useRef(new Animated.Value(0)).current;
  const floatAnim2 = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Floating loop 1
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim1, {
          toValue: -8,
          duration: 2200,
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim1, {
          toValue: 0,
          duration: 2200,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Floating loop 2 (ngược pha)
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim2, {
          toValue: 8,
          duration: 2600,
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim2, {
          toValue: 0,
          duration: 2600,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Pulse nhẹ cho badge AI
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.08,
          duration: 1800,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1800,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <View style={[styles.container, { maxWidth: isDesktop ? 620 : '100%' }]}>
      {/* VÒNG ÁNH SÁNG AURA TÍM / XANH NẰM DƯỚI */}
      <View
        style={[
          styles.glowAura,
          {
            backgroundColor: isDark
              ? 'rgba(139, 92, 246, 0.12)'
              : 'rgba(168, 85, 247, 0.15)',
          },
        ]}
      />

      {/* FLOATING BADGE 1: AI (Góc trên bên trái) */}
      <Animated.View
        style={[
          styles.floatingBadgeAI,
          {
            transform: [{ translateY: floatAnim1 }, { scale: pulseAnim }],
            backgroundColor: isDark ? '#1e1b4b' : '#ede9fe',
            borderColor: isDark ? '#4338ca' : '#c4b5fd',
          },
        ]}
      >
        <View style={styles.aiIconBox}>
          <Ionicons name="sparkles" size={14} color="#8b5cf6" />
        </View>
        <Text style={[styles.aiBadgeText, { color: isDark ? '#c4b5fd' : '#6d28d9' }]}>
          AI Tạo đề
        </Text>
      </Animated.View>

      {/* FLOATING BADGE 2: TÍNH NĂNG NÂNG CAO (Góc trên bên phải) */}
      <Animated.View
        style={[
          styles.floatingBadgeTopRight,
          {
            transform: [{ translateY: floatAnim2 }],
            backgroundColor: isDark ? '#0f172a' : '#ffffff',
            borderColor: isDark ? '#334155' : '#e2e8f0',
          },
        ]}
      >
        <Feather name="zap" size={13} color="#3b82f6" />
        <Text style={[styles.pillText, { color: colors.text }]}>Tính năng nâng cao</Text>
      </Animated.View>

      {/* FLOATING BADGE 3: GIAO DIỆN THÂN THIỆN (Bên trái giữa) */}
      <Animated.View
        style={[
          styles.floatingBadgeLeft,
          {
            transform: [{ translateY: floatAnim2 }],
            backgroundColor: isDark ? '#0f172a' : '#ffffff',
            borderColor: isDark ? '#334155' : '#e2e8f0',
          },
        ]}
      >
        <Feather name="user-check" size={13} color="#8b5cf6" />
        <Text style={[styles.pillText, { color: colors.text }]}>Giao diện thân thiện</Text>
      </Animated.View>

      {/* BROWSER MOCKUP CHÍNH */}
      <View
        style={[
          styles.browserCard,
          {
            backgroundColor: isDark ? '#1e293b' : '#ffffff',
            borderColor: isDark ? '#334155' : '#e2e8f0',
          },
        ]}
      >
        {/* THANH ĐIỀU HƯỚNG BROWSER */}
        <View
          style={[
            styles.browserHeader,
            {
              backgroundColor: isDark ? '#0f172a' : '#f8fafc',
              borderBottomColor: isDark ? '#334155' : '#f1f5f9',
            },
          ]}
        >
          <View style={styles.trafficDots}>
            <View style={[styles.dot, { backgroundColor: '#ef4444' }]} />
            <View style={[styles.dot, { backgroundColor: '#f59e0b' }]} />
            <View style={[styles.dot, { backgroundColor: '#10b981' }]} />
          </View>
          <View
            style={[
              styles.browserUrlBar,
              {
                backgroundColor: isDark ? '#1e293b' : '#ffffff',
                borderColor: isDark ? '#334155' : '#e2e8f0',
              },
            ]}
          >
            <Feather name="lock" size={10} color={colors.textMuted} />
            <Text style={[styles.browserUrlText, { color: colors.textMuted }]}>
              eduquiz.vn/studio/create-exam
            </Text>
          </View>
          <Feather name="maximize-2" size={12} color={colors.textMuted} />
        </View>

        {/* NỘI DUNG WORKSPACE BÊN TRONG BROWSER */}
        <View style={styles.browserBody}>
          {/* STEPPER BREADCRUMB */}
          <View style={styles.stepperRow}>
            <View style={[styles.stepPill, styles.stepPillActive]}>
              <Feather name="check" size={11} color="#ffffff" />
              <Text style={styles.stepPillActiveText}>1. Upload tài liệu</Text>
            </View>
            <Feather name="arrow-right" size={12} color={colors.textMuted} />
            <View
              style={[
                styles.stepPill,
                { backgroundColor: isDark ? '#334155' : '#f1f5f9' },
              ]}
            >
              <Text style={[styles.stepPillMutedText, { color: colors.textMuted }]}>
                2. Duyệt kết quả
              </Text>
            </View>
          </View>

          {/* THANH CHẾ ĐỘ THI */}
          <View style={styles.filterRow}>
            <View style={styles.filterBtns}>
              <View style={[styles.filterBtn, { backgroundColor: colors.primary }]}>
                <Text style={styles.filterBtnTextActive}>Trắc nghiệm</Text>
              </View>
              <View
                style={[
                  styles.filterBtn,
                  { backgroundColor: isDark ? '#334155' : '#f1f5f9' },
                ]}
              >
                <Text style={[styles.filterBtnText, { color: colors.textMuted }]}>
                  Tự luận
                </Text>
              </View>
            </View>
            <Text style={[styles.questionCountText, { color: colors.textMuted }]}>
              Danh sách: 10 câu
            </Text>
          </View>

          {/* CÂU HỎI DEMO 1 */}
          <View
            style={[
              styles.questionCard,
              {
                backgroundColor: isDark ? '#0f172a' : '#f8fafc',
                borderColor: isDark ? '#334155' : '#e2e8f0',
              },
            ]}
          >
            <View style={styles.questionHeader}>
              <View style={styles.questionTagBox}>
                <Text style={[styles.questionTag, { color: colors.primary }]}>
                  Câu 1 (Nhiều đáp án)
                </Text>
              </View>
              <View style={styles.questionActions}>
                <Feather name="edit-2" size={12} color={colors.textMuted} />
                <Feather name="trash-2" size={12} color="#ef4444" />
              </View>
            </View>

            <Text style={[styles.questionText, { color: colors.text }]}>
              The bacterium E.coli: Phân loại & đặc tính sinh học vi sinh vật
            </Text>

            {/* DANH SÁCH ĐÁP ÁN */}
            <View style={styles.optionsGrid}>
              <View
                style={[
                  styles.optionItem,
                  {
                    backgroundColor: isDark ? '#1e293b' : '#ffffff',
                    borderColor: '#fca5a5',
                  },
                ]}
              >
                <View style={[styles.statusIcon, { backgroundColor: '#fee2e2' }]}>
                  <Feather name="x" size={11} color="#ef4444" />
                </View>
                <Text style={[styles.optionText, { color: colors.text }]} numberOfLines={1}>
                  Absolutely aerobic
                </Text>
              </View>

              <View
                style={[
                  styles.optionItem,
                  {
                    backgroundColor: isDark ? '#1e293b' : '#ffffff',
                    borderColor: '#86efac',
                  },
                ]}
              >
                <View style={[styles.statusIcon, { backgroundColor: '#dcfce7' }]}>
                  <Feather name="check" size={11} color="#16a34a" />
                </View>
                <Text
                  style={[styles.optionText, { color: colors.text, fontWeight: '700' }]}
                  numberOfLines={1}
                >
                  Gram-negative bacillus
                </Text>
              </View>

              <View
                style={[
                  styles.optionItem,
                  {
                    backgroundColor: isDark ? '#1e293b' : '#ffffff',
                    borderColor: '#fca5a5',
                  },
                ]}
              >
                <View style={[styles.statusIcon, { backgroundColor: '#fee2e2' }]}>
                  <Feather name="x" size={11} color="#ef4444" />
                </View>
                <Text style={[styles.optionText, { color: colors.text }]} numberOfLines={1}>
                  Sample preparation - colony
                </Text>
              </View>

              <View
                style={[
                  styles.optionItem,
                  {
                    backgroundColor: isDark ? '#1e293b' : '#ffffff',
                    borderColor: '#86efac',
                  },
                ]}
              >
                <View style={[styles.statusIcon, { backgroundColor: '#dcfce7' }]}>
                  <Feather name="check" size={11} color="#16a34a" />
                </View>
                <Text style={[styles.optionText, { color: colors.text }]} numberOfLines={1}>
                  Negative indole test
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* NÚT PLAY / PREVIEW NỔI Ở GIỮA */}
        <View style={styles.centerPlayBtnBox}>
          <View style={styles.centerPlayBtn}>
            <Ionicons name="play" size={22} color="#ffffff" style={{ marginLeft: 3 }} />
          </View>
        </View>
      </View>

      {/* MINI PHONE MOCKUP ĐÈ LÊN GÓC DƯỚI BÊN TRÁI */}
      {!isMobile && (
        <View
          style={[
            styles.miniPhoneCard,
            {
              backgroundColor: isDark ? '#0f172a' : '#ffffff',
              borderColor: isDark ? '#334155' : '#cbd5e1',
            },
          ]}
        >
          {/* TAI THỎ / CAMERA ĐIỆN THOẠI */}
          <View style={styles.phoneSpeaker} />
          <View style={styles.phoneScreen}>
            <View style={styles.phoneHeaderRow}>
              <Text style={styles.phoneTimeText}>09:41</Text>
              <Feather name="wifi" size={10} color="#10b981" />
            </View>
            <View style={[styles.phoneBadge, { backgroundColor: colors.primaryLight }]}>
              <Text style={[styles.phoneBadgeText, { color: colors.primary }]}>
                Đề thi Toán 12
              </Text>
            </View>
            <View style={styles.phoneTimerBar}>
              <Feather name="clock" size={10} color="#ef4444" />
              <Text style={styles.phoneTimerText}>45:20 còn lại</Text>
            </View>
            <View style={styles.phoneFakeQuestion}>
              <Text style={[styles.phoneQNum, { color: colors.text }]}>Câu 14/50</Text>
              <View style={[styles.phoneQBar, { backgroundColor: colors.primary }]} />
            </View>
          </View>
        </View>
      )}

      {/* NGÔI SAO 3D LẤP LÁNH GÓC DƯỚI BÊN PHẢI */}
      <Animated.View
        style={[
          styles.starDecoration,
          {
            transform: [{ translateY: floatAnim1 }],
          },
        ]}
      >
        <Ionicons name="star" size={28} color="#f59e0b" />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    paddingVertical: 16,
  },
  glowAura: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 40,
    filter: Platform.OS === 'web' ? 'blur(40px)' : undefined,
    zIndex: 0,
  },
  browserCard: {
    width: '100%',
    borderWidth: 1.5,
    borderRadius: 24,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.1,
    shadowRadius: 28,
    elevation: 8,
    zIndex: 1,
  },
  browserHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
  },
  trafficDots: {
    flexDirection: 'row',
    gap: 6,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  browserUrlBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  browserUrlText: {
    fontSize: 10,
    fontWeight: '600',
  },
  browserBody: {
    padding: 16,
    gap: 12,
  },
  stepperRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  stepPillActive: {
    backgroundColor: '#2563eb',
  },
  stepPillActiveText: {
    color: '#ffffff',
    fontSize: 11,
    fontWeight: '700',
  },
  stepPillMutedText: {
    fontSize: 11,
    fontWeight: '600',
  },
  filterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  filterBtns: {
    flexDirection: 'row',
    gap: 6,
  },
  filterBtn: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  filterBtnTextActive: {
    color: '#ffffff',
    fontSize: 11,
    fontWeight: '700',
  },
  filterBtnText: {
    fontSize: 11,
    fontWeight: '600',
  },
  questionCountText: {
    fontSize: 11,
    fontWeight: '600',
  },
  questionCard: {
    borderWidth: 1,
    borderRadius: 14,
    padding: 14,
    gap: 10,
  },
  questionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  questionTagBox: {
    backgroundColor: 'rgba(37,99,235,0.1)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  questionTag: {
    fontSize: 11,
    fontWeight: '800',
  },
  questionActions: {
    flexDirection: 'row',
    gap: 10,
  },
  questionText: {
    fontSize: 13,
    fontWeight: '700',
    lineHeight: 18,
  },
  optionsGrid: {
    gap: 6,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  statusIcon: {
    width: 18,
    height: 18,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionText: {
    fontSize: 11,
    flex: 1,
  },
  centerPlayBtnBox: {
    position: 'absolute',
    top: '46%',
    left: '46%',
    zIndex: 10,
  },
  centerPlayBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#1e293b',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  miniPhoneCard: {
    position: 'absolute',
    bottom: -15,
    left: -20,
    width: 135,
    height: 180,
    borderWidth: 3,
    borderRadius: 22,
    padding: 8,
    zIndex: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 10,
  },
  phoneSpeaker: {
    width: 28,
    height: 3,
    borderRadius: 2,
    backgroundColor: '#94a3b8',
    alignSelf: 'center',
    marginBottom: 6,
  },
  phoneScreen: {
    flex: 1,
    gap: 6,
  },
  phoneHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  phoneTimeText: {
    fontSize: 9,
    fontWeight: '700',
    color: '#64748b',
  },
  phoneBadge: {
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  phoneBadgeText: {
    fontSize: 9,
    fontWeight: '700',
  },
  phoneTimerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(239,68,68,0.1)',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 6,
  },
  phoneTimerText: {
    fontSize: 9,
    fontWeight: '700',
    color: '#ef4444',
  },
  phoneFakeQuestion: {
    marginTop: 'auto',
    gap: 4,
  },
  phoneQNum: {
    fontSize: 9,
    fontWeight: '800',
  },
  phoneQBar: {
    height: 4,
    borderRadius: 2,
    width: '70%',
  },
  floatingBadgeAI: {
    position: 'absolute',
    top: 0,
    left: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderWidth: 1.5,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    zIndex: 15,
    shadowColor: '#8b5cf6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 6,
  },
  aiIconBox: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  aiBadgeText: {
    fontSize: 12,
    fontWeight: '800',
  },
  floatingBadgeTopRight: {
    position: 'absolute',
    top: -5,
    right: 15,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 5,
    zIndex: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  floatingBadgeLeft: {
    position: 'absolute',
    top: '40%',
    left: -15,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 5,
    zIndex: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  pillText: {
    fontSize: 11,
    fontWeight: '700',
  },
  starDecoration: {
    position: 'absolute',
    bottom: -8,
    right: 10,
    zIndex: 15,
  },
});
