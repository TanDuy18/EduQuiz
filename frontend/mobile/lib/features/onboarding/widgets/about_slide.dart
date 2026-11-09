import 'package:flutter/material.dart';
import 'package:lottie/lottie.dart';

import '../../../core/theme/app_colors.dart';
import '../../../core/theme/app_theme.dart';
import 'section_badge.dart';
import '../widgets/scribble_underline.dart';

class AboutSlide extends StatelessWidget {
  const AboutSlide({super.key});

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: 24),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const SizedBox(height: 8),
              const SectionBadge(text: 'Về EduQuiz'),
              const SizedBox(height: 20),
              Text.rich(
                TextSpan(
                  children: [
                    TextSpan(
                      text: 'Không chỉ là luyện đề, mà là hành trình\n',
                      style: AppTheme.heading2(
                        size: 30,
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                    WidgetSpan(
                      alignment: PlaceholderAlignment.baseline,
                      baseline: TextBaseline.alphabetic,
                      child: ScribbleUnderline(
                        child: Text(
                          'phát triển',
                          style: AppTheme.heading(
                            size: 32,
                            fontWeight: FontWeight.w700,
                            color: AppColors.brand,
                          ),
                        ),
                      ),
                    ),
                  ],
                ),
                style: const TextStyle(height: 1.25),
              ),
            ],
          ),
        ),
        const SizedBox(height: 70),
        Lottie.asset(
          'assets/lottie/STUDENT.lottie',
          width: double.infinity,
          height: 300,
          fit: BoxFit.contain,
          alignment: Alignment.bottomCenter,
        ),
      ],
    );
  }
}
