import "./HomePage.css";
import {    ArrowRight,
    Search,
    GraduationCap,
    Album,
    Landmark,
    ShieldCheck,
    RefreshCw,
    MonitorSmartphone,
} from "lucide-react";
import StairArrow from "../../components/home/StairArrow";
import HomeIcon from "../../assets/HomeIcon.png";
import HomeNote from "../../assets/HomeNote.png";
import LevelCard from "../../components/home/LevelCard";
import WhyCard from "../../components/home/WhyCard";
import HowStep from "../../components/home/HowStep";
import AboutStage from "../../components/home/AboutStage";


export default function HomePage() {
    return (
        <>
            <section className="eq-hero">
                <div>
                    <span className="eq-badge">Học tập dễ dàng – Hiệu quả hơn</span>

                    <h1 className="eq-title">
                        Luyện đề trắc nghiệm
                        <br />
                        <span className="highlight">Đúng hướng – Vững tương lai</span>
                    </h1>

                    <p className="eq-subtitle">
                        EduQuiz giúp bạn rèn luyện kỹ năng làm bài, ôn tập kiến thức với hệ
                        thống đề thi phong phú, bám sát chương trình học và các đề thi thực
                        tế. Hỗ trợ thi trắc nghiệm.
                    </p>

                    <div className="eq-search">
                        <input
                            type="text"
                            placeholder="Tìm môn học, đề thi, hoặc tìm theo cấp học..."
                        />
                        <button>
                            <Search size={20} color="#ffffff" />
                        </button>
                    </div>

                    <div className="eq-levels">
                        <LevelCard
                            icon={GraduationCap}
                            iconColor="#10b981"
                            colorClass="green"
                            title="THCS"
                            subtitle="Lớp 6 - 9"
                        />
                        <LevelCard
                            icon={Album}
                            iconColor="#8b5cf6"
                            colorClass="violet"
                            title="THPT"
                            subtitle="Lớp 10 - 12"
                        />
                        <LevelCard
                            icon={Landmark}
                            iconColor="#3b82f6"
                            colorClass="blue"
                            title="Đại học"
                            subtitle="Tất cả các ngành"
                        />
                    </div>
                </div>

                {/* Illustration side */}
                <div className="eq-illustration">
                    <div className="eq-illustration-glow" />
                    <div className="eq-illustration-note">
                        <img
                            src={HomeNote}
                            alt=""
                            draggable={false}
                            className="eq-illustration-note-img"
                        />
                    </div>
                    <div className="eq-illustration-box">
                        <img
                            src={HomeIcon}
                            alt="Góc học tập"
                            draggable={false}
                            className="eq-illustration-image"
                        />
                    </div>
                </div>
            </section>
            {/*1*/}
            <section className="eq-about">
                <div className="eq-about-text">
                    <span className="eq-about-badge">Về EduQuiz</span>

                    <h2 className="eq-about-title">
                        Không chỉ là luyện đề,
                        <br />
                        mà là hành trình phát <span className="highlight">triển</span>
                    </h2>

                    <p className="eq-about-desc">
                        EduQuiz được xây dựng với mong muốn trở thành người bạn đồng hành
                        đáng tin cậy của học sinh trên con đường chinh phục tri thức và đạt
                        được những mục tiêu lớn hơn.
                    </p>

                    <button className="eq-about-btn">
                        Tìm hiểu thêm
                        <ArrowRight size={16} />
                    </button>
                </div>

                <div className="eq-about-illustration"> 
                    <AboutStage />
                </div>
            </section>
            <section className="eq-why">
                <div className="eq-why-inner">
                    <span className="eq-about-badge">Ưu điểm nổi bật</span>
                    <h2 className="eq-why-title">Vì sao nên chọn EduQuiz?</h2>
                    <p className="eq-why-desc">
                        Chúng tôi luôn nỗ lực mang đến trải nghiệm học tập tốt nhất
                        <br />
                        với những giá trị cốt lõi.
                    </p>

                    <div className="eq-why-grid">
                        <WhyCard
                            icon={ShieldCheck}
                            iconColor="#3b82f6"
                            colorClass="blue"
                            title="Đề thi đa dạng"
                            desc="Nhiều môn học, nhiều cấp độ từ cơ bản đến nâng cao."
                        />
                        <WhyCard
                            icon={RefreshCw}
                            iconColor="#8b5cf6"
                            colorClass="violet"
                            title="Bám sát chương trình"
                            desc="Nội dung được cập nhật thường xuyên theo chương trình học mới nhất."
                        />
                        <WhyCard
                            icon={MonitorSmartphone}
                            iconColor="#10b981"
                            colorClass="green"
                            title="Học mọi lúc, mọi nơi"
                            desc="Truy cập trên mọi thiết bị: điện thoại, tablet, máy tính."
                        />
                    </div>
                </div>
            </section>
            <section className="eq-how">
                <div className="eq-how-inner">
                    <span className="eq-about-badge">Chỉ 3 bước đơn giản</span>
                    <h2 className="eq-why-title">EduQuiz hoạt động như thế nào?</h2>
                    <p className="eq-why-desc">
                        Chỉ với vài thao tác, bạn đã có thể bắt đầu luyện tập và theo dõi
                        tiến độ học tập của mình.
                    </p>

                    <div className="eq-how-steps">
                        <HowStep
                            num={1}
                            colorClass="blue"
                            title="Chọn đề thi"
                            desc="Chọn môn học, cấp học phù hợp với mục tiêu của bạn."
                        />
                        <StairArrow className="arrow-1" />
                        <HowStep
                            num={2}
                            colorClass="violet"
                            title="Làm bài"
                            desc="Làm bài theo thời gian quy định, như thi thật."
                        />
                        <StairArrow className="arrow-2" />
                        <HowStep
                            num={3}
                            colorClass="green"
                            title="Xem kết quả"
                            desc="Xem điểm số, đáp án và phân tích kết quả chi tiết."
                        />
                    </div>
                </div>
            </section>
        </>
    );
}
