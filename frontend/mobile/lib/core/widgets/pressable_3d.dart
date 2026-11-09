import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

/// Khối nổi: mặt trên lún xuống khi bấm, có rung nhẹ.
class Pressable3D extends StatefulWidget {
  const Pressable3D({
    super.key,
    required this.child,
    required this.onTap,
    required this.faceColor,
    required this.edgeColor,
    this.borderColor,
    this.radius = 14,
    this.depth = 5,
    this.height,
    this.padding,
    this.enabled = true,
  });

  final Widget child;
  final VoidCallback onTap;
  final Color faceColor;
  final Color edgeColor;
  final Color? borderColor;
  final double radius;
  final double depth; // độ dày của nút
  final double? height;
  final EdgeInsetsGeometry? padding;
  final bool enabled;

  @override
  State<Pressable3D> createState() => _Pressable3DState();
}

class _Pressable3DState extends State<Pressable3D> {
  bool _down = false;

  void _press() {
    if (widget.enabled) setState(() => _down = true);
  }

  // Giữ trạng thái lún thêm chút để tap nhanh vẫn thấy được
  Future<void> _release() async {
    await Future.delayed(const Duration(milliseconds: 90));
    if (mounted) setState(() => _down = false);
  }

  @override
  Widget build(BuildContext context) {
    final radius = BorderRadius.circular(widget.radius);
    final d = widget.depth;

    return Opacity(
      opacity: widget.enabled ? 1 : 0.5,
      child: GestureDetector(
        behavior: HitTestBehavior.opaque,
        onTapDown: (_) => _press(),
        onTapUp: (_) => _release(),
        onTapCancel: _release,
        onTap: widget.enabled
            ? () {
                HapticFeedback.lightImpact();
                widget.onTap();
              }
            : null,
        child: Stack(
          children: [
            // Lớp cạnh (nằm sau, lộ ra dải mỏng ở dưới)
            Positioned.fill(
              top: d,
              child: DecoratedBox(
                decoration: BoxDecoration(
                  color: widget.edgeColor,
                  borderRadius: radius,
                ),
              ),
            ),
            // Lớp mặt (lún xuống khi bấm)
            AnimatedContainer(
              duration: const Duration(milliseconds: 70),
              curve: Curves.easeOut,
              height: widget.height,
              margin: EdgeInsets.only(top: _down ? d : 0, bottom: _down ? 0 : d),
              padding: widget.padding,
              decoration: BoxDecoration(
                color: widget.faceColor,
                borderRadius: radius,
                border: widget.borderColor == null
                    ? null
                    : Border.all(color: widget.borderColor!, width: 1.5),
              ),
              child: widget.child,
            ),
          ],
        ),
      ),
    );
  }
}
