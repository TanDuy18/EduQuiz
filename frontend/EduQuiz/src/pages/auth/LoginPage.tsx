import "./LoginPage.css";
import { useState } from "react";
export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log({ email, password });
        // TODO: gọi API login Spring Boot ở đây
    };

    const handleGoogleLogin = () => {
        console.log("Đăng nhập bằng Google");
        // TODO: xử lý OAuth2 Google thật ở đây sau
    };
    return (
        <div className="login-wrapper">
            <div className="login-card">
                <h1 className="login-title">Welcome</h1>
                <form action="" onSubmit={handleSubmit} className="loginForm">
                    <div className="input-group">
                        <div className="input-box">
                            <svg
                                className="input-icon"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                />
                            </svg>
                            <input
                                type="email"
                                tabIndex={1}
                                placeholder=" "
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <label>Email</label>
                        </div>
                    </div>

                    <div className="input-group">
                        <div className="input-box">
                            <svg
                                className="input-icon"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                />
                            </svg>
                            <input
                                type="password"
                                tabIndex={2}
                                placeholder=" "
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <label>Password</label>
                        </div>
                    </div>

                    <button type="submit">Login</button>
                </form>

                <div className="divider">
                    <span>or</span>
                </div>

                <div className="social-row">
                    <button onClick={handleGoogleLogin} className="social-btn">
                        G
                    </button>
                </div>
            </div>
            <div className=""></div>
        </div>
    );
}
