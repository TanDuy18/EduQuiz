import "./Header.css";
import { NavLink } from "react-router-dom";
import { Search } from "lucide-react";
import { useAuth } from "../../hooks/useAuth"; // chỉnh đường dẫn cho đúng vị trí file của bạn
import Logo from "../../components/logo/Logo";

export default function Header() {
    const { user, logout, requireAuth } = useAuth();

    return (
        <header className="eq-header">
            <Logo/>

            <nav className="eq-nav">
                <NavLink to="/">Trang chủ</NavLink>
                <NavLink to="/practice">Luyện tập</NavLink>
                <NavLink to="/exam">Đề thi</NavLink>
                <NavLink to="/school">Trường học</NavLink>
            </nav>

            <div className="eq-header-actions">
                <button className="eq-icon-btn">
                    <Search size={18} />
                </button>

                {user ? (
                    <>
                        {user.avatar && (
                            <img src={user.avatar} alt="" className="eq-header-avatar" />
                        )}
                        <span className="eq-header-name">{user.name}</span>
                        <button className="eq-btn-outline" onClick={logout}>
                            Đăng xuất
                        </button>
                    </>
                ) : (
                    <button className="eq-btn-outline" onClick={() => requireAuth()}>
                        Đăng nhập
                    </button>
                )}
            </div>
        </header>
    );
}
