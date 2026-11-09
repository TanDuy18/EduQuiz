import 'package:flutter/material.dart';

class WriteInAnimation extends StatefulWidget {
  const WriteInAnimation({
    super.key,
    required this.child,
    this.revealDuration = const Duration(seconds: 4),
    this.holdDuration = const Duration(seconds: 3),
    this.hideDuration = const Duration(seconds: 4),
  });

  final Widget child;
  final Duration revealDuration; // thời gian hiện 0 -> 100%
  final Duration holdDuration;   // thời gian giữ nguyên
  final Duration hideDuration;   // thời gian ẩn dần

  @override
  State<WriteInAnimation> createState() => _WriteInAnimationState();
}

class _WriteInAnimationState extends State<WriteInAnimation>
    with SingleTickerProviderStateMixin {
  late final AnimationController _controller;
  late final Animation<double> _reveal; // mép phải
  late final Animation<double> _hide;   // mép trái
  late final _WipeClipper _clipper;

  @override
  void initState() {
    super.initState();

    final reveal = widget.revealDuration.inMilliseconds;
    final hold = widget.holdDuration.inMilliseconds;
    final hide = widget.hideDuration.inMilliseconds;
    final total = reveal + hold + hide; // 4 + 3 + 4 = 11s

    _controller = AnimationController(
      vsync: this,
      duration: Duration(milliseconds: total),
    )..repeat();

    // Đổi mili giây thành mốc 0.0 - 1.0 của controller
    final revealEnd = reveal / total;
    final hideStart = (reveal + hold) / total;

    _reveal = CurvedAnimation(
      parent: _controller,
      curve: Interval(0.0, revealEnd, curve: Curves.easeInOut),
    );
    _hide = CurvedAnimation(
      parent: _controller,
      curve: Interval(hideStart, 1.0, curve: Curves.easeInOut),
    );
    _clipper = _WipeClipper(_reveal, _hide);
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return ClipRect(clipper: _clipper, child: widget.child);
  }
}

class _WipeClipper extends CustomClipper<Rect> {
  _WipeClipper(this.reveal, this.hide)
      : super(reclip: Listenable.merge([reveal, hide]));

  final Animation<double> reveal;
  final Animation<double> hide;

  @override
  Rect getClip(Size size) => Rect.fromLTRB(
        size.width * hide.value,   // mép trái: 0 -> 100% lúc ẩn
        0,
        size.width * reveal.value, // mép phải: 0 -> 100% lúc hiện
        size.height,
      );

  @override
  bool shouldReclip(covariant _WipeClipper oldClipper) => false;
}
