import { GraduationCap } from "lucide-react";
import "./Logo.css";
export default function Logo() {
 return (
        <div className="eq-logo">
            <GraduationCap size={30} />
            <span className="eq-logo-text">
                Edu<span className="highlight">Quiz</span>
            </span>
        </div>
    );
}
