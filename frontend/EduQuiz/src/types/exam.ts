export type SubjectId = 'math' | 'physics' | 'chemistry' | 'biology' | 'english';

export type GradeLevel = 'lop10' | 'lop11' | 'lop12' | 'thptqg' | 'dgnl';

export interface QuestionOption {
  id: string; // 'A' | 'B' | 'C' | 'D'
  content: string;
  mathExpression?: string;
}

export interface Question {
  id: number;
  questionNumber: number;
  prompt: string;
  mathFormula?: string;
  imageUrl?: string;
  options: QuestionOption[];
  correctAnswerId: string;
  explanation: string;
  topic: string;
  subjectId: SubjectId;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface Exam {
  id: string;
  title: string;
  subjectId: SubjectId;
  gradeLevel: GradeLevel;
  gradeLabel: string;
  durationMinutes: number;
  questionCount: number;
  difficulty: 'Dễ' | 'Trung bình' | 'Khó';
  completedCount: number;
  rating: number;
  badge?: 'HOT' | 'Mới' | 'Đề chuẩn';
  isCompleted?: boolean;
  score?: number;
  questions: Question[];
}

export interface UserExamProgress {
  examId: string;
  answers: Record<number, string>; // questionNumber -> selectedOptionId
  flaggedQuestions: Record<number, boolean>;
  timeRemainingSeconds: number;
  lastUpdated: string;
}

export interface TopicPerformance {
  topic: string;
  correctCount: number;
  totalCount: number;
  percentage: number;
}

export interface ExamResult {
  examId: string;
  examTitle: string;
  subjectId: SubjectId;
  score: number; // e.g. 8.5
  totalQuestions: number;
  correctCount: number;
  incorrectCount: number;
  unansweredCount: number;
  durationSpentSeconds: number;
  dateCompleted: string;
  topicBreakdown: TopicPerformance[];
  userAnswers: Record<number, string>;
  questions: Question[];
}

export interface Flashcard {
  id: string;
  subjectId: SubjectId;
  topic: string;
  frontTitle: string;
  frontFormula?: string;
  frontDescription?: string;
  backExplanation: string;
  backExample?: string;
  mastered: boolean;
}

export interface UserProfile {
  name: string;
  email: string;
  avatarUrl?: string;
  grade: string;
  targetGoal: string;
  streakDays: number;
  totalExamsCompleted: number;
  averageScore: number;
  totalStudyHours: number;
}
