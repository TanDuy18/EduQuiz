import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import MainLayout from '../layouts/MainLayout';
import HomePage from '../pages/home/HomePage';
import ExamListPage from '../pages/exam/ExamListPage';
import PracticePage from '../pages/practice/PracticePage';
import ProfilePage from '../pages/profile/ProfilePage';
import QuizPage from '../pages/quiz/QuizPage';
import ResultPage from '../pages/quiz/ResultPage';
import ExamReviewPage from '../pages/exam/ExamReviewPage';
import LoginPage from '../pages/auth/LoginPage';
import { useAuth } from '../context/AuthContext';

export default function AppRoutes() {
  const [currentRoute, setCurrentRoute] = useState<string>('/');
  const [activeExamId, setActiveExamId] = useState<string>('exam-math-thptqg-2024');
  const [quizResult, setQuizResult] = useState<any>(null);
  const { logout } = useAuth();

  const navigate = (route: string) => {
    setCurrentRoute(route);
  };

  const handleStartExam = (examId: string) => {
    setActiveExamId(examId);
    setCurrentRoute('/quiz');
  };

  const handleSubmitExam = (result: any) => {
    setQuizResult(result);
    setCurrentRoute('/result');
  };

  // MÀN HÌNH TOÀN MÀN HÌNH (Quiz, Result, Review, Login)
  if (currentRoute === '/quiz') {
    return (
      <QuizPage
        examId={activeExamId}
        onExit={() => navigate('/exam')}
        onSubmit={handleSubmitExam}
      />
    );
  }

  if (currentRoute === '/result') {
    return (
      <ResultPage
        examId={activeExamId}
        resultData={quizResult}
        onRetry={() => navigate('/quiz')}
        onReview={() => navigate('/review')}
        onGoHome={() => navigate('/')}
      />
    );
  }

  if (currentRoute === '/review') {
    return (
      <ExamReviewPage
        examId={activeExamId}
        userAnswers={quizResult?.answers}
        onBack={() => navigate('/result')}
      />
    );
  }

  if (currentRoute === '/login') {
    return (
      <LoginPage
        onSuccess={() => navigate('/')}
        onBack={() => navigate('/')}
      />
    );
  }

  // MÀN HÌNH CÓ KHUNG CHÍNH (Header + Content + BottomNav)
  return (
    <MainLayout activeRoute={currentRoute} onNavigate={navigate}>
      {currentRoute === '/' && <HomePage onNavigate={navigate} />}
      {currentRoute === '/exam' && <ExamListPage onSelectExam={handleStartExam} />}
      {currentRoute === '/practice' && <PracticePage onNavigate={navigate} />}
      {currentRoute === '/profile' && (
        <ProfilePage onNavigate={navigate} onLogout={logout} />
      )}
    </MainLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
