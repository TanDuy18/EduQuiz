import 'package:flutter/material.dart';

enum EducationLevel {
  thcs('THCS', 'Lớp 6 - 9', Icons.backpack_rounded),
  thpt('THPT', 'Lớp 10 - 12', Icons.school_rounded),
  university('Đại học', 'Tất cả các ngành', Icons.account_balance_rounded);

  const EducationLevel(this.title, this.subtitle, this.icon);
  final String title;
  final String subtitle;
  final IconData icon;
  /// Giá trị gửi lên backend, sửa cho khớp enum bên Spring Boot
  String get apiValue => name.toUpperCase(); // THCS, THPT, UNIVERSITY
}
