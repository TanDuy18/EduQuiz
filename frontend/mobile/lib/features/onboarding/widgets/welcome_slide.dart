import 'package:flutter/material.dart';

import '../../../core/theme/app_colors.dart';
import '../../../core/theme/app_theme.dart';
import 'write_in_animation.dart';

class WelcomeSlide extends StatelessWidget {
  const WelcomeSlide({super.key});

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        const Spacer(flex: 2),
        Text(
          'Chào mừng\nđến với',
          textAlign: TextAlign.center,
          style: AppTheme.heading(
            size: 41,
            color: AppColors.textPrimary.withValues(alpha: 0.76),
            fontWeight: FontWeight.w600,
          ).copyWith(height: 1.1),
        ),
        Text.rich(
          TextSpan(
            children: [
              TextSpan(
                text: 'Edu',
                style: AppTheme.heading(
                  size: 65,
                  color: Color(0xFF413F3F),
                  fontWeight: FontWeight.w600,
                ),
              ),

              TextSpan(
                text: 'Quiz',
                style: AppTheme.heading(
                  size: 65,
                  fontWeight: FontWeight.w600,
                  color: AppColors.brand,
                ),
              ),
            ],
          ),
          textHeightBehavior: const TextHeightBehavior(
            applyHeightToFirstAscent: false,
            applyHeightToLastDescent: false,
          ),
        ),
        const SizedBox(height: 60),
        Stack(
          clipBehavior: Clip.none, // cho phép chữ nằm lấn ra ngoài khung hình
          alignment: Alignment.center,
          children: [
            Transform.scale(
              scale: 1.2, // to hơn thì tăng, nhỏ lại thì giảm
              child: Image.asset(
                'assets/images/HomeIcon.png',
                width: double.infinity,
                fit: BoxFit.fitWidth,
              ),
            ),
            Positioned(
              top: -50, // âm = nằm phía trên hình, chỉnh cho khớp thiết kế
              right: 5,
              child: WriteInAnimation(
                child: Image.asset('assets/images/HomeNote.png', width: 220),
              ),
            ),
          ],
        ),
        const Spacer(flex: 1),
      ],
    );
  }
}
