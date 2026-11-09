import 'package:go_router/go_router.dart';
import '../../features/auth/presentation/login_page.dart';

import 'package:eduquiz/features/auth/presentation/splash_page.dart';
import 'package:eduquiz/features/onboarding/presentation/onboarding_page.dart';


final appRouter = GoRouter(
  initialLocation: '/splash', // trước đây có thể là '/onboarding' hoặc '/login'
  routes: [
    GoRoute(path: '/onboarding', builder: (_, __) => const OnboardingPage()),
    GoRoute(path: '/splash', builder: (_, __) => const SplashPage()),
    GoRoute(path: '/login', builder: (_, __) => const LoginPage()),
    // ... các route cũ của bạn (/home, ...)
  ],
);
