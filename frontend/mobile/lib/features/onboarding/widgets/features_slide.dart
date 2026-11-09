import 'package:flutter/material.dart';
import '../../../core/theme/app_colors.dart';
import '../../../core/theme/app_theme.dart';
import 'feature_card.dart';
import 'section_badge.dart';

class FeaturesSlide extends StatelessWidget {
  const FeaturesSlide({super.key});

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: const EdgeInsets.fromLTRB(24, 8, 24, 16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const SectionBadge(text: 'Ưu điểm nổi bật'),
              const SizedBox(height: 16),
              Text.rich(
                TextSpan(children: [
                  TextSpan(
                    text: 'Vì sao nên chọn\n',
                    style: AppTheme.heading(size: 32),
                  ),
                  TextSpan(text: 'Edu', style: AppTheme.heading(size: 32)),
                  TextSpan(
                    text: 'Quiz',
                    style: AppTheme.heading(size: 32, color: AppColors.brand),
                  ),
                  TextSpan(text: ' ?', style: AppTheme.heading(size: 32)),
                ]),
                style: const TextStyle(height: 1.25),
              ),
            ],
          ),
        ),

        const SizedBox(height: 30) ,
        // Ba thẻ chia đều phần còn lại, không cuộn
        Expanded(
          child: Padding(
            padding: const EdgeInsets.fromLTRB(24, 0, 24, 16),
            child: Column(
              children: [
                Expanded(
                  flex: 3,
                  child: FeatureCard(
                    iconPath: 'assets/images/ic_exam.png',
                    title: 'Đề thi đa dạng',
                    description:
                        'Nhiều môn học, nhiều cấp độ từ cơ bản đến nâng cao',
                  ),
                ),
                const SizedBox(height: 12),
                Expanded(
                  flex: 5,
                  child: Row(
                    children: [
                      Expanded(
                        child: FeatureCard(
                          vertical: true,
                          iconPath: 'assets/images/ic_update.png',
                          title: 'Bám sát chương trình',
                          description: 'Cập nhật theo chương trình học mới nhất',
                        ),
                      ),
                      const SizedBox(width: 12),
                      Expanded(
                        child: FeatureCard(
                          vertical: true,
                          iconPath: 'assets/images/ic_device.png',
                          title: 'Học mọi lúc, mọi nơi',
                          description:
                              'Dùng được trên điện thoại, tablet và máy tính',
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
        ),
      ],
    );
  }
}
