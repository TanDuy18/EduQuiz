import 'package:flutter/material.dart';
import '../../../core/theme/app_colors.dart';
import '../../../core/theme/app_theme.dart';

class FeatureCard extends StatelessWidget {
  const FeatureCard({
    super.key,
    required this.iconPath,
    required this.title,
    required this.description,
    this.vertical = false,
  });

  final String iconPath;
  final String title;
  final String description;
  final bool vertical; 

  @override
  Widget build(BuildContext context) {
    final icon = Container(
      width: 44,
      height: 44,
      padding: const EdgeInsets.all(8),
      decoration: BoxDecoration(
        color: const Color(0xFFEEF2FF),
        borderRadius: BorderRadius.circular(12),
      ),
      child: Image.asset(iconPath, fit: BoxFit.contain),
    );

    final texts = [
      Text(title, style: AppTheme.heading(size: 16)),
      const SizedBox(height: 4),
      Text(
        description,
        maxLines: 4,
        overflow: TextOverflow.ellipsis,
        style: AppTheme.body(size: 13.5, color: AppColors.textMuted).copyWith(height: 1.35),
      ),
    ];

    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(16),
        boxShadow: [
          BoxShadow(
            color: AppColors.primary.withValues(alpha: 0.14),
            blurRadius: 20,
            offset: const Offset(0, 6),
          ),
        ],
      ),
      child: vertical
          ? Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              mainAxisAlignment: MainAxisAlignment.center,
              children: [icon, const SizedBox(height: 12), ...texts],
            )
          : Row(
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                icon,
                const SizedBox(width: 14),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    mainAxisSize: MainAxisSize.min,
                    children: texts,
                  ),
                ),
              ],
            ),
    );
  }
}
