import 'package:eduquiz/features/onboarding/widgets/how_it_works_slide.dart';
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../../core/theme/app_colors.dart';
import '../../../core/theme/app_theme.dart';
import '../widgets/welcome_slide.dart';
import '../widgets/about_slide.dart';
import '../widgets/page_indicator.dart';
import '../widgets/features_slide.dart';
import '../widgets/soft_blobs.dart';
import '../widgets/level_slide.dart';
import '../providers/selected_level_provider.dart';
import '../widgets/primary_button.dart';
import '../widgets/level_backdrop.dart';

class OnboardingPage extends ConsumerStatefulWidget {
  const OnboardingPage({super.key});
  @override
  ConsumerState<OnboardingPage> createState() => _OnboardingPageState();
}

class _OnboardingPageState extends ConsumerState<OnboardingPage> {
  final _controller = PageController();
  int _index = 0;

  static const _slides = <Widget>[
    WelcomeSlide(),
    AboutSlide(),
    FeaturesSlide(),
    HowItWorksSlide(),
    LevelSlide(),
  ];

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  void _next() {
    if (_index == _slides.length - 1) {
      context.go('/login');
    } else {
      _controller.nextPage(
        duration: const Duration(milliseconds: 350),
        curve: Curves.easeOutCubic,
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    final isLast = _index == _slides.length - 1;
    final selectedLevel = ref.watch(selectedLevelProvider);
    return Scaffold(
      body: Stack(
        children: [
          Positioned.fill(
            child: AnimatedOpacity(
              opacity: _index == 0 ? 1 : 0,
              duration: const Duration(milliseconds: 300),
              child: const SoftBlobs(),
            ),
          ),
          Positioned.fill(
            child: AnimatedOpacity(
              opacity: isLast ? 1 : 0,
              duration: const Duration(milliseconds: 300),
              child: const LevelBackdrop(),
            ),
          ),
          SafeArea(
            child: Column(
              children: [
                Align(
                  alignment: Alignment.centerRight,
                  child: TextButton(
                    onPressed: () => context.go('/login'),
                    style: TextButton.styleFrom(
                      padding: const EdgeInsets.symmetric(
                        horizontal: 24,
                        vertical: 8,
                      ),
                    ),
                    child: Text(
                      'Bỏ qua',
                      style: AppTheme.body(color: AppColors.textMuted),
                    ),
                  ),
                ),
                Expanded(
                  child: PageView(
                    controller: _controller,
                    // physics: const NeverScrollableScrollPhysics(),
                    onPageChanged: (i) => setState(() => _index = i),
                    children: _slides,
                  ),
                ),
                const SizedBox(height: 8),
                PageIndicator(count: _slides.length, index: _index),
                const SizedBox(height: 28),
                Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 24),
                  child: PrimaryButton(
                    label: isLast ? 'Bắt đầu học' : 'Tiếp tục',
                    trailingIcon: isLast ? Icons.arrow_forward_rounded : null,
                    onPressed: (isLast && selectedLevel == null) ? null : _next,
                  ),
                ),
                const SizedBox(height: 24),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

