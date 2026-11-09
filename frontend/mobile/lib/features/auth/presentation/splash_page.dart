import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../providers/auth_controller.dart';

/// Màn hình chờ lúc mở app: kiểm tra token đã lưu rồi chuyển trang.
/// Đặt làm initialLocation (ví dụ '/splash') trong go_router.
class SplashPage extends ConsumerWidget {
  const SplashPage({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final auth = ref.watch(authControllerProvider);

    if (!auth.isLoading) {
      final loggedIn = auth.value != null;
      WidgetsBinding.instance.addPostFrameCallback((_) {
        if (context.mounted) context.go(loggedIn ? '/home' : '/onboarding');
      });
    }

    return const Scaffold(
      body: Center(child: CircularProgressIndicator()),
    );
  }
}
