import 'package:flutter/material.dart';
import '../../../core/theme/app_colors.dart';
import '../../../core/theme/app_theme.dart';
import '../../../core/widgets/pressable_3d.dart';

class LevelCard extends StatelessWidget {
  const LevelCard({
    super.key,
    required this.icon,
    required this.title,
    required this.subtitle,
    required this.selected,
    required this.onTap,
  });

  final IconData icon;
  final String title;
  final String subtitle;
  final bool selected;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    return Pressable3D(
      onTap: onTap,
      radius: 26,
      depth: 4,
      padding: const EdgeInsets.all(12),
      faceColor: Colors.white,
      edgeColor: selected ? const Color(0xFF9DB9F7) : const Color(0xFFDCE6F8),
      borderColor: selected ? AppColors.accentBlue : null,
      child: Row(
        children: [
          // Ô nền icon
          Container(
            width: 56,
            height: 56,
            decoration: BoxDecoration(
              color: AppColors.iconTile,
              borderRadius: BorderRadius.circular(16),
            ),
            child: Icon(icon, size: 30, color: AppColors.accentBlue),
          ),
          const SizedBox(width: 16),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              mainAxisSize: MainAxisSize.min,
              children: [
                Text(
                  title,
                  style: AppTheme.heading(size: 18, color: AppColors.navy),
                ),
                const SizedBox(height: 2),
                Text(
                  subtitle,
                  style: AppTheme.body(size: 14, color: AppColors.navyMuted),
                ),
              ],
            ),
          ),
          // Nút mũi tên: đặc màu xanh khi được chọn
          AnimatedContainer(
            duration: const Duration(milliseconds: 200),
            width: 36,
            height: 36,
            decoration: BoxDecoration(
              shape: BoxShape.circle,
              color: selected ? AppColors.accentBlue : AppColors.chevronBg,
            ),
            child: Icon(
              Icons.chevron_right_rounded,
              size: 22,
              color: selected ? Colors.white : AppColors.accentBlue,
            ),
          ),
        ],
      ),
    );
  }
}
