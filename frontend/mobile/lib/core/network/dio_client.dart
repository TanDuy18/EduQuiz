import 'package:dio/dio.dart';
import 'package:eduquiz/features/auth/data/token_storage.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

final dioProvider = Provider<Dio>((ref) {
  final dio = Dio(
    BaseOptions(
      baseUrl: 'http://10.0.2.2:8001/api/v1', // emulator gọi máy host qua 10.0.2.2
      connectTimeout: const Duration(seconds: 10),
      receiveTimeout: const Duration(seconds: 15),
      headers: {'Content-Type': 'application/json'},
    ),
  );

  // Tự gắn "Authorization: Bearer <accessToken>" vào mọi request (trừ đăng nhập)
  final tokens = TokenStorage();
  dio.interceptors.add(
    InterceptorsWrapper(
      onRequest: (options, handler) async {
        if (!options.path.startsWith('/auth/google')) {
          final token = await tokens.readAccess();
          if (token != null) {
            options.headers['Authorization'] = 'Bearer $token';
          }
        }
        handler.next(options);
      },
    ),
  );

  if (kDebugMode) {
    // Tắt log body/header để không lộ token ra console.
    // Cần debug thì tạm bật requestBody/responseBody lên true.
    dio.interceptors.add(
      LogInterceptor(
        requestHeader: false,
        requestBody: false,
        responseHeader: false,
        responseBody: false,
      ),
    );
  }
  return dio;
});
