class AuthUser {
  const AuthUser({
    required this.id,
    required this.name,
    required this.email,
    this.avatarUrl,
  });

  final String id;
  final String name;
  final String email;
  final String? avatarUrl;

  factory AuthUser.fromJson(Map<String, dynamic> json) => AuthUser(
        id: json['id'].toString(),
        name: (json['username'] ?? '') as String,
        email: (json['gmail'] ?? '') as String,
        avatarUrl: json['avatarUrl'] as String?,
      );
}

class AuthResponse {
  const AuthResponse({
    required this.accessToken,
    required this.user,
    this.refreshToken,
  });

  final String accessToken;
  final String? refreshToken; // backend chưa trả refreshToken
  final AuthUser user;

  factory AuthResponse.fromJson(Map<String, dynamic> json) => AuthResponse(
        accessToken: json['accessToken'] as String,
        refreshToken: json['refreshToken'] as String?,
        user: AuthUser.fromJson(json['user'] as Map<String, dynamic>),
      );
}

/// Lỗi có câu thông báo sẵn để hiện cho người dùng.
class AuthException implements Exception {
  const AuthException(this.message);
  final String message;
  @override
  String toString() => message;
}
