import type { LucideIcon } from "lucide-react";
import { ChevronRight } from "lucide-react";

interface LevelCardProps {
    icon: LucideIcon;
    iconColor: string;
    colorClass: "green" | "violet" | "blue";
    title: string;
    subtitle: string;
}
export default function LevelCard({
    icon: Icon,
    iconColor,
    colorClass,
    title,
    subtitle,
}: LevelCardProps) {
    return (
        <div className="eq-level-card">
            <div className={`eq-level-icon ${colorClass}`}>
                <Icon size={30} color={iconColor} />
            </div>
            <div className="eq-level-text">
                <div className="eq-level-title">{title}</div>
                <div className="eq-level-subtitle">{subtitle}</div>
            </div>
            <ChevronRight size={22} color="#64748b" />
        </div>
    );
}
