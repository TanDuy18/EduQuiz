import 'package:eduquiz/core/theme/app_colors.dart';
import 'package:eduquiz/core/theme/app_theme.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../providers/auth_controller.dart';
import 'widgets/blurred_home_backdrop.dart';
import 'widgets/google_sign_in_button.dart';

class LoginPage extends ConsumerWidget {
  const LoginPage({super.key});

  Future<void> _googleSignIn(BuildContext context, WidgetRef ref) async {
    final ok =
        await ref.read(authControllerProvider.notifier).signInWithGoogle();
    if (ok && context.mounted) context.go('/home');
  }

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final loading = ref.watch(authControllerProvider).isLoading;

    ref.listen(authControllerProvider, (_, next) {
      if (next.hasError) {
        ScaffoldMessenger.of(context)
            .showSnackBar(SnackBar(content: Text(next.error.toString())));
      }
    });

    return Scaffold(
      body: Stack(
        fit: StackFit.expand,
        children: [
          const BlurredHomeBackdrop(),
          SafeArea(
            child: Center(
              child: SingleChildScrollView(
                padding: const EdgeInsets.symmetric(
                  horizontal: 28,
                  vertical: 16,
                ),
                child: Container(
                  padding: const EdgeInsets.fromLTRB(22, 28, 22, 24),
                  decoration: BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.circular(28),
                    boxShadow: [
                      BoxShadow(
                        color: Colors.black.withValues(alpha: 0.12),
                        blurRadius: 30,
                        offset: const Offset(0, 10),
                      ),
                    ],
                  ),
                  child: Column(
                    mainAxisSize: MainAxisSize.min,
                    crossAxisAlignment: CrossAxisAlignment.stretch,
                    children: [
                      Text(
                        'Đăng nhập',
                        textAlign: TextAlign.center,
                        style: AppTheme.heading(
                          size: 22,
                          color: AppColors.navy,
                          fontWeight: FontWeight.w600,
                        ),
                      ),
                      const SizedBox(height: 6),
                      Text(
                        'Vui lòng đăng nhập để trải nghiệm dịch vụ',
                        textAlign: TextAlign.center,
                        style: AppTheme.body(
                          size: 14,
                          color: AppColors.navyMuted,
                          height: 1.4,
                        ),
                      ),
                      const SizedBox(height: 24),
                      if (loading)
                        const Padding(
                          padding: EdgeInsets.symmetric(vertical: 13),
                          child: Center(
                            child: SizedBox(
                              width: 24,
                              height: 24,
                              child: CircularProgressIndicator(strokeWidth: 2.5),
                            ),
                          ),
                        )
                      else
                        GoogleSignInButton(
                          onPressed: () => _googleSignIn(context, ref),
                        ),
                    ],
                  ),
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
