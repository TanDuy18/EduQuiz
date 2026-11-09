import '../../../core/theme/app_colors.dart';

import 'package:flutter/material.dart';

class PageIndicator extends StatelessWidget {
  const PageIndicator({super.key, required this.count, required this.index});
  final int count;
  final int index;


    @override
    Widget build(BuildContext context){
        return Row(
            mainAxisSize: MainAxisSize.min, // max là mặc dịnh chiếm hết chiều ngang còn min là bo lại vừa đủ nội dung
            children: List.generate(count, (i){
               final active = i == index; 
               return AnimatedContainer(
               duration: const Duration(milliseconds: 250),
                margin: const EdgeInsets.symmetric(horizontal: 3),
                  width: active ? 26 : 8,   // chấm đang chọn kéo dài thành viên thuốc
                  height: 8,
                  decoration: BoxDecoration(
                    color: active ? AppColors.dotActive : AppColors.dotInActive,
                    borderRadius: BorderRadius.circular(4),
               ),
               );
            }),
        );
    }

}
