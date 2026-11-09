import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../core/theme/app_colors.dart';
import '../../../core/theme/app_theme.dart';
import '../domain/education_level.dart';
import '../providers/selected_level_provider.dart';
import 'level_card.dart';
import 'section_badge.dart';

class LevelSlide extends ConsumerWidget {
  const LevelSlide({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final selected = ref.watch(selectedLevelProvider);

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: const EdgeInsets.fromLTRB(24, 8, 24, 20),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Nhãn + nét lấp lánh
              SizedBox(
                height: 52,
                child: Stack(
                  clipBehavior: Clip.none,
                  children: const [
                    SectionBadge(text: 'Bắt đầu thui!'),
                  ],
                ),
              ),
              const SizedBox(height: 8),
              Text.rich(
                TextSpan(children: [
                  TextSpan(
                    text: 'Bạn đang học ',
                    style: AppTheme.heading(size: 34, color: AppColors.navy),
                  ),
                  TextSpan(
                    text: 'cấp nào',
                    style: AppTheme.heading(size: 34, color: AppColors.accentBlue),
                  ),
                  TextSpan(
                    text: ' ?',
                    style: AppTheme.heading(size: 34, color: AppColors.navy),
                  ),
                ]),
                style: const TextStyle(height: 1.2),
              ),
              const SizedBox(height: 12),
              Text(
                'Chọn để EduQuiz gợi ý đề phù hợp. Bạn có thể đổi lại bất cứ lúc nào',
                style: AppTheme.body(
                  size: 15,
                  color: AppColors.navyMuted,
                ).copyWith(height: 1.4),
              ),
            ],
          ),
        ),
        Expanded(
          child: ListView.separated(
            padding: const EdgeInsets.symmetric(horizontal: 24),
            physics: const ClampingScrollPhysics(),
            itemCount: EducationLevel.values.length,
            separatorBuilder: (_, __) => const SizedBox(height: 14),
            itemBuilder: (_, i) {
              final level = EducationLevel.values[i];
              return LevelCard(
                icon: level.icon,
                title: level.title,
                subtitle: level.subtitle,
                selected: selected == level,
                onTap: () =>
                    ref.read(selectedLevelProvider.notifier).select(level),
              );
            },
          ),
        ),
      ],
    );
  }
}
