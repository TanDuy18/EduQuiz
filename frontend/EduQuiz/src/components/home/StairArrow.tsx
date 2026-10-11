interface StairArrowProps {
    className?: string;
}

export default function StairArrow({ className = "" }: StairArrowProps) {
    return (
        <svg
            className={`eq-how-arrow ${className}`}
            width="90"
            height="80"
            viewBox="0 0 60 50"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
        >
            {/* ngang -> xuống -> ngang */}
            <path d="M2 2 H22 V32 H44" />
            {/* đầu mũi tên */}
            <path d="M39 27 L44 32 L39 37" />
        </svg>
    );
}
