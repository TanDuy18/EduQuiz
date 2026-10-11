import { GoogleLogin } from "@react-oauth/google";
import "./LoginModel.css";
import Logo from "../logo/Logo";
interface LoginModalProps {
    onSuccess: (credential: string) => void; // gọi khi Google đăng nhập xong
    onClose: () => void; // gọi khi đóng modal
    homeHref?: string; // chữ thường "string", không phải "String"
}

export default function LoginModal({
    onSuccess,
    onClose,
    homeHref = "/",
}: LoginModalProps) {
    return (
        <div
            className="eq-modal-overlay"
            role="dialog"
            aria-modal="true"
            onClick={onClose}
        >
            <div className="eq-modal" onClick={(e) => e.stopPropagation()}>
                <div className="eq-modal-logo">
                    <Logo />
                </div>
                <p className="eq-modal-text">
                    Bạn có thể Đăng ký / Đăng nhập bằng cách chọn{" "}
                    <strong>Đăng nhập với Google</strong>
                </p>

                <div className="eq-modal-google-wrap">
                    <GoogleLogin
                        onSuccess={(res) => {
                            if (res.credential) onSuccess(res.credential);
                        }}
                        onError={() => alert("Không đăng nhập được với Google")}
                        shape="pill"
                        width="320"
                        logo_alignment="center"
                    />
                </div>

                <a className="eq-modal-home" href={homeHref}>
                    Quay trở về trang chủ EduQuiz
                </a>
            </div>
        </div>
    );
}
