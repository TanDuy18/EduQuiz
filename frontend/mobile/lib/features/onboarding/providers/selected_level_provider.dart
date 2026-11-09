import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../domain/education_level.dart';

class SelectedLevelNotifier extends Notifier<EducationLevel?> {
  @override
  EducationLevel? build() => null;

  void select(EducationLevel level) => state = level;
}

final selectedLevelProvider =
    NotifierProvider<SelectedLevelNotifier, EducationLevel?>(
  SelectedLevelNotifier.new,
);
