import 'package:flutter/foundation.dart';
import 'package:flutter/services.dart';
import 'package:google_sign_in/google_sign_in.dart';
import 'auth_models.dart';

class GoogleAuthService {
  final GoogleSignIn _google = GoogleSignIn(
    scopes: const ['email'],
    // Web client ID (client "Admin")
    serverClientId:
        '523492188764-iltkgn370virte0sso28gnr81d92au4q.apps.googleusercontent.com',
  );

  /// Trả về idToken, hoặc null nếu người dùng tự đóng popup.
  Future<String?> getIdToken() async {
    try {
      final account = await _google.signIn();
      if (account == null) return null; // người dùng đóng popup
      final auth = await account.authentication;
      final idToken = auth.idToken;
      if (idToken == null) {
        throw const AuthException('Không lấy được thông tin từ Google.');
      }
      return idToken;
    } on PlatformException catch (e) {
      debugPrint('Google sign-in lỗi: code=${e.code} message=${e.message}');
      throw const AuthException('Đăng nhập Google thất bại. Thử lại nhé.');
    }
  }

  Future<void> signOut() => _google.signOut();
}
