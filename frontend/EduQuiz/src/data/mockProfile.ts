import type { UserProfile, ExamResult } from '../types/exam';
import { mockMath50Questions } from './mockQuestions';

export const mockUserProfile: UserProfile = {
  name: 'Học viên',
  email: 'student@eduquiz.vn',
  avatarUrl: undefined,
  grade: 'Lớp 12',
  targetGoal: 'Mục tiêu: Đạt 27+ THPT Quốc Gia & 900+ ĐGNL',
  streakDays: 5,
  totalExamsCompleted: 24,
  averageScore: 8.6,
  totalStudyHours: 48.5,
};

export const mockRecentExamResults: ExamResult[] = [
  {
    examId: 'exam-math-thptqg-2024',
    examTitle: 'Đề thi thử THPT Quốc Gia môn Toán 2024 - Đề số 01',
    subjectId: 'math',
    score: 8.4,
    totalQuestions: 50,
    correctCount: 42,
    incorrectCount: 6,
    unansweredCount: 2,
    durationSpentSeconds: 78 * 60 + 20, // 78 mins 20s
    dateCompleted: 'Hôm qua, 20:30',
    topicBreakdown: [
      { topic: 'Hàm số & Đạo hàm', correctCount: 9, totalCount: 10, percentage: 90 },
      { topic: 'Mũ & Logarit', correctCount: 7, totalCount: 8, percentage: 87.5 },
      { topic: 'Nguyên hàm & Tích phân', correctCount: 6, totalCount: 8, percentage: 75 },
      { topic: 'Hình học Oxyz', correctCount: 8, totalCount: 8, percentage: 100 },
      { topic: 'Hình học không gian', correctCount: 4, totalCount: 7, percentage: 57.1 },
      { topic: 'Số phức', correctCount: 5, totalCount: 5, percentage: 100 },
      { topic: 'Tổ hợp & Xác suất', correctCount: 3, totalCount: 4, percentage: 75 },
    ],
    userAnswers: {
      1: 'B', 2: 'A', 3: 'A', 4: 'B', 5: 'A', 6: 'A', 7: 'A', 8: 'C',
      9: 'A', 10: 'A', 11: 'B', 12: 'A', 13: 'B', 14: 'A', 15: 'A',
    },
    questions: mockMath50Questions,
  },
  {
    examId: 'exam-physics-dao-dong',
    examTitle: 'Đề luyện thi Vật Lý: Toàn diện Dao động cơ & Sóng ánh sáng',
    subjectId: 'physics',
    score: 9.0,
    totalQuestions: 40,
    correctCount: 36,
    incorrectCount: 4,
    unansweredCount: 0,
    durationSpentSeconds: 46 * 60,
    dateCompleted: '3 ngày trước',
    topicBreakdown: [
      { topic: 'Dao động điều hòa', correctCount: 18, totalCount: 20, percentage: 90 },
      { topic: 'Sóng cơ học', correctCount: 18, totalCount: 20, percentage: 90 },
    ],
    userAnswers: {},
    questions: [],
  },
  {
    examId: 'exam-chem-este-lipit',
    examTitle: 'Đề thi Hóa Học: Trọng tâm Este - Lipit & Cacbohiđrat',
    subjectId: 'chemistry',
    score: 8.0,
    totalQuestions: 40,
    correctCount: 32,
    incorrectCount: 8,
    unansweredCount: 0,
    durationSpentSeconds: 49 * 60,
    dateCompleted: '5 ngày trước',
    topicBreakdown: [
      { topic: 'Este - Lipit', correctCount: 20, totalCount: 25, percentage: 80 },
      { topic: 'Cacbohiđrat', correctCount: 12, totalCount: 15, percentage: 80 },
    ],
    userAnswers: {},
    questions: [],
  },
];
