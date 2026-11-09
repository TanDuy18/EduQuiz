import 'package:flutter/material.dart';

import 'app_colors.dart';

abstract final class AppTheme {
  static const _headingFont = 'BeVietnamPro';
  static const _heading2Font = 'PlusJakartaSans';
  static const _bodyFont = 'BeVietnamPro';

  static TextStyle heading({
    double size = 16,
    Color color = AppColors.textPrimary,
    FontWeight fontWeight = FontWeight.w700,
    double? height,
  }) =>
      TextStyle(
        fontFamily: _headingFont,
        fontSize: size,
        fontWeight: fontWeight,
        color: color,
        height: height,
      );

  static TextStyle heading2({
    double size = 16,
    Color color = AppColors.textPrimary,
    FontWeight fontWeight = FontWeight.w700,
    double? height,
  }) =>
      TextStyle(
        fontFamily: _heading2Font,
        fontSize: size,
        fontWeight: fontWeight,
        color: color,
        height: height,
      );

  static TextStyle body({
    double size = 14,
    Color color = AppColors.textPrimary,
    FontWeight weight = FontWeight.w400,
    FontStyle style = FontStyle.normal,
    double? height,
  }) =>
      TextStyle(
        fontFamily: _bodyFont,
        fontSize: size,
        fontWeight: weight,
        fontStyle: style,
        color: color,
        height: height,
      );

  static ThemeData light() => ThemeData(
        useMaterial3: true,
        fontFamily: _bodyFont,
        scaffoldBackgroundColor: AppColors.background,
        colorScheme: ColorScheme.fromSeed(seedColor: AppColors.primary),
        filledButtonTheme: FilledButtonThemeData(
          style: FilledButton.styleFrom(
            backgroundColor: AppColors.primary,
            foregroundColor: Colors.white,
            minimumSize: const Size.fromHeight(52),
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(14),
            ),
            textStyle: heading(size: 15, color: Colors.white),
          ),
        ),
      );
}
