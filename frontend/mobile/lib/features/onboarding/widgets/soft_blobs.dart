import 'package:flutter/material.dart';

/// Hai hình tròn có mép rõ, một phần nằm ngoài màn hình.
class SoftBlobs extends StatelessWidget {
  const SoftBlobs({super.key});

  @override
  Widget build(BuildContext context) {
    return const IgnorePointer(
      child: Stack(
        children: [
          Positioned(
            top: -120,
            left: -110,
            child: _Circle(
              size: 320,
              colors: [Color(0xFFDDE7FF), Color(0xFFEAF0FF)],
            ),
          ),
          Positioned(
            top: 10,
            right: -100,
            child: _Circle(
              size: 230,
              colors: [Color(0xFFE6EEFF), Color(0xFFF1F5FF)],
            ),
          ),
        ],
      ),
    );
  }
}

class _Circle extends StatelessWidget {
  const _Circle({required this.size, required this.colors});
  final double size;
  final List<Color> colors;

  @override
  Widget build(BuildContext context) {
    return Container(
      width: size,
      height: size,
      decoration: BoxDecoration(
        shape: BoxShape.circle,
        gradient: LinearGradient(
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
          colors: colors,
        ),
        boxShadow: const [
          BoxShadow(
            color: Color(0x14355CD6), // bóng xanh rất nhạt để có cảm giác nổi
            blurRadius: 24,
            offset: Offset(0, 8),
          ),
        ],
      ),
    );
  }
}
