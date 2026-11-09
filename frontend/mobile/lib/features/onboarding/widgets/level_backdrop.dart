import 'package:flutter/material.dart';

/// Hai hình tròn góc trên phải và quyển sách mờ góc dưới trái.
class LevelBackdrop extends StatelessWidget {
  const LevelBackdrop({super.key});

  @override
  Widget build(BuildContext context) {
    return const IgnorePointer(
      child: Stack(
        children: [
          Positioned(
            top: -110,
            right: -40,
            child: _Circle(size: 260, color: Color(0xFFE6EEFF)),
          ),
          Positioned(
            top: 10,
            right: -70,
            child: _Circle(size: 170, color: Color(0xFFD5E3FD)),
          ),
          Positioned(
            bottom: 90,
            left: -24,
            child: Icon(
              Icons.menu_book_rounded,
              size: 150,
              color: Color(0xFFDCE8FD),
            ),
          ),
        ],
      ),
    );
  }
}

class _Circle extends StatelessWidget {
  const _Circle({required this.size, required this.color});
  final double size;
  final Color color;

  @override
  Widget build(BuildContext context) {
    return Container(
      width: size,
      height: size,
      decoration: BoxDecoration(shape: BoxShape.circle, color: color),
    );
  }
}
