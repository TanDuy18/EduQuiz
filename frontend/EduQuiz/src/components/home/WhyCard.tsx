import {ArrowRight} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface WhyCardProps {
    icon: LucideIcon;
    iconColor: string;
    colorClass: "green" | "violet" | "blue";
    title: string;
    desc: string;
}

export default function WhyCard({ icon: Icon, iconColor, colorClass, title, desc }: WhyCardProps) {
    return (
        <div className="eq-why-card">
            <div className={`eq-why-icon ${colorClass}`}>
                <Icon size={35} color={iconColor} />
            </div>
            <h3 className="eq-why-card-title">{title}</h3>
            <p className="eq-why-card-desc">{desc}</p>
            <button className={`eq-why-arrow ${colorClass}`} aria-label={title}>
                <ArrowRight size={20} />
            </button>
        </div>
    );
}
