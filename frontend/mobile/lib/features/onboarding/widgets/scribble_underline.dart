import 'package:flutter/material.dart';

class ScribbleUnderline extends StatelessWidget {
  const ScribbleUnderline({
    super.key,
    required this.child,
    this.color = const Color(0xFFF4C95D), // vàng lấy từ hình minh hoạ
  });
  final Widget child;
  final Color color;

  @override
  Widget build(BuildContext context) {
    return CustomPaint(
      painter: _ScribblePainter(color),
      child: Padding(padding: const EdgeInsets.only(bottom: 8), child: child),
    );
  }
}

class _ScribblePainter extends CustomPainter {
  _ScribblePainter(this.color);
  final Color color;

  @override
  void paint(Canvas canvas, Size size) {
    final w = size.width, h = size.height;
    final path = Path()
      ..moveTo(0, h - 5)
      ..quadraticBezierTo(w * 0.25, h - 10, w * 0.5, h - 5)
      ..quadraticBezierTo(w * 0.75, h, w, h - 6);
    canvas.drawPath(
      path,
      Paint()
        ..color = color
        ..style = PaintingStyle.stroke
        ..strokeWidth = 3
        ..strokeCap = StrokeCap.round,
    );
  }

  @override
  bool shouldRepaint(_ScribblePainter old) => old.color != color;
}
