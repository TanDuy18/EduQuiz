

interface HowStepProps {
    num: number;
    colorClass: "green" | "violet" | "blue";
    title: string;
    desc: string;
}

export default function HowStep({ num, colorClass, title, desc }: HowStepProps) {
    return (
        <div className={`eq-how-step step-${num}`}>
            <div className="eq-how-head">
                <span className={`eq-how-num ${colorClass}`}>{num}</span>
            </div>
            <h3 className="eq-how-title">{title}</h3>
            <p className="eq-how-desc">{desc}</p>
        </div>
    );
}
