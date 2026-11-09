import 'dart:ui';
import 'package:eduquiz/core/theme/app_colors.dart';
import 'package:eduquiz/core/theme/app_theme.dart';
import 'package:flutter/material.dart';

/// Khung trang chủ giả, làm mờ để làm nền cho popup.
/// Khi có trang chủ thật hoặc ảnh chụp từ Figma thì thay _FakeHome bằng nó.
class BlurredHomeBackdrop extends StatelessWidget {
  const BlurredHomeBackdrop({super.key});

  @override
  Widget build(BuildContext context) {
    return RepaintBoundary(
      child: Stack(
        fit: StackFit.expand,
        children: [
          ImageFiltered(
            imageFilter: ImageFilter.blur(sigmaX: 7, sigmaY: 7),
            child: const _FakeHome(),
          ),
          Container(color: Colors.white.withValues(alpha: 0.35)),
        ],
      ),
    );
  }
}

class _FakeHome extends StatelessWidget {
  const _FakeHome();

  static Widget _box(double h, Color c) => Container(
        height: h,
        decoration: BoxDecoration(
          color: c,
          borderRadius: BorderRadius.circular(18),
        ),
      );

  @override
  Widget build(BuildContext context) {
    const tiles = [
      Color(0xFFCFF1F5),
      Color(0xFFFFF1B8),
      Color(0xFFD6F0D2),
      Color(0xFFD9E4FF),
      Color(0xFFFFD9D9),
    ];

    return SafeArea(
      child: Padding(
        padding: const EdgeInsets.fromLTRB(20, 12, 20, 0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text.rich(
              TextSpan(children: [
                TextSpan(
                  text: 'Edu',
                  style: AppTheme.heading(size: 22, color: AppColors.navy),
                ),
                TextSpan(
                  text: 'Quiz',
                  style: AppTheme.heading(size: 22, color: AppColors.brand),
                ),
              ]),
            ),
            const SizedBox(height: 16),
            _box(150, const Color(0xFFD9E4FF)),
            const SizedBox(height: 12),
            Row(
              children: [
                Expanded(child: _box(64, const Color(0xFFD7F3EA))),
                const SizedBox(width: 12),
                Expanded(child: _box(64, const Color(0xFFDCD6FF))),
              ],
            ),
            const SizedBox(height: 20),
            Text(
              'Danh mục',
              style: AppTheme.heading(size: 16, color: AppColors.navy),
            ),
            const SizedBox(height: 10),
            Row(
              children: [
                for (final c in tiles)
                  Expanded(
                    child: Padding(
                      padding: const EdgeInsets.only(right: 8),
                      child: _box(64, c),
                    ),
                  ),
              ],
            ),
            const SizedBox(height: 20),
            _box(70, const Color(0xFFEFF3FF)),
            const Spacer(),
            const Row(
              mainAxisAlignment: MainAxisAlignment.spaceAround,
              children: [
                Icon(Icons.home_rounded, color: AppColors.accentBlue),
                Icon(Icons.menu_book_rounded, color: AppColors.navyMuted),
                Icon(Icons.assignment_rounded, color: AppColors.navyMuted),
                Icon(Icons.history_rounded, color: AppColors.navyMuted),
                Icon(Icons.person_rounded, color: AppColors.navyMuted),
              ],
            ),
            const SizedBox(height: 16),
          ],
        ),
      ),
    );
  }
}
