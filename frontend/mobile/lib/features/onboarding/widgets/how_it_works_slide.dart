import 'package:flutter/material.dart';
import '../../../core/theme/app_colors.dart';
import '../../../core/theme/app_theme.dart';
import 'section_badge.dart'; 

class HowItWorksSlide extends StatelessWidget {
  const HowItWorksSlide({super.key});

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      padding: const EdgeInsets.fromLTRB(24, 8, 24, 24),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const SectionBadge(text: 'Chỉ 3 bước đơn giản'),
          const SizedBox(height: 20),
          
          // Tiêu đề (Text.rich để đổi màu chữ)
          Text.rich(
            TextSpan(
              children: [
                TextSpan(
                  text: 'EduQuiz hoạt động\n',
                  style: AppTheme.heading2(size: 36, fontWeight: FontWeight.w600),
                ),
                TextSpan(
                  text: 'như thế nào',
                  style: AppTheme.heading2(size: 38, fontWeight: FontWeight.w600, color: const Color(0xFF9BB9FF)), // Màu xanh nhạt
                ),
                TextSpan(
                  text: ' ? ',
                  style: AppTheme.heading(size: 32, fontWeight: FontWeight.w600),
                ),
              ],
            ),
            style: const TextStyle(height: 1.3),
          ),
          
          const SizedBox(height: 16),
          
          // Đoạn mô tả
          Text(
            'Chỉ với vài thao tác, bạn có thể bắt đầu luyện tập và theo dõi tiến độ học tập',
            style: AppTheme.body(size: 15, color: AppColors.textMuted),
          ),
          
          const SizedBox(height: 32),

          // Danh sách các bước
          _StepItem(
            stepNumber: '1',
            stepColor: const Color(0xFF7BA6FF), // Xanh nhạt
            title: 'Chọn đề thi',
            description: 'Chọn môn học, cấp học phù hợp với mục tiêu của bạn',
            isLast: false,
          ),
          _StepItem(
            stepNumber: '2',
            stepColor: const Color(0xFF2B407A), // Xanh đen (Navy)
            title: 'Làm bài',
            description: 'Làm bài theo thời gian quy định, như thi thật',
            isLast: false,
          ),
          _StepItem(
            stepNumber: '3',
            stepColor: const Color(0xFF3E8E41), // Xanh lá
            title: 'Xem kết quả',
            description: 'Xem điểm số, đáp án và phân tích kết quả chi tiết',
            isLast: true, // Bước cuối không vẽ đường nét đứt
          ),
        ],
      ),
    );
  }
}

// Widget cho từng bước (Icon tròn + Text + Đường nét đứt)
class _StepItem extends StatelessWidget {
  final String stepNumber;
  final Color stepColor;
  final String title;
  final String description;
  final bool isLast;

  const _StepItem({
    required this.stepNumber,
    required this.stepColor,
    required this.title,
    required this.description,
    required this.isLast,
  });

  @override
  Widget build(BuildContext context) {
    // IntrinsicHeight giúp Row tự co giãn theo widget con cao nhất
    // Để từ đó Expanded bên trong cột trái biết phải vẽ đường nét đứt dài bao nhiêu
    return IntrinsicHeight(
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          // Cột bên trái: Số và đường nét đứt
          Column(
            children: [
              Container(
                width: 36,
                height: 36,
                decoration: BoxDecoration(
                  color: stepColor,
                  shape: BoxShape.circle,
                ),
                child: Center(
                  child: Text(
                    stepNumber,
                    style: const TextStyle(
                      color: Colors.white,
                      fontWeight: FontWeight.w600,
                      fontSize: 18,
                    ),
                  ),
                ),
              ),
              if (!isLast)
                Expanded(
                  child: CustomPaint(
                    size: const Size(1, double.infinity),
                    painter: _DashedLinePainter(),
                  ),
                ),
            ],
          ),
          const SizedBox(width: 16),
          
          // Cột bên phải: Text
          Expanded(
            child: Padding(
              padding: EdgeInsets.only(bottom: isLast ? 0 : 28), // Khoảng cách giữa các bước
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    title,
                    style: AppTheme.heading(size: 18, fontWeight: FontWeight.w600),
                  ),
                  const SizedBox(height: 6),
                  Text(
                    description,
                    style: AppTheme.body(size: 15, color: AppColors.textMuted),
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}

// Lớp vẽ đường nét đứt
class _DashedLinePainter extends CustomPainter {
  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()
      ..color = Colors.grey.shade400
      ..strokeWidth = 1.5;

    const dashWidth = 4.0;
    const dashSpace = 4.0;
    double startY = 8.0; // Bắt đầu vẽ cách hình tròn 1 khoảng nhỏ

    while (startY < size.height) {
      canvas.drawLine(
        Offset(size.width / 2, startY),
        Offset(size.width / 2, startY + dashWidth),
        paint,
      );
      startY += dashWidth + dashSpace;
    }
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => false;
}
