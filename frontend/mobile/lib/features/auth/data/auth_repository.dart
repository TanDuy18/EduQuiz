import 'package:dio/dio.dart';
import 'package:flutter/foundation.dart';
import 'auth_models.dart';
import 'token_storage.dart';

class AuthRepository {
  AuthRepository(this._dio, this._tokens);

  final Dio _dio;
  final TokenStorage _tokens;

  Future<AuthResponse> loginWithGoogle(String idToken) async {
    try {
      final res = await _dio.post('/auth/google', data: {'idToken': idToken});
      final auth = AuthResponse.fromJson(res.data as Map<String, dynamic>);
      await _tokens.save(auth.accessToken, auth.refreshToken);
      return auth;
    } on DioException catch (e) {
      throw AuthException(
        _messageFrom(e, authFailed: 'Tài khoản Google không hợp lệ.'),
      );
    } on TypeError catch (e, st) {
      debugPrint('Parse lỗi: $e\n$st');
      throw const AuthException('Dữ liệu từ máy chủ không đúng định dạng.');
    }
  }

  /// Khôi phục phiên đăng nhập từ token đã lưu.
  /// Trả về null nếu chưa có token hoặc token hết hạn/không hợp lệ.
  Future<AuthUser?> fetchMe() async {
    final token = await _tokens.readAccess();
    if (token == null) return null;
    try {
      final res = await _dio.get('/auth/me');
      return AuthUser.fromJson(res.data as Map<String, dynamic>);
    } on DioException catch (e) {
      final code = e.response?.statusCode;
      if (code == 401 || code == 403) {
        await _tokens.clear(); // token hết hạn -> xóa, yêu cầu đăng nhập lại
        return null;
      }
      throw AuthException(_messageFrom(e));
    } on TypeError {
      throw const AuthException('Dữ liệu từ máy chủ không đúng định dạng.');
    }
  }

  Future<void> logout() => _tokens.clear();

  String _messageFrom(
    DioException e, {
    String authFailed = 'Phiên đăng nhập không hợp lệ.',
  }) {
    switch (e.type) {
      case DioExceptionType.connectionTimeout:
      case DioExceptionType.receiveTimeout:
      case DioExceptionType.sendTimeout:
      case DioExceptionType.connectionError:
        return 'Không kết nối được máy chủ. Kiểm tra mạng rồi thử lại.';
      case DioExceptionType.badResponse:
        final data = e.response?.data;
        if (data is Map && data['message'] is String) {
          return data['message'] as String; // câu báo lỗi do backend gửi
        }
        final code = e.response?.statusCode;
        if (code == 401 || code == 403) return authFailed;
        return 'Máy chủ gặp lỗi ($code). Thử lại sau nhé.';
      default:
        return 'Có lỗi xảy ra. Thử lại nhé.';
    }
  }
}
