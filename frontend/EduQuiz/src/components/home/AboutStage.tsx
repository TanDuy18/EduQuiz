import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

export default function AboutStage() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((s) => (s + 1) % 3);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  const missions = [
    { title: 'Luyện đề trắc nghiệm chuẩn', desc: 'Ngân hàng 10.000+ câu hỏi phân hoá', icon: 'check-circle' as const, color: '#2563eb' },
    { title: 'Phân tích điểm yếu & Lỗi sai', desc: 'Ma trận đáp án giải thích chi tiết', icon: 'trending-up' as const, color: '#7c3aed' },
    { title: 'Chinh phục kỳ thi mục tiêu', desc: 'Tự tin bứt phá điểm 9+ và 10', icon: 'award' as const, color: '#059669' },
  ];

  const currentMission = missions[step];

  return (
    <View style={styles.container}>
      <View style={[styles.card, { borderColor: currentMission.color }]}>
        <View style={[styles.iconCircle, { backgroundColor: `${currentMission.color}15` }]}>
          <Feather name={currentMission.icon} size={28} color={currentMission.color} />
        </View>
        <Text style={styles.title}>{currentMission.title}</Text>
        <Text style={styles.desc}>{currentMission.desc}</Text>

        <View style={styles.dotsRow}>
          {missions.map((_, i) => (
            <View
              key={i}
              style={[
                styles.dot,
                i === step && { backgroundColor: currentMission.color, width: 20 },
              ]}
            />
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    alignItems: 'center',
    width: '100%',
  },
  card: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#ffffff',
    borderWidth: 1.5,
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
  },
  iconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 17,
    fontWeight: '800',
    color: '#0f172a',
    textAlign: 'center',
    marginBottom: 6,
  },
  desc: {
    fontSize: 13,
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 16,
  },
  dotsRow: {
    flexDirection: 'row',
    gap: 6,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#cbd5e1',
  },
});
