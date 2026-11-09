import 'package:flutter/material.dart';
import '../../../core/theme/app_theme.dart';
import '../../../core/theme/app_colors.dart';
import  '../../../core/widgets/pressable_3d.dart';

class PrimaryButton extends StatelessWidget {
  const PrimaryButton({
    super.key,
    required this.label,
    required this.onPressed,
    this.trailingIcon,
  });

  final String label;
  final VoidCallback? onPressed;
  final IconData? trailingIcon;

  @override
  Widget build(BuildContext context) {
    return Pressable3D(
      enabled: onPressed != null,
      onTap: onPressed ?? () {},
      faceColor: AppColors.primary,
      edgeColor: AppColors.primaryDark,
      radius: 16,
      depth: 5,
      height: 56,
      child: Row(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Text(
            label,
            style: AppTheme.heading(
              size: 16,
              color: Colors.white,
              fontWeight: FontWeight.w600,
            ),
          ),
          if (trailingIcon != null) ...[
            const SizedBox(width: 8),
            Icon(trailingIcon, color: Colors.white, size: 20),
          ],
        ],
      ),
    );
  }
}
