import 'package:eduquiz/core/network/dio_client.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../data/auth_models.dart';
import '../data/auth_repository.dart';
import '../data/google_auth_service.dart';
import '../data/token_storage.dart';

final tokenStorageProvider = Provider((_) => TokenStorage());

final googleAuthServiceProvider = Provider((_) => GoogleAuthService());

final authRepositoryProvider = Provider(
  (ref) => AuthRepository(ref.watch(dioProvider), ref.watch(tokenStorageProvider)),
);

class AuthController extends AsyncNotifier<AuthUser?> {
  /// Chạy lần đầu khi app mở: thử khôi phục phiên từ token đã lưu.
  @override
  Future<AuthUser?> build() async {
    try {
      return await ref.read(authRepositoryProvider).fetchMe();
    } catch (_) {
      // Lỗi mạng...: coi như chưa đăng nhập, token vẫn được giữ lại
      return null;
    }
  }

  /// Trả về true nếu đăng nhập Google thành công.
  /// Trả về false nếu lỗi hoặc người dùng tự đóng popup.
  Future<bool> signInWithGoogle() async {
    state = const AsyncLoading();
    var cancelled = false;
    state = await AsyncValue.guard(() async {
      final idToken = await ref.read(googleAuthServiceProvider).getIdToken();
      if (idToken == null) {
        cancelled = true;
        return null;
      }
      final auth =
          await ref.read(authRepositoryProvider).loginWithGoogle(idToken);
      return auth.user;
    });
    return !state.hasError && !cancelled;
  }

  Future<void> signOut() async {
    try {
      await ref.read(googleAuthServiceProvider).signOut();
    } catch (_) {
      // không quan trọng, vẫn tiếp tục xóa token
    }
    await ref.read(authRepositoryProvider).logout();
    state = const AsyncData(null);
  }
}

final authControllerProvider =
    AsyncNotifierProvider<AuthController, AuthUser?>(AuthController.new);
